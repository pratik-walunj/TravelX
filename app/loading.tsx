import { Plane } from "lucide-react";

/** Global route-loading fallback. */
export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <span className="relative flex size-16 items-center justify-center rounded-2xl bg-hero-gradient bg-[length:200%_200%] text-white shadow-glow">
        <Plane className="size-8 -rotate-45 animate-[float_2s_ease-in-out_infinite]" />
      </span>
      <p className="text-sm font-medium text-muted-foreground">Preparing your journey…</p>
    </div>
  );
}
