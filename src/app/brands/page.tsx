import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { BrandGrid } from "@/components/brands/BrandGrid";
import { getBrands } from "@/lib/brands";

export const metadata: Metadata = {
  title: "Brands — Sidrah Fashion",
  description:
    "Discover our curated house of boyswear brands, selected for retailers looking for dependable style, quality and commercial appeal.",
};

export default function BrandsPage() {
  const brands = getBrands();

  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-ink/55">The Brands</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Six houses under one roof.
            </h1>
            <p className="mx-auto mt-8 max-w-editorial text-body-lg text-ink/75">
              Discover our curated house of boyswear brands, selected for
              retailers looking for dependable style, quality and commercial
              appeal.
            </p>
          </div>

          <div className="mt-16">
            <BrandGrid brands={brands} />
          </div>
        </Container>
      </section>
    </>
  );
}
