import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Button } from "./Button"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  size?: "sm" | "md" | "lg"
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    { className, icon: Icon, title, description, action, size = "md", ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "p-4",
      md: "p-8",
      lg: "p-12",
    }

    const iconSize = {
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {Icon && (
          <div className={cn("mb-4 text-neutral-400", iconSize[size])}>
            <Icon className={iconSize[size]} strokeWidth={1.5} />
          </div>
        )}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-6">
            <Button onClick={action.onClick} variant="primary">
              {action.label}
            </Button>
          </div>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
