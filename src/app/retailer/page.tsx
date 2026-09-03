import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Become a Retailer — Sidrah Fashion",
  description:
    "Join retailers worldwide buying premium boys' wear from Sidrah Fashion. Wholesale boyswear for boutiques, multi-brand stores and children's wear specialists.",
};

export default function RetailerPage() {
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Sidrah Fashion,\n\nI am interested in becoming a retailer. Please share your wholesale terms, catalogue and minimum order requirements.")}`;

  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Wholesale</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Ready to stock Sidrah Fashion?
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-ink/75">
              Join retailers buying premium boys&rsquo; wear for their stores
              and businesses. Introduce yourself and we&rsquo;ll share the
              current catalogue, wholesale terms and lead times.
            </p>

            <div className="mt-12">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 rounded-sm border border-ink bg-ink px-8 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Get in Touch on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Why Sidrah Fashion</h2>
            <div className="mt-10 space-y-8">
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Wholesale focused</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  Built for retailers, boutiques and resellers. Every style is
                  sold in wholesale sets with clear set quantities and pricing.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Boys&rsquo; wear specialists</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  A curated boyswear house across nine considered collections —
                  shirts, T-shirts, denim, pants, shorts, cord sets and more.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Worldwide shipping</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  International shipping available with destination-based
                  charges. We serve retailers across markets globally.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Direct support</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  WhatsApp enquiries handled by the Sidrah Fashion team with
                  pricing, availability and lead time information.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">How it works</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-surface text-body font-medium text-ink">
                  1
                </div>
                <h3 className="mt-4 eyebrow text-ink">Get in touch</h3>
                <p className="mt-2 text-body text-ink/75">
                  Contact us on WhatsApp to introduce yourself and your
                  business.
                </p>
              </div>
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-surface text-body font-medium text-ink">
                  2
                </div>
                <h3 className="mt-4 eyebrow text-ink">Review catalogue</h3>
                <p className="mt-2 text-body text-ink/75">
                  We&rsquo;ll share our current catalogue with wholesale pricing
                  and set quantities.
                </p>
              </div>
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-surface text-body font-medium text-ink">
                  3
                </div>
                <h3 className="mt-4 eyebrow text-ink">Place orders</h3>
                <p className="mt-2 text-body text-ink/75">
                  Discuss availability, lead times and place your wholesale
                  orders.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Our collections</h2>
            <p className="mt-6 max-w-prose text-body-lg text-ink/75">
              Explore shirts, T-shirts, denim, track pants, shorts, cord sets,
              cargo pants, linen pants and kurtas across four in-house brands.
              Age availability ranges from 6 months through 16 years depending
              on the collection.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-sm border border-rule bg-card p-6">
                <p className="font-display text-[2rem] leading-none text-ink">
                  4
                </p>
                <p className="mt-2 text-caption text-ink/60">Brands</p>
              </div>
              <div className="rounded-sm border border-rule bg-card p-6">
                <p className="font-display text-[2rem] leading-none text-ink">
                  9
                </p>
                <p className="mt-2 text-caption text-ink/60">Collections</p>
              </div>
              <div className="rounded-sm border border-rule bg-card p-6">
                <p className="font-display text-[2rem] leading-none text-ink">
                  6M–16Y
                </p>
                <p className="mt-2 text-caption text-ink/60">Age range</p>
              </div>
              <div className="rounded-sm border border-rule bg-card p-6">
                <p className="font-display text-[2rem] leading-none text-ink">
                  Worldwide
                </p>
                <p className="mt-2 text-caption text-ink/60">Shipping</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-display-md">
              Ready to get started?
            </h2>
            <p className="mt-6 text-body-lg text-ink/75">
              Contact the Sidrah Fashion team on WhatsApp to discuss wholesale
              terms, minimum orders and current availability.
            </p>
            <div className="mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 rounded-sm border border-ink bg-ink px-8 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>Contact on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
