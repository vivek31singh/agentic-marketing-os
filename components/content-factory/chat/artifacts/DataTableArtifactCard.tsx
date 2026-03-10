'use client';

import React from 'react';
import { ArtifactPayload, HeadingsData, ContentStats, HomePageData } from '@/lib/types/graph-events.types';
import { Database, Globe, Building2, Cpu, ExternalLink } from 'lucide-react';
import ArtifactCardShell from './ArtifactCardShell';

interface DataTableArtifactCardProps {
    artifact: ArtifactPayload;
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
}

/**
 * DataTableArtifactCard renders `data_table` artifacts.
 *
 * Handles three sub-types based on stepId:
 * - Home Page Data (home_scraping): URL, title, headings, meta
 * - Site Context (site_context): business info, services, audience
 * - Tech Stack Research (tech_research): stack, conventions, best practices
 */
export default function DataTableArtifactCard({
    artifact,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
}: DataTableArtifactCardProps) {
    const content = artifact.content as Record<string, unknown>;
    const stepId = artifact.metadata?.stepId as string | undefined;

    // Debug: Log content structure for troubleshooting
    console.log('[DataTableArtifactCard] artifact.title:', artifact.title);
    console.log('[DataTableArtifactCard] stepId:', stepId);
    console.log('[DataTableArtifactCard] content keys:', Object.keys(content));
    console.log('[DataTableArtifactCard] has meta_title:', 'meta_title' in content);
    console.log('[DataTableArtifactCard] has headings:', 'headings' in content);
    console.log('[DataTableArtifactCard] has content_stats:', 'content_stats' in content);

    // Determine sub-type for icon and accent
    const isSiteContext = stepId === 'site_context' ||
        artifact.title.toLowerCase().includes('site context');
    const isTechStack = stepId === 'tech_research' ||
        artifact.title.toLowerCase().includes('tech stack');
    // Check for home page data by stepId, title, or content structure
    const isHomePage = stepId === 'home_scraping' ||
        artifact.title.toLowerCase().includes('home page') ||
        // Detect by content structure: has meta_title, meta_description, headings, or content_stats
        'meta_title' in content ||
        'headings' in content ||
        'content_stats' in content;

    console.log('[DataTableArtifactCard] isHomePage:', isHomePage);

    const icon = isSiteContext
        ? <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600" />
        : isTechStack
            ? <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
            : <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600" />;

    const accentColor = isSiteContext ? 'cyan' : isTechStack ? 'amber' : 'teal';

    return (
        <ArtifactCardShell
            artifact={artifact}
            icon={icon}
            accentColor={accentColor}
            onCopyArtifact={onCopyArtifact}
            onDownloadArtifact={onDownloadArtifact}
            copiedArtifactId={copiedArtifactId}
            collapsibleMaxHeight={350}
        >
            {isSiteContext ? (
                <SiteContextView content={content} />
            ) : isTechStack ? (
                <TechStackView content={content} />
            ) : isHomePage ? (
                <HomePageView content={content as HomePageData} />
            ) : (
                <GenericDataView content={content} />
            )}
        </ArtifactCardShell>
    );
}

