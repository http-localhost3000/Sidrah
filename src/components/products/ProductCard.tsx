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
    <article className={cn("group flex flex-col", className)}>
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 ease-editorial group-hover:scale-[1.02]">
            <ProductImage
              image={primaryImage}
              alt={product.name}
              aspect="portrait"
              tone={imageTone}
              showMark={true}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.newArrival && <Badge tone="ink">New</Badge>}
          {product.featured && !product.newArrival && (
            <Badge tone="outline">Featured</Badge>
          )}
        </div>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        {product.brand && product.brand !== "Unbranded" && (
          <p className="eyebrow text-ink/55">{product.brand}</p>
        )}
        <h3 className="mt-2 font-display text-h-lg text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-ink/70"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-caption text-ink/60">
          {product.category.replace("-", " ")} · Sizes {sizeSummary}
        </p>

        <div className="mt-4 flex items-end justify-between gap-4">
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
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
