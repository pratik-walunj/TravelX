import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRating } from "@/lib/format";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

/** Star rating with a fractional-fill last star. */
export function Rating({
  value,
  count,
  size = "md",
  showValue = true,
  className,
}: RatingProps) {
  const full = Math.floor(value);
  const fraction = value - full;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill =
            i < full ? 1 : i === full ? Math.max(0, Math.min(1, fraction)) : 0;
          return (
            <span key={i} className="relative">
              <Star className={cn(sizeMap[size], "text-accent-300/50")} />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  className={cn(sizeMap[size], "fill-accent-500 text-accent-500")}
                />
              </span>
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">
          {formatRating(value)}
        </span>
      )}
      {typeof count === "number" && (
        <span className="text-xs text-muted-foreground">
          ({count.toLocaleString()})
        </span>
      )}
      <span className="sr-only">
        Rated {formatRating(value)} out of 5
        {count ? ` from ${count} reviews` : ""}
      </span>
    </div>
  );
}
