"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Utensils, BedDouble, MapPin } from "lucide-react";
import type { ItineraryDay } from "@/types";
import { cn } from "@/lib/utils";

/** Vertical day-wise itinerary with expandable days. */
export function ItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number[]>([1]);
  const toggle = (d: number) => setOpen((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  return (
    <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:h-full before:w-px before:bg-border">
      {days.map((day) => {
        const isOpen = open.includes(day.day);
        return (
          <li key={day.day} className="relative pl-14">
            <span className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-primary-600 font-heading text-sm font-bold text-white shadow-soft">
              {day.day}
            </span>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => toggle(day.day)} className="flex w-full items-center justify-between gap-3 p-4 text-left" aria-expanded={isOpen}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-600 dark:text-secondary-300">Day {day.day}</p>
                  <h4 className="font-heading text-base font-semibold">{day.title}</h4>
                </div>
                <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="border-t border-border p-4 pt-3">
                      <p className="text-sm leading-relaxed text-muted-foreground">{day.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs">
                        {day.meals.length > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium">
                            <Utensils className="size-3.5 text-secondary-500" /> {day.meals.join(", ")}
                          </span>
                        )}
                        {day.stay && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium">
                            <BedDouble className="size-3.5 text-secondary-500" /> {day.stay}
                          </span>
                        )}
                        {day.activities.map((a) => (
                          <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium">
                            <MapPin className="size-3.5 text-secondary-500" /> {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
