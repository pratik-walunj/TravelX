"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { announcements } from "@/constants/site";

/** Rotating promotional strip above the header. Dismissible per session. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;
  const current = announcements[index];

  return (
    <div className="relative overflow-hidden bg-hero-gradient bg-[length:200%_200%] text-white">
      <div className="container flex h-10 items-center justify-center gap-2 text-center text-xs sm:text-sm">
        <Sparkles className="hidden size-4 shrink-0 text-accent-300 sm:block" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <Link href={current.href} className="font-medium hover:underline">
              {current.text}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
