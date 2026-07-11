import type { Metadata } from "next";
import { destinations } from "@/data/destinations";
import { PageHero } from "@/components/common/page-hero";
import { DestinationExplorer } from "@/features/destinations/destination-explorer";

export const metadata: Metadata = {
  title: "Destinations — Explore 50+ Places Around the World",
  description: "From Kerala's backwaters to the Maldives' lagoons — explore 50+ curated domestic and international destinations with TravelX.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore the World"
        title="Destinations"
        description="Fifty-plus handpicked places, each with curated stays, expert guides and unforgettable experiences."
        image="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Destinations" }]}
      />
      <DestinationExplorer destinations={destinations} />
    </>
  );
}
