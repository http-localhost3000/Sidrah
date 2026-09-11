"use client";

import Image from "next/image";
import { useState } from "react";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/common";

type Tone = "cream" | "sage" | "ivory" | "warm";
type Aspect = "portrait" | "square" | "landscape";

interface ProductImageProps {
  image: ImageAsset | undefined;
  alt: string;
  aspect?: Aspect;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  showMark?: boolean;
  /** next/image sizes hint — override per-context for accurate resolution selection */
  sizes?: string;
}

const aspectClass: Record<Aspect, string> = {
  portrait: "aspect-[4/5]",   // suits product photography (shirt/clothing photos)
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

/**
 * Single product image component.
 *
 * — If `image.src` begins with "/" or "http" it renders a real <img> via
 *   next/image with object-fit: contain so clothing photography is never
 *   cropped unexpectedly.
 * — If `image` is undefined, empty, or points to a placeholder path
 *   (.svg placeholder) it falls back to PlaceholderVisual.
 * — On load error it also falls back to PlaceholderVisual so broken-image
 *   icons never appear.
 *
 * When real product photography ships, no other component needs to change —
 * only the `src` field in the product data.
 */
export function ProductImage({
  image,
  alt,
  aspect = "portrait",
  tone = "cream",
  className,
  priority = false,
  showMark = true,
  sizes: sizesProp,
}: ProductImageProps) {
  const [errored, setErrored] = useState(false);

  // Determine whether we have a real image to show.
  // Placeholder paths from the mock data end in .svg under /placeholders/
  // and should still show the visual placeholder.
  const isRealImage =
    !errored &&
    !!image?.src &&
    !image.src.startsWith("/placeholders/") &&
    !image.src.endsWith(".svg");

  if (isRealImage) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[#f7f5f2]",
          aspectClass[aspect],
          className,
        )}
      >
        {/* inset keeps shirt from touching card edges */}
        <div className="absolute inset-2 sm:inset-3">
          <Image
            src={image!.src}
            alt={image!.alt || alt}
            fill
            sizes={sizesProp ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"}
            className="object-contain"
            quality={90}
            priority={priority}
            onError={() => setErrored(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <PlaceholderVisual
      aspect={aspect}
      tone={tone}
      label={image?.alt || alt}
      showMark={showMark}
      className={className}
    />
  );
}
