import type { Product } from "@/types/product";
import type { Subcollection } from "@/types/collection";

interface ProductDescriptionProps {
  product: Product;
  subcategoryLabel?: string;
}

const infoBlocks: Array<{ title: string; body: string }> = [
  {
    title: "Worldwide shipping",
    body: "Worldwide shipping available. Shipping charges apply based on destination, order size and shipping requirements.",
  },
  {
    title: "Wholesale only",
    body: "Sidrah Fashion supplies wholesale to retailers and resellers. Every style is sold in a set; the set quantity is shown on the product page. Availability depends on current stock.",
  },
  {
    title: "Enquiries",
    body: "All enquiries are handled through WhatsApp — final wholesale prices, availability and lead times are confirmed there.",
  },
];

export function ProductDescription({
  product,
  subcategoryLabel,
}: ProductDescriptionProps) {
  const detailRows: Array<{ label: string; value: string }> = [
    ...(product.brand && product.brand !== "Unbranded"
      ? [{ label: "Brand", value: product.brand }]
      : []),
    { label: "Category", value: prettify(product.category) },
    ...(subcategoryLabel
      ? [{ label: "Collection", value: subcategoryLabel }]
      : []),
    ...(product.fit ? [{ label: "Fit", value: product.fit }] : []),
    ...(product.fabric ? [{ label: "Fabric", value: product.fabric }] : []),
    { label: "Set", value: `${product.setQuantity} pieces` },
    ...(product.sizes.length
      ? [{ label: "Available sizes", value: product.sizes.join(" · ") }]
      : []),
  ];

  return (
    <div className="grid gap-block lg:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="eyebrow text-ink/55">About this style</p>
        <p className="mt-6 max-w-editorial text-body-lg text-ink/80">
          {product.description}
        </p>

        <div className="mt-10 rule-t pt-6">
          <p className="eyebrow text-ink/55">Details</p>
          <dl className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-[160px_1fr] sm:gap-y-5">
            {detailRows.map((row) => (
              <div key={row.label} className="contents">
                <dt className="eyebrow self-baseline text-ink/55">
                  {row.label}
                </dt>
                <dd className="text-body text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <aside className="flex flex-col gap-8 lg:pl-6">
        {infoBlocks.map((block) => (
          <div key={block.title} className="border-t border-rule pt-5">
            <h3 className="eyebrow text-ink/55">{block.title}</h3>
            <p className="mt-3 max-w-prose text-body text-ink/75">
              {block.body}
            </p>
          </div>
        ))}
      </aside>
    </div>
  );
}

function prettify(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

// keep the import from being tree-shaken as unused in a fresh reader's mental
// model of what data flows in
export type { Subcollection };
