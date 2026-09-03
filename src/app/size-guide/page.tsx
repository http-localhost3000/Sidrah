import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SizeChart } from "@/components/products/SizeChart";
import { genericBoyswearChart } from "@/data/sizeChart";

export const metadata: Metadata = {
  title: "Size Guide — Sidrah Fashion",
  description:
    "Reference sizing guide for Sidrah Fashion boyswear. Size availability varies by product category.",
};

export default function SizeGuidePage() {
  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Size Guide</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Reference sizing for boyswear.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-ink/75">
              This is a general size guide for Sidrah Fashion boyswear. Size
              availability varies by product category and collection. Refer to
              individual product pages for exact sizes available.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="eyebrow text-ink/55">General Size Chart</h2>
            <div className="mt-8 overflow-x-auto">
              <SizeChart rows={genericBoyswearChart} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">
              Size availability by category
            </h2>
            <div className="mt-10 space-y-8">
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Shirts</h3>
                <p className="mt-3 text-body text-ink/75">
                  6–36 months, 2–6 years (varies by style)
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">T-Shirts & Polos</h3>
                <p className="mt-3 text-body text-ink/75">
                  6–13 months, 24–36 months, 2–14 years (varies by style)
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Denims</h3>
                <p className="mt-3 text-body text-ink/75">
                  6–36 months, 2–16 years
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Track Pants</h3>
                <p className="mt-3 text-body text-ink/75">
                  8–13 months, 2–7 years
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Shorts</h3>
                <p className="mt-3 text-body text-ink/75">
                  1–9 months, 2–7 years
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Cord Sets</h3>
                <p className="mt-3 text-body text-ink/75">
                  6, 12, 18 months, 8–13 months, 2–7 years, 14–16 years
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <h3 className="eyebrow text-ink">Cargo & Linen Pants</h3>
                <p className="mt-3 text-body text-ink/75">
                  6–36 months, 2–16 years
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-sm border border-rule bg-surface p-8">
              <p className="eyebrow text-ink/55">Important Note</p>
              <p className="mt-4 text-body-lg text-ink/80">
                Size availability varies by individual product. Always check the
                specific product page for exact sizes available for that style.
                For sizing questions or fit information, contact us on WhatsApp.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
