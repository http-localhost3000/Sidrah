import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { AgeGrid } from "@/components/ages/AgeGrid";
import { shopAgeFilters } from "@/data/ages";

export const metadata: Metadata = {
  title: "Shop by Age — Sidrah Fashion",
  description:
    "Find the right styles for every stage, from baby sizes through growing boys. Premium wholesale boyswear organized by age range.",
};

export default function AgesPage() {
  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-ink/55">Shop by Age</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              From first months to sixteen.
            </h1>
            <p className="mx-auto mt-8 max-w-editorial text-body-lg text-ink/75">
              Find the right styles for every stage, from baby sizes through
              growing boys.
            </p>
          </div>

          <div className="mt-16">
            <AgeGrid ageGroups={shopAgeFilters} />
          </div>
        </Container>
      </section>
    </>
  );
}
