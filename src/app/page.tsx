import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/hero/Hero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { EditorialCollectionGrid } from "@/components/collections/EditorialCollectionGrid";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BrandGrid } from "@/components/brands/BrandGrid";
import { WhySidrah } from "@/components/sections/WhySidrah";
import { RetailerCta } from "@/components/sections/RetailerCta";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { InstagramSection } from "@/components/sections/InstagramSection";

import { getCollections } from "@/lib/collections";
import { getBrands } from "@/lib/brands";
import { getDiverseProducts } from "@/lib/catalog";

export default function Home() {
  const collections = getCollections();
  const brands = getBrands();
  const highlightProducts = getDiverseProducts(
    4,
    ["shirts", "t-shirts", "denims", "cord-sets"],
    {
      shirts: "ps-plain-005",
      "cord-sets": "mb-001",
    }
  );


  return (
    <>
      <Hero />

      <section className="bg-page pb-section">
        <Container>
          <SectionHeader
            eyebrow="Shop by Collection"
            title={
              <>
                Nine considered collections<span className="italic">.</span>
              </>
            }
            description="Explore our boys' wear collections — shirts, T-shirts, denim, pants, shorts, cord sets and more, curated across six brands."
            link={{ label: "Shop all", href: "/shop" }}
          />
          <div className="mt-block">
            <EditorialCollectionGrid collections={collections} />
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-section">
          <SectionHeader
            eyebrow="New Arrivals"
            title={<>Featured this season<span className="italic">.</span></>}
            description="A first look at pieces landing across our brands. Enquire on WhatsApp for wholesale pricing and set details."
            link={{ label: "View all products", href: "/shop" }}
          />
          <div className="mt-block">
            <ProductGrid products={highlightProducts} columns={4} />
          </div>
        </Container>
      </section>

      <section className="bg-surface">
        <Container className="py-section">
          <SectionHeader
            eyebrow="Shop by Brands"
            title={<>Six houses under one roof<span className="italic">.</span></>}
            description="Every Sidrah Fashion piece belongs to one of our six in-house brands, each with its own point of view."
            link={{ label: "All brands", href: "/brands" }}
          />
          <div className="mt-block">
            <BrandGrid brands={brands} />
          </div>
        </Container>
      </section>

      <section className="bg-page">
        <Container className="py-section">
          <SectionHeader
            eyebrow="Why Sidrah Fashion"
            title={<>Wholesale, thoughtfully done<span className="italic">.</span></>}
            align="start"
          />
          <div className="mt-block">
            <WhySidrah />
          </div>
        </Container>
      </section>

      <RetailerCta />

      <AboutTeaser />

      <InstagramSection />
    </>
  );
}
