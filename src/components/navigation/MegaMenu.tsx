"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";
import { brands } from "@/data/brands";
import { ageRanges } from "@/data/ages";
import { cn } from "@/lib/cn";

interface MegaMenuProps {
  onNavigate?: () => void;
  className?: string;
}

// The Shop mega panel. Rendered inside the Navbar and animated open/closed by
// the parent. Its contents mirror the /shop and /collections IA so this reads
// as the site's real map, not a decoration.
export function MegaMenu({ onNavigate, className }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "border-b border-rule bg-page shadow-2",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10 xl:px-14">
        <div>
          <p className="eyebrow text-ink/55">Categories</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
            {collections.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/collections/${c.slug}`}
                  onClick={onNavigate}
                  className="group inline-flex items-baseline gap-1 font-display text-[1.35rem] leading-tight text-ink transition-colors hover:text-ink/60"
                >
                  {c.title}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 translate-y-0.5 text-ink/40 opacity-0 transition-all duration-200 group-hover:opacity-100"
                  />
                </Link>
                {c.subcollections.length > 0 && (
                  <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-caption text-ink/55">
                    {c.subcollections.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/collections/${c.slug}?sub=${s.slug}`}
                          onClick={onNavigate}
                          className="transition-colors hover:text-ink"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-ink/55">Brands</p>
          <ul className="mt-6 space-y-3">
            {brands.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/brands/${b.slug}`}
                  onClick={onNavigate}
                  className="group flex items-baseline justify-between gap-4 border-b border-rule pb-3 text-ink transition-colors hover:text-ink/60"
                >
                  <span className="font-display text-[1.15rem] leading-tight">
                    {b.name}
                  </span>
                  <span className="text-caption text-ink/50 transition-colors group-hover:text-ink/70">
                    {b.tagline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/brands"
            onClick={onNavigate}
            className="eyebrow mt-6 inline-flex items-center gap-1 text-ink/60 transition-colors hover:text-ink"
          >
            View all brands
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div>
          <p className="eyebrow text-ink/55">Shop by Age</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-body text-ink/75">
            {ageRanges.slice(0, 10).map((a) => (
              <li key={a.id}>
                <Link
                  href={`/ages#${a.id}`}
                  onClick={onNavigate}
                  className="transition-colors hover:text-ink"
                >
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/ages"
            onClick={onNavigate}
            className="eyebrow mt-6 inline-flex items-center gap-1 text-ink/60 transition-colors hover:text-ink"
          >
            View all age ranges
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
