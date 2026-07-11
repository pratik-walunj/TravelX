"use client";

import { useState } from "react";
import { Calculator, ArrowRightLeft, TrendingUp } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/format";

/** Simple travel cost estimator. */
export function CostCalculator() {
  const [travelers, setTravelers] = useState(2);
  const [nights, setNights] = useState(5);
  const [hotelTier, setHotelTier] = useState(6000);
  const [style, setStyle] = useState(3000);

  const flights = 18000 * travelers;
  const hotels = hotelTier * nights;
  const daily = style * nights * travelers;
  const total = flights + hotels + daily;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary-500/15 text-secondary-600"><Calculator className="size-5" /></span>
        <h3 className="font-heading text-lg font-bold">Travel Cost Calculator</h3>
      </div>
      <div className="space-y-4">
        <Field label={`Travellers: ${travelers}`}>
          <input type="range" min={1} max={10} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full accent-secondary-500" />
        </Field>
        <Field label={`Nights: ${nights}`}>
          <input type="range" min={1} max={21} value={nights} onChange={(e) => setNights(Number(e.target.value))} className="w-full accent-secondary-500" />
        </Field>
        <Field label="Hotel tier (per night)">
          <Select value={hotelTier} onChange={(e) => setHotelTier(Number(e.target.value))}>
            <option value={3000}>Budget · ₹3,000</option>
            <option value={6000}>Comfort · ₹6,000</option>
            <option value={12000}>Premium · ₹12,000</option>
            <option value={25000}>Luxury · ₹25,000</option>
          </Select>
        </Field>
        <Field label="Daily spending (food, activities)">
          <Select value={style} onChange={(e) => setStyle(Number(e.target.value))}>
            <option value={1500}>Frugal · ₹1,500</option>
            <option value={3000}>Moderate · ₹3,000</option>
            <option value={6000}>Indulgent · ₹6,000</option>
          </Select>
        </Field>
      </div>

      <div className="mt-6 space-y-2 rounded-2xl bg-muted/50 p-4 text-sm">
        <Line label="Flights (est.)" value={formatCurrency(flights)} />
        <Line label="Hotels" value={formatCurrency(hotels)} />
        <Line label="Daily expenses" value={formatCurrency(daily)} />
        <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
          <span className="font-heading font-semibold">Estimated total</span>
          <span className="font-heading text-xl font-bold text-primary-700 dark:text-primary-300">{formatCurrency(total)}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Rough estimate for planning only. Get an exact quote from our team.</p>
    </div>
  );
}

const rates: Record<string, { rate: number; symbol: string; name: string }> = {
  INR: { rate: 1, symbol: "₹", name: "Indian Rupee" },
  USD: { rate: 0.012, symbol: "$", name: "US Dollar" },
  EUR: { rate: 0.011, symbol: "€", name: "Euro" },
  GBP: { rate: 0.0094, symbol: "£", name: "British Pound" },
  AED: { rate: 0.044, symbol: "د.إ", name: "UAE Dirham" },
  THB: { rate: 0.43, symbol: "฿", name: "Thai Baht" },
  SGD: { rate: 0.016, symbol: "S$", name: "Singapore Dollar" },
  JPY: { rate: 1.87, symbol: "¥", name: "Japanese Yen" },
};

/** Static-rate currency converter (wire to a live FX API later). */
export function CurrencyConverter() {
  const [amount, setAmount] = useState(10000);
  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");

  const inInr = amount / rates[from].rate;
  const converted = inInr * rates[to].rate;

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
      <div className="mb-6 flex items-center gap-2">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-600"><ArrowRightLeft className="size-5" /></span>
        <h3 className="font-heading text-lg font-bold">Currency Converter</h3>
      </div>

      <Field label="Amount">
        <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="text-lg font-semibold" />
      </Field>

      <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <Field label="From">
          <Select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <button onClick={swap} aria-label="Swap currencies" className="mb-1 inline-flex size-10 items-center justify-center rounded-xl border border-border hover:bg-muted">
          <ArrowRightLeft className="size-4" />
        </button>
        <Field label="To">
          <Select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
      </div>

      <div className="mt-6 rounded-2xl bg-hero-gradient bg-[length:200%_200%] p-5 text-white">
        <p className="text-sm text-white/80">{amount.toLocaleString()} {from} =</p>
        <p className="font-heading text-3xl font-bold">{rates[to].symbol} {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-white/70"><TrendingUp className="size-3.5" /> {rates[to].name} · indicative rate</p>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Rates are indicative. Wire a live FX API for real-time conversion.</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-semibold text-muted-foreground">{label}</p>
      {children}
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
