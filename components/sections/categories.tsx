import { tourCategories } from "@/constants/site";
import { CategoryCard } from "@/components/cards/category-card";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";

/** Browse-by-travel-style tiles. */
export function Categories() {
  return (
    <section className="section bg-muted/40">
      <div className="container">
        <Reveal className="mb-12">
          <SectionHeading
            eyebrow="Travel Your Way"
            title="Find your perfect trip style"
            description="However you like to travel, we have a curated collection for it."
          />
        </Reveal>
        <RevealStagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tourCategories.map((c) => (
            <RevealItem key={c.key}>
              <CategoryCard category={c} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
