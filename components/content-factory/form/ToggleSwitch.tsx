'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ToggleSwitch Component
 *
 * A toggle switch component for boolean options.
 *
 * @component
 */
export interface ToggleSwitchProps {
    /**
     * Whether the toggle is checked
     */
    checked: boolean;

    /**
     * Callback when toggle changes
     */
    onChange: (checked: boolean) => void;

    /**
     * Label for the toggle
     */
    label: string;

    /**
     * Optional description text
     */
    description?: string;

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

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    label,
    description,
    disabled = false,
    className,
    testId,
}) => {
    const id = React.useId();

    return (
        <label
            className={cn(
                'flex items-start gap-3 cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            data-testid={testId}
        >
            {/* Toggle Switch */}
            <div className="relative flex-shrink-0 pt-0.5">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => !disabled && onChange(e.target.checked)}
                    disabled={disabled}
                    className="sr-only"
                    role="switch"
                    aria-checked={checked}
                />
                <div
                    className={cn(
                        'w-11 h-6 rounded-full transition-colors duration-200',
                        checked ? 'bg-primary' : 'bg-neutral-300',
                        disabled && 'bg-neutral-200'
                    )}
                    aria-hidden="true"
                >
                    <div
                        className={cn(
                            'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200',
                            checked && 'translate-x-5'
                        )}
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Label and Description */}
            <div className="flex-1">
                <span className="text-sm font-medium text-neutral-900 block">
                    {label}
                </span>
                {description && (
                    <p className="text-xs text-neutral-500 mt-0.5">
                        {description}
                    </p>
                )}
            </div>
        </label>
    );
};

ToggleSwitch.displayName = 'ToggleSwitch';
