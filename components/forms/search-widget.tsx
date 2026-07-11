"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Wallet, Search, Plane, Building2, Compass } from "lucide-react";
import { destinations } from "@/data/destinations";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "tours", label: "Tours", icon: Compass },
  { id: "hotels", label: "Hotels", icon: Building2 },
  { id: "flights", label: "Flights", icon: Plane },
];

const budgets = [
  { value: "", label: "Any budget" },
  { value: "0-25000", label: "Under ₹25,000" },
  { value: "25000-50000", label: "₹25,000 – ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-999999", label: "₹1,00,000+" },
];

/** The hero booking/search widget — a glass panel that routes to /search. */
export function SearchWidget({ className }: { className?: string }) {
  const router = useRouter();
  const [tab, setTab] = useState("tours");
  const [dest, setDest] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState("");

  const submit = () => {
    const params = new URLSearchParams();
    if (dest) params.set("destination", dest);
    if (date) params.set("date", date);
    if (travelers) params.set("travelers", travelers);
    if (budget) params.set("budget", budget);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={cn("glass-card rounded-[1.75rem] p-3 sm:p-4", className)}>
      {/* Tabs */}
      <div className="mb-3 flex gap-1 px-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              tab === t.id
                ? "bg-primary-600 text-white shadow-soft"
                : "text-foreground/70 hover:bg-muted",
            )}
          >
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-4">
        <Field label="Destination" icon={<MapPin className="size-4" />}>
          <Select value={dest} onChange={(e) => setDest(e.target.value)} className="border-0 bg-transparent shadow-none focus-visible:ring-0">
            <option value="">Where to?</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>{d.name}, {d.country}</option>
            ))}
          </Select>
        </Field>

        <Field label={tab === "flights" ? "Departure" : "Check-in"} icon={<Calendar className="size-4" />}>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
        </Field>

        <Field label="Travellers" icon={<Users className="size-4" />}>
          <Select value={travelers} onChange={(e) => setTravelers(e.target.value)} className="border-0 bg-transparent shadow-none focus-visible:ring-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Traveller" : "Travellers"}</option>
            ))}
          </Select>
        </Field>

        <Field label="Budget" icon={<Wallet className="size-4" />}>
          <Select value={budget} onChange={(e) => setBudget(e.target.value)} className="border-0 bg-transparent shadow-none focus-visible:ring-0">
            {budgets.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden items-center gap-2 px-2 text-xs text-muted-foreground sm:flex">
          <Compass className="size-4 text-secondary-500" />
          Popular:{" "}
          {["Maldives", "Bali", "Kerala", "Dubai"].map((p, i) => (
            <button
              key={p}
              onClick={() => setDest(destinations.find((d) => d.name === p)?.slug ?? "")}
              className="font-medium text-foreground/70 hover:text-primary-600"
            >
              {p}{i < 3 ? "," : ""}
            </button>
          ))}
        </div>
        <Button onClick={submit} size="lg" variant="gradient" className="w-full sm:w-auto">
          <Search className="size-5" /> Search Trips
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 px-3 py-2 transition-colors focus-within:border-primary-400">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <span className="text-secondary-500">{icon}</span> {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
