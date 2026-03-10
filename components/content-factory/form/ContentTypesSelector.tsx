'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ContentType, CONTENT_TYPE_LABELS } from '../types/project-form.types';

/**
 * ContentTypesSelector Component
 *
 * A multi-select component for choosing content types using checkboxes.
 *
 * @component
 */
export interface ContentTypesSelectorProps {
    /**
     * Currently selected content types
     */
    selected: ContentType[];

    /**
     * Callback when selection changes
     */
    onChange: (selected: ContentType[]) => void;

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

const CONTENT_TYPE_OPTIONS: Array<{
    value: ContentType;
    label: string;
    icon: string;
}> = [
        { value: 'blog', label: 'Blog Articles', icon: '📝' },
        { value: 'social', label: 'Social Media', icon: '📱' },
        { value: 'email', label: 'Email', icon: '✉️' },
        { value: 'landing-page', label: 'Landing Pages', icon: '🎯' },
        { value: 'product-page', label: 'Product Pages', icon: '🛍️' },
        { value: 'case-study', label: 'Case Studies', icon: '📊' },
    ];

export const ContentTypesSelector: React.FC<ContentTypesSelectorProps> = ({
    selected,
    onChange,
    error,
    className,
    testId = 'content-types-selector',
    disabled = false,
}) => {
    const handleToggle = (type: ContentType) => {
        if (disabled) return;

        const isSelected = selected.includes(type);
        const newSelected = isSelected
            ? selected.filter((t) => t !== type)
            : [...selected, type];

        onChange(newSelected);
    };

    const hasError = !!error;

    return (
        <div className={cn('space-y-2', className)} data-testid={testId}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CONTENT_TYPE_OPTIONS.map((option) => {
                    const isSelected = selected.includes(option.value);

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleToggle(option.value)}
                            disabled={disabled}
                            className={cn(
                                'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all',
                                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
                                isSelected
                                    ? 'bg-primary/10 border-primary text-primary'
                                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50',
                                disabled && 'opacity-50 cursor-not-allowed',
                                hasError && !isSelected && 'border-error/50'
                            )}
                            aria-pressed={isSelected}
                            aria-label={`Select ${option.label}`}
                        >
                            <span className="text-base" aria-hidden="true">
                                {option.icon}
                            </span>
                            <span className="flex-1 text-left">{option.label}</span>
                            {isSelected && (
                                <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            {hasError && (
                <p className="text-xs text-error flex items-center gap-1.5" role="alert" aria-live="polite">
                    {error}
                </p>
            )}
        </div>
    );
};

ContentTypesSelector.displayName = 'ContentTypesSelector';
