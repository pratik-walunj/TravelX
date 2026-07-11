import Image from "next/image";
import { BadgeCheck, Quote } from "lucide-react";
import type { Review } from "@/types";
import { Rating } from "@/components/ui/rating";
import { timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";

const sourceColor: Record<Review["source"], string> = {
  Google: "text-[#4285F4]",
  TripAdvisor: "text-[#00AF87]",
  Facebook: "text-[#1877F2]",
  TravelX: "text-primary-600",
};

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-card",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <Rating value={review.rating} showValue={false} size="sm" />
        <Quote className="size-6 text-primary-200 dark:text-primary-900" />
      </div>

      <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{review.content}&rdquo;
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Image
          src={review.avatar}
          alt={review.author}
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold">{review.author}</p>
            {review.verified && <BadgeCheck className="size-4 shrink-0 text-secondary-500" />}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {review.location} · {timeAgo(review.date)}
          </p>
        </div>
        <span className={cn("text-xs font-bold", sourceColor[review.source])}>
          {review.source}
        </span>
      </figcaption>
    </figure>
  );
}
