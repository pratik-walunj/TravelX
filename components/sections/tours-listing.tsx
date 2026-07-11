import type { TourPackage, TourCategory, TripType } from "@/types";
import { PageHero } from "@/components/common/page-hero";
import { PackageExplorer } from "@/features/packages/package-explorer";
import type { Crumb } from "@/components/common/breadcrumb";

interface ToursListingProps {
  title: string;
  description: string;
  eyebrow?: string;
  image?: string;
  packages: TourPackage[];
  breadcrumbs: Crumb[];
  initialType?: TripType | "all";
  initialCategory?: TourCategory;
  intro?: React.ReactNode;
}

/** Shared template for every tour listing / category page. */
export function ToursListing({
  title, description, eyebrow, image, packages, breadcrumbs, initialType, initialCategory, intro,
}: ToursListingProps) {
  return (
    <>
      <PageHero title={title} description={description} eyebrow={eyebrow} image={image} breadcrumbs={breadcrumbs} />
      {intro && <div className="container pt-12">{intro}</div>}
      <PackageExplorer packages={packages} initialType={initialType} initialCategory={initialCategory} />
    </>
  );
}
