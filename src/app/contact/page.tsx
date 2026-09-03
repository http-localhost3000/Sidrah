import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Sidrah Fashion",
  description:
    "Get in touch with Sidrah Fashion. Wholesale enquiries, product availability and business enquiries handled via WhatsApp.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Sidrah Fashion,\n\nI would like to know more about your wholesale collection.")}`;

  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Contact</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Get in touch.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-ink/75">
              All wholesale enquiries, product availability questions and
              business discussions are handled directly through WhatsApp by the
              Sidrah Fashion team.
            </p>

            <div className="mt-12">
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

      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="eyebrow text-ink/55">Contact Information</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-caption font-medium uppercase tracking-wide text-ink/60">
                      WhatsApp
                    </h3>
                    <a
                      href={`tel:${site.phone}`}
                      className="mt-2 block text-body-lg text-ink hover:text-ink/70 transition-colors"
                    >
                      {site.whatsapp}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-caption font-medium uppercase tracking-wide text-ink/60">
                      Email
                    </h3>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 block text-body-lg text-ink hover:text-ink/70 transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-caption font-medium uppercase tracking-wide text-ink/60">
                      Instagram
                    </h3>
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-body-lg text-ink hover:text-ink/70 transition-colors"
                    >
                      @{site.instagram.handle}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="eyebrow text-ink/55">Office Location</h2>
                <address className="mt-6 text-body-lg not-italic text-ink/80">
                  <strong className="font-medium text-ink">
                    {site.name}
                  </strong>
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city} {site.address.postalCode}
                  <br />
                  {site.address.country}
                </address>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-page py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-display-md">
              Wholesale enquiries
            </h2>
            <div className="mt-8 space-y-6 text-body-lg text-ink/80">
              <p>
                For product availability, wholesale pricing, set quantities,
                minimum order requirements, lead times or any business-related
                questions, please reach out on WhatsApp.
              </p>
              <p>
                Our team responds to enquiries during Mumbai business hours and
                can share the current catalogue, pricing structure and shipping
                information.
              </p>
            </div>
            <div className="mt-10">
              <Link
                href="/retailer"
                className="inline-flex h-12 items-center rounded-sm border border-rule bg-card px-6 text-caption font-medium text-ink transition-colors hover:border-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Become a Retailer
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
