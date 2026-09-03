import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";

export function RetailerCta() {
  return (
    <section className="bg-ink text-page">
      <Container className="grid gap-10 py-section lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 lg:pr-10">
          <p className="eyebrow text-page/60">Wholesale</p>
          <h2 className="mt-6 max-w-editorial font-display text-display-lg text-page">
            Ready to stock Sidrah Fashion?
          </h2>
          <p className="mt-6 max-w-prose text-body-lg text-page/75">
            Join retailers buying premium boys&rsquo; wear for their stores and
            businesses. Introduce yourself and we&rsquo;ll share the current
            catalogue, wholesale terms and lead times.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="/retailer" variant="primary" size="lg">
              Become a Retailer
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg" className="border-page/30 text-page hover:border-page hover:bg-page hover:text-ink">
              Contact the team
            </LinkButton>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="border border-page/10">
            <PlaceholderVisual aspect="portrait" tone="sage" label="Retailer · Sidrah" />
          </div>
        </div>
      </Container>
    </section>
  );
}
