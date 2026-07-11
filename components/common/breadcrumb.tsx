import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className, light }: { items: Crumb[]; className?: string; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-sm", light ? "text-white/80" : "text-muted-foreground")}>
        <li>
          <Link href="/" className="inline-flex items-center gap-1 hover:underline" aria-label="Home">
            <Home className="size-4" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="size-4 opacity-60" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:underline">{item.label}</Link>
            ) : (
              <span className={cn("font-medium", light ? "text-white" : "text-foreground")} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
