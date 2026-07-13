import type { Offer } from "@/types";
import { travelImages } from "./images";
import offersJson from "./cms/offers.json";

/**
 * Promotional offers — sourced from the CMS (content/offers/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const offers = offersJson as unknown as Offer[];

/** Instagram gallery mock feed (not CMS-managed). */
export const instagramFeed = travelImages.slice(0, 12).map((img, i) => ({
  id: `ig-${i + 1}`,
  image: img,
  likes: 1200 + i * 137,
  href: "https://instagram.com",
}));

/** Recent-booking notification pool (social proof popups, not CMS-managed). */
export const recentBookings = [
  { name: "Aarav from Mumbai", pkg: "Maldives Luxury Signature", time: "2 minutes ago" },
  { name: "Priya from Kochi", pkg: "Switzerland Grand Indulgence", time: "6 minutes ago" },
  { name: "Rohan from Delhi", pkg: "Bali Honeymoon Romance", time: "11 minutes ago" },
  { name: "Sneha from Hyderabad", pkg: "Ladakh Adventure Trail", time: "18 minutes ago" },
  { name: "Vikram from Jaipur", pkg: "Dubai Family Delight", time: "25 minutes ago" },
  { name: "Ananya from Chennai", pkg: "Kerala Weekend Escape", time: "34 minutes ago" },
  { name: "Karan from Pune", pkg: "Thailand Beach Bliss", time: "42 minutes ago" },
];
