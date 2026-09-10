import type { Metadata } from "next";
import ShopPage from "../shop/page";

export const metadata: Metadata = {
  title: "Products — Sidrah Fashion",
  description:
    "Sidrah Fashion wholesale catalogue — search products by brand and age range.",
};

interface ProductsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return <ShopPage searchParams={searchParams} />;
}
