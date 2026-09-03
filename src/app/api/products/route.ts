import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { products as localProducts } from "@/data/products";

export const dynamic = "force-dynamic";

/**
 * GET /api/products
 * Fetch products with optional filtering
 * 
 * Query params:
 * - brand: Filter by brand slug
 * - category: Filter by category slug
 * - subcollection: Filter by subcollection slug
 * - featured: Filter featured products
 * - new: Filter new arrivals
 * - limit: Limit results
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brandSlug = searchParams.get("brand");
  const categorySlug = searchParams.get("category");
  const subcollectionSlug = searchParams.get("subcollection");
  const featured = searchParams.get("featured") === "true";
  const newArrival = searchParams.get("new") === "true";
  const limit = searchParams.get("limit");

  try {
    const supabase = createClient();

    // If Supabase is not configured, fall back to local data
    if (!supabase) {
      console.log("Using local product data (Supabase not configured)");
      let filteredProducts = localProducts.filter((p) => {
        if (brandSlug && p.brandSlug !== brandSlug) return false;
        if (categorySlug && p.category !== categorySlug) return false;
        if (subcollectionSlug && p.subcategory !== subcollectionSlug) return false;
        if (featured && !p.featured) return false;
        if (newArrival && !p.newArrival) return false;
        return true;
      });

      if (limit) {
        filteredProducts = filteredProducts.slice(0, parseInt(limit));
      }

      return NextResponse.json({ 
        products: filteredProducts,
        count: filteredProducts.length,
        source: "local"
      });
    }

    // Build Supabase query
    let query = supabase
      .from("products")
      .select(`
        *,
        brand:brands(id, name, slug),
        category:categories(id, name, slug),
        subcollection:subcollections(id, name, slug),
        images:product_images(id, image_url, alt_text, sort_order, is_primary),
        sizes:product_sizes(id, size, available),
        colors:product_colors(id, color_name, color_hex, available)
      `)
      .eq("active", true)
      .order("created_at", { ascending: false });

    // Apply filters
    if (brandSlug) {
      query = query.eq("brand.slug", brandSlug);
    }
    if (categorySlug) {
      query = query.eq("category.slug", categorySlug);
    }
    if (subcollectionSlug) {
      query = query.eq("subcollection.slug", subcollectionSlug);
    }
    if (featured) {
      query = query.eq("featured", true);
    }
    if (newArrival) {
      query = query.eq("new_arrival", true);
    }
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      // Fall back to local data on error
      return NextResponse.json({ 
        products: localProducts,
        count: localProducts.length,
        source: "local-fallback",
        error: error.message
      });
    }

    return NextResponse.json({ 
      products: data || [],
      count: count || 0,
      source: "database"
    });

  } catch (error) {
    console.error("API error:", error);
    // Fall back to local data on any error
    return NextResponse.json({ 
      products: localProducts,
      count: localProducts.length,
      source: "local-fallback-error"
    });
  }
}
