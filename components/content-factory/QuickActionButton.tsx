'use client';

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * QuickActionButton Component
 *
 * A primary action button that navigates to the New Project page
 * on the Content Factory page.
 *
 * @component
 * @example
 * ```tsx
 * <QuickActionButton workspaceId="workspace-123" />
 * ```
 */
export interface QuickActionButtonProps {
    /**
     * Workspace ID for navigation
     */
    workspaceId: string;

    /**
     * Optional custom label for the button
     * @default "New Project"
     */
    label?: string;

    /**
     * Optional disabled state
     * @default false
     */
    disabled?: boolean;

    /**
     * Optional custom className
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
    workspaceId,
    label = 'New Project',
    disabled = false,
    className,
    testId = 'quick-action-button',
}) => {
    return (
        <Link href={`/workspaces/${workspaceId}/modules/content-factory/new`}>
            <Button
                variant="primary"
                disabled={disabled}
                className={`gap-2 ${className || ''}`}
                data-testid={testId}
                aria-label={label}
            >
                <Plus className="h-4 w-4" aria-hidden="true" />
                {label}
            </Button>
        </Link>
    );
};

QuickActionButton.displayName = 'QuickActionButton';
