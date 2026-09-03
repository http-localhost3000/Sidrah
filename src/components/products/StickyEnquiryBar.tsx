"use client";

import { buildEnquiryUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import type { Product } from "@/types/product";

interface StickyEnquiryBarProps {
  product: Pick<
    Product,
    "name" | "brand" | "sku" | "setQuantity"
  >;
  selectedSize?: string;
}

/**
 * Mobile-only bottom bar with the product enquiry action always in reach.
 * Uses env(safe-area-inset-bottom) so it respects iOS home-indicator space.
 */
export function StickyEnquiryBar({
  product,
  selectedSize,
}: StickyEnquiryBarProps) {
  const href = buildEnquiryUrl({ product, selectedSize });

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-page shadow-2 lg:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          {product.brand && product.brand !== "Unbranded" && (
            <p className="truncate text-caption text-ink/55">
              {product.brand}
            </p>
          )}
          <p className="truncate font-display text-body text-ink">
            {product.name}
            {selectedSize && (
              <span className="ml-2 text-ink/60">· {selectedSize}</span>
            )}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-sm border border-ink bg-ink px-5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>Enquire</span>
        </a>
      </div>
    </div>
  );
}
