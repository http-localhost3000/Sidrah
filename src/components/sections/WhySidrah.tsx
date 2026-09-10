"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Boxes, Globe2, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface TrustItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const items: TrustItem[] = [
  {
    icon: <Boxes className="h-5 w-5" aria-hidden="true" />,
    title: "Wholesale focused",
    description: "Built for retailers, boutiques and resellers, not end shoppers.",
  },
  {
    icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
    title: "Boys’ wear specialists",
    description: "A curated boyswear house across nine considered collections.",
  },
  {
    icon: <Globe2 className="h-5 w-5" aria-hidden="true" />,
    title: "Worldwide shipping",
    description: "International shipping available with destination-based charges.",
  },
  {
    icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
    title: "Retailer support",
    description: "Direct WhatsApp enquiries with the Sidrah Fashion team.",
  },
];

export function WhySidrah() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll-driven storyline progress: the line starts drawing as soon as the
  // section enters the viewport and only finishes once it has been scrolled
  // near the top, so each dot/card activates one by one while scrolling.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.95;
      const end = vh * 0.15;
      const p = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isDotActive = (i: number) =>
    progress >= (i + 0.5) / items.length;
  const isDotNext = (i: number) =>
    !isDotActive(i) && progress >= i / items.length;

  return (
    <div ref={ref}>
      {/* Storyline timeline — dots connected by a line that draws on scroll */}
      <div className="relative mb-12 hidden lg:block" aria-hidden="true">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-ink/15" />
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-ink transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
        <div className="grid grid-cols-4 gap-12">
          {items.map((item, i) => (
            <div key={item.title} className="flex justify-center">
              <span
                className={cn(
                  "h-3.5 w-3.5 rounded-full border-2 bg-page transition-all duration-300 ease-out",
                  isDotActive(i) &&
                    "scale-110 border-ink bg-ink ring-4 ring-ink/10",
                  isDotNext(i) && "story-dot-next border-ink/60",
                  !isDotActive(i) && !isDotNext(i) && "border-ink/30",
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={cn(
              "pt-6 transition-all duration-500 ease-out",
              "lg:translate-y-5 lg:opacity-0",
              isDotActive(i) && "lg:translate-y-0 lg:opacity-100",
            )}
          >
            <div
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center border transition-colors duration-500",
                isDotActive(i)
                  ? "border-ink bg-ink text-page"
                  : "border-ink/20 text-ink",
              )}
            >
              {item.icon}
            </div>
            <h3 className="mt-6 font-display text-h-lg text-ink">
              {item.title}
            </h3>
            <p className="mt-3 max-w-xs text-body text-ink/70">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
