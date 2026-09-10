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
          </div>

          <FooterColumn title="Shop" items={footerNav.shop} />
          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Legal" items={footerNav.legal} />
        </div>

        <div className="mt-block flex flex-wrap items-center gap-3">
          <a
            href={buildEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden whitespace-nowrap bg-[#25D366] px-5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1eb857] hover:shadow-[0_12px_28px_-8px_rgba(37,211,102,0.55)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <WhatsAppIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>{site.phone}</span>
          </a>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${site.instagram.handle}`}
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden whitespace-nowrap bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] px-5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(188,24,136,0.5)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <Instagram
              className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>@{site.instagram.handle}</span>
          </a>
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
