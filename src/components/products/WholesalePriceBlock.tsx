import { formatMoney } from "@/lib/format";
import type { Product } from "@/types/product";

interface WholesalePriceBlockProps {
  product: Pick<Product, "price" | "discount" | "currency" | "setQuantity">;
  /**
   * When true, renders full wholesale pricing using product data. When false
   * (the default) shows an "on enquiry" summary.
   */
  showPricing?: boolean;
  /** Override price — used when a size variant has different pricing. */
  price?: number;
  /** Override discount — used when a size variant has different pricing. */
  discount?: number;
  /** Override setQuantity — used when a size variant has different set size. */
  setQuantity?: number;
}

export function WholesalePriceBlock({
  product,
  showPricing = true,
  price: priceOverride,
  discount: discountOverride,
  setQuantity: setQtyOverride,
}: WholesalePriceBlockProps) {
  const original = priceOverride ?? product.price;
  const discount = discountOverride ?? product.discount ?? 0;
  const setQuantity = setQtyOverride ?? product.setQuantity;
  const final = Math.max(original - discount, 0);

  if (!showPricing) {
    return (
      <div className="border-t border-b border-rule py-6">
        <p className="eyebrow text-ink/55">Wholesale</p>
        <p className="mt-3 font-display text-display-md leading-tight text-ink">
          Price on Enquiry
        </p>
        <p className="mt-3 text-caption text-ink/60">
          Set of {setQuantity} pieces · Wholesale pricing shared on WhatsApp
          enquiry.
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
        <span>Set of {setQuantity} pieces</span>
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
    </div>
  );
}
