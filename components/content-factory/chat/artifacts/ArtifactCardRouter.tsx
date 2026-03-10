'use client';

import React from 'react';
import { ArtifactPayload } from '@/lib/types/graph-events.types';
import MarkdownArtifactCard from './MarkdownArtifactCard';
import DataTableArtifactCard from './DataTableArtifactCard';
import GenericArtifactCard from './GenericArtifactCard';
import LinkListArtifactCard from '../LinkListArtifactCard';

interface ArtifactCardRouterProps {
    artifact: ArtifactPayload;
    onRespond: (response: unknown) => void;
    onCopyArtifact: (artifact: ArtifactPayload) => void;
    onDownloadArtifact: (artifact: ArtifactPayload) => void;
    copiedArtifactId: string | null;
    onAppendToInput?: (text: string) => void;
}

/**
 * ArtifactCardRouter maps artifact types to their dedicated card components.
 *
 * Components:
 * - MarkdownArtifactCard  → report, blueprint, content (single component, type-configured)
 * - DataTableArtifactCard → data_table (site context, tech stack, home page)
 * - LinkListArtifactCard  → link_list (checkbox selection, max 5)
 * - GenericArtifactCard   → fallback for unknown types
 */
export default function ArtifactCardRouter({
    artifact,
    onRespond,
    onCopyArtifact,
    onDownloadArtifact,
    copiedArtifactId,
    onAppendToInput,
}: ArtifactCardRouterProps) {
    const commonProps = {
        artifact,
        onCopyArtifact,
        onDownloadArtifact,
        copiedArtifactId,
    };

    switch (artifact.artifactType) {
        case 'report':
        case 'pre_run_report':
        case 'pre_run_audit':
        case 'pre_run_audit_summary':
        case 'blueprint':
        case 'content':
            return <MarkdownArtifactCard {...commonProps} />;

        case 'data_table':
            return <DataTableArtifactCard {...commonProps} />;

        case 'link_list':
            return <LinkListArtifactCard {...commonProps} onRespond={onRespond} onAppendToInput={onAppendToInput} />;

        default:
            return <GenericArtifactCard {...commonProps} />;
    }
}
