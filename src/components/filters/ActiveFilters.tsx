import Link from "next/link";
import { X } from "lucide-react";
import { getBrands } from "@/lib/brands";
import { getCollections } from "@/lib/collections";
import { shopAgeFilters } from "@/data/ages";
import { buildFilterHref } from "@/lib/filters";
import type { FilterParams } from "@/lib/filters";
import type { Subcollection } from "@/types/collection";

interface ActiveFiltersProps {
  basePath: string;
  searchParams: FilterParams;
  subcollections?: Subcollection[];
}

function getAgeLabel(ageId?: string): string {
  if (!ageId) return "";
  const shopGroup = shopAgeFilters.find((x) => x.id === ageId);
  if (shopGroup) return shopGroup.label;

  const brands = getBrands();
  for (const b of brands) {
    if (b.ageRanges) {
      const match = b.ageRanges.find((r) => r.id === ageId);
      if (match) return match.label;
    }
  }

  const parts = ageId.split("-");
  if (parts.length >= 3) {
    const min = parts[0];
    const max = parts[1];
    const unit = parts.slice(2).join(" ");
    return `${min}–${max} ${unit.charAt(0).toUpperCase() + unit.slice(1)}`;
  }

  return ageId;
}

export function ActiveFilters({
  basePath,
  searchParams,
  subcollections,
}: ActiveFiltersProps) {
  const collections = getCollections();
  const brands = getBrands();

  const chips: Array<{ key: string; label: string; href: string }> = [];

  if (searchParams.category) {
    const c = collections.find((x) => x.slug === searchParams.category);
    if (c)
      chips.push({
        key: `category-${c.slug}`,
        label: `Category · ${c.title}`,
        href: buildFilterHref(basePath, searchParams, { category: undefined }),
      });
  }

  if (searchParams.sub && subcollections) {
    const s = subcollections.find((x) => x.slug === searchParams.sub);
    if (s)
      chips.push({
        key: `sub-${s.slug}`,
        label: `Subcollection · ${s.label}`,
        href: buildFilterHref(basePath, searchParams, { sub: undefined }),
      });
  }

  if (searchParams.brand) {
    const b = brands.find((x) => x.slug === searchParams.brand);
    if (b)
      chips.push({
        key: `brand-${b.slug}`,
        label: `Brand · ${b.name}`,
        href: buildFilterHref(basePath, searchParams, { brand: undefined }),
      });
  }

  if (searchParams.age) {
    const ageLabel = getAgeLabel(searchParams.age);
    chips.push({
      key: `age-${searchParams.age}`,
      label: `Age · ${ageLabel}`,
      href: buildFilterHref(basePath, searchParams, { age: undefined }),
    });
  }

  if (searchParams.fit) {
    chips.push({
      key: `fit-${searchParams.fit}`,
      label: `Fit · ${searchParams.fit}`,
      href: buildFilterHref(basePath, searchParams, { fit: undefined }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Link
          key={chip.key}
          href={chip.href}
          scroll={false}
          className="inline-flex items-center gap-2 rounded-sm border border-ink/45 bg-card px-3 py-1.5 text-caption text-ink transition-colors hover:border-ink hover:bg-ink hover:text-page"
        >
          <span>{chip.label}</span>
          <X className="h-3 w-3" aria-hidden="true" />
        </Link>
      ))}
      <Link
        href={basePath}
        scroll={false}
        className="ml-1 text-caption text-ink/60 underline-offset-4 hover:text-ink hover:underline"
      >
        Clear all
      </Link>
    </div>
  );
}
