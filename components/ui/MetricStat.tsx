import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const metricStatVariants = cva('transition-all duration-200', {
  variants: {
    size: {
      default: '',
      sm: 'text-sm',
      lg: 'text-lg',
    },
    variant: {
      default: '',
      card: 'rounded-xl border shadow-sm p-4',
    },
    intent: {
      default: 'bg-white border-transparent',
      slate: 'bg-slate-50 border-slate-100 hover:border-slate-200',
      emerald: 'bg-emerald-50 border-emerald-100 hover:border-emerald-200',
      sky: 'bg-sky-50 border-sky-100 hover:border-sky-200',
      indigo: 'bg-indigo-50 border-indigo-100 hover:border-indigo-200',
      rose: 'bg-rose-50 border-rose-100 hover:border-rose-200',
    }
  },
  compoundVariants: [
    {
      variant: 'default',
      intent: 'default',
      class: '',
    }
  ],
  defaultVariants: {
    size: 'default',
    variant: 'default',
    intent: 'default',
  },
});

export interface MetricStatProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  VariantProps<typeof metricStatVariants> {
  label: string;
  value: string | number;
  change?: number | string;
  changeType?: 'absolute' | 'percentage';
  icon?: LucideIcon | React.ReactNode;
  iconColor?: string;
}

const MetricStat = React.forwardRef<HTMLDivElement, MetricStatProps>(
  (
    {
      className,
      label,
      value,
      change,
      changeType = 'percentage',
      icon,
      iconColor = 'text-primary-500',
      size,
      variant,
      intent,
      ...props
    },
    ref
  ) => {
    // If a intent is provided but no variant, default to 'card'
    const finalVariant = variant || (intent && intent !== 'default' ? 'card' : 'default');

    // Parse change value: handle string (e.g. "+15%") or number
    const numericChange = typeof change === 'number' ? change : parseFloat(change as string);
    const hasChange = change !== undefined && change !== null && !isNaN(numericChange);
    const isPositive = hasChange && numericChange > 0;
    const isNegative = hasChange && numericChange < 0;
    const changeValue = hasChange ? Math.abs(numericChange) : undefined;

    const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

    const trendColor = isPositive
      ? 'text-emerald-700'
      : isNegative
        ? 'text-rose-700'
        : 'text-slate-500';

    const Icon = icon as LucideIcon;
    const isIconComponent = typeof icon === 'function' || (typeof icon === 'object' && icon !== null && 'render' in icon);
    const isIconElement = React.isValidElement(icon);

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3', metricStatVariants({ size, variant: finalVariant, intent }), className)}
        {...props}
      >
        {icon && (
          <div className={cn('flex-shrink-0 rounded-lg bg-neutral-100 p-2', size === 'sm' ? 'p-1.5' : 'p-2')}>
            {isIconElement ? (
              icon
            ) : (
              // @ts-ignore - complex check
              <Icon className={cn('h-5 w-5', iconColor, size === 'sm' && 'h-4 w-4')} />
            )}
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

const MetricStatSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="flex-shrink-0 rounded-lg bg-neutral-200 h-9 w-9" />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-20" />
        <div className="h-6 bg-neutral-200 rounded w-16" />
      </div>
    </div>
  )
}

const MetricStatWithSkeleton = Object.assign(MetricStat, {
  Skeleton: MetricStatSkeleton
})

export { MetricStatWithSkeleton as MetricStat };
