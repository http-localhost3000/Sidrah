import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { footerNav, site } from "@/data/site";
import { buildEnquiryUrl } from "@/lib/whatsapp";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-page">
      <Container className="py-section">
        <div className="grid gap-block lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="page" size="lg" />
            <p className="mt-6 max-w-sm text-body text-page/70">
              Premium wholesale boys&rsquo; kidswear from Mumbai. Curated
              brands, considered fabrics, worldwide shipping.
            </p>
            <div className="mt-8 space-y-3 text-body text-page/75">
              <p className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 text-page/50"
                />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city} {site.address.postalCode},{" "}
                  {site.address.country}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Phone
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-page/50"
                />
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-page"
                >
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-page/50"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-page"
                >
                  {site.email}
                </a>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={buildEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 border border-page/25 bg-transparent px-5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:border-page hover:bg-page hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram @${site.instagram.handle}`}
                className="inline-flex h-11 w-11 items-center justify-center border border-page/25 text-page transition-colors hover:border-page hover:bg-page hover:text-ink"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <FooterColumn title="Shop" items={footerNav.shop} />
          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Legal" items={footerNav.legal} />
        </div>
      </Container>

      <div className="border-t border-page/10">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-caption text-page/50 sm:flex-row sm:items-center">
          <p>
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p className="eyebrow text-page/40">
            Wholesale · Mumbai · Worldwide shipping
          </p>
        </Container>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
}

function FooterColumn({ title, items }: FooterColumnProps) {
  return (
    <div>
      <p className="eyebrow text-page/50">{title}</p>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-body text-page/75 transition-colors hover:text-page"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
