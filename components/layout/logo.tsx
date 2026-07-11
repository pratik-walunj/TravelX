import Link from "next/link";
import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/constants/site";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="relative inline-flex size-9 items-center justify-center rounded-xl bg-hero-gradient bg-[length:200%_200%] text-white shadow-soft transition-transform duration-300 group-hover:scale-105 group-hover:animate-gradient-pan">
        <Plane className="size-5 -rotate-45" />
      </span>
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-tight",
          inverted ? "text-white" : "text-foreground",
        )}
      >
        Travel<span className="text-secondary-500">X</span>
      </span>
    </Link>
  );
}
