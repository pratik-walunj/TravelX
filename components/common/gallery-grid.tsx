"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

/** Responsive photo gallery with a keyboard-navigable lightbox. */
export function GalleryGrid({ images, alt }: { images: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = (i: number) => { setIndex(i); setOpen(true); };
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl sm:h-[440px]">
        <button onClick={() => show(0)} className="group relative col-span-4 row-span-2 sm:col-span-2">
          <Image src={images[0]} alt={alt} fill sizes="(max-width:640px) 100vw, 50vw" priority className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            <Expand className="size-3.5" /> View all {images.length} photos
          </span>
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button key={i} onClick={() => show(i + 1)} className="group relative hidden sm:block">
            <Image src={img} alt={`${alt} ${i + 2}`} fill sizes="25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpen(false)}
          >
            <button aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={() => setOpen(false)}>
              <X className="size-6" />
            </button>
            <button aria-label="Previous" className="absolute left-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); prev(); }}>
              <ChevronLeft className="size-6" />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="relative h-[70vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[index]} alt={`${alt} ${index + 1}`} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <button aria-label="Next" className="absolute right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); next(); }}>
              <ChevronRight className="size-6" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white">
              {index + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
