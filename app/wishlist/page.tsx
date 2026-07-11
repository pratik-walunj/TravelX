"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/use-collection";
import { packages } from "@/data/packages";
import { PackageCard } from "@/components/cards/package-card";
import { EmptyState } from "@/components/common/empty-state";
import { PageHero } from "@/components/common/page-hero";
import { Button, ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistPage() {
  const { ids, clear, hydrated } = useWishlist();
  const items = ids.map((id) => packages.find((p) => p.id === id)).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="Saved for later"
        title="Your Wishlist"
        description="All the trips you've saved, in one place. Ready when you are."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Wishlist" }]}
        size="sm"
      />
      <div className="container section-tight">
        {!hydrated ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-96 rounded-3xl" />)}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Heart className="size-8" />}
            title="Your wishlist is empty"
            description="Tap the heart on any package to save it here for later."
            action={<ButtonLink href="/tour-packages">Discover trips</ButtonLink>}
          />
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{items.length}</span> saved {items.length === 1 ? "trip" : "trips"}</p>
              <Button variant="ghost" size="sm" onClick={clear}>Clear all</Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => p && <PackageCard key={p.id} pkg={p} />)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
