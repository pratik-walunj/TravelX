import type { Metadata } from "next";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { travelImages } from "@/data/images";
import { Badge } from "@/components/ui/badge";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Travel Videos — See Destinations in Motion",
  description: "Watch destination films, traveller stories and trip highlights from TravelX journeys around the world.",
  alternates: { canonical: "/videos" },
};

const videos = [
  { title: "Maldives: A Week in Paradise", duration: "4:12", category: "Destination", img: travelImages[12] },
  { title: "Riding Through Ladakh", duration: "6:38", category: "Adventure", img: travelImages[17] },
  { title: "Switzerland by Rail", duration: "5:24", category: "Destination", img: travelImages[9] },
  { title: "A Kerala Backwater Journey", duration: "3:57", category: "Destination", img: travelImages[0] },
  { title: "Honeymoon in Bali", duration: "4:45", category: "Honeymoon", img: travelImages[15] },
  { title: "Traveller Stories: The Sharma Family", duration: "2:30", category: "Story", img: travelImages[16] },
  { title: "Dubai in 60 Seconds", duration: "1:02", category: "Destination", img: travelImages[3] },
  { title: "Why Travel With TravelX", duration: "2:15", category: "About", img: travelImages[10] },
];

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Watch & Wander"
        title="Travel videos"
        description="Get inspired with destination films and real traveller stories."
        image="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Videos" }]}
      />
      <div className="container section-tight">
        {/* Featured video */}
        <div className="group relative mb-10 aspect-video overflow-hidden rounded-3xl shadow-card">
          <Image src={videos[0].img} alt={videos[0].title} fill priority sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <PlayCircle className="size-20 text-white/90 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute bottom-6 left-6 text-white">
            <Badge variant="accent" className="mb-2">Featured</Badge>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{videos[0].title}</h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(1).map((v) => (
            <button key={v.title} className="group text-left">
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-soft">
                <Image src={v.img} alt={v.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <PlayCircle className="size-14 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">{v.duration}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="muted">{v.category}</Badge>
              </div>
              <h3 className="mt-1.5 font-heading font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-300">{v.title}</h3>
            </button>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
