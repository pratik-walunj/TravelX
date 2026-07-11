import { stats } from "@/data/stats";
import { Icon } from "@/components/common/icon";
import { Counter } from "@/components/common/counter";
import { Reveal } from "@/components/common/reveal";

/** Bold gradient band with animated headline numbers. */
export function StatsCounter() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient bg-[length:200%_200%] py-16 lg:py-20">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="container relative">
        <div className="grid grid-cols-2 gap-8 text-center text-white md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="flex flex-col items-center">
              <span className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                <Icon name={s.icon} className="size-6" />
              </span>
              <div className="font-heading text-3xl font-bold sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <p className="mt-1 text-sm text-white/80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
