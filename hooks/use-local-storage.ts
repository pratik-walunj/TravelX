"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Persistent state backed by localStorage, SSR-safe and cross-tab synced.
 * Used by wishlist/compare/recently-viewed features.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item != null) setValue(JSON.parse(item) as T);
    } catch {
      /* ignore read errors (private mode etc.) */
    }
    setHydrated(true);
  }, [key]);

  const setStored = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          /* ignore write errors */
        }
        return resolved;
      });
    },
    [key],
  );

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue) as T);
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [value, setStored, hydrated] as const;
}
