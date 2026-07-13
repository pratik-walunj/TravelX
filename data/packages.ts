import type { TourCategory, TourPackage } from "@/types";
import packagesJson from "./cms/packages.json";

/**
 * Tour packages — sourced from the CMS (content/packages/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const packages = packagesJson as unknown as TourPackage[];

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
