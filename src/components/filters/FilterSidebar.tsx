import Link from "next/link";
import { getBrands, getBrandBySlug } from "@/lib/brands";
import { getCollections } from "@/lib/collections";
import { getFacets } from "@/lib/catalog";
import { shopAgeFilters } from "@/data/ages";
import type { FilterParams } from "@/lib/filters";
import type { CategorySlug, Subcollection } from "@/types/collection";
import type { BrandAgeRange } from "@/types/brand";
import { FilterGroup } from "./FilterGroup";

interface FilterSidebarProps {
  basePath: string;
  searchParams: FilterParams;
  /** When set, category filter is hidden and subcollection filter shown. */
  category?: CategorySlug;
  /** Subcollections available for the current category. */
  subcollections?: Subcollection[];
  /** Specific age ranges available for the selected brand. */
  brandAgeRanges?: BrandAgeRange[];
  /** Hide the wrapper heading (useful inside the mobile drawer, which has its own header). */
  hideHeading?: boolean;
}

export function FilterSidebar({
  basePath,
  searchParams,
  category,
  subcollections,
  brandAgeRanges,
  hideHeading = false,
}: FilterSidebarProps) {
  const brands = getBrands();
  const collections = getCollections();

  const brandSlugFromPath = basePath.startsWith("/brands/")
    ? basePath.replace("/brands/", "").split("?")[0]
    : undefined;

  const selectedBrand = searchParams.brand
    ? getBrandBySlug(searchParams.brand)
    : brandSlugFromPath
    ? getBrandBySlug(brandSlugFromPath)
    : undefined;

  const ageOptions =
    brandAgeRanges && brandAgeRanges.length > 0
      ? brandAgeRanges.map((a) => ({ label: a.label, value: a.id }))
      : selectedBrand && selectedBrand.ageRanges
      ? selectedBrand.ageRanges.map((a) => ({ label: a.label, value: a.id }))
      : shopAgeFilters.map((a) => ({ label: a.label, value: a.id }));

  // Available fits derived from the current scope so we never show a facet
  // that would return zero products.
  const facets = getFacets(category ? { category } : {});

  const activeCount = [
    searchParams.sub,
    searchParams.brand,
    searchParams.age,
    searchParams.fit,
    searchParams.category,
  ].filter(Boolean).length;

  return (
    <aside className="flex flex-col gap-6" aria-label="Filters">
      {!hideHeading && (
        <div className="flex items-baseline justify-between">
          <h2 className="eyebrow text-ink">Refine</h2>
          {activeCount > 0 && (
            <Link
              href={basePath}
              scroll={false}
              className="text-caption text-ink/60 underline-offset-4 hover:text-ink hover:underline"
            >
              Clear all
            </Link>
          )}
        </div>
      )}

      {!category && (
        <FilterGroup
          title="Category"
          paramKey="category"
          basePath={basePath}
          searchParams={searchParams}
          options={collections.map((c) => ({
            label: c.title,
            value: c.slug,
          }))}
        />
      )}

      {category && subcollections && subcollections.length > 0 && (
        <FilterGroup
          title="Subcollection"
          paramKey="sub"
          basePath={basePath}
          searchParams={searchParams}
          options={subcollections.map((s) => ({
            label: s.label,
            value: s.slug,
          }))}
        />
      )}

      <FilterGroup
        title="Brand"
        paramKey="brand"
        basePath={basePath}
        searchParams={searchParams}
        options={brands.map((b) => ({ label: b.name, value: b.slug }))}
      />

      <FilterGroup
        title="Age"
        paramKey="age"
        basePath={basePath}
        searchParams={searchParams}
        options={ageOptions}
      />

      {facets.fits.length > 0 && (
        <FilterGroup
          title="Fit"
          paramKey="fit"
          basePath={basePath}
          searchParams={searchParams}
          options={facets.fits.map((f) => ({ label: f.value, value: f.value }))}
        />
      )}
    </aside>
  );
}

