import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TourPackage } from "@/types";
import { PackageCard } from "@/components/cards/package-card";
import { CarouselRail } from "@/components/common/carousel-rail";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

interface PackageRailProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  packages: TourPackage[];
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  muted?: boolean;
}

/** Reusable "titled horizontal rail of packages + view all" section. */
export function PackageRail({
  eyebrow,
  title,
  description,
  packages,
  viewAllHref,
  viewAllLabel = "View all",
  className,
  muted,
}: PackageRailProps) {
  if (!packages.length) return null;
  return (
    <section className={cn("section", muted && "bg-muted/40", className)}>
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white"
            >
              {viewAllLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
        <CarouselRail>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} className="h-full" />
          ))}
        </CarouselRail>
      </div>
    </section>
  );
}
