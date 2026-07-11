"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompare } from "@/hooks/use-collection";
import { cn } from "@/lib/utils";

interface CompareButtonProps {
  id: string;
  className?: string;
}

/** Toggle a package into the compare tray (max 4). */
export function CompareButton({ id, className }: CompareButtonProps) {
  const { has, toggle } = useCompare();
  const active = has(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from compare" : "Add to compare"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-soft backdrop-blur transition-all hover:bg-white active:scale-90 dark:bg-slate-900/80 dark:text-white",
        active && "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-600",
        className,
      )}
    >
      <GitCompareArrows className="size-[18px]" />
    </button>
  );
}
