import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
  size?: "default" | "tall";
  priority?: boolean;
}

/** Immersive destination card with hover-zoom and gradient overlay. */
export function DestinationCard({
  destination: d,
  className,
  size = "default",
  priority,
}: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl shadow-card transition-all duration-500 hover:shadow-card-hover",
        size === "tall" ? "aspect-[3/4]" : "aspect-[4/5]",
        className,
      )}
    >
      <Image
        src={d.image}
        alt={d.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority={priority}
        className="object-cover transition-transform ease-out [transition-duration:900ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute left-4 top-4 flex gap-1.5">
        {d.trending && <Badge variant="secondary">Trending</Badge>}
        <Badge variant="glass" className="capitalize text-white">{d.type}</Badge>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="flex items-center gap-1.5 text-xs font-medium text-white/80">
          <MapPin className="size-3.5" /> {d.country}
        </div>
        <h3 className="mt-1 font-heading text-2xl font-bold leading-tight">{d.name}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-white/80">{d.tagline}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-white/60">Starting from</p>
            <p className="font-heading text-lg font-bold">{formatCurrency(d.startingPrice)}</p>
          </div>
          <div className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-primary-700">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3">
          <Rating value={d.rating} count={d.reviewCount} size="sm" className="[&_span]:text-white" />
          <span className="text-xs text-white/80">{d.packageCount} packages</span>
        </div>
      </div>
    </Link>
  );
}
