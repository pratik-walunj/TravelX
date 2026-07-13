import type { Destination } from "@/types";
import destinationsJson from "./cms/destinations.json";

/**
 * Destinations — sourced from the CMS (content/destinations/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const destinations = destinationsJson as unknown as Destination[];

export const getDestinationBySlug = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const featuredDestinations = destinations.filter((d) => d.featured);
export const trendingDestinations = destinations.filter((d) => d.trending);
export const domesticDestinations = destinations.filter((d) => d.type === "domestic");
export const internationalDestinations = destinations.filter((d) => d.type === "international");
