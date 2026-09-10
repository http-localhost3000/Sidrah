import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "page";
}

export function Logo({ className, size = "md", tone = "ink" }: LogoProps) {
  const scale = {
    sm: { primary: "text-[1.0rem]",  secondary: "text-[0.52rem]", gap: "mt-[3px]" },
    md: { primary: "text-[1.2rem]",  secondary: "text-[0.58rem]", gap: "mt-1"     },
    lg: { primary: "text-[1.55rem]", secondary: "text-[0.66rem]", gap: "mt-1"     },
  }[size];

  const colors =
    tone === "page"
      ? { primary: "text-page", secondary: "text-page/50" }
      : { primary: "text-ink",  secondary: "text-ink/50"  };

  return (
    <Link
      href="/"
      aria-label="Sidrah Fashion — Home"
      className={cn("inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-display font-normal tracking-[0.14em]",
          colors.primary,
          scale.primary,
        )}
      >
        SIDRAH
      </span>
      <span
        className={cn(
          "font-sans font-light uppercase tracking-[0.42em]",
          colors.secondary,
          scale.secondary,
          scale.gap,
        )}
      >
        FASHION
      </span>
    </Link>
  );
}
