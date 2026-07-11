"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface CollectionContextValue {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  hydrated: boolean;
}

/**
 * Factory that builds a localStorage-backed collection (wishlist / compare).
 * Keeps the two features DRY — same logic, different storage key + toasts.
 */
function createCollection(
  storageKey: string,
  labels: { added: string; removed: string; limit?: number; full?: string },
) {
  const Ctx = createContext<CollectionContextValue | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    const [ids, setIds, hydrated] = useLocalStorage<string[]>(storageKey, []);

    const has = useCallback((id: string) => ids.includes(id), [ids]);

    const add = useCallback(
      (id: string) => {
        setIds((prev) => {
          if (prev.includes(id)) return prev;
          if (labels.limit && prev.length >= labels.limit) {
            toast.warning(labels.full ?? "Limit reached");
            return prev;
          }
          toast.success(labels.added);
          return [...prev, id];
        });
      },
      [setIds],
    );

    const remove = useCallback(
      (id: string) => {
        setIds((prev) => prev.filter((x) => x !== id));
        toast.message(labels.removed);
      },
      [setIds],
    );

    const toggle = useCallback(
      (id: string) => (has(id) ? remove(id) : add(id)),
      [has, add, remove],
    );

    const clear = useCallback(() => setIds([]), [setIds]);

    const value = useMemo(
      () => ({
        ids,
        has,
        toggle,
        add,
        remove,
        clear,
        count: ids.length,
        hydrated,
      }),
      [ids, has, toggle, add, remove, clear, hydrated],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  function useCollectionHook() {
    const ctx = useContext(Ctx);
    if (!ctx)
      throw new Error(`use${storageKey} must be used within its Provider`);
    return ctx;
  }

  return [Provider, useCollectionHook] as const;
}

export const [WishlistProvider, useWishlist] = createCollection("travelx:wishlist", {
  added: "Added to your wishlist ❤️",
  removed: "Removed from wishlist",
});

export const [CompareProvider, useCompare] = createCollection("travelx:compare", {
  added: "Added to compare",
  removed: "Removed from compare",
  limit: 4,
  full: "You can compare up to 4 packages at a time",
});
