import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Pilgrimage Tours — Sacred & Spiritual Journeys",
  description: "Char Dham, temple trails and spiritual journeys arranged with care. Explore TravelX pilgrimage tour packages.",
  alternates: { canonical: "/pilgrimage-tours" },
};

export default function PilgrimageToursPage() {
  return (
    <ToursListing
      eyebrow="Spiritual Journeys"
      title="Pilgrimage Tours"
      description="Sacred journeys arranged with devotion and care — comfortable travel, trusted guides, peace of mind."
      image="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("pilgrimage")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Pilgrimage Tours" }]}
      initialCategory="pilgrimage"
    />
  );
}
