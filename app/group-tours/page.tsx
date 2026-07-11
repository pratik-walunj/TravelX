import type { Metadata } from "next";
import { getPackagesByCategory } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Group Tours — Fixed Departures & Shared Adventures",
  description: "Join fixed-departure group tours and travel with like-minded explorers. Book TravelX group tour packages.",
  alternates: { canonical: "/group-tours" },
};

export default function GroupToursPage() {
  return (
    <ToursListing
      eyebrow="Better Together"
      title="Group Tours"
      description="Join a fixed departure and share the adventure with like-minded travellers — perfect for solo explorers too."
      image="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=2000&q=80"
      packages={getPackagesByCategory("group")}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Group Tours" }]}
      initialCategory="group"
    />
  );
}
