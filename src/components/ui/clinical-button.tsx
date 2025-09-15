import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const clinicalButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "clinical-button-primary",
        secondary: "clinical-button-secondary",
        outline: "clinical-button-outline",
        hero: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-lg px-8 py-4 text-lg font-semibold",
        callback: "bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 font-semibold shadow-sm hover:shadow-md",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ClinicalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof clinicalButtonVariants> {
  asChild?: boolean
}

const ClinicalButton = React.forwardRef<HTMLButtonElement, ClinicalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(clinicalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ClinicalButton.displayName = "ClinicalButton"

export { ClinicalButton, clinicalButtonVariants }