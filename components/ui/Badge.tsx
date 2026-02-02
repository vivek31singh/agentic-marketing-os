import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-danger text-danger-foreground shadow hover:bg-danger/80",
        outline:
          "text-foreground border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost:
          "text-foreground border-transparent bg-primary/10 hover:bg-primary/20",
      },
      size: {
        default: "h-5 px-2.5 py-0.5 text-xs",
        sm: "h-4 px-2 py-0 text-[10px]",
        lg: "h-6 px-3 py-0.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean
  dotColor?: "primary" | "success" | "warning" | "danger" | "neutral"
}

const dotColorMap: Record<BadgeProps["dotColor"], string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  neutral: "bg-neutral-500",
}

function Badge({ className, variant, size, withDot = false, dotColor, ...props }: BadgeProps) {
  const variantDotColorMap: Record<string, string> = {
    default: "bg-primary",
    secondary: "bg-secondary-foreground",
    destructive: "bg-danger",
    outline: "bg-foreground",
    ghost: "bg-primary",
  }

  const resolvedDotColor = dotColor 
    ? dotColorMap[dotColor] 
    : variantDotColorMap[variant || "default"]

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {withDot && (
        <span
          className={cn(
            "mr-1.5 h-1.5 w-1.5 rounded-full",
            resolvedDotColor
          )}
        />
      )}
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
