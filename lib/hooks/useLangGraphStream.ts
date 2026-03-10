/**
 * LangGraph Stream Hook
 *
 * A React hook for streaming events from LangGraph workflows.
 * Uses the unified event system defined in lib/types/graph-events.types.ts
 * 
 * Supports thread-based runs for HITL (Human-in-the-Loop) resumption.
 * 
 * HITL Protocol: Uses native interrupt-based detection via thread state polling.
 * @see plans/hitl-streaming-protocol.md
 */

import { useState, useCallback, useRef } from 'react';
import {
    GraphEvent,
    GraphStreamState,
    ChatMessage,
    StepStartPayload,
    ArtifactPayload,
    HITLRequestPayload,
    HITLInterruptPayload,
    ErrorPayload,
    isStepStartEvent,
    isStepCompleteEvent,
    isSystemEvent,
    isAgentMessageEvent,
    isArtifactEvent,
    isProgressEvent,
    isHITLRequestEvent,
    isErrorEvent,
    isCompleteEvent,
    convertInterruptToHITLRequest,
} from '@/lib/types/graph-events.types';
import { streamLangGraphEvents, resumeLangGraphWorkflow, getThreadState, ThreadState } from '@/lib/streamLangGraph';
import { validateHITLPayload } from '@/lib/utils/eventValidator';

// ============================================================================
// Feature Flags
// ============================================================================

/**
 * Feature flag for interrupt-based HITL detection.
 * When true, polls thread state for interrupts instead of relying on hitl_request events.
 * @todo Remove this flag once migration is complete
 */
const USE_INTERRUPT_BASED_HITL = true;

// ============================================================================
// Types
// ============================================================================

interface UseLangGraphStreamOptions {
    graphId: string;
    workspaceId?: string;
    onEvent?: (event: GraphEvent) => void;
    onError?: (error: Error) => void;
    onComplete?: (summary: any) => void;
}

interface UseLangGraphStreamReturn {
    // State
    state: GraphStreamState;

    // Actions
    startStream: (input: Record<string, unknown>) => Promise<void>;
    respondToHITL: (requestId: string, response: unknown) => Promise<void>;
    cancelStream: () => void;
    reset: () => void;
    addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;

