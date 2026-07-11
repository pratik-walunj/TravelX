"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowUp, MessageCircle, X, Headphones } from "lucide-react";
import { siteConfig, whatsappLink } from "@/constants/site";
import { cn } from "@/lib/utils";

/** Floating WhatsApp + call + back-to-top cluster, present on every page. */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-card backdrop-blur transition-colors hover:bg-muted"
          >
            <ArrowUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex flex-col items-end gap-2"
          >
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-105"
            >
              <Phone className="size-4" /> Call us
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-105"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((e) => !e)}
        aria-label={expanded ? "Close contact options" : "Open contact options"}
        aria-expanded={expanded}
        className={cn(
          "relative inline-flex size-14 items-center justify-center rounded-full text-white shadow-glow transition-all hover:scale-105",
          expanded ? "bg-primary-700" : "bg-hero-gradient bg-[length:200%_200%]",
        )}
      >
        {!expanded && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-secondary-500/60" />
        )}
        {expanded ? <X className="size-6" /> : <Headphones className="relative size-6" />}
      </button>
    </div>
  );
}
