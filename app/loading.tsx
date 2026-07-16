/**
 * Layar muat global — supaya tidak pernah ada halaman kosong.
 */

import { LogoMark } from "@/components/brand/logo";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-kertas" aria-busy>
      <div className="relative">
        <span className="absolute inset-0 animate-denyut-cincin rounded-full border-2 border-daun" aria-hidden />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas-lo shadow-kertas">
          <LogoMark size={40} decorative />
        </span>
      </div>
      <p className="label-spesimen text-tinta-soft">Sedang memuat</p>
      <span className="sr-only">Halaman sedang dimuat.</span>
    </div>
  );
}
