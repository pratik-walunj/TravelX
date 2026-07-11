import type { Money } from "@/types";

const CURRENCY_LOCALE: Record<Money["currency"], string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "ar-AE",
};

/** Format a price with the correct currency + locale grouping. */
export function formatCurrency(
  amount: number,
  currency: Money["currency"] = "INR",
  opts: { compact?: boolean } = {},
) {
  return new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    notation: opts.compact ? "compact" : "standard",
  }).format(amount);
}

/** e.g. 12500 -> "12.5K", 2400000 -> "2.4M" */
export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Percentage discount between an old and current price. */
export function discountPercent(oldPrice: number, price: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

/** "5 Days / 4 Nights" */
export function formatDuration(days: number, nights: number) {
  return `${days} ${days === 1 ? "Day" : "Days"} / ${nights} ${
    nights === 1 ? "Night" : "Nights"
  }`;
}

/** Human friendly date — "12 Aug 2026" */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

/** Relative time like "3 days ago" (approximate, dependency-free). */
export function timeAgo(iso: string, now = new Date()) {
  const diff = now.getTime() - new Date(iso).getTime();
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["week", 1000 * 60 * 60 * 24 * 7],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
  ];
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  for (const [unit, ms] of units) {
    if (Math.abs(diff) >= ms) {
      return rtf.format(-Math.round(diff / ms), unit);
    }
  }
  return "just now";
}

/** Clamp + round a rating to one decimal. */
export function formatRating(rating: number) {
  return Math.min(5, Math.max(0, rating)).toFixed(1);
}

/** Pluralise helper. */
export function plural(count: number, singular: string, pluralForm?: string) {
  return count === 1 ? singular : pluralForm ?? `${singular}s`;
}
