import type { Config } from "tailwindcss";

/**
 * INQUIS — "Jurnal Lapangan" design system.
 *
 * Semua warna diturunkan dari satu ide: buku catatan lapangan seorang
 * penjelajah cilik. Kertas daur ulang bersemu hijau, tinta botani, dan
 * spesimen berwarna. Tidak ada abu-abu netral di UI anak — teks gelap
 * adalah tinta hijau (`tinta`), bukan #111.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── Palet Jurnal Lapangan ───────────────────────────────── */
        kertas: {
          DEFAULT: "#EEF1E6", // kertas daur ulang, bersemu hijau
          lo: "#F7F8F2", // kartu / permukaan terangkat
          hi: "#E1E7D6", // lipatan, garis tepi, bidang tenggelam
          deep: "#D3DBC4", // sisi kartu / bayangan kertas
        },
        tinta: {
          DEFAULT: "#1E3326", // tinta botani — pengganti hitam
          mid: "#41604D", // teks sekunder
          soft: "#7A8F80", // caption, placeholder
          faint: "#AEBCB1", // garis pemisah
        },
        daun: { DEFAULT: "#3E8B54", lo: "#A8D8B4", hi: "#2C6B3F" },
        matahari: { DEFAULT: "#D9922E", lo: "#F6E0AE", hi: "#B5761F" },
        langit: { DEFAULT: "#2F7FA6", lo: "#BEDFEE", hi: "#215C7A" },
        nila: { DEFAULT: "#6B5DD3", lo: "#D2CCF7", hi: "#4C40A8" },
        tanah: { DEFAULT: "#8C5A3C", lo: "#DEC6B2", hi: "#6A4129" },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 3px)",
        sm: "calc(var(--radius) - 6px)",
        kartu: "1.25rem",
        tile: "0.875rem",
      },

      fontFamily: {
        // Plus Jakarta Sans — huruf latin buatan Indonesia (Tokotype).
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        // Baloo 2 — display anak: tebal, bulat, mudah dikenali usia 5–7.
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
        // IBM Plex Mono — label spesimen & angka data, suara "catatan lapangan".
        label: ["var(--font-plex)", "ui-monospace", "monospace"],
      },

      fontSize: {
        // Skala tipe eksplisit — dipakai konsisten di seluruh produk.
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        mikro: ["0.75rem", { lineHeight: "1.1rem" }],
        kecil: ["0.875rem", { lineHeight: "1.35rem" }],
        badan: ["1rem", { lineHeight: "1.6rem" }],
        besar: ["1.125rem", { lineHeight: "1.7rem" }],
        judul: ["1.5rem", { lineHeight: "1.85rem", letterSpacing: "-0.01em" }],
        pekik: ["2rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        raksasa: ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      },

      boxShadow: {
        // Bayangan kertas: pendek, hangat, tidak pernah abu-abu murni.
        kertas: "0 1px 0 0 #D3DBC4, 0 2px 6px -2px rgba(30,51,38,0.12)",
        angkat: "0 2px 0 0 #D3DBC4, 0 10px 24px -8px rgba(30,51,38,0.22)",
        tekan: "inset 0 2px 4px rgba(30,51,38,0.14)",
        tile: "0 2px 0 0 rgba(30,51,38,0.14)",
      },

      keyframes: {
        "bounce-in": {
          "0%": { transform: "scale(0.72)", opacity: "0" },
          "62%": { transform: "scale(1.06)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        goyang: {
          "0%,100%": { transform: "rotate(-2.5deg)" },
          "50%": { transform: "rotate(2.5deg)" },
        },
        apung: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "denyut-cincin": {
          "0%": { transform: "scale(0.92)", opacity: "0.7" },
          "100%": { transform: "scale(1.45)", opacity: "0" },
        },
        "gugur-daun": {
          "0%": { transform: "translateY(-8%) rotate(0deg)", opacity: "0" },
          "12%": { opacity: "0.85" },
          "100%": { transform: "translateY(112vh) rotate(320deg)", opacity: "0" },
        },
        "hanyut-awan": {
          from: { transform: "translateX(-18%)" },
          to: { transform: "translateX(118%)" },
        },
        kilau: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        riak: {
          // Diameternya sudah dihitung tepat di components/ui/button.tsx,
          // jadi riak berakhir di scale(1) — bukan melar melewati tombol.
          "0%": { transform: "scale(0)", opacity: "0.4" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        "bounce-in": "bounce-in 0.42s cubic-bezier(0.34,1.56,0.64,1)",
        goyang: "goyang 0.5s ease-in-out",
        apung: "apung 3.4s ease-in-out infinite",
        "denyut-cincin": "denyut-cincin 1.6s ease-out infinite",
        "gugur-daun": "gugur-daun 14s linear infinite",
        "hanyut-awan": "hanyut-awan 60s linear infinite",
        kilau: "kilau 1.6s ease-in-out infinite",
        riak: "riak 0.6s ease-out forwards",
      },

      transitionDuration: {
        instan: "90ms",
        cepat: "180ms",
        normal: "280ms",
        lambat: "460ms",
      },
      transitionTimingFunction: {
        pegas: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        halus: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
