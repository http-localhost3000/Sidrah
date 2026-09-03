export interface HeroImageAsset {
  src: string;
  alt: string;
  focalPoint: string; // any valid CSS object-position value
  width: number;
  height: number;
}

// Swap `src` (and optionally width/height/focalPoint) with the real
// Sidrah Fashion campaign photograph when it lands. Suggested layout:
//   /public/images/hero/hero-01.jpg  (or .webp / .avif)
// Keep the same portrait-ish aspect (~4:5 or 3:4) so the container
// composes exactly the same on every viewport with zero layout shift.
export const heroImage: HeroImageAsset = {
  src: "/images/hero/hero-01.svg",
  alt: "Sidrah Fashion — premium wholesale boys’ wear campaign",
  focalPoint: "50% 35%",
  width: 800,
  height: 1000,
};
