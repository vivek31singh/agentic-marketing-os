import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary hover:bg-primary/20",
        secondary:
          "bg-secondary/10 text-secondary-foreground hover:bg-secondary/20",
        success:
          "bg-success/10 text-success hover:bg-success/20",
        warning:
          "bg-warning/10 text-warning hover:bg-warning/20",
        danger:
          "bg-danger/10 text-danger hover:bg-danger/20",
        neutral:
          "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
        outline:
          "border border-neutral-300 text-foreground bg-transparent hover:bg-neutral-50 hover:border-neutral-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return <div className={cn(tagVariants({ variant }), className)} {...props} />;
}

export { Tag, tagVariants };