/**
 * Supabase browser client — for use in Client Components
 * Uses @supabase/ssr for proper cookie-based session handling with Next.js
 */

import { createBrowserClient } from "@supabase/ssr";
import { publicEnv } from "@/lib/env";

export function createClient() {
  return createBrowserClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey);
}
