'use client';

import React from 'react';
import { ArtifactPayload } from '@/lib/types/graph-events.types';
import { FileBox } from 'lucide-react';
import ArtifactCardShell from './ArtifactCardShell';

interface GenericArtifactCardProps {
    artifact: ArtifactPayload;
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
}

/**
 * GenericArtifactCard — fallback for unknown or generic artifact types.
 * Renders content as prettified JSON with copy/download actions.
 */
export default function GenericArtifactCard({
    artifact,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
}: GenericArtifactCardProps) {
    return (
        <ArtifactCardShell
            artifact={artifact}
            icon={<FileBox className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />}
            accentColor="purple"
            onCopyArtifact={onCopyArtifact}
            onDownloadArtifact={onDownloadArtifact}
            copiedArtifactId={copiedArtifactId}
            collapsibleMaxHeight={300}
        >
            <pre className="text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap break-words font-mono leading-relaxed">
                {typeof artifact.content === 'string'
                    ? artifact.content
                    : JSON.stringify(artifact.content, null, 2)
                }
            </pre>
        </ArtifactCardShell>
    );
}
