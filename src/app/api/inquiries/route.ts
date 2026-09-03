import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/inquiries
 * Submit a wholesale inquiry
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, business_name, email, phone, country, message, product_id } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // If Supabase is not configured, return success but log locally
    if (!supabase) {
      console.log("Inquiry submitted (local fallback):", {
        name,
        business_name,
        email,
        phone,
        country,
        message,
        product_id,
        timestamp: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        message: "Inquiry received. We'll contact you soon via WhatsApp or email.",
        source: "local"
      });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("inquiries")
      .insert({
        name,
        business_name,
        email,
        phone,
        country,
        message,
        product_id: product_id || null,
        status: "new"
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      // Log locally on error
      console.log("Inquiry submitted (error fallback):", {
        name,
        business_name,
        email,
        phone,
        country,
        message,
        product_id
      });

      return NextResponse.json({
        success: true,
        message: "Inquiry received. We'll contact you soon.",
        source: "local-fallback"
      });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully. We'll contact you soon via WhatsApp or email.",
      inquiry_id: data.id,
      source: "database"
    });

  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try contacting us via WhatsApp." },
      { status: 500 }
    );
  }
}
