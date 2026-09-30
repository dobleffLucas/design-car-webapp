import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-label leading-none ring-offset-background transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out select-none active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover hover:shadow-sm active:bg-primary-active disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-hover hover:shadow-sm disabled:bg-muted disabled:text-muted-foreground",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-xs hover:bg-whatsapp-hover hover:shadow-sm disabled:bg-muted disabled:text-muted-foreground",
        whatsappSoft:
          "border border-whatsapp-border bg-whatsapp-soft text-whatsapp-soft-foreground hover:border-whatsapp/40 hover:bg-whatsapp-soft/70 disabled:border-border disabled:bg-muted disabled:text-muted-foreground",
        outline:
          "border border-input bg-card text-foreground shadow-xs hover:border-border-strong hover:bg-muted active:bg-muted-hover disabled:border-border disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
        subtle:
          "border border-transparent bg-primary-subtle text-primary-subtle-foreground hover:bg-primary-subtle/70",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground disabled:text-muted-foreground/60",
        link: "text-primary underline-offset-4 hover:underline",
        inverse:
          "border border-white/20 bg-white/10 text-surface-inverse-foreground hover:bg-white/20",
      },
      size: {
        default: "h-11 px-lg [&_svg]:size-4",
        sm: "h-9 rounded-sm px-3 text-[0.8125rem] [&_svg]:size-3.5",
        lg: "h-12 rounded-md px-xl text-body-s [&_svg]:size-[1.125rem]",
        icon: "h-11 w-11 [&_svg]:size-[1.125rem]",
        iconSm: "h-9 w-9 rounded-sm [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
