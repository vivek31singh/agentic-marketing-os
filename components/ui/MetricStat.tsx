import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const metricStatVariants = cva('', {
  variants: {
    size: {
      default: '',
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface MetricStatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricStatVariants> {
  label: string;
  value: string | number;
  change?: number;
  changeType?: 'absolute' | 'percentage';
  icon?: LucideIcon;
  iconColor?: string;
  size?: 'default' | 'sm' | 'lg';
}

const MetricStat = React.forwardRef<HTMLDivElement, MetricStatProps>(
  (
    {
      className,
      label,
      value,
      change,
      changeType = 'percentage',
      icon: Icon,
      iconColor = 'text-primary-500',
      size,
      ...props
    },
    ref
  ) => {
    const changeValue = change !== undefined ? Math.abs(change) : undefined;
    const isPositive = change !== undefined && change > 0;
    const isNegative = change !== undefined && change < 0;
    const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
    const trendColor = isPositive
      ? 'text-success-600'
      : isNegative
      ? 'text-error-600'
      : 'text-neutral-500';

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3', metricStatVariants({ size }), className)}
        {...props}
      >
        {Icon && (
          <div className={cn('flex-shrink-0 rounded-lg bg-neutral-100 p-2', size === 'sm' ? 'p-1.5' : 'p-2')}>
            <Icon className={cn('h-5 w-5', iconColor, size === 'sm' && 'h-4 w-4')} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className={cn('text-xl font-semibold text-neutral-900', size === 'lg' && 'text-2xl')}>
            {value}
          </p>
          {changeValue !== undefined && (
            <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>
                {changeType === 'percentage' ? changeValue + '%' : changeValue}
              </span>
              <span className="text-neutral-400">vs last period</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
MetricStat.displayName = 'MetricStat';

export { MetricStat };
