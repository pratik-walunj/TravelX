"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { FaqItem } from "@/types";
import { Accordion } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/common/empty-state";
import { cn } from "@/lib/utils";

export function FaqExplorer({ faqs, categories }: { faqs: FaqItem[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      faqs.filter((f) => {
        if (active !== "All" && f.category !== active) return false;
        if (query && !`${f.question} ${f.answer}`.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [faqs, active, query],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      {/* Category rail */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-4 lg:hidden">
          <Input placeholder="Search FAQs…" value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search />} />
        </div>
        <nav className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded-xl",
                active === c ? "bg-primary-600 text-white" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </nav>
      </aside>

      <div>
        <div className="mb-6 hidden lg:block">
          <Input placeholder="Search questions…" value={query} onChange={(e) => setQuery(e.target.value)} icon={<Search />} className="h-12" />
        </div>
        {filtered.length === 0 ? (
          <EmptyState title="No matching questions" description="Try different keywords or browse another category." />
        ) : (
          <Accordion items={filtered.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
        )}
      </div>
    </div>
  );
}
