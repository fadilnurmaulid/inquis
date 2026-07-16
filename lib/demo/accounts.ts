/**
 * Akun anak untuk uji coba.
 *
 * Hanya anak. Akun guru dan orang tua sudah dihapus bersama dasbornya —
 * produk ini dipakai anak, dan setiap layar yang bukan untuk anak hanya
 * menambah tempat bug bersembunyi.
 *
 * Kata sandinya harus sama dengan pengguna di Supabase Auth
 * (lihat scripts/sync-demo-auth.ts).
 */

import type { SpecimenId } from "@/components/illustrations/specimens";

export const DEMO_PASSWORD = "Demo2026!";

export interface DemoAccount {
  role: "CHILD";
  email: string;
  password: string;
  label: string;
  description: string;
  spesimen: SpecimenId;
  redirectTo: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "CHILD",
    email: "bima@inquis.app",
    password: DEMO_PASSWORD,
    label: "Bima",
    description: "Baru mulai. Semua dunia masih tertutup kecuali yang pertama.",
    spesimen: "tunas",
    redirectTo: "/play/home",
  },
  {
    role: "CHILD",
    email: "rara@inquis.app",
    password: DEMO_PASSWORD,
    label: "Rara",
    description: "Dunia 1 sudah tuntas, sekarang di Dunia 2.",
    spesimen: "bunga-matahari",
    redirectTo: "/play/home",
  },
];

export function getDemoAccountByRole(role: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.role === role.toUpperCase());
}
