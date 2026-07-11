import { PageHero } from "@/components/common/page-hero";
import type { Crumb } from "@/components/common/breadcrumb";

export interface LegalSection {
  heading: string;
  body: string[];
}

/** Reusable template for policy / legal pages with an anchor list. */
export function LegalPage({
  title, updated, intro, sections, breadcrumbs,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  breadcrumbs: Crumb[];
}) {
  return (
    <>
      <PageHero title={title} eyebrow="Legal" description={`Last updated: ${updated}`} breadcrumbs={breadcrumbs} size="sm" image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80" />
      <div className="container section-tight">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">On this page</p>
              {sections.map((s, i) => (
                <a key={i} href={`#sec-${i}`} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  {s.heading}
                </a>
              ))}
            </nav>
          </aside>

          <article className="max-w-3xl">
            <p className="text-lg leading-relaxed text-muted-foreground">{intro}</p>
            <div className="mt-8 space-y-10">
              {sections.map((s, i) => (
                <section key={i} id={`sec-${i}`} className="scroll-mt-28">
                  <h2 className="font-heading text-xl font-bold sm:text-2xl">{i + 1}. {s.heading}</h2>
                  <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                    {s.body.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
