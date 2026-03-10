/**
 * Generic Streaming Utility for LangGraph Workflow Execution
 * 
 * Provides a reusable, flexible SSE (Server-Sent Events) streaming interface
 * for LangGraph workflow execution with proper error handling and callbacks.
 * 
 * Supports both threadless runs and thread-based runs for HITL (Human-in-the-Loop) resumption.
 */

import { getLangGraphApiUrl, getLangGraphConfig } from './config/langgraph.config';

export interface StreamOptions {
    assistantId: string;
    input?: Record<string, any>;
    threadId?: string;  // If provided, uses thread-based run for HITL resumption
    command?: {
        goto?: {
            node: string;
            input?: Record<string, any>;
        };
        resume?: any;  // Value to resume after interrupt
    };
    signal?: AbortSignal;
    onEvent?: (event: any) => void;
    onError?: (error: Error) => void;
    onComplete?: () => void;
}

export interface StreamResponse<T> {
    success: boolean;
    data?: T;
    threadId?: string;  // Returns thread ID for later resumption
    interrupts?: any[];  // Pending interrupts from LangGraph's interrupt()
    error?: string;
}

export interface ThreadState {
    values: Record<string, any>;
    next: string[];
    tasks: Array<{
        id: string;
        name: string;
        interrupts?: Array<{
            value: any;
            resumable: boolean;
            ns?: string[];
        }>;
    }>;
    metadata?: Record<string, any>;
    checkpoint?: Record<string, any>;
}

/**
 * Get the LangGraph API base URL based on environment configuration
 * @deprecated Use getLangGraphApiUrl() from lib/config/langgraph.config.ts directly
 */
export function getLangGraphBaseUrl(): string {
    return getLangGraphApiUrl();
}

/**
 * Create a new thread for LangGraph workflow execution
 * 
 * @returns Promise with thread ID
 */
export async function createThread(metadata?: Record<string, any>): Promise<string> {
    const baseUrl = getLangGraphBaseUrl();

    const response = await fetch(`${baseUrl}/threads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            metadata: metadata || {},
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create thread: ${response.status}`);
    }

    const data = await response.json();
    return data.thread_id;
}

/**
 * Get the current state of a thread, including any pending interrupts
 * 
 * @param threadId - The thread ID to check
 * @returns Promise with thread state
 */
