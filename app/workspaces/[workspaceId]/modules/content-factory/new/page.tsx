'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, Bot, ExternalLink, Download, Copy, Check, BarChart3, X } from 'lucide-react';
import { useLangGraphStream } from '@/lib/hooks/useLangGraphStream';
import {
    GraphEvent,
    ChatMessage,
    ArtifactPayload,
    HITLRequestPayload,
    BROWSING_ARCHITECT_STEPS,
    calculateOverallProgress,
} from '@/lib/types/graph-events.types';
import { normalizeUrl } from '@/components/content-factory/utils/form-validation';
import ChatInput from '@/components/content-factory/chat/ChatInput';
import ArtifactCardRouter from '@/components/content-factory/chat/artifacts/ArtifactCardRouter';
import Notification from '@/components/ui/Notification';

/**
 * New Project Page - Chat Interface with LangGraph Streaming
 *
 * A chat interface that takes a website URL and streams LangGraph workflow events
 * in real-time using the unified event system.
 */
export default function NewProjectPage() {
    const params = useParams();
    const router = useRouter();
    const workspaceId = params.workspaceId as string;

    // Chat input state (for external control)
    const [chatInputValue, setChatInputValue] = useState('');

    // Search Analytics toggle (Google Search Console)
    const [searchAnalytics, setSearchAnalytics] = useState(false);

    // Chat container ref for auto-scrolling
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Copy state for artifacts
    const [copiedArtifactId, setCopiedArtifactId] = useState<string | null>(null);

    // Success notification dismiss state
    const [successDismissed, setSuccessDismissed] = useState(false);

    // Use the LangGraph stream hook
    const {
        state: streamState,
        startStream,
        addMessage,
        respondToHITL,
        cancelStream,
        reset,
        clearError,
        isRunning,
        isConnecting,
        isHITLPending,
        isComplete,
        currentStep,
        progress,
        error,
        completeEvent,
        messages,
        artifacts,
    } = useLangGraphStream({
        graphId: 'browsing_architect',
        workspaceId,
        onComplete: (summary) => {
            console.log('Workflow completed:', summary);
            // Stay on the current page as requested
        },
    });

    // Extract URL from message and start workflow
    const handleSendMessage = useCallback((message: string) => {
        // Clear the input after sending
        setChatInputValue('');

        // If workflow is not running, check if it's a URL to start
        if (!isRunning) {
            // Try to extract URL from message (handles formats like "Analyze https://lcinc.ca/")
            const urlMatch = message.match(/https?:\/\/[^\s]+/);
            if (urlMatch) {
                // Extract and normalize the URL
                let extractedUrl = urlMatch[0];
                // Remove trailing punctuation that might be part of sentence (like ".", "/", etc.)
                extractedUrl = extractedUrl.replace(/[.,;:!?\)\]]+$/, '');

                // Normalize the URL (ensure protocol, remove trailing slash)
                const normalizedUrl = normalizeUrl(extractedUrl);

                if (normalizedUrl) {
                    // Add the user's trigger message to chat history
                    addMessage({
                        type: 'user',
                        content: message,
                    });

                    // Start the workflow with only the URL as the trigger
                    // The graph expects 'site_url' as the input
                    startStream({
                        site_url: normalizedUrl,
                        search_analytics: searchAnalytics,
                    });
                } else {
                    // Invalid URL format - this would be handled by UI feedback
                    console.error('Invalid URL format:', extractedUrl);
                }
            } else {
                // No URL found - show error message
                console.error('No URL found in message:', message);
            }
        } else if (isHITLPending && streamState.pendingHITL) {
            // If there's a pending HITL request, treat message as response
            // Send raw string - LangGraph's interrupt() returns exactly what command.resume contains
            respondToHITL(streamState.pendingHITL.requestId, message);
        }
    }, [isRunning, isHITLPending, streamState.pendingHITL, startStream, respondToHITL, addMessage]);

    // Handle HITL response from the HITL card
    const handleHITLRespond = useCallback((response: unknown) => {
        if (streamState.pendingHITL) {
            respondToHITL(streamState.pendingHITL.requestId, response);
        }
    }, [streamState.pendingHITL, respondToHITL]);

    // Copy artifact content to clipboard
    const handleCopyArtifact = useCallback(async (artifact: ArtifactPayload) => {
        const content = typeof artifact.content === 'string'
            ? artifact.content
            : JSON.stringify(artifact.content, null, 2);
        await navigator.clipboard.writeText(content);
        setCopiedArtifactId(artifact.artifactId);
        setTimeout(() => setCopiedArtifactId(null), 2000);
    }, []);

    // Download artifact
    const handleDownloadArtifact = useCallback((artifact: ArtifactPayload) => {
        const content = typeof artifact.content === 'string'
            ? artifact.content
            : JSON.stringify(artifact.content, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${artifact.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, []);

    // Redirect if workspaceId is not available
    useEffect(() => {
        if (!workspaceId || workspaceId === 'undefined') {
            router.push('/workspaces');
        }
    }, [workspaceId, router]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Don't render if workspaceId is not available - AFTER all hooks
    if (!workspaceId || workspaceId === 'undefined') {
        return null;
    }

    // Input is disabled when workflow is running and no HITL is pending
    const isInputDisabled = isRunning && !isHITLPending;

    // Calculate overall progress
    const overallProgress = currentStep
        ? calculateOverallProgress(currentStep.stepNumber, currentStep.totalSteps, progress?.current ? (progress.current / progress.total) * 100 : undefined)
        : 0;

    return (
        <div className="flex flex-col h-full bg-slate-50 min-h-[calc(100vh-100px)] lg:rounded-2xl lg:border lg:border-slate-200 lg:shadow-sm overflow-hidden relative">
            {/* Error notification */}
            <Notification
                message={error?.message || ''}
                variant="error"
                visible={!!error}
                onClose={clearError}
            />

            {/* Success notification when workflow completes successfully */}
            <Notification
                message={completeEvent?.message || 'Workflow completed successfully!'}
                variant="success"
                visible={isComplete && completeEvent?.status === 'success' && !successDismissed}
                onClose={() => setSuccessDismissed(true)}
            />

            {/* Status indicator when running (but not during HITL) */}
            {isRunning && !isHITLPending && (
                <div className="flex-shrink-0 bg-blue-50/50 backdrop-blur border-b border-blue-100/50 px-6 py-2.5 sticky top-0 z-10 transition-all">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-[13px] font-medium text-blue-700 mb-2">
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            <span>
                                {currentStep
                                    ? `Step ${currentStep.stepNumber}/${currentStep.totalSteps}: ${currentStep.stepName}`
                                    : 'Processing...'
                                }
                            </span>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-blue-100 rounded-full h-1.5">
                            <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* HITL Pending Status Banner */}
            {isHITLPending && (
                <div className="flex-shrink-0 bg-amber-50/50 backdrop-blur border-b border-amber-100/50 px-6 py-2.5 sticky top-0 z-10 transition-all">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-[13px] font-medium text-amber-700">
                            <AlertCircle className="h-3.5 w-3.5" />
                            <span>Waiting for your response - please check the chat or enter your feedback below</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Messages Area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 scroll-smooth"
            >
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Welcome message if no messages yet */}
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center mb-6 transform transition-transform hover:scale-105">
                                <Bot className="h-10 w-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 mb-3 tracking-tight">
                                How can I help you today?
                            </h2>
                            <p className="text-slate-500 max-w-md mb-8 text-lg">
                                Enter a website URL to begin an AI-powered content analysis and generation workflow.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
                                {['https://www.hptourtravel.com', 'https://lcinc.ca/', 'https://homefreestairlift.com/'].map((url) => (
                                    <button
                                        key={url}
                                        onClick={() => setChatInputValue(`Analyze ${url}`)}
                                        className="px-4 py-2 text-sm bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-700 hover:shadow-sm transition-all duration-200"
                                    >
                                        {url}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Chat messages */}
                    {messages.map((message) => (
                        <MessageRenderer
                            key={message.id}
                            message={message}
                            artifacts={artifacts}
                            pendingHITL={streamState.pendingHITL}
                            onHITLRespond={handleHITLRespond}
                            onCopyArtifact={handleCopyArtifact}
                            onDownloadArtifact={handleDownloadArtifact}
                            copiedArtifactId={copiedArtifactId}
                            onAppendToInput={(text: string) => {
                                setChatInputValue(prev => prev ? `${prev}\n${text}` : text);
                            }}
                        />
                    ))}

                    {/* Typing indicator when workflow is running */}
                    {isRunning && !isHITLPending && (
                        <div className="flex justify-start my-4 animate-in fade-in slide-in-from-bottom-2">
                            <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {progress?.message || 'Processing...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Completion message */}
                    {streamState.status === 'complete' && (
                        <div className="flex justify-center my-4">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-5 max-w-md text-center">
                                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-2" />
                                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                    Workflow Complete!
                                </h3>
                                <p className="text-sm text-neutral-600 mb-2">
                                    Your project has been initialized successfully.
                                </p>
                                <p className="text-xs text-neutral-500">
                                    Redirecting to Content Factory in a few seconds...
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Analytics Toggle + Chat Input */}
            <div className="border-t border-slate-200/80 bg-white/80 backdrop-blur-sm">
                {/* Toggle - only show before workflow starts */}
                {!isRunning && messages.length === 0 && (
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3">
                        <button
                            type="button"
                            onClick={() => setSearchAnalytics(prev => !prev)}
                            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${searchAnalytics
                                ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm shadow-blue-100'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                        >
                            <BarChart3 className={`w-4 h-4 ${searchAnalytics ? 'text-blue-600' : 'text-slate-400'
                                }`} />
                            <span>Google Search Console</span>
                            <div className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${searchAnalytics ? 'bg-blue-500' : 'bg-slate-300'
                                }`}>
                                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${searchAnalytics ? 'translate-x-[18px]' : 'translate-x-0.5'
                                    }`} />
                            </div>
                        </button>
                    </div>
                )}

                <ChatInput
                    onSend={handleSendMessage}
                    disabled={isInputDisabled}
                    placeholder={
                        isHITLPending
                            ? 'Enter your response...'
                            : isRunning
                                ? 'Waiting for workflow to complete...'
                                : 'Enter a website URL to start analysis...'
                    }
                    inputValue={chatInputValue}
                    onInputChange={setChatInputValue}
                />
            </div>
        </div>
    );
}

// ============================================
// Message Renderer Component
// ============================================

interface MessageRendererProps {
    message: ChatMessage;
    artifacts: ArtifactPayload[];
    pendingHITL: HITLRequestPayload | null;
    onHITLRespond: (response: unknown) => void;
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
    onAppendToInput?: (text: string) => void;
}

function MessageRenderer({
    message,
    artifacts,
    pendingHITL,
    onHITLRespond,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
    onAppendToInput,
}: MessageRendererProps) {
    const metadata = message.metadata;

    // User messages - right aligned
    if (message.type === 'user') {
        return (
            <div className="flex justify-end my-4">
                <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl rounded-br-sm max-w-[80%] shadow-sm">
                    <p className="text-[15px] leading-relaxed">{message.content}</p>
                </div>
            </div>
        );
    }

    // System messages - center aligned, smaller
    if (message.type === 'system') {
        return (
            <div className="flex justify-center my-2">
                <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-medium">
                    {message.content}
                </div>
            </div>
        );
    }

    // Step messages - similar to system but with step info
    if (message.type === 'step') {
        const stepNumber = metadata?.stepNumber;
        const totalSteps = metadata?.totalSteps;
        const stepLabel = stepNumber && totalSteps
            ? `Step ${stepNumber}/${totalSteps}`
            : '';

        return (
            <div className="flex justify-center my-2">
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-medium">
                    {stepLabel && (
                        <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                            {stepLabel}
                        </span>
                    )}
                    {message.content}
                </div>
            </div>
        );
    }

    // Agent messages - left aligned with avatar
    if (message.type === 'agent') {
        return (
            <div className="flex justify-start my-4">
                <div className="flex gap-3 max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-sm">
                        <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm">
                        <p className="text-[15px] leading-relaxed text-slate-800">{message.content}</p>
                        {message.sender && (
                            <p className="text-xs text-slate-400 mt-2">{message.sender}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Artifact messages - routed to dedicated card components
    if (message.type === 'artifact') {
        const artifactId = metadata?.artifactId;
        const artifact = artifacts.find(a => a.artifactId === artifactId);

        if (!artifact) return null;

        return (
            <ArtifactCardRouter
                artifact={artifact}
                onRespond={onHITLRespond}
                onCopyArtifact={onCopyArtifact}
                onDownloadArtifact={onDownloadArtifact}
                copiedArtifactId={copiedArtifactId}
                onAppendToInput={onAppendToInput}
            />
        );
    }

    // HITL messages - interactive card (or static if already responded)
    if (message.type === 'hitl') {
        const isActive = pendingHITL !== null && pendingHITL.requestId === metadata?.requestId;
        const hitlData = isActive ? pendingHITL : null;

        return (
            <div className="flex justify-start my-4">
                <div className="flex gap-3 max-w-[85%]">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-amber-100' : 'bg-slate-100'}`}>
                        <AlertCircle className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                    </div>
                    <div className={`rounded-2xl rounded-tl-sm shadow-sm p-5 ${isActive ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50 border border-slate-200'}`}>
                        <p className={`text-[15px] leading-relaxed ${isActive ? 'text-amber-900' : 'text-slate-600'} ${hitlData ? 'mb-4' : ''}`}>
                            {message.content}
                        </p>

                        {/* Show interactive elements only when HITL is active */}
                        {hitlData && (
                            <>
                                {/* Confirmation type */}
                                {hitlData.requestType === 'confirmation' && hitlData.options && (
                                    <div className="flex gap-2">
                                        {hitlData.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => onHITLRespond(option.value)}
                                                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-white border border-amber-200 text-amber-800 hover:bg-amber-100"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Selection type - single select */}
                                {hitlData.requestType === 'selection' && hitlData.options && (
                                    <div className="space-y-2">
                                        {hitlData.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => onHITLRespond(option.value)}
                                                className="w-full text-left px-4 py-3 text-sm rounded-lg transition-colors bg-white border border-amber-200 hover:bg-amber-100"
                                            >
                                                <div className="font-medium text-slate-800">{option.label}</div>
                                                {option.description && (
                                                    <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Multi-selection type */}
                                {hitlData.requestType === 'multi_selection' && hitlData.options && (
                                    <div className="space-y-2">
                                        {hitlData.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => onHITLRespond([option.value])}
                                                className="w-full text-left px-4 py-3 text-sm rounded-lg transition-colors bg-white border border-amber-200 hover:bg-amber-100"
                                            >
                                                <div className="font-medium text-slate-800">{option.label}</div>
                                                {option.description && (
                                                    <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Feedback type - handled by chat input */}
                                {hitlData.requestType === 'feedback' && (
                                    <p className="text-xs text-amber-600 italic">
                                        Type your feedback in the chat input below
                                    </p>
                                )}

                                {/* Data input type - handled by chat input */}
                                {hitlData.requestType === 'data_input' && (
                                    <p className="text-xs text-amber-600 italic">
                                        Type your input in the chat input below
                                    </p>
                                )}

                                {/* Topic input type - handled by chat input */}
                                {hitlData.requestType === 'topic_input' && (
                                    <p className="text-xs text-amber-600 italic">
                                        Type your topic or question in the chat input below
                                    </p>
                                )}

                                {/* URL selection type */}
                                {hitlData.requestType === 'url_selection' && hitlData.options && (
                                    <div className="space-y-2">
                                        {hitlData.options.map((option) => (
                                            <button
                                                key={option.id}
                                                onClick={() => onHITLRespond([option.value])}
                                                className="w-full text-left px-4 py-3 text-sm rounded-lg transition-colors bg-white border border-amber-200 hover:bg-amber-100"
                                            >
                                                <div className="font-medium text-slate-800">{option.label}</div>
                                                <span className="text-xs text-slate-500 mt-0.5 block font-mono">{String(option.value)}</span>
                                                {option.description && (
                                                    <div className="text-xs text-slate-500 mt-0.5">{option.description}</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Content review type */}
                                {hitlData.requestType === 'content_review' && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onHITLRespond({ approved: true })}
                                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-emerald-600 text-white hover:bg-emerald-700"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => onHITLRespond({ approved: false })}
                                            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-white border border-amber-200 text-amber-800 hover:bg-amber-100"
                                        >
                                            Request Changes
                                        </button>
                                    </div>
                                )}

                                {/* Fallback: if no specific type matched, show text input hint */}
                                {!hitlData.options &&
                                    !['feedback', 'data_input', 'topic_input', 'content_review'].includes(hitlData.requestType || '') && (
                                        <p className="text-xs text-amber-600 italic">
                                            Type your response in the chat input below
                                        </p>
                                    )}
                            </>
                        )}

                        {/* Show "responded" indicator when no longer active */}
                        {!isActive && (
                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Responded
                            </p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
