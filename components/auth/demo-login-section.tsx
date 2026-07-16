"use client";

/**
 * Masuk sebagai anak uji coba.
 *
 * Berbeda dari tombol "Coba tanpa masuk" di halaman demo: yang ini
 * masuk sungguhan, jadi kemajuannya tersimpan. Perbedaan itu ditulis
 * terang-terangan di halaman, bukan disembunyikan.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Specimen } from "@/components/illustrations/specimens";
import { DEMO_ACCOUNTS, type DemoAccount } from "@/lib/demo/accounts";
import { cn } from "@/lib/utils";

interface DemoLoginSectionProps {
  compact?: boolean;
}

export function DemoLoginSection({ compact = false }: DemoLoginSectionProps) {
  const [memuat, setMemuat] = useState<string | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const router = useRouter();

  async function masuk(akun: DemoAccount) {
    setMemuat(akun.email);
    setGalat(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: akun.email,
      password: akun.password,
    });

    if (error) {
      setGalat("Belum bisa masuk. Akun uji coba perlu dibuat dulu lewat `npm run demo:setup`.");
      setMemuat(null);
      return;
    }

    router.refresh();
    router.push(akun.redirectTo);
  }

  return (
    <div className="space-y-3">
      {!compact && (
        <p className="text-kecil leading-relaxed text-tinta-mid">
          Masuk sebagai salah satu anak di bawah. Kemajuannya tersimpan, jadi kamu bisa keluar dan
          melanjutkan nanti.
        </p>
      )}

      <div className={cn("grid gap-2.5", compact ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2")}>
        {DEMO_ACCOUNTS.map((akun) => {
          const jalan = memuat === akun.email;
          return (
            <button
              key={akun.email}
              type="button"
              onClick={() => masuk(akun)}
              disabled={memuat !== null}
              aria-label={`Masuk sebagai ${akun.label}`}
              className={cn(
                "target-sentuh flex items-center gap-3 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-3 text-left",
                "shadow-tile transition-all duration-cepat ease-pegas",
                "hover:-translate-y-0.5 hover:border-daun/60 hover:shadow-angkat",
                "active:translate-y-0.5 active:shadow-tekan",
                "disabled:cursor-default disabled:opacity-60",
                jalan && "border-daun"
              )}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas">
                <Specimen id={akun.spesimen} size={24} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-badan font-bold text-tinta">{akun.label}</span>
                {!compact && (
                  <span className="block text-mikro leading-tight text-tinta-soft">{akun.description}</span>
                )}
              </span>
              {jalan ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-daun" aria-label="Sedang masuk" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-tinta-faint" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {galat && (
        <p role="alert" className="rounded-tile border-2 border-tanah/40 bg-tanah-lo/25 px-3.5 py-2.5 text-kecil text-tanah-hi">
          {galat}
        </p>
      )}
    </div>
  );
}
