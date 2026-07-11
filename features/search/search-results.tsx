"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";
import { PackageCard } from "@/components/cards/package-card";
import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/common/empty-state";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";

export function SearchResults() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? params.get("destination") ?? "";
  const budget = params.get("budget");
  const [maxBudget] = budget ? budget.split("-").map(Number).slice(1) : [Infinity];
  const [query, setQuery] = useState(initialQ);

  const q = query.toLowerCase();

  const matchedPackages = useMemo(
    () =>
      packages.filter((p) => {
        const text = `${p.title} ${p.destination} ${p.country} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
        const matchesText = !q || text.includes(q) || p.destinationSlug.includes(q);
        const matchesBudget = !maxBudget || p.price <= maxBudget;
        return matchesText && matchesBudget;
      }),
    [q, maxBudget],
  );

  const matchedDestinations = useMemo(
    () =>
      destinations.filter((d) => {
        const text = `${d.name} ${d.country} ${d.continent} ${d.tags.join(" ")}`.toLowerCase();
        return !q || text.includes(q) || d.slug.includes(q);
      }),
    [q],
  );

  const total = matchedPackages.length + matchedDestinations.length;

  return (
    <div className="container section-tight">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, tours, categories…"
          icon={<Search />}
          className="h-14 rounded-full text-base"
          autoFocus
        />
      </div>

      <p className="mb-6 text-center text-sm text-muted-foreground">
        {query ? <><span className="font-semibold text-foreground">{total}</span> results for &ldquo;{query}&rdquo;</> : "Start typing to search across all trips and destinations"}
      </p>

      {total === 0 ? (
        <EmptyState title="No results found" description="Try a different keyword or browse our destinations." />
      ) : (
        <Tabs
          items={[
            {
              value: "packages",
              label: `Tours (${matchedPackages.length})`,
              content: matchedPackages.length ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedPackages.slice(0, 12).map((p) => <PackageCard key={p.id} pkg={p} />)}
                </div>
              ) : <EmptyState title="No matching tours" />,
            },
            {
              value: "destinations",
              label: `Destinations (${matchedDestinations.length})`,
              content: matchedDestinations.length ? (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                  {matchedDestinations.slice(0, 12).map((d) => <DestinationCard key={d.id} destination={d} />)}
                </div>
              ) : <EmptyState title="No matching destinations" />,
            },
          ]}
          listClassName="mx-auto w-fit"
        />
      )}
    </div>
  );
}
