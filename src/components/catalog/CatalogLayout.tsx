import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyProducts } from "@/components/products/EmptyProducts";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { SortMenu } from "@/components/filters/SortMenu";
import { ActiveFilters } from "@/components/filters/ActiveFilters";
import { SubcollectionTabs } from "@/components/filters/SubcollectionTabs";
import type { FilterParams } from "@/lib/filters";
import type { Product } from "@/types/product";
import type { CategorySlug, Subcollection } from "@/types/collection";
import type { BrandAgeRange } from "@/types/brand";

interface CatalogLayoutProps {
  basePath: string;
  searchParams: FilterParams;
  products: Product[];
  category?: CategorySlug;
  subcollections?: Subcollection[];
  brandAgeRanges?: BrandAgeRange[];
  totalCount: number;
}

/**
 * Shared body layout for /shop and /collections/[slug]. Composes the filter
 * sidebar (desktop) + mobile drawer, the subcollection tabs, an active-filter
 * chip row, the toolbar (count + sort), and the product grid or empty state.
 * All URL state flows through server-generated hrefs — no client filter logic.
 */
export function CatalogLayout({
  basePath,
  searchParams,
  products,
  category,
  subcollections,
  brandAgeRanges,
  totalCount,
}: CatalogLayoutProps) {
  const hasFilters = [
    searchParams.sub,
    searchParams.brand,
    searchParams.age,
    searchParams.fit,
    searchParams.category,
  ].some(Boolean);
  const activeCount = [
    searchParams.sub,
    searchParams.brand,
    searchParams.age,
    searchParams.fit,
    searchParams.category,
  ].filter(Boolean).length;

  return (
    <section className="bg-page pb-section">
      <Container>
        {category && subcollections && subcollections.length > 0 && (
          <div className="mb-6 border-b border-rule pb-5">
            <SubcollectionTabs
              basePath={basePath}
              searchParams={searchParams}
              subcollections={subcollections}
            />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <div className="hidden lg:block">
            <FilterSidebar
              basePath={basePath}
              searchParams={searchParams}
              category={category}
              subcollections={subcollections}
              brandAgeRanges={brandAgeRanges}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 rule-b pb-4">
              <p className="text-caption text-ink/70">
                <span className="font-medium text-ink">{totalCount}</span>{" "}
                {totalCount === 1 ? "product" : "products"}
              </p>
              <div className="flex items-center gap-3">
                <MobileFilterDrawer activeCount={activeCount}>
                  <FilterSidebar
                    basePath={basePath}
                    searchParams={searchParams}
                    category={category}
                    subcollections={subcollections}
                    brandAgeRanges={brandAgeRanges}
                    hideHeading
                  />
                </MobileFilterDrawer>
                <SortMenu />
              </div>
            </div>

            {hasFilters && (
              <div className="mt-5">
                <ActiveFilters
                  basePath={basePath}
                  searchParams={searchParams}
                  subcollections={subcollections}
                />
              </div>
            )}

            <div className="mt-10">
              {products.length === 0 ? (
                <EmptyProducts resetHref={basePath} />
              ) : (
                <ProductGrid products={products} columns={3} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

