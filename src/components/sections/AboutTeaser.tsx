import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function AboutTeaser() {
  return (
    <Container className="grid gap-10 py-section lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-rule bg-surface shadow-1">
          <Image
            src="/images/products/SIDRAH%20FASHION%20PRODUCTS%20IMAGE/WhatsApp%20Image%202026-08-25%20at%204.53.20%20PM.jpeg"
            alt="Sidrah Fashion G-Boys Kids Wear Craftsmanship"
            fill
            className="object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center lg:col-span-7 lg:pl-4">
        <p className="eyebrow text-ink/55">About Sidrah Fashion</p>
        <h2 className="mt-6 max-w-editorial font-display text-display-md md:text-display-lg">
          A wholesale house for premium boys&rsquo; wear.
        </h2>
        <div className="mt-6 max-w-prose space-y-5 text-body-lg text-ink/75">
          <p>
            Sidrah Fashion is a wholesale boys&rsquo; wear business offering a
            curated range of shirts, T-shirts, denim, pants, shorts, cord sets
            and more for retailers.
          </p>
          <p>
            Based in Mumbai, India, we serve wholesale customers with
            worldwide shipping — supplying boutiques, multi-brand stores and
            children&rsquo;s wear specialists across markets.
          </p>
        </div>
        <Link
          href="/about"
          className="eyebrow mt-10 inline-flex items-center gap-1 text-ink transition-colors hover:text-ink/60"
        >
          Discover our story
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Container>
  );
}
