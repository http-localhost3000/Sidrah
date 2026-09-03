import Link from "next/link";
import { cn } from "@/lib/cn";
import { buildFilterHref } from "@/lib/filters";
import type { FilterParams } from "@/lib/filters";
import type { Subcollection } from "@/types/collection";

interface SubcollectionTabsProps {
  basePath: string;
  searchParams: FilterParams;
  subcollections: Subcollection[];
}

export function SubcollectionTabs({
  basePath,
  searchParams,
  subcollections,
}: SubcollectionTabsProps) {
  if (subcollections.length === 0) return null;
  const active = searchParams.sub;

  return (
    <nav
      aria-label="Subcollections"
      className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto"
    >
      <Tab
        href={buildFilterHref(basePath, searchParams, { sub: undefined })}
        label="All"
        active={!active}
      />
      {subcollections.map((s) => (
        <Tab
          key={s.slug}
          href={buildFilterHref(basePath, searchParams, { sub: s.slug })}
          label={s.label}
          active={active === s.slug}
        />
      ))}
    </nav>
  );
}

function Tab({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-sm px-4 py-2 text-caption transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page",
        active
          ? "bg-ink text-page"
          : "text-ink/70 hover:bg-muted hover:text-ink",
      )}
    >
      {label}
    </Link>
  );
}
