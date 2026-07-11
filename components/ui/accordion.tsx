"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  defaultOpen?: string[];
  className?: string;
}

/** Lightweight, animated, accessible accordion (no external UI dep). */
export function Accordion({
  items,
  type = "single",
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultOpen);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (type === "single") return isOpen ? [] : [id];
      return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-3xl border border-border bg-card", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id} className="px-5 sm:px-6">
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-heading text-base font-semibold transition-colors hover:text-primary-600 dark:hover:text-primary-300"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180 text-primary-600 dark:text-primary-300",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
