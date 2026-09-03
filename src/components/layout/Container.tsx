import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  const width = {
    narrow: "max-w-4xl",
    default: "max-w-[1400px]",
    wide: "max-w-[1600px]",
  }[size];

  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-10 xl:px-14",
        width,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
