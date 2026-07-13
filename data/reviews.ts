import type { Review, Testimonial } from "@/types";
import { packages } from "./packages";
import { rng, pick } from "./seed";
import { avatars } from "./images";
import reviewsJson from "./cms/reviews.json";

/**
 * Reviews — sourced from the CMS (content/reviews/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const reviews = reviewsJson as unknown as Review[];

export const getReviewsForPackage = (slug: string) =>
  reviews.filter((rv) => rv.packageSlug === slug);
export const getReviewsForDestination = (slug: string) =>
  reviews.filter((rv) => rv.destinationSlug === slug);

// Author names + testimonial bodies used to synthesise the curated homepage
// testimonials below (these are marketing highlights, not CMS-managed reviews).
const authors = [
  ["Aarav Sharma", "Mumbai, India"], ["Priya Nair", "Kochi, India"], ["Rohan Mehta", "Delhi, India"],
  ["Sneha Reddy", "Hyderabad, India"], ["Vikram Singh", "Jaipur, India"], ["Ananya Iyer", "Chennai, India"],
  ["Karan Kapoor", "Pune, India"], ["Meera Joshi", "Ahmedabad, India"], ["Arjun Das", "Kolkata, India"],
];
const bodies = [
  "From the first enquiry to the final drop-off, everything was handled with incredible care. Our guide was knowledgeable, the hotels were stunning, and the pacing was just right. We never had to worry about a thing.",
  "TravelX planned every detail beautifully. The private transfers, the handpicked stays, and the little surprises along the way made this feel truly premium. We're already planning our next trip with them.",
  "The 24/7 support gave us so much peace of mind. When our flight was delayed, the team rearranged our transfer instantly. That level of service is rare and genuinely appreciated.",
  "Great value for a luxury experience. The itinerary balanced sightseeing with downtime perfectly, and the recommendations for local food were spot on. Five stars without hesitation.",
  "We travelled as a group of ten and TravelX made the logistics effortless. Everyone had a wonderful time and the memories will last forever. Thank you for an unforgettable holiday.",
  "Booking was simple, the pricing was transparent, and there were no hidden surprises. The team was responsive on WhatsApp and answered all our questions quickly. Truly professional.",
];

/** Curated homepage testimonials (not CMS-managed). */
export const testimonials: Testimonial[] = Array.from({ length: 9 }, (_, i) => {
  const r = rng(3300 + i);
  const [name, location] = authors[i % authors.length];
  return {
    id: `tst-${i + 1}`,
    name,
    avatar: avatars[i % avatars.length],
    role: pick(["Verified Traveller", "TravelX Elite Member", "Repeat Guest"], r()),
    location,
    rating: 5,
    quote: pick(bodies, r()),
    trip: packages[(i * 7) % packages.length]?.title ?? "TravelX Tour",
  };
});

/** Aggregate review sources for social-proof widgets. */
export const reviewSources = [
  { name: "Google", rating: 4.9, count: 3820, logo: "google" },
  { name: "TripAdvisor", rating: 4.8, count: 2140, logo: "tripadvisor" },
  { name: "Facebook", rating: 4.9, count: 1560, logo: "facebook" },
  { name: "Trustpilot", rating: 4.7, count: 980, logo: "trustpilot" },
];
