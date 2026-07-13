import type { BlogPost } from "@/types";
import blogsJson from "./cms/blogs.json";

/**
 * Blog posts — sourced from the CMS (content/blog/*, edited at /keystatic).
 * Regenerate this data after editing content with `npm run cms:sync`.
 */
export const blogPosts = blogsJson as unknown as BlogPost[];

export const getBlogBySlug = (slug: string) => blogPosts.find((b) => b.slug === slug);
export const featuredBlogs = blogPosts.filter((b) => b.featured);
export const blogCategories = Array.from(new Set(blogPosts.map((b) => b.category)));
export const relatedBlogs = (post: BlogPost, count = 3) =>
  blogPosts.filter((b) => b.id !== post.id && b.category === post.category).slice(0, count);