/** Site Context: business info key-value cards */
function SiteContextView({ content }: { content: Record<string, unknown> }) {
    const keyServices = content.key_services as string[] | undefined;
    const brandVoice = content.brand_voice as Record<string, unknown> | undefined;
    const techHints = content.tech_stack_hints as string[] | undefined;

    return (
        <div className="space-y-3">
            <KeyValueRow label="Business" value={content.business_name as string} />
            <KeyValueRow label="Niche" value={content.niche as string} />
            <KeyValueRow label="Target Audience" value={content.target_audience as string} />
            <KeyValueRow label="Primary Goal" value={content.primary_goal as string} />

            {!!content.description && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Description</label>
                    <p className="text-[13px] text-slate-700 mt-0.5 leading-relaxed">{String(content.description)}</p>
                </div>
            )}

            {keyServices && keyServices.length > 0 && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Key Services</label>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {keyServices.map((s, i) => (
                            <span key={i} className="text-xs bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-lg font-medium">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {brandVoice && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Brand Voice</label>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {Object.entries(brandVoice).map(([k, v]) => (
                            <span key={k} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                                <span className="font-medium capitalize">{k}:</span> {String(v)}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {techHints && techHints.length > 0 && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Tech Hints</label>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {techHints.map((t, i) => (
                            <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-mono">{t}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/** Tech Stack Research: conventions + best practices */
function TechStackView({ content }: { content: Record<string, unknown> }) {
    const conventions = content.conventions as Record<string, string> | undefined;
    const bestPractices = content.best_practices as string[] | undefined;
    const error = content.error as string | undefined;

    return (
        <div className="space-y-3">
            {!!content.stack && (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Stack:</span>
                    <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-lg">
                        {String(content.stack)}
                    </span>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                    ⚠️ {error}
                </div>
            )}

            {conventions && Object.keys(conventions).length > 0 && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Conventions</label>
                    <div className="mt-1.5 space-y-1.5">
                        {Object.entries(conventions).map(([key, val]) => (
                            <div key={key} className="bg-slate-50 rounded-lg px-3 py-2">
                                <span className="text-[11px] font-medium text-amber-600 capitalize">{key.replace(/_/g, ' ')}</span>
                                <p className="text-[13px] text-slate-700 mt-0.5 leading-relaxed">{val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {bestPractices && bestPractices.length > 0 && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Best Practices</label>
                    <ul className="mt-1.5 space-y-1">
                        {bestPractices.map((bp, i) => (
                            <li key={i} className="flex items-start gap-2 text-[13px] text-slate-700">
                                <span className="text-amber-500 mt-0.5">•</span>
                                {bp}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

/** Home Page Data: title, meta, headings */
function HomePageView({ content }: { content: HomePageData }) {
    const headings = content.headings;
    const url = content.url;
    const contentStats = content.content_stats;

    return (
        <div className="space-y-3">
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:text-teal-700 font-mono bg-teal-50 px-2.5 py-1 rounded-lg transition-colors"
                >
                    <Globe className="w-3 h-3" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{url}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
            )}

            <KeyValueRow label="Meta Title" value={content.meta_title} />
            <KeyValueRow label="Meta Description" value={content.meta_description} />
            <KeyValueRow label="Meta Keywords" value={content.meta_keywords} />

            <div className="flex gap-3 flex-wrap">
                <StatBadge label="Paragraphs" value={contentStats?.paragraphs_count} />
                <StatBadge label="Words" value={contentStats?.word_count} />
                <StatBadge label="Links" value={contentStats?.links_count} />
                {content.scrape_method && (
                    <StatBadge label="Method" value={content.scrape_method} />
                )}
            </div>

            {headings && (
                <div>
                    <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Headings</label>
                    <div className="mt-1.5 space-y-1">
                        {Object.entries(headings).map(([level, items]) => {
                            if (!items || items.length === 0) return null;
                            return (
                                <div key={level} className="flex items-start gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                                        {level}
                                    </span>
                                    <div className="flex flex-wrap gap-1">
                                        {items.map((h: string, i: number) => (
                                            <span key={i} className="text-xs text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

/** Fallback: generic key-value pairs as JSON-like display */
function GenericDataView({ content }: { content: Record<string, unknown> }) {
    return (
        <div className="space-y-2">
            {Object.entries(content).map(([key, value]) => {
                const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
                return <KeyValueRow key={key} label={key.replace(/_/g, ' ')} value={displayValue} />;
            })}
        </div>
    );
}

/** Shared components */
function KeyValueRow({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div>
            <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{label}</label>
            <p className="text-[13px] text-slate-700 mt-0.5 leading-relaxed">{value}</p>
        </div>
    );
}

function StatBadge({ label, value }: { label: string; value?: number | string | null }) {
    if (value === undefined || value === null) return null;
    return (
        <div className="bg-slate-50 rounded-lg px-3 py-1.5 text-center">
            <p className="text-sm font-bold text-slate-800">{value}</p>
            <p className="text-[10px] text-slate-400 uppercase">{label}</p>
        </div>
    );
}
