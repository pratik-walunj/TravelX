import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Adventure Tours — Treks, Rafting & Thrills",
  description: "Trek the Himalayas, raft wild rivers and chase adrenaline with TravelX adventure tour packages.",
  alternates: { canonical: "/adventure-tours" },
};

export default function AdventureToursPage() {
  return (
    <ToursListing
      eyebrow="For the Bold"
      title="Adventure Tours"
      description="Treks, rafting, safaris and adrenaline — for travellers who like their holidays with a heartbeat."
      image="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("adventure")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Adventure Tours" }]}
      initialCategory="adventure"
    />
  );
}
