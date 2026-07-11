import type { Metadata } from "next";
import { faqs, faqCategories } from "@/data/faqs";
import { PageHero } from "@/components/common/page-hero";
import { FaqExplorer } from "@/features/faq/faq-explorer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd, faqSchema } from "@/components/common/json-ld";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Answers to common questions about booking, payments, cancellations, visas and travelling with TravelX.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <PageHero
        eyebrow="Help Centre"
        title="Frequently asked questions"
        description="Everything you need to know about booking and travelling with TravelX."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "FAQ" }]}
      />
      <div className="container section-tight">
        <FaqExplorer faqs={faqs} categories={faqCategories} />
      </div>
      <CtaBanner />
    </>
  );
}
