"use client";

import { usePathname } from "next/navigation";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Floating circular WhatsApp action. Visible on mobile/tablet, hidden on
 * desktop where the header CTA covers this action.
 *
 * Also hidden on routes that already surface a persistent product-level
 * WhatsApp action (product detail page's StickyEnquiryBar) — running two
 * floating CTAs stacked on top of each other reads as clutter.
 */
export function StickyWhatsApp() {
  const pathname = usePathname();
  const hide = pathname?.startsWith("/products/");
  if (hide) return null;

  const href = buildEnquiryUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-page shadow-2 transition-colors hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page lg:hidden"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
