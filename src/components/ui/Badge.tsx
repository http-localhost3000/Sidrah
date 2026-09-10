import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "warm" | "ink" | "outline";
type Size = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-ink",
  accent: "bg-accent text-ink",
  warm: "bg-accent-warm text-ink",
  ink: "bg-ink text-page",
  outline: "bg-transparent text-ink border border-ink/50",
};

const sizes: Record<Size, string> = {
  sm: "h-5 px-2 text-[0.62rem]",
  md: "h-6 px-2.5 text-[0.68rem]",
};

export function Badge({
  children,
  tone = "neutral",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-sans font-medium uppercase tracking-[0.14em] leading-none",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
