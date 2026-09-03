import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Brand } from "@/types/brand";

interface BrandTileProps {
  brand: Brand;
  className?: string;
}

// Text-based editorial brand tile. Ready to accept a real brand logo/wordmark
// asset later — drop it into the top slot without changing the surrounding
// layout.
export function BrandTile({ brand, className }: BrandTileProps) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={cn(
        "group flex aspect-[4/5] flex-col justify-between border border-rule bg-card p-6 transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:p-8",
        className,
      )}
    >
      <div>
        <p className="eyebrow text-ink/50">Brand</p>
        <p className="mt-6 font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-none tracking-[0.01em] text-ink">
          {brand.name.toUpperCase()}
        </p>
        <p className="mt-3 text-caption text-ink/60">{brand.tagline}</p>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-caption text-ink/55">
          {brand.productCount ?? 0} styles
        </span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink/70 transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-page">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
