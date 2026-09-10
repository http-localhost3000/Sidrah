import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About — Sidrah Fashion",
  description:
    "Sidrah Fashion is a wholesale boys' wear business based in Mumbai, India. We supply premium boyswear to retailers, boutiques and multi-brand stores worldwide.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-page">
        <Container>
          <div className="mx-auto flex min-h-[58svh] max-w-4xl flex-col justify-center py-20">
            <p className="eyebrow flex items-center gap-2.5 text-ink/55">
              <span aria-hidden="true" className="h-px w-4 bg-tan" />
              About
            </p>
            <h1 className="mt-7 font-display text-display-lg md:text-display-xl">
              A wholesale house for premium boys&rsquo; wear.
            </h1>
            <div className="mt-10 space-y-6 text-body-lg text-ink/80">
              <p>
                Sidrah Fashion is a wholesale boys&rsquo; wear business offering
                a curated range of shirts, T-shirts, denim, pants, shorts, cord
                sets and more for retailers.
              </p>
              <p>
                Based in Mumbai, India, we serve wholesale customers with
                worldwide shipping — supplying boutiques, multi-brand stores and
                children&rsquo;s wear specialists across markets.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Our collections</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="eyebrow text-ink">Six brands</h3>
                <p className="mt-3 text-body text-ink/75">
                  Every Sidrah Fashion piece belongs to one of our six
                  in-house brands, each with its own point of view.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-ink">Nine collections</h3>
                <p className="mt-3 text-body text-ink/75">
                  From shirts and T-shirts to denim, cord sets and kurtas —
                  curated across everyday and occasion dressing.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-ink">6 months – 16 years</h3>
                <p className="mt-3 text-body text-ink/75">
                  Our size range covers baby boys through to older children,
                  with category-specific age availability.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Wholesale focused</h2>
            <div className="mt-8 space-y-8">
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink/55">For retailers</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  Built for retailers, boutiques and resellers, not end
                  shoppers. Every style is sold in wholesale sets.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink/55">Worldwide shipping</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  International shipping available with destination-based
                  charges.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink/55">Direct enquiries</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  All product and wholesale enquiries are handled through
                  WhatsApp by the Sidrah Fashion team.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <LinkButton href="/retailer" variant="ink" size="lg">
                Become a Retailer
              </LinkButton>
              <LinkButton href="/contact" variant="secondary" size="lg">
                Contact Us
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow text-ink/55">Location</p>
            <h2 className="mt-6 font-display text-display-md">
              Mumbai, India
            </h2>
            <address className="mt-6 text-body-lg not-italic text-ink/75">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postalCode}, {site.address.country}
            </address>
            <div className="mt-8">
              <LinkButton
                href="/contact"
                variant="secondary"
                size="md"
              >
                Get in touch
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
