/**
 * Tata letak akar.
 *
 * Tiga huruf, masing-masing dengan tugas jelas:
 *
 *   Baloo 2          → judul dan tombol. Bulat, tebal, mudah dikenali
 *                      mata usia 5–7.
 *   Plus Jakarta Sans → teks isi. Buatan Tokotype, dirancang untuk
 *                      bahasa Indonesia.
 *   IBM Plex Mono    → label spesimen dan angka data. Suara "catatan
 *                      lapangan" pada sistem desain ini.
 *
 * Variabelnya dibaca tailwind.config.ts lewat --font-baloo,
 * --font-jakarta, dan --font-plex.
 */

import type { Metadata, Viewport } from "next";
import { Baloo_2, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "INQUIS · Jurnal lapangan anak",
    template: "%s · INQUIS",
  },
  description:
    "Dua puluh aktivitas matematika untuk anak 5–7 tahun. Setiap aktivitas berangkat dari satu pertanyaan tentang alam dan berakhir dengan satu tindakan kecil untuk lingkungan.",
  keywords: ["INQUIS", "matematika anak", "inkuiri", "pola", "lingkungan", "PAUD", "kelas 1"],
  openGraph: {
    title: "INQUIS · Jurnal lapangan anak",
    description:
      "Anak bertanya, mencoba, lalu tahu. Dua puluh aktivitas matematika yang dimainkan, bukan dibaca.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#EEF1E6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${baloo.variable} ${plex.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
