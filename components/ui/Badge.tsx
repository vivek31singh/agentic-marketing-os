import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define the variant type explicitly
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
        primary:
          'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500',
        success:
          'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500',
        warning:
          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
        error:
          'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500',
        info:
          'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500',
        outline:
          'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
        ghost:
          'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  withDot?: boolean;
}

// Fixed dotColorMap to include all variant types
const dotColorMap: Record<BadgeVariant, string> = {
  default: 'bg-gray-500',
  primary: 'bg-blue-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  outline: 'bg-gray-400',
  ghost: 'bg-gray-400',
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', withDot = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {withDot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              dotColorMap[variant as BadgeVariant] || dotColorMap.default
            )}
          />
        )}
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
