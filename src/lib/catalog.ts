import { products } from "@/data/products";
import { ageRanges } from "@/data/ages";
import { brands } from "@/data/brands";
import { collections } from "@/data/collections";
import type {
  Product,
  ProductFacets,
  ProductQuery,
  ProductSort,
} from "@/types/product";

// Single seam over the mock data source. Backend later replaces the bodies of
// these functions without touching any component.

const sortComparators: Record<
  ProductSort,
  (a: Product, b: Product) => number
> = {
  featured: (a, b) => Number(!!b.featured) - Number(!!a.featured),
  newest: (a, b) => Number(!!b.newArrival) - Number(!!a.newArrival),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

export function getProducts(query: ProductQuery = {}): Product[] {
  const {
    category,
    subcategory,
    brand,
    ageIds,
    size,
    color,
    fabric,
    fit,
    minPrice,
    maxPrice,
    newArrival,
    featured,
    sort = "featured",
  } = query;

  let items = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (brand && p.brandSlug !== brand) return false;
    if (
      ageIds &&
      ageIds.length > 0 &&
      !ageIds.some((id) => p.ageRangeIds.includes(id))
    )
      return false;
    if (size && !p.sizes.includes(size)) return false;
    if (color && !p.colors.some((c) => c.id === color)) return false;
    if (fabric && p.fabric !== fabric) return false;
    if (fit && p.fit !== fit) return false;
    if (typeof minPrice === "number" && p.price < minPrice) return false;
    if (typeof maxPrice === "number" && p.price > maxPrice) return false;
    if (newArrival && !p.newArrival) return false;
    if (featured && !p.featured) return false;
    return true;
  });

  items = [...items].sort(sortComparators[sort]);
  return items;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Related products for the detail page's "You may also like" strip.
 * Preference order:
 *   1. Same subcategory (excluding the current product)
 *   2. Same category (excluding the current product)
 *   3. Same brand across any category
 *   4. Any other products, to top up
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const seen = new Set<string>([product.id]);
  const push = (list: Product[]) => {
    for (const p of list) {
      if (!seen.has(p.id)) {
        result.push(p);
        seen.add(p.id);
      }
      if (result.length >= limit) break;
    }
  };
  const result: Product[] = [];

  if (product.subcategory) {
    push(
      products.filter(
        (p) =>
          p.category === product.category &&
          p.subcategory === product.subcategory,
      ),
    );
  }
  if (result.length < limit) {
    push(products.filter((p) => p.category === product.category));
  }
  if (result.length < limit) {
    push(products.filter((p) => p.brandSlug === product.brandSlug));
  }
  if (result.length < limit) {
    push(products);
  }

  return result.slice(0, limit);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getProducts({ featured: true }).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return getProducts({ newArrival: true, sort: "newest" }).slice(0, limit);
}

export function getFacets(query: ProductQuery = {}): ProductFacets {
  const items = getProducts(query);
  const countBy = <T,>(
    arr: T[],
    key: (t: T) => string,
  ): Map<string, number> => {
    const m = new Map<string, number>();
    for (const item of arr) {
      const k = key(item);
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  };

  const brandCounts = countBy(items, (p) => p.brandSlug);
  const categoryCounts = countBy(items, (p) => p.category);

  const ageCounts = new Map<string, number>();
  for (const p of items) {
    for (const a of p.ageRangeIds) {
      ageCounts.set(a, (ageCounts.get(a) ?? 0) + 1);
    }
  }

  const sizeCounts = new Map<string, number>();
  for (const p of items) {
    for (const s of p.sizes) sizeCounts.set(s, (sizeCounts.get(s) ?? 0) + 1);
  }

  const colorMap = new Map<
    string,
    { id: string; name: string; hex: string; count: number }
  >();
  for (const p of items) {
    for (const c of p.colors) {
      const existing = colorMap.get(c.id);
      if (existing) existing.count += 1;
      else colorMap.set(c.id, { ...c, count: 1 });
    }
  }

  const fabricCounts = countBy(items, (p) => p.fabric);
  const fitCounts = countBy(items, (p) => p.fit);

  const prices = items.map((p) => p.price);
  const priceRange = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
  };

  return {
    brands: brands
      .map((b) => ({
        slug: b.slug,
        name: b.name,
        count: brandCounts.get(b.slug) ?? 0,
      }))
      .filter((b) => b.count > 0),
    categories: collections
      .map((c) => ({
        slug: c.slug,
        label: c.title,
        count: categoryCounts.get(c.slug) ?? 0,
      }))
      .filter((c) => c.count > 0),
    ages: ageRanges
      .map((a) => ({
        id: a.id,
        label: a.label,
        count: ageCounts.get(a.id) ?? 0,
      }))
      .filter((a) => a.count > 0),
    sizes: Array.from(sizeCounts.entries()).map(([value, count]) => ({
      value,
      count,
    })),
    colors: Array.from(colorMap.values()),
    fabrics: Array.from(fabricCounts.entries()).map(([value, count]) => ({
      value,
      count,
    })),
    fits: Array.from(fitCounts.entries()).map(([value, count]) => ({
      value,
      count,
    })),
    priceRange,
  };
}
