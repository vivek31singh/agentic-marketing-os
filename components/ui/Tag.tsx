import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

// Define the variant type explicitly
export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 text-gray-700 hover:bg-gray-200',
        primary:
          'bg-blue-100 text-blue-700 hover:bg-blue-200',
        success:
          'bg-green-100 text-green-700 hover:bg-green-200',
        warning:
          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        error:
          'bg-red-100 text-red-700 hover:bg-red-200',
        outline:
          'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
  removable?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = 'default', removable = false, onRemove, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant }), className)}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
