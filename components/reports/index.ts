/**
 * Reusable Reports/Workflows System Components
 *
 * A generic system that can display various types of reports and workflows,
 * designed to be used across different functionalities.
 */

// Main Components
export { ReportCard } from './ReportCard';
export type { ReportCardProps } from './ReportCard';

export { ReportList } from './ReportList';
export type { ReportListProps } from './ReportList';

export { ReportDetail } from './ReportDetail';
export type { ReportDetailProps } from './ReportDetail';

// Types
export type {
    ReportType,
    ReportStatus,
    ReportPriority,
    ReportData,
    ReportSection,
    ReportMetric,
    ReportChart,
    ReportTable,
    ReportTableColumn,
    ReportTableRow,
    ReportFilter,
    ReportSort,
    ReportViewOptions,
    ExportFormat,
    ExportOptions,
    ReportListState,
    ReportDetailState,
} from './types/reports.types';

export {
    REPORT_TYPE_LABELS,
    REPORT_TYPE_ICONS,
    REPORT_STATUS_LABELS,
    REPORT_STATUS_COLORS,
    REPORT_PRIORITY_LABELS,
    REPORT_PRIORITY_COLORS,
    EXPORT_FORMAT_LABELS,
} from './types/reports.types';