export async function getThreadState(threadId: string): Promise<ThreadState | null> {
    const baseUrl = getLangGraphBaseUrl();

    try {
        const response = await fetch(`${baseUrl}/threads/${threadId}/state`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`Failed to get thread state: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching thread state:', error);
        return null;
    }
}

/**
 * Streams events from LangGraph SSE endpoint with flexible configuration
 * 
 * @param options - Stream configuration options
 * @returns Promise that resolves with StreamResponse when streaming completes
 * 
 * @example
 * // Threadless run (simple, no HITL resumption)
 * const result = await streamLangGraphEvents({
 *     assistantId: "technical_seo_auditor",
 *     input: { webpage_url: "https://example.com" },
 *     onEvent: (event) => console.log('Event:', event),
 * });
 * 
 * @example
 * // Thread-based run with HITL resumption
 * const result = await streamLangGraphEvents({
 *     assistantId: "browsing_architect",
 *     input: { website_url: "https://example.com" },
 *     threadId: "existing-thread-id", // or omit to create new thread
 *     onEvent: (event) => console.log('Event:', event),
 * });
 * 
 * @example
 * // Resume after HITL interrupt
 * const result = await streamLangGraphEvents({
 *     assistantId: "browsing_architect",
 *     threadId: "same-thread-id-as-before",
 *     command: { resume: { approved: true, selected_pages: [...] } },
 *     onEvent: (event) => console.log('Event:', event),
 * });
 */
export async function streamLangGraphEvents<T = any>(options: StreamOptions): Promise<StreamResponse<T>> {
    const { assistantId, input, threadId, command, signal, onEvent, onError, onComplete } = options;

    const baseUrl = getLangGraphBaseUrl();
    let currentThreadId = threadId;

    try {
        // If no thread ID provided and we have input, create a new thread
        if (!currentThreadId && input) {
            currentThreadId = await createThread({
                assistant_id: assistantId,
            });
        }

        // Build the request body
        const requestBody: Record<string, any> = {
            assistant_id: assistantId,
            stream_mode: ["custom"],
            stream_subgraphs: true,
            checkpoint_during: true,
            stream_resumable: true,
            on_completion: "keep",
            on_disconnect: "continue",
            after_seconds: 0,
            durability: "async",
        };

        // Add input if provided (for initial run)
        if (input) {
            requestBody.input = input;
        }

        // Add command if provided (for resume or goto)
        if (command) {
            requestBody.command = command;
        }

        // Determine endpoint based on whether we have a thread
        const endpoint = currentThreadId
            ? `${baseUrl}/threads/${currentThreadId}/runs/stream`
            : `${baseUrl}/runs/stream`;

        // Log the request details for debugging
        console.log('[LangGraph] Starting stream request:', {
            endpoint,
            assistantId,
            threadId: currentThreadId,
            hasInput: !!input,
            hasCommand: !!command,
            command: command ? JSON.stringify(command).substring(0, 200) : undefined,
        });

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            signal,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Server responded with ${response.status}`;
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.detail || errorJson.message || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            const error = new Error(errorMessage);
            if (onError) {
                onError(error);
            }
            return {
                success: false,
                threadId: currentThreadId,
                error: errorMessage
            };
        }

        if (!response.body) {
            const error = new Error('No response body available for streaming');
            if (onError) {
                onError(error);
            }
            return {
                success: false,
                threadId: currentThreadId,
                error: 'No response body available for streaming'
            };
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedData = '';

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedData += chunk;

                const lines = accumulatedData.split('\n');
                accumulatedData = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();

                    // Skip empty lines and heartbeat events
                    if (!trimmedLine || trimmedLine === ': heartbeat') continue;

                    // Handle SSE format: "event: eventType\ndata: jsonData"
                    if (trimmedLine.startsWith('event:')) {
                        // This is an event type line, skip to data
                        continue;
                    }

                    if (!trimmedLine.startsWith('data: ')) continue;

                    try {
                        const jsonStr = trimmedLine.replace(/^data: /, '');

                        // Skip non-JSON data
                        if (!jsonStr.startsWith('{') && !jsonStr.startsWith('[')) continue;

                        const parsed = JSON.parse(jsonStr);

                        // LangGraph custom stream can wrap events in arrays
                        const events = Array.isArray(parsed) ? parsed : [parsed];

                        for (const event of events) {
                            console.log('[SSE Event]', event?.type || 'unknown', JSON.stringify(event).substring(0, 200));

                            if (onEvent) {
                                onEvent(event);
                            }
                        }
                    } catch (e) {
                        // Not a JSON event, skip silently
                        console.debug('Non-JSON SSE data:', trimmedLine);
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }

        // After stream ends, check thread state for pending interrupts
        // This catches LangGraph's native interrupt() calls that don't emit custom events
        let interrupts: any[] | undefined;
        if (currentThreadId) {
            try {
                console.log('[LangGraph] Stream ended. Checking thread state for interrupts...');
                const threadState = await getThreadState(currentThreadId);
                console.log('[LangGraph] Thread state:', JSON.stringify({
                    hasValues: !!threadState?.values,
                    next: threadState?.next,
                    tasksCount: threadState?.tasks?.length,
                    tasks: threadState?.tasks?.map(t => ({
                        id: t.id,
                        name: t.name,
                        interruptsCount: t.interrupts?.length,
                        interrupts: t.interrupts?.map(i => ({
                            resumable: i.resumable,
                            valueType: typeof i.value,
                            valuePreview: typeof i.value === 'string'
                                ? i.value.substring(0, 200)
                                : JSON.stringify(i.value).substring(0, 200),
                        })),
                    })),
                }, null, 2));

                if (threadState?.tasks) {
                    const pendingInterrupts = threadState.tasks
                        .filter(task => task.interrupts && task.interrupts.length > 0)
                        .flatMap(task => task.interrupts!.map(interrupt => ({
                            ...interrupt,
                            taskId: task.id,
                            taskName: task.name,
                        })));

                    if (pendingInterrupts.length > 0) {
                        interrupts = pendingInterrupts;
                        console.log('[LangGraph] Detected pending interrupts:', pendingInterrupts.length);
                    } else {
                        console.log('[LangGraph] No pending interrupts found in thread state');
                    }
                } else {
                    console.log('[LangGraph] No tasks in thread state (threadState null?', !threadState, ')');
                }
            } catch (e) {
                console.error('[LangGraph] Error checking thread state:', e);
            }
        } else {
            console.log('[LangGraph] No thread ID available to check for interrupts');
        }

        if (onComplete) {
            onComplete();
        }

        return {
            success: true,
            threadId: currentThreadId,
            interrupts,
        };

    } catch (error) {
        // Handle AbortError gracefully
        if (error instanceof Error && error.name === 'AbortError') {
            if (onError) {
                onError(error);
            }
            return {
                success: false,
                threadId: currentThreadId,
                error: 'Stream was aborted'
            };
        }

        // Handle other errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        if (onError) {
            onError(error instanceof Error ? error : new Error(errorMessage));
        }

        return {
            success: false,
            threadId: currentThreadId,
            error: errorMessage
        };
    }
}

/**
 * Resume an interrupted LangGraph workflow
 * 
 * @param threadId - The thread ID of the interrupted workflow
 * @param assistantId - The assistant ID
 * @param resumeValue - The value to pass to the interrupt() call
 * @param options - Additional options (signal, callbacks)
 * @returns Promise that resolves with StreamResponse
 * 
 * @example
 * // Resume with user's approval
 * const result = await resumeLangGraphWorkflow(
 *     "thread-123",
 *     "browsing_architect",
 *     { approved: true, selected_pages: ["/about", "/services"] }
 * );
 */
export async function resumeLangGraphWorkflow<T = any>(
    threadId: string,
    assistantId: string,
    resumeValue: any,
    options?: {
        signal?: AbortSignal;
        onEvent?: (event: any) => void;
        onError?: (error: Error) => void;
        onComplete?: () => void;
    }
): Promise<StreamResponse<T>> {
    return streamLangGraphEvents<T>({
        assistantId,
        threadId,
        command: {
            resume: resumeValue
        },
        ...options
    });
}
