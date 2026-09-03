import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { brands as localBrands } from "@/data/brands";

export const dynamic = "force-dynamic";

/**
 * GET /api/brands
 * Fetch all active brands
 */
export async function GET() {
  try {
    const supabase = createClient();

    // If Supabase is not configured, fall back to local data
    if (!supabase) {
      return NextResponse.json({ 
        brands: localBrands,
        count: localBrands.length,
        source: "local"
      });
    }

    // Fetch from Supabase
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("active", true)
      .order("name");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ 
        brands: localBrands,
        count: localBrands.length,
        source: "local-fallback"
      });
    }

    return NextResponse.json({ 
      brands: data || [],
      count: data?.length || 0,
      source: "database"
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      brands: localBrands,
      count: localBrands.length,
      source: "local-fallback-error"
    });
  }
}
