import { travelProcess } from "@/data/stats";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";

/** 4-step "how it works" timeline with a connecting line. */
export function TravelProcess() {
  return (
    <section className="section bg-muted/40">
      <div className="container">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="How It Works"
            title="Your dream trip in four easy steps"
            description="From first idea to touchdown, we make planning delightfully simple."
          />
        </Reveal>

        <RevealStagger className="relative grid gap-8 md:grid-cols-4">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          {travelProcess.map((step) => (
            <RevealItem key={step.step} className="relative text-center">
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-card shadow-card ring-1 ring-border">
                <Icon name={step.icon} className="size-7 text-primary-600 dark:text-primary-300" />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-accent-950">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{step.description}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
