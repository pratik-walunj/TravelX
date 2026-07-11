import type { Metadata } from "next";
import type { TourCategory, TripType } from "@/types";
import { packages } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Tour Packages — Domestic & International Holidays",
  description:
    "Browse 100+ handcrafted tour packages across India and the world. Filter by budget, duration, category and rating to find your perfect trip.",
  alternates: { canonical: "/tour-packages" },
};

export default async function TourPackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; category?: string }>;
}) {
  const params = await searchParams;
  const initialType = (["domestic", "international"].includes(params.type ?? "") ? params.type : "all") as TripType | "all";
  const initialCategory = params.category as TourCategory | undefined;

  return (
    <ToursListing
      eyebrow="All Tours"
      title="Find your perfect tour"
      description="100+ handcrafted journeys across India and the world — filter, compare and book in minutes."
      image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
      packages={packages}
      breadcrumbs={[{ label: "Tour Packages" }]}
      initialType={initialType}
      initialCategory={initialCategory}
    />
  );
}
