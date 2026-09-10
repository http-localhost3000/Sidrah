/**
 * CatalogEntry — the shape of every record in catalog.json.
 *
 * This is the single source of truth you fill in when adding products.
 * The loader (src/lib/catalog-loader.ts) converts these entries into the
 * Product[] that the existing frontend already consumes without modification.
 */

export type BrandSlug =
  | "rock-and-ride"
  | "g-boys"
  | "coming-up"
  | "king-n-queenie"
  | "olive-and-fig"
  | "claphm";

export type CategorySlug =
  | "shirts"
  | "t-shirts"
  | "denims"
  | "track-pants"
  | "shorts"
  | "cord-sets"
  | "cargo-pants"
  | "linen-pants"
  | "imported";

export type SubcategorySlug =
  // kurta
  | "kurta"
  // shirts
  | "plain"
  | "checks"
  | "stripes"
  | "printed"
  | "denim"
  | "shirt-tshirt"
  | "cargo-shirt"
  // t-shirts
  | "round-neck"
  | "polo"
  | "downshoulder"
  // denims
  | "regular-fit"
  | "loose-fit"
  | "baggy"
  // track-pants
  | "with-rib"
  | "without-rib"
  // cord-sets
  | "regular"
  // imported
  | "imported-shirts"
  | "imported-t-shirts"
  | "imported-denims"
  | "imported-sets"
  | "imported-pants"
  | "imported-shorts"
  | "imported-other";

export type AgeRangeId =
  | "age-6-12m"
  | "age-12-18m"
  | "age-18-24m"
  | "age-24-36m"
  | "age-2-4y"
  | "age-4-6y"
  | "age-6-8y"
  | "age-8-10y"
  | "age-10-12y"
  | "age-12-14y"
  | "age-14-16y";

/**
 * One age/size pricing tier. Used when a product has different prices
 * for different age ranges (e.g. 6–36 Months vs 2–16 Years).
 */
export interface PricingVariant {
  label: string;
  sizes: string[];
  ageRangeIds: AgeRangeId[];
  price: number;
  discount?: number;
  setQuantity: number;
}

/**
 * One color variant.
 * hex is optional — leave it out if you don't know the hex code.
 */
export interface CatalogColor {
  name: string;
  hex?: string;
}

/**
 * One entry in catalog.json.
 *
 * REQUIRED fields: id, slug, sku, name, brandSlug, category
 * Everything else is optional so you can add a product even if you
 * don't have all details yet.
 */
export interface CatalogEntry {
  /** Short unique id, e.g. "p-101". Must be unique across all entries. */
  id: string;

  /**
   * URL slug used in /products/[slug].
   * Use lowercase-hyphenated format, e.g. "stud-plain-shirt-ivory".
   * Must be unique across all entries.
   */
  slug: string;

  /** Product code / SKU as printed on the label, e.g. "STD-SH-101". */
  sku: string;

  /** Display name shown on product cards and detail pages. */
  name: string;

  /** Brand slug — omit for products with no brand. */
  brandSlug?: BrandSlug;

  /** Main collection. Must be one of the nine category slugs. */
  category: CategorySlug;

  /** Optional sub-collection within the category. */
  subcategory?: SubcategorySlug;

  /**
   * Short product description (1-3 sentences).
   * Leave empty string "" if not yet written.
   */
  description?: string;

  /**
   * Wholesale price per set in INR.
   * Leave out if price is not confirmed yet.
   */
  price?: number;

  /** Fixed discount amount in INR, e.g. 10. Defaults to 0. */
  discount?: number;

  /** Number of pieces in one wholesale set, e.g. 12. */
  setQuantity?: number;

  /**
   * Size codes available for this product.
   * Use standard codes: "6M" "9M" "12M" "18M" "24M"
   *   "1Y" "2Y" "3Y" "4Y" "5Y" "6Y" "7Y" "8Y" "9Y"
   *   "10Y" "11Y" "12Y" "13Y" "14Y" "15Y" "16Y"
   */
  sizes?: string[];

  /**
   * Age-range IDs this product covers.
   * Pick every range that applies from the list:
   *   "age-6-12m"   → 6–12 Months
   *   "age-12-18m"  → 12–18 Months
   *   "age-18-24m"  → 18–24 Months
   *   "age-24-36m"  → 24–36 Months
   *   "age-2-4y"    → 2–4 Years
   *   "age-4-6y"    → 4–6 Years
   *   "age-6-8y"    → 6–8 Years
   *   "age-8-10y"   → 8–10 Years
   *   "age-10-12y"  → 10–12 Years
   *   "age-12-14y"  → 12–14 Years
   *   "age-14-16y"  → 14–16 Years
   */
  ageRangeIds?: AgeRangeId[];

  /** Available colours. hex is optional. */
  colors?: CatalogColor[];

  /** Fabric / material description, e.g. "100% Cotton Oxford". */
  fabric?: string;

  /** Fit type, e.g. "Regular", "Loose", "Slim". */
  fit?: string;

  /**
   * Image filenames inside this product's folder.
   * The folder is: public/images/products/<slug>/
   * List filenames in display order. First file = primary/cover image.
   * Supported extensions: .jpg .jpeg .png .webp
   *
   * Example:
   *   ["main.jpg", "back.jpg", "detail.jpg"]
   *
   * Leave as empty array [] if photos not yet added — a placeholder shows.
   */
  images?: string[];

  /** Show a "Featured" badge on this product. */
  featured?: boolean;

  /** Show a "New" badge on this product. */
  newArrival?: boolean;

  /**
   * Set to false to hide this product from the catalog without deleting it.
   * Defaults to true (visible).
   */
  active?: boolean;

  /**
   * Multi-tier pricing for products available in different age ranges at
   * different prices. When present, top-level price/discount/setQuantity/sizes
   * are from the first variant (for ProductCard display). The UI switches
   * price dynamically as the customer selects a size.
   */
  pricingVariants?: PricingVariant[];
}
