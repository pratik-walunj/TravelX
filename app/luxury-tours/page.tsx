import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Luxury Tours — Five-Star Escapes & Private Experiences",
  description: "Indulge in five-star stays, private guides and curated experiences with TravelX luxury tour packages.",
  alternates: { canonical: "/luxury-tours" },
};

export default function LuxuryToursPage() {
  return (
    <ToursListing
      eyebrow="Luxury Escapes"
      title="Luxury Tours"
      description="Five-star stays, private transfers and experiences money usually can't buy."
      image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("luxury")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Luxury Tours" }]}
      initialCategory="luxury"
    />
  );
}
