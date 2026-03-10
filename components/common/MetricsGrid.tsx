import React from 'react';
import { LucideIcon } from 'lucide-react';
import { MetricStat } from '@/components/ui/MetricStat';
import { cn } from '@/lib/utils';

export interface MetricItem {
    id?: string;
    label: string;
    value: string | number;
    change?: string | number;
    trend?: 'up' | 'down' | 'neutral';
    icon?: LucideIcon;
    intent?: "slate" | "emerald" | "sky" | "indigo" | "rose";
}

interface MetricsGridProps {
    metrics: MetricItem[];
    className?: string;
}

// Helper to determine card theme based on label (case-insensitive partial match)
// This serves as a default fallback if no explicit intent is provided
export const getMetricIntent = (label: string): "emerald" | "sky" | "indigo" | "rose" | "slate" => {
    const l = label.toLowerCase();

    if (l.includes('health') || l.includes('system') || l.includes('score') || l.includes('published')) {
        return 'emerald';
    }
    if (l.includes('page') || l.includes('action') || l.includes('pending') || l.includes('velocity')) {
        return 'sky';
    }
    if (l.includes('traffic') || l.includes('agent') || l.includes('active') || l.includes('growth')) {
        return 'indigo';
    }
    if (l.includes('issue') || l.includes('error') || l.includes('latency')) {
        return 'rose';
    }

    return 'slate';
};

export function MetricsGrid({ metrics, className }: MetricsGridProps) {
    if (!metrics || metrics.length === 0) {
        return null;
    }

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full", className)}>
            {metrics.map((metric, index) => (
                <MetricStat
                    key={metric.id || index}
                    label={metric.label}
                    value={metric.value}
                    change={metric.change}
                    icon={metric.icon}
                    intent={metric.intent || getMetricIntent(metric.label)}
                    variant="card"
                    className="flex-col items-start gap-1"
                />
            ))}
        </div>
    );
}

export function MetricsGridSkeleton({ count = 4, className }: { count?: number; className?: string }) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full", className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl border border-slate-200 shadow-sm p-4 bg-white"
                >
                    <MetricStat.Skeleton />
                </div>
            ))}
        </div>
    );
}

MetricsGrid.Skeleton = MetricsGridSkeleton;
