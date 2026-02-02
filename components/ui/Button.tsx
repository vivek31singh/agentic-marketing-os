import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Define the variant type explicitly
export type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline' | 'ghost';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        success:
          'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        warning:
          'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
        error:
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        outline:
          'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
        ghost:
          'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
