'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export function TooltipProvider({ children }: { children: React.ReactNode; delayDuration?: number }) {
    return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
    return <div className="group relative flex items-center">{children}</div>;
}

export function TooltipTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
    return <>{children}</>;
}

export function TooltipContent({
    children,
    className
}: {
    children: React.ReactNode;
    side?: string;
    sideOffset?: number;
    className?: string;
}) {
    return (
        <div className={cn(
            "absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs font-bold rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl",
            className
        )}>
            {children}
            {/* Arrow */}
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-black" />
        </div>
    );
}
