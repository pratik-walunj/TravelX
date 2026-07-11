"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-collection";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  id: string;
  className?: string;
  variant?: "floating" | "inline";
}

/** Toggle wishlist membership for a package/destination id. */
export function WishlistButton({ id, className, variant = "floating" }: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const active = has(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all active:scale-90",
        variant === "floating"
          ? "size-9 bg-white/90 text-primary-700 shadow-soft backdrop-blur hover:bg-white dark:bg-slate-900/80 dark:text-white"
          : "size-10 border border-border hover:bg-muted",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-[18px] transition-colors",
          active ? "fill-danger text-danger" : "text-current",
        )}
      />
    </button>
  );
}
