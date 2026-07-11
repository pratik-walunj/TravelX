import Image from "next/image";
import { Instagram, Heart } from "lucide-react";
import { instagramFeed } from "@/data/offers";
import { siteConfig } from "@/constants/site";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";

export function InstagramGallery() {
  return (
    <section className="section bg-muted/40">
      <div className="container">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="@travelx"
            title="Follow the journey"
            description="Tag #TravelXMoments to be featured. Real trips, real travellers."
          />
        </Reveal>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
          {instagramFeed.map((post) => (
            <a
              key={post.id}
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={post.image}
                alt="TravelX Instagram post"
                fill
                sizes="(max-width:768px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-primary-950/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="size-6 text-white" />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
                  <Heart className="size-4 fill-white" /> {post.likes.toLocaleString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
