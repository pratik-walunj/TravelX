import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/cards/destination-card";
import { CarouselRail } from "@/components/common/carousel-rail";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";

/** Horizontal carousel of international destinations. */
export function DestinationCarousel() {
  const list = destinations.filter((d) => d.type === "international").slice(0, 12);
  return (
    <section className="section">
      <div className="container">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="International Escapes"
            title="Bucket-list destinations abroad"
            description="Cross borders in style with our curated international collections."
          />
        </Reveal>
        <CarouselRail>
          {list.map((d) => (
            <DestinationCard key={d.id} destination={d} className="h-full" />
          ))}
        </CarouselRail>
      </div>
    </section>
  );
}
