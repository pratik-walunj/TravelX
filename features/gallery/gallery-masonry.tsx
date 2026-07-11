"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  src: string;
  category: string;
  caption: string;
}

export function GalleryMasonry({ items, categories }: { items: GalleryItem[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);
  const open = lightbox !== null;
  const prev = () => setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length));

  return (
    <div className="container section-tight">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === c ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {filtered.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            onClick={() => setLightbox(i)}
            className={cn("group relative block w-full overflow-hidden rounded-2xl", i % 3 === 0 ? "aspect-[3/4]" : "aspect-square")}
          >
            <Image src={item.src} alt={item.caption} fill sizes="(max-width:640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-1.5 text-xs font-medium text-white"><Expand className="size-3.5" /> {item.caption}</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
            <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={() => setLightbox(null)}><X className="size-6" /></button>
            <button aria-label="Previous" className="absolute left-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft className="size-6" /></button>
            <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[72vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <Image src={filtered[lightbox].src} alt={filtered[lightbox].caption} fill sizes="90vw" className="object-contain" />
              <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-white/80">{filtered[lightbox].caption}</p>
            </motion.div>
            <button aria-label="Next" className="absolute right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
