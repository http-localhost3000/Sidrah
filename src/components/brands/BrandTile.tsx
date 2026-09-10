import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Brand } from "@/types/brand";

interface BrandTileProps {
  brand: Brand;
  className?: string;
}

export function BrandTile({ brand, className }: BrandTileProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between border border-rule bg-card p-6 transition-colors hover:border-ink focus-within:ring-2 focus-within:ring-accent sm:p-8 min-h-[22rem]",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <p className="eyebrow text-ink/50">Brand</p>
          <Link
            href={`/brands/${brand.slug}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink/70 transition-all group-hover:border-ink group-hover:bg-ink group-hover:text-page"
            aria-label={`View ${brand.name}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <Link href={`/brands/${brand.slug}`} className="block">
          <p className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[0.01em] text-ink transition-colors hover:text-ink/70">
            {brand.name.toUpperCase()}
          </p>
          <p className="mt-3 text-caption text-ink/60">{brand.tagline}</p>
        </Link>

        {brand.ageRanges && brand.ageRanges.length > 0 && (
          <div className="mt-6 border-t border-rule/60 pt-4">
            <p className="eyebrow mb-2.5 text-[0.65rem] text-ink/50">Available Ages</p>
            <div className="flex flex-wrap gap-1.5">
              {brand.ageRanges.map((age) => (
                <Link
                  key={age.id}
                  href={`/brands/${brand.slug}?age=${age.id}`}
                  className="inline-flex items-center rounded-full border border-rule/80 bg-page px-2.5 py-1 text-[0.65rem] font-medium text-ink/80 transition-colors hover:border-ink hover:bg-ink hover:text-page"
                >
                  {age.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-rule/40 pt-4">
        <span className="text-caption text-ink/55">
          {brand.productCount ?? 0} styles
        </span>
        <Link
          href={`/brands/${brand.slug}`}
          className="text-caption font-medium text-ink underline-offset-4 hover:underline"
        >
          View Brand →
        </Link>
      </div>
    </div>
  );
}

