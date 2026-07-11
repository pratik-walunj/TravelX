"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, ShieldCheck, Tag, Minus, Plus, Check } from "lucide-react";
import type { TourPackage } from "@/types";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/common/wishlist-button";
import { formatCurrency, discountPercent, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Sticky booking widget on the package detail page. */
export function BookingSidebar({ pkg }: { pkg: TourPackage }) {
  const router = useRouter();
  const [date, setDate] = useState(pkg.availableDates[0]);
  const [travelers, setTravelers] = useState(2);
  const discount = discountPercent(pkg.oldPrice, pkg.price);
  const total = pkg.price * travelers;

  const proceed = () => {
    const params = new URLSearchParams({ pkg: pkg.slug, date, travelers: String(travelers) });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="border-b border-border bg-muted/40 p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-3xl font-bold text-primary-700 dark:text-primary-300">{formatCurrency(pkg.price)}</span>
                {pkg.oldPrice > pkg.price && <span className="text-sm text-muted-foreground line-through">{formatCurrency(pkg.oldPrice)}</span>}
              </div>
              <p className="text-xs text-muted-foreground">per person · incl. taxes</p>
            </div>
            {discount > 0 && <Badge variant="accent" className="text-sm">Save {discount}%</Badge>}
          </div>
        </div>

        <div className="space-y-4 p-5">
          {/* Date */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold"><Calendar className="size-4 text-secondary-500" /> Departure date</label>
            <select value={date} onChange={(e) => setDate(e.target.value)} className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm">
              {pkg.availableDates.map((d) => <option key={d} value={d}>{formatDate(d)}</option>)}
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold"><Users className="size-4 text-secondary-500" /> Travellers</label>
            <div className="flex items-center justify-between rounded-xl border border-input px-3 py-2">
              <button onClick={() => setTravelers((t) => Math.max(1, t - 1))} className="inline-flex size-8 items-center justify-center rounded-lg border border-border hover:bg-muted" aria-label="Decrease"><Minus className="size-4" /></button>
              <span className="font-semibold tabular-nums">{travelers}</span>
              <button onClick={() => setTravelers((t) => Math.min(pkg.groupSize.max, t + 1))} className="inline-flex size-8 items-center justify-center rounded-lg border border-border hover:bg-muted" aria-label="Increase"><Plus className="size-4" /></button>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">Total ({travelers} {travelers === 1 ? "traveller" : "travellers"})</p>
              <p className="font-heading text-xl font-bold">{formatCurrency(total)}</p>
            </div>
            <span className="text-xs text-secondary-600 dark:text-secondary-300">No booking fees</span>
          </div>

          <Button onClick={proceed} variant="gradient" size="lg" className="w-full">Book Now</Button>
          <div className="flex gap-2">
            <ButtonLink href={`/contact?enquiry=${pkg.slug}`} variant="outline" className="flex-1">Enquire</ButtonLink>
            <div className="shrink-0"><WishlistButton id={pkg.id} variant="inline" /></div>
          </div>

          {/* Trust */}
          <ul className="space-y-1.5 pt-1 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> Free cancellation up to 30 days before</li>
            <li className="flex items-center gap-2"><Check className="size-4 text-success" /> Instant confirmation</li>
            <li className="flex items-center gap-2"><Tag className="size-4 text-success" /> Best price guarantee</li>
          </ul>

          {pkg.seatsLeft <= 8 && (
            <p className={cn("rounded-xl bg-danger/10 px-3 py-2 text-center text-xs font-semibold text-danger")}>
              🔥 Hurry! Only {pkg.seatsLeft} seats left at this price
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
