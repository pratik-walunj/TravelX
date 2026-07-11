"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar, Users, BedDouble, Sparkles, UserRound, CreditCard, CheckCircle2,
  Check, ChevronLeft, ChevronRight, Plane, ShieldCheck, Minus, Plus, Lock,
} from "lucide-react";
import type { TourPackage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDate, formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Dates", icon: Calendar },
  { id: 2, label: "Travellers", icon: Users },
  { id: 3, label: "Rooms", icon: BedDouble },
  { id: 4, label: "Extras", icon: Sparkles },
  { id: 5, label: "Details", icon: UserRound },
  { id: 6, label: "Payment", icon: CreditCard },
  { id: 7, label: "Done", icon: CheckCircle2 },
];

const roomTypes = [
  { id: "standard", name: "Standard Room", price: 0, desc: "Comfortable room with all essentials" },
  { id: "deluxe", name: "Deluxe Room", price: 4500, desc: "Upgraded room with a view" },
  { id: "suite", name: "Premium Suite", price: 12000, desc: "Spacious suite with lounge access" },
];

const extras = [
  { id: "insurance", name: "Travel Insurance", price: 1499, desc: "Medical + trip cancellation cover" },
  { id: "visa", name: "Visa Assistance", price: 2500, desc: "End-to-end visa processing" },
  { id: "transfers", name: "Private Airport Transfers", price: 1800, desc: "Door-to-door comfort" },
  { id: "photographer", name: "Photography Session", price: 6000, desc: "2-hour professional shoot" },
];

