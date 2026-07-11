import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { blogPosts, getBlogBySlug, relatedBlogs } from "@/data/blogs";
import { PageHero } from "@/components/common/page-hero";
import { BlogCard } from "@/components/cards/blog-card";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/components/common/share-button";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { JsonLd, breadcrumbSchema } from "@/components/common/json-ld";
import { siteConfig } from "@/constants/site";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.cover], publishedTime: post.publishedAt },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const related = relatedBlogs(post, 3);
  const paragraphs = post.content.split("\n\n");
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.cover,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    description: post.excerpt,
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema([{ name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }])]} />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        image={post.cover}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
        size="lg"
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="inline-flex items-center gap-2">
            <Image src={post.author.avatar} alt={post.author.name} width={32} height={32} className="size-8 rounded-full object-cover ring-2 ring-white/40" />
            {post.author.name}
          </span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="size-4" /> {formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> {post.readingMinutes} min read</span>
        </div>
      </PageHero>

      <article className="container section-tight">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All articles</Link>
            <ShareButton title={post.title} />
          </div>

          <p className="text-lg font-medium leading-relaxed text-foreground">{post.excerpt}</p>

          <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
            {paragraphs.map((para, i) => (
              <div key={i}>
                {i === 2 && (
                  <h2 className="mb-3 mt-8 font-heading text-2xl font-bold text-foreground">What you need to know</h2>
                )}
                <p>{para}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => <Badge key={t} variant="muted">#{t}</Badge>)}
          </div>

          {/* Author card */}
          <div className="mt-10 flex items-center gap-4 rounded-3xl border border-border bg-card p-6">
            <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} className="size-16 rounded-full object-cover" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Written by</p>
              <p className="font-heading text-lg font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.author.role} at {siteConfig.name}</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-10 rounded-3xl border border-border bg-muted/40 p-6 text-center sm:p-8">
            <h3 className="font-heading text-xl font-bold">Enjoyed this? Get more in your inbox</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fresh guides and deals, no spam.</p>
            <div className="mx-auto mt-4 max-w-md"><NewsletterForm /></div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-muted/40">
          <div className="container">
            <h2 className="heading-lg mb-8 text-2xl">Related reads</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => <BlogCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
