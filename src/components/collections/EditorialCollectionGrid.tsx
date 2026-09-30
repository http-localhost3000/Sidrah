import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { collectionCovers, collectionCoverPositions } from "@/data/collection-covers";
import type { Collection } from "@/types/collection";

interface EditorialCollectionGridProps {
  collections: Collection[];
}

export function EditorialCollectionGrid({
  collections,
}: EditorialCollectionGridProps) {
  const topRow = collections.slice(0, 4);
  const bottomRow = collections.slice(4);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {topRow.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {bottomRow.map((c) => (
          <CollectionCard key={c.id} collection={c} />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  const coverSrc = collectionCovers[collection.slug];
  const position = collectionCoverPositions[collection.slug] ?? "object-center";

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block overflow-hidden rounded-lg border border-rule bg-card transition-all duration-300 hover:border-ink/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#f7f5f2]">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={collection.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-contain transition-transform duration-500 group-hover:scale-105 ${position}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-ink/40">
            {collection.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-base font-medium text-ink transition-colors group-hover:text-ink/70 lg:text-lg">
            {collection.title}
          </h3>
          {collection.subcollections && collection.subcollections.length > 0 && (
            <p className="mt-0.5 text-xs text-ink/50">
              {collection.subcollections.length} styles
            </p>
          )}
        </div>
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule text-ink/60 transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-page">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
