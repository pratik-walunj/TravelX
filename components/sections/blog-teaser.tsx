import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogs";
import { BlogCard } from "@/components/cards/blog-card";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/common/reveal";

export function BlogTeaser() {
  const posts = blogPosts.slice(0, 3);
  return (
    <section className="section">
      <div className="container">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Travel Journal"
              title="Stories, guides & inspiration"
              description="Expert tips and destination deep-dives to fuel your wanderlust."
              align="left"
            />
          </Reveal>
          <Link href="/blog" className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white">
            All articles <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <RevealStagger className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <RevealItem key={p.id}>
              <BlogCard post={p} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
