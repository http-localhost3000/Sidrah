import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogLayout } from "@/components/catalog/CatalogLayout";
import { getCollectionBySlug, getCollections } from "@/lib/collections";
import { getProducts } from "@/lib/catalog";
import { normaliseSearchParams } from "@/lib/filters";
import { shopAgeFilters } from "@/data/ages";
import type { CategorySlug } from "@/types/collection";
import type { ProductSort } from "@/types/product";

const validSorts: ProductSort[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
];

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.slug }));
}

interface CollectionPageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const collection = getCollectionBySlug(params.slug as CategorySlug);
  if (!collection) return { title: "Not found" };
  return {
    title: collection.title,
    description: `${collection.editorialLine ?? collection.descriptor} Wholesale ${collection.title.toLowerCase()} for retailers, from Sidrah Fashion.`,
  };
}

export default function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const collection = getCollectionBySlug(params.slug as CategorySlug);
  if (!collection) notFound();

  const sp = normaliseSearchParams(searchParams);

  const ageIds = sp.age
    ? shopAgeFilters.find((g) => g.id === sp.age)?.ageRangeIds
    : undefined;

  const sort = validSorts.includes(sp.sort as ProductSort)
    ? (sp.sort as ProductSort)
    : "featured";

  const products = getProducts({
    category: collection.slug,
    subcategory: sp.sub,
    brand: sp.brand,
    ageIds,
    fit: sp.fit,
    sort,
  });

  const basePath = `/collections/${collection.slug}`;

  return (
    <>
      <CatalogHeader
        eyebrow={`Collection · ${collection.title}`}
        title={
          <>
            {collection.editorialLine ?? collection.title}
          </>
        }
        description={collection.descriptor}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: collection.title },
        ]}
      />
      <CatalogLayout
        basePath={basePath}
        searchParams={sp}
        products={products}
        category={collection.slug}
        subcollections={collection.subcollections}
        totalCount={products.length}
      />
    </>
  );
}
