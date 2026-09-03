import { brands } from "@/data/brands";
import { products } from "@/data/products";
import type { Brand } from "@/types/brand";

export function getBrands(): Brand[] {
  return brands.map((b) => ({
    ...b,
    productCount: products.filter((p) => p.brandSlug === b.slug).length,
  }));
}

export function getBrandBySlug(slug: string): Brand | undefined {
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return undefined;
  return {
    ...brand,
    productCount: products.filter((p) => p.brandSlug === slug).length,
  };
}
