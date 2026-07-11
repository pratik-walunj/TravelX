import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart, Award, Users, Globe2, Leaf, Sparkles } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { StatsCounter } from "@/components/sections/stats-counter";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";
import { avatars } from "@/data/images";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "About Us — Our Story & Mission",
  description: "Since 2011, TravelX has crafted premium journeys for 148,000+ travellers. Learn about our story, values and team.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Heart, title: "Traveller-first", desc: "Every decision starts with what's best for you, not our margins." },
  { icon: Award, title: "Uncompromising quality", desc: "Handpicked stays, vetted partners and details that delight." },
  { icon: Leaf, title: "Responsible travel", desc: "We support local communities and tread lightly on the planet." },
  { icon: Sparkles, title: "Endless curiosity", desc: "We travel constantly so our recommendations stay fresh and real." },
];

const team = [
  { name: "Ananya Rao", role: "Founder & CEO", avatar: avatars[1] },
  { name: "Rohan Mehta", role: "Head of Product", avatar: avatars[2] },
  { name: "Priya Nair", role: "Chief Experience Officer", avatar: avatars[3] },
  { name: "Karan Kapoor", role: "Head of Operations", avatar: avatars[6] },
];

const milestones = [
  { year: "2011", text: "TravelX founded in Pune with a team of three." },
  { year: "2015", text: "Crossed 10,000 happy travellers and opened our Mumbai office." },
  { year: "2019", text: "Launched international tours across 40+ countries." },
  { year: "2022", text: "Introduced 24/7 concierge and best-price guarantee." },
  { year: "2026", text: "148,000+ travellers, 320+ destinations and counting." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${siteConfig.founded}`}
        title="We turn wanderlust into wonderful"
        description="TravelX is a team of obsessive travellers crafting premium, hassle-free journeys for the curious."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h2 className="heading-lg mt-4 text-3xl">From a small idea to 148,000+ journeys</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>What began in 2011 as three friends who couldn&apos;t stop travelling has grown into one of the region&apos;s most-loved premium travel companies. But our obsession hasn&apos;t changed: crafting journeys so seamless and thoughtful that all you have to do is show up and soak it in.</p>
              <p>We don&apos;t believe in cookie-cutter tours. Every itinerary is designed by people who&apos;ve actually been there, stayed in those hotels and eaten at those restaurants. That&apos;s the difference you feel on a TravelX trip.</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[{ icon: Users, k: "148k+", v: "Travellers" }, { icon: Globe2, k: "320+", v: "Destinations" }, { icon: Award, k: "14 yrs", v: "Experience" }].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <s.icon className="mx-auto mb-2 size-6 text-secondary-500" />
                  <p className="font-heading text-xl font-bold">{s.k}</p>
                  <p className="text-xs text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal direction="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card">
              <Image src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80" alt="TravelX team exploring" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section bg-muted/40">
        <div className="container grid gap-6 md:grid-cols-2">
          {[{ icon: Target, title: "Our Mission", text: "To make premium, personalised travel accessible — removing every ounce of stress so people can collect experiences, not logistics." }, { icon: Eye, title: "Our Vision", text: "A world where everyone can explore confidently, sustainably and joyfully, guided by people who genuinely care." }].map((m) => (
            <Reveal key={m.title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-300"><m.icon className="size-7" /></span>
              <h3 className="mt-5 font-heading text-2xl font-bold">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="What We Stand For" title="Our values" description="The principles behind every trip we craft." /></Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title} className="rounded-3xl border border-border bg-card p-6 text-center shadow-card">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-600"><v.icon className="size-7" /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <StatsCounter />

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="Our Journey" title="Milestones along the way" /></Reveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} className={`relative flex gap-6 sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:flex-row" : "sm:flex-row-reverse sm:text-right"}`}>
                  <div className="absolute left-4 top-2 size-3 -translate-x-1/2 rounded-full bg-primary-600 ring-4 ring-background sm:left-auto sm:right-0 sm:translate-x-1/2" style={i % 2 ? { left: "-1rem" } : {}} />
                  <div className="ml-10 rounded-2xl border border-border bg-card p-5 shadow-soft sm:ml-0">
                    <p className="font-heading text-xl font-bold text-primary-600 dark:text-primary-300">{m.year}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{m.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-muted/40">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="The People" title="Meet the team" description="Travel obsessives who make the magic happen." /></Reveal>
          <RevealStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((t) => (
              <RevealItem key={t.name} className="group text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-3xl shadow-card">
                  <Image src={t.avatar} alt={t.name} fill sizes="220px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}
