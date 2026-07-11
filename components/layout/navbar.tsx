"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Search, Phone } from "lucide-react";
import { mainNav, siteConfig, whatsappLink } from "@/constants/site";
import type { NavGroup } from "@/types";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-collection";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { count } = useWishlist();
  const mounted = useMounted();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent overlay only at the very top of the homepage hero.
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-border bg-background/80 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/70",
      )}
      // Close the mega menu only when the cursor leaves the whole header
      // (nav + panel). Keeping this on the <header> — not the <nav> — is what
      // lets you move down into the dropdown without it closing.
      onMouseLeave={() => setOpenMenu(null)}
    >
      <nav className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo inverted={transparent} />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((group) => (
            <NavGroupItem
              key={group.label}
              group={group}
              transparent={transparent}
              open={openMenu === group.label}
              onOpen={() => setOpenMenu(group.label)}
            />
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className={cn(
              "hidden size-10 items-center justify-center rounded-full transition-colors sm:inline-flex",
              transparent ? "text-white hover:bg-white/15" : "text-foreground hover:bg-muted",
            )}
          >
            <Search className="size-5" />
          </Link>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={cn(
              "relative hidden size-10 items-center justify-center rounded-full transition-colors sm:inline-flex",
              transparent ? "text-white hover:bg-white/15" : "text-foreground hover:bg-muted",
            )}
          >
            <Heart className="size-5" />
            {mounted && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          <div className={cn(transparent && "[&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:text-white [&_button:hover]:bg-white/20")}>
            <ThemeToggle />
          </div>

          <a
            href={siteConfig.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:inline-flex",
              transparent ? "text-white hover:bg-white/15" : "text-foreground hover:bg-muted",
            )}
          >
            <Phone className="size-4" /> {siteConfig.phone}
          </a>

          <ButtonLink href={whatsappLink()} variant="gradient" size="md" className="hidden sm:inline-flex">
            Enquire Now
          </ButtonLink>

          <MobileNav transparent={transparent} />
        </div>
      </nav>

      {/* Mega menu panel */}
      <AnimatePresence>
        {openMenu && (
          <MegaMenu
            group={mainNav.find((g) => g.label === openMenu)!}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function NavGroupItem({
  group,
  transparent,
  open,
  onOpen,
}: {
  group: NavGroup;
  transparent: boolean;
  open: boolean;
  onOpen: () => void;
}) {
  const hasMenu = !!group.columns?.length;
  const base = cn(
    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
    transparent
      ? "text-white/90 hover:bg-white/15 hover:text-white"
      : "text-foreground/80 hover:bg-muted hover:text-foreground",
    open && (transparent ? "bg-white/15 text-white" : "bg-muted text-foreground"),
  );

  if (!hasMenu) {
    return (
      <li>
        <Link href={group.href ?? "#"} className={base} onMouseEnter={onOpen}>
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button className={base} onMouseEnter={onOpen} aria-expanded={open}>
        {group.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
    </li>
  );
}

function MegaMenu({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      // pt-2 acts as an invisible hover "bridge" between the trigger and the
      // panel so the cursor never crosses a dead zone that would close it.
      className="absolute inset-x-0 top-full hidden pt-2 lg:block"
    >
      <div className="container">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-popover/95 p-6 shadow-glow backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-6">
            {group.columns?.map((col) => (
              <div key={col.heading}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {col.heading}
                </p>
                <ul className="space-y-1">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-start gap-2 rounded-xl p-2.5 transition-colors hover:bg-muted",
                          item.featured && "bg-secondary-500/10 text-secondary-700 dark:text-secondary-300",
                        )}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{item.label}</p>
                          {item.description && (
                            <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
