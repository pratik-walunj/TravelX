import type { Metadata } from "next";
import { travelImages } from "@/data/images";
import { destinations } from "@/data/destinations";
import { PageHero } from "@/components/common/page-hero";
import { GalleryMasonry } from "@/features/gallery/gallery-masonry";

export const metadata: Metadata = {
  title: "Gallery — Moments from Our Travellers",
  description: "A visual journey through the destinations, experiences and moments captured by TravelX travellers around the world.",
  alternates: { canonical: "/gallery" },
};

const cats = ["Beaches", "Mountains", "Cities", "Culture", "Wildlife", "Adventure"];

export default function GalleryPage() {
  // Build a gallery feed from destination galleries + curated travel images.
  const items = [
    ...destinations.slice(0, 24).map((d, i) => ({ src: d.image, category: cats[i % cats.length], caption: `${d.name}, ${d.country}` })),
    ...travelImages.map((src, i) => ({ src, category: cats[(i + 2) % cats.length], caption: "TravelX moment" })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Visual Stories"
        title="Gallery"
        description="A glimpse of the unforgettable moments and stunning places our travellers experience."
        image="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Gallery" }]}
      />
      <GalleryMasonry items={items} categories={cats} />
    </>
  );
}
