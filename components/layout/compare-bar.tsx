"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompareArrows, X, ArrowRight } from "lucide-react";
import { useCompare } from "@/hooks/use-collection";
import { packages } from "@/data/packages";
import { Button, ButtonLink } from "@/components/ui/button";

/** Sticky bottom tray that appears when packages are queued for comparison. */
export function CompareBar() {
  const { ids, remove, clear, hydrated } = useCompare();
  if (!hydrated || ids.length === 0) return null;

  const items = ids
    .map((id) => packages.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl"
      >
        <div className="container flex items-center gap-4 py-3">
          <div className="hidden items-center gap-2 text-sm font-semibold sm:flex">
            <GitCompareArrows className="size-5 text-primary-600" />
            Compare ({items.length}/4)
          </div>
          <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
            {items.map(
              (p) =>
                p && (
                  <div
                    key={p.id}
                    className="group relative flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card p-1.5 pr-3"
                  >
                    <Image src={p.image} alt={p.title} width={40} height={40} className="size-10 rounded-lg object-cover" />
                    <span className="max-w-[120px] truncate text-xs font-medium">{p.title}</span>
                    <button
                      onClick={() => remove(p.id)}
                      aria-label={`Remove ${p.title}`}
                      className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ),
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="sm" onClick={clear} className="hidden sm:inline-flex">
              Clear
            </Button>
            <ButtonLink href="/compare" variant="primary" size="md">
              Compare <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
