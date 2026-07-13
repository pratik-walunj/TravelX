/**
 * CMS sync: read Keystatic content files (the editable source of truth) and
 * generate typed JSON under data/.cms/ that the app consumes.
 *
 * Runs automatically before dev/build (see package.json predev/prebuild), and
 * manually via `npm run cms:sync` after editing content at /keystatic.
 *
 * Content edited in /keystatic -> content/*  ->  (this script)  ->  data/.cms/*.json
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createReader } from "@keystatic/core/reader";
import cfgMod from "../keystatic.config";

const cfg = (cfgMod as any).default ?? cfgMod;
const reader = createReader(process.cwd(), cfg);
const OUT = join(process.cwd(), "data", "cms");
mkdirSync(OUT, { recursive: true });

const num = (v: unknown, fallback = 0) => {
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
};
const write = (name: string, data: unknown) =>
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(data, null, 2), "utf8");

async function main() {
  // Blog
  const posts = await reader.collections.posts.all();
  write(
    "blogs",
    posts
      .map((e) => ({
        id: e.slug,
        slug: e.slug,
        title: e.entry.title,
        excerpt: e.entry.excerpt,
        content: e.entry.body ?? "",
        cover: e.entry.cover,
        category: e.entry.category,
        tags: [...(e.entry.tags ?? [])],
        author: { name: e.entry.authorName, avatar: e.entry.authorAvatar, role: e.entry.authorRole },
        publishedAt: e.entry.publishedAt ?? "",
        readingMinutes: e.entry.readingMinutes ?? 5,
        featured: e.entry.featured ?? false,
      }))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
  );

  // Packages
  const packages = await reader.collections.packages.all();
  write(
    "packages",
    packages.map((e) => {
      const p = e.entry;
      return {
        id: e.slug,
        slug: e.slug,
        title: p.title,
        destinationSlug: p.destinationSlug,
        destination: p.destination,
        country: p.country,
        type: p.type,
        category: p.category,
        summary: p.summary,
        description: p.description,
        image: p.image,
        gallery: [...(p.gallery ?? [])],
        durationDays: p.durationDays,
        durationNights: p.durationNights,
        price: p.price,
        oldPrice: p.oldPrice,
        currency: p.currency,
        rating: num(p.rating, 4.5),
        reviewCount: p.reviewCount,
        groupSize: { min: p.groupSizeMin, max: p.groupSizeMax },
        difficulty: p.difficulty,
        highlights: [...(p.highlights ?? [])],
        inclusions: [...(p.inclusions ?? [])],
        exclusions: [...(p.exclusions ?? [])],
        itinerary: (p.itinerary ?? []).map((d: any) => ({
          day: d.day,
          title: d.title,
          description: d.description,
          meals: [...(d.meals ?? [])],
          stay: d.stay || undefined,
          activities: [...(d.activities ?? [])],
        })),
        hotels: (p.hotels ?? []).map((h: any) => ({ name: h.name, rating: h.rating, nights: h.nights })),
        departureCities: [...(p.departureCities ?? [])],
        availableDates: [...(p.availableDates ?? [])],
        seatsLeft: p.seatsLeft,
        featured: p.featured,
        trending: p.trending,
        bestseller: p.bestseller,
        tags: [...(p.tags ?? [])],
        themes: [...(p.themes ?? [])],
      };
    }),
  );

  // Destinations
  const destinations = await reader.collections.destinations.all();
  write(
    "destinations",
    destinations.map((e) => {
      const d = e.entry;
      return {
        id: e.slug,
        slug: e.slug,
        name: d.name,
        country: d.country,
        continent: d.continent,
        type: d.type,
        tagline: d.tagline,
        description: d.description,
        image: d.image,
        gallery: [...(d.gallery ?? [])],
        coordinates: { lat: num(d.lat), lng: num(d.lng) },
        rating: num(d.rating, 4.5),
        reviewCount: d.reviewCount,
        packageCount: d.packageCount,
        startingPrice: d.startingPrice,
        bestTimeToVisit: [...(d.bestTimeToVisit ?? [])],
        idealDuration: d.idealDuration,
        weather: (d.weather ?? []).map((w: any) => ({ season: w.season, temp: w.temp, note: w.note })),
        activities: [...(d.activities ?? [])],
        highlights: [...(d.highlights ?? [])],
        trending: d.trending,
        featured: d.featured,
        tags: [...(d.tags ?? [])],
      };
    }),
  );

  // Reviews
  const reviews = await reader.collections.reviews.all();
  write(
    "reviews",
    reviews.map((e) => {
      const r = e.entry;
      return {
        id: e.slug,
        author: r.author,
        avatar: r.avatar,
        location: r.location,
        rating: num(r.rating, 5),
        date: r.date ?? "",
        title: r.title,
        content: r.content,
        source: r.source,
        packageSlug: r.packageSlug || undefined,
        destinationSlug: r.destinationSlug || undefined,
        verified: r.verified,
        helpfulCount: r.helpfulCount,
        tripType: r.tripType || undefined,
      };
    }),
  );

  // FAQs
  const faqs = await reader.collections.faqs.all();
  write(
    "faqs",
    faqs.map((e) => ({ id: e.slug, question: e.entry.question, answer: e.entry.answer, category: e.entry.category })),
  );

  // Offers
  const offers = await reader.collections.offers.all();
  write(
    "offers",
    offers.map((e) => {
      const o = e.entry;
      return {
        id: e.slug,
        title: o.title,
        description: o.description,
        code: o.code,
        discountLabel: o.discountLabel,
        image: o.image,
        expiresAt: o.expiresAt ?? "",
        badge: o.badge,
      };
    }),
  );

  console.log(
    `CMS sync -> data/cms/  (blogs ${posts.length}, packages ${packages.length}, destinations ${destinations.length}, reviews ${reviews.length}, faqs ${faqs.length}, offers ${offers.length})`,
  );
}

main().catch((e) => {
  console.error("CMS sync failed:", e);
  process.exit(1);
});
