import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Button } from "./Button"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon | React.ReactNode
  title: string
  description?: string | React.ReactNode
  action?: React.ReactNode | {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary" | "primary"
  }
  variant?: string // Allow variant formatting prop (even if unused, to suppress errors)
  actions?: React.ReactNode // Alias for action or multiple actions
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

    const isIconElement = React.isValidElement(Icon);

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
          <div className={cn("mb-4 text-neutral-400", isIconElement ? "" : iconSize[size])}>
            {isIconElement ? (
              Icon
            ) : (
              // @ts-ignore
              <Icon className={iconSize[size]} strokeWidth={1.5} />
            )}
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
            {React.isValidElement(action) ? (
              action
            ) : (
              // @ts-ignore
              <Button onClick={action.onClick} variant="primary">
                {/* @ts-ignore */}
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
