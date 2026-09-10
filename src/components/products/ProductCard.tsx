import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "./PriceDisplay";
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
  imageTone = "cream",
}: ProductCardProps) {
  const sizeSummary =
    product.sizes.length > 3
      ? `${product.sizes[0]} — ${product.sizes[product.sizes.length - 1]}`
      : product.sizes.join(" · ");

  // First image is the primary card image
  const primaryImage = product.images[0];

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-ink/10 bg-card shadow-1",
        "transition-all duration-300 ease-editorial",
        "hover:-translate-y-1 hover:border-ink/30 hover:shadow-2",
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={product.name}
        className="relative block overflow-hidden bg-[#f7f5f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <div className="transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
          <ProductImage
            image={primaryImage}
            alt={product.name}
            aspect="portrait"
            tone={imageTone}
            showMark={true}
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 24vw"
          />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.newArrival && <Badge tone="ink">New</Badge>}
          {product.featured && !product.newArrival && (
            <Badge tone="outline">Featured</Badge>
          )}
          {!!product.discount && product.discount > 0 && (
            <Badge
              tone="outline"
              className="border-ink/25 bg-page/90 backdrop-blur-sm"
            >
              ₹{product.discount} OFF
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        {product.brand && product.brand !== "Unbranded" && (
          <p className="eyebrow flex items-center gap-2.5 text-ink/55">
            <span aria-hidden="true" className="h-px w-4 bg-tan" />
            {product.brand}
          </p>
        )}
        <h3 className="mt-2.5 font-display text-h-lg text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-ink/70"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-caption text-ink/55">
          {product.category.replace("-", " ")} · Sizes {sizeSummary}
        </p>

        <div className="mt-auto pt-5">
          <div className="rule-t flex items-end justify-between gap-4 pt-4">
            <PriceDisplay product={product} variant="enquiry" />
            <a
              href={buildEnquiryUrl({
                name: product.name,
                brand: product.brand,
                sku: product.sku,
              })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-ink/20 text-ink transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
