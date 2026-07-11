/**
 * Root Layout — FND-010
 * Initializes global providers, fonts, metadata, and styles.
 * All pages inherit from this layout (FR-006).
 */

import type { Metadata, Viewport } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";

// ── Fonts ──────────────────────────────────────────────────────────────────
// Nunito: body text (readable, friendly, appropriate for educators)
// Fredoka: display/headings (rounded, playful, child-facing)
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "INQUIS · Belajar Sains & Peduli Lingkungan",
    template: "%s | INQUIS",
  },
  description:
    "Platform pembelajaran inkuiri berbasis sains untuk anak usia 5–7 tahun. " +
    "Kembangkan kemampuan berpikir ilmiah dan kepedulian pada lingkungan melalui eksplorasi yang menyenangkan.",
  keywords: ["INQUIS", "sains anak", "inkuiri", "lingkungan", "LIDM 2026", "pembelajaran digital"],
  authors: [{ name: "INQUIS Team · LIDM 2026" }],
  openGraph: {
    title: "INQUIS · Belajar Sains & Peduli Lingkungan",
    description:
      "Platform pembelajaran inkuiri berbasis sains untuk anak usia 5–7 tahun, sekaligus menumbuhkan kepedulian lingkungan.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  themeColor: "#60B8FF",
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${fredoka.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
