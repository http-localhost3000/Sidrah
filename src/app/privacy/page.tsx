import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Sidrah Fashion",
  description:
    "Privacy Policy for Sidrah Fashion. Learn how we handle information for our wholesale business.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-page pt-section-sm pb-section">
        <Container>
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-ink/55">Legal</p>
            <h1 className="mt-6 font-display text-display-lg md:text-display-xl">
              Privacy Policy
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
                  {site.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                  &ldquo;us&rdquo;) is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, and safeguard
                  information when you visit our website or engage with our
                  wholesale business.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Information We Collect
                </h2>
                <p>
                  As a wholesale business, we may collect business contact
                  information including company name, contact person details,
                  email address, phone number, and shipping address when you
                  enquire about our products or place orders.
                </p>
                <p className="mt-4">
                  We may also collect technical information such as IP address,
                  browser type, and pages visited through standard web analytics.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  How We Use Information
                </h2>
                <p>We use collected information to:</p>
                <ul className="mt-4 space-y-2 list-disc list-inside">
                  <li>Process and fulfill wholesale orders</li>
                  <li>Respond to business enquiries</li>
                  <li>Provide customer support</li>
                  <li>Send product and business updates</li>
                  <li>Improve our website and services</li>
                </ul>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Information Sharing
                </h2>
                <p>
                  We do not sell, trade, or rent your business information to
                  third parties. We may share information with service providers
                  who assist in our operations (such as shipping partners) under
                  strict confidentiality agreements.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  WhatsApp Communication
                </h2>
                <p>
                  When you contact us via WhatsApp, your messages are subject to
                  WhatsApp&rsquo;s own privacy policy and terms. We use WhatsApp
                  solely for business communication and order coordination.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  information. However, no method of transmission over the
                  internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Your Rights
                </h2>
                <p>
                  You have the right to access, correct, or delete your business
                  information. Contact us at{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ink underline underline-offset-4 hover:text-ink/70"
                  >
                    {site.email}
                  </a>{" "}
                  for any privacy-related requests.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Changes
                  will be posted on this page with an updated revision date.
                </p>
              </section>

              <section>
                <h2 className="mt-12 mb-4 font-display text-display-sm text-ink">
                  Contact Us
                </h2>
                <p>
                  For questions about this Privacy Policy, please contact us:
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
