import type { Slug } from "./common";

export interface Brand {
  id: string;
  slug: Slug;
  name: string;
  tagline: string;
  description: string;
  productCount?: number;
}
