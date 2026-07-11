"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselRailProps {
  children: React.ReactNode[];
  className?: string;
  slideClassName?: string;
  /** Show nav arrows (desktop). Defaults to true. */
  arrows?: boolean;
}

/**
 * Reusable, accessible horizontal carousel built on Embla. Used for package
 * rails, testimonials, related tours and destination carousels.
 */
export function CarouselRail({
  children,
  className,
  slideClassName,
  arrows = true,
}: CarouselRailProps) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect);
      embla.off("reInit", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {children.map((child, i) => (
            <div
              key={i}
              className={cn(
                "min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[46%] lg:basis-[31%] xl:basis-[24%]",
                slideClassName,
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <>
          <RailButton
            direction="prev"
            disabled={!canPrev}
            onClick={() => embla?.scrollPrev()}
          />
          <RailButton
            direction="next"
            disabled={!canNext}
            onClick={() => embla?.scrollNext()}
          />
        </>
      )}
    </div>
  );
}

function RailButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={cn(
        "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-card backdrop-blur transition-all hover:bg-primary-600 hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:flex",
        direction === "prev" ? "-left-5" : "-right-5",
      )}
    >
      {direction === "prev" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
    </button>
  );
}
