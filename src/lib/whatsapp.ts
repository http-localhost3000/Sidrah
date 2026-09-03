import { site } from "@/data/site";
import type { Product } from "@/types/product";

const digitsOnly = (s: string) => s.replace(/\D/g, "");

export interface EnquiryContext {
  product?: Pick<Product, "name" | "brand" | "sku"> &
    Partial<Pick<Product, "setQuantity">>;
  selectedSize?: string;
}

/**
 * Build a wa.me URL with a Sidrah Fashion enquiry message. The message is
 * dynamically generated from the product context — never hardcoded to one
 * product. Missing selected size becomes an explicit "Please advise" line
 * rather than being omitted, so the sales team always knows what's outstanding.
 */
export function buildEnquiryUrl(
  productOrCtx?: EnquiryContext | EnquiryContext["product"],
  legacySelectedSize?: string,
): string {
  const ctx = normaliseCtx(productOrCtx, legacySelectedSize);
  const phone = digitsOnly(site.whatsapp);
  const lines = ["Hello Sidrah Fashion,", ""];

  if (ctx.product) {
    lines.push("I am interested in:");
    lines.push("");
    lines.push(`Product: ${ctx.product.name}`);
    lines.push(`Brand: ${ctx.product.brand}`);
    lines.push(`SKU: ${ctx.product.sku}`);
    lines.push(
      `Size: ${ctx.selectedSize ? ctx.selectedSize : "Please advise available sizes"}`,
    );
    if (ctx.product.setQuantity) {
      lines.push(`Set: ${ctx.product.setQuantity} pieces`);
    }
    lines.push("");
    lines.push("Please share availability and wholesale details.");
  } else {
    lines.push(
      "I would like to know more about your wholesale collection.",
    );
  }

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phone}?text=${text}`;
}

function normaliseCtx(
  productOrCtx?: EnquiryContext | EnquiryContext["product"],
  legacySelectedSize?: string,
): EnquiryContext {
  if (!productOrCtx) return {};
  if ("product" in productOrCtx || "selectedSize" in productOrCtx) {
    return productOrCtx as EnquiryContext;
  }
  return {
    product: productOrCtx as EnquiryContext["product"],
    selectedSize: legacySelectedSize,
  };
}
