"use client";

/**
 * LoginForm — FND-008 / FND-015
 * Email + password login for Teacher and Parent roles.
 * Uses React Hook Form + Zod for validation.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { DemoLoginSection } from "@/components/auth/demo-login-section";
import { DEMO_ACCOUNTS } from "@/lib/demo/accounts";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  redirectTo?: string;
  defaultRole?: string;
}

export function LoginForm({ redirectTo, defaultRole }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: (() => {
      if (!defaultRole) return { email: "", password: "" };
      const account =
        DEMO_ACCOUNTS.find((a) => a.role === defaultRole.toUpperCase()) ??
        DEMO_ACCOUNTS.find((a) => a.email.includes(defaultRole.toLowerCase()));
      return account
        ? { email: account.email, password: account.password }
        : { email: "", password: "" };
    })(),
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error || !data.user) {
      setServerError("Email atau password salah. Coba lagi.");
      return;
    }

    // Resolve role from Supabase user metadata for redirect (DASH-002)
    const role = data.user.user_metadata?.role as string | undefined;
    const roleDestinations: Record<string, string> = {
      CHILD: "/play/home",
      TEACHER: "/teacher/dashboard",
      PARENT: "/parent/dashboard",
      ADMIN: "/admin",
    };
    const destination = redirectTo ?? roleDestinations[role ?? ""] ?? "/";

    router.refresh();
    router.push(destination);
  }

  return (
    <div className="space-y-4">
      <DemoLoginSection compact />

      <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Masuk ke INQUIS</CardTitle>
        <CardDescription>
          Gunakan email dan password yang terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nama@sekolah.ac.id"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm
                         placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring
                         disabled:opacity-50"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-sm
                           placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring
                           disabled:opacity-50"
                disabled={isSubmitting}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground
                           hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Server error */}
          {serverError && (
            <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Masuk...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Masuk
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
