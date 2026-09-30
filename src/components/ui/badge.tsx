import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-xs px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        nuevo: "bg-primary-subtle text-primary-subtle-foreground",
        instalacion: "bg-whatsapp-soft text-whatsapp-soft-foreground",
        "a-pedido": "bg-warning-subtle text-warning-subtle-foreground",
        stock: "bg-success-subtle text-success-subtle-foreground",
        neutro: "bg-muted text-muted-foreground",
        outline: "border border-border text-muted-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        inverse: "border border-white/15 bg-white/10 text-surface-inverse-foreground",
      },
    },
    defaultVariants: {
      variant: "nuevo",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
