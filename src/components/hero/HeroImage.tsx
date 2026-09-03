import Image from "next/image";
import { cn } from "@/lib/cn";
import { heroImage } from "@/data/hero";

interface HeroImageProps {
  className?: string;
  priority?: boolean;
  /** Override the focal point (any CSS object-position value) */
  focalPoint?: string;
  /** Override src (defaults to the configured hero asset) */
  src?: string;
  /** Override alt text */
  alt?: string;
}

// Production-ready hero image wrapper.
//
// Contract:
//   - Fills the parent aspect-ratio container edge to edge (object-cover).
//   - Respects a controllable focal point via CSS object-position.
//   - Ships with a clearly-named SVG placeholder at /images/hero/hero-01.svg.
//   - When the real campaign photograph is supplied, either:
//       a) drop it in as /public/images/hero/hero-01.jpg (or .webp) and
//          update `src` in src/data/hero.ts, or
//       b) pass a bespoke `src` and `focalPoint` via props for this page.
//   - No layout shift: the parent aspect box reserves the space; next/image
//     `fill` composites into it.
//   - Delivers responsive sizes for the hero column (100vw mobile, ~50vw
//     desktop) so real photography loads at appropriate resolution.
export function HeroImage({
  className,
  priority = true,
  focalPoint = heroImage.focalPoint,
  src = heroImage.src,
  alt = heroImage.alt,
}: HeroImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      style={{ objectFit: "cover", objectPosition: focalPoint }}
      className={cn("select-none", className)}
    />
  );
}
