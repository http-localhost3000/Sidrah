import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AgeGroup } from "@/data/ages";

interface AgeTileProps {
  ageGroup: AgeGroup;
  index?: number;
  className?: string;
}

const tones = [
  "bg-surface",
  "bg-muted",
  "bg-page",
  "bg-accent-warm/25",
  "bg-accent/25",
];

export function AgeTile({ ageGroup, index = 0, className }: AgeTileProps) {
  const href = `/ages/${ageGroup.id}`;
  
  return (
    <Link
      href={href}
      className={cn(
        "group flex aspect-square flex-col justify-between border border-rule p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:p-6",
        tones[index % tones.length],
        "hover:border-ink",
        className,
      )}
    >
      <span className="eyebrow text-ink/55">Age</span>
      <div>
        <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-ink">
          {ageGroup.label}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-caption text-ink/70 transition-colors group-hover:text-ink">
          Shop the range
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
