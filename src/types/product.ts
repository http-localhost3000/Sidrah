import type { CategorySlug } from "./collection";
import type { ImageAsset, Slug } from "./common";

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface PricingVariant {
  label: string;
  sizes: string[];
  ageRangeIds: string[];
  price: number;
  discount?: number;
  setQuantity: number;
}

export interface Product {
  id: string;
  slug: Slug;
  sku: string;
  name: string;
  brand: string;
  brandSlug: Slug;
  category: CategorySlug;
  subcategory?: string;
  description: string;
  price: number;
  discount?: number;
  currency: "INR" | "USD";
  setQuantity: number;
  sizes: string[];
  ageRangeIds: string[];
  colors: ProductColor[];
  fabric: string;
  fit: string;
  images: ImageAsset[];
  featured?: boolean;
  newArrival?: boolean;
  pricingVariants?: PricingVariant[];
}

export interface ProductFacets {
  brands: { slug: string; name: string; count: number }[];
  categories: { slug: CategorySlug; label: string; count: number }[];
  ages: { id: string; label: string; count: number }[];
  sizes: { value: string; count: number }[];
  colors: { id: string; name: string; hex: string; count: number }[];
  fabrics: { value: string; count: number }[];
  fits: { value: string; count: number }[];
  priceRange: { min: number; max: number };
}

export type ProductSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc";

export interface ProductQuery {
  category?: CategorySlug;
  subcategory?: string;
  brand?: string;
  age?: string;
  /**
   * Match products whose ageRangeIds overlap ANY id in this list. Used by the
   * shop filters where a single UI bucket (e.g. "2–5 Years") expands to
   * multiple underlying age ranges.
   */
  ageIds?: string[];
  size?: string;
  color?: string;
  fabric?: string;
  fit?: string;
  minPrice?: number;
  maxPrice?: number;
  newArrival?: boolean;
  featured?: boolean;
  sort?: ProductSort;
}

