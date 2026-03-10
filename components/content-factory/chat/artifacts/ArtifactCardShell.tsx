'use client';

import React, { useState } from 'react';
import { ArtifactPayload } from '@/lib/types/graph-events.types';
import { Copy, Check, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface ArtifactCardShellProps {
    artifact: ArtifactPayload;
    icon: React.ReactNode;
    accentColor: string; // e.g. 'emerald', 'rose', 'blue'
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
    children: React.ReactNode;
    /** If set, content is collapsible and defaults to this max height in px */
    collapsibleMaxHeight?: number;
    /** Extra actions to render alongside copy/download */
    extraActions?: React.ReactNode;
}

/**
 * Shared shell for all artifact cards.
 * Provides: avatar icon, header (title + type badge), actions bar, optional collapse.
 */
export default function ArtifactCardShell({
    artifact,
    icon,
    accentColor,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
    children,
    collapsibleMaxHeight,
    extraActions,
}: ArtifactCardShellProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isCollapsible = !!collapsibleMaxHeight;

    const borderColor = `border-${accentColor}-200`;
    const bgAccent = `bg-${accentColor}-50/50`;
    const borderAccent = `border-${accentColor}-100`;
    const iconBg = `bg-${accentColor}-100`;
    const badgeBg = `bg-${accentColor}-100`;
    const badgeText = `text-${accentColor}-700`;

    return (
        <div className="flex justify-start my-4 w-full">
            <div className="flex gap-2 sm:gap-3 w-full max-w-[95%] sm:max-w-[85%]">
                {/* Avatar */}
                <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${iconBg} flex items-center justify-center`}>
                    {icon}
                </div>

                {/* Card */}
                <div className={`bg-white border ${borderColor} rounded-2xl rounded-tl-sm shadow-sm overflow-hidden flex-1 min-w-0`}>
                    {/* Header */}
                    <div className={`px-4 sm:px-5 py-3 border-b ${borderAccent} ${bgAccent}`}>
                        <div className="flex items-start sm:items-center justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-slate-800 text-sm sm:text-base truncate">{artifact.title}</p>
                                {artifact.description && (
                                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{artifact.description}</p>
                                )}
                            </div>
                            <span className={`text-[10px] sm:text-xs ${badgeBg} ${badgeText} px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap flex-shrink-0`}>
                                {artifact.artifactType}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        <div
                            className={`px-4 sm:px-5 py-3 sm:py-4 ${isCollapsible && !isExpanded ? 'overflow-hidden' : ''}`}
                            style={isCollapsible && !isExpanded ? { maxHeight: collapsibleMaxHeight } : undefined}
                        >
                            {children}
                        </div>

                        {/* Collapse gradient overlay */}
                        {isCollapsible && !isExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        )}
                    </div>

                    {/* Expand/Collapse toggle */}
                    {isCollapsible && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full px-4 sm:px-5 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1 border-t border-slate-100"
                        >
                            {isExpanded ? (
                                <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
                            ) : (
                                <><ChevronDown className="w-3.5 h-3.5" /> Show more</>
                            )}
                        </button>
                    )}

                    {/* Actions Bar */}
                    <div className="px-3 sm:px-5 py-2.5 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {extraActions}
                        <button
                            onClick={() => onCopyArtifact(artifact)}
                            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {copiedArtifactId === artifact.artifactId ? (
                                <><Check className="w-3.5 h-3.5" /> Copied</>
                            ) : (
                                <><Copy className="w-3.5 h-3.5" /> Copy</>
                            )}
                        </button>
                        <button
                            onClick={() => onDownloadArtifact(artifact)}
                            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" /> Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
