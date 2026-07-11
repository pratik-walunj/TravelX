import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";
import { Accordion } from "@/components/ui/accordion";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ButtonLink } from "@/components/ui/button";
import type { Crumb } from "@/components/common/breadcrumb";

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServicePageProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  breadcrumbs: Crumb[];
  intro: string;
  features: ServiceFeature[];
  steps?: { title: string; description: string }[];
  benefits: string[];
  faqs: { id: string; question: string; answer: string }[];
  ctaHref?: string;
  ctaLabel?: string;
}

/** Reusable premium template for all TravelX service pages. */
export function ServicePage({
  eyebrow, title, description, image, breadcrumbs, intro, features, steps, benefits, faqs, ctaHref = "/contact", ctaLabel = "Get started",
}: ServicePageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} image={image} breadcrumbs={breadcrumbs}>
        <ButtonLink href={ctaHref} variant="accent" size="lg">{ctaLabel} <ArrowRight className="size-4" /></ButtonLink>
      </PageHero>

      {/* Intro + benefits */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <h2 className="heading-lg mt-4 text-3xl">{title} made effortless</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>
          </Reveal>
          <Reveal direction="left" className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-heading text-lg font-semibold">What you get</h3>
            <ul className="mt-4 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success"><Check className="size-3.5" /></span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-muted/40">
        <div className="container">
          <Reveal className="mb-12"><SectionHeading eyebrow="Why TravelX" title="Everything handled for you" /></Reveal>
          <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <RevealItem key={f.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-300"><Icon name={f.icon} className="size-6" /></span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Steps */}
      {steps && steps.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="mb-12"><SectionHeading eyebrow="How It Works" title="Simple, step by step" /></Reveal>
            <div className="grid gap-6 md:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.05} className="relative rounded-3xl border border-border bg-card p-6">
                  <span className="font-heading text-4xl font-bold text-primary-600/20">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ + enquiry */}
      <section className="section bg-muted/40">
        <div className="container grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <h2 className="heading-lg mb-6 text-2xl">Frequently asked</h2>
            <Accordion items={faqs} />
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-heading text-xl font-bold">Enquire now</h3>
            <p className="mb-5 mt-1 text-sm text-muted-foreground">Tell us what you need and we&apos;ll take it from here.</p>
            <EnquiryForm compact />
          </div>
        </div>
      </section>

      <div className="container section-tight text-center">
        <p className="text-muted-foreground">Looking for something else?</p>
        <Link href="/services" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:underline dark:text-primary-300">
          Explore all services <ArrowRight className="size-4" />
        </Link>
      </div>
    </>
  );
}
