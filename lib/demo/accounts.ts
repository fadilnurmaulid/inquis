/**
 * Demo account credentials for LIDM 2026 demonstration.
 * Password must match Supabase Auth users (see scripts/sync-demo-auth.ts).
 */

export const DEMO_PASSWORD = "Demo2026!";

export interface DemoAccount {
  role: "CHILD" | "TEACHER" | "PARENT";
  email: string;
  password: string;
  label: string;
  description: string;
  emoji: string;
  redirectTo: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "CHILD",
    email: "bima@inquis.app",
    password: DEMO_PASSWORD,
    label: "Anak — Pemula",
    description: "Belum mulai belajar — ideal untuk demo alur baru",
    emoji: "🌱",
    redirectTo: "/play/home",
  },
  {
    role: "CHILD",
    email: "rara@inquis.app",
    password: DEMO_PASSWORD,
    label: "Anak — Rara",
    description: "Dunia 1 selesai, sedang di Dunia 2",
    emoji: "⭐",
    redirectTo: "/play/home",
  },
  {
    role: "TEACHER",
    email: "demo.teacher@inquis.app",
    password: DEMO_PASSWORD,
    label: "Guru — Bu Sari",
    description: "Kelas 1A dengan 4 siswa dan data kemajuan",
    emoji: "👩‍🏫",
    redirectTo: "/teacher/dashboard",
  },
  {
    role: "PARENT",
    email: "demo.parent@inquis.app",
    password: DEMO_PASSWORD,
    label: "Orang Tua — Pak Budi",
    description: "Pantau kemajuan Rara",
    emoji: "👨‍👩‍👧",
    redirectTo: "/parent/dashboard",
  },
];

export function getDemoAccountByRole(role: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.role === role.toUpperCase());
}
