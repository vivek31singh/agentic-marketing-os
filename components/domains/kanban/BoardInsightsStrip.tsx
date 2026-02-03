import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KPI {
  id: string;
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
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

  const getTrendIcon = (trend: KPI['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" />;
      case 'down':
        return <TrendingDown className="h-3 w-3" />;
      case 'neutral':
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = (trend: KPI['trend']) => {
    switch (trend) {
      case 'up':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'down':
        return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'neutral':
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto">
      {validKPIs.map((kpi) => (
        <div
          key={kpi.id}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm"
        >
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
            <span className="text-sm font-semibold text-slate-900">{kpi.value}</span>
          </div>
          {kpi.change && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
                getTrendColor(kpi.trend)
              )}
            >
              {getTrendIcon(kpi.trend)}
              <span>{kpi.change}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
