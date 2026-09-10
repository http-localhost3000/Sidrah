import type { Slug } from "./common";

export interface BrandAgeRange {
  id: string;
  label: string;
  ageRangeIds: string[];
}

export interface Brand {
  id: string;
  slug: Slug;
  name: string;
  tagline: string;
  description: string;
  ageRanges?: BrandAgeRange[];
  productCount?: number;
}

