import React from 'react';
import { MetricsGrid, MetricItem } from '@/components/common/MetricsGrid';

export interface KPI extends MetricItem {
  // Extending base metric item
}

interface BoardInsightsStripProps {
  kpis?: KPI[] | null;
}

export function BoardInsightsStrip({ kpis }: BoardInsightsStripProps) {
  // Safety check: ensure kpis is an array, otherwise use empty array
  const validKPIs = Array.isArray(kpis) ? kpis : [];

  if (validKPIs.length === 0) {
    return (
      <div className="flex items-center gap-4 text-sm text-slate-400">
        No KPI data available
      </div>
    );
  }

  // Board insights typically have 5 columns due to horizontal layout preference in mission control
  // But we'll default to the responsive behavior of MetricsGrid
  return (
    <MetricsGrid
      metrics={validKPIs}
      className="grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
    />
  );
}
