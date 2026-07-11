import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck, ShieldCheck, BedDouble, Plane, Car, Sparkles } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Travel Services — Visa, Insurance, Hotels, Flights & More",
  description: "Beyond tours: visa assistance, travel insurance, hotel and flight booking, and transportation — all under one roof at TravelX.",
  alternates: { canonical: "/services" },
};

const services = [
  { icon: FileCheck, title: "Visa Services", href: "/visa-services", desc: "End-to-end visa assistance for 180+ countries." },
  { icon: ShieldCheck, title: "Travel Insurance", href: "/travel-insurance", desc: "Comprehensive cover for medical, cancellation & baggage." },
  { icon: BedDouble, title: "Hotel Booking", href: "/hotel-booking", desc: "Handpicked stays at exclusive member rates." },
  { icon: Plane, title: "Flight Booking", href: "/flight-booking", desc: "Best routes and fares across every airline." },
  { icon: Car, title: "Transportation", href: "/transportation", desc: "Airport transfers, private cars and coaches." },
  { icon: Sparkles, title: "Custom Tour Planner", href: "/custom-tour-planner", desc: "Build a bespoke trip designed entirely around you." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="More Than Tours"
        title="Travel services, sorted"
        description="Everything you need for a seamless trip — beyond the itinerary — handled by one trusted team."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Services" }]}
      />
      <section className="section">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="What We Offer" title="One team for your whole journey" description="Bundle any of these with a tour for better rates and a single point of contact." /></Reveal>
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.title}>
                <Link href={s.href} className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:text-primary-300"><s.icon className="size-7" /></span>
                  <h3 className="mt-5 font-heading text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-all group-hover:gap-2.5 dark:text-primary-300">Learn more <ArrowRight className="size-4" /></span>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
