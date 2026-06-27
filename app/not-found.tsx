/**
 * 404 Not Found page
 * Child-friendly language, no technical details exposed.
 */

import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
        <p className="max-w-md text-muted-foreground">
          Halaman yang kamu cari tidak ada. Yuk kembali ke halaman utama!
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
