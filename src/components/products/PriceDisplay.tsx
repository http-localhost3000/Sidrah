import { formatMoney, formatSetLabel } from "@/lib/format";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

interface PriceDisplayProps {
  product: Pick<Product, "price" | "discount" | "currency" | "setQuantity">;
  variant?: "enquiry" | "wholesale";
  className?: string;
}

// Displays a wholesale price block. Defaults to the enquiry variant while
// real wholesale prices are pending — flip variant="wholesale" once pricing
// is confirmed and the component will render the actual value + discount.
export function PriceDisplay({
  product,
  variant = "enquiry",
  className,
}: PriceDisplayProps) {
  const showPrice = variant === "wholesale";

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showPrice ? (
        <div className="flex items-baseline gap-3">
          <span className="font-display text-h-md text-ink">
            {formatMoney(product.price - (product.discount ?? 0), product.currency)}
          </span>
          {product.discount && product.discount > 0 && (
            <span className="text-caption text-ink/50 line-through">
              {formatMoney(product.price, product.currency)}
            </span>
          )}
        </div>
      ) : (
        <span className="font-display text-h-md text-ink">
          Price on Enquiry
        </span>
      )}
      <span className="text-caption text-ink/55">
        {formatSetLabel(product.setQuantity)}
      </span>
    </div>
  );
}
