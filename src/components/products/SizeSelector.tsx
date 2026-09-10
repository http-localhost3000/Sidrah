"use client";

import { cn } from "@/lib/cn";
import type { PricingVariant } from "@/types/product";

interface SizeSelectorProps {
  sizes: string[];
  value?: string;
  onChange: (size: string | undefined) => void;
  onOpenSizeChart?: () => void;
  pricingVariants?: PricingVariant[];
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  onOpenSizeChart,
  pricingVariants,
}: SizeSelectorProps) {
  const btn = (size: string) => {
    const selected = value === size;
    return (
      <li key={size}>
        <button
          type="button"
          role="radio"
          aria-checked={selected}
          onClick={() => onChange(selected ? undefined : size)}
          className={cn(
            "inline-flex h-11 min-w-[3rem] items-center justify-center rounded-sm border px-3 text-caption font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-page",
            selected
              ? "border-accent-warm bg-accent-warm text-page"
              : "border-ink/40 bg-card text-ink hover:border-ink",
          )}
        >
          {size}
        </button>
      </li>
    );
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-ink/75">
          Size {value && <span className="ml-1 text-ink">· {value}</span>}
        </p>
        {onOpenSizeChart && (
          <button
            type="button"
            onClick={onOpenSizeChart}
            className="text-caption text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Size chart
          </button>
        )}
      </div>

      {sizes.length === 0 ? (
        <p className="mt-4 text-caption text-ink/55">
          Size availability confirmed on enquiry.
        </p>
      ) : pricingVariants && pricingVariants.length > 1 ? (
        <div className="mt-4 flex flex-col gap-4">
          {pricingVariants.map((variant) => (
            <div key={variant.label}>
              <p className="eyebrow mb-2 text-[0.62rem] text-ink/45">
                {variant.label}
              </p>
              <ul role="radiogroup" aria-label={variant.label} className="flex flex-wrap gap-2">
                {variant.sizes.map(btn)}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ul
          role="radiogroup"
          aria-label="Available sizes"
          className="mt-4 flex flex-wrap gap-2"
        >
          {sizes.map(btn)}
        </ul>
      )}
    </div>
  );
}
