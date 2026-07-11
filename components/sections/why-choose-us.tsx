import { usps } from "@/data/stats";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";

export function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="Why TravelX"
            title="Premium travel, without the guesswork"
            description="Fourteen years of crafting journeys, obsessing over the details so you don't have to."
          />
        </Reveal>
        <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {usps.map((u) => (
            <RevealItem key={u.title}>
              <div className="group h-full rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:text-primary-300">
                  <Icon name={u.icon} className="size-7" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
