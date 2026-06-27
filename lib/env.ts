/**
 * Environment configuration validation — FR-014
 * SERVER ONLY — never import this file from a Client Component.
 * For client-safe env vars, import from @/lib/env.public instead.
 */
import "server-only";

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
  // Database — lazy getter so it only throws when actually used server-side
  get databaseUrl() {
    return getRequiredEnv("DATABASE_URL");
  },

  // Supabase
  get supabaseUrl() {
    return getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseAnonKey() {
    return getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  },
  get supabaseServiceRoleKey() {
    return getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");
  },

  // App
  appUrl: getOptionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  appEnv: getOptionalEnv("NEXT_PUBLIC_APP_ENV", "development"),

  // Derived
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
} as const;
