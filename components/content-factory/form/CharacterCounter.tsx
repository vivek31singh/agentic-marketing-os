'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * CharacterCounter Component
 *
 * Displays a character count for text inputs with visual feedback
 * when approaching or exceeding the limit.
 *
 * @component
 */
export interface CharacterCounterProps {
    /**
     * Current character count
     */
    current: number;

    /**
     * Maximum allowed characters
     */
    max: number;

    /**
     * Optional custom className
     */
    className?: string;

    /**
     * Optional test ID for testing purposes
     */
    testId?: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
    current,
    max,
    className,
    testId = 'character-counter',
}) => {
    const percentage = (current / max) * 100;
    const isNearLimit = percentage >= 80 && percentage < 100;
    const isOverLimit = current > max;

    return (
        <div
            className={cn(
                'text-xs text-right',
                isOverLimit && 'text-error',
                isNearLimit && !isOverLimit && 'text-warning',
                !isNearLimit && !isOverLimit && 'text-neutral-400',
                className
            )}
            data-testid={testId}
            aria-live="polite"
        >
            {current}/{max}
        </div>
    );
};

CharacterCounter.displayName = 'CharacterCounter';
