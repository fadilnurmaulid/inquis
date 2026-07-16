"use client";

/**
 * Formulir masuk.
 *
 * Tinggal satu tujuan setelah berhasil: /play/home. Peran guru dan
 * orang tua sudah tidak ada, jadi tidak ada lagi peta peran ke dasbor
 * masing-masing — dan tidak ada lagi kemungkinan salah antar.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { DemoLoginSection } from "@/components/auth/demo-login-section";
import { getRoleHome } from "@/lib/services/auth-redirect";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const skema = z.object({
  email: z.string().email("Alamat email belum benar"),
  password: z.string().min(6, "Kata sandi minimal 6 huruf"),
});

type NilaiMasuk = z.infer<typeof skema>;

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [lihat, setLihat] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NilaiMasuk>({
    resolver: zodResolver(skema),
    defaultValues: { email: "", password: "" },
  });

  async function kirim(nilai: NilaiMasuk) {
    setGalat(null);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: nilai.email,
      password: nilai.password,
    });

    if (error || !data.user) {
      setGalat("Email atau kata sandinya belum cocok. Coba periksa lagi.");
      return;
    }

    const peran = data.user.user_metadata?.role as UserRole | undefined;
    const tujuan = redirectTo ?? (peran ? getRoleHome(peran) : "/play/home");

    router.refresh();
    router.push(tujuan);
  }

  const kelasKolom = cn(
    "target-sentuh w-full rounded-tile border-2 border-kertas-deep bg-kertas-lo px-3.5 py-2.5",
    "text-badan text-tinta placeholder:text-tinta-faint",
    "transition-colors duration-cepat focus:border-daun focus:outline-none"
  );

  return (
    <div className="flex flex-col gap-5">
      <DemoLoginSection compact />

      <div className="relative flex items-center gap-3">
        <span className="h-0.5 flex-1 rounded-full bg-kertas-deep" aria-hidden />
        <span className="label-spesimen text-tinta-faint">atau pakai akun sendiri</span>
        <span className="h-0.5 flex-1 rounded-full bg-kertas-deep" aria-hidden />
      </div>

      <form onSubmit={handleSubmit(kirim)} className="flex flex-col gap-3.5" noValidate>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="label-spesimen text-tinta-soft">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nama@sekolah.id"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "galat-email" : undefined}
            className={kelasKolom}
            {...register("email")}
          />
          {errors.email && (
            <p id="galat-email" className="text-mikro font-semibold text-tanah-hi">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="label-spesimen text-tinta-soft">
            Kata sandi
          </label>
          <div className="relative">
            <input
              id="password"
              type={lihat ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "galat-sandi" : undefined}
              className={cn(kelasKolom, "pr-12")}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setLihat((v) => !v)}
              aria-label={lihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-tinta-soft transition-colors duration-cepat hover:bg-kertas-hi hover:text-tinta"
            >
              {lihat ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
            </button>
          </div>
          {errors.password && (
            <p id="galat-sandi" className="text-mikro font-semibold text-tanah-hi">
              {errors.password.message}
            </p>
          )}
        </div>

        {galat && (
          <p role="alert" className="rounded-tile border-2 border-tanah/40 bg-tanah-lo/25 px-3.5 py-2.5 text-kecil text-tanah-hi">
            {galat}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "target-sentuh mt-1 inline-flex items-center justify-center gap-2 rounded-full border-2 px-6",
            "font-display text-besar font-extrabold transition-all duration-cepat ease-pegas",
            isSubmitting
              ? "cursor-default border-kertas-deep bg-kertas text-tinta-faint"
              : "border-daun-hi bg-daun text-kertas-lo shadow-angkat hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sedang masuk…
            </>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
    </div>
  );
}
