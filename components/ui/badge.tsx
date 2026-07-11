import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-600 text-white",
        secondary: "border-transparent bg-secondary-500 text-white",
        accent: "border-transparent bg-accent-500 text-accent-950",
        success: "border-transparent bg-success text-white",
        danger: "border-transparent bg-danger text-white",
        outline: "border-border bg-background/60 text-foreground backdrop-blur",
        muted: "border-transparent bg-muted text-muted-foreground",
        glass: "border-white/25 bg-white/15 text-white backdrop-blur-md",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
