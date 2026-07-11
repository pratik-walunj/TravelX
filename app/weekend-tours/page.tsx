import type { Metadata } from "next";
import { weekendPackages } from "@/data/packages";
import { ToursListing } from "@/components/sections/tours-listing";

export const metadata: Metadata = {
  title: "Weekend Tours — Quick 2–3 Day Getaways",
  description: "Short on time? Recharge with a quick weekend escape. Browse TravelX weekend getaway packages.",
  alternates: { canonical: "/weekend-tours" },
};

export default function WeekendToursPage() {
  return (
    <ToursListing
      eyebrow="Quick Getaways"
      title="Weekend Tours"
      description="Two or three days is all you need. Recharge with a quick, beautifully organised weekend escape."
      image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80"
      packages={weekendPackages}
      breadcrumbs={[{ label: "Tours", href: "/tour-packages" }, { label: "Weekend Tours" }]}
    />
  );
}
