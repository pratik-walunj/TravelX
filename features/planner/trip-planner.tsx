"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Wand2, MapPin, Calendar, Users, Wallet, Check, RotateCcw, Loader2, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { Button, ButtonLink } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const interests = ["Beaches", "Mountains", "Culture", "Food", "Adventure", "Wildlife", "Nightlife", "Wellness", "Shopping", "Photography"];
const paces = ["Relaxed", "Balanced", "Packed"];

/** AI-style trip planner — a guided form that assembles a suggested plan from data. */
export function TripPlanner() {
  const [dest, setDest] = useState(destinations[10].slug);
  const [days, setDays] = useState(6);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("mid");
  const [pace, setPace] = useState("Balanced");
  const [selected, setSelected] = useState<string[]>(["Beaches", "Food"]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | ReturnType<typeof buildPlan>>(null);

  const toggle = (x: string) => setSelected((p) => (p.includes(x) ? p.filter((i) => i !== x) : [...p, x]));

  const generate = () => {
    setLoading(true);
    setResult(null);
    // TODO(AI): call your LLM/itinerary endpoint here. We synthesise from mock data.
    setTimeout(() => {
      setResult(buildPlan(dest, days, travelers, budget, pace, selected));
      setLoading(false);
    }, 1400);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* Form */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-hero-gradient text-white"><Wand2 className="size-5" /></span>
          <div>
            <h3 className="font-heading text-lg font-bold">Trip Planner</h3>
            <p className="text-xs text-muted-foreground">Tell us your dream, we&apos;ll draft the plan</p>
          </div>
        </div>

        <div className="space-y-5">
          <Row icon={<MapPin className="size-4" />} label="Destination">
            <Select value={dest} onChange={(e) => setDest(e.target.value)}>
              {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}, {d.country}</option>)}
            </Select>
          </Row>

          <div className="grid grid-cols-2 gap-4">
            <Row icon={<Calendar className="size-4" />} label={`Days: ${days}`}>
              <input type="range" min={2} max={14} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-primary-600" />
            </Row>
            <Row icon={<Users className="size-4" />} label={`Travellers: ${travelers}`}>
              <input type="range" min={1} max={10} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full accent-primary-600" />
            </Row>
          </div>

          <Row icon={<Wallet className="size-4" />} label="Budget">
            <div className="flex gap-2">
              {[["budget", "Budget"], ["mid", "Comfort"], ["luxury", "Luxury"]].map(([v, l]) => (
                <button key={v} onClick={() => setBudget(v)} className={cn("flex-1 rounded-xl border py-2 text-sm font-medium transition-colors", budget === v ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted")}>{l}</button>
              ))}
            </div>
          </Row>

          <Row icon={<Sparkles className="size-4" />} label="Pace">
            <div className="flex gap-2">
              {paces.map((p) => (
                <button key={p} onClick={() => setPace(p)} className={cn("flex-1 rounded-xl border py-2 text-sm font-medium transition-colors", pace === p ? "border-secondary-500 bg-secondary-500 text-white" : "border-border hover:bg-muted")}>{p}</button>
              ))}
            </div>
          </Row>

          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><Sparkles className="size-4 text-secondary-500" /> Interests</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <button key={i} onClick={() => toggle(i)} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition-colors", selected.includes(i) ? "border-accent-500 bg-accent-500 text-accent-950" : "border-border hover:bg-muted")}>{i}</button>
              ))}
            </div>
          </div>

          <Button onClick={generate} variant="gradient" size="lg" className="w-full" loading={loading}>
            {!loading && <Sparkles className="size-5" />} Generate my trip
          </Button>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <Loader2 className="size-10 animate-spin text-primary-600" />
              <p className="font-heading font-semibold">Crafting your perfect trip…</p>
              <p className="text-sm text-muted-foreground">Matching destinations, pacing and your interests</p>
            </motion.div>
          ) : result ? (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="eyebrow">Your draft plan</span>
                  <h3 className="mt-2 font-heading text-2xl font-bold">{result.title}</h3>
                </div>
                <button onClick={() => setResult(null)} className="rounded-full border border-border p-2 hover:bg-muted" aria-label="Reset"><RotateCcw className="size-4" /></button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>

              <ol className="mt-5 space-y-2.5">
                {result.itinerary.map((it) => (
                  <li key={it.day} className="flex gap-3 rounded-2xl border border-border bg-card p-3.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">{it.day}</span>
                    <div>
                      <p className="text-sm font-semibold">{it.title}</p>
                      <p className="text-xs text-muted-foreground">{it.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-card p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated total ({travelers} travellers)</p>
                  <p className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-300">{formatCurrency(result.estimate)}</p>
                </div>
                <ul className="hidden text-right text-xs text-muted-foreground sm:block">
                  {result.interests.map((i) => <li key={i} className="flex items-center justify-end gap-1"><Check className="size-3 text-success" /> {i}</li>)}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {result.matchedPackage && <ButtonLink href={`/tour-packages/${result.matchedPackage}`} variant="primary">View matching package <ArrowRight className="size-4" /></ButtonLink>}
                <ButtonLink href="/contact" variant="outline">Refine with an expert</ButtonLink>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">This is an AI-assisted draft. <Link href="/contact" className="underline">Talk to a designer</Link> to finalise every detail.</p>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-300"><Wand2 className="size-8" /></span>
              <p className="font-heading text-lg font-semibold">Your plan will appear here</p>
              <p className="max-w-xs text-sm text-muted-foreground">Fill in your preferences and hit &ldquo;Generate my trip&rdquo; to see a tailored draft itinerary.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground"><span className="text-secondary-500">{icon}</span> {label}</p>
      {children}
    </div>
  );
}

function buildPlan(destSlug: string, days: number, travelers: number, budget: string, pace: string, interests: string[]) {
  const d = destinations.find((x) => x.slug === destSlug)!;
  const pkgs = getPackagesByDestination(destSlug);
  const perDay = budget === "luxury" ? 22000 : budget === "mid" ? 12000 : 6500;
  const estimate = perDay * days * travelers;
  const acts = [...d.activities, ...d.highlights];
  const itinerary = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    title: i === 0 ? `Arrive in ${d.name}` : i === days - 1 ? `Departure day` : `${acts[i % acts.length]}`,
    detail: i === 0 ? "Airport transfer, check-in and a relaxed evening." : i === days - 1 ? "Souvenir shopping and transfer to airport." : `Enjoy ${acts[i % acts.length].toLowerCase()} at a ${pace.toLowerCase()} pace.`,
  }));
  return {
    title: `${days}-Day ${d.name} ${budget === "luxury" ? "Luxury" : budget === "mid" ? "Comfort" : "Smart"} Escape`,
    summary: `A ${pace.toLowerCase()}-paced ${days}-day trip to ${d.name} for ${travelers} ${travelers === 1 ? "traveller" : "travellers"}, built around ${interests.slice(0, 3).join(", ").toLowerCase() || "your interests"}.`,
    itinerary,
    estimate,
    interests: interests.length ? interests : ["Sightseeing"],
    matchedPackage: pkgs[0]?.slug,
  };
}
