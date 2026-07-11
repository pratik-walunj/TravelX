import type { Metadata } from "next";
import Link from "next/link";
import { getPackageBySlug, packages } from "@/data/packages";
import { BookingWizard } from "@/features/booking/booking-wizard";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { EmptyState } from "@/components/common/empty-state";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Book Your Trip",
  description: "Complete your TravelX booking in a few simple steps — choose dates, travellers, rooms and extras.",
  robots: { index: false, follow: true },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ pkg?: string; date?: string; travelers?: string }>;
}) {
  const params = await searchParams;
  const pkg = params.pkg ? getPackageBySlug(params.pkg) : packages[0];

  if (!pkg) {
    return (
      <div className="container section">
        <EmptyState
          title="No package selected"
          description="Choose a tour package to start your booking."
          action={<ButtonLink href="/tour-packages">Browse packages</ButtonLink>}
        />
      </div>
    );
  }

  const travelers = params.travelers ? Number(params.travelers) : undefined;

  return (
    <div className="container pt-24 lg:pt-28">
      <Breadcrumb items={[{ label: "Tours", href: "/tour-packages" }, { label: pkg.title, href: `/tour-packages/${pkg.slug}` }, { label: "Booking" }]} className="mb-4" />
      <h1 className="mb-1 font-heading text-3xl font-bold">Complete your booking</h1>
      <p className="mb-8 text-muted-foreground">
        Almost there! A few quick steps and you&apos;re all set.{" "}
        <Link href={`/tour-packages/${pkg.slug}`} className="font-medium text-primary-600 hover:underline dark:text-primary-300">View package</Link>
      </p>
      <div className="pb-16">
        <BookingWizard pkg={pkg} initialDate={params.date} initialTravelers={travelers} />
      </div>
    </div>
  );
}
