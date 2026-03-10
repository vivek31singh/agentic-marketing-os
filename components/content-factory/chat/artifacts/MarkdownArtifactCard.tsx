'use client';

import React from 'react';
import { ArtifactPayload } from '@/lib/types/graph-events.types';
import { FileText, LayoutTemplate, PenTool, ExternalLink } from 'lucide-react';
import ArtifactCardShell from './ArtifactCardShell';
import MarkdownRenderer from './MarkdownRenderer';

interface MarkdownArtifactCardProps {
    artifact: ArtifactPayload;
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
}

// --- Type configs per artifactType ---
interface TypeConfig {
    icon: React.ReactNode;
    accentColor: string;
    /** Top-level key(s) in content to look for markdown string, tried in order */
    markdownKeys: string[];
}

const TYPE_CONFIGS: Record<string, TypeConfig> = {
    report: {
        icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />,
        accentColor: 'rose',
        markdownKeys: ['reportContent'],
    },
    pre_run_report: {
        icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />,
        accentColor: 'rose',
        markdownKeys: ['reportContent'],
    },
    pre_run_audit: {
        icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />,
        accentColor: 'rose',
        markdownKeys: ['reportContent'],
    },
    pre_run_audit_summary: {
        icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600" />,
        accentColor: 'rose',
        markdownKeys: ['reportContent'],
    },
    blueprint: {
        icon: <LayoutTemplate className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />,
        accentColor: 'blue',
        markdownKeys: ['blueprintContent'],
    },
    content: {
        icon: <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />,
        accentColor: 'indigo',
        markdownKeys: ['contentText'],
    },
};

interface BlueprintSection {
    sectionId: string;
    sectionType: string;
    heading: string;
    subheading?: string;
    contentDescription?: string;
    order: number;
}

interface SeoMetadata {
    title?: string;
    description?: string;
    keywords?: string[];
}

/**
 * Unified markdown artifact card for `report`, `blueprint`, and `content` types.
 *
 * Renders type-specific metadata headers above a shared MarkdownRenderer.
 * Customised automatically by artifactType via TYPE_CONFIGS.
 */
export default function MarkdownArtifactCard({
    artifact,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
}: MarkdownArtifactCardProps) {
    const config = TYPE_CONFIGS[artifact.artifactType] || TYPE_CONFIGS.report;
    // Parse content — handle both parsed object and stringified JSON
    const content = (() => {
        if (typeof artifact.content === 'string') {
            try {
                return JSON.parse(artifact.content);
            } catch {
                return { _rawString: artifact.content };
            }
        }
        return (artifact.content as Record<string, unknown>) || {};
    })();

    // Find markdown string from configured keys
    let markdownText: string | undefined;
    for (const key of config.markdownKeys) {
        if (content?.[key] && typeof content[key] === 'string') {
            markdownText = content[key] as string;
            break;
        }
    }

    // Fallback: If content itself is a string and didn't parse to JSON, treat the whole string as markdown
    if (!markdownText && typeof artifact.content === 'string' && content._rawString) {
        markdownText = artifact.content;
    }

    return (
        <ArtifactCardShell
            artifact={artifact}
            icon={config.icon}
            accentColor={config.accentColor}
            onCopyArtifact={onCopyArtifact}
            onDownloadArtifact={onDownloadArtifact}
            copiedArtifactId={copiedArtifactId}
            collapsibleMaxHeight={320}
        >
            {/* Type-specific header sections */}
            <TypeSpecificHeader artifactType={artifact.artifactType} content={content} accentColor={config.accentColor} />

            {/* Shared markdown rendering */}
            {markdownText && (
                <MarkdownRenderer content={preprocessMarkdown(markdownText)} accentColor={config.accentColor} />
            )}

            {/* Fallback for non-markdown content */}
            {!markdownText && <FallbackContent artifactType={artifact.artifactType} content={content} />}
        </ArtifactCardShell>
    );
}

// ─── Type-specific headers ───────────────────────────────────────────

