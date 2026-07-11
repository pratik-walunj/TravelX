"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { recentBookings } from "@/data/offers";

/** Rotating "someone just booked" proof popup, bottom-left. */
export function RecentBookingPopup() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let timeout: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setShow(true);
      timeout = setTimeout(() => {
        setShow(false);
        timeout = setTimeout(() => {
          setIndex((i) => (i + 1) % recentBookings.length);
          cycle();
        }, 4000);
      }, 5000);
    };
    const start = setTimeout(cycle, 3500);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [dismissed]);

  if (dismissed) return null;
  const booking = recentBookings[index];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -40 }}
          className="fixed bottom-5 left-4 z-40 hidden max-w-xs items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 pr-9 shadow-card backdrop-blur-xl sm:flex"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{booking.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              Booked <span className="font-medium text-foreground">{booking.pkg}</span>
            </p>
            <p className="text-[11px] text-muted-foreground">{booking.time}</p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
