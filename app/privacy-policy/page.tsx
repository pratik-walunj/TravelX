import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { privacyPolicy } from "@/constants/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TravelX collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="1 July 2026"
      intro="Your privacy matters to us. This policy explains what data we collect, how we use it and the choices you have. It applies to all TravelX websites and services."
      sections={privacyPolicy}
      breadcrumbs={[{ label: "Privacy Policy" }]}
    />
  );
}
