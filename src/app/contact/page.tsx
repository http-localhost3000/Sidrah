import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — Sidrah Fashion",
  description:
    "Get in touch with Sidrah Fashion. Send us a message or reach us directly on WhatsApp for wholesale enquiries, product availability and business questions.",
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Sidrah Fashion,\n\nI would like to know more about your wholesale collection.")}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-page">
        <Container>
          <div className="mx-auto flex min-h-[58svh] max-w-4xl flex-col justify-center py-20">
            <p className="eyebrow flex items-center gap-2.5 text-ink/55">
              <span aria-hidden="true" className="h-px w-4 bg-tan" />
              Contact
            </p>
            <h1 className="mt-7 font-display text-display-lg md:text-display-xl">
              Get in touch.
            </h1>
            <p className="mt-8 max-w-prose text-body-lg text-ink/75">
              Send us a message below or reach us directly on WhatsApp. We
              handle wholesale enquiries, product availability and business
              discussions personally.
            </p>
            <div className="mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-3 rounded-sm border border-ink bg-ink px-6 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="bg-surface py-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              {/* Contact info sidebar */}
              <div className="space-y-8">
                <div>
                  <h2 className="eyebrow text-ink/55">Contact Information</h2>
                  <div className="mt-6 space-y-6">
                    <div>
                      <p className="text-[0.68rem] font-medium uppercase tracking-wider text-ink/55">
                        WhatsApp
                      </p>
                      <a
                        href={`tel:${site.phone}`}
                        className="mt-2 block text-body text-ink transition-colors hover:text-ink/70"
                      >
                        {site.whatsapp}
                      </a>
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-medium uppercase tracking-wider text-ink/55">
                        Email
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="mt-2 block text-body text-ink transition-colors hover:text-ink/70"
                      >
                        {site.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-[0.68rem] font-medium uppercase tracking-wider text-ink/55">
                        Instagram
                      </p>
                      <a
                        href={site.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-body text-ink transition-colors hover:text-ink/70"
                      >
                        @{site.instagram.handle}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="eyebrow text-ink/55">Office</h2>
                  <address className="mt-6 text-body not-italic text-ink/80">
                    <strong className="font-medium text-ink">{site.name}</strong>
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

              {/* Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Wholesale info */}
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
                questions, please reach out on WhatsApp or use the form above.
              </p>
              <p>
                Our team responds during Mumbai business hours and can share the
                current catalogue, pricing structure and shipping information.
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
