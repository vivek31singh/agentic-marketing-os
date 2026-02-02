import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge Component Variants
 * Uses CVA for type-safe variant management
 */
const badgeVariants = cva(
  // Base styles
  'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      // Color variants - aligned with theme.ts naming convention
      variant: {
        default: 'bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200 focus:ring-neutral-500',
        primary: 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 focus:ring-primary-500',
        secondary: 'bg-secondary-50 text-secondary-700 border border-secondary-200 hover:bg-secondary-100 focus:ring-secondary-500',
        success: 'bg-success-50 text-success-700 border border-success-200 hover:bg-success-100 focus:ring-success-500',
        warning: 'bg-warning-50 text-warning-700 border border-warning-200 hover:bg-warning-100 focus:ring-warning-500',
        error: 'bg-error-50 text-error-700 border border-error-200 hover:bg-error-100 focus:ring-error-500',
        info: 'bg-info-50 text-info-700 border border-info-200 hover:bg-info-100 focus:ring-info-500',
      },
      // Size variants
      size: {
        sm: 'px-2 py-0 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
      // Shape variants
      shape: {
        default: 'rounded-md',
        pill: 'rounded-full',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Optional dot indicator before the badge text
   */
  withDot?: boolean;
  /**
   * Custom icon to display in the badge
   */
  icon?: React.ReactNode;
}

/**
 * Badge Component
 * 
 * A reusable badge component for displaying status, categories, or labels.
 * Uses forwardRef for proper ref forwarding and accessibility.
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="error" withDot>Error</Badge>
 * <Badge variant="primary" size="lg" icon={<Icon />}>Label</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, shape, withDot, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      >
        {withDot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              {
                'bg-neutral-500': variant === 'default',
                'bg-primary-500': variant === 'primary',
                'bg-secondary-500': variant === 'secondary',
                'bg-success-500': variant === 'success',
                'bg-warning-500': variant === 'warning',
                'bg-error-500': variant === 'error',
                'bg-info-500': variant === 'info',
              }
            )}
            aria-hidden="true"
          />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        {children && <span className="truncate">{children}</span>}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
