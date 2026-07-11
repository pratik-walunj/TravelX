import { featuredDestinations, trendingDestinations } from "@/data/destinations";
import { DestinationCard } from "@/components/cards/destination-card";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";
import { ButtonLink } from "@/components/ui/button";

/** Bento-style grid of the most-loved destinations. */
export function PopularDestinations() {
  const list = [...featuredDestinations, ...trendingDestinations]
    .filter((d, i, arr) => arr.findIndex((x) => x.id === d.id) === i)
    .slice(0, 8);

  return (
    <section className="section">
      <div className="container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="Popular Destinations"
            title="Where will you go next?"
            description="From tropical islands to alpine peaks — explore the destinations our travellers love the most."
          />
        </Reveal>

        <RevealStagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {list.map((d, i) => (
            <RevealItem
              key={d.id}
              className={i === 0 || i === 5 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <DestinationCard
                destination={d}
                size={i === 0 || i === 5 ? "tall" : "default"}
                className={i === 0 || i === 5 ? "h-full min-h-[280px]" : ""}
                priority={i < 2}
              />
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-10 text-center">
          <ButtonLink href="/destinations" variant="outline" size="lg">
            Explore all 50+ destinations
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
