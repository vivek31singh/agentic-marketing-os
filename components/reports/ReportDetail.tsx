'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ReportData, ReportSection, ReportMetric, ReportChart, ReportTable, ReportStatus, REPORT_STATUS_LABELS, REPORT_STATUS_COLORS, ExportFormat, EXPORT_FORMAT_LABELS } from './types/reports.types';
import { ArrowLeft, Download, Share2, Printer, RefreshCw, FileText, BarChart3, Table } from 'lucide-react';

/**
 * ReportDetail Component
 *
 * Displays a detailed report with sections, metrics, charts, and tables.
 *
 * @component
 */
export interface ReportDetailProps {
    report: ReportData | null;
    sections: ReportSection[];
    metrics: ReportMetric[];
    charts: ReportChart[];
    tables: ReportTable[];
    loading?: boolean;
    error?: string | null;
    onBack?: () => void;
    onExport?: (format: ExportFormat) => void;
    onRefresh?: () => void;
    onShare?: () => void;
    onPrint?: () => void;
    isExporting?: boolean;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({
    report,
    sections = [],
    metrics = [],
    charts = [],
    tables = [],
    loading = false,
    error = null,
    onBack,
    onExport,
    onRefresh,
    onShare,
    onPrint,
    isExporting = false,
}) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [expandedSection, setExpandedSection] = useState<Set<string>>(new Set());
    const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');

    const handleToggleSection = (sectionId: string) => {
        const newExpanded = new Set(expandedSection);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
            setActiveSection(null);
        } else {
            newExpanded.add(sectionId);
            setActiveSection(sectionId);
        }
    };

    const handleExport = () => {
        onExport?.(exportFormat);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardContent className="p-6">
                            <div className="animate-pulse">
                                <div className="h-4 bg-neutral-200 rounded w-24 mb-4" />
                                <div className="h-2 bg-neutral-200 rounded w-16" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-12 text-center">
                    <p className="text-error mb-2">Failed to load report</p>
                    <p className="text-sm text-neutral-500">{error}</p>
                    {onBack && (
                        <Button variant="outline" onClick={onBack}>
                            Go Back
                        </Button>
                    )}
                </CardContent>
            </Card>
        );
    }

    if (!report) {
        return null;
    }

    const statusColor = REPORT_STATUS_COLORS[report.status];
    const statusLabel = REPORT_STATUS_LABELS[report.status];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900">{report.title}</h1>
                        <p className="text-sm text-neutral-500">{report.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={statusColor}>
                        {statusLabel}
                    </Badge>

                    <div className="flex items-center gap-2">
                        {onRefresh && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onRefresh}
                            >
                                <RefreshCw className="h-4 w-4" />
                                Refresh
                            </Button>
                        )}
                        {onShare && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onShare}
                            >
                                <Share2 className="h-4 w-4" />
                                Share
                            </Button>
                        )}
                        {onPrint && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={onPrint}
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            {metrics.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {metrics.map((metric, index) => (
                                <div key={index} className="p-4 bg-neutral-50 rounded-lg">
                                    <div className="flex items-center gap-3 mb-2">
                                        {metric.icon && (
                                            <span className="text-2xl">{metric.icon}</span>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm text-neutral-500">{metric.label}</p>
                                            <p className="text-2xl font-bold text-neutral-900">
                                                {metric.value}
                                                {metric.unit && <span className="text-sm font-normal text-neutral-600 ml-1">{metric.unit}</span>}
                                            </p>
                                        </div>
                                    </div>
                                    {metric.change !== undefined && (
                                        <div className="flex items-center gap-1 text-xs">
                                            <span
                                                className={cn(
                                                    metric.change > 0 ? 'text-success' : metric.change < 0 ? 'text-error' : 'text-neutral-500'
                                                )}
                                            >
                                                {metric.change > 0 ? '↑' : metric.change < 0 ? '↓' : ''}
                                                {Math.abs(metric.change)}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Charts */}
            {charts.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Visualizations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {charts.map((chart, index) => (
                                <div key={index} className="space-y-4">
                                    {chart.title && (
                                        <h3 className="text-sm font-medium text-neutral-700 mb-2">
                                            {chart.title}
                                        </h3>
                                    )}
                                    {chart.description && (
                                        <p className="text-xs text-neutral-500 mb-4">
                                            {chart.description}
                                        </p>
                                    )}
                                    <div className="bg-white border border-neutral-200 rounded-lg p-4 min-h-64 flex items-center justify-center">
                                        <div className="text-center">
                                            <BarChart3 className="h-12 w-12 text-neutral-300 mx-auto mb-2" />
                                            <p className="text-sm text-neutral-500">
                                                Chart: {chart.type}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Tables */}
            {tables.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Data Tables</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {tables.map((table, index) => (
                                <div key={index}>
                                    {table.title && (
                                        <h3 className="text-sm font-medium text-neutral-700 mb-3">
                                            {table.title}
                                        </h3>
                                    )}
                                    {table.description && (
                                        <p className="text-xs text-neutral-500 mb-3">
                                            {table.description}
                                        </p>
                                    )}
                                    <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-neutral-50">
                                                    {table.columns.map((column) => (
                                                        <th
                                                            key={column.key}
                                                            className={cn(
                                                                'px-4 py-3 text-left font-medium text-neutral-700',
                                                                column.align === 'center' && 'text-center',
                                                                column.align === 'right' && 'text-right'
                                                            )}
                                                        >
                                                            {column.label}
                                                            {column.sortable && (
                                                                <span className="ml-1 text-neutral-400">
                                                                    ↕
                                                                </span>
                                                            )}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {table.rows.map((row) => (
                                                    <tr key={row.id} className="border-t border-neutral-200 hover:bg-neutral-50">
                                                        {table.columns.map((column) => (
                                                            <td
                                                                key={column.key}
                                                                className={cn(
                                                                    'px-4 py-3',
                                                                    column.align === 'center' && 'text-center',
                                                                    column.align === 'right' && 'text-right'
                                                                )}
                                                            >
                                                                {row.cells[column.key]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sections */}
            {sections.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Report Sections</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sections.map((section) => (
                                <div key={section.id}>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleSection(section.id)}
                                        className="w-full text-left"
                                    >
                                        <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={cn(
                                                        'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200',
                                                        expandedSection.has(section.id) ? 'bg-primary text-white rotate-90' : 'bg-neutral-200 text-neutral-600'
                                                    )}
                                                >
                                                    <span className="text-sm font-medium">
                                                        {expandedSection.has(section.id) ? '−' : '+'}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-neutral-900">{section.title}</h3>
                                            </div>
                                            <div className="text-sm text-neutral-500">
                                                {expandedSection.has(section.id) ? 'Click to collapse' : 'Click to expand'}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Content */}
                                    {expandedSection.has(section.id) && (
                                        <div className="mt-2 p-4 bg-white border border-neutral-200 rounded-lg">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Export Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Export Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-neutral-700 mb-2 block">
                                Export Format
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {(Object.keys(EXPORT_FORMAT_LABELS) as ExportFormat[]).map((format) => (
                                    <button
                                        key={format}
                                        type="button"
                                        onClick={() => setExportFormat(format)}
                                        className={cn(
                                            'px-4 py-2 rounded-lg border transition-colors',
                                            exportFormat === format
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                        )}
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        {EXPORT_FORMAT_LABELS[format]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={handleExport}
                                disabled={isExporting}
                                className="gap-2"
                            >
                                {isExporting ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-4 w-4" />
                                        Export Report
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

ReportDetail.displayName = 'ReportDetail';
