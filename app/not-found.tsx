import { Compass, Home, Search, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-24">
      <div className="absolute inset-0 -z-10 bg-hero-gradient bg-[length:200%_200%] opacity-[0.04]" />
      <div className="text-center">
        <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-3xl bg-primary-600/10 text-primary-600 dark:text-primary-300">
          <Compass className="size-12 animate-[float_6s_ease-in-out_infinite]" />
        </div>
        <p className="font-heading text-7xl font-bold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">Looks like you&apos;re off the map</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for has wandered off. Let&apos;s get you back on the trail.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary"><Home className="size-4" /> Back home</ButtonLink>
          <ButtonLink href="/tour-packages" variant="outline"><MapPin className="size-4" /> Browse tours</ButtonLink>
          <ButtonLink href="/search" variant="ghost"><Search className="size-4" /> Search</ButtonLink>
        </div>
      </div>
    </div>
  );
}
