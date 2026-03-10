'use client';

import React from 'react';
import { ChatMessage as ChatMessageType, HITLRequestPayload, HITLOption, HITLType } from '@/lib/types/graph-events.types';
import HITLMessageCard from './HITLMessageCard';
import MarkdownRenderer from './artifacts/MarkdownRenderer';

interface ChatMessageProps {
    message: ChatMessageType;
    onHITLRespond?: (response: Record<string, unknown>) => void;
}

interface ChatMetadata {
    eventId?: string;
    stepId?: string;
    stepNumber?: number;
    totalSteps?: number;
    artifactId?: string;
    artifactType?: string;
    phase?: string;
    data?: HITLRequestPayload | Record<string, unknown>;
    [key: string]: unknown;
}

export default function ChatMessage({ message, onHITLRespond }: ChatMessageProps) {
    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const metadata = message.metadata as ChatMetadata | undefined;

    // HITL messages get special rendering
    if (message.type === 'hitl') {
        const hitlData = metadata?.data as HITLRequestPayload | undefined;
        if (hitlData && onHITLRespond) {
            // Convert legacy options format to HITLOption format if needed
            const options: HITLOption[] | undefined = hitlData.options?.map((opt: HITLOption | { label: string; value: string }) => {
                if ('id' in opt) {
                    return opt as HITLOption;
                }
                return {
                    id: String((opt as { label: string; value: string }).value),
                    label: (opt as { label: string; value: string }).label,
                    value: (opt as { label: string; value: string }).value,
                } as HITLOption;
            });

            return (
                <div className="flex justify-center my-4">
                    <HITLMessageCard
                        request={{
                            requestType: hitlData.requestType || (hitlData.inputType as HITLType | undefined) || 'confirmation',
                            prompt: hitlData.prompt || message.content,
                            message: hitlData.message,
                            options,
                            default: hitlData.default,
                            defaultValue: hitlData.defaultValue,
                            allowFreeInput: hitlData.allowFreeInput,
                            data: hitlData.data,
                            timeout: hitlData.timeout,
                            timeoutSeconds: hitlData.timeoutSeconds,
                            priority: hitlData.priority,
                            requestId: hitlData.requestId || message.id,
                        }}
                        onRespond={onHITLRespond}
                    />
                </div>
            );
        }
    }

    // System messages - center aligned, gray background
    if (message.type === 'system') {
        return (
            <div className="flex justify-center my-6 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex flex-col items-center">
                    {metadata?.phase && (
                        <span className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">
                            Phase: {metadata.phase.replace(/_/g, ' ')}
                        </span>
                    )}
                    <span className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-full">
                        {message.content}
                    </span>
                </div>
            </div>
        );
    }

    // User messages - right aligned, blue background
    if (message.type === 'user') {
        return (
            <div className="flex justify-end my-2">
                <div className="flex flex-col items-end max-w-[70%] text-[15px]">
                    <div className="bg-gradient-to-tr from-blue-600 to-blue-500 text-white px-5 py-3.5 rounded-2xl rounded-br-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-shadow">
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1.5 mr-2 font-medium">
                        {formatTime(message.timestamp)}
                    </span>
                </div>
            </div>
        );
    }

    // Agent messages - left aligned, white background
    return (
        <div className="flex justify-start my-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm mb-6">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <div className="bg-white border border-slate-200 px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-sm">
                        <MarkdownRenderer content={message.content} />
                        {metadata?.data && (
                            <div className="mt-3 pt-3 border-t border-slate-100">
                                <details className="group">
                                    <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                                        <svg className="w-3 h-3 transform group-open:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                        View details
                                    </summary>
                                    <pre className="mt-2 text-[11px] overflow-auto max-h-60 bg-slate-50 border border-slate-100 p-3 rounded-xl text-slate-600 font-mono">
                                        {JSON.stringify(metadata.data, null, 2)}
                                    </pre>
                                </details>
                            </div>
                        )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1.5 ml-2 font-medium">
                        {formatTime(message.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
}
