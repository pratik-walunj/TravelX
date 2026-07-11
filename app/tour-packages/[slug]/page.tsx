import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Clock, Users, Mountain, Check, X, Star, CalendarDays,
  Plane, BedDouble, Download, ShieldCheck,
} from "lucide-react";
import { packages, getPackageBySlug, relatedPackages } from "@/data/packages";
import { getReviewsForPackage } from "@/data/reviews";
import { getDestinationBySlug } from "@/data/destinations";
import { faqs } from "@/data/faqs";
import { siteConfig, whatsappLink } from "@/constants/site";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { GalleryGrid } from "@/components/common/gallery-grid";
import { BookingSidebar } from "@/features/packages/booking-sidebar";
import { ItineraryTimeline } from "@/components/sections/itinerary-timeline";
import { ReviewsSummary } from "@/components/sections/reviews-summary";
import { RelatedTours } from "@/components/sections/related-tours";
import { LocationMap } from "@/components/common/location-map";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ShareButton } from "@/components/common/share-button";
import { CompareButton } from "@/components/common/compare-button";
import { JsonLd, productSchema, breadcrumbSchema } from "@/components/common/json-ld";
import { formatDuration, formatCurrency } from "@/lib/format";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};
  return {
    title: pkg.title,
    description: pkg.summary,
    alternates: { canonical: `/tour-packages/${pkg.slug}` },
    openGraph: { title: pkg.title, description: pkg.summary, images: [pkg.image] },
  };
}

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "inclusions", label: "Inclusions" },
  { id: "hotels", label: "Hotels" },
  { id: "map", label: "Map" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const reviews = getReviewsForPackage(slug);
  const destination = getDestinationBySlug(pkg.destinationSlug);
  const related = relatedPackages(pkg, 4);
  const pkgFaqs = faqs.filter((f) => ["Booking", "On Trip", "Payments"].includes(f.category)).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          productSchema({ name: pkg.title, description: pkg.summary, image: pkg.image, price: pkg.price, rating: pkg.rating, reviewCount: pkg.reviewCount, url: `/tour-packages/${pkg.slug}` }),
          breadcrumbSchema([{ name: "Tours", url: "/tour-packages" }, { name: pkg.title, url: `/tour-packages/${pkg.slug}` }]),
        ]}
      />

      <div className="container pt-24 lg:pt-28">
        <Breadcrumb items={[{ label: "Tours", href: "/tour-packages" }, { label: pkg.destination, href: `/destinations/${pkg.destinationSlug}` }, { label: pkg.title }]} className="mb-4" />

        {/* Title bar */}
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {pkg.bestseller && <Badge variant="danger">Bestseller</Badge>}
              <Badge variant="secondary" className="capitalize">{pkg.category}</Badge>
              <Badge variant="muted" className="capitalize">{pkg.type}</Badge>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{pkg.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-secondary-500" /> {pkg.destination}, {pkg.country}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-secondary-500" /> {formatDuration(pkg.durationDays, pkg.durationNights)}</span>
              <Rating value={pkg.rating} count={pkg.reviewCount} size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton title={pkg.title} />
            <div className="[&>button]:!size-10"><CompareButton id={pkg.id} className="!size-10" /></div>
            <a
              href={whatsappLink(`Hi TravelX! Please send me the brochure for "${pkg.title}".`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <Download className="size-4" /> Brochure
            </a>
          </div>
        </div>

        <GalleryGrid images={pkg.gallery} alt={pkg.title} />
      </div>

      {/* Sticky section nav */}
      <div className="sticky top-16 z-30 mt-8 border-y border-border bg-background/90 backdrop-blur lg:top-[72px]">
        <div className="container flex gap-1 overflow-x-auto no-scrollbar py-1">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main content */}
          <div className="min-w-0 space-y-14">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <QuickFact icon={<Clock className="size-5" />} label="Duration" value={`${pkg.durationDays}D / ${pkg.durationNights}N`} />
                <QuickFact icon={<Users className="size-5" />} label="Group size" value={`${pkg.groupSize.min}–${pkg.groupSize.max}`} />
                <QuickFact icon={<Mountain className="size-5" />} label="Difficulty" value={pkg.difficulty} />
                <QuickFact icon={<Plane className="size-5" />} label="From" value={pkg.departureCities[0]} />
              </div>
              <h2 className="heading-lg text-2xl">Overview</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{pkg.description}</p>
              <h3 className="mt-6 font-heading text-lg font-semibold">Trip highlights</h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm">
                    <Star className="mt-0.5 size-4 shrink-0 fill-accent-500 text-accent-500" /> {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-32">
              <h2 className="heading-lg text-2xl">Day-wise itinerary</h2>
              <p className="mb-6 mt-2 text-sm text-muted-foreground">A carefully paced plan — expand each day for details.</p>
              <ItineraryTimeline days={pkg.itinerary} />
            </section>

            {/* Inclusions / Exclusions */}
            <section id="inclusions" className="scroll-mt-32">
              <h2 className="heading-lg text-2xl">What&apos;s included</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-heading font-semibold text-success"><Check className="size-5" /> Included</h3>
                  <ul className="space-y-2.5">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-heading font-semibold text-danger"><X className="size-5" /> Not included</h3>
                  <ul className="space-y-2.5">
                    {pkg.exclusions.map((exc) => (
                      <li key={exc} className="flex items-start gap-2.5 text-sm text-muted-foreground"><X className="mt-0.5 size-4 shrink-0 text-danger" /> {exc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Hotels */}
            <section id="hotels" className="scroll-mt-32">
              <h2 className="heading-lg text-2xl">Where you&apos;ll stay</h2>
              <div className="mt-5 space-y-3">
                {pkg.hotels.map((h) => (
                  <div key={h.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-600/10 text-primary-600 dark:text-primary-300"><BedDouble className="size-5" /></span>
                      <div>
                        <p className="font-semibold">{h.name}</p>
                        <div className="flex items-center gap-1">{Array.from({ length: h.rating }).map((_, i) => <Star key={i} className="size-3.5 fill-accent-500 text-accent-500" />)}</div>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{h.nights} {h.nights === 1 ? "night" : "nights"}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Map */}
            {destination && (
              <section id="map" className="scroll-mt-32">
                <h2 className="heading-lg text-2xl">Location</h2>
                <p className="mb-5 mt-2 text-sm text-muted-foreground">Explore {pkg.destination} and its surroundings.</p>
                <LocationMap coordinates={destination.coordinates} name={pkg.destination} />
              </section>
            )}

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-32">
              <h2 className="heading-lg mb-5 text-2xl">Traveller reviews</h2>
              <ReviewsSummary reviews={reviews} />
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32">
              <h2 className="heading-lg mb-5 text-2xl">Frequently asked questions</h2>
              <Accordion items={pkgFaqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
            </section>

            {/* Departure cities */}
            <div className="rounded-3xl border border-border bg-muted/40 p-6">
              <h3 className="flex items-center gap-2 font-heading font-semibold"><CalendarDays className="size-5 text-secondary-500" /> Available departures from</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {pkg.departureCities.map((c) => <Badge key={c} variant="outline">{c}</Badge>)}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <BookingSidebar pkg={pkg} />
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
              <ShieldCheck className="size-8 shrink-0 text-secondary-500" />
              <p className="text-muted-foreground">Need help? Call <a href={siteConfig.phoneHref} className="font-semibold text-foreground">{siteConfig.phone}</a> or chat with an expert.</p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTours packages={related} />

      {/* Mobile sticky book bar */}
      <div className="sticky bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
        <div className="container flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-heading text-lg font-bold text-primary-700 dark:text-primary-300">{formatCurrency(pkg.price)}</p>
          </div>
          <Link href={`/booking?pkg=${pkg.slug}`} className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-primary-600 px-6 font-semibold text-white sm:flex-none">
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}

function QuickFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <span className="mx-auto mb-1.5 inline-flex text-secondary-500">{icon}</span>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading text-sm font-semibold">{value}</p>
    </div>
  );
}
