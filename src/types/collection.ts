import type { ImageAsset, Slug } from "./common";

export type CategorySlug =
  | "shirts"
  | "t-shirts"
  | "denims"
  | "track-pants"
  | "shorts"
  | "cord-sets"
  | "cargo-pants"
  | "linen-pants"
  | "kurta"
  | "imported";

export interface Subcollection {
  slug: Slug;
  label: string;
}

export interface Collection {
  id: string;
  slug: CategorySlug;
  title: string;
  descriptor: string;
  /** Editorial one-line hook used on the collection landing page. */
  editorialLine?: string;
  subcollections: Subcollection[];
  image?: ImageAsset;
}
