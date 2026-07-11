"use client";

import { useState } from "react";
import type { BlogPost } from "@/types";
import { BlogCard } from "@/components/cards/blog-card";
import { cn } from "@/lib/utils";

export function BlogExplorer({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const [visible, setVisible] = useState(9);

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);
  const shown = filtered.slice(0, visible);

  return (
    <div className="container section-tight">
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => { setActive(c); setVisible(9); }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === c ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <BlogCard key={p.id} post={p} />)}
      </div>

      {visible < filtered.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setVisible((v) => v + 6)} className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary-600 hover:bg-primary-600 hover:text-white">
            Load more articles
          </button>
        </div>
      )}
    </div>
  );
}
