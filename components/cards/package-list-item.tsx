import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users, Check, Flame } from "lucide-react";
import type { TourPackage } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { WishlistButton } from "@/components/common/wishlist-button";
import { ButtonLink } from "@/components/ui/button";
import { formatCurrency, discountPercent, formatDuration } from "@/lib/format";

/** Horizontal package card for the list view of listing pages. */
export function PackageListItem({ pkg }: { pkg: TourPackage }) {
  const discount = discountPercent(pkg.oldPrice, pkg.price);
  const href = `/tour-packages/${pkg.slug}`;

  return (
    <article className="group grid gap-4 overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-card-hover sm:grid-cols-[280px_1fr]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto">
        <Image src={pkg.image} alt={pkg.title} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        {discount > 0 && <Badge variant="accent" className="absolute left-3 top-3">{discount}% OFF</Badge>}
        <div className="absolute right-3 top-3"><WishlistButton id={pkg.id} /></div>
      </Link>

      <div className="flex flex-col p-2 sm:pr-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 text-secondary-500" /> {pkg.destination}, {pkg.country}
          </span>
          <Rating value={pkg.rating} count={pkg.reviewCount} size="sm" />
        </div>

        <h3 className="mt-1.5 font-heading text-xl font-semibold leading-snug">
          <Link href={href} className="hover:text-primary-600 dark:hover:text-primary-300">{pkg.title}</Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {formatDuration(pkg.durationDays, pkg.durationNights)}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3.5" /> Up to {pkg.groupSize.max}</span>
          <Badge variant="muted" className="capitalize">{pkg.category}</Badge>
          {pkg.seatsLeft <= 8 && <span className="inline-flex items-center gap-1 font-medium text-danger"><Flame className="size-3.5" /> {pkg.seatsLeft} left</span>}
        </div>

        <ul className="mt-3 hidden flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="inline-flex items-center gap-1"><Check className="size-3.5 text-success" /> {h}</li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            {pkg.oldPrice > pkg.price && <span className="text-xs text-muted-foreground line-through">{formatCurrency(pkg.oldPrice, pkg.currency)}</span>}
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-300">{formatCurrency(pkg.price, pkg.currency)}</span>
              <span className="text-xs text-muted-foreground">/ person</span>
            </div>
          </div>
          <ButtonLink href={href} variant="primary">View Details</ButtonLink>
        </div>
      </div>
    </article>
  );
}
