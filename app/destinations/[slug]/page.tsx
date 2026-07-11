import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin, Star, CalendarClock, Clock, Sun, Thermometer,
  Compass, Lightbulb, ChevronRight,
} from "lucide-react";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { getReviewsForDestination } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { PageHero } from "@/components/common/page-hero";
import { PackageCard } from "@/components/cards/package-card";
import { ReviewsSummary } from "@/components/sections/reviews-summary";
import { LocationMap } from "@/components/common/location-map";
import { GalleryGrid } from "@/components/common/gallery-grid";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ButtonLink } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd, breadcrumbSchema } from "@/components/common/json-ld";
import { formatCurrency } from "@/lib/format";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) return {};
  return {
    title: `${d.name} Tour Packages — ${d.tagline}`,
    description: d.description.slice(0, 155),
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: `${d.name} — TravelX`, description: d.tagline, images: [d.image] },
  };
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestinationBySlug(slug);
  if (!d) notFound();

  const pkgs = getPackagesByDestination(slug);
  const reviews = getReviewsForDestination(slug);
  const nearby = destinations.filter((x) => x.continent === d.continent && x.id !== d.id).slice(0, 4);
  const destFaqs = faqs.filter((f) => ["General", "On Trip", "Visa & Documents"].includes(f.category)).slice(0, 6);
  const tips = [
    `Best time to visit is ${d.bestTimeToVisit.slice(0, 3).join(", ")}.`,
    `Plan for around ${d.idealDuration} to see the highlights without rushing.`,
    `Carry layers — ${d.name}'s weather can shift between seasons.`,
    "Book popular experiences in advance during peak months.",
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Destinations", url: "/destinations" }, { name: d.name, url: `/destinations/${d.slug}` }])} />

      <PageHero
        eyebrow={d.type === "domestic" ? "Domestic Destination" : "International Destination"}
        title={d.name}
        description={d.tagline}
        image={d.image}
        breadcrumbs={[{ label: "Destinations", href: "/destinations" }, { label: d.name }]}
        size="lg"
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {d.country}, {d.continent}</span>
          <Rating value={d.rating} count={d.reviewCount} size="sm" className="[&_span]:text-white" />
          <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-accent-300 text-accent-300" /> From {formatCurrency(d.startingPrice)}</span>
        </div>
      </PageHero>

      <div className="container section-tight">
        {/* Overview + quick facts */}
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="heading-lg text-2xl">About {d.name}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{d.description}</p>

            <h3 className="mt-8 font-heading text-lg font-semibold">Top things to do</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {d.activities.map((a) => <Badge key={a} variant="outline" className="gap-1"><Compass className="size-3.5 text-secondary-500" /> {a}</Badge>)}
            </div>

            <h3 className="mt-8 font-heading text-lg font-semibold">Must-see highlights</h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm"><Star className="mt-0.5 size-4 shrink-0 fill-accent-500 text-accent-500" /> {h}</li>
              ))}
            </ul>
          </div>

          {/* Info card */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-heading font-semibold">Good to know</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <InfoRow icon={<CalendarClock className="size-4" />} label="Best time" value={d.bestTimeToVisit.slice(0, 4).join(", ")} />
                <InfoRow icon={<Clock className="size-4" />} label="Ideal duration" value={d.idealDuration} />
                <InfoRow icon={<Star className="size-4" />} label="Rating" value={`${d.rating} (${d.reviewCount})`} />
                <InfoRow icon={<MapPin className="size-4" />} label="Packages" value={`${pkgs.length} available`} />
              </ul>
              <ButtonLink href={`/tour-packages?destination=${d.slug}`} variant="primary" className="mt-5 w-full">View all packages</ButtonLink>
            </div>

            {/* Weather */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-heading font-semibold"><Sun className="size-5 text-accent-500" /> Weather</h3>
              <ul className="mt-4 space-y-3">
                {d.weather.map((w) => (
                  <li key={w.season} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{w.season}</p>
                      <p className="text-xs text-muted-foreground">{w.note}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 font-semibold"><Thermometer className="size-4 text-secondary-500" /> {w.temp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Gallery */}
      <div className="container">
        <h2 className="heading-lg mb-6 text-2xl">Gallery</h2>
        <GalleryGrid images={d.gallery} alt={d.name} />
      </div>

      {/* Packages */}
      {pkgs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Curated Trips</span>
                <h2 className="heading-lg mt-3 text-2xl">Tour packages in {d.name}</h2>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkgs.slice(0, 6).map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Map + Tips */}
      <div className="container section-tight grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="heading-lg mb-5 text-2xl">On the map</h2>
          <LocationMap coordinates={d.coordinates} name={d.name} />
        </div>
        <div>
          <h2 className="heading-lg mb-5 text-2xl">Travel tips</h2>
          <ul className="space-y-3">
            {tips.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
                <Lightbulb className="mt-0.5 size-5 shrink-0 text-accent-500" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <div className="container section-tight">
          <h2 className="heading-lg mb-6 text-2xl">What travellers say about {d.name}</h2>
          <ReviewsSummary reviews={reviews} />
        </div>
      )}

      {/* Nearby */}
      {nearby.length > 0 && (
        <div className="container section-tight">
          <h2 className="heading-lg mb-6 text-2xl">Nearby destinations</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {nearby.map((n) => (
              <a key={n.id} href={`/destinations/${n.slug}`} className="group relative flex aspect-video items-end overflow-hidden rounded-2xl p-4 text-white">
                <Image src={n.image} alt={n.name} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="relative inline-flex items-center gap-1 font-heading font-semibold">{n.name} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="container section-tight">
        <h2 className="heading-lg mb-6 text-2xl">FAQs</h2>
        <Accordion items={destFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      </div>

      <CtaBanner />
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-muted-foreground"><span className="text-secondary-500">{icon}</span> {label}</span>
      <span className="text-right font-medium">{value}</span>
    </li>
  );
}
