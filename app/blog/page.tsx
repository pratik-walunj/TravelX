import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts, blogCategories, featuredBlogs } from "@/data/blogs";
import { PageHero } from "@/components/common/page-hero";
import { BlogExplorer } from "@/features/blog/blog-explorer";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Travel Blog — Guides, Tips & Inspiration",
  description: "Expert travel guides, destination deep-dives and practical tips from the TravelX team to fuel your next adventure.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const hero = featuredBlogs[0];
  const secondary = featuredBlogs.slice(1, 4);

  return (
    <>
      <PageHero
        eyebrow="Travel Journal"
        title="Stories & guides"
        description="Inspiration, insider tips and destination deep-dives from our travel experts."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Blog" }]}
      />

      {/* Featured */}
      <div className="container section-tight">
        <div className="grid gap-6 lg:grid-cols-2">
          <Link href={`/blog/${hero.slug}`} className="group relative flex min-h-[360px] items-end overflow-hidden rounded-3xl p-7 text-white shadow-card">
            <Image src={hero.cover} alt={hero.title} fill sizes="(max-width:1024px) 100vw, 50vw" priority className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative">
              <Badge variant="accent" className="mb-3">Featured · {hero.category}</Badge>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">{hero.title}</h2>
              <p className="mt-2 line-clamp-2 max-w-lg text-white/85">{hero.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>

          <div className="grid gap-4">
            {secondary.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group grid grid-cols-[120px_1fr] gap-4 overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-soft transition-shadow hover:shadow-card sm:grid-cols-[160px_1fr]">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image src={p.cover} alt={p.title} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-1">
                  <Badge variant="muted" className="w-fit">{p.category}</Badge>
                  <h3 className="mt-2 line-clamp-2 font-heading font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-300">{p.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground"><Clock className="size-3.5" /> {p.readingMinutes} min · {formatDate(p.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <BlogExplorer posts={blogPosts} categories={blogCategories} />
    </>
  );
}
