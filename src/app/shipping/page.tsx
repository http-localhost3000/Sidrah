import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Shipping — Sidrah Fashion",
  description:
    "Worldwide shipping available for Sidrah Fashion wholesale orders. Shipping charges apply based on destination, order size and requirements.",
};

export default function ShippingPage() {
  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Shipping</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Worldwide shipping available.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-ink/75">
              Sidrah Fashion ships wholesale orders internationally. Shipping
              charges apply based on destination, order size and shipping
              requirements.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Shipping information</h2>
            <div className="mt-10 space-y-8">
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">International shipping</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  We ship to retailers worldwide. Destination-based shipping
                  charges are confirmed on enquiry based on your location and
                  order size.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Lead times</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  Standard lead times and shipping duration vary by destination
                  and current stock availability. Exact timelines are shared
                  during the order discussion.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Order processing</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  Orders are processed and prepared for shipping from our Mumbai
                  location once confirmed. We work with reliable shipping
                  partners for international wholesale deliveries.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Customs & duties</h3>
                <p className="mt-3 max-w-prose text-body-lg text-ink/80">
                  International orders may be subject to customs duties, taxes
                  and fees determined by the destination country. These charges
                  are the responsibility of the buyer.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">Wholesale orders</h2>
            <div className="mt-8 space-y-6 text-body-lg text-ink/80">
              <p>
                For specific shipping costs, delivery timelines, and any special
                shipping requirements for your wholesale order, please contact
                us on WhatsApp.
              </p>
              <p>
                Our team can provide detailed shipping information based on your
                location, order size and preferred shipping method.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href="/contact" variant="ink" size="lg">
                Contact Us
              </LinkButton>
              <LinkButton href="/retailer" variant="secondary" size="lg">
                Become a Retailer
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
