import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions — Sidrah Fashion",
  description:
    "Terms and Conditions for Sidrah Fashion wholesale business. Read our terms for wholesale orders and business relationships.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Legal</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Terms & Conditions
            </h1>
            <p className="mt-6 text-body text-ink/60">
              Last updated: August 2026
            </p>

            <div className="prose-sidrah mt-12 max-w-none space-y-8 text-body-lg text-ink/80">
              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Overview
                </h2>
                <p>
                  These Terms and Conditions govern your use of the {site.name}{" "}
                  website and your business relationship with us for wholesale
                  purchases. By accessing our website or placing orders, you
                  agree to these terms.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Wholesale Business
                </h2>
                <p>
                  {site.name} is a wholesale-only business. We sell boys&rsquo;
                  wear to retailers, boutiques, and resellers. Products are sold
                  in sets with minimum quantity requirements. We do not sell
                  directly to end consumers.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Orders & Pricing
                </h2>
                <p>
                  All orders are subject to availability and confirmation. Prices
                  are quoted in Indian Rupees (INR) unless otherwise stated.
                  Final wholesale pricing, set quantities, and minimum order
                  requirements are confirmed during order discussions.
                </p>
                <p className="mt-4">
                  We reserve the right to change prices and product availability
                  without prior notice. Confirmed orders are subject to the
                  pricing agreed at the time of order confirmation.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Payment Terms
                </h2>
                <p>
                  Payment terms and methods are discussed and agreed upon for
                  each wholesale order. Specific payment terms may vary based on
                  order size, destination, and business relationship.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Shipping & Delivery
                </h2>
                <p>
                  We ship worldwide. Shipping charges apply based on destination,
                  order size, and shipping requirements. Lead times vary
                  depending on stock availability and destination. Customs
                  duties, taxes, and import fees for international orders are the
                  buyer&rsquo;s responsibility.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Product Information
                </h2>
                <p>
                  We strive to display accurate product information, images, and
                  descriptions. However, we do not warrant that product
                  descriptions, colors, or images are accurate or complete.
                  Products may vary slightly from images shown.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Returns & Exchanges
                </h2>
                <p>
                  As a wholesale business, our return and exchange policies are
                  discussed on a case-by-case basis. Defective or damaged goods
                  should be reported immediately upon receipt.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Intellectual Property
                </h2>
                <p>
                  All content on this website, including but not limited to text,
                  graphics, logos, images, and software, is the property of{" "}
                  {site.name} and protected by copyright and trademark laws.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Limitation of Liability
                </h2>
                <p>
                  {site.name} shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from the use of our
                  website or products, or from any wholesale transactions.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Governing Law
                </h2>
                <p>
                  These Terms and Conditions are governed by the laws of India.
                  Any disputes shall be subject to the exclusive jurisdiction of
                  the courts in Mumbai, India.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at
                  any time. Changes will be effective immediately upon posting to
                  this website.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Contact Information
                </h2>
                <p>
                  For questions about these Terms and Conditions, please contact
                  us:
                </p>
                <address className="mt-4 not-italic">
                  <strong>{site.name}</strong>
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city} {site.address.postalCode}, {site.address.country}
                  <br />
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink underline underline-offset-4 hover:text-ink/70"
                  >
                    {site.email}
                  </a>
                  <br />
                  WhatsApp: {site.whatsapp}
                </address>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
