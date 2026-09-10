export interface HeroImageAsset {
  src: string;
  alt: string;
  focalPoint: string;
  width: number;
  height: number;
}

export const heroImage: HeroImageAsset = {
  src: "/images/products/SIDRAH%20FASHION%20PRODUCTS%20IMAGE/IMG_20260903_000818.jpg.jpeg",
  alt: "Sidrah Fashion — premium wholesale boys' fashion",
  focalPoint: "center top",
  width: 800,
  height: 1000,
};

/**
 * Background-free hero garment — the hooded bomber from the brand mockup,
 * extracted with scripts/extract_hero_jacket.py (rembg + script-text
 * inpaint) and presented as a floating object on the hero stage.
 */
export const heroCutout: { src: string; alt: string; width: number; height: number } = {
  src: "/images/hero/hero-jacket.png",
  alt: "Navy and olive hooded jacket — Sidrah Fashion hero piece",
  width: 980,
  height: 724,
};
