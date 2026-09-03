import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroImage } from "./HeroImage";

// Editorial hero. Split 6/6 on desktop with the image sized taller than the
// text column so the photograph carries slightly more visual weight — the
// text column stays generous but not dominant. Image composition is delegated
// to <HeroImage />, which is the single seam for swapping in real campaign
// photography without touching this layout.
export function Hero() {
  return (
    <section className="relative bg-page">
      <Container className="grid gap-10 pb-block pt-10 lg:grid-cols-12 lg:gap-14 lg:pb-section lg:pt-16">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow text-ink/60">Sidrah Fashion · Est. Mumbai</p>
          <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
            Boyswear,
            <br />
            <span className="italic text-ink/85">built to sell.</span>
          </h1>
          <p className="mt-8 max-w-prose text-body-lg text-ink/75">
            Premium boys&rsquo; fashion for retailers, boutiques and wholesale
            buyers worldwide. A curated house of four brands and nine
            considered collections, shipped from Mumbai.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <LinkButton href="/shop" variant="ink" size="lg">
              Shop Collections
            </LinkButton>
            <LinkButton href="/retailer" variant="secondary" size="lg">
              Become a Retailer
            </LinkButton>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 rule-t pt-6">
            <p className="eyebrow text-ink/55">Four brands</p>
            <p className="eyebrow text-ink/55">Nine collections</p>
            <p className="eyebrow text-ink/55">6 months – 16 years</p>
            <Link
              href="/about"
              className="eyebrow ml-auto inline-flex items-center gap-1 text-ink/70 transition-colors hover:text-ink"
            >
              Discover our story
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <figure className="relative">
            <div className="relative w-full overflow-hidden bg-surface aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
              <HeroImage />
            </div>
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 hidden h-24 w-24 border border-ink/25 bg-page md:block"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.18em] text-ink/70">
                Editorial 01 · SS Campaign
              </span>
              <span className="font-display italic text-[0.9rem] leading-none text-ink/70">
                Sidrah
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
