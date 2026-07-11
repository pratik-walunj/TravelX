import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Flame, TrendingUp } from "lucide-react";
import type { TourPackage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { WishlistButton } from "@/components/common/wishlist-button";
import { CompareButton } from "@/components/common/compare-button";
import { formatCurrency, discountPercent, formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: TourPackage;
  className?: string;
  priority?: boolean;
}

/**
 * The core package card — reused on the homepage rails, listing grids, related
 * tours and search results. One component, one source of truth.
 */
export function PackageCard({ pkg, className, priority }: PackageCardProps) {
  const discount = discountPercent(pkg.oldPrice, pkg.price);
  const href = `/tour-packages/${pkg.slug}`;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card-hover",
        className,
      )}
    >
      {/* Image */}
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {discount > 0 && <Badge variant="accent">{discount}% OFF</Badge>}
          {pkg.bestseller && (
            <Badge variant="danger" className="gap-1">
              <Flame className="size-3" /> Bestseller
            </Badge>
          )}
          {pkg.trending && !pkg.bestseller && (
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="size-3" /> Trending
            </Badge>
          )}
        </div>

        {/* Top-right actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100 max-sm:opacity-100">
          <WishlistButton id={pkg.id} />
          <CompareButton id={pkg.id} />
        </div>

        {/* Seats-left urgency */}
        {pkg.seatsLeft <= 8 && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="glass" className="gap-1 text-white">
              <Flame className="size-3 text-accent-400" />
              Only {pkg.seatsLeft} seats left
            </Badge>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 text-secondary-500" />
            {pkg.destination}, {pkg.country}
          </span>
          <Rating value={pkg.rating} count={pkg.reviewCount} size="sm" />
        </div>

        <h3 className="font-heading text-lg font-semibold leading-snug">
          <Link href={href} className="transition-colors hover:text-primary-600 dark:hover:text-primary-300">
            {pkg.title}
          </Link>
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {formatDuration(pkg.durationDays, pkg.durationNights)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" /> Up to {pkg.groupSize.max}
          </span>
          <Badge variant="muted" className="capitalize">{pkg.category}</Badge>
        </div>

        {/* Highlights */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 2).map((h) => (
            <li key={h} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {h}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {pkg.oldPrice > pkg.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(pkg.oldPrice, pkg.currency)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-xl font-bold text-primary-700 dark:text-primary-300">
                {formatCurrency(pkg.price, pkg.currency)}
              </span>
              <span className="text-xs text-muted-foreground">/ person</span>
            </div>
          </div>
          <Link
            href={href}
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary-600 px-5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-card-hover active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
