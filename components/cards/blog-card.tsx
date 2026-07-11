import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  className,
  featured,
}: {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      <Link href={href} className={cn("relative block overflow-hidden", featured ? "aspect-[16/10]" : "aspect-[16/10]")}>
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="glass" className="text-white">{post.category}</Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingMinutes} min read
          </span>
        </div>
        <h3 className="font-heading text-lg font-semibold leading-snug">
          <Link href={href} className="transition-colors hover:text-primary-600 dark:hover:text-primary-300">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-2">
            <Image src={post.author.avatar} alt={post.author.name} width={32} height={32} className="size-8 rounded-full object-cover" />
            <span className="text-xs font-medium">{post.author.name}</span>
          </div>
          <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-all hover:gap-2 dark:text-primary-300">
            Read <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
