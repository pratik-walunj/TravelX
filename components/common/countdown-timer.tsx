"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function diff(target: string) {
  const ms = new Date(target).getTime() - Date.now();
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped % 86400000) / 3600000),
    minutes: Math.floor((clamped % 3600000) / 60000),
    seconds: Math.floor((clamped % 60000) / 1000),
    done: ms <= 0,
  };
}

/** Live countdown to a target ISO date. Renders after mount (hydration-safe). */
export function CountdownTimer({
  target,
  className,
  compact,
}: {
  target: string;
  className?: string;
  compact?: boolean;
}) {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) return null;
  if (t.done) return <span className={cn("text-sm font-semibold", className)}>Offer ended</span>;

  const units = [
    { v: t.days, l: "d" },
    { v: t.hours, l: "h" },
    { v: t.minutes, l: "m" },
    { v: t.seconds, l: "s" },
  ];

  if (compact) {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums", className)}>
        <Clock className="size-4" />
        {units.map((u) => `${String(u.v).padStart(2, "0")}${u.l}`).join(" ")}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {units.map((u, i) => (
        <div key={u.l} className="flex items-center gap-1.5">
          <div className="flex min-w-[2.75rem] flex-col items-center rounded-lg bg-white/15 px-2 py-1 backdrop-blur">
            <span className="font-heading text-lg font-bold tabular-nums leading-none">
              {String(u.v).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase opacity-70">{u.l}</span>
          </div>
          {i < units.length - 1 && <span className="opacity-50">:</span>}
        </div>
      ))}
    </div>
  );
}
