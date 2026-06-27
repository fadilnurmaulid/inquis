/**
 * Environment configuration validation — FR-014
 * Validates required env vars at startup. Fails fast if any are missing.
 */

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Copy .env.example to .env.local and fill in the values.`
    );
  }
  return value;
}

function getOptionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const env = {
  // Database
  databaseUrl: getRequiredEnv("DATABASE_URL"),

  // Supabase
  supabaseUrl: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),

  // App
  appUrl: getOptionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  appEnv: getOptionalEnv("NEXT_PUBLIC_APP_ENV", "development"),

  // Derived
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;

// Public env (safe to expose to client)
export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
} as const;
