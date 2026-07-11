import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { blogPosts } from "@/data/blogs";

/** Auto-generated sitemap covering static routes + all dynamic detail pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "", "/about", "/destinations", "/tour-packages", "/luxury-tours", "/adventure-tours",
    "/family-tours", "/honeymoon-tours", "/pilgrimage-tours", "/weekend-tours", "/group-tours",
    "/corporate-tours", "/custom-tour-planner", "/visa-services", "/travel-insurance",
    "/hotel-booking", "/flight-booking", "/transportation", "/gallery", "/videos",
    "/testimonials", "/faq", "/blog", "/contact", "/career", "/services",
    "/privacy-policy", "/refund-policy", "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const packageRoutes = packages.map((p) => ({
    url: `${base}/tour-packages/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...destinationRoutes, ...packageRoutes, ...blogRoutes];
}
