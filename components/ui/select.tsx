import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

/**
 * Native select styled to match the design system — accessible by default and
 * zero-JS. For richer combobox behaviour, swap internals later without changing
 * the public API.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div className="relative flex items-center">
      {icon && (
        <span className="pointer-events-none absolute left-3.5 text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
      )}
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-xl border border-input bg-background py-2 pr-10 text-sm shadow-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
          icon ? "pl-10" : "pl-3.5",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-muted-foreground" />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
