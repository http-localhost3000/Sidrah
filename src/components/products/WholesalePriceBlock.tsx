import { formatMoney } from "@/lib/format";
import type { Product } from "@/types/product";

interface WholesalePriceBlockProps {
  product: Pick<Product, "price" | "discount" | "currency" | "setQuantity">;
  /**
   * When true, renders full wholesale pricing using product data. When false
   * (the default) shows an "on enquiry" summary — flip to `true` per-product
   * (or globally) as soon as verified wholesale prices are supplied.
   */
  showPricing?: boolean;
}

/**
 * Editorial wholesale pricing block for the product detail page.
 * Structure supports: originalPrice, discount, finalPrice, piecesPerSet.
 * Mock numbers today; the same UI renders real Sidrah Fashion prices without
 * any layout change when they land.
 */
export function WholesalePriceBlock({
  product,
  showPricing = true,
}: WholesalePriceBlockProps) {
  const original = product.price;
  const discount = product.discount ?? 0;
  const final = Math.max(original - discount, 0);

  if (!showPricing) {
    return (
      <div className="border-t border-b border-rule py-6">
        <p className="eyebrow text-ink/55">Wholesale</p>
        <p className="mt-3 font-display text-display-md leading-tight text-ink">
          Price on Enquiry
        </p>
        <p className="mt-3 text-caption text-ink/60">
          Set of {product.setQuantity} pieces · Wholesale pricing shared on
          WhatsApp enquiry.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-b border-rule py-6">
      <p className="eyebrow text-ink/55">Wholesale price</p>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-[2rem] leading-none text-ink line-through decoration-ink/30 decoration-[1.5px]">
          {formatMoney(original, product.currency)}
        </span>
        <span className="eyebrow text-ink/60">/ set</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-ink/70">
        <span>Set of {product.setQuantity} pieces</span>
        {discount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-sm bg-accent-warm/25 px-2 py-0.5 text-ink">
            <span className="eyebrow text-[0.62rem]">
              {formatMoney(discount, product.currency)} off
            </span>
          </span>
        )}
      </div>

      <div className="mt-6 flex items-baseline gap-3 rule-t pt-4">
        <div>
          <p className="eyebrow text-ink/55">Final price</p>
          <p className="mt-2 font-display text-display-md leading-none text-ink">
            {formatMoney(final, product.currency)}
            <span className="eyebrow ml-2 text-ink/55">/ set</span>
          </p>
        </div>
      </div>

      <p className="mt-4 max-w-prose text-caption text-ink/55">
        Placeholder wholesale pricing shown for development. Final rates and
        set quantities are confirmed on WhatsApp enquiry.
      </p>
    </div>
  );
}
