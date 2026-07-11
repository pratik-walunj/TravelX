import type { Offer } from "@/types";
import { travelImages } from "./images";

/** Promotional offers for the deals section & promo strip. */
export const offers: Offer[] = [
  { id: "offer-1", title: "Monsoon Getaway Sale", description: "Flat 25% off on all international holiday packages booked this month.", code: "MONSOON25", discountLabel: "25% OFF", image: travelImages[0], expiresAt: "2026-08-31", badge: "Limited Time" },
  { id: "offer-2", title: "Honeymoon Special", description: "Complimentary candle-light dinner & room upgrade on honeymoon packages.", code: "LOVE2026", discountLabel: "Free Upgrade", image: travelImages[15], expiresAt: "2026-09-30", badge: "Couples" },
  { id: "offer-3", title: "Early Bird Winter", description: "Book winter trips 60 days early and save up to ₹15,000 per couple.", code: "EARLYBIRD", discountLabel: "Save ₹15,000", image: travelImages[9], expiresAt: "2026-10-15", badge: "Early Bird" },
  { id: "offer-4", title: "Group Departure Deal", description: "Groups of 6+ get the 6th traveller free on select fixed departures.", code: "GROUP6", discountLabel: "6th Goes Free", image: travelImages[11], expiresAt: "2026-12-31", badge: "Groups" },
  { id: "offer-5", title: "First Trip Welcome", description: "New to TravelX? Get ₹3,000 off your first booking over ₹40,000.", code: "WELCOME3K", discountLabel: "₹3,000 OFF", image: travelImages[4], expiresAt: "2026-12-31", badge: "New Users" },
  { id: "offer-6", title: "Weekend Flash Deal", description: "48-hour flash sale on weekend getaways — up to 30% off.", code: "FLASH30", discountLabel: "30% OFF", image: travelImages[5], expiresAt: "2026-07-20", badge: "Flash Sale" },
];

/** Instagram gallery mock feed. */
export const instagramFeed = travelImages.slice(0, 12).map((img, i) => ({
  id: `ig-${i + 1}`,
  image: img,
  likes: 1200 + i * 137,
  href: "https://instagram.com",
}));

/** Recent-booking notification pool (social proof popups). */
export const recentBookings = [
  { name: "Aarav from Mumbai", pkg: "Maldives Luxury Signature", time: "2 minutes ago" },
  { name: "Priya from Kochi", pkg: "Switzerland Grand Indulgence", time: "6 minutes ago" },
  { name: "Rohan from Delhi", pkg: "Bali Honeymoon Romance", time: "11 minutes ago" },
  { name: "Sneha from Hyderabad", pkg: "Ladakh Adventure Trail", time: "18 minutes ago" },
  { name: "Vikram from Jaipur", pkg: "Dubai Family Delight", time: "25 minutes ago" },
  { name: "Ananya from Chennai", pkg: "Kerala Weekend Escape", time: "34 minutes ago" },
  { name: "Karan from Pune", pkg: "Thailand Beach Bliss", time: "42 minutes ago" },
];
