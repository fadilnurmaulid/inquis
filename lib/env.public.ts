/**
 * Client-safe environment variables — hanya NEXT_PUBLIC_* vars.
 * Aman di-import dari Client Components, middleware, dan server.
 * Tidak pernah throw — menggunakan fallback "" agar tidak meledak di browser.
 *
 * Untuk server-only vars (DATABASE_URL, SERVICE_ROLE_KEY, dll),
 * gunakan @/lib/env (server-only).
 */

export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
} as const;
