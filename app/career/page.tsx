import type { Metadata } from "next";
import { MapPin, Clock, Briefcase, Heart, Plane, GraduationCap, Coffee, TrendingUp, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers — Join the TravelX Team",
  description: "Love travel? Join a fast-growing, people-first travel company. Explore open roles and our culture at TravelX.",
  alternates: { canonical: "/career" },
};

const perks = [
  { icon: Plane, title: "Annual travel credit", desc: "Explore the world on us — every year." },
  { icon: Heart, title: "Health & wellness", desc: "Comprehensive medical cover for you and family." },
  { icon: GraduationCap, title: "Learning budget", desc: "Grow with courses, conferences and mentorship." },
  { icon: Coffee, title: "Flexible work", desc: "Hybrid options and genuine work-life balance." },
];

const roles = [
  { title: "Senior Travel Designer", dept: "Product", location: "Pune", type: "Full-time" },
  { title: "Destination Expert — Europe", dept: "Operations", location: "Remote", type: "Full-time" },
  { title: "Frontend Engineer", dept: "Engineering", location: "Pune", type: "Full-time" },
  { title: "Customer Concierge (Night Shift)", dept: "Support", location: "Mumbai", type: "Full-time" },
  { title: "Performance Marketing Manager", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Content & SEO Specialist", dept: "Marketing", location: "Pune", type: "Contract" },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the future of travel with us"
        description="We're a team of passionate travellers on a mission to make premium travel effortless. Come help us."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Careers" }]}
      />

      {/* Perks */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="Why Work Here" title="Perks & benefits" description="We take care of our people so they can take care of our travellers." /></Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p) => (
              <RevealItem key={p.title} className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600"><p.icon className="size-7" /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Open roles */}
      <section className="section bg-muted/40">
        <div className="container">
          <Reveal className="mb-10"><SectionHeading eyebrow="Open Positions" title="Find your next role" /></Reveal>
          <div className="mx-auto max-w-3xl space-y-3">
            {roles.map((r) => (
              <Reveal key={r.title} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold">{r.title}</h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Briefcase className="size-3.5" /> {r.dept}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" /> {r.location}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> {r.type}</span>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit">{r.dept}</Badge>
                <ButtonLink href="/contact" variant="outline" size="sm" className="w-fit">Apply <ArrowRight className="size-4" /></ButtonLink>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="flex items-center justify-center gap-2 text-muted-foreground"><TrendingUp className="size-5 text-secondary-500" /> Don&apos;t see your role? We&apos;re always looking for great people.</p>
            <ButtonLink href="/contact" variant="primary" className="mt-4">Send us your CV</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
