import { testimonials, reviewSources } from "@/data/reviews";
import { ReviewCard } from "@/components/cards/review-card";
import { CarouselRail } from "@/components/common/carousel-rail";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Rating } from "@/components/ui/rating";
import type { Review } from "@/types";

/** Testimonials rail + aggregate rating sources (Google/TripAdvisor/etc). */
export function Testimonials() {
  // Adapt testimonials to the ReviewCard shape.
  const asReviews: Review[] = testimonials.map((t, i) => ({
    id: t.id,
    author: t.name,
    avatar: t.avatar,
    location: t.location,
    rating: t.rating,
    date: new Date(2026, 5, 1 - i).toISOString(),
    title: t.trip,
    content: t.quote,
    source: "TravelX",
    verified: true,
    helpfulCount: 0,
    tripType: t.role,
  }));

  return (
    <section className="section bg-muted/40">
      <div className="container">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Loved by Travellers"
            title="Don't just take our word for it"
            description="Real stories from real travellers across the globe."
          />
        </Reveal>

        {/* Aggregate rating sources */}
        <Reveal className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {reviewSources.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft">
              <p className="font-heading text-sm font-semibold text-muted-foreground">{s.name}</p>
              <p className="mt-1 font-heading text-3xl font-bold text-primary-700 dark:text-primary-300">{s.rating}</p>
              <Rating value={s.rating} showValue={false} size="sm" className="mt-1 justify-center" />
              <p className="mt-1 text-xs text-muted-foreground">{s.count.toLocaleString()} reviews</p>
            </div>
          ))}
        </Reveal>

        <CarouselRail>
          {asReviews.map((r) => (
            <ReviewCard key={r.id} review={r} className="h-full" />
          ))}
        </CarouselRail>
      </div>
    </section>
  );
}
