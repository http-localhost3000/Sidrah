import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import type { Collection } from "@/types/collection";

type Aspect = "square" | "portrait" | "landscape" | "wide" | "tall" | "editorial";
type Tone = "cream" | "sage" | "ivory" | "warm";

const aspectClass: Record<Aspect, string> = {
  square:    "aspect-square",
  portrait:  "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide:      "aspect-[16/9]",
  tall:      "aspect-[3/4]",
  editorial: "aspect-[2/3]",
};

interface CollectionTileProps {
  collection: Collection;
  aspect?: Aspect;
  tone?: Tone;
  className?: string;
  /** Extra classes for the image container — e.g. viewport-bound heights. */
  imageClassName?: string;
  eyebrow?: string;
  imageSrc?: string;
  imagePosition?: string;
}

export function CollectionTile({
  collection,
  aspect = "portrait",
  tone = "cream",
  className,
  imageClassName,
  eyebrow,
  imageSrc,
  imagePosition = "object-top",
}: CollectionTileProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group relative isolate block overflow-hidden bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page",
        className,
      )}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-500 ease-editorial group-hover:scale-[1.02]">
          {imageSrc ? (
            <div
              className={cn(
                "relative w-full overflow-hidden",
                aspectClass[aspect],
                imageClassName,
              )}
            >
              <Image
                src={imageSrc}
                alt={collection.title}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                className={cn("object-cover", imagePosition)}
                quality={80}
              />
              {/* Subtle overlay so text reads against any photo */}
              <div className="absolute inset-0 bg-ink/10" />
            </div>
          ) : (
            <PlaceholderVisual
              aspect={aspect}
              tone={tone}
              label={eyebrow ?? "Collection"}
              showMark={false}
            />
          )}
        </div>
      </div>
      <div className="flex items-start justify-between gap-4 border-t border-rule bg-page px-5 py-5 sm:px-6">
        <div>
          <p className="eyebrow text-ink/55">
            {collection.subcollections.length > 0
              ? `${collection.subcollections.length} sub-collections`
              : "Collection"}
          </p>
          <h3 className="mt-2 font-display text-h-lg text-ink transition-colors group-hover:text-ink/70">
            {collection.title}
          </h3>
        </div>
        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink/70 transition-all duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-page">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
