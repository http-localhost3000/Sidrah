import { products } from "@/data/products";
import { ageRanges, shopAgeFilters } from "@/data/ages";
import { brands } from "@/data/brands";
import { collections } from "@/data/collections";
import { normalizeBrandSlug } from "@/lib/brands";
import type {
  Product,
  ProductFacets,
  ProductQuery,
  ProductSort,
} from "@/types/product";

export function resolveAgeRangeIds(ageParam?: string): string[] | undefined {
  if (!ageParam) return undefined;
  const a = ageParam.toLowerCase().trim();

  if (a === "6-12-months" || a === "6-12m") return ["age-6-12m"];
  if (a === "2-7-years" || a === "2-7y") return ["age-2-4y", "age-4-6y", "age-6-8y"];
  if (a === "8-13-years" || a === "8-13y") return ["age-8-10y", "age-10-12y", "age-12-14y"];
  if (a === "14-15-years" || a === "14-15y") return ["age-14-16y"];

  if (a === "6-36-months" || a === "6-36m") return ["age-6-12m", "age-12-18m", "age-18-24m", "age-24-36m"];
  if (a === "2-16-years" || a === "2-16y") return ["age-2-4y", "age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"];
  if (a === "8-16-years" || a === "8-16y") return ["age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"];

  if (a === "2-8-years" || a === "2-8y") return ["age-2-4y", "age-4-6y", "age-6-8y"];
  if (a === "4-14-years" || a === "4-14y") return ["age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y"];
  if (a === "1-5-years" || a === "1-5y") return ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y"];

  if (a === "1-15-years" || a === "1-15y") return ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"];

  const shopGroup = shopAgeFilters.find((g) => g.id === a);
  if (shopGroup) return shopGroup.ageRangeIds;

  if (a.startsWith("age-")) return [a];

  return undefined;
}

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
    age,
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

  const targetBrandSlug = normalizeBrandSlug(brand);
  const targetAgeIds =
    ageIds && ageIds.length > 0 ? ageIds : resolveAgeRangeIds(age);

  let items = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (targetBrandSlug && p.brandSlug !== targetBrandSlug) return false;
    if (
      targetAgeIds &&
      targetAgeIds.length > 0 &&
      !targetAgeIds.some((id) => p.ageRangeIds.includes(id))
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
