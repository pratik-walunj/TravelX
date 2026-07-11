"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { mainNav, siteConfig, whatsappLink } from "@/constants/site";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileNav({ transparent }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Close on route change + lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
          transparent ? "text-white hover:bg-white/15" : "text-foreground hover:bg-muted",
        )}
      >
        <Menu className="size-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-background shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                  {mainNav.map((group) => {
                    const hasMenu = !!group.columns?.length;
                    const isOpen = expanded === group.label;
                    if (!hasMenu) {
                      return (
                        <li key={group.label}>
                          <Link
                            href={group.href ?? "#"}
                            className="block rounded-xl px-3 py-3 font-medium hover:bg-muted"
                          >
                            {group.label}
                          </Link>
                        </li>
                      );
                    }
                    return (
                      <li key={group.label}>
                        <button
                          onClick={() => setExpanded(isOpen ? null : group.label)}
                          className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-medium hover:bg-muted"
                          aria-expanded={isOpen}
                        >
                          {group.label}
                          <ChevronDown className={cn("size-5 transition-transform", isOpen && "rotate-180")} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              {group.columns?.map((col) => (
                                <div key={col.heading} className="py-2">
                                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    {col.heading}
                                  </p>
                                  {col.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="space-y-3 border-t border-border p-5">
                <ButtonLink href={whatsappLink()} variant="gradient" className="w-full">
                  <MessageCircle className="size-4" /> Enquire on WhatsApp
                </ButtonLink>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold hover:bg-muted"
                >
                  <Phone className="size-4" /> {siteConfig.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