function TypeSpecificHeader({
    artifactType,
    content,
    accentColor,
}: {
    artifactType: string;
    content: Record<string, unknown>;
    accentColor: string;
}) {
    switch (artifactType) {
        case 'report':
        case 'pre_run_report':
        case 'pre_run_audit':
        case 'pre_run_audit_summary':
            return <ReportHeader content={content} />;
        case 'blueprint':
            return <BlueprintHeader content={content} accentColor={accentColor} />;
        case 'content':
            return <ContentHeader content={content} accentColor={accentColor} />;
        default:
            return null;
    }
}

// ─── Report header: page count + site URL badges ───

function ReportHeader({ content }: { content: Record<string, unknown> }) {
    const totalPages = (content?.total_pages ?? content?.totalPages) as number | undefined;
    const siteUrl = content?.siteUrl as string | undefined;
    const savedFiles = content?.saved_files as string[] | undefined;

    return (
        <>
            {(totalPages || siteUrl) && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {totalPages && (
                        <span className="inline-flex items-center gap-1 text-xs bg-rose-50 text-rose-700 px-2 py-1 rounded-lg font-medium">
                            📄 {totalPages} pages
                        </span>
                    )}
                    {siteUrl && (
                        <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-mono truncate max-w-[200px] sm:max-w-none">
                            {siteUrl}
                        </span>
                    )}
                </div>
            )}
            {/* File list for audit reports (no markdown content) */}
            {savedFiles && savedFiles.length > 0 && !content?.reportContent && (
                <div className="space-y-1.5 mb-3">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                        Generated Files
                    </p>
                    {savedFiles.map((file, i) => {
                        const fileName = file.split('/').pop() || file;
                        return (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs">
                                <FileText className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                                <span className="text-slate-700 font-mono truncate">{fileName}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

// ─── Blueprint header: page info + sections list ───

function BlueprintHeader({ content, accentColor }: { content: Record<string, unknown>; accentColor: string }) {
    const url = content?.url as string | undefined;
    const pageName = content?.pageName as string | undefined;
    const pageType = content?.pageType as string | undefined;
    const sections = content?.sections as BlueprintSection[] | undefined;

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
                {pageName && <span className="text-sm font-semibold text-slate-800">{pageName}</span>}
                {pageType && (
                    <span className={`text-[10px] sm:text-xs bg-${accentColor}-50 text-${accentColor}-700 px-2 py-0.5 rounded-full font-medium capitalize`}>
                        {pageType}
                    </span>
                )}
                {url && <UrlLink url={url} accentColor={accentColor} />}
            </div>

            {sections && sections.length > 0 && (
                <div className="mb-4">
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5 block">
                        Sections ({sections.length})
                    </label>
                    <div className="grid gap-1.5">
                        {sections.sort((a, b) => a.order - b.order).map((section) => (
                            <div key={section.sectionId} className={`flex items-start gap-2 bg-${accentColor}-50/60 rounded-lg px-3 py-2`}>
                                <span className={`text-[10px] font-bold text-${accentColor}-400 bg-${accentColor}-100 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                    {section.order}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[13px] font-medium text-slate-800 truncate">{section.heading}</p>
                                    {section.subheading && <p className="text-[11px] text-slate-500 truncate">{section.subheading}</p>}
                                    <span className={`text-[10px] text-${accentColor}-600 bg-${accentColor}-100 px-1.5 py-0.5 rounded mt-1 inline-block capitalize`}>
                                        {section.sectionType}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Content header: SEO metadata + hero/CTA highlights ───

function ContentHeader({ content, accentColor }: { content: Record<string, unknown>; accentColor: string }) {
    const url = content?.url as string | undefined;
    const pageName = content?.pageName as string | undefined;
    const contentType = content?.contentType as string | undefined;
    const meta = content?.metadata as { title?: string; heroSection?: string; callToAction?: string; seoMetadata?: SeoMetadata } | undefined;

    return (
        <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
                {pageName && <span className="text-sm font-semibold text-slate-800">{pageName}</span>}
                {contentType && (
                    <span className={`text-[10px] sm:text-xs bg-${accentColor}-50 text-${accentColor}-700 px-2 py-0.5 rounded-full font-medium capitalize`}>
                        {contentType}
                    </span>
                )}
                {url && <UrlLink url={url} accentColor={accentColor} />}
            </div>

            {meta?.seoMetadata && (
                <div className={`mb-4 bg-${accentColor}-50/50 rounded-xl p-3 border border-${accentColor}-100`}>
                    <label className={`text-[11px] font-medium text-${accentColor}-500 uppercase tracking-wider mb-1.5 block`}>
                        SEO Metadata
                    </label>
                    {meta.seoMetadata.title && <p className="text-[13px] font-medium text-slate-800">{meta.seoMetadata.title}</p>}
                    {meta.seoMetadata.description && <p className="text-[12px] text-slate-600 mt-1 leading-relaxed">{meta.seoMetadata.description}</p>}
                    {meta.seoMetadata.keywords && meta.seoMetadata.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {meta.seoMetadata.keywords.map((kw, i) => (
                                <span key={i} className={`text-[10px] bg-${accentColor}-100 text-${accentColor}-600 px-2 py-0.5 rounded font-medium`}>
                                    {kw}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {(meta?.heroSection || meta?.callToAction) && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {meta?.heroSection && (
                        <div className="bg-slate-50 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
                            <label className="text-[10px] font-medium text-slate-400 uppercase">Hero</label>
                            <div className="text-[12px] text-slate-700 mt-0.5 line-clamp-2">
                                {renderMetadataValue(meta.heroSection)}
                            </div>
                        </div>
                    )}
                    {meta?.callToAction && (
                        <div className="bg-slate-50 rounded-lg px-3 py-2 flex-1 min-w-[140px]">
                            <label className="text-[10px] font-medium text-slate-400 uppercase">CTA</label>
                            <div className="text-[12px] text-slate-700 mt-0.5 line-clamp-2">
                                {renderMetadataValue(meta.callToAction)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

/**
 * Backend sometimes wraps the entire report in ```markdown ... ``` blocks.
 * This helper strips those markers and also ensures that every line starting
 * with a [tag] prefix (e.g. [h1], [p], [ul]) is separated by a blank line.
 *
 * ReactMarkdown requires TWO newlines (\n\n) to create a paragraph/block break.
 * Single \n is treated as a space, collapsing everything onto one line.
 */
function preprocessMarkdown(content: string): string {
    // 1. Strip triple-backtick markdown wrappers
    let result = content.replace(/```markdown\n?/g, '').replace(/```\n?/g, '');

    // 2. Ensure every line starting with a [tag] is preceded by a blank line.
    //    This converts single \n between tag lines into \n\n so ReactMarkdown
    //    treats each as a separate block rather than collapsing them into one line.
    result = result.replace(/([^\n])\n(\[[a-z0-9]+\])/g, '$1\n\n$2');

    return result.trim();
}

/**
 * Safely renders a metadata value that might be a string or a complex object.
 * If it's an object, tries to extract headline/text or stringifies it.
 */
function renderMetadataValue(value: any): React.ReactNode {
    if (!value) return null;
    if (typeof value === 'string') return value;

    if (typeof value === 'object') {
        // Handle common object structures from the LLM
        const val = value as Record<string, any>;

        // Priority: headline > text > content > cta_text
        const textToRender = val.headline || val.text || val.content || val.cta_text || val.subheadline;

        if (typeof textToRender === 'string') {
            return textToRender;
        }

        // If no primary string found, try to join all string values
        const allStrings = Object.values(val)
            .filter(v => typeof v === 'string')
            .join(' ');

        if (allStrings) return allStrings;

        // Final fallback: stringify
        return JSON.stringify(value);
    }

    return String(value);
}

// ─── Shared helpers ───

function UrlLink({ url, accentColor }: { url: string; accentColor: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 text-[11px] text-${accentColor}-500 hover:text-${accentColor}-700 font-mono transition-colors`}
        >
            <span className="truncate max-w-[150px] sm:max-w-[250px]">{url}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
        </a>
    );
}

function FallbackContent({ artifactType, content }: { artifactType: string; content: Record<string, unknown> }) {
    // For audit reports with saved_files but no markdown, the file list is shown in ReportHeader
    if (artifactType === 'report' && content?.saved_files) return null;

    return (
        <pre className="text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap break-words font-mono">
            {JSON.stringify(content, null, 2)}
        </pre>
    );
}
