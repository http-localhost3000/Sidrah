import { CollectionTile } from "./CollectionTile";
import type { Collection } from "@/types/collection";

interface EditorialCollectionGridProps {
  collections: Collection[];
}

// Editorial grid rhythm: varied column spans, tones and aspects so the
// section reads as a considered layout, not nine identical cards.
type TileSpec = {
  colSpan: string;
  aspect: "square" | "portrait" | "landscape" | "wide" | "tall";
  tone: "cream" | "sage" | "ivory" | "warm";
};

const specs: Record<string, TileSpec> = {
  shirts: { colSpan: "lg:col-span-7", aspect: "landscape", tone: "cream" },
  "t-shirts": { colSpan: "lg:col-span-5", aspect: "landscape", tone: "sage" },
  denims: { colSpan: "lg:col-span-4", aspect: "portrait", tone: "warm" },
  "track-pants": {
    colSpan: "lg:col-span-4",
    aspect: "portrait",
    tone: "ivory",
  },
  shorts: { colSpan: "lg:col-span-4", aspect: "portrait", tone: "cream" },
  "cord-sets": {
    colSpan: "lg:col-span-6",
    aspect: "landscape",
    tone: "sage",
  },
  "cargo-pants": {
    colSpan: "lg:col-span-6",
    aspect: "landscape",
    tone: "warm",
  },
  "linen-pants": {
    colSpan: "lg:col-span-5",
    aspect: "landscape",
    tone: "ivory",
  },
  kurta: { colSpan: "lg:col-span-7", aspect: "landscape", tone: "cream" },
};

export function EditorialCollectionGrid({
  collections,
}: EditorialCollectionGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
      {collections.map((c) => {
        const spec = specs[c.slug] ?? {
          colSpan: "lg:col-span-4",
          aspect: "portrait",
          tone: "cream",
        };
        return (
          <CollectionTile
            key={c.id}
            collection={c}
            aspect={spec.aspect}
            tone={spec.tone}
            className={spec.colSpan}
            eyebrow={c.title}
          />
        );
      })}
    </div>
  );
}
