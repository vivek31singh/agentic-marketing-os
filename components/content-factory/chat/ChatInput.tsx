'use client';

import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled: boolean;
    placeholder?: string;
    inputValue?: string;
    onInputChange?: (value: string) => void;
}

/**
 * ChatInput component for the chat interface
 * - Fixed input field at bottom
 * - Send button
 * - Disabled state with visual indication
 * - Supports external control of input value
 */
export default function ChatInput({
    onSend,
    disabled,
    placeholder = 'Type your message...',
    inputValue,
    onInputChange,
}: ChatInputProps) {
    // Use internal state if not controlled externally
    const [internalMessage, setInternalMessage] = useState('');

    // Determine if component is controlled or uncontrolled
    const isControlled = inputValue !== undefined && onInputChange !== undefined;
    const message = isControlled ? inputValue : internalMessage;
    const setMessage = isControlled ? onInputChange : setInternalMessage;

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="sticky bottom-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-6 pb-6 px-4 sm:px-6 z-20">
            <div className="flex flex-col gap-2 max-w-4xl mx-auto relative group">
                <div className={`relative flex items-end w-full rounded-[24px] transition-all shadow-sm ${disabled ? 'bg-slate-100 border border-slate-200' : 'bg-white border border-slate-300 hover:border-slate-400 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400'
                    }`}>
                    <div className={`absolute inset-0 -m-1 rounded-[24px] bg-gradient-to-r from-blue-500 to-indigo-500 blur-md opacity-20 transition-opacity duration-300 pointer-events-none ${disabled ? 'opacity-0' : 'group-focus-within:opacity-30 hover:opacity-20'}`} />

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder={placeholder}
                        rows={1}
                        className={`flex-1 px-5 py-4 text-[15px] bg-transparent focus:outline-none resize-none leading-relaxed z-10 ${disabled ? 'text-slate-500 cursor-not-allowed' : 'text-slate-900'
                            }`}
                        style={{ minHeight: '56px', maxHeight: '150px' }}
                    />

                    <div className="p-2 z-10 flex-shrink-0">
                        <button
                            onClick={handleSend}
                            disabled={disabled || !message.trim()}
                            className={`w-[40px] h-[40px] rounded-2xl flex items-center justify-center transition-all ${disabled || !message.trim()
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:scale-95'
                                }`}
                            aria-label="Send message"
                        >
                            {disabled ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {disabled && (
                    <div className="px-4 pb-2">
                        <p className="text-[13px] text-slate-500 font-medium animate-in fade-in flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                            Input is disabled while the workflow is running
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
