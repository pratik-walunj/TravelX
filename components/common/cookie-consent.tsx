"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const KEY = "travelx:cookie-consent";

/** GDPR-style cookie consent banner, persisted in localStorage. */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed inset-x-4 bottom-4 z-[45] mx-auto max-w-lg rounded-3xl border border-border bg-background/95 p-5 shadow-glow backdrop-blur-xl sm:left-6 sm:right-auto"
        >
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600">
              <Cookie className="size-5" />
            </span>
            <div className="flex-1">
              <p className="font-heading font-semibold">We value your privacy</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We use cookies to enhance your experience and analyse traffic. See our{" "}
                <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="primary" onClick={() => decide("accepted")}>Accept all</Button>
                <Button size="sm" variant="ghost" onClick={() => decide("declined")}>Decline</Button>
              </div>
            </div>
            <button onClick={() => setShow(false)} aria-label="Dismiss" className="rounded-full p-1 text-muted-foreground hover:bg-muted">
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
