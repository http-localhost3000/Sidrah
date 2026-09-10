/**
 * catalog-loader.ts
 *
 * Converts CatalogEntry records from catalog.json into the Product[] shape
 * that the existing frontend already consumes. No UI components change.
 *
 * ARCHITECTURE:
 *   catalog.json          ← you fill this in (one object per product)
 *       │
 *   loadCatalog()         ← this file converts & validates each entry
 *       │
 *   src/lib/catalog.ts    ← existing data seam used by all pages
 *       │
 *   ProductCard / ProductGallery / ProductDetail  ← unchanged
 */

import type { CatalogEntry } from "@/types/catalog";
import type { Product, ProductColor, PricingVariant } from "@/types/product";
import type { ImageAsset } from "@/types/common";

// Brand display names keyed by slug — kept in sync with src/data/brands.ts
const BRAND_NAMES: Record<string, string> = {
  "rock-and-ride": "Rock N Ride",
  "g-boys": "G-Boys",
  "king-n-queenie": "King & Queenie",
  "olive-and-fig": "Olive + Fig",
};

/**
 * Resolves the exact brand assignment according to Sidrah Fashion brand specs:
 * 1. ROCK N RIDE: Cord Sets, Brooklynn Print T-Shirts, Without Rib Track Pants, Rock N Ride Shorts, Front & Back Print T-Shirts.
 * 2. G-BOYS: Cargo Pants, Linen Pants, Denim Jeans (Baggy & Regular), Printed/Plain/Stripes/Checks/Cargo Shirts, Shirt+Tee, Kurta.
 * 3. KING & QUEENIE: With Rib Track Pants, Wording Shorts, Polo T-Shirts.
 * 4. OLIVE + FIG: Explicitly identified Olive + Fig products only.
 */
export function resolveBrandInfo(entry: {
  category: string;
  subcategory?: string;
  name: string;
  brandSlug?: string;
}): { brandSlug: string; brand: string } {
  const cat = entry.category;
  const sub = entry.subcategory || "";
  const name = entry.name || "";
  const existingBrand = entry.brandSlug || "";

  if (existingBrand === "olive-and-fig" || existingBrand === "olive-+-fig") {
    return { brandSlug: "olive-and-fig", brand: "Olive + Fig" };
  }

  if (
    cat === "cord-sets" ||
    (cat === "track-pants" && sub === "without-rib") ||
    (cat === "shorts" && name.toLowerCase().includes("rock n ride")) ||
    (cat === "t-shirts" && (sub === "downshoulder" || name.toLowerCase().includes("brooklyn"))) ||
    (cat === "t-shirts" && sub === "round-neck") ||
    existingBrand === "rock-and-ride"
  ) {
    return { brandSlug: "rock-and-ride", brand: "Rock N Ride" };
  }

  if (
    (cat === "track-pants" && sub === "with-rib") ||
    (cat === "shorts" && !name.toLowerCase().includes("rock n ride")) ||
    (cat === "t-shirts" && sub === "polo") ||
    existingBrand === "king-n-queenie"
  ) {
    return { brandSlug: "king-n-queenie", brand: "King & Queenie" };
  }

  return { brandSlug: "g-boys", brand: "G-Boys" };
}

/**
 * Convert a single CatalogEntry into a Product.
 * Missing optional fields receive safe defaults so nothing breaks.
 */
function entryToProduct(entry: CatalogEntry): Product {
  const { brandSlug, brand } = resolveBrandInfo(entry);

  // Build ImageAsset[] from the image filenames array.
  // By default images live at: public/images/products/<slug>/<filename>
  // If entry.imageFolder is set, that folder is used instead of the slug.
  // This supports a shared flat folder like "SIDRAH FASHION PRODUCTS IMAGE".
  const folder = (entry as CatalogEntry & { imageFolder?: string }).imageFolder ?? entry.slug;
  // URL-encode each path segment individually so filenames with spaces,
  // parentheses, or other special characters are served correctly by
  // Next.js without 404s or broken images.
  const encodedFolder = folder.split("/").map(encodeURIComponent).join("/");
  const images: ImageAsset[] = (entry.images ?? []).map((filename, i) => ({
    src: `/images/products/${encodedFolder}/${encodeURIComponent(filename)}`,
    alt: i === 0
      ? entry.name                              // primary: just the product name
      : `${entry.name} — image ${i + 1}`,      // gallery: name + position
  }));

  // Build ProductColor[] — add a neutral hex when not provided
  const colors: ProductColor[] = (entry.colors ?? []).map((c) => ({
    id: c.name.toLowerCase().replace(/\s+/g, "-"),
    name: c.name,
    hex: c.hex ?? "#D4A373",   // warm neutral fallback, never crashes the swatch
  }));

  return {
    id:          entry.id,
    slug:        entry.slug,
    sku:         entry.sku,
    name:        entry.name,
    brand,
    brandSlug,
    category:    entry.category,
    subcategory: entry.subcategory,
    description: entry.description ?? "",
    price:       entry.price ?? 0,
    discount:    entry.discount ?? 0,
    currency:    "INR",
    setQuantity: entry.setQuantity ?? 1,
    sizes:       entry.sizes ?? [],
    ageRangeIds: entry.ageRangeIds ?? [],
    colors,
    fabric:      entry.fabric ?? "",
    fit:         entry.fit ?? "",
    images,
    featured:        entry.featured ?? false,
    newArrival:      entry.newArrival ?? false,
    pricingVariants: entry.pricingVariants as PricingVariant[] | undefined,
  };
}

/**
 * Load and validate catalog.json, returning only active products as Product[].
 *
 * Called once at module load time (Next.js caches the module on the server
 * between requests during production, so this runs only on cold start).
 */
export function loadCatalog(entries: CatalogEntry[]): Product[] {
  const slugsSeen  = new Set<string>();
  const skusSeen   = new Set<string>();
  const idsSeen    = new Set<string>();
  const products: Product[] = [];

  for (const entry of entries) {
    // Skip inactive entries
    if (entry.active === false) continue;

    // Warn about duplicates without crashing the app
    if (idsSeen.has(entry.id)) {
      console.warn(`[catalog] Duplicate id "${entry.id}" — skipping.`);
      continue;
    }
    if (slugsSeen.has(entry.slug)) {
      console.warn(`[catalog] Duplicate slug "${entry.slug}" — skipping.`);
      continue;
    }
    if (skusSeen.has(entry.sku)) {
      console.warn(`[catalog] Duplicate sku "${entry.sku}" — skipping.`);
      continue;
    }

    idsSeen.add(entry.id);
    slugsSeen.add(entry.slug);
    skusSeen.add(entry.sku);

    products.push(entryToProduct(entry));
  }

  return products;
}
