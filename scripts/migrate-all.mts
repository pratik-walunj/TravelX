/**
 * One-time migration: existing generated data -> Keystatic content files.
 * Writes content/<collection>/<slug>/index.yaml for every entry.
 * Idempotent: clears each content dir before writing.
 * Run: npx tsx scripts/migrate-all.mts
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { blogPosts } from "../data/blogs";
import { packages } from "../data/packages";
import { destinations } from "../data/destinations";
import { reviews } from "../data/reviews";
import { faqs } from "../data/faqs";
import { offers } from "../data/offers";

const ROOT = process.cwd();
const toDate = (iso: string) => new Date(iso).toISOString().slice(0, 10);
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function writeCollection<T>(name: string, items: T[], slugOf: (item: T) => string, dataOf: (item: T) => Record<string, unknown>) {
  const dir = join(ROOT, "content", name);
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const item of items) {
    const entryDir = join(dir, slugOf(item));
    mkdirSync(entryDir, { recursive: true });
    writeFileSync(join(entryDir, "index.yaml"), yaml.dump(dataOf(item), { lineWidth: -1 }), "utf8");
  }
  console.log(`  ${name}: ${items.length}`);
}

console.log("Migrating content -> Keystatic files:");

writeCollection("blog", blogPosts, (p) => p.slug, (p) => ({
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  cover: p.cover,
  publishedAt: toDate(p.publishedAt),
  readingMinutes: p.readingMinutes,
  featured: p.featured,
  authorName: p.author.name,
  authorRole: p.author.role,
  authorAvatar: p.author.avatar,
  tags: p.tags,
  body: p.content,
}));

writeCollection("packages", packages, (p) => p.slug, (p) => ({
  title: p.title,
  destination: p.destination,
  destinationSlug: p.destinationSlug,
  country: p.country,
  type: p.type,
  category: p.category,
  summary: p.summary,
  description: p.description,
  image: p.image,
  gallery: p.gallery,
  durationDays: p.durationDays,
  durationNights: p.durationNights,
  price: p.price,
  oldPrice: p.oldPrice,
  currency: p.currency,
  rating: String(p.rating),
  reviewCount: p.reviewCount,
  groupSizeMin: p.groupSize.min,
  groupSizeMax: p.groupSize.max,
  difficulty: p.difficulty,
  seatsLeft: p.seatsLeft,
  featured: p.featured,
  trending: p.trending,
  bestseller: p.bestseller,
  highlights: p.highlights,
  inclusions: p.inclusions,
  exclusions: p.exclusions,
  tags: p.tags,
  themes: p.themes,
  departureCities: p.departureCities,
  availableDates: p.availableDates.map(toDate),
  hotels: p.hotels,
  itinerary: p.itinerary.map((d) => ({
    day: d.day,
    title: d.title,
    description: d.description,
    stay: d.stay ?? "",
    meals: d.meals,
    activities: d.activities,
  })),
}));

writeCollection("destinations", destinations, (d) => d.slug, (d) => ({
  name: d.name,
  country: d.country,
  continent: d.continent,
  type: d.type,
  tagline: d.tagline,
  description: d.description,
  image: d.image,
  gallery: d.gallery,
  lat: String(d.coordinates.lat),
  lng: String(d.coordinates.lng),
  rating: String(d.rating),
  reviewCount: d.reviewCount,
  packageCount: d.packageCount,
  startingPrice: d.startingPrice,
  idealDuration: d.idealDuration,
  trending: d.trending,
  featured: d.featured,
  bestTimeToVisit: d.bestTimeToVisit,
  activities: d.activities,
  highlights: d.highlights,
  tags: d.tags,
  weather: d.weather,
}));

writeCollection("reviews", reviews, (r) => slugify(r.id), (r) => ({
  title: r.title,
  author: r.author,
  avatar: r.avatar,
  location: r.location,
  rating: String(r.rating),
  date: toDate(r.date),
  content: r.content,
  source: r.source,
  packageSlug: r.packageSlug ?? "",
  destinationSlug: r.destinationSlug ?? "",
  tripType: r.tripType ?? "",
  verified: r.verified,
  helpfulCount: r.helpfulCount,
}));

writeCollection("faqs", faqs, (f) => slugify(f.id), (f) => ({
  question: f.question,
  answer: f.answer,
  category: f.category,
}));

writeCollection("offers", offers, (o) => slugify(o.id), (o) => ({
  title: o.title,
  description: o.description,
  code: o.code,
  discountLabel: o.discountLabel,
  image: o.image,
  expiresAt: toDate(o.expiresAt),
  badge: o.badge,
}));

console.log("Done.");
