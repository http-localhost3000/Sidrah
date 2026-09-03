"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { collections } from "@/data/collections";
import { brands } from "@/data/brands";
import { primaryNav, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expanded, setExpanded] = useState<"shop" | "brands" | null>("shop");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const toggle = (key: "shop" | "brands") =>
    setExpanded((v) => (v === key ? null : key));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu overlay"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/55 transition-opacity duration-300 ease-editorial",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-page shadow-2 transition-transform duration-300 ease-editorial",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <Logo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 rounded-sm p-2 text-ink/60 transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-rule">
            <li>
              <button
                type="button"
                onClick={() => toggle("shop")}
                aria-expanded={expanded === "shop"}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display text-h-lg">Shop</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 text-ink/60 transition-transform duration-300 ease-editorial",
                    expanded === "shop" && "rotate-180",
                  )}
                />
              </button>
              {expanded === "shop" && (
                <div className="bg-surface px-5 pb-5 pt-1">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {collections.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/collections/${c.slug}`}
                          onClick={onClose}
                          className="block py-1.5 text-body text-ink/85"
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="eyebrow mt-5 inline-block text-ink/60"
                  >
                    Shop all →
                  </Link>
                </div>
              )}
            </li>

            <li>
              <button
                type="button"
                onClick={() => toggle("brands")}
                aria-expanded={expanded === "brands"}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display text-h-lg">Brands</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 text-ink/60 transition-transform duration-300 ease-editorial",
                    expanded === "brands" && "rotate-180",
                  )}
                />
              </button>
              {expanded === "brands" && (
                <div className="bg-surface px-5 pb-5 pt-1">
                  <ul className="space-y-2">
                    {brands.map((b) => (
                      <li key={b.id}>
                        <Link
                          href={`/brands/${b.slug}`}
                          onClick={onClose}
                          className="flex items-baseline justify-between gap-4 py-1.5"
                        >
                          <span className="font-display text-body-lg text-ink">
                            {b.name}
                          </span>
                          <span className="text-caption text-ink/55">
                            {b.tagline}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/brands"
                    onClick={onClose}
                    className="eyebrow mt-5 inline-block text-ink/60"
                  >
                    All brands →
                  </Link>
                </div>
              )}
            </li>

            {primaryNav
              .filter((n) => n.label !== "Shop" && n.label !== "Brands")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <span className="font-display text-h-lg">{item.label}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-rule bg-surface p-5">
          <Link
            href="/retailer"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center border border-ink bg-ink px-6 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934]"
          >
            Become a Retailer
          </Link>
          <a
            href={buildEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-full items-center justify-center gap-2 border border-ink/20 bg-card px-6 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>WhatsApp {site.whatsapp}</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
