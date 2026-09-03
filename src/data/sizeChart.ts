export interface SizeChartRow {
  size: string;
  ageLabel: string;
  chestCm: string;
  bodyLengthCm: string;
}

// Placeholder generic boyswear size chart. Every measurement column ships as
// "—" until Sidrah Fashion supplies exact figures; the shape of the data
// stays identical so measurement values can be pasted in later without
// changing any UI.
export const genericBoyswearChart: SizeChartRow[] = [
  { size: "6M", ageLabel: "6 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "9M", ageLabel: "9 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "12M", ageLabel: "12 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "18M", ageLabel: "18 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "24M", ageLabel: "24 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "36M", ageLabel: "36 Months", chestCm: "—", bodyLengthCm: "—" },
  { size: "2Y", ageLabel: "2 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "3Y", ageLabel: "3 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "4Y", ageLabel: "4 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "5Y", ageLabel: "5 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "6Y", ageLabel: "6 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "7Y", ageLabel: "7 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "8Y", ageLabel: "8 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "9Y", ageLabel: "9 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "10Y", ageLabel: "10 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "11Y", ageLabel: "11 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "12Y", ageLabel: "12 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "13Y", ageLabel: "13 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "14Y", ageLabel: "14 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "15Y", ageLabel: "15 Years", chestCm: "—", bodyLengthCm: "—" },
  { size: "16Y", ageLabel: "16 Years", chestCm: "—", bodyLengthCm: "—" },
];
