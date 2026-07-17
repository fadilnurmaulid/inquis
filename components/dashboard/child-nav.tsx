"use client";

/**
 * Navigasi bawah untuk anak.
 *
 * Dua tempat, ikon di depan, tanpa menu bertingkat.
 *
 * Dulu ada tombol senyap di sini. Dibuang: tidak ada satu pun bagian
 * aplikasi yang memutar suara, jadi tombol itu tidak mengendalikan apa
 * pun. Kontrol yang tidak melakukan apa-apa lebih buruk daripada tidak
 * ada kontrol sama sekali. Kalau nanti suara benar-benar dipasang,
 * AudioProvider masih terpasang di app/(child)/layout.tsx dan tombolnya
 * tinggal dikembalikan.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tempat {
  href: string;
  icon: React.ElementType;
  label: string;
  persis?: boolean;
}

const TEMPAT: Tempat[] = [
  { href: "/play/home", icon: Home, label: "Peta", persis: true },
  { href: "/play/profile", icon: User, label: "Profil" },
];

const TOMBOL =
  "flex min-h-[56px] min-w-[68px] flex-col items-center justify-center gap-1 rounded-tile px-3 py-1.5 transition-all duration-cepat ease-pegas active:scale-95";

export function ChildNav() {
  const pathname = usePathname();

  const aktif = (t: Tempat) => (t.persis ? pathname === t.href : pathname.startsWith(t.href));

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-kertas-deep bg-kertas-lo/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-md items-center justify-center gap-6 px-4 py-1.5">
        {TEMPAT.map((t) => {
          const Ikon = t.icon;
          const ini = aktif(t);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={ini ? "page" : undefined}
              className={cn(TOMBOL, ini ? "bg-daun-lo/45 text-daun-hi" : "text-tinta-soft hover:bg-kertas-hi hover:text-tinta")}
            >
              <Ikon className={cn("h-6 w-6 transition-transform duration-cepat", ini && "scale-110")} aria-hidden />
              <span className="text-[0.625rem] font-bold leading-none">{t.label}</span>
            </Link>
          );
        })}

      </div>
    </nav>
  );
}
