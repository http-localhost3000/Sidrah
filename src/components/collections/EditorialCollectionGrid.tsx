"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CollectionTile } from "./CollectionTile";
import {
  collectionCovers,
  collectionCoverPositions,
} from "@/data/collection-covers";
import type { Collection } from "@/types/collection";

interface EditorialCollectionGridProps {
  collections: Collection[];
}

export function EditorialCollectionGrid({
  collections,
}: EditorialCollectionGridProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Desktop storytelling: the row pins in place and vertical scroll drives
  // it horizontally, so scrolling down slides new collections in from the
  // right. Mobile keeps the native swipe/snap track. Disabled under
  // prefers-reduced-motion (falls back to a natively scrollable row).
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      const track = trackRef.current;
      const viewport = windowRef.current;
      const runway = runwayRef.current;
      if (!track || !viewport || !runway) return;

      if (!desktop.matches || reduced.matches) {
        track.style.transform = "";
        return;
      }

      const rect = runway.getBoundingClientRect();
      const total = runway.offsetHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      track.style.transform = `translate3d(${(
        -progress * distance
      ).toFixed(1)}px, 0, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
    };
  }, []);

  // Mobile-only paging arrows — one full view per click.
  const slide = (direction: 1 | -1) => {
    const el = windowRef.current;
    if (!el) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({
      left: direction * (el.clientWidth + gap),
      behavior: "smooth",
    });
  };

  const arrowClasses =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border " +
    "border-rule text-ink/70 transition-colors duration-200 " +
    "hover:border-ink hover:bg-ink hover:text-page " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-page";

  return (
    <div ref={runwayRef} className="lg:h-[350vh]">
      <div className="lg:sticky lg:top-20 lg:flex lg:h-[calc(100svh-5rem)] lg:flex-col lg:justify-center">
        <div className="flex justify-end gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Previous collections"
            className={arrowClasses}
            onClick={() => slide(-1)}
          >
            <ArrowLeft
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            aria-label="Next collections"
            className={arrowClasses}
            onClick={() => slide(1)}
          >
            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          ref={windowRef}
          className="mt-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-0 lg:overflow-hidden lg:pb-0 motion-reduce:overflow-x-auto"
        >
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 scroll-smooth will-change-transform [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:snap-none lg:gap-8"
          >
            {collections.map((c) => (
              <div
                key={c.id}
                className="w-[78%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc((100svh-16rem)*0.8)]"
              >
                <CollectionTile
                  collection={c}
                  aspect="editorial"
                  imageSrc={collectionCovers[c.slug]}
                  imagePosition={
                    collectionCoverPositions[c.slug] ?? "object-top"
                  }
                  // Desktop pinned row: the card is sized from the viewport
                  // height (image gets the space above the caption) so the
                  // full model stays visible with minimal cropping.
                  imageClassName="lg:aspect-auto lg:h-[calc(100svh-16rem)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
