import { collections } from "@/data/collections";
import type { CategorySlug, Collection } from "@/types/collection";

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionBySlug(
  slug: CategorySlug,
): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
