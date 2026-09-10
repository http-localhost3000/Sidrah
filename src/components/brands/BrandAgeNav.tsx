import Link from "next/link";
import { buildFilterHref, type FilterParams } from "@/lib/filters";
import type { BrandAgeRange } from "@/types/brand";
import { cn } from "@/lib/cn";

interface BrandAgeNavProps {
  basePath: string;
  searchParams: FilterParams;
  ageRanges: BrandAgeRange[];
  className?: string;
}

export function BrandAgeNav({
  basePath,
  searchParams,
  ageRanges,
  className,
}: BrandAgeNavProps) {
  if (!ageRanges || ageRanges.length === 0) return null;

  const currentAge = searchParams.age?.toLowerCase().trim();

  return (
    <div className={cn("flex flex-wrap items-center gap-2 sm:gap-3", className)}>
      <span className="eyebrow mr-2 text-ink/60">Select Age:</span>
      {ageRanges.map((age) => {
        const isActive =
          currentAge === age.id.toLowerCase() ||
          currentAge === age.label.toLowerCase().replace(/\s+/g, "-");

        const href = buildFilterHref(
          basePath,
          searchParams,
          { age: isActive ? undefined : age.id }
        );

        return (
          <Link
            key={age.id}
            href={href}
            scroll={false}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-full border px-4 text-[0.75rem] font-medium tracking-wider uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isActive
                ? "border-ink bg-ink text-page shadow-sm"
                : "border-rule bg-card text-ink/80 hover:border-ink hover:text-ink"
            )}
          >
            {age.label}
          </Link>
        );
      })}
    </div>
  );
}
