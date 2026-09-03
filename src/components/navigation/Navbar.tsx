"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { primaryNav } from "@/data/site";
import { cn } from "@/lib/cn";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mega panel on route change.
  useEffect(() => {
    setShopOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShopOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shopOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-page/95 backdrop-blur-sm rule-b"
        onMouseLeave={() => setShopOpen(false)}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 sm:px-6 lg:h-20 lg:px-10 xl:px-14">
          <div className="flex items-center gap-10">
            <Logo size="sm" className="lg:hidden" />
            <Logo className="hidden lg:inline-flex" />
          </div>

          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:items-center lg:gap-8"
          >
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
            >
              <button
                type="button"
                aria-expanded={shopOpen}
                aria-haspopup="true"
                onClick={() => setShopOpen((v) => !v)}
                onFocus={() => setShopOpen(true)}
                className={cn(
                  "eyebrow inline-flex items-center gap-1 py-2 text-ink transition-colors",
                  shopOpen && "text-ink/60",
                )}
              >
                Shop
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    shopOpen && "rotate-180",
                  )}
                />
              </button>
            </div>

            {primaryNav
              .filter((n) => n.label !== "Shop")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setShopOpen(false)}
                  className={cn(
                    "eyebrow py-2 text-ink transition-colors hover:text-ink/60",
                    isActive(item.href) && "text-ink/60",
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/retailer"
              className="hidden h-10 items-center justify-center border border-ink bg-ink px-5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-page transition-colors hover:bg-[#3a3934] lg:inline-flex"
            >
              Become a Retailer
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-muted lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-editorial lg:block",
            shopOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0",
          )}
          aria-hidden={!shopOpen}
        >
          <MegaMenu onNavigate={() => setShopOpen(false)} />
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
