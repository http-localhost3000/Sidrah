import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CatalogLayout } from "@/components/catalog/CatalogLayout";
import { getBrandBySlug } from "@/lib/brands";
import { getProducts } from "@/lib/catalog";
import { parseFilters } from "@/lib/filters";
import { brands } from "@/data/brands";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} — Sidrah Fashion`,
    description: `${brand.tagline}. ${brand.description} Wholesale boyswear from Sidrah Fashion, Mumbai.`,
  };
}

interface BrandPageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function BrandPage({ params, searchParams }: BrandPageProps) {
  const brand = getBrandBySlug(params.slug);
  if (!brand) notFound();

  const filters = parseFilters(searchParams);
  const products = getProducts({ ...filters, brand: brand.slug });
  const totalCount = products.length;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: brand.name },
  ];

  return (
    <>
      <div className="bg-page pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8">
            <p className="eyebrow text-ink/60">Brand</p>
            <h1 className="mt-6 font-display text-display-md md:text-display-lg">
              {brand.name}
            </h1>
            <p className="mt-4 max-w-prose text-body-lg text-ink/75">
              {brand.tagline}
            </p>
          </div>
        </Container>
      </div>

      <CatalogLayout
        basePath={`/brands/${brand.slug}`}
        searchParams={filters}
        products={products}
        totalCount={totalCount}
      />
    </>
  );
}
