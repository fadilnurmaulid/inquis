"use client";

/**
 * DemoLoginSection — one-click demo login for LIDM judges.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DEMO_ACCOUNTS, type DemoAccount } from "@/lib/demo/accounts";
import { Button } from "@/components/ui/button";
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
        "Demo login gagal. Pastikan akun demo sudah dibuat di Supabase (npm run db:seed && npm run demo:sync)."
      );
      setLoadingId(null);
      return;
    }

    router.refresh();
    router.push(account.redirectTo);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4",
        !compact && "space-y-3"
      )}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden />
        <h3 className="font-display text-sm font-bold text-gray-800">
          Mode Demo — LIDM 2026
        </h3>
      </div>
      {!compact && (
        <p className="text-xs text-muted-foreground">
          Klik untuk langsung masuk tanpa mendaftar. Password: <code className="rounded bg-muted px-1">Demo2026!</code>
        </p>
      )}
      <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            onClick={() => loginDemo(account)}
            disabled={loadingId !== null}
            className={cn(
              "flex min-h-[56px] items-center gap-3 rounded-xl border bg-white p-3 text-left transition-all",
              "hover:border-primary hover:shadow-sm active:scale-[0.98]",
              "disabled:opacity-60",
              loadingId === account.email && "border-primary ring-2 ring-primary/20"
            )}
          >
            <span className="text-2xl" aria-hidden>{account.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">{account.label}</p>
              {!compact && (
                <p className="truncate text-xs text-muted-foreground">{account.description}</p>
              )}
            </div>
            {loadingId === account.email && (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            )}
          </button>
        ))}
      </div>
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

/**
 * Autofill demo credentials into login form fields.
 */
export function DemoAutofillButton({
  account,
  onFill,
}: {
  account: DemoAccount;
  onFill: (email: string, password: string) => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => onFill(account.email, account.password)}
      className="text-xs"
    >
      {account.emoji} {account.label}
    </Button>
  );
}
