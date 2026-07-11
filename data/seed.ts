/**
 * Deterministic pseudo-random helpers.
 *
 * All mock data is generated with a fixed seed so the exact same values are
 * produced on the server and the client — this avoids React hydration
 * mismatches that `Math.random()` would cause. Swap this whole `data/` layer
 * for real API calls when the backend is ready.
 */

/** Mulberry32 — tiny deterministic PRNG. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(arr: T[], r: number) => arr[Math.floor(r * arr.length)];

export const between = (r: number, min: number, max: number) =>
  Math.round(min + r * (max - min));

export const round2 = (n: number) => Math.round(n * 20) / 20; // nearest 0.05

export function sample<T>(arr: T[], count: number, r: () => number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < count && copy.length; i++) {
    out.push(copy.splice(Math.floor(r() * copy.length), 1)[0]);
  }
  return out;
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
