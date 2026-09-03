export type Slug = string;

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AgeRange {
  id: string;
  label: string;
  min: number;
  max: number;
  unit: "months" | "years";
}
