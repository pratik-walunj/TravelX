import type { ItineraryDay, TourCategory, TourPackage } from "@/types";
import { destinations } from "./destinations";
import { rng, between, round2, sample, slugify } from "./seed";
import { travelImages } from "./images";

const categories: TourCategory[] = [
  "luxury", "adventure", "family", "honeymoon", "pilgrimage", "weekend",
  "group", "corporate", "wildlife", "beach", "cultural", "cruise",
];

const categoryTitle: Record<TourCategory, string[]> = {
  luxury: ["Luxury Signature", "Grand Indulgence", "Opulent Escape"],
  adventure: ["Adventure Trail", "Wild Expedition", "Thrill Circuit"],
  family: ["Family Delight", "Family Fun Getaway", "Happy Families"],
  honeymoon: ["Honeymoon Romance", "Romantic Retreat", "Just The Two of Us"],
  pilgrimage: ["Sacred Sojourn", "Divine Darshan", "Spiritual Trail"],
  weekend: ["Weekend Escape", "Quick Getaway", "Short Break"],
  group: ["Group Departure", "Great Group Tour", "Fixed Departure"],
  corporate: ["Corporate Offsite", "Incentive Retreat", "MICE Special"],
  wildlife: ["Wildlife Safari", "Jungle Trail", "Big Game Safari"],
  beach: ["Beach Bliss", "Coastal Escape", "Island Hopper"],
  cultural: ["Cultural Heritage", "Timeless Trail", "Heritage Discovery"],
  cruise: ["Cruise Voyage", "Ocean Escape", "Luxury Cruise"],
};

const meals = ["Breakfast", "Lunch", "Dinner"] as const;

const inclusionPool = [
  "Return economy airfare", "Handpicked 4★/5★ accommodation", "Daily breakfast & select meals",
  "Private air-conditioned transfers", "Expert local English-speaking guide",
  "All sightseeing per itinerary", "Airport pick-up & drop", "Applicable taxes & service charges",
  "24/7 on-trip TravelX concierge", "Welcome drink on arrival", "Entrance fees to monuments",
  "Complimentary travel kit",
];
const exclusionPool = [
  "Visa & travel insurance fees", "Personal expenses & tips", "Anything not mentioned in inclusions",
  "Meals not specified in itinerary", "Optional activities & upgrades", "GST where applicable",
  "Camera / drone permits", "Early check-in / late check-out charges",
];

const hotelNames = [
  "The Grand Meridian", "Azure Bay Resort", "Serenity Palace", "Aurora Retreat",
  "The Regal Court", "Emerald Sands", "Highland Vista", "Lagoon Pearl Resort",
  "Heritage Haveli", "Skyline Boutique", "Coral Reef Villas", "Mountain Echo Lodge",
];

function buildItinerary(days: number, dest: string, r: () => number): ItineraryDay[] {
  const templates = [
    { t: `Arrival in ${dest}`, d: `Arrive in ${dest}, meet your TravelX host for a private transfer to the hotel. Freshen up and enjoy a relaxed evening at leisure with a welcome briefing.` },
    { t: `${dest} city highlights`, d: `A full day of iconic sightseeing with your local guide — landmark monuments, viewpoints and hidden gems, with time for photos and local cuisine.` },
    { t: `Nature & scenic escape`, d: `Head out to the scenic countryside for panoramic landscapes, an outdoor experience and a memorable local lunch amid nature.` },
    { t: `Culture & leisure day`, d: `Immerse in local culture — markets, artisans and heritage — followed by free time to shop, relax or add an optional experience.` },
    { t: `Signature experience`, d: `The trip's showcase day: a curated flagship experience unique to ${dest}, designed to be the highlight of your journey.` },
    { t: `Adventure & activities`, d: `An action-packed day of activities and adventure suited to your pace, with all equipment and safety handled by our partners.` },
    { t: `At leisure / optional tours`, d: `A flexible day to unwind by the pool, indulge in a spa, or choose from a menu of optional excursions.` },
    { t: `Departure from ${dest}`, d: `After breakfast and some last-minute souvenir shopping, transfer to the airport for your onward journey with TravelX memories to keep.` },
  ];
  return Array.from({ length: days }, (_, i) => {
    const tpl = i === 0 ? templates[0] : i === days - 1 ? templates[7] : templates[1 + ((i + Math.floor(r() * 5)) % 6)];
    return {
      day: i + 1,
      title: tpl.t,
      description: tpl.d,
      meals: i === 0 ? ["Dinner"] : i === days - 1 ? ["Breakfast"] : sample([...meals], between(r(), 1, 3), r) as ItineraryDay["meals"],
      stay: i === days - 1 ? undefined : hotelNames[Math.floor(r() * hotelNames.length)],
      activities: ["Guided sightseeing", "Local cuisine", "Photo stops"].slice(0, between(r(), 2, 3)),
    };
  });
}