export function BookingWizard({ pkg, initialDate, initialTravelers }: { pkg: TourPackage; initialDate?: string; initialTravelers?: number }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(initialDate ?? pkg.availableDates[0]);
  const [city, setCity] = useState(pkg.departureCities[0]);
  const [adults, setAdults] = useState(initialTravelers ?? 2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState("standard");
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["insurance"]);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [processing, setProcessing] = useState(false);

  const travelers = adults + children;
  const roomCost = roomTypes.find((r) => r.id === room)?.price ?? 0;
  const extrasCost = extras.filter((e) => selectedExtras.includes(e.id)).reduce((s, e) => s + e.price, 0);
  const base = pkg.price * adults + Math.round(pkg.price * 0.6) * children;
  const taxes = Math.round((base + roomCost * travelers + extrasCost) * 0.05);
  const total = base + roomCost * travelers + extrasCost + taxes;

  const toggleExtra = (id: string) => setSelectedExtras((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const canProceed = useMemo(() => {
    if (step === 5) return lead.name.length > 1 && /\S+@\S+/.test(lead.email) && lead.phone.length > 7;
    return true;
  }, [step, lead]);

  const next = () => {
    if (step === 6) {
      setProcessing(true);
      // TODO(backend): create booking + initiate payment gateway here.
      setTimeout(() => { setProcessing(false); setStep(7); }, 1600);
      return;
    }
    setStep((s) => Math.min(7, s + 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                    step > s.id ? "border-success bg-success text-white" : step === s.id ? "border-primary-600 bg-primary-600 text-white" : "border-border bg-background text-muted-foreground",
                  )}>
                    {step > s.id ? <Check className="size-5" /> : <s.icon className="size-5" />}
                  </div>
                  <span className={cn("hidden text-xs font-medium sm:block", step >= s.id ? "text-foreground" : "text-muted-foreground")}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-1 h-0.5 flex-1 overflow-hidden rounded bg-border sm:mx-2">
                    <motion.div className="h-full bg-success" initial={{ width: "0%" }} animate={{ width: step > s.id ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 1 && (
                <StepShell title="Choose your departure" subtitle="Pick a date and city that works for you.">
                  <div className="space-y-5">
                    <div>
                      <Label className="mb-2 block">Departure date</Label>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {pkg.availableDates.map((dOpt) => (
                          <button key={dOpt} onClick={() => setDate(dOpt)} className={cn("flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-colors", date === dOpt ? "border-primary-600 bg-primary-600/5" : "border-border hover:bg-muted")}>
                            <span className="inline-flex items-center gap-2"><Calendar className="size-4 text-secondary-500" /> {formatDate(dOpt)}</span>
                            {date === dOpt && <Check className="size-4 text-primary-600" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Departure city</Label>
                      <div className="flex flex-wrap gap-2">
                        {pkg.departureCities.map((c) => (
                          <button key={c} onClick={() => setCity(c)} className={cn("inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors", city === c ? "border-primary-600 bg-primary-600 text-white" : "border-border hover:bg-muted")}>
                            <Plane className="size-4" /> {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title="Who's travelling?" subtitle="Add the number of adults and children.">
                  <div className="space-y-4">
                    <Counter label="Adults" hint="Age 12+" value={adults} min={1} onChange={setAdults} />
                    <Counter label="Children" hint="Age 2–11 · 40% off" value={children} min={0} onChange={setChildren} />
                  </div>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title="Select your room" subtitle="Choose the comfort level for your stay.">
                  <div className="space-y-3">
                    {roomTypes.map((r) => (
                      <button key={r.id} onClick={() => setRoom(r.id)} className={cn("flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors", room === r.id ? "border-primary-600 bg-primary-600/5" : "border-border hover:bg-muted")}>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary-500/10 text-secondary-600"><BedDouble className="size-5" /></span>
                          <div>
                            <p className="font-semibold">{r.name}</p>
                            <p className="text-xs text-muted-foreground">{r.desc}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{r.price === 0 ? "Included" : `+${formatCurrency(r.price)}`}</span>
                      </button>
                    ))}
                  </div>
                </StepShell>
              )}

              {step === 4 && (
                <StepShell title="Enhance your trip" subtitle="Optional add-ons for a smoother journey.">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {extras.map((e) => {
                      const on = selectedExtras.includes(e.id);
                      return (
                        <button key={e.id} onClick={() => toggleExtra(e.id)} className={cn("flex flex-col rounded-2xl border p-4 text-left transition-colors", on ? "border-secondary-500 bg-secondary-500/5" : "border-border hover:bg-muted")}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{e.name}</span>
                            <span className={cn("flex size-5 items-center justify-center rounded-md border", on ? "border-secondary-500 bg-secondary-500 text-white" : "border-border")}>{on && <Check className="size-3.5" />}</span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">{e.desc}</p>
                          <p className="mt-2 text-sm font-semibold text-primary-700 dark:text-primary-300">+{formatCurrency(e.price)}</p>
                        </button>
                      );
                    })}
                  </div>
                </StepShell>
              )}

              {step === 5 && (
                <StepShell title="Lead traveller details" subtitle="We'll send your confirmation here.">
                  <div className="space-y-4">
                    <div><Label className="mb-1.5 block">Full name</Label><Input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Jane Traveller" /></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div><Label className="mb-1.5 block">Email</Label><Input type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} placeholder="jane@example.com" /></div>
                      <div><Label className="mb-1.5 block">Phone</Label><Input type="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="+91 98765 43210" /></div>
                    </div>
                    <p className="text-xs text-muted-foreground">By continuing you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
                  </div>
                </StepShell>
              )}

              {step === 6 && (
                <StepShell title="Payment summary" subtitle="Review your booking before paying.">
                  <div className="space-y-4">
                    <SummaryRow label="Package" value={pkg.title} />
                    <SummaryRow label="Departure" value={`${formatDate(date)} · from ${city}`} />
                    <SummaryRow label="Travellers" value={`${adults} adults${children ? `, ${children} children` : ""}`} />
                    <SummaryRow label="Room" value={roomTypes.find((r) => r.id === room)?.name ?? ""} />
                    {selectedExtras.length > 0 && <SummaryRow label="Extras" value={extras.filter((e) => selectedExtras.includes(e.id)).map((e) => e.name).join(", ")} />}
                    <div className="rounded-2xl border border-dashed border-border p-4">
                      <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><Lock className="size-4 text-secondary-500" /> Payment method</p>
                      <p className="text-sm text-muted-foreground">This is a demo — no real payment is taken. Wire a gateway (Razorpay/Stripe) at the marked integration point.</p>
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 7 && (
                <div className="py-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="size-12" />
                  </motion.div>
                  <h2 className="mt-6 font-heading text-2xl font-bold">Booking confirmed! 🎉</h2>
                  <p className="mx-auto mt-2 max-w-md text-muted-foreground">Thank you, {lead.name || "traveller"}! A confirmation with your itinerary has been sent to {lead.email || "your email"}. Our concierge will reach out shortly.</p>
                  <div className="mt-4 inline-flex flex-col items-center gap-1 rounded-2xl border border-border bg-muted/40 px-6 py-4">
                    <span className="text-xs text-muted-foreground">Booking reference</span>
                    <span className="font-heading text-lg font-bold tracking-wider">TX-{pkg.id.toUpperCase().replace("PKG-", "")}-{adults}{children}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button onClick={() => router.push("/payment-success")} variant="primary">View receipt</Button>
                    <Button onClick={() => router.push("/tour-packages")} variant="outline">Browse more trips</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          {step < 7 && (
            <div className="mt-8 flex items-center justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 1}><ChevronLeft className="size-4" /> Back</Button>
              <Button variant="gradient" onClick={next} disabled={!canProceed} loading={processing}>
                {step === 6 ? "Confirm & Pay" : "Continue"} {!processing && <ChevronRight className="size-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Order summary sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          <div className="relative aspect-[16/10]">
            <Image src={pkg.image} alt={pkg.title} fill sizes="360px" className="object-cover" />
          </div>
          <div className="p-5">
            <h3 className="font-heading font-semibold">{pkg.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{formatDuration(pkg.durationDays, pkg.durationNights)} · {pkg.destination}</p>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <Line label={`Base (${adults}A${children ? ` + ${children}C` : ""})`} value={formatCurrency(base)} />
              {roomCost > 0 && <Line label={`Room upgrade × ${travelers}`} value={formatCurrency(roomCost * travelers)} />}
              {extrasCost > 0 && <Line label="Extras" value={formatCurrency(extrasCost)} />}
              <Line label="Taxes & fees" value={formatCurrency(taxes)} />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-heading font-semibold">Total</span>
              <span className="font-heading text-2xl font-bold text-primary-700 dark:text-primary-300">{formatCurrency(total)}</span>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-success" /> Secure checkout · Free cancellation</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function StepShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  );
}

function Counter({ label, hint, value, min, onChange }: { label: string; hint: string; value: number; min: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border p-4">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => onChange(Math.max(min, value - 1))} className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted" aria-label={`Decrease ${label}`}><Minus className="size-4" /></button>
        <span className="w-6 text-center font-semibold tabular-nums">{value}</span>
        <button onClick={() => onChange(value + 1)} className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:bg-muted" aria-label={`Increase ${label}`}><Plus className="size-4" /></button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
