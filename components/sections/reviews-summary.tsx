import { Star } from "lucide-react";
import type { Review } from "@/types";
import { ReviewCard } from "@/components/cards/review-card";
import { Rating } from "@/components/ui/rating";
import { formatRating } from "@/lib/format";

/** Aggregate rating breakdown + a grid of review cards. */
export function ReviewsSummary({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div>
      <div className="grid gap-8 rounded-3xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        <div className="text-center">
          <p className="font-heading text-5xl font-bold text-primary-700 dark:text-primary-300">{formatRating(avg)}</p>
          <Rating value={avg} showValue={false} className="mt-2 justify-center" />
          <p className="mt-1 text-sm text-muted-foreground">{reviews.length} reviews</p>
        </div>
        <div className="space-y-1.5">
          {dist.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-sm">
              <span className="inline-flex w-8 items-center gap-0.5 text-muted-foreground">{d.star} <Star className="size-3.5 fill-accent-500 text-accent-500" /></span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent-500" style={{ width: `${(d.count / reviews.length) * 100}%` }} />
              </div>
              <span className="w-8 text-right text-muted-foreground">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {reviews.slice(0, 6).map((r) => <ReviewCard key={r.id} review={r} />)}
      </div>
    </div>
  );
}
