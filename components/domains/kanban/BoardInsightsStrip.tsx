import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change?: string;
}

interface BoardInsightsStripProps {
  kpis: KPIMetric[];
}

export function BoardInsightsStrip({ kpis }: BoardInsightsStripProps) {
  const trendIcons = {
    up: <TrendingUp className="w-3 h-3 text-emerald-600" />,
    down: <TrendingDown className="w-3 h-3 text-rose-600" />,
    neutral: <Minus className="w-3 h-3 text-slate-500" />,
  };

  const trendColors = {
    up: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    down: 'text-rose-600 bg-rose-50 border-rose-200',
    neutral: 'text-slate-600 bg-slate-50 border-slate-200',
  };

  return (
    <div className="flex items-center gap-3 px-6 py-3 border-b border-slate-200/60 bg-white/30">
      <Activity className="w-4 h-4 text-slate-400" />
      <div className="flex items-center gap-2 overflow-x-auto">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white shadow-sm whitespace-nowrap"
          >
            <span className="text-sm font-medium text-slate-700">{kpi.label}:</span>
            <span className="text-sm font-semibold text-slate-900">{kpi.value}</span>
            {kpi.change && (
              <div className={cn(
                "flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium border",
                trendColors[kpi.trend]
              )}>
                {trendIcons[kpi.trend]}
                <span>{kpi.change}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
