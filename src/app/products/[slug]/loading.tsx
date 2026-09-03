import { Container } from "@/components/layout/Container";

/**
 * Skeleton state for the product detail page. Mirrors the real layout so the
 * page composes without jump when data resolves. Matches the Sidrah Fashion
 * neutral palette — no shimmery generic-ecommerce blocks.
 */
export default function ProductLoading() {
  return (
    <>
      <div className="bg-page pt-10">
        <Container>
          <div className="h-4 w-64 animate-pulse rounded-sm bg-muted" />
        </Container>
      </div>
      <section className="bg-page pb-section pt-8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="aspect-[4/5] w-full animate-pulse bg-surface" />
              <div className="mt-4 grid grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square w-full animate-pulse bg-surface"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="h-3 w-24 animate-pulse rounded-sm bg-muted" />
              <div className="h-8 w-3/4 animate-pulse rounded-sm bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded-sm bg-muted" />
              <div className="mt-6 h-40 animate-pulse rounded-sm bg-surface" />
              <div className="mt-4 grid grid-cols-6 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-11 animate-pulse rounded-sm bg-muted"
                  />
                ))}
              </div>
              <div className="mt-4 h-14 animate-pulse rounded-sm bg-ink/70" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
