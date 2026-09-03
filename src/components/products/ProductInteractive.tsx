"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WholesalePriceBlock } from "./WholesalePriceBlock";
import { SizeSelector } from "./SizeSelector";
import { EnquireWhatsApp } from "./EnquireWhatsApp";
import { StickyEnquiryBar } from "./StickyEnquiryBar";
import { SizeChartModal } from "./SizeChartModal";
import type { Product } from "@/types/product";

interface ProductInteractiveProps {
  product: Product;
  subcategoryLabel?: string;
}

/**
 * Client shell for the product-detail right column. Owns the selected-size
 * state so the price block, size selector, WhatsApp CTA and mobile sticky
 * bar all stay in sync from a single source of truth.
 */
export function ProductInteractive({
  product,
  subcategoryLabel,
}: ProductInteractiveProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          {product.brand && product.brand !== "Unbranded" && (
            <Link
              href={`/brands/${product.brandSlug}`}
              className="eyebrow inline-flex items-center gap-1 text-ink/60 transition-colors hover:text-ink"
            >
              {product.brand}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          )}
          <h1 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-ink">
            {product.name}
          </h1>
          <p className="mt-3 text-caption text-ink/55">
            <Link
              href={`/collections/${product.category}`}
              className="capitalize underline-offset-4 hover:text-ink hover:underline"
            >
              {product.category.replace(/-/g, " ")}
            </Link>
            {subcategoryLabel && product.subcategory && (
              <>
                {" · "}
                <Link
                  href={`/collections/${product.category}?sub=${product.subcategory}`}
                  className="underline-offset-4 hover:text-ink hover:underline"
                >
                  {subcategoryLabel}
                </Link>
              </>
            )}
            {" · "}
            <span className="text-ink/55">SKU {product.sku}</span>
          </p>
        </div>

        <WholesalePriceBlock product={product} showPricing />

        <SizeSelector
          sizes={product.sizes}
          value={selectedSize}
          onChange={setSelectedSize}
          onOpenSizeChart={() => setChartOpen(true)}
        />

        <EnquireWhatsApp product={product} selectedSize={selectedSize} />

        <p className="text-caption text-ink/60">
          Every enquiry is answered by the Sidrah Fashion team on WhatsApp with
          current pricing, availability and lead times.
        </p>
      </div>

      <StickyEnquiryBar product={product} selectedSize={selectedSize} />
      <SizeChartModal
        open={chartOpen}
        onClose={() => setChartOpen(false)}
        category={product.category}
      />
    </>
  );
}
