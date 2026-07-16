"use client";

/**
 * Pemilih papan.
 *
 * Satu-satunya tempat yang tahu jenis tantangan mana dipetakan ke papan
 * mana. Mesin aktivitas cukup memanggil <Papan data={…} /> tanpa peduli
 * isinya pola, timbangan, atau laboratorium.
 *
 * `switch` di bawah lengkap terhadap union `Tantangan`. Kalau nanti ada
 * jenis kesebelas ditambahkan di lib/game/types.ts tanpa papannya,
 * TypeScript menolak berkas ini lewat `never` di cabang default —
 * jadi mustahil lupa.
 */

import { PapanBedaSendiri, PapanIngatPola, PapanPolaIsi, PapanPolaSusun } from "@/components/game/pola";
import { PapanPilahWadah, PapanUrutDeret } from "@/components/game/pilah";
import { PapanGarisBilangan, PapanLabSimulasi } from "@/components/game/prediksi";
import { PapanLabTakar, PapanTimbang } from "@/components/game/ilmuwan";
import type { HasilMain } from "@/components/game/umum";
import type { Tantangan } from "@/lib/game/types";

interface PapanProps {
  data: Tantangan;
  onSelesai: (hasil: HasilMain) => void;
}

export function Papan({ data, onSelesai }: PapanProps) {
  switch (data.kind) {
    case "pola-isi":
      return <PapanPolaIsi data={data} onSelesai={onSelesai} />;
    case "pola-susun":
      return <PapanPolaSusun data={data} onSelesai={onSelesai} />;
    case "beda-sendiri":
      return <PapanBedaSendiri data={data} onSelesai={onSelesai} />;
    case "ingat-pola":
      return <PapanIngatPola data={data} onSelesai={onSelesai} />;
    case "pilah-wadah":
      return <PapanPilahWadah data={data} onSelesai={onSelesai} />;
    case "urut-deret":
      return <PapanUrutDeret data={data} onSelesai={onSelesai} />;
    case "lab-simulasi":
      return <PapanLabSimulasi data={data} onSelesai={onSelesai} />;
    case "garis-bilangan":
      return <PapanGarisBilangan data={data} onSelesai={onSelesai} />;
    case "lab-takar":
      return <PapanLabTakar data={data} onSelesai={onSelesai} />;
    case "timbang":
      return <PapanTimbang data={data} onSelesai={onSelesai} />;
    default: {
      const _lengkap: never = data;
      return _lengkap;
    }
  }
}
