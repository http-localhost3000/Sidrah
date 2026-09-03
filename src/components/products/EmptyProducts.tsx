import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface EmptyProductsProps {
  resetHref?: string;
}

export function EmptyProducts({ resetHref }: EmptyProductsProps) {
  return (
    <div className="flex flex-col items-start gap-6 border border-rule bg-surface p-10 sm:p-14">
      <p className="eyebrow text-ink/55">No results</p>
      <h2 className="max-w-editorial font-display text-display-md">
        No products match these filters.
      </h2>
      <p className="max-w-prose text-body text-ink/70">
        Try loosening one or two filters, or browse the full catalogue and
        we&rsquo;ll surface everything currently available. New arrivals land
        regularly.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {resetHref && (
          <Link
            href={resetHref}
            className="inline-flex h-11 items-center gap-2 border border-ink bg-ink px-5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934]"
          >
            Clear filters
          </Link>
        )}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-caption text-ink transition-colors hover:text-ink/60"
        >
          Browse all products
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
