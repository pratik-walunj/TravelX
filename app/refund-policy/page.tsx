import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { refundPolicy } from "@/constants/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "TravelX cancellation charges, refund timelines and rescheduling terms.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="1 July 2026"
      intro="We understand plans change. This policy explains our cancellation charges, refund timelines and rescheduling options so there are no surprises."
      sections={refundPolicy}
      breadcrumbs={[{ label: "Refund Policy" }]}
    />
  );
}
