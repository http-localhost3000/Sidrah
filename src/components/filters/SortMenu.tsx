"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const options = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
];

export function SortMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "featured";

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams.toString());
    if (e.target.value === "featured") next.delete("sort");
    else next.set("sort", e.target.value);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <label className="group inline-flex items-center gap-3">
      <span className="eyebrow text-ink/75">Sort</span>
      <span aria-hidden="true" className="h-4 w-px bg-ink/20" />
      <div className="relative">
        <select
          value={current}
          onChange={onChange}
          className="h-9 appearance-none border border-ink/25 bg-card pl-3.5 pr-9 text-caption font-medium text-ink transition-all duration-300 ease-editorial hover:border-ink/60 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          aria-label="Sort products by"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/50 transition-colors duration-300 group-hover:text-ink"
        />
      </div>
    </label>
  );
}
