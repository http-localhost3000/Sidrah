import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col overflow-hidden bg-page">
      {/* ── eyebrow row ─────────────────────────────────────────────── */}
      <Container className="relative z-30 flex items-center justify-between gap-4 pt-6 lg:pt-8">
        <p className="hero-fade-up font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink/70 sm:text-[0.72rem]" style={{ "--hero-delay": "0.1s" } as CSSProperties}>
          Sidrah Fashion · Est. Mumbai
        </p>
        <p className="hero-fade-up hidden font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink/55 sm:block sm:text-[0.72rem]" style={{ "--hero-delay": "0.2s" } as CSSProperties}>
          Boyswear · Wholesale
        </p>
      </Container>

      {/* ── stage ───────────────────────────────────────────────────── */}
      <div className="relative h-[52svh] min-h-[380px] overflow-hidden lg:h-[56svh] lg:min-h-[460px]">
        <Image
          src="/images/hero-sidrah-fashion.jpg"
          alt="Sidrah Fashion Premium Boyswear Clothing & Apparel Collection"
          fill
          priority
          unoptimized
          className="object-cover object-center sm:object-[center_10%]"
        />
        <h1 className="sr-only">
          Sidrah Fashion — premium boyswear wholesale
        </h1>
      </div>

      {/* ── bottom band ─────────────────────────────────────────────── */}
      <Container className="relative z-30 pb-8 pt-2 lg:pb-10">
        <div className="max-w-xl">
          <p className="hero-fade-up font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink" style={{ "--hero-delay": "0.55s" } as CSSProperties}>
            Wholesale pre-booking open
          </p>
          <p className="hero-fade-up mt-3 max-w-sm text-[0.875rem] leading-relaxed text-ink/70" style={{ "--hero-delay": "0.7s" } as CSSProperties}>
            Premium boys&rsquo; fashion for retailers, boutiques and wholesale
            buyers — six brands, nine considered collections, shipped from
            Mumbai.
          </p>
          <div className="hero-fade-up mt-5 flex flex-wrap items-center gap-3" style={{ "--hero-delay": "0.85s" } as CSSProperties}>
            <LinkButton href="/shop" variant="ink" size="md">
              Shop Collections
            </LinkButton>
            <LinkButton href="/retailer" variant="secondary" size="md">
              Become a Retailer
            </LinkButton>
          </div>
        </div>
      </Container>

      {/* ── stat strip ──────────────────────────────────────────────── */}
      <div className="hero-fade relative z-30 rule-t" style={{ "--hero-delay": "1.3s" } as CSSProperties}>
        <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 py-3.5 text-center font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink/55 sm:gap-x-6 sm:text-[0.66rem]">
          <span>06 House Brands</span>
          <span aria-hidden="true" className="text-accent-warm">·</span>
          <span>09 Collections</span>
          <span aria-hidden="true" className="text-accent-warm">·</span>
          <span>Ages 6m–16y</span>
          <span aria-hidden="true" className="text-accent-warm">·</span>
          <span>Ships Worldwide</span>
        </Container>
      </div>
    </section>
  );
}
