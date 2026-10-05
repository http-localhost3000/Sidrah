import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
  imageTone?: "cream" | "sage" | "ivory" | "warm";
}

export function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const sizeSummary =
    product.sizes.length > 3
      ? `${product.sizes[0]} — ${product.sizes[product.sizes.length - 1]}`
      : product.sizes.join(" · ");

  const primaryImage = product.images[0];
  const originalPrice = product.price;
  const discountAmount = product.discount ?? 10;
  const currentPrice = originalPrice - discountAmount;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-card shadow-sm transition-all duration-300 hover:border-ink/25 hover:shadow-md",
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block overflow-hidden bg-[#f7f5f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className="transition-transform duration-500 group-hover:scale-105">
          <div className="relative w-full overflow-hidden bg-[#f7f5f2] aspect-[4/5]">
            <div className="absolute inset-2 sm:inset-3">
              {primaryImage ? (
                <Image
                  src={primaryImage.src}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 24vw"
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-ink/40">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.newArrival && (
            <span className="inline-flex items-center justify-center rounded-sm font-sans font-medium uppercase tracking-[0.14em] bg-ink text-page h-5 px-2 text-[0.62rem]">
              New
            </span>
          )}
          {discountAmount > 0 && (
            <span className="inline-flex items-center justify-center rounded-sm font-sans font-medium uppercase tracking-[0.14em] border h-5 px-2 text-[0.62rem] border-red-600/40 bg-red-50/95 text-red-700 backdrop-blur-sm">
              Save ₹{discountAmount}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.brand && product.brand !== "Unbranded" && (
          <p className="text-[0.7rem] font-medium uppercase tracking-wider text-ink/50">
            {product.brand}
          </p>
        )}
        <h3 className="mt-2 text-sm font-normal leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-ink/70"
          >
            {product.name}
            {product.setQuantity ? ` (Set of ${product.setQuantity} pcs)` : ""}
          </Link>
        </h3>
        <p className="mt-1.5 text-xs text-ink/50">
          Sizes: {sizeSummary}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-base font-semibold text-ink">
            ₹{currentPrice}
          </span>
          {discountAmount > 0 && (
            <span className="text-sm text-ink/40 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          <a
            href={buildEnquiryUrl({
              name: product.name,
              brand: product.brand,
              sku: product.sku,
              slug: product.slug,
            })}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-green-600 bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
