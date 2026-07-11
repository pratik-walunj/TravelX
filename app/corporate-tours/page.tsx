import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Corporate Tours — Offsites, MICE & Incentive Travel",
  description: "Seamless corporate offsites, conferences and incentive travel for teams of any size. Plan with TravelX.",
  alternates: { canonical: "/corporate-tours" },
};

export default function CorporateToursPage() {
  return (
    <ToursListing
      eyebrow="Work, Elevated"
      title="Corporate Tours"
      description="Offsites, conferences, team retreats and incentive travel — managed end to end so you can focus on your people."
      image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("corporate")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Corporate Tours" }]}
      initialCategory="corporate"
    />
  );
}
