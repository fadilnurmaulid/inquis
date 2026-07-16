/**
 * Layar muat yang bisa dipakai di mana saja.
 *
 * Dua ragam: "penuh" menutup layar, "ringkas" untuk di dalam kartu.
 */

import { LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  pesan?: string;
  className?: string;
  ragam?: "penuh" | "ringkas";
}

export function LoadingScreen({ pesan = "Sedang memuat", className, ragam = "penuh" }: LoadingScreenProps) {
  if (ragam === "ringkas") {
    return (
      <div className={cn("flex items-center justify-center gap-2.5 py-6", className)} aria-busy>
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-daun border-t-transparent" aria-hidden />
        <span className="text-kecil text-tinta-soft">{pesan}</span>
      </div>
    );
  }

  return (
    <div
      className={cn("flex min-h-[60vh] flex-col items-center justify-center gap-4", className)}
      aria-busy
    >
      <div className="relative">
        <span className="absolute inset-0 animate-denyut-cincin rounded-full border-2 border-daun" aria-hidden />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas-lo shadow-kertas">
          <LogoMark size={32} decorative />
        </span>
      </div>
      <p className="label-spesimen text-tinta-soft">{pesan}</p>
    </div>
  );
}
