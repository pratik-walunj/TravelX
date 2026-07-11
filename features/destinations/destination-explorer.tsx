"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Destination } from "@/types";
import { DestinationCard } from "@/components/cards/destination-card";
import { EmptyState } from "@/components/common/empty-state";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const [type, setType] = useState<"all" | "domestic" | "international">("all");
  const [continent, setContinent] = useState("all");
  const [query, setQuery] = useState("");

  const continents = useMemo(
    () => ["all", ...Array.from(new Set(destinations.map((d) => d.continent)))],
    [destinations],
  );

  const filtered = useMemo(
    () =>
      destinations.filter((d) => {
        if (type !== "all" && d.type !== type) return false;
        if (continent !== "all" && d.continent !== continent) return false;
        if (query && !`${d.name} ${d.country}`.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [destinations, type, continent, query],
  );

  return (
    <div className="container section-tight">
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "domestic", "international"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors",
                type === t ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted",
              )}
            >
              {t === "all" ? "All destinations" : t}
            </button>
          ))}
        </div>
        <div className="w-full max-w-xs">
          <Input placeholder="Search destinations…" value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search />} />
        </div>
      </div>

      {/* Continent chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {continents.map((c) => (
          <button
            key={c}
            onClick={() => setContinent(c)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition-colors",
              continent === c ? "bg-secondary-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70",
            )}
          >
            {c === "all" ? "All continents" : c}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{filtered.length}</span> destinations
      </p>

      {filtered.length === 0 ? (
        <EmptyState title="No destinations found" description="Try a different search or filter." />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((d, i) => (
            <DestinationCard key={d.id} destination={d} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
