'use client';

import React, { useState, useEffect } from 'react';
import { HITLOption, HITLRequestPayload } from '@/lib/types/graph-events.types';

interface HITLMessageCardProps {
    request: HITLRequestPayload;
    onRespond: (response: Record<string, unknown>) => void;
}

/**
 * HITLMessageCard renders Human-in-the-Loop requests
 * Supports all HITL types from the new protocol:
 * - confirmation: Yes/No buttons
 * - selection: Single option selection
 * - multi_selection: Multiple options selection
 * - feedback: Text input for user feedback
 * - data_input: Free text/data input
 * - content_review: Review generated content
 * - url_selection: Select from list of URLs
 * - topic_input: Provide topic/question
 */
export default function HITLMessageCard({ request, onRespond }: HITLMessageCardProps) {
    const [selectedOptions, setSelectedOptions] = useState<unknown[]>([]);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize selected options with default values (limited to 5 max)
    useEffect(() => {
        if (request.default !== undefined) {
            if (Array.isArray(request.default)) {
                setSelectedOptions(request.default.slice(0, 5));
            } else {
                setSelectedOptions([request.default]);
            }
        }
    }, [request.default]);

    const handleConfirmation = (confirmed: boolean) => {
        setIsSubmitting(true);
        onRespond({ confirmed });
    };

    const handleSelection = (isMulti: boolean = false) => {
        if (selectedOptions.length === 0) return;
        setIsSubmitting(true);
        if (isMulti) {
            onRespond({ selected: selectedOptions });
        } else {
            onRespond({ selected: selectedOptions[0] });
        }
    };

    const handleFeedback = () => {
        if (!feedbackText.trim()) return;
        setIsSubmitting(true);
        onRespond({ feedback: feedbackText });
    };

    const toggleOption = (optionValue: unknown) => {
        setSelectedOptions(prev => {
            if (prev.includes(optionValue)) {
                // Remove if already selected
                return prev.filter(v => v !== optionValue);
            } else if (prev.length >= 5) {
                // Limit to 5 max selections
                return prev;
            }
            // Add if less than 5
            return [...prev, optionValue];
        });
    };

    const selectSingleOption = (optionValue: unknown) => {
        setSelectedOptions([optionValue]);
    };

    const getMessage = () => request.message || request.prompt || 'Your input is required';

    // Confirmation type - Yes/No buttons
    if (request.requestType === 'confirmation') {
        return (
            <div className="bg-white border border-amber-200 rounded-2xl p-6 max-w-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-amber-600 uppercase tracking-wider mb-1.5">Action Required</h4>
                        <p className="text-[15px] text-slate-700 mb-5 leading-relaxed">{getMessage()}</p>
                        <div className="flex gap-2.5">
                            <button
                                onClick={() => handleConfirmation(true)}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                            >
                                Yes, Confirm
                            </button>
                            <button
                                onClick={() => handleConfirmation(false)}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-[14px] font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm active:scale-[0.98]"
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Selection type - Single option selection
    if (request.requestType === 'selection' && request.options) {
        return (
            <div className="bg-white border border-blue-200 rounded-2xl p-6 max-w-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">Selection Required</h4>
                        <p className="text-[15px] text-slate-700 mb-5 leading-relaxed">{getMessage()}</p>

                        <div className="space-y-2 mb-5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {request.options.map((option: HITLOption) => (
                                <label
                                    key={option.id}
                                    className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${selectedOptions.includes(option.value)
                                        ? 'bg-blue-50/80 border-blue-300 shadow-sm'
                                        : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="selection-option"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => selectSingleOption(option.value)}
                                        className="mt-0.5 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                    />
                                    <div className="flex-1">
                                        <span className="text-[14px] font-medium text-slate-800 block leading-tight">{option.label}</span>
                                        {option.description && (
                                            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{option.description}</p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => handleSelection(false)}
                            disabled={isSubmitting || selectedOptions.length === 0}
                            className="w-full px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Confirm Selection'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Multi-selection type - Multiple options selection (max 5)
    if (request.requestType === 'multi_selection' && request.options) {
        return (
            <div className="bg-white border border-indigo-200 rounded-2xl p-6 max-w-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-indigo-600 uppercase tracking-wider mb-1.5">Multiple Selection Required</h4>
                        <p className="text-[15px] text-slate-700 mb-2 leading-relaxed">{getMessage()}</p>
                        <p className="text-[13px] text-slate-500 mb-5">Select up to 5 options</p>

                        <div className="space-y-2 mb-5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {request.options.map((option: HITLOption) => (
                                <label
                                    key={option.id}
                                    className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${selectedOptions.includes(option.value)
                                        ? 'bg-indigo-50/80 border-indigo-300 shadow-sm'
                                        : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                                        } ${selectedOptions.length >= 5 && !selectedOptions.includes(option.value)
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => toggleOption(option.value)}
                                        disabled={selectedOptions.length >= 5 && !selectedOptions.includes(option.value)}
                                        className="mt-0.5 h-4 w-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <div className="flex-1">
                                        <span className="text-[14px] font-medium text-slate-800 block leading-tight">{option.label}</span>
                                        {option.description && (
                                            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{option.description}</p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => handleSelection(true)}
                            disabled={isSubmitting || selectedOptions.length === 0}
                            className="w-full px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : `Confirm Selection ${selectedOptions.length > 0 ? `(${selectedOptions.length}/5)` : ''}`}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Feedback type - Text input for user feedback
    if (request.requestType === 'feedback') {
        return (
            <div className="bg-white border border-purple-200 rounded-2xl p-6 max-w-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-purple-600 uppercase tracking-wider mb-1.5">Feedback Requested</h4>
                        <p className="text-[15px] text-slate-700 mb-4 leading-relaxed">{getMessage()}</p>

                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Type your feedback here..."
                            rows={3}
                            className="w-full px-4 py-3 text-[14px] border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:outline-none focus:ring-0 focus:border-purple-400 focus:shadow-sm resize-none transition-all placeholder:text-slate-400"
                        />

                        <button
                            onClick={handleFeedback}
                            disabled={isSubmitting || !feedbackText.trim()}
                            className="w-full mt-4 px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Data input type - Free text/data input
    if (request.requestType === 'data_input') {
        return (
            <div className="bg-white border border-teal-200 rounded-2xl p-6 max-w-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-teal-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-teal-600 uppercase tracking-wider mb-1.5">Input Required</h4>
                        <p className="text-[15px] text-slate-700 mb-4 leading-relaxed">{getMessage()}</p>

                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Type your input here..."
                            rows={3}
                            className="w-full px-4 py-3 text-[14px] border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:outline-none focus:ring-0 focus:border-teal-400 focus:shadow-sm resize-none transition-all placeholder:text-slate-400"
                        />

                        <button
                            onClick={handleFeedback}
                            disabled={isSubmitting || !feedbackText.trim()}
                            className="w-full mt-4 px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Input'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Topic input type - Provide topic/question
    if (request.requestType === 'topic_input') {
        return (
            <div className="bg-white border border-cyan-200 rounded-2xl p-6 max-w-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-cyan-600 uppercase tracking-wider mb-1.5">Topic Required</h4>
                        <p className="text-[15px] text-slate-700 mb-4 leading-relaxed">{getMessage()}</p>

                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Enter your topic or question..."
                            rows={3}
                            className="w-full px-4 py-3 text-[14px] border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:outline-none focus:ring-0 focus:border-cyan-400 focus:shadow-sm resize-none transition-all placeholder:text-slate-400"
                        />

                        <button
                            onClick={handleFeedback}
                            disabled={isSubmitting || !feedbackText.trim()}
                            className="w-full mt-4 px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Topic'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // URL selection type - Select from list of URLs (max 5)
    if (request.requestType === 'url_selection' && request.options) {
        return (
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 max-w-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-emerald-600 uppercase tracking-wider mb-1.5">URL Selection Required</h4>
                        <p className="text-[15px] text-slate-700 mb-2 leading-relaxed">{getMessage()}</p>
                        <p className="text-[13px] text-slate-500 mb-5">Select up to 5 URLs</p>

                        <div className="space-y-2 mb-5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {request.options.map((option: HITLOption) => (
                                <label
                                    key={option.id}
                                    className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${selectedOptions.includes(option.value)
                                        ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                                        : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
                                        } ${selectedOptions.length >= 5 && !selectedOptions.includes(option.value)
                                            ? 'opacity-50 cursor-not-allowed'
                                            : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => toggleOption(option.value)}
                                        disabled={selectedOptions.length >= 5 && !selectedOptions.includes(option.value)}
                                        className="mt-0.5 h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <div className="flex-1">
                                        <span className="text-[14px] font-medium text-slate-800 block leading-tight">{option.label}</span>
                                        <span className="text-[12px] text-slate-500 mt-1 block font-mono">{String(option.value)}</span>
                                        {option.description && (
                                            <p className="text-[13px] text-slate-500 mt-1.5 leading-relaxed">{option.description}</p>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={() => handleSelection(true)}
                            disabled={isSubmitting || selectedOptions.length === 0}
                            className="w-full px-4 py-2.5 bg-slate-900 text-white text-[14px] font-medium rounded-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                        >
                            {isSubmitting ? 'Submitting...' : `Confirm Selection ${selectedOptions.length > 0 ? `(${selectedOptions.length}/5)` : ''}`}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Content review type - Review generated content
    if (request.requestType === 'content_review') {
        return (
            <div className="bg-white border border-rose-200 rounded-2xl p-6 max-w-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[13px] font-bold text-rose-600 uppercase tracking-wider mb-1.5">Content Review Required</h4>
                        <p className="text-[15px] text-slate-700 mb-4 leading-relaxed">{getMessage()}</p>

                        {request.data && (
                            <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200 max-h-[200px] overflow-y-auto">
                                <pre className="text-[13px] text-slate-700 whitespace-pre-wrap font-mono">
                                    {JSON.stringify(request.data, null, 2)}
                                </pre>
                            </div>
                        )}

                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="Provide your feedback or approval..."
                            rows={3}
                            className="w-full px-4 py-3 text-[14px] border border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:outline-none focus:ring-0 focus:border-rose-400 focus:shadow-sm resize-none transition-all placeholder:text-slate-400"
                        />

                        <div className="flex gap-2.5 mt-4">
                            <button
                                onClick={() => handleConfirmation(true)}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white text-[14px] font-medium rounded-xl hover:bg-emerald-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                            >
                                Approve
                            </button>
                            <button
                                onClick={handleFeedback}
                                disabled={isSubmitting || !feedbackText.trim()}
                                className="flex-1 px-4 py-2.5 bg-amber-600 text-white text-[14px] font-medium rounded-xl hover:bg-amber-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow active:scale-[0.98]"
                            >
                                Request Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback for unknown types
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 max-w-md shadow-sm">
            <p className="text-sm text-gray-600">{request.prompt}</p>
            <button
                onClick={() => onRespond({})}
                className="mt-3 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
                Continue
            </button>
        </div>
    );
}
