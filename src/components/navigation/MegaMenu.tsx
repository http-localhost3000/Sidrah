"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { cn } from "@/lib/cn";

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

// The Shop mega panel. Rendered inside the Navbar and animated open/closed by
// the parent. A single centred directory of the nine main categories.
export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "border-b border-rule bg-page shadow-2",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1100px] px-5 py-12 text-center sm:px-6 lg:px-10">
        <p className="eyebrow text-ink/55">Categories</p>

        <ul className="mx-auto mt-8 grid max-w-[820px] grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-6">
          {collections.map((c) => (
            <li key={c.id}>
              <Link
                href={`/collections/${c.slug}`}
                onClick={onNavigate}
                className="group inline-flex items-baseline gap-1 font-display text-[1.4rem] leading-tight text-ink transition-colors hover:text-ink/60"
              >
                {c.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 translate-y-0.5 text-ink/40 opacity-0 transition-all duration-200 group-hover:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/shop"
            onClick={onNavigate}
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-sm border border-ink bg-ink px-7 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-page transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(36,35,31,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span>Shop all products</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
