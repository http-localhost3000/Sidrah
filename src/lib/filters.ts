import type { ReadonlyURLSearchParams } from "next/navigation";

export type FilterParams = Record<string, string | undefined>;

/**
 * Produce a URL for the same page with a subset of query params changed.
 * Passing `undefined` (or an empty string) removes the param entirely.
 * The resulting URL keeps the same origin/pathname and re-encodes params
 * in insertion order — a stable, human-readable query string.
 */
export function buildFilterHref(
  basePath: string,
  current: FilterParams | ReadonlyURLSearchParams,
  changes: FilterParams,
): string {
  const currentEntries: Array<[string, string]> = [];
  if (isURLSearchParams(current)) {
    current.forEach((value, key) => currentEntries.push([key, value]));
  } else {
    for (const [k, v] of Object.entries(current)) {
      if (v !== undefined && v !== "") currentEntries.push([k, v]);
    }
  }

  const merged = new Map<string, string>(currentEntries);
  for (const [k, v] of Object.entries(changes)) {
    if (v === undefined || v === "") merged.delete(k);
    else merged.set(k, v);
  }

  const qs = new URLSearchParams();
  for (const [k, v] of merged.entries()) qs.append(k, v);
  const str = qs.toString();
  return str ? `${basePath}?${str}` : basePath;
}

function isURLSearchParams(
  x: FilterParams | ReadonlyURLSearchParams,
): x is ReadonlyURLSearchParams {
  return typeof (x as ReadonlyURLSearchParams).forEach === "function";
}

/** Normalise `searchParams` from a Next.js server page (values may be arrays). */
export function normaliseSearchParams(
  raw: Record<string, string | string[] | undefined>,
): FilterParams {
  const out: FilterParams = {};
  for (const [k, v] of Object.entries(raw)) {
    if (Array.isArray(v)) out[k] = v[0];
    else out[k] = v;
  }
  return out;
}

/**
 * Parse filter parameters from Next.js searchParams.
 * Alias for normaliseSearchParams for clearer naming.
 */
export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>,
): FilterParams {
  return normaliseSearchParams(searchParams);
}
