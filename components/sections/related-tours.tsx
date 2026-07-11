import type { TourPackage } from "@/types";
import { PackageCard } from "@/components/cards/package-card";
import { SectionHeading } from "@/components/common/section-heading";

export function RelatedTours({ packages, title = "You may also like" }: { packages: TourPackage[]; title?: string }) {
  if (!packages.length) return null;
  return (
    <section className="section bg-muted/40">
      <div className="container">
        <SectionHeading eyebrow="More Trips" title={title} align="left" className="mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => <PackageCard key={p.id} pkg={p} />)}
        </div>
      </div>
    </section>
  );
}
