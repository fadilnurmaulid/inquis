"use client";

/**
 * Tombol.
 *
 * Tiga hal yang selalu ada, karena ketiganya yang membuat sebuah tombol
 * terasa seperti benda dan bukan gambar:
 *
 *   hover  → naik sedikit, bayangannya melebar
 *   tekan  → turun, bayangannya masuk ke dalam (shadow-tekan)
 *   riak   → lingkaran yang menyebar dari titik jari
 *
 * Riaknya digambar dari posisi pointer sungguhan, bukan dari tengah
 * tombol, sehingga terasa seperti tombol itu yang disentuh — bukan
 * animasi yang kebetulan jalan. Dimatikan kalau pengguna meminta
 * gerakan dikurangi.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const bentukTombol = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full " +
    "border-2 font-display font-extrabold transition-all duration-cepat ease-pegas " +
    "focus-visible:outline-none disabled:pointer-events-none disabled:opacity-55 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        utama:
          "border-daun-hi bg-daun text-kertas-lo shadow-angkat hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan",
        kertas:
          "border-kertas-deep bg-kertas-lo text-tinta-mid shadow-tile hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan",
        garis:
          "border-tinta-faint bg-transparent text-tinta hover:-translate-y-0.5 hover:border-tinta active:translate-y-0.5",
        sunyi:
          "border-transparent bg-transparent text-tinta-mid hover:bg-kertas-hi hover:text-tinta active:scale-95",
        bahaya:
          "border-tanah-hi bg-tanah text-kertas-lo shadow-angkat hover:-translate-y-0.5 hover:bg-tanah-hi active:translate-y-0.5 active:shadow-tekan",
      },
      size: {
        kecil: "min-h-[36px] px-4 text-kecil [&_svg]:size-3.5",
        sedang: "target-sentuh px-6 text-badan [&_svg]:size-4",
        besar: "min-h-[52px] px-8 text-besar [&_svg]:size-5",
        ikon: "target-sentuh w-11 px-0 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "utama", size: "sedang" },
  }
);

interface Riak {
  id: number;
  x: number;
  y: number;
  d: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bentukTombol> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onPointerDown, children, ...props }, ref) => {
    const kurangiGerak = useReducedMotion();
    const [riak, setRiak] = React.useState<Riak[]>([]);
    const urut = React.useRef(0);

    // Slot meneruskan props ke anaknya; menyuntik <span> riak ke sana
    // akan merusak anak tunggal yang diharapkan Slot.
    const Comp = asChild ? Slot : "button";

    function tekan(e: React.PointerEvent<HTMLButtonElement>) {
      onPointerDown?.(e);
      if (asChild || kurangiGerak) return;

      const kotak = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - kotak.left;
      const y = e.clientY - kotak.top;
      // Diameter sebesar jarak terjauh ke sudut, supaya riaknya
      // selalu menutupi tombol berapa pun titik sentuhnya.
      const d = Math.max(
        Math.hypot(x, y),
        Math.hypot(kotak.width - x, y),
        Math.hypot(x, kotak.height - y),
        Math.hypot(kotak.width - x, kotak.height - y)
      ) * 2;

      const id = ++urut.current;
      setRiak((r) => [...r, { id, x, y, d }]);
      window.setTimeout(() => setRiak((r) => r.filter((k) => k.id !== id)), 600);
    }

    return (
      <Comp
        ref={ref}
        className={cn(bentukTombol({ variant, size }), className)}
        onPointerDown={tekan}
        {...props}
      >
        {children}
        {!asChild &&
          riak.map((k) => (
            <span
              key={k.id}
              className="pointer-events-none absolute animate-riak rounded-full bg-current opacity-30"
              style={{ left: k.x - k.d / 2, top: k.y - k.d / 2, width: k.d, height: k.d }}
              aria-hidden
            />
          ))}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, bentukTombol };
