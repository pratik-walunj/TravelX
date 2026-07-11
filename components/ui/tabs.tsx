"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
  listClassName?: string;
}

/** Animated underline tabs. */
export function Tabs({ items, defaultValue, className, listClassName }: TabsProps) {
  const [active, setActive] = React.useState(defaultValue ?? items[0]?.value);
  const id = React.useId();

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn(
          "no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-border bg-muted/50 p-1",
          listClassName,
        )}
      >
        {items.map((item) => {
          const selected = active === item.value;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(item.value)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                selected
                  ? "text-primary-700 dark:text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`tab-${id}`}
                  className="absolute inset-0 rounded-full bg-card shadow-soft"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {items.map(
          (item) =>
            active === item.value && (
              <motion.div
                key={item.value}
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.content}
              </motion.div>
            ),
        )}
      </div>
    </div>
  );
}
