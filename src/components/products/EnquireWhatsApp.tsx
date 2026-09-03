"use client";

import { buildEnquiryUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

interface EnquireWhatsAppProps {
  product: Pick<Product, "name" | "brand" | "sku" | "setQuantity">;
  selectedSize?: string;
  size?: "md" | "lg";
  className?: string;
}

/**
 * Primary WhatsApp enquiry action. Rebuilds its `wa.me` URL every render so
 * the message always reflects the current selected size.
 */
export function EnquireWhatsApp({
  product,
  selectedSize,
  size = "lg",
  className,
}: EnquireWhatsAppProps) {
  const href = buildEnquiryUrl({ product, selectedSize });
  const sizing =
    size === "lg" ? "h-14 px-8 text-[0.78rem]" : "h-11 px-6 text-[0.72rem]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex w-full items-center justify-center gap-3 border border-ink bg-ink text-page font-sans font-medium uppercase tracking-[0.14em] leading-none transition-colors duration-150 ease-editorial hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded-sm",
        sizing,
        className,
      )}
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span>Enquire on WhatsApp</span>
    </a>
  );
}
