"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, LayoutGrid, List, X, Star } from "lucide-react";
import type { TourPackage, TourCategory, TripType } from "@/types";
import { PackageCard } from "@/components/cards/package-card";
import { PackageListItem } from "@/components/cards/package-list-item";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const categories: TourCategory[] = [
  "luxury", "adventure", "family", "honeymoon", "pilgrimage",
  "weekend", "group", "corporate", "wildlife", "beach", "cultural", "cruise",
];
const durationBuckets = [
  { id: "short", label: "1–3 days", test: (d: number) => d <= 3 },
  { id: "mid", label: "4–6 days", test: (d: number) => d >= 4 && d <= 6 },
  { id: "long", label: "7–9 days", test: (d: number) => d >= 7 && d <= 9 },
  { id: "xl", label: "10+ days", test: (d: number) => d >= 10 },
];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "duration", label: "Duration" },
];
const PAGE_SIZE = 9;

interface Props {
  packages: TourPackage[];
  initialType?: TripType | "all";
  initialCategory?: TourCategory;
  title?: string;
}

export function PackageExplorer({ packages, initialType = "all", initialCategory }: Props) {
  const [type, setType] = useState<TripType | "all">(initialType);
  const [selectedCats, setSelectedCats] = useState<TourCategory[]>(initialCategory ? [initialCategory] : []);
  const [durations, setDurations] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const result = packages.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (durations.length && !durationBuckets.some((b) => durations.includes(b.id) && b.test(p.durationDays))) return false;
      if (p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
    result.sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "duration": return a.durationDays - b.durationDays;
        default: return b.reviewCount - a.reviewCount;
      }
    });
    return result;
  }, [packages, type, selectedCats, durations, minRating, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggleCat = (c: TourCategory) => {
    setPage(1);
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };
  const toggleDuration = (id: string) => {
    setPage(1);
    setDurations((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const reset = () => {
    setType("all"); setSelectedCats([]); setDurations([]); setMinRating(0); setMaxPrice(300000); setPage(1);
  };

  const activeCount = (type !== "all" ? 1 : 0) + selectedCats.length + durations.length + (minRating > 0 ? 1 : 0) + (maxPrice < 300000 ? 1 : 0);

  const Filters = (
    <div className="space-y-6">
      <FilterGroup label="Trip Type">
        <div className="flex flex-wrap gap-2">
          {(["all", "domestic", "international"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setType(t); setPage(1); }}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition-colors",
                type === t ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Category">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => toggleCat(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                selectedCats.includes(c) ? "border-secondary-500 bg-secondary-500 text-white" : "border-border hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Duration">
        <div className="space-y-2">
          {durationBuckets.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input type="checkbox" checked={durations.includes(b.id)} onChange={() => toggleDuration(b.id)} className="size-4 rounded border-border accent-primary-600" />
              {b.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label={`Max Price: ${formatCurrency(maxPrice, "INR", { compact: true })}`}>
        <input
          type="range" min={10000} max={300000} step={5000} value={maxPrice}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary-600"
        />
      </FilterGroup>

      <FilterGroup label="Minimum Rating">
        <div className="flex gap-2">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => { setMinRating(r); setPage(1); }}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                minRating === r ? "border-accent-500 bg-accent-500 text-accent-950" : "border-border hover:bg-muted",
              )}
            >
              {r === 0 ? "Any" : <><Star className="size-3.5 fill-current" /> {r}+</>}
            </button>
          ))}
        </div>
      </FilterGroup>

      <Button variant="ghost" onClick={reset} className="w-full">Clear all filters</Button>
    </div>
  );

  return (
    <div className="container section-tight">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Filters</h2>
              {activeCount > 0 && <Badge variant="secondary">{activeCount}</Badge>}
            </div>
            {Filters}
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filtered.length}</span> tours found
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal className="size-4" /> Filters {activeCount > 0 && `(${activeCount})`}
              </Button>
              <div className="w-48">
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </Select>
              </div>
              <div className="hidden items-center rounded-full border border-border p-1 sm:flex">
                <button onClick={() => setView("grid")} aria-label="Grid view" className={cn("rounded-full p-1.5", view === "grid" ? "bg-primary-600 text-white" : "text-muted-foreground")}>
                  <LayoutGrid className="size-4" />
                </button>
                <button onClick={() => setView("list")} aria-label="List view" className={cn("rounded-full p-1.5", view === "list" ? "bg-primary-600 text-white" : "text-muted-foreground")}>
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {visible.length === 0 ? (
            <EmptyState
              title="No tours match your filters"
              description="Try widening your price range or clearing some filters."
              action={<Button onClick={reset}>Clear filters</Button>}
            />
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          ) : (
            <div className="space-y-4">
              {visible.map((p) => <PackageListItem key={p.id} pkg={p} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1.5">
              <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>Prev</Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "size-9 rounded-full text-sm font-medium transition-colors",
                    current === i + 1 ? "bg-primary-600 text-white" : "hover:bg-muted",
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <Button variant="outline" size="sm" disabled={current === totalPages} onClick={() => setPage(current + 1)}>Next</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-muted"><X className="size-5" /></button>
            </div>
            {Filters}
            <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>Show {filtered.length} tours</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{label}</p>
      {children}
    </div>
  );
}
