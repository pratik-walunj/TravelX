import Image from "next/image";
import Link from "next/link";
import type { CategoryMeta } from "@/constants/site";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className }: { category: CategoryMeta; className?: string }) {
  return (
    <Link
      href={category.href}
      className={cn(
        "group relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl p-5 text-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover",
        className,
      )}
    >
      <Image
        src={category.image}
        alt={category.label}
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/30 to-transparent" />
      <div className="relative">
        <span className="mb-2 inline-flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/20">
          <Icon name={category.icon} className="size-5" />
        </span>
        <h3 className="font-heading text-base font-semibold">{category.label}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-white/75">{category.description}</p>
      </div>
    </Link>
  );
}
