"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X, GitCompareArrows, Star } from "lucide-react";
import { useCompare } from "@/hooks/use-collection";
import { packages } from "@/data/packages";
import { PageHero } from "@/components/common/page-hero";
import { EmptyState } from "@/components/common/empty-state";
import { ButtonLink, Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatDuration } from "@/lib/format";

export default function ComparePage() {
  const { ids, remove, clear, hydrated } = useCompare();
  const items = ids.map((id) => packages.find((p) => p.id === id)).filter(Boolean) as (typeof packages);

  const rows: { label: string; render: (p: (typeof packages)[number]) => React.ReactNode }[] = [
    { label: "Price", render: (p) => <span className="font-heading text-lg font-bold text-primary-700 dark:text-primary-300">{formatCurrency(p.price)}</span> },
    { label: "Duration", render: (p) => formatDuration(p.durationDays, p.durationNights) },
    { label: "Destination", render: (p) => `${p.destination}, ${p.country}` },
    { label: "Category", render: (p) => <span className="capitalize">{p.category}</span> },
    { label: "Rating", render: (p) => <span className="inline-flex items-center gap-1">{p.rating} <Star className="size-3.5 fill-accent-500 text-accent-500" /> ({p.reviewCount})</span> },
    { label: "Group size", render: (p) => `${p.groupSize.min}–${p.groupSize.max}` },
    { label: "Difficulty", render: (p) => p.difficulty },
    { label: "Seats left", render: (p) => p.seatsLeft },
    { label: "Meals incl.", render: (p) => (p.inclusions.some((i) => i.toLowerCase().includes("meal")) ? <Check className="mx-auto size-5 text-success" /> : <X className="mx-auto size-5 text-danger" />) },
    { label: "Flights incl.", render: (p) => (p.inclusions.some((i) => i.toLowerCase().includes("airfare")) ? <Check className="mx-auto size-5 text-success" /> : <X className="mx-auto size-5 text-danger" />) },
  ];

  return (
    <>
      <PageHero
        eyebrow="Side by side"
        title="Compare Packages"
        description="Weigh up your shortlisted trips and pick the perfect one."
        image="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Compare" }]}
        size="sm"
      />
      <div className="container section-tight">
        {!hydrated ? (
          <Skeleton className="h-96 rounded-3xl" />
        ) : items.length === 0 ? (
          <EmptyState
            icon={<GitCompareArrows className="size-8" />}
            title="No packages to compare"
            description="Add up to 4 packages using the compare button on any tour card."
            action={<ButtonLink href="/tour-packages">Browse packages</ButtonLink>}
          />
        ) : (
          <>
            <div className="mb-6 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clear}>Clear all</Button>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-border">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 w-36 bg-muted/60 p-4 text-left align-bottom font-semibold">Package</th>
                    {items.map((p) => (
                      <th key={p.id} className="min-w-[200px] border-l border-border bg-card p-4 text-left align-top">
                        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                          <Image src={p.image} alt={p.title} fill sizes="200px" className="object-cover" />
                          <button onClick={() => remove(p.id)} aria-label="Remove" className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"><X className="size-4" /></button>
                        </div>
                        <Link href={`/tour-packages/${p.slug}`} className="font-heading font-semibold leading-snug hover:text-primary-600">{p.title}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={row.label} className={ri % 2 ? "bg-muted/30" : ""}>
                      <td className="sticky left-0 z-10 bg-inherit p-4 font-medium text-muted-foreground">{row.label}</td>
                      {items.map((p) => (
                        <td key={p.id} className="border-l border-border p-4 text-center">{row.render(p)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 z-10 bg-background p-4" />
                    {items.map((p) => (
                      <td key={p.id} className="border-l border-border p-4 text-center">
                        <ButtonLink href={`/tour-packages/${p.slug}`} size="sm" variant="primary">View</ButtonLink>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
