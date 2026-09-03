import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { products as localProducts } from "@/data/products";

/**
 * GET /api/products/[slug]
 * Fetch a single product by slug
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const supabase = createClient();

    // If Supabase is not configured, fall back to local data
    if (!supabase) {
      const product = localProducts.find((p) => p.slug === slug);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ product, source: "local" });
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        brand:brands(id, name, slug, tagline, description),
        category:categories(id, name, slug),
        subcollection:subcollections(id, name, slug),
        images:product_images(id, image_url, alt_text, sort_order, is_primary),
        sizes:product_sizes(id, size, available),
        colors:product_colors(id, color_name, color_hex, available)
      `)
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // Fall back to local data
      const product = localProducts.find((p) => p.slug === slug);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ product, source: "local-fallback" });
    }

    if (!data) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product: data, source: "database" });

  } catch (error) {
    console.error("API error:", error);
    // Fall back to local data
    const product = localProducts.find((p) => p.slug === slug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ product, source: "local-fallback-error" });
  }
}
