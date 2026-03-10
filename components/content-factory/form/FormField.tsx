'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

/**
 * FormField Component
 *
 * A reusable form field wrapper that includes label, input, error message,
 * and optional helper text.
 *
 * @component
 */
export interface FormFieldProps {
    /**
     * The label for the form field
     */
    label: string;

    /**
     * Whether the field is required
     * @default false
     */
    required?: boolean;

    /**
     * Error message to display
     */
    error?: string;

    /**
     * Helper text to display below the field
     */
    helperText?: string;

    /**
     * The input element
     */
    children: React.ReactNode;

    /**
     * Optional custom className for the container
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    required = false,
    error,
    helperText,
    children,
    className,
    testId,
}) => {
    const hasError = !!error;

    return (
        <div className={cn('space-y-1.5', className)} data-testid={testId}>
            {/* Label */}
            <label className="text-sm font-medium text-neutral-900 flex items-center gap-1">
                {label}
                {required && <span className="text-error" aria-label="required">*</span>}
            </label>

            {/* Input Field */}
            <div className={hasError ? 'relative' : ''}>
                {React.cloneElement(children as React.ReactElement, {
                    className: cn(
                        (children as React.ReactElement).props.className,
                        hasError && 'border-error focus-visible:ring-error/50'
                    ),
                    'aria-invalid': hasError,
                    'aria-describedby': hasError ? `${testId}-error` : helperText ? `${testId}-helper` : undefined,
                })}
            </div>

            {/* Error Message */}
            {hasError && (
                <div
                    id={`${testId}-error`}
                    className="flex items-center gap-1.5 text-xs text-error"
                    role="alert"
                    aria-live="polite"
                >
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Helper Text */}
            {!hasError && helperText && (
                <p id={`${testId}-helper`} className="text-xs text-neutral-500">
                    {helperText}
                </p>
            )}
        </div>
    );
};

FormField.displayName = 'FormField';
