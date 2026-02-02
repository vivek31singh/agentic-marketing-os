'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      xs: 'h-5 w-5 text-[8px]',
      sm: 'h-6 w-6 text-[10px]',
      default: 'h-8 w-8 text-xs',
      lg: 'h-10 w-10 text-sm',
      xl: 'h-12 w-12 text-base',
      '2xl': 'h-16 w-16 text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, initials, fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const avatarContent = src && !imageError ? (
      <img
        src={src}
        alt={alt || 'Avatar'}
        className="aspect-square h-full w-full object-cover"
        onError={() => setImageError(true)}
      />
    ) : fallback ? (
      <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-600">
        {fallback}
      </div>
    ) : initials ? (
      <div className="flex h-full w-full items-center justify-center bg-primary-500 text-white font-medium">
        {getInitials(initials)}
      </div>
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-600">
        <User className="h-1/2 w-1/2" />
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {avatarContent}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
