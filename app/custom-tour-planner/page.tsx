import type { Metadata } from "next";
import { Sparkles, MessageSquare, PenTool, Plane } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { TripPlanner } from "@/features/planner/trip-planner";
import { CostCalculator, CurrencyConverter } from "@/features/planner/travel-tools";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Custom Tour Planner — Design Your Perfect Trip",
  description: "Use our AI-assisted trip planner, cost calculator and currency converter to design a bespoke holiday, then let our experts perfect it.",
  alternates: { canonical: "/custom-tour-planner" },
};

const steps = [
  { icon: Sparkles, title: "Draft with AI", desc: "Generate a tailored itinerary in seconds." },
  { icon: MessageSquare, title: "Chat with an expert", desc: "A designer refines every detail with you." },
  { icon: PenTool, title: "Personalise", desc: "Tweak hotels, pace, activities and budget." },
  { icon: Plane, title: "Book & go", desc: "Confirm securely and travel worry-free." },
];

export default function CustomTourPlannerPage() {
  return (
    <>
      <PageHero
        eyebrow="Bespoke Travel"
        title="Design your dream trip"
        description="Start with our AI planner, then let a human expert perfect every detail. Your trip, exactly your way."
        image="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Custom Tour Planner" }]}
      />

      {/* Planner */}
      <section id="ai" className="section scroll-mt-20">
        <div className="container">
          <Reveal className="mb-10"><SectionHeading eyebrow="AI Trip Planner" title="Let's build your itinerary" description="Answer a few questions and get an instant draft plan." /></Reveal>
          <TripPlanner />
        </div>
      </section>

      {/* Process */}
      <section className="section bg-muted/40">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="How It Works" title="From idea to itinerary" /></Reveal>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-300"><s.icon className="size-7" /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-10"><SectionHeading eyebrow="Handy Tools" title="Plan your budget" description="Estimate costs and convert currencies as you plan." /></Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <div id="calculator" className="scroll-mt-24"><CostCalculator /></div>
            <div id="currency" className="scroll-mt-24"><CurrencyConverter /></div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
