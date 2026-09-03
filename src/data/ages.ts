import type { AgeRange } from "@/types/common";

// Coarser groupings used on the homepage age strip. The detailed ranges below
// stay the source of truth for product filtering.
export interface AgeGroup {
  id: string;
  label: string;
  href: string;
  ageRangeIds: string[];
}

// Age buckets exposed in the Shop / Collection filter UI. Each bucket maps
// to one or more underlying detailed age ranges so a single filter click
// covers every product whose age availability falls within the bucket.
export const shopAgeFilters: AgeGroup[] = [
  { id: "af-6-12m", label: "6–12 Months", href: "", ageRangeIds: ["age-6-12m"] },
  { id: "af-12-18m", label: "12–18 Months", href: "", ageRangeIds: ["age-12-18m"] },
  { id: "af-18-24m", label: "18–24 Months", href: "", ageRangeIds: ["age-18-24m"] },
  { id: "af-24-36m", label: "24–36 Months", href: "", ageRangeIds: ["age-24-36m"] },
  { id: "af-2-5y", label: "2–5 Years", href: "", ageRangeIds: ["age-2-4y", "age-4-6y"] },
  { id: "af-6-7y", label: "6–7 Years", href: "", ageRangeIds: ["age-6-8y"] },
  {
    id: "af-8-13y",
    label: "8–13 Years",
    href: "",
    ageRangeIds: ["age-8-10y", "age-10-12y", "age-12-14y"],
  },
  { id: "af-14-16y", label: "14–16 Years", href: "", ageRangeIds: ["age-14-16y"] },
];

export const homepageAgeGroups: AgeGroup[] = [
  {
    id: "grp-0-12m",
    label: "6–12 Months",
    href: "/ages#age-6-12m",
    ageRangeIds: ["age-6-12m"],
  },
  {
    id: "grp-12-24m",
    label: "12–24 Months",
    href: "/ages#age-12-18m",
    ageRangeIds: ["age-12-18m", "age-18-24m"],
  },
  {
    id: "grp-2-5y",
    label: "2–5 Years",
    href: "/ages#age-2-4y",
    ageRangeIds: ["age-24-36m", "age-2-4y", "age-4-6y"],
  },
  {
    id: "grp-6-10y",
    label: "6–10 Years",
    href: "/ages#age-6-8y",
    ageRangeIds: ["age-6-8y", "age-8-10y"],
  },
  {
    id: "grp-11-16y",
    label: "11–16 Years",
    href: "/ages#age-10-12y",
    ageRangeIds: ["age-10-12y", "age-12-14y", "age-14-16y"],
  },
];

export const ageRanges: AgeRange[] = [
  { id: "age-6-12m", label: "6–12 Months", min: 6, max: 12, unit: "months" },
  { id: "age-12-18m", label: "12–18 Months", min: 12, max: 18, unit: "months" },
  { id: "age-18-24m", label: "18–24 Months", min: 18, max: 24, unit: "months" },
  { id: "age-24-36m", label: "24–36 Months", min: 24, max: 36, unit: "months" },
  { id: "age-2-4y", label: "2–4 Years", min: 2, max: 4, unit: "years" },
  { id: "age-4-6y", label: "4–6 Years", min: 4, max: 6, unit: "years" },
  { id: "age-6-8y", label: "6–8 Years", min: 6, max: 8, unit: "years" },
  { id: "age-8-10y", label: "8–10 Years", min: 8, max: 10, unit: "years" },
  { id: "age-10-12y", label: "10–12 Years", min: 10, max: 12, unit: "years" },
  { id: "age-12-14y", label: "12–14 Years", min: 12, max: 14, unit: "years" },
  { id: "age-14-16y", label: "14–16 Years", min: 14, max: 16, unit: "years" },
];
