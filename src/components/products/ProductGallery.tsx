"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/common";

interface ProductGalleryProps {
  images: ImageAsset[];
  productName: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

const tones: Array<"cream" | "sage" | "warm" | "ivory"> = [
  "cream",
  "sage",
  "warm",
  "ivory",
];

/**
 * Product image gallery. Client component: manages active index, keyboard
 * navigation and mobile horizontal-snap scrolling. Images render through
 * `<PlaceholderVisual>` today; swap that single line for `<Image>` when real
 * campaign photography ships to `/images/products/`.
 */
export function ProductGallery({
  images,
  productName,
  isNew,
  isFeatured,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const total = Math.max(images.length, 1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((a) => (a + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!wrapperRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go]);

  const activeImage = images[active];

  return (
    <div ref={wrapperRef} className="flex flex-col gap-4">
      <figure className="relative bg-surface">
        <div className="relative">
          <ProductImage
            image={activeImage}
            alt={productName}
            aspect="portrait"
            tone={tones[active % tones.length]}
            priority={active === 0}
            showMark={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 640px"
          />
        </div>

        {(isNew || isFeatured) && (
          <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
            {isNew && <Badge tone="ink">New</Badge>}
            {isFeatured && !isNew && <Badge tone="outline">Featured</Badge>}
          </div>
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/25 bg-page/90 text-ink shadow-1 backdrop-blur-sm transition-colors hover:border-ink hover:bg-ink hover:text-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/25 bg-page/90 text-ink shadow-1 backdrop-blur-sm transition-colors hover:border-ink hover:bg-ink hover:text-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-page/80 px-3 py-1.5 text-caption text-ink backdrop-blur-sm">
              <span className="font-medium">{active + 1}</span>
              <span className="text-ink/40">/</span>
              <span>{total}</span>
            </div>
          </>
        )}
      </figure>

      {total > 1 && (
        <ul
          role="tablist"
          aria-label="Product images"
          className="grid grid-cols-4 gap-3 sm:gap-4"
        >
          {images.map((img, i) => {
            const isActive = i === active;
            return (
              <li key={i}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View image ${i + 1} of ${total}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "block w-full overflow-hidden border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page",
                    isActive
                      ? "border-ink"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <ProductImage
                    image={img}
                    alt={`${productName} — image ${i + 1}`}
                    aspect="square"
                    tone={tones[i % tones.length]}
                    showMark={false}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
