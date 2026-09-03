import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { CatalogLayout } from "@/components/catalog/CatalogLayout";
import { getProducts } from "@/lib/catalog";
import { parseFilters } from "@/lib/filters";
import { shopAgeFilters } from "@/data/ages";

export function generateStaticParams() {
  return shopAgeFilters.map((age) => ({ slug: age.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const ageGroup = shopAgeFilters.find((a) => a.id === params.slug);
  if (!ageGroup) return { title: "Age range not found" };
  return {
    title: `${ageGroup.label} — Shop by Age — Sidrah Fashion`,
    description: `Premium wholesale boyswear for ages ${ageGroup.label}. Curated collections from Sidrah Fashion, Mumbai.`,
  };
}

interface AgePageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function AgePage({ params, searchParams }: AgePageProps) {
  const ageGroup = shopAgeFilters.find((a) => a.id === params.slug);
  if (!ageGroup) notFound();

  const filters = parseFilters(searchParams);
  const products = getProducts({
    ...filters,
    ageIds: ageGroup.ageRangeIds,
  });
  const totalCount = products.length;

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop by Age", href: "/ages" },
    { label: ageGroup.label },
  ];

  return (
    <>
      <div className="bg-page pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8">
            <p className="eyebrow text-ink/60">Age</p>
            <h1 className="mt-6 font-display text-display-md md:text-display-lg">
              {ageGroup.label}
            </h1>
            <p className="mt-4 max-w-prose text-body-lg text-ink/75">
              Premium boyswear curated for this age range
            </p>
          </div>
        </Container>
      </div>

      <CatalogLayout
        basePath={`/ages/${ageGroup.id}`}
        searchParams={filters}
        products={products}
        totalCount={totalCount}
      />
    </>
  );
}
