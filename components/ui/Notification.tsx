'use client';

import React from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationVariant = 'success' | 'error' | 'info' | 'warning';

export interface NotificationProps {
    /** The message to display */
    message: string;
    /** Visual style variant */
    variant?: NotificationVariant;
    /** Whether to show the close button */
    showClose?: boolean;
    /** Callback when close button is clicked */
    onClose?: () => void;
    /** Additional CSS classes */
    className?: string;
    /** Whether the notification is visible */
    visible?: boolean;
}

const variantConfig: Record<NotificationVariant, {
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    closeColor: string;
    closeHoverColor: string;
    closeHoverBg: string;
}> = {
    success: {
        icon: CheckCircle2,
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50/80',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        closeColor: 'text-green-400',
        closeHoverColor: 'hover:text-green-600',
        closeHoverBg: 'hover:bg-green-100/50',
    },
    error: {
        icon: AlertCircle,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50/80',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        closeColor: 'text-red-400',
        closeHoverColor: 'hover:text-red-600',
        closeHoverBg: 'hover:bg-red-100/50',
    },
    info: {
        icon: Info,
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-50/80',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        closeColor: 'text-blue-400',
        closeHoverColor: 'hover:text-blue-600',
        closeHoverBg: 'hover:bg-blue-100/50',
    },
    warning: {
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
        bgColor: 'bg-amber-50/80',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-800',
        closeColor: 'text-amber-400',
        closeHoverColor: 'hover:text-amber-600',
        closeHoverBg: 'hover:bg-amber-100/50',
    },
};

/**
 * Notification Component
 * 
 * A reusable notification banner with optional close button.
 * Supports success, error, info, and warning variants.
 */
export default function Notification({
    message,
    variant = 'info',
    showClose = true,
    onClose,
    className = '',
    visible = true,
}: NotificationProps) {
    if (!visible) return null;

    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
        <div
            className={`
                flex-shrink-0 mx-4 mt-4 ${config.bgColor} backdrop-blur-sm 
                border ${config.borderColor} rounded-2xl px-6 py-4 shadow-sm 
                animate-in fade-in slide-in-from-top-2 relative group
                ${className}
            `}
        >
            <div className={`max-w-4xl mx-auto flex items-center gap-3 text-sm ${config.textColor} font-medium ${showClose ? 'pr-8' : ''}`}>
                <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
                <div className="flex-1 overflow-hidden break-words">
                    {message}
                </div>
            </div>
            {showClose && onClose && (
                <button
                    onClick={onClose}
                    className={`
                        absolute right-4 top-1/2 -translate-y-1/2 p-2 
                        ${config.closeColor} ${config.closeHoverColor} ${config.closeHoverBg} 
                        rounded-full transition-all
                    `}
                    aria-label={`Close ${variant} notification`}
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
