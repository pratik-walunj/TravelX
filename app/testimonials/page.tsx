import type { Metadata } from "next";
import { reviews, reviewSources } from "@/data/reviews";
import { PageHero } from "@/components/common/page-hero";
import { ReviewCard } from "@/components/cards/review-card";
import { Rating } from "@/components/ui/rating";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Testimonials — What Our Travellers Say",
  description: "Read genuine reviews and stories from thousands of TravelX travellers across the globe.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Real Stories"
        title="Loved by travellers worldwide"
        description="Don't just take our word for it — here's what thousands of happy travellers have to say."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Testimonials" }]}
      />

      <div className="container section-tight">
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {reviewSources.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
              <p className="text-sm font-semibold text-muted-foreground">{s.name}</p>
              <p className="mt-1 font-heading text-3xl font-bold text-primary-700 dark:text-primary-300">{s.rating}</p>
              <Rating value={s.rating} showValue={false} size="sm" className="mt-1 justify-center" />
              <p className="mt-1 text-xs text-muted-foreground">{s.count.toLocaleString()} reviews</p>
            </div>
          ))}
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {reviews.slice(0, 30).map((r) => (
            <div key={r.id} className="break-inside-avoid">
              <ReviewCard review={r} />
            </div>
          ))}
        </div>
      </div>

      <CtaBanner />
    </>
  );
}
