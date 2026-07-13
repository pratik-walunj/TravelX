import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0F4C81",
    // NOTE: add /public/icon-192.png and /public/icon-512.png, then restore the
    // `icons` array here to enable full PWA install icons. Omitted for now so the
    // browser doesn't 404 on missing files.
  };
}
