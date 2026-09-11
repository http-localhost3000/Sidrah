import type { Brand } from "@/types/brand";

export const brands: Brand[] = [
  {
    id: "brand-rock-and-ride",
    slug: "rock-and-ride",
    name: "Rock N Ride",
    tagline: "Rugged utility with an edge",
    description:
      "Denim-forward and utility-driven pieces built for active, adventurous wearers.",
    ageRanges: [
      { id: "6-12-months", label: "6–12 Months", ageRangeIds: ["age-6-12m"] },
      { id: "2-7-years", label: "2–7 Years", ageRangeIds: ["age-2-4y", "age-4-6y", "age-6-8y"] },
      { id: "8-13-years", label: "8–13 Years", ageRangeIds: ["age-8-10y", "age-10-12y", "age-12-14y"] },
      { id: "14-15-years", label: "14–15 Years", ageRangeIds: ["age-14-16y"] },
    ],
  },
  {
    id: "brand-g-boys",
    slug: "g-boys",
    name: "G-Boys",
    tagline: "Imported boyswear essentials",
    description:
      "G-Boys offers quality imported boyswear designed for everyday wear, covering a wide age range from 6 months to 16 years.",
    ageRanges: [
      { id: "6-36-months", label: "6–36 Months", ageRangeIds: ["age-6-12m", "age-12-18m", "age-18-24m", "age-24-36m"] },
      { id: "2-16-years", label: "2–16 Years", ageRangeIds: ["age-2-4y", "age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"] },
      { id: "8-16-years", label: "8–16 Years", ageRangeIds: ["age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"] },
    ],
  },
  {
    id: "brand-olive-and-fig",
    slug: "olive-and-fig",
    name: "Olive + Fig",
    tagline: "Refined everyday boyswear",
    description:
      "Timeless silhouettes and premium fabrics designed for effortless, elegant everyday dressing.",
    ageRanges: [
      { id: "6-36-months", label: "6–36 Months", ageRangeIds: ["age-6-12m", "age-12-18m", "age-18-24m", "age-24-36m"] },
      { id: "2-8-years", label: "2–8 Years", ageRangeIds: ["age-2-4y", "age-4-6y", "age-6-8y"] },
      { id: "4-14-years", label: "4–14 Years", ageRangeIds: ["age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y"] },
      { id: "1-5-years", label: "1–5 Years", ageRangeIds: ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y"] },
    ],
  },
  {
    id: "brand-king-n-queenie",
    slug: "king-n-queenie",
    name: "King & Queenie",
    tagline: "Bold looks for young royalty",
    description:
      "King & Queenie delivers statement-making styles with premium finishes for boys who like to stand out.",
    ageRanges: [
      { id: "1-5-years", label: "1–5 Years", ageRangeIds: ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y"] },
      { id: "4-14-years", label: "4–14 Years", ageRangeIds: ["age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y"] },
      { id: "1-15-years", label: "1–15 Years", ageRangeIds: ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"] },
    ],
  },
  {
    id: "brand-claphm",
    slug: "claphm",
    name: "Claphm",
    tagline: "Classic British-inspired boyswear",
    description:
      "Claphm brings heritage-inspired shirting and refined checks to the boyswear aisle — crafted for effortless everyday dressing with a distinctly classic edge.",
    ageRanges: [
      { id: "6-36-months", label: "6–36 Months", ageRangeIds: ["age-6-12m", "age-12-18m", "age-18-24m", "age-24-36m"] },
      { id: "2-8-years", label: "2–8 Years", ageRangeIds: ["age-2-4y", "age-4-6y", "age-6-8y"] },
      { id: "4-14-years", label: "4–14 Years", ageRangeIds: ["age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y"] },
      { id: "1-5-years", label: "1–5 Years", ageRangeIds: ["age-12-18m", "age-18-24m", "age-24-36m", "age-2-4y", "age-4-6y"] },
    ],
  },
  {
    id: "brand-coming-up",
    slug: "coming-up",
    name: "Coming Up",
    tagline: "Something new is on its way",
    description:
      "A brand-new addition to the Sidrah Fashion family. Coming Up is launching soon — stay tuned for fresh styles and exciting new collections.",
    ageRanges: [
      { id: "6-36-months", label: "6–36 Months", ageRangeIds: ["age-6-12m", "age-12-18m", "age-18-24m", "age-24-36m"] },
      { id: "2-16-years", label: "2–16 Years", ageRangeIds: ["age-2-4y", "age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y", "age-14-16y"] },
      { id: "4-14-years", label: "4–14 Years", ageRangeIds: ["age-4-6y", "age-6-8y", "age-8-10y", "age-10-12y", "age-12-14y"] },
    ],
  },
];
