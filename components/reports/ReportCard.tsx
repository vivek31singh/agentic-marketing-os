'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ReportData, ReportStatus, ReportPriority, REPORT_TYPE_ICONS, REPORT_STATUS_LABELS, REPORT_PRIORITY_LABELS, REPORT_STATUS_COLORS, REPORT_PRIORITY_COLORS } from './types/reports.types';
import { FileText, Clock, CheckCircle2, XCircle, AlertCircle, Download, MoreHorizontal } from 'lucide-react';

/**
 * ReportCard Component
 *
 * Displays a report card with status, priority, and actions.
 *
 * @component
 */
export interface ReportCardProps {
    report: ReportData;
    onSelect?: (id: string) => void;
    onDownload?: (report: ReportData) => void;
    onMore?: (id: string) => void;
    className?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
    report,
    onSelect,
    onDownload,
    onMore,
    className,
}) => {
    const statusColor = REPORT_STATUS_COLORS[report.status];
    const priorityColor = REPORT_PRIORITY_COLORS[report.priority];
    const typeIcon = REPORT_TYPE_ICONS[report.type];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const getProgress = () => {
        if (report.status === 'completed') return 100;
        if (report.status === 'running') return report.progress || 0;
        return 0;
    };

    return (
        <Card
            className={cn(
                'hover:border-primary/50 transition-colors cursor-pointer',
                onSelect && 'hover:shadow-md',
                className
            )}
            onClick={() => onSelect?.(report.id)}
        >
            <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                    {/* Type Icon and Title */}
                    <div className="flex items-center gap-3 flex-1">
                        <div className={cn('p-2 rounded-lg', statusColor)}>
                            <span className="text-xl">{typeIcon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-1">
                                {report.title}
                            </h3>
                            {report.description && (
                                <p className="text-sm text-neutral-500 line-clamp-2">
                                    {report.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Status and Priority Badges */}
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className={statusColor}>
                            {REPORT_STATUS_LABELS[report.status]}
                        </Badge>
                        <Badge variant="outline" className={priorityColor}>
                            {REPORT_PRIORITY_LABELS[report.priority]}
                        </Badge>
                    </div>
                </div>

                {/* Progress Bar (for running reports) */}
                {report.status === 'running' && (
                    <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                            <span>Progress</span>
                            <span>{getProgress()}%</span>
                        </div>
                        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${getProgress()}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Created: {formatDate(report.createdAt)}</span>
                        </div>
                        {report.startedAt && (
                            <div className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                <span>Started: {formatDate(report.startedAt)}</span>
                            </div>
                        )}
                        {report.completedAt && (
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 text-success" />
                                <span>Completed: {formatDate(report.completedAt)}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {onDownload && (
                            <button
                                type="button"
                                onClick={() => onDownload(report)}
                                className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors text-neutral-600"
                                aria-label={`Download ${report.title}`}
                            >
                                <Download className="h-4 w-4" />
                            </button>
                        )}
                        {onMore && (
                            <button
                                type="button"
                                onClick={() => onMore(report.id)}
                                className="p-1.5 rounded-md hover:bg-neutral-100 transition-colors text-neutral-600"
                                aria-label={`View ${report.title} details`}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Status Icon */}
                {report.status === 'completed' && (
                    <div className="absolute top-4 right-4">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                )}
                {report.status === 'failed' && (
                    <div className="absolute top-4 right-4">
                        <XCircle className="h-5 w-5 text-error" />
                    </div>
                )}
                {report.status === 'cancelled' && (
                    <div className="absolute top-4 right-4">
                        <XCircle className="h-5 w-5 text-neutral-400" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

ReportCard.displayName = 'ReportCard';
