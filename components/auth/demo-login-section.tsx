"use client";

/**
 * DemoLoginSection — one-click demo login for LIDM judges.
 * Naturally embedded in login page and demo page.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DEMO_ACCOUNTS, type DemoAccount } from "@/lib/demo/accounts";
import { cn } from "@/lib/utils";

interface DemoLoginSectionProps {
  compact?: boolean;
}

export function DemoLoginSection({ compact = false }: DemoLoginSectionProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function loginDemo(account: DemoAccount) {
    setLoadingId(account.email);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    });

    if (authError) {
      setError(
        "Demo login gagal. Pastikan akun demo sudah dibuat (npm run demo:setup)."
      );
      setLoadingId(null);
      return;
    }

    router.refresh();
    router.push(account.redirectTo);
  }

  const cols = compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2";

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4",
        compact ? "space-y-3" : "space-y-4"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-display text-sm font-bold text-gray-800">
          Mode Demo · LIDM 2026
        </h3>
      </div>

      {!compact && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          Klik tombol di bawah untuk langsung masuk tanpa mendaftar.{" "}
          <span className="font-medium text-gray-700">Tidak perlu setup apapun.</span>
        </p>
      )}

      {/* Account buttons */}
      <div className={cn("grid gap-2", cols)}>
        {DEMO_ACCOUNTS.map((account) => {
          const isLoading = loadingId === account.email;
          const isDisabled = loadingId !== null;
          return (
            <button
              key={account.email}
              onClick={() => loginDemo(account)}
              disabled={isDisabled}
              className={cn(
                "flex min-h-[56px] items-center gap-3 rounded-xl border-2 bg-white p-3 text-left",
                "transition-all duration-200",
                "hover:border-primary hover:shadow-md hover:-translate-y-0.5",
                "active:scale-[0.98]",
                "disabled:cursor-not-allowed disabled:opacity-60",
                isLoading && "border-primary ring-2 ring-primary/20"
              )}
              aria-label={`Masuk sebagai ${account.label}`}
            >
              <span className="text-2xl" aria-hidden>{account.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-gray-800">
                  {account.label}
                </p>
                {!compact && (
                  <p className="truncate text-xs text-muted-foreground">
                    {account.description}
                  </p>
                )}
              </div>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" aria-label="Memuat..." />
              ) : (
                <ChevronRight className="h-4 w-4 text-primary/60" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl bg-destructive/10 px-3 py-2.5 text-xs font-medium text-destructive"
        >
          {error}
        </div>
      )}
    </div>
  );
}
