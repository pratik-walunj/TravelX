import Image from "next/image";
import Link from "next/link";
import { Tag, ArrowRight, Clock } from "lucide-react";
import { offers } from "@/data/offers";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/common/countdown-timer";
import { formatDate } from "@/lib/format";

/** Special offers: one hero deal + a grid of smaller ones. */
export function SpecialOffers() {
  const [hero, ...rest] = offers;

  return (
    <section className="section">
      <div className="container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="Limited Time"
            title="Special offers & deals"
            description="Grab these handpicked deals before they're gone."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Hero offer */}
          <Reveal className="group relative overflow-hidden rounded-3xl shadow-card">
            <div className="relative aspect-[16/11] lg:aspect-auto lg:h-full">
              <Image src={hero.image} alt={hero.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <Badge variant="accent" className="mb-3">{hero.badge}</Badge>
              <h3 className="font-heading text-3xl font-bold">{hero.title}</h3>
              <p className="mt-2 max-w-md text-white/85">{hero.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="rounded-xl border border-dashed border-white/50 bg-white/10 px-4 py-2 font-mono text-sm font-bold tracking-wider backdrop-blur">
                  {hero.code}
                </span>
                <CountdownTimer target={hero.expiresAt} className="text-white" />
              </div>
              <Link href="/tour-packages?offers=true" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-transform hover:scale-105">
                Claim Offer <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* Smaller offers */}
          <div className="grid gap-5 sm:grid-cols-2">
            {rest.slice(0, 4).map((o, i) => (
              <Reveal key={o.id} delay={i * 0.06} className="group flex flex-col rounded-3xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600">
                    <Tag className="size-5" />
                  </span>
                  <span className="font-heading text-lg font-bold text-primary-700 dark:text-primary-300">{o.discountLabel}</span>
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold">{o.title}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">{o.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="rounded-md bg-muted px-2 py-1 font-mono font-semibold text-foreground">{o.code}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" /> Till {formatDate(o.expiresAt)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