const departureCities = ["Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];

/** 100 fully-generated tour packages spread across destinations & categories. */
export const packages: TourPackage[] = Array.from({ length: 100 }, (_, i) => {
  const r = rng(5000 + i);
  const dest = destinations[i % destinations.length];
  const category = categories[i % categories.length];
  const nights = dest.type === "domestic" ? between(r(), 2, 8) : between(r(), 4, 11);
  const days = nights + 1;
  const titleBase = categoryTitle[category][i % 3];
  const title = `${dest.name} ${titleBase}`;
  const oldPrice = between(r(), dest.type === "domestic" ? 14999 : 49999, dest.type === "domestic" ? 79999 : 289999);
  const price = Math.round(oldPrice * (0.7 + r() * 0.18));
  const rating = round2(4.2 + r() * 0.7);
  const gallery = Array.from({ length: 6 }, (_, g) => travelImages[(i * 2 + g) % travelImages.length]);
  const hotels = Array.from({ length: Math.min(3, Math.max(1, Math.ceil(nights / 3))) }, (_, h) => ({
    name: hotelNames[(i + h) % hotelNames.length],
    rating: between(r(), 4, 5),
    nights: Math.ceil(nights / Math.min(3, Math.max(1, Math.ceil(nights / 3)))),
  }));

  return {
    id: `pkg-${i + 1}`,
    slug: slugify(`${title}-${i + 1}`),
    title,
    destinationSlug: dest.slug,
    destination: dest.name,
    country: dest.country,
    type: dest.type,
    category,
    summary: `${days} days of ${category} travel through ${dest.name} — ${dest.tagline.toLowerCase()}.`,
    description: `Discover ${dest.name} on this ${days}-day ${category} journey crafted by TravelX. ${dest.description} This itinerary balances must-see highlights with authentic local experiences and generous downtime, all backed by our 24/7 concierge and best-price promise.`,
    image: dest.gallery[i % dest.gallery.length] ?? dest.image,
    gallery,
    durationDays: days,
    durationNights: nights,
    price,
    oldPrice,
    currency: "INR",
    rating,
    reviewCount: between(r(), 40, 860),
    groupSize: { min: 2, max: between(r(), 10, 28) },
    difficulty: (["Easy", "Moderate", "Challenging"] as const)[between(r(), 0, 2)],
    highlights: sample(dest.highlights.concat(dest.activities), 4, r),
    inclusions: sample(inclusionPool, between(r(), 7, 10), r),
    exclusions: sample(exclusionPool, between(r(), 4, 6), r),
    itinerary: buildItinerary(days, dest.name, r),
    hotels,
    departureCities: sample(departureCities, between(r(), 3, 6), r),
    availableDates: Array.from({ length: 6 }, (_, m) => {
      const month = ((i + m * 2) % 12) + 1;
      const day = between(rng(i * 10 + m)(), 3, 26);
      return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }),
    seatsLeft: between(r(), 2, 18),
    featured: r() > 0.72,
    trending: r() > 0.7,
    bestseller: r() > 0.8,
    tags: [dest.name, dest.country, category, dest.type],
    themes: sample(["Scenic", "Culture", "Relaxation", "Nature", "Food", "Nightlife", "Wellness", "Photography"], 3, r),
  };
});

export const getPackageBySlug = (slug: string) => packages.find((p) => p.slug === slug);
export const getPackagesByDestination = (destinationSlug: string) =>
  packages.filter((p) => p.destinationSlug === destinationSlug);
export const getPackagesByCategory = (category: TourCategory) =>
  packages.filter((p) => p.category === category);

export const featuredPackages = packages.filter((p) => p.featured).slice(0, 12);
export const trendingPackages = packages.filter((p) => p.trending).slice(0, 12);
export const bestsellerPackages = packages.filter((p) => p.bestseller).slice(0, 12);
export const domesticPackages = packages.filter((p) => p.type === "domestic");
export const internationalPackages = packages.filter((p) => p.type === "international");
export const weekendPackages = packages.filter((p) => p.durationDays <= 3);

export const relatedPackages = (pkg: TourPackage, count = 4) =>
  packages
    .filter((p) => p.id !== pkg.id && (p.destinationSlug === pkg.destinationSlug || p.category === pkg.category))
    .slice(0, count);
