import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-neutral-200 bg-neutral-50 text-neutral-700',
        primary: 'border-primary-200 bg-primary-50 text-primary-700',
        secondary: 'border-secondary-200 bg-secondary-50 text-secondary-700',
        success: 'border-success-200 bg-success-50 text-success-700',
        warning: 'border-warning-200 bg-warning-50 text-warning-700',
        error: 'border-error-200 bg-error-50 text-error-700',
        info: 'border-info-200 bg-info-50 text-info-700',
      },
      size: {
        default: 'h-7',
        sm: 'h-6 px-2 text-[11px]',
        lg: 'h-8 px-3 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, children, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex-shrink-0 rounded-full hover:bg-black/5 p-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);
Tag.displayName = 'Tag';

export { Tag, tagVariants };
