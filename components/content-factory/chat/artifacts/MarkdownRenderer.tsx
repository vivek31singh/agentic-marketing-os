'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    /** The raw markdown string to render */
    content: string;
    /** Accent color for links (tailwind color name, e.g. 'rose', 'blue', 'indigo'). Defaults to 'slate'. */
    accentColor?: string;
}

/**
 * Shared markdown renderer for all artifact cards that display markdown content
 * (reports, blueprints, generated content).
 *
 * Uses react-markdown + remark-gfm. Styled with Tailwind prose classes.
 * Accent color customizes link color per-card.
 */
export default function MarkdownRenderer({ content, accentColor = 'slate' }: MarkdownRendererProps) {
    // Map accent color to prose link class  
    const linkColorClass = `prose-a:text-${accentColor}-600 hover:prose-a:text-${accentColor}-800`;

    return (
        <div className={`prose prose-sm prose-slate max-w-none break-words
            prose-headings:font-semibold prose-headings:text-slate-800
            prose-h1:text-lg prose-h1:mt-4 prose-h1:mb-2
            prose-h2:text-base prose-h2:mt-3 prose-h2:mb-2
            prose-h3:text-sm prose-h3:mt-2 prose-h3:mb-1
            prose-p:text-[13px] prose-p:leading-relaxed prose-p:text-slate-600
            prose-li:text-[13px] prose-li:text-slate-600 prose-li:marker:text-slate-400
            prose-strong:text-slate-800
            prose-code:text-xs prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
            prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:text-xs prose-pre:rounded-xl prose-pre:overflow-x-auto
            prose-pre:whitespace-pre-wrap prose-pre:break-words
            prose-table:text-xs
            prose-th:bg-slate-50 prose-th:text-slate-700 prose-th:px-3 prose-th:py-2 prose-th:text-left
            prose-td:px-3 prose-td:py-2 prose-td:border-slate-200
            prose-hr:border-slate-200
            prose-a:no-underline hover:prose-a:underline
            ${linkColorClass}
        `}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
