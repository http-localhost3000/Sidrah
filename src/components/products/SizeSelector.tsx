"use client";

import { cn } from "@/lib/cn";

interface SizeSelectorProps {
  sizes: string[];
  value?: string;
  onChange: (size: string | undefined) => void;
  onOpenSizeChart?: () => void;
}

/**
 * Size selector. Only renders sizes actually available on the product; the
 * selected size lifts into the parent so downstream components (WhatsApp CTA,
 * sticky enquiry bar) can react.
 */
export function SizeSelector({
  sizes,
  value,
  onChange,
  onOpenSizeChart,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-ink/55">
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
      ) : (
        <ul
          role="radiogroup"
          aria-label="Available sizes"
          className="mt-4 flex flex-wrap gap-2"
        >
          {sizes.map((size) => {
            const selected = value === size;
            return (
              <li key={size}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onChange(selected ? undefined : size)}
                  className={cn(
                    "inline-flex h-11 min-w-[3rem] items-center justify-center rounded-sm border px-3 text-caption font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page",
                    selected
                      ? "border-ink bg-ink text-page"
                      : "border-ink/25 bg-card text-ink hover:border-ink",
                  )}
                >
                  {size}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
