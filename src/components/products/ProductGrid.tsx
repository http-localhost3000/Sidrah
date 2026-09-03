import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";
import { cn } from "@/lib/cn";

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

const cols: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
};

const tones: Array<"cream" | "sage" | "ivory" | "warm"> = [
  "cream",
  "sage",
  "warm",
  "ivory",
];

export function ProductGrid({
  products,
  className,
  columns = 4,
}: ProductGridProps) {
  return (
    <div className={cn("grid gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12", cols[columns], className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} imageTone={tones[i % tones.length]} />
      ))}
    </div>
  );
}
