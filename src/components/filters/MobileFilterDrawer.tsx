"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface MobileFilterDrawerProps {
  /** Rendered FilterSidebar (Server Component) content. */
  children: ReactNode;
  activeCount?: number;
}

/**
 * Mobile-only filter drawer. Wraps a Server Component `<FilterSidebar>` so the
 * filter markup is still generated on the server; this client shell only owns
 * the open/close state and the trigger button. Closes automatically when the
 * URL search params change (i.e. the user picks a filter).
 */
export function MobileFilterDrawer({
  children,
  activeCount = 0,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close on filter change or route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  // Lock body scroll while open + Escape to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 border border-ink/35 bg-card px-4 text-caption font-medium text-ink transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span
            aria-label={`${activeCount} filter${activeCount === 1 ? "" : "s"} applied`}
            className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-sm bg-ink px-1 text-[0.65rem] font-medium text-page"
          >
            {activeCount}
          </span>
        )}
      </button>

      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close filter overlay"
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/55 transition-opacity duration-300 ease-editorial",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={cn(
            "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-page shadow-2 transition-transform duration-300 ease-editorial",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <h2 className="font-display text-h-lg">Filters</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close filters"
              className="-mr-2 rounded-sm p-2 text-ink/60 transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">{children}</div>
          <div className="border-t border-rule bg-surface p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-full items-center justify-center border border-ink bg-ink text-[0.72rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934]"
            >
              View products
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
