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
      <h3 className="eyebrow text-ink/55">{title}</h3>
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
      aria-current={selected ? "true" : undefined}
      className={cn(
        "group flex items-center justify-between gap-2 py-1 text-body transition-colors",
        selected ? "text-ink" : "text-ink/60 hover:text-ink",
      )}
    >
      <span className="inline-flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full border transition-colors",
            selected
              ? "border-ink bg-ink"
              : "border-ink/25 group-hover:border-ink/60",
          )}
        />
        {label}
      </span>
    </Link>
  );
}
