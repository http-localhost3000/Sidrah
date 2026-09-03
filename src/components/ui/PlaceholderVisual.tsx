import { cn } from "@/lib/cn";

type Aspect = "square" | "portrait" | "landscape" | "wide" | "tall" | "hero";
type Tone = "cream" | "sage" | "ivory" | "warm";

interface PlaceholderVisualProps {
  aspect?: Aspect;
  tone?: Tone;
  label?: string;
  className?: string;
  showMark?: boolean;
}

const aspectClass: Record<Aspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
  hero: "aspect-[3/4] lg:aspect-[4/5]",
};

// Neutral premium image placeholder. Renders a soft two-tone surface with a
// subtle editorial mark and an optional caption. Every product/collection/hero
// image on the homepage passes through this component; when real photography
// arrives, swap this for next/image inside the same wrapper.
export function PlaceholderVisual({
  aspect = "portrait",
  tone = "cream",
  label,
  className,
  showMark = true,
}: PlaceholderVisualProps) {
  const toneClasses: Record<Tone, { bg: string; band: string; ink: string }> = {
    cream: {
      bg: "bg-surface",
      band: "bg-muted",
      ink: "text-ink/40",
    },
    sage: {
      bg: "bg-muted",
      band: "bg-accent/60",
      ink: "text-ink/45",
    },
    ivory: {
      bg: "bg-page",
      band: "bg-surface",
      ink: "text-ink/35",
    },
    warm: {
      bg: "bg-surface",
      band: "bg-accent-warm/40",
      ink: "text-ink/45",
    },
  };

  const t = toneClasses[tone];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate w-full overflow-hidden",
        aspectClass[aspect],
        t.bg,
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/3",
          t.band,
        )}
        style={{
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {showMark && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            className={cn("opacity-40", t.ink)}
          >
            <circle
              cx="36"
              cy="36"
              r="27"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <path
              d="M18 36 L54 36"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
            <path
              d="M36 18 L36 54"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {label && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
          <span
            className={cn(
              "font-sans text-[0.62rem] uppercase tracking-[0.18em]",
              t.ink,
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "font-display italic text-[0.75rem] leading-none",
              t.ink,
            )}
          >
            Sidrah
          </span>
        </div>
      )}
    </div>
  );
}
