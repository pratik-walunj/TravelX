import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Honeymoon Tours — Romantic Getaways for Two",
  description: "Overwater villas, candlelit dinners and once-in-a-lifetime moments. Explore TravelX honeymoon packages.",
  alternates: { canonical: "/honeymoon-tours" },
};

export default function HoneymoonToursPage() {
  return (
    <ToursListing
      eyebrow="Just the Two of You"
      title="Honeymoon Tours"
      description="Romantic escapes designed for two — overwater villas, private dinners and unforgettable sunsets."
      image="https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("honeymoon")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Honeymoon Tours" }]}
      initialCategory="honeymoon"
    />
  );
}
