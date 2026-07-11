import { partners } from "@/data/stats";

/** Marquee-style trusted partners strip. */
export function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <section className="border-y border-border bg-background py-10">
      <div className="container">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by the world&apos;s leading travel brands
        </p>
        <div className="relative overflow-hidden mask-fade-r">
          <ul className="flex w-max animate-marquee items-center gap-12">
            {doubled.map((p, i) => (
              <li
                key={`${p}-${i}`}
                className="whitespace-nowrap font-heading text-xl font-bold text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
