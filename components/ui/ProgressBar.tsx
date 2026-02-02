import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const progressBarVariants = cva('h-full w-full rounded-full transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-primary-500',
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      error: 'bg-error-500',
      info: 'bg-info-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const progressBarSizeVariants = cva('w-full overflow-hidden rounded-full bg-neutral-200', {
  variants: {
    size: {
      sm: 'h-1.5',
      default: 'h-2',
      lg: 'h-3',
      xl: 'h-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants>,
    VariantProps<typeof progressBarSizeVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      max = 100,
      variant,
      size,
      showLabel = false,
      label,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn('w-full space-y-1.5', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex items-center justify-between text-sm">
            {label && <span className="font-medium text-neutral-700">{label}</span>}
            {showLabel && (
              <span className="text-neutral-500">
                {value}/{max}
              </span>
            )}
          </div>
        )}
        <div className={cn(progressBarSizeVariants({ size }))}>
          <div
            className={cn(progressBarVariants({ variant }))}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

export { ProgressBar, progressBarVariants };
