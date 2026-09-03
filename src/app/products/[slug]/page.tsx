import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInteractive } from "@/components/products/ProductInteractive";
import { ProductDescription } from "@/components/products/ProductDescription";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/catalog";
import { getCollectionBySlug } from "@/lib/collections";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  const brandLabel = product.brand && product.brand !== "Unbranded" ? ` — ${product.brand}` : "";
  return {
    title: `${product.name}${brandLabel}`,
    description: `${product.description} Wholesale set of ${product.setQuantity} pieces from Sidrah Fashion, Mumbai.`,
    openGraph: {
      title: `${product.name}${brandLabel}`,
      description: product.description,
    },
  };
}

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const collection = getCollectionBySlug(product.category);
  const subcategoryLabel = product.subcategory
    ? collection?.subcollections.find((s) => s.slug === product.subcategory)
        ?.label
    : undefined;

  const related = getRelatedProducts(product, 4);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    {
      label: collection?.title ?? "Collection",
      href: `/collections/${product.category}`,
    },
    ...(product.subcategory && subcategoryLabel
      ? [
          {
            label: subcategoryLabel,
            href: `/collections/${product.category}?sub=${product.subcategory}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <div className="bg-page pt-8 lg:pt-10">
        <Container>
          <Breadcrumbs items={crumbs} />
        </Container>
      </div>

      <section className="bg-page pb-section pt-8 lg:pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <ProductGallery
                images={product.images}
                productName={product.name}
                isNew={product.newArrival}
                isFeatured={product.featured}
              />
            </div>
            <div className="lg:col-span-5">
              <ProductInteractive
                product={product}
                subcategoryLabel={subcategoryLabel}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-section">
          <ProductDescription
            product={product}
            subcategoryLabel={subcategoryLabel}
          />
        </Container>
      </section>

      <section className="bg-page">
        <Container className="pb-section pt-section">
          <RelatedProducts products={related} />
        </Container>
      </section>

      {/* Bottom spacer so mobile sticky enquiry bar doesn't cover the last row */}
      <div aria-hidden="true" className="h-20 lg:hidden" />
    </>
  );
}
