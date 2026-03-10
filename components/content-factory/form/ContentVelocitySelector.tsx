'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ContentVelocity, CONTENT_VELOCITY_OPTIONS } from '../types/project-form.types';

/**
 * ContentVelocitySelector Component
 *
 * A segmented control for selecting content velocity (articles per week).
 *
 * @component
 */
export interface ContentVelocitySelectorProps {
    /**
     * Currently selected velocity
     */
    value: ContentVelocity;

    /**
     * Callback when selection changes
     */
    onChange: (value: ContentVelocity) => void;

    /**
     * Error message to display
     */
    error?: string;

    /**
     * Optional custom className
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;

    /**
     * Optional disabled state
     */
    disabled?: boolean;
}

export const ContentVelocitySelector: React.FC<ContentVelocitySelectorProps> = ({
    value,
    onChange,
    error,
    className,
    testId = 'content-velocity-selector',
    disabled = false,
}) => {
    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)} data-testid={testId}>
            <div
                className={cn(
                    'inline-flex rounded-lg border p-1',
                    hasError ? 'border-error' : 'border-neutral-200',
                    disabled && 'opacity-50 cursor-not-allowed'
                )}
                role="radiogroup"
                aria-label="Content velocity"
            >
                {CONTENT_VELOCITY_OPTIONS.map((velocity) => (
                    <button
                        key={velocity}
                        type="button"
                        onClick={() => !disabled && onChange(velocity)}
                        disabled={disabled}
                        className={cn(
                            'px-4 py-2 rounded-md text-sm font-medium transition-all',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',
                            value === velocity
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-neutral-600 hover:bg-neutral-100',
                            disabled && 'pointer-events-none'
                        )}
                        role="radio"
                        aria-checked={value === velocity}
                        aria-label={`${velocity} articles per week`}
                    >
                        {velocity}
                    </button>
                ))}
            </div>

            <p className="text-xs text-neutral-500">
                articles per week
            </p>

            {hasError && (
                <p className="text-xs text-error" role="alert" aria-live="polite">
                    {error}
                </p>
            )}
        </div>
    );
};

ContentVelocitySelector.displayName = 'ContentVelocitySelector';
