/**
 * Manifest aplikasi web.
 *
 * App Router menyajikannya di /manifest.webmanifest dan menautkannya
 * otomatis. Bersama app/icon.svg dan app/apple-icon.svg, inilah tiga
 * tempat identitas visual di luar halaman: tab peramban, layar utama
 * iOS, dan layar utama Android.
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INQUIS · Little Pattern Explorer",
    short_name: "INQUIS",
    description: "Anak bertanya, mencoba, lalu tahu.",
    start_url: "/",
    display: "standalone",
    background_color: "#EEF1E6",
    theme_color: "#EEF1E6",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