    // Derived state
    isRunning: boolean;
    isConnecting: boolean;
    isHITLPending: boolean;
    isComplete: boolean;
    hitlRequestId: string | null;  // Track the HITL request ID for resumption
    currentStep: StepStartPayload | null;
    progress: { current: number; total: number; message?: string } | null;
    error: ErrorPayload | null;
    completeEvent: import('@/lib/types/graph-events.types').CompletePayload | null;
    messages: ChatMessage[];
    artifacts: ArtifactPayload[];
    clearError: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const initialState: GraphStreamState = {
    isConnected: false,
    threadId: null,
    graphId: null,
    currentStep: null,
    completedSteps: [],
    messages: [],
    artifacts: new Map(),
    progress: null,
    pendingHITL: null,
    status: 'idle',
    error: null,
    completeEvent: null,
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convert raw event data to GraphEvent format.
 * 
 * IMPORTANT: Backend now sends camelCase only. No snake_case fallbacks.
 * If the backend sends snake_case, the event will be logged and skipped.
 */
function convertToGraphEvent(raw: Record<string, unknown>): GraphEvent | null {
    const type = raw.type as string;

    // Generate base event properties
    const baseEvent = {
        id: (raw.id as string) || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: (raw.timestamp as string) || new Date().toISOString(),
        graphId: raw.graphId as string,
        threadId: raw.threadId as string,
        version: (raw.version as string) || '1.0',
    };

    switch (type) {
        case 'step_start': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'step_start',
                stepId: payload?.stepId as string,
                stepName: payload?.stepName as string,
                stepNumber: payload?.stepNumber as number,
                totalSteps: payload?.totalSteps as number,
                payload: {
                    stepId: payload?.stepId as string,
                    stepName: payload?.stepName as string,
                    stepNumber: payload?.stepNumber as number,
                    totalSteps: payload?.totalSteps as number,
                    description: payload?.description as string | undefined,
                },
            };
        }

        case 'step_complete': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'step_complete',
                stepId: payload?.stepId as string,
                stepName: payload?.stepName as string,
                stepNumber: payload?.stepNumber as number,
                totalSteps: payload?.totalSteps as number,
                payload: {
                    stepId: payload?.stepId as string,
                    stepName: payload?.stepName as string,
                    stepNumber: payload?.stepNumber as number,
                    totalSteps: payload?.totalSteps as number,
                    status: (payload?.status as 'success' | 'skipped' | 'partial' | 'failed') || 'success',
                    summary: payload?.summary as string | undefined,
                    duration: payload?.duration as number | undefined,
                    artifacts: payload?.artifacts as string[] | undefined,
                },
            };
        }

        case 'system': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'system',
                stepId: raw.stepId as string | undefined,
                stepName: raw.stepName as string | undefined,
                payload: {
                    message: payload?.message as string,
                    level: (payload?.level as 'info' | 'warning' | 'success') || 'info',
                    subType: payload?.subType as 'phase_start' | 'phase_complete' | 'node_enter' | 'node_exit' | 'custom' | undefined,
                    metadata: payload?.metadata as Record<string, unknown> | undefined,
                },
            };
        }

        case 'agent_message': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'agent_message',
                stepId: raw.stepId as string | undefined,
                stepName: raw.stepName as string | undefined,
                payload: {
                    content: payload?.content as string,
                    sender: payload?.sender as string | undefined,
                    metadata: payload?.metadata as { model?: string; tokens?: number;[key: string]: unknown } | undefined,
                },
            };
        }

        case 'artifact': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'artifact',
                stepId: raw.stepId as string | undefined,
                stepName: raw.stepName as string | undefined,
                payload: {
                    artifactId: payload?.artifactId as string,
                    artifactType: payload?.artifactType as import('@/lib/types/graph-events.types').ArtifactType,
                    title: payload?.title as string,
                    description: payload?.description as string | undefined,
                    content: payload?.content,
                    actions: payload?.actions as import('@/lib/types/graph-events.types').ArtifactAction[] | undefined,
                    metadata: payload?.metadata as { mimeType?: string; size?: number;[key: string]: unknown } | undefined,
                },
            };
        }

        case 'progress': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'progress',
                stepId: raw.stepId as string | undefined,
                stepName: raw.stepName as string | undefined,
                payload: {
                    current: payload?.current as number,
                    total: payload?.total as number,
                    message: payload?.message as string | undefined,
                    subProgress: payload?.subProgress as import('@/lib/types/graph-events.types').SubProgressItem[] | undefined,
                },
            };
        }

        case 'error': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'error',
                stepId: raw.stepId as string | undefined,
                stepName: raw.stepName as string | undefined,
                payload: {
                    code: payload?.code as string,
                    message: payload?.message as string,
                    details: payload?.details as string | undefined,
                    retryable: payload?.retryable as boolean | undefined,
                    nodeId: payload?.nodeId as string | undefined,
                },
            };
        }

        case 'complete': {
            const payload = raw.payload as Record<string, unknown> | undefined;
            return {
                ...baseEvent,
                type: 'complete',
                payload: {
                    status: (payload?.status as 'success' | 'partial' | 'failed') || 'success',
                    message: payload?.message as string | undefined,
                    summary: payload?.summary as { itemsProcessed?: number; artifactsGenerated?: number; duration?: number;[key: string]: unknown } | undefined,
                    artifacts: payload?.artifacts as string[] | undefined,
                },
            };
        }

        // NOTE: hitl_request event type is DEPRECATED.
        // HITL is now detected via thread state interrupts, not custom events.
        // Keeping this case for backward compatibility during migration.
        case 'hitl_request': {
            if (!USE_INTERRUPT_BASED_HITL) {
                // Legacy path: handle hitl_request events (remove after migration)
                const payload = raw.payload as Record<string, unknown> | undefined;
                return {
                    ...baseEvent,
                    type: 'hitl_request',
                    stepId: raw.stepId as string | undefined,
                    stepName: raw.stepName as string | undefined,
                    payload: {
                        requestId: payload?.requestId as string,
                        prompt: payload?.prompt as string,
                        inputType: payload?.inputType as import('@/lib/types/graph-events.types').HITLInputType | undefined,
                        options: payload?.options as import('@/lib/types/graph-events.types').HITLOption[] | undefined,
                        defaultValue: payload?.defaultValue,
                        required: payload?.required as boolean | undefined,
                        timeout: payload?.timeout as number | undefined,
                    },
                };
            }
            // When using interrupt-based HITL, ignore hitl_request events
            console.log('[useLangGraphStream] Ignoring deprecated hitl_request event (using interrupt-based detection)');
            return null;
        }

        default:
            // Unknown event type - log and skip
            console.log('[useLangGraphStream] Unknown event type:', type, raw);
            return null;
    }
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useLangGraphStream(options: UseLangGraphStreamOptions): UseLangGraphStreamReturn {
    const { graphId, workspaceId, onEvent, onError, onComplete } = options;

    const [state, setState] = useState<GraphStreamState>(initialState);
    const abortControllerRef = useRef<AbortController | null>(null);
    const messagesRef = useRef<ChatMessage[]>([]);
    const artifactsRef = useRef<Map<string, ArtifactPayload>>(new Map());
    const threadIdRef = useRef<string | null>(null);

    // Helper to add a chat message
    const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: ChatMessage = {
            ...message,
            id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
        };
        messagesRef.current = [...messagesRef.current, newMessage];
        setState(prev => ({
            ...prev,
            messages: messagesRef.current,
        }));
        return newMessage.id;
    }, []);

    // ============================================================================
    // HITL Detection via Thread State Polling
    // ============================================================================

    /**
     * Check for pending interrupts in thread state.
     * This is the new interrupt-based HITL detection mechanism.
     */
    const checkForInterrupts = useCallback(async (threadId: string): Promise<HITLRequestPayload | null> => {
        try {
            console.log('[useLangGraphStream] Checking for interrupts in thread:', threadId);

            const threadState = await getThreadState(threadId);

            if (!threadState) {
                console.log('[useLangGraphStream] No thread state returned');
                return null;
            }

            // Find tasks with pending interrupts
            const interruptedTask = threadState.tasks?.find(
                task => task.interrupts && task.interrupts.length > 0
            );

            if (!interruptedTask?.interrupts?.[0]) {
                console.log('[useLangGraphStream] No interrupts found in thread state');
                return null;
            }

            const interruptValue = interruptedTask.interrupts[0].value;
            console.log('[useLangGraphStream] Found interrupt:', interruptValue);

            // Validate the payload using Zod schema
            const validation = validateHITLPayload(interruptValue);
            if (!validation.success) {
                console.error('[useLangGraphStream] Invalid HITL interrupt payload:', validation.error.errors);
                // Graceful degradation: create a basic HITL request from the raw value
                const fallbackPayload: HITLRequestPayload = {
                    requestId: `interrupt-${interruptedTask.id || Date.now()}`,
                    message: typeof interruptValue === 'string'
                        ? interruptValue
                        : 'Your input is required to continue',
                    requestType: 'data_input',
                    allowFreeInput: true,
                    priority: 'normal',
                    prompt: typeof interruptValue === 'string'
                        ? interruptValue
                        : 'Your input is required to continue',
                };
                return fallbackPayload;
            }

            // Convert to frontend-friendly format using the utility function
            const hitlRequest = convertInterruptToHITLRequest(
                validation.data as HITLInterruptPayload,
                interruptedTask.id || `task-${Date.now()}`
            );

            console.log('[useLangGraphStream] Converted HITL request:', hitlRequest);
            return hitlRequest;

        } catch (error) {
            console.error('[useLangGraphStream] Error checking for interrupts:', error);
            return null;
        }
    }, []);

    // Cancel streaming
    const cancelStream = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        setState(prev => ({
            ...prev,
            isConnected: false,
            status: 'idle',
            currentStep: null,
            progress: null,
            pendingHITL: null,
        }));
    }, []);

    // Handle incoming graph event
    const handleGraphEvent = useCallback((event: GraphEvent) => {
        // Call external event handler if provided
        onEvent?.(event);

        // Update state based on event type
        if (isStepStartEvent(event)) {
            addMessage({
                type: 'step',
                content: `Starting: ${event.payload.stepName}`,
                metadata: {
                    eventId: event.id,
                    stepId: event.payload.stepId,
                    stepNumber: event.payload.stepNumber,
                    totalSteps: event.payload.totalSteps,
                },
            });

            setState(prev => ({
                ...prev,
                currentStep: event.payload,
                status: 'running',
            }));
        }
        else if (isStepCompleteEvent(event)) {
            addMessage({
                type: 'step',
                content: `Completed: ${event.payload.stepName}${event.payload.summary ? ` - ${event.payload.summary}` : ''}`,
                metadata: {
                    eventId: event.id,
                    stepId: event.payload.stepId,
                    stepNumber: event.payload.stepNumber,
                    totalSteps: event.payload.totalSteps,
                },
            });

            setState(prev => ({
                ...prev,
                completedSteps: [...prev.completedSteps, event.payload],
                currentStep: null,
            }));
        }
        else if (isSystemEvent(event)) {
            addMessage({
                type: 'system',
                content: event.payload.message,
                metadata: {
                    eventId: event.id,
                    stepId: event.stepId,
                },
            });
        }
        else if (isAgentMessageEvent(event)) {
            addMessage({
                type: 'agent',
                content: event.payload.content,
                sender: event.payload.sender,
                metadata: {
                    eventId: event.id,
                    stepId: event.stepId,
                },
            });
        }
        else if (isArtifactEvent(event)) {
            // Store artifact
            artifactsRef.current.set(event.payload.artifactId, event.payload);

            addMessage({
                type: 'artifact',
                content: event.payload.title,
                metadata: {
                    eventId: event.id,
                    stepId: event.stepId,
                    artifactId: event.payload.artifactId,
                    artifactType: event.payload.artifactType,
                },
            });

            setState(prev => ({
                ...prev,
                artifacts: new Map(artifactsRef.current),
            }));
        }
        else if (isProgressEvent(event)) {
            setState(prev => ({
                ...prev,
                progress: event.payload,
            }));
        }
        else if (isHITLRequestEvent(event)) {
            // NOTE: This path is only used for legacy hitl_request events
            // when USE_INTERRUPT_BASED_HITL is false
            addMessage({
                type: 'hitl',
                content: event.payload.prompt ?? event.payload.message ?? '',
                metadata: {
                    eventId: event.id,
                    stepId: event.stepId,
                    requestId: event.payload.requestId,
                },
            });

            setState(prev => ({
                ...prev,
                pendingHITL: event.payload,
                status: 'hitl_pending',
            }));
        }
        else if (isErrorEvent(event)) {
            addMessage({
                type: 'system',
                content: `Error: ${event.payload.message}`,
                metadata: {
                    eventId: event.id,
                    stepId: event.stepId,
                },
            });

            setState(prev => ({
                ...prev,
                error: event.payload,
                status: 'error',
            }));

            onError?.(new Error(event.payload.message));
        }
        else if (isCompleteEvent(event)) {
            const isFailed = event.payload.status === 'failed';

            addMessage({
                type: isFailed ? 'system' : 'agent',
                content: event.payload.message || (isFailed ? 'Workflow failed' : 'Workflow completed successfully!'),
                metadata: {
                    eventId: event.id,
                },
            });

            setState(prev => ({
                ...prev,
                status: isFailed ? 'error' : 'complete',
                completeEvent: event.payload,
                error: isFailed ? {
                    code: 'WORKFLOW_FAILED',
                    message: event.payload.message || 'Workflow failed',
                    details: event.payload.summary ? JSON.stringify(event.payload.summary) : undefined
                } : prev.error,
                currentStep: null,
                progress: null,
                pendingHITL: null,
            }));

            // Don't cancel the stream - let it end naturally
            // The stream will complete on its own after the complete event

            onComplete?.(event.payload.summary);
        }
    }, [onEvent, onError, onComplete, addMessage, cancelStream]);

    // Start streaming using thread-based runs for HITL support
    const startStream = useCallback(async (input: Record<string, unknown>) => {
        try {
            setState(prev => ({ ...prev, status: 'connecting' }));

            // Create abort controller for cancellation support
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            // Start streaming with thread-based run
            const result = await streamLangGraphEvents({
                assistantId: graphId,
                input,
                signal,
                onEvent: (rawEvent) => {
                    // Convert to unified event format
                    const graphEvent = convertToGraphEvent(rawEvent);
                    if (graphEvent) {
                        handleGraphEvent(graphEvent);

                        // Update thread ID if provided in event
                        if (rawEvent.threadId && rawEvent.threadId !== threadIdRef.current) {
                            threadIdRef.current = rawEvent.threadId;
                            setState(prev => ({
                                ...prev,
                                threadId: rawEvent.threadId,
                            }));
                        }
                    }
                },
                onError: (error) => {
                    onError?.(error);
                },
                onComplete: () => {
                    setState(prev => ({
                        ...prev,
                        isConnected: false,
                    }));
                },
            });

            if (result.success) {
                // Store thread ID
                if (result.threadId) {
                    threadIdRef.current = result.threadId;
                }

                console.log('[useLangGraphStream] Stream result:', {
                    success: result.success,
                    threadId: result.threadId,
                    hasInterrupts: result.interrupts && result.interrupts.length > 0,
                });

                // Check for interrupts using the new protocol
                if (USE_INTERRUPT_BASED_HITL && result.threadId) {
                    const hitlRequest = await checkForInterrupts(result.threadId);

                    if (hitlRequest) {
                        // Found an interrupt - set HITL pending state
                        addMessage({
                            type: 'hitl',
                            content: hitlRequest.message || hitlRequest.prompt || 'Your input is required to continue',
                            metadata: {
                                requestId: hitlRequest.requestId,
                            },
                        });

                        setState(prev => ({
                            ...prev,
                            threadId: result.threadId || prev.threadId,
                            graphId,
                            isConnected: false,
                            pendingHITL: hitlRequest,
                            status: 'hitl_pending' as const,
                        }));

                        return; // Exit early - waiting for HITL response
                    }
                }

                // No interrupts - check for legacy native interrupt handling
                // (This is kept for backward compatibility with older backends)
                const hasNativeInterrupts = !USE_INTERRUPT_BASED_HITL && result.interrupts && result.interrupts.length > 0;

                if (hasNativeInterrupts) {
                    // Legacy: Synthesize HITL from native interrupt
                    const interrupt = result.interrupts![0];
                    const interruptValue = interrupt.value;

                    const syntheticHITL: HITLRequestPayload = {
                        requestId: `interrupt-${interrupt.taskId || Date.now()}`,
                        prompt: typeof interruptValue === 'string'
                            ? interruptValue
                            : (interruptValue as Record<string, unknown>)?.message as string || 'Your input is required to continue',
                        requestType: 'data_input',
                        allowFreeInput: true,
                        priority: 'normal',
                    };

                    addMessage({
                        type: 'hitl',
                        content: syntheticHITL.prompt || syntheticHITL.message || 'Your input is required',
                        metadata: {
                            requestId: syntheticHITL.requestId,
                        },
                    });

                    setState(prev => ({
                        ...prev,
                        threadId: result.threadId || prev.threadId,
                        graphId,
                        isConnected: false,
                        pendingHITL: syntheticHITL,
                        status: 'hitl_pending' as const,
                    }));

                    return;
                }

                // No HITL - normal completion
                setState(prev => ({
                    ...prev,
                    threadId: result.threadId || prev.threadId,
                    graphId,
                    isConnected: false,
                    // Don't override status if already set to 'complete' or 'error' by event handler
                    status: prev.status === 'complete' || prev.status === 'error' ? prev.status : (result.threadId ? 'running' : 'complete'),
                }));

            } else {
                setState(prev => ({
                    ...prev,
                    status: 'error',
                    error: {
                        code: 'STREAM_ERROR',
                        message: result.error || 'Stream failed',
                    },
                }));
            }

        } catch (error) {
            // Handle AbortError gracefully
            if (error instanceof Error && error.name === 'AbortError') {
                setState(prev => ({
                    ...prev,
                    isConnected: false,
                    status: 'idle',
                }));
                return;
            }

            const errorMessage = error instanceof Error ? error.message : 'Failed to start stream';
            setState(prev => ({
                ...prev,
                status: 'error',
                error: {
                    code: 'START_ERROR',
                    message: errorMessage,
                },
            }));

            onError?.(new Error(errorMessage));
        }
    }, [graphId, handleGraphEvent, checkForInterrupts, addMessage, onError]);

    // Respond to HITL request by resuming the graph
    const respondToHITL = useCallback(async (requestId: string, response: unknown) => {
        const currentThreadId = threadIdRef.current || state.threadId;

        if (!currentThreadId) {
            console.error('[respondToHITL] No thread ID available for HITL response');
            return;
        }

        try {
            console.log('[respondToHITL] Resuming workflow:', {
                threadId: currentThreadId,
                graphId,
                requestId,
                responseType: typeof response,
                responsePreview: typeof response === 'string'
                    ? response.substring(0, 100)
                    : JSON.stringify(response).substring(0, 100),
            });

            // Clear HITL state and set to connecting
            setState(prev => ({
                ...prev,
                pendingHITL: null,
                status: 'connecting',
            }));

            // Add user response to messages - extract readable text
            const displayContent = (() => {
                if (typeof response === 'string') return response;
                // Handle arrays first (multi-select, page selection, etc.)
                if (Array.isArray(response)) {
                    return response.map(item => {
                        if (typeof item === 'string') return item;
                        if (typeof item === 'object' && item !== null) {
                            const obj = item as Record<string, any>;
                            // Extract the most meaningful display value from each item
                            return obj.url || obj.value || obj.label || obj.page_name || obj.text || obj.name || JSON.stringify(obj);
                        }
                        return String(item);
                    }).join(', ');
                }
                if (typeof response === 'object' && response !== null) {
                    const obj = response as Record<string, any>;
                    // Common patterns: {feedback: "..."}, {value: "..."}, {response: "..."}, {message: "..."}
                    const textValue = obj.feedback || obj.value || obj.response || obj.message || obj.text;
                    if (typeof textValue === 'string' && textValue) return textValue;
                    // {approved: true/false} pattern
                    if ('approved' in obj) return obj.approved ? 'Approved ✓' : 'Rejected ✗';
                    // Fallback: join all string values
                    const strings = Object.values(obj).filter(v => typeof v === 'string' && v);
                    if (strings.length > 0) return (strings as string[]).join(', ');
                }
                return String(response);
            })();

            addMessage({
                type: 'user',
                content: displayContent,
                metadata: {
                    requestId,
                },
            });

            // Create abort controller for cancellation support
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            // Resume the graph with the user's response
            const result = await resumeLangGraphWorkflow(currentThreadId, graphId, response, {
                signal,
                onEvent: (rawEvent) => {
                    // Convert to unified event format
                    const graphEvent = convertToGraphEvent(rawEvent);
                    if (graphEvent) {
                        handleGraphEvent(graphEvent);
                    }
                },
                onError: (error) => {
                    onError?.(error);
                },
                onComplete: () => {
                    setState(prev => ({
                        ...prev,
                        isConnected: false,
                    }));
                },
            });

            if (result.success) {
                console.log('[respondToHITL] Resume result:', {
                    success: result.success,
                    hasInterrupts: result.interrupts && result.interrupts.length > 0,
                });

                // Check for interrupts using the new protocol
                if (USE_INTERRUPT_BASED_HITL && currentThreadId) {
                    const hitlRequest = await checkForInterrupts(currentThreadId);

                    if (hitlRequest) {
                        // Another interrupt found - workflow needs more input
                        addMessage({
                            type: 'hitl',
                            content: hitlRequest.message || hitlRequest.prompt || 'Your input is required to continue',
                            metadata: {
                                requestId: hitlRequest.requestId,
                            },
                        });

                        setState(prev => ({
                            ...prev,
                            isConnected: false,
                            pendingHITL: hitlRequest,
                            status: 'hitl_pending' as const,
                        }));

                        return;
                    }
                }

                // No interrupts - check for legacy native interrupt handling
                const hasNativeInterrupts = !USE_INTERRUPT_BASED_HITL && result.interrupts && result.interrupts.length > 0;

                if (hasNativeInterrupts) {
                    const interrupt = result.interrupts![0];
                    const interruptValue = interrupt.value;

                    const syntheticHITL: HITLRequestPayload = {
                        requestId: `interrupt-${interrupt.taskId || Date.now()}`,
                        prompt: typeof interruptValue === 'string'
                            ? interruptValue
                            : (interruptValue as Record<string, unknown>)?.message as string || 'Your input is required to continue',
                        requestType: 'data_input',
                        allowFreeInput: true,
                        priority: 'normal',
                    };

                    addMessage({
                        type: 'hitl',
                        content: syntheticHITL.prompt || syntheticHITL.message || 'Your input is required',
                        metadata: {
                            requestId: syntheticHITL.requestId,
                        },
                    });

                    setState(prev => ({
                        ...prev,
                        isConnected: false,
                        pendingHITL: syntheticHITL,
                        status: 'hitl_pending' as const,
                    }));

                    return;
                }

                // No HITL - continue running or complete
                setState(prev => ({
                    ...prev,
                    isConnected: false,
                    // Don't override status if already set to 'complete' or 'error' by event handler
                    status: prev.status === 'complete' || prev.status === 'error' ? prev.status : 'running',
                }));

            } else {
                setState(prev => ({
                    ...prev,
                    status: 'error',
                    error: {
                        code: 'RESUME_ERROR',
                        message: result.error || 'Failed to resume workflow',
                    },
                }));
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit response';
            setState(prev => ({
                ...prev,
                error: {
                    code: 'HITL_ERROR',
                    message: errorMessage,
                },
                status: 'error',
            }));

            onError?.(new Error(errorMessage));
        }
    }, [state.threadId, graphId, addMessage, handleGraphEvent, checkForInterrupts, onError]);

    // Reset state
    const reset = useCallback(() => {
        cancelStream();
        messagesRef.current = [];
        artifactsRef.current = new Map();
        threadIdRef.current = null;
        setState(initialState);
    }, [cancelStream]);

    // Clear error
    const clearError = useCallback(() => {
        setState(prev => ({
            ...prev,
            error: null,
            status: prev.status === 'error' ? 'idle' : prev.status,
        }));
    }, []);

    return {
        // State
        state,

        // Actions
        startStream,
        respondToHITL,
        cancelStream,
        reset,
        addMessage,
        clearError,

        // Derived state
        isRunning: state.status === 'running' || state.status === 'connecting' || state.status === 'hitl_pending',
        isConnecting: state.status === 'connecting',
        isHITLPending: state.status === 'hitl_pending',
        isComplete: state.status === 'complete',
        currentStep: state.currentStep,
        progress: state.progress,
        error: state.error,
        completeEvent: state.completeEvent,
        messages: state.messages,
        artifacts: Array.from(state.artifacts.values()),
        hitlRequestId: state.pendingHITL?.requestId || null,
    };
}
