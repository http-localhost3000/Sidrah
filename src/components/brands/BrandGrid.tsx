import { BrandTile } from "./BrandTile";
import type { Brand } from "@/types/brand";

interface BrandGridProps {
  brands: Brand[];
}

export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {brands.map((b) => (
        <BrandTile key={b.id} brand={b} />
      ))}
    </div>
  );
}
