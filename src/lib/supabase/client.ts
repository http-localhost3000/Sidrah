import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for client-side operations.
 * Uses the anonymous/public key which is safe to expose in the browser.
 * Row Level Security (RLS) policies protect data access.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If environment variables are not configured, return null
  // This allows the app to fall back to local data
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase environment variables not configured. Using local data fallback."
    );
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
