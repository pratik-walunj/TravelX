import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Family Tours — Fun & Safe Holidays for All Ages",
  description: "Stress-free family holidays with kid-friendly stays, activities and pacing. Book TravelX family tour packages.",
  alternates: { canonical: "/family-tours" },
};

export default function FamilyToursPage() {
  return (
    <ToursListing
      eyebrow="For the Whole Family"
      title="Family Tours"
      description="Kid-friendly stays, easy pacing and activities everyone will love — holidays the whole family remembers."
      image="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("family")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Family Tours" }]}
      initialCategory="family"
    />
  );
}
