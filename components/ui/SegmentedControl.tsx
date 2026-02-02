import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const segmentedControlVariants = cva(
  'inline-flex items-center justify-center rounded-lg bg-neutral-100 p-1 text-sm font-medium text-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100',
      },
      size: {
        default: 'h-9 px-1',
        sm: 'h-8 px-0.5',
        lg: 'h-10 px-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const segmentedControlItemVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      active: {
        true: 'bg-white text-neutral-900 shadow-sm',
        false: 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface SegmentedControlItem {
  label: string;
  value: string;
}

export interface SegmentedControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof segmentedControlVariants> {
  items: SegmentedControlItem[];
  value: string;
  onValueChange: (value: string) => void;
}

function SegmentedControl({
  className,
  items,
  value,
  onValueChange,
  variant,
  size,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      className={cn(segmentedControlVariants({ variant, size, className }))}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onValueChange(item.value)}
          className={cn(
            segmentedControlItemVariants({ active: value === item.value })
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export { SegmentedControl, segmentedControlVariants };
