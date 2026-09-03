import type { Metadata } from "next";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogLayout } from "@/components/catalog/CatalogLayout";
import { getProducts } from "@/lib/catalog";
import { normaliseSearchParams } from "@/lib/filters";
import { shopAgeFilters } from "@/data/ages";
import type { CategorySlug, Collection } from "@/types/collection";
import type { ProductSort } from "@/types/product";
import { getCollectionBySlug } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Sidrah Fashion wholesale catalogue — premium boys' wear across four brands and nine collections. Shipped from Mumbai to retailers worldwide.",
};

const validSorts: ProductSort[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
];

interface ShopPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const params = normaliseSearchParams(searchParams);

  const category = validCategory(params.category);
  const collection: Collection | undefined = category
    ? getCollectionBySlug(category)
    : undefined;

  const ageIds = params.age
    ? shopAgeFilters.find((g) => g.id === params.age)?.ageRangeIds
    : undefined;

  const sort = validSorts.includes(params.sort as ProductSort)
    ? (params.sort as ProductSort)
    : "featured";

  const products = getProducts({
    category,
    subcategory: params.sub,
    brand: params.brand,
    ageIds,
    fit: params.fit,
    sort,
  });

  return (
    <>
      <CatalogHeader
        eyebrow="Shop"
        title={
          <>
            Boyswear, curated for retail<span className="italic">.</span>
          </>
        }
        description="Sidrah Fashion supplies wholesale boys' wear to retailers, boutiques and multi-brand stores worldwide. Explore the full catalogue across four in-house brands and nine considered collections."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />
      <CatalogLayout
        basePath="/shop"
        searchParams={params}
        products={products}
        category={category}
        subcollections={collection?.subcollections}
        totalCount={products.length}
      />
    </>
  );
}

function validCategory(v?: string): CategorySlug | undefined {
  if (!v) return undefined;
  const list: CategorySlug[] = [
    "shirts",
    "t-shirts",
    "denims",
    "track-pants",
    "shorts",
    "cord-sets",
    "cargo-pants",
    "linen-pants",
    "kurta",
    "imported",
  ];
  return list.includes(v as CategorySlug) ? (v as CategorySlug) : undefined;
}
