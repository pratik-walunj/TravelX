"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Sparkles, PlayCircle, MapPin } from "lucide-react";
import { SearchWidget } from "@/components/forms/search-widget";
import { RecentBookingPopup } from "@/components/common/recent-booking-popup";
import { ButtonLink } from "@/components/ui/button";

const words = ["Unforgettable", "Extraordinary", "Effortless", "Once-in-a-lifetime"];

export function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[92svh] flex-col overflow-hidden lg:-mt-[72px]">
      {/*
        Background: static image for now. To use a video, drop /public/hero.mp4
        and uncomment the <video> block below — the poster keeps LCP fast.
      */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
          alt="Aerial view of a tropical beach with turquoise water"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover"
        />
        {/* <video autoPlay muted loop playsInline poster="/hero-poster.jpg" className="size-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video> */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/45 to-primary-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/60 to-transparent" />
      </div>

      {/* Flex column: headline block grows to fill, search widget sits in
          normal flow at the bottom — no absolute overflow, so nothing clips. */}
      <div className="container relative z-10 flex flex-1 flex-col pb-8 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
          >
            <Sparkles className="size-4 text-accent-300" />
            Rated 4.9/5 by 148,000+ happy travellers
          </motion.div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            <span className="block">Craft your</span>
            <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  className="absolute left-0 bg-gradient-to-r from-accent-300 via-secondary-300 to-secondary-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: ["100%", "0%", "0%", "-100%"],
                  }}
                  transition={{
                    duration: 4,
                    times: [0, 0.1, 0.9, 1],
                    repeat: Infinity,
                    delay: i * 4,
                    repeatDelay: (words.length - 1) * 4,
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block">journey with TravelX</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-xl text-lg text-white/85"
          >
            Handcrafted domestic & international holidays — luxury escapes, adventures and honeymoons, with 24/7 concierge and a best-price promise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/tour-packages" variant="accent" size="lg">
              Explore Packages
            </ButtonLink>
            <ButtonLink href="/videos" variant="glass" size="lg">
              <PlayCircle className="size-5" /> Watch Film
            </ButtonLink>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-secondary-300" /> 100% Secure Booking
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-accent-300 text-accent-300" /> Best Price Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-secondary-300" /> 320+ Destinations
            </span>
          </motion.div>
        </div>

        {/* Floating stat cards */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <FloatingCard
            className="ml-auto"
            delay={0.4}
            title="Maldives Escape"
            subtitle="5 Days · Overwater villa"
            badge="₹89,999"
          />
          <FloatingCard
            className="mt-6 max-w-xs"
            delay={0.6}
            title="4.9 ★ Avg. Rating"
            subtitle="From 9,600+ verified reviews"
            badge="Trusted"
          />
        </div>
      </div>

        {/* Search widget — in normal flow at the bottom of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-20 mt-8"
        >
          <SearchWidget className="mx-auto max-w-5xl" />
        </motion.div>
      </div>

      <RecentBookingPopup />
    </section>
  );
}

function FloatingCard({
  title,
  subtitle,
  badge,
  className,
  delay,
}: {
  title: string;
  subtitle: string;
  badge: string;
  className?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      <div className="animate-float rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-heading font-semibold">{title}</p>
            <p className="text-sm text-white/75">{subtitle}</p>
          </div>
          <span className="rounded-full bg-accent-500 px-3 py-1 text-sm font-bold text-accent-950">
            {badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
