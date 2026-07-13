import Image from "next/image";
import { Breadcrumb, type Crumb } from "./breadcrumb";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  image?: string;
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

/** Reusable inner-page banner with image, overlay, breadcrumbs and title. */
export function PageHero({
  title,
  description,
  image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80",
  breadcrumbs,
  eyebrow,
  align = "center",
  size = "md",
  children,
  className,
}: PageHeroProps) {
  const heights = { sm: "min-h-[280px]", md: "min-h-[360px]", lg: "min-h-[440px]" };
  return (
    <section className={cn("relative -mt-16 flex items-end overflow-hidden lg:-mt-[72px]", heights[size], className)}>
      {/* bg-primary-950 fallback: never show a blank white band if the remote
          image is slow or fails to load — the dark brand colour shows instead. */}
      <div className="absolute inset-0 bg-primary-950">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/60 to-primary-950/70" />
      </div>
      <div className="container relative z-10 pb-10 pt-28 text-white sm:pb-14">
        <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
          {breadcrumbs && (
            <div className={cn("mb-4", align === "center" && "flex justify-center")}>
              <Breadcrumb items={breadcrumbs} light />
            </div>
          )}
          {eyebrow && (
            <span className="mb-3 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              {eyebrow}
            </span>
          )}
          <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className={cn("mt-4 text-lg text-white/85", align === "center" && "mx-auto max-w-2xl")}>{description}</p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
