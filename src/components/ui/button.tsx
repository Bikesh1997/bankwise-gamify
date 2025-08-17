import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary to-primary-dark text-primary-foreground hover:from-primary-glow hover:to-primary hover:shadow-glow transform hover:-translate-y-0.5 hover:scale-105",
        destructive:
          "bg-gradient-to-br from-destructive to-destructive text-destructive-foreground hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/30 transform hover:scale-105",
        secondary:
          "bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground hover:shadow-md transform hover:-translate-y-0.5 hover:scale-105",
        ghost: "hover:bg-accent-hover hover:text-accent-foreground transform hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        premium: "bg-gradient-to-br from-secondary via-secondary-light to-secondary text-secondary-foreground hover:shadow-elegant transform hover:-translate-y-1 hover:scale-105 border border-secondary/20",
        elegant: "bg-gradient-to-br from-muted to-background text-foreground hover:shadow-elegant border border-border hover:border-primary/20 transform hover:-translate-y-0.5 hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10",
        icon: "h-10 w-10",
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

export { Button, buttonVariants }
