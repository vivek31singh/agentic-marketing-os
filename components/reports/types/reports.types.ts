/**
 * TypeScript types for the Reusable Reports/Workflows System
 *
 * A generic system that can display various types of reports and workflows,
 * designed to be used across different functionalities.
 */

// ============================================
// Report Types
// ============================================

export type ReportType =
    | 'workflow'
    | 'audit'
    | 'analytics'
    | 'seo'
    | 'performance'
    | 'content'
    | 'structure'
    | 'custom';

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
    workflow: 'Workflow Report',
    audit: 'Audit Report',
    analytics: 'Analytics Report',
    seo: 'SEO Report',
    performance: 'Performance Report',
    content: 'Content Report',
    structure: 'Structure Report',
    custom: 'Custom Report',
};

export const REPORT_TYPE_ICONS: Record<ReportType, string> = {
    workflow: 'workflow',
    audit: 'clipboard-list',
    analytics: 'bar-chart-2',
    seo: 'search',
    performance: 'zap',
    content: 'file-text',
    structure: 'layout',
    custom: 'file',
};

// ============================================
// Report Status
// ============================================

export type ReportStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
    pending: 'Pending',
    running: 'Running',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
};

export const REPORT_STATUS_COLORS: Record<ReportStatus, string> = {
    pending: 'bg-neutral-100 text-neutral-600',
    running: 'bg-primary/10 text-primary',
    completed: 'bg-success/10 text-success',
    failed: 'bg-error/10 text-error',
    cancelled: 'bg-neutral-100 text-neutral-400',
};

// ============================================
// Report Priority
// ============================================

export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent';

export const REPORT_PRIORITY_LABELS: Record<ReportPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};

export const REPORT_PRIORITY_COLORS: Record<ReportPriority, string> = {
    low: 'bg-neutral-100 text-neutral-600',
    medium: 'bg-warning/10 text-warning',
    high: 'bg-error/10 text-error',
    urgent: 'bg-error text-white',
};

// ============================================
// Report Data Types
// ============================================

export interface ReportData {
    id: string;
    title: string;
    description?: string;
    type: ReportType;
    status: ReportStatus;
    priority: ReportPriority;
    createdAt: string;
    startedAt?: string;
    completedAt?: string;
    progress?: number; // 0-100
    createdBy?: string;
    metadata?: Record<string, any>;
}

export interface ReportSection {
    id: string;
    title: string;
    content: React.ReactNode;
    order: number;
}

export interface ReportMetric {
    label: string;
    value: string | number;
    change?: number;
    unit?: string;
    icon?: string;
}

export interface ReportChart {
    type: 'bar' | 'line' | 'pie' | 'table';
    data: any[];
    title?: string;
    description?: string;
}

export interface ReportTable {
    columns: ReportTableColumn[];
    rows: ReportTableRow[];
    title?: string;
    description?: string;
}

export interface ReportTableColumn {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
}

export interface ReportTableRow {
    id: string;
    cells: Record<string, React.ReactNode>;
    metadata?: Record<string, any>;
}

// ============================================
// Filter/Sort Types
// ============================================

export interface ReportFilter {
    field: string;
    value: any;
    operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'in';
}

export interface ReportSort {
    field: string;
    direction: 'asc' | 'desc';
}

export interface ReportViewOptions {
    filters: ReportFilter[];
    sort: ReportSort | null;
    pageSize: number;
    currentPage: number;
}

// ============================================
// Export Types
// ============================================

export type ExportFormat = 'pdf' | 'csv' | 'json' | 'xlsx';

export const EXPORT_FORMAT_LABELS: Record<ExportFormat, string> = {
    pdf: 'PDF',
    csv: 'CSV',
    json: 'JSON',
    xlsx: 'Excel',
};

export interface ExportOptions {
    format: ExportFormat;
    includeMetadata?: boolean;
    includeCharts?: boolean;
    includeRawData?: boolean;
}

// ============================================
// Report List State
// ============================================

export interface ReportListState {
    reports: ReportData[];
    selectedReports: Set<string>;
    filters: ReportFilter[];
    sort: ReportSort | null;
    viewOptions: ReportViewOptions;
    loading: boolean;
    error: string | null;
}

// ============================================
// Report Detail State
// ============================================

export interface ReportDetailState {
    report: ReportData | null;
    sections: ReportSection[];
    metrics: ReportMetric[];
    charts: ReportChart[];
    tables: ReportTable[];
    loading: boolean;
    error: string | null;
    isExporting: boolean;
}
