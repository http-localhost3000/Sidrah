import { brands } from "@/data/brands";
import { products } from "@/data/products";
import type { Brand } from "@/types/brand";

export function normalizeBrandSlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const s = slug.toLowerCase().trim();
  if (s === "rock-n-ride" || s === "rock-and-ride" || s === "rocknride") {
    return "rock-and-ride";
  }
  if (s === "g-boys" || s === "gboys") {
    return "g-boys";
  }
  if (s === "olive-+-fig" || s === "olive-fig" || s === "olive-and-fig" || s === "oliveandfig") {
    return "olive-and-fig";
  }
  if (s === "king-and-queenie" || s === "king-n-queenie" || s === "kingnqueenie") {
    return "king-n-queenie";
  }
  return s;
}

export function getBrands(): Brand[] {
  return brands.map((b) => ({
    ...b,
    productCount: products.filter((p) => p.brandSlug === b.slug).length,
  }));
}

export function getBrandBySlug(slug: string): Brand | undefined {
  const normSlug = normalizeBrandSlug(slug);
  const brand = brands.find((b) => b.slug === normSlug || b.slug === slug);
  if (!brand) return undefined;
  return {
    ...brand,
    productCount: products.filter((p) => p.brandSlug === brand.slug).length,
  };
}

