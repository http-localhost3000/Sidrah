import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  align?: "start" | "between";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  link,
  align = "between",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:gap-8",
        align === "between"
          ? "md:flex-row md:items-end md:justify-between"
          : "",
        className,
      )}
    >
      <div className="max-w-editorial">
        {eyebrow && <p className="eyebrow text-ink/60">{eyebrow}</p>}
        <h2 className="mt-4 font-display text-display-md md:text-display-lg">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-prose text-body text-ink/70">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="eyebrow inline-flex items-center gap-1 self-start text-ink/70 transition-colors hover:text-ink md:self-end"
        >
          {link.label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
