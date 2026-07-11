import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/common/page-hero";
import { SearchResults } from "@/features/search/search-results";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all TravelX tours and destinations.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Find your trip"
        title="Search"
        image="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Search" }]}
        size="sm"
      />
      <Suspense fallback={<div className="container section-tight"><Skeleton className="h-14 rounded-full" /></div>}>
        <SearchResults />
      </Suspense>
    </>
  );
}
