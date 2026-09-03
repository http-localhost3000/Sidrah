import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "page";
}

// Temporary editorial wordmark. Replace with the final logo asset later
// by swapping this component's contents.
export function Logo({ className, size = "md", tone = "ink" }: LogoProps) {
  const scale = {
    sm: { primary: "text-[1.05rem]", secondary: "text-[0.62rem]" },
    md: { primary: "text-[1.35rem]", secondary: "text-[0.7rem]" },
    lg: { primary: "text-[1.75rem]", secondary: "text-[0.8rem]" },
  }[size];

  const colors =
    tone === "page"
      ? { primary: "text-page", secondary: "text-page/70" }
      : { primary: "text-ink", secondary: "text-ink/70" };

  return (
    <Link
      href="/"
      aria-label="Sidrah Fashion — Home"
      className={cn("inline-flex flex-col leading-none", className)}
    >
      <span
        className={cn(
          "font-display font-medium tracking-[0.02em]",
          colors.primary,
          scale.primary,
        )}
      >
        SIDRAH
      </span>
      <span
        className={cn(
          "mt-1 font-sans font-medium uppercase tracking-[0.32em]",
          colors.secondary,
          scale.secondary,
        )}
      >
        Fashion
      </span>
    </Link>
  );
}
