import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-card-hover",
        secondary:
          "bg-secondary-500 text-white shadow-soft hover:bg-secondary-600 hover:shadow-card-hover",
        accent:
          "bg-accent-500 text-accent-950 shadow-soft hover:bg-accent-400 hover:shadow-card-hover",
        gradient:
          "bg-hero-gradient bg-[length:200%_200%] text-white shadow-soft hover:shadow-card-hover hover:animate-gradient-pan",
        outline:
          "border-2 border-primary-600 bg-transparent text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-400 dark:text-primary-300 dark:hover:text-white",
        ghost:
          "text-foreground hover:bg-muted hover:text-foreground",
        glass:
          "glass text-white hover:bg-white/20",
        danger:
          "bg-danger text-white shadow-soft hover:bg-danger/90",
        link: "text-primary-600 underline-offset-4 hover:underline dark:text-primary-300",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-5 h-[3.25rem]",
        xl: "h-14 px-9 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
        "icon-sm": "size-9 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

/** Link styled as a button — used for navigation CTAs. */
export interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
