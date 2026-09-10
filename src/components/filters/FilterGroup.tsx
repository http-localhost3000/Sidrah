import Link from "next/link";
import { cn } from "@/lib/cn";
import { buildFilterHref } from "@/lib/filters";
import type { FilterParams } from "@/lib/filters";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroupProps {
  title: string;
  paramKey: string;
  options: FilterOption[];
  basePath: string;
  searchParams: FilterParams;
  allLabel?: string;
}

/**
 * A single filter dimension rendered as a stack of links. Selecting an option
 * navigates to a new URL — no client state. "All" clears the dimension.
 * This is a Server Component; every href is generated on the server.
 */
export function FilterGroup({
  title,
  paramKey,
  options,
  basePath,
  searchParams,
  allLabel = "All",
}: FilterGroupProps) {
  const active = searchParams[paramKey];

  return (
    <div className="border-t border-rule pt-5">
      <h3 className="eyebrow text-ink/70">{title}</h3>
      <ul className="mt-4 space-y-2">
        <li>
          <FilterLink
            href={buildFilterHref(basePath, searchParams, {
              [paramKey]: undefined,
            })}
            selected={!active}
            label={allLabel}
          />
        </li>
        {options.map((opt) => {
          const selected = active === opt.value;
          return (
            <li key={opt.value}>
              <FilterLink
                href={buildFilterHref(basePath, searchParams, {
                  [paramKey]: selected ? undefined : opt.value,
                })}
                selected={selected}
                label={opt.label}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface FilterLinkProps {
  href: string;
  selected: boolean;
  label: string;
}

function FilterLink({ href, selected, label }: FilterLinkProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "group flex items-center justify-between gap-2 py-1.5 text-body transition-colors duration-200",
        selected ? "text-ink" : "text-ink/70 hover:text-ink",
      )}
    >
      <span className="inline-flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border bg-transparent",
            "transition-all duration-300 ease-editorial",
            selected
              ? "border-ink shadow-[0_0_0_3px_rgba(212,163,115,0.22)]"
              : "border-ink/30 group-hover:border-ink/70",
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full bg-ink transition-transform duration-300 ease-editorial",
              selected ? "scale-100" : "scale-0",
            )}
          />
        </span>
        <span className={cn(selected && "font-medium")}>{label}</span>
      </span>
    </Link>
  );
}
