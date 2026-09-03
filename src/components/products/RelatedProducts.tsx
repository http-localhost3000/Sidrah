import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
}

const tones: Array<"cream" | "sage" | "warm" | "ivory"> = [
  "cream",
  "sage",
  "warm",
  "ivory",
];

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow text-ink/55">You may also like</p>
          <h2 className="mt-3 font-display text-display-md">
            More from the collection
          </h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 xl:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            imageTone={tones[i % tones.length]}
          />
        ))}
      </div>
    </section>
  );
}
