import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { termsConditions } from "@/constants/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of TravelX services and bookings.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="1 July 2026"
      intro="These terms govern your use of TravelX and any bookings you make with us. By using our services you agree to them, so please read carefully."
      sections={termsConditions}
      breadcrumbs={[{ label: "Terms & Conditions" }]}
    />
  );
}
