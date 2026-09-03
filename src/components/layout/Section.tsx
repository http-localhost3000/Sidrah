import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  tone?: "page" | "surface" | "muted" | "card" | "ink";
  id?: string;
}

export function Section({
  children,
  className,
  tone = "page",
  id,
}: SectionProps) {
  const bg = {
    page: "bg-page text-ink",
    surface: "bg-surface text-ink",
    muted: "bg-muted text-ink",
    card: "bg-card text-ink",
    ink: "bg-ink text-page",
  }[tone];

  return (
    <section id={id} className={cn("py-section", bg, className)}>
      {children}
    </section>
  );
}
