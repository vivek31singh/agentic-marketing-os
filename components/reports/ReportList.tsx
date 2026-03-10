'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ReportCard } from './ReportCard';
import { ReportData, ReportFilter, ReportSort, ReportViewOptions, ReportType, REPORT_TYPE_LABELS, REPORT_STATUS_LABELS, REPORT_PRIORITY_LABELS } from './types/reports.types';
import { Search, Filter, ArrowUpDown, Download, Grid3x3, List } from 'lucide-react';

/**
 * ReportList Component
 *
 * Displays a list of reports with filtering, sorting, and view options.
 *
 * @component
 */
export interface ReportListProps {
    reports: ReportData[];
    selectedReports: Set<string>;
    onSelectReport: (id: string) => void;
    onDownloadReport?: (report: ReportData) => void;
    onMoreReport?: (id: string) => void;
    filters?: ReportFilter[];
    sort?: ReportSort | null;
    viewOptions?: ReportViewOptions;
    loading?: boolean;
    error?: string | null;
    onFilterChange?: (filters: ReportFilter[]) => void;
    onSortChange?: (sort: ReportSort) => void;
    onViewOptionsChange?: (options: ReportViewOptions) => void;
    onExportSelected?: () => void;
    className?: string;
}

export const ReportList: React.FC<ReportListProps> = ({
    reports,
    selectedReports,
    onSelectReport,
    onDownloadReport,
    onMoreReport,
    filters = [],
    sort = null,
    viewOptions = { pageSize: 12, currentPage: 1, filters: [], sort: null },
    loading = false,
    error = null,
    onFilterChange,
    onSortChange,
    onViewOptionsChange,
    onExportSelected,
    className,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter and sort reports
    const filteredReports = useMemo(() => {
        let result = [...reports];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (report) =>
                    report.title.toLowerCase().includes(query) ||
                    report.description?.toLowerCase().includes(query)
            );
        }

        // Apply filters
        const activeFilters = filters.filter((f) => f.value !== null && f.value !== '');
        activeFilters.forEach((filter) => {
            result = result.filter((report) => {
                const value = report[filter.field as keyof ReportData];
                switch (filter.operator) {
                    case 'eq':
                        return value === filter.value;
                    case 'ne':
                        return value !== filter.value;
                    case 'gt':
                        return typeof value === 'number' && value > filter.value;
                    case 'lt':
                        return typeof value === 'number' && value < filter.value;
                    case 'gte':
                        return typeof value === 'number' && value >= filter.value;
                    case 'lte':
                        return typeof value === 'number' && value <= filter.value;
                    case 'contains':
                        return typeof value === 'string' && value.includes(filter.value as string);
                    case 'in':
                        return typeof value === 'string' && (filter.value as string[]).includes(value);
                    default:
                        return true;
                }
            });
        });

        // Apply sort
        if (sort) {
            result.sort((a, b) => {
                const aValue = a[sort.field as keyof ReportData];
                const bValue = b[sort.field as keyof ReportData];
                let comparison = 0;

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparison = aValue - bValue;
                } else if (typeof aValue === 'string' && typeof bValue === 'string') {
                    comparison = aValue.localeCompare(bValue);
                } else if (aValue instanceof Date && bValue instanceof Date) {
                    comparison = aValue.getTime() - bValue.getTime();
                }

                return sort.direction === 'asc' ? comparison : -comparison;
            });
        }

        return result;
    }, [reports, searchQuery, filters, sort]);

    // Pagination
    const totalPages = Math.ceil(filteredReports.length / viewOptions.pageSize);
    const startIndex = (viewOptions.currentPage - 1) * viewOptions.pageSize;
    const endIndex = startIndex + viewOptions.pageSize;
    const paginatedReports = filteredReports.slice(startIndex, endIndex);

    const handleToggleSelect = (id: string) => {
        const newSelected = new Set(selectedReports);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        onSelectReport(id);
    };

    const handleSort = (field: string) => {
        const newDirection = sort?.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
        onSortChange?.({ field, direction: newDirection });
    };

    const handleExportSelected = () => {
        const selectedReportsData = reports.filter((r) => selectedReports.has(r.id));
        // Trigger export with selected reports
        console.log('Exporting', selectedReportsData);
        onExportSelected?.();
    };

    if (loading) {
        return (
            <div className={cn('space-y-4', className)}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-32 bg-neutral-200 rounded-lg" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn('text-center py-12', className)}>
                <p className="text-error mb-2">Failed to load reports</p>
                <p className="text-sm text-neutral-500">{error}</p>
            </div>
        );
    }

    if (filteredReports.length === 0) {
        return (
            <div className={cn('text-center py-12', className)}>
                <div className="inline-flex flex-col items-center justify-center p-8 bg-neutral-100 rounded-full mb-4">
                    <List className="h-12 w-12 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Reports Found</h3>
                <p className="text-sm text-neutral-500">
                    {searchQuery
                        ? `No reports match "${searchQuery}"`
                        : 'There are no reports yet.'}
                </p>
            </div>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Header with Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-neutral-900">
                        Reports ({filteredReports.length})
                    </h2>
                    <p className="text-sm text-neutral-500">
                        Manage and view your generated reports
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search reports..."
                            className="pl-10 w-64"
                        />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                        <Button
                            type="button"
                            variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className="rounded-r-none"
                        >
                            <Grid3x3 className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant={viewMode === 'list' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className="rounded-r-none"
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Sort Dropdown */}
                    {sort && (
                        <div className="relative">
                            <select
                                value={`${sort.field}-${sort.direction}`}
                                onChange={(e) => handleSort(e.target.value.split('-')[0])}
                                className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                                <option value={`createdAt-asc`}>Newest First</option>
                                <option value={`createdAt-desc`}>Oldest First</option>
                                <option value={`title-asc`}>Title A-Z</option>
                                <option value={`title-desc`}>Title Z-A</option>
                            </select>
                            <ArrowUpDown className="absolute right-3 top-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                        </div>
                    )}

                    {/* Export Button */}
                    {selectedReports.size > 0 && onExportSelected && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleExportSelected}
                            className="gap-1.5"
                        >
                            <Download className="h-4 w-4" />
                            Export ({selectedReports.size})
                        </Button>
                    )}
                </div>
            </div>

            {/* Active Filters */}
            {filters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {filters.map((filter, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1 text-sm"
                        >
                            <Filter className="h-3.5 w-3.5 text-neutral-500" />
                            <span className="text-neutral-700">{filter.field}</span>
                            <span className="text-neutral-500">
                                {filter.operator} {filter.value}
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    const newFilters = filters.filter((f) => f !== filter);
                                    onFilterChange?.(newFilters);
                                }}
                                className="ml-1 text-neutral-400 hover:text-neutral-600"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Reports Grid/List */}
            <div
                className={cn(
                    viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                        : 'space-y-3'
                )}
            >
                {paginatedReports.map((report) => (
                    <ReportCard
                        key={report.id}
                        report={report}
                        onSelect={handleToggleSelect}
                        onDownload={onDownloadReport}
                        onMore={onMoreReport}
                        className={selectedReports.has(report.id) ? 'ring-2 ring-primary' : ''}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            onViewOptionsChange?.({
                                ...viewOptions,
                                currentPage: Math.max(1, viewOptions.currentPage - 1),
                            });
                        }}
                        disabled={viewOptions.currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-neutral-600">
                        Page {viewOptions.currentPage} of {totalPages}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            onViewOptionsChange?.({
                                ...viewOptions,
                                currentPage: Math.min(totalPages, viewOptions.currentPage + 1),
                            });
                        }}
                        disabled={viewOptions.currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

ReportList.displayName = 'ReportList';
