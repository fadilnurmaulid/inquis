/**
 * Uji keutuhan isi.
 *
 * TypeScript sudah memaksa kedelapan tahap inkuiri terisi — bidangnya
 * wajib di `Aktivitas`. Yang tidak bisa dijaga TypeScript adalah apakah
 * isinya bermakna dan apakah jawabannya benar. Itu tugas berkas ini.
 *
 * Yang paling penting di sini bukan uji "ada 20 aktivitas", melainkan
 * uji aritmetika tiap papan: kalau suatu hari `tersedia` di resep kompos
 * diubah tanpa memperbarui `jawaban`, anak akan diberi tahu bahwa
 * jawabannya salah padahal dia benar. Bug seperti itu tidak akan
 * kelihatan di layar mana pun sampai ada anak yang menangis.
 */

import { describe, expect, it } from "vitest";
import { aktivitasDunia, getAktivitas, SEMUA_AKTIVITAS } from "@/lib/game/content";
import { NAMA_JENIS, TAHAP_INKUIRI, type Aktivitas } from "@/lib/game/types";
import { isSpecimenId } from "@/components/illustrations/specimens";
import { WORLDS } from "@/types";

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u;

/** Semua teks yang akan dibaca anak, dari satu aktivitas. */
function semuaTeks(a: Aktivitas): string[] {
  const t = [
    a.judul,
    a.tujuan,
    a.pemantik,
    a.eksplorasi.ajakan,
    a.prediksi.pertanyaan,
    a.refleksi.pertanyaan,
    a.penguatan,
    a.karakter.judul,
    a.karakter.aksi,
    a.tantangan.perintah,
    ...a.tantangan.petunjuk,
    ...a.eksplorasi.benda.flatMap((b) => [b.label, b.catatan]),
    ...a.prediksi.pilihan.map((p) => p.label),
    ...a.refleksi.pilihan.map((p) => p.label),
  ];
  if (a.tantangan.kind === "lab-takar") t.push(a.tantangan.cerita);
  if (a.tantangan.kind === "beda-sendiri") t.push(a.tantangan.alasan);
  if (a.tantangan.kind === "lab-simulasi") {
    t.push(a.tantangan.ujian.pertanyaan);
    a.tantangan.keadaan.forEach((k) => t.push(k.nama, k.keterangan));
  }
  return t;
}

describe("Katalog aktivitas", () => {
  it("berisi 5 aktivitas untuk tiap dunia", () => {
    expect(SEMUA_AKTIVITAS).toHaveLength(WORLDS.length * 5);
    WORLDS.forEach((w) => {
      expect(aktivitasDunia(w.id)).toHaveLength(w.activityCount);
    });
  });

  it("id-nya mengikuti pola activity-{dunia}-{nomor} dan cocok dengan isinya", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      expect(a.id).toBe(`activity-${a.worldNumber}-${a.nomor}`);
      expect(a.worldId).toBe(`world-${a.worldNumber}`);
      expect(getAktivitas(a.id)).toBe(a);
    });
  });

  it("penomorannya berurutan 1..5 di tiap dunia, tanpa lompatan", () => {
    WORLDS.forEach((w) => {
      const nomor = aktivitasDunia(w.id).map((a) => a.nomor);
      expect(nomor).toEqual([1, 2, 3, 4, 5]);
    });
  });

  it("memakai kesepuluh mesin permainan yang ada", () => {
    const dipakai = new Set(SEMUA_AKTIVITAS.map((a) => a.tantangan.kind));
    expect(dipakai.size).toBe(Object.keys(NAMA_JENIS).length);
  });

  it("tiap dunia punya campuran mesin sendiri, bukan satu jenis diulang lima kali", () => {
    WORLDS.forEach((w) => {
      const jenis = new Set(aktivitasDunia(w.id).map((a) => a.tantangan.kind));
      expect(jenis.size).toBeGreaterThanOrEqual(2);
    });
  });
});

describe("Kedelapan tahap inkuiri", () => {
  it.each(SEMUA_AKTIVITAS.map((a) => [a.id, a] as const))("%s mengisi semua tahap", (_id, a) => {
    // Tahap 1–2
    expect(a.tujuan.trim().length).toBeGreaterThan(15);
    expect(a.pemantik.trim().length).toBeGreaterThan(10);
    // Pemantik harus terbuka: pertanyaan ya/tidak tidak memancing apa pun.
    expect(a.pemantik).toContain("?");

    // Tahap 3
    expect(a.eksplorasi.ajakan.trim().length).toBeGreaterThan(10);
    expect(a.eksplorasi.benda.length).toBeGreaterThanOrEqual(3);
    a.eksplorasi.benda.forEach((b) => {
      expect(isSpecimenId(b.spesimen)).toBe(true);
      expect(b.label.trim()).not.toBe("");
      expect(b.catatan.trim().length).toBeGreaterThan(15);
    });

    // Tahap 4
    expect(a.prediksi.pertanyaan).toContain("?");
    expect(a.prediksi.pilihan.length).toBeGreaterThanOrEqual(2);
    expect(a.prediksi.pilihan.map((p) => p.id)).toContain(a.prediksi.sesuaiId);
    expect(new Set(a.prediksi.pilihan.map((p) => p.id)).size).toBe(a.prediksi.pilihan.length);

    // Tahap 5
    expect(a.tantangan.perintah.trim().length).toBeGreaterThan(5);

    // Tahap 6 — refleksi tidak punya jawaban benar, jadi tidak ada sesuaiId.
    expect(a.refleksi.pertanyaan).toContain("?");
    expect(a.refleksi.pilihan.length).toBeGreaterThanOrEqual(2);
    expect(new Set(a.refleksi.pilihan.map((p) => p.id)).size).toBe(a.refleksi.pilihan.length);

    // Tahap 7–8
    expect(a.penguatan.trim().length).toBeGreaterThan(25);
    expect(a.karakter.judul.trim()).not.toBe("");
    expect(a.karakter.aksi.trim().length).toBeGreaterThan(25);
  });

  it("kedelapan nama tahap terpakai — daftarnya tidak pernah menyusut diam-diam", () => {
    expect(TAHAP_INKUIRI).toHaveLength(8);
  });
});

describe("Tangga petunjuk", () => {
  it.each(SEMUA_AKTIVITAS.map((a) => [a.id, a] as const))("%s punya tiga petunjuk berjenjang", (_id, a) => {
    expect(a.tantangan.petunjuk).toHaveLength(3);
    a.tantangan.petunjuk.forEach((p) => expect(p.trim().length).toBeGreaterThan(10));
    // Berjenjang: tiap petunjuk memberi lebih banyak daripada sebelumnya.
    expect(new Set(a.tantangan.petunjuk).size).toBe(3);
  });

  it("tidak ada petunjuk yang membocorkan jawaban akhir angka", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "lab-takar" && t.kind !== "timbang") return;
      // Petunjuk terakhir boleh menunjukkan langkah, tapi tidak boleh
      // menyebut hasil akhirnya begitu saja.
      const jawab = String(t.jawaban);
      const bocor = t.petunjuk.filter((p) => new RegExp(`\\b${jawab}\\b`).test(p) && /jadi|hasilnya|jawabannya/i.test(p));
      expect(bocor, `${a.id}: petunjuk membocorkan jawaban`).toHaveLength(0);
    });
  });
});

describe("Semua spesimen benar-benar ada", () => {
  it("tidak ada id spesimen yang menunjuk gambar yang tidak ada", () => {
    const salah: string[] = [];
    const cek = (id: string, di: string) => {
      if (!isSpecimenId(id)) salah.push(`${di}: ${id}`);
    };

    SEMUA_AKTIVITAS.forEach((a) => {
      a.eksplorasi.benda.forEach((b) => cek(b.spesimen, a.id));
      a.prediksi.pilihan.forEach((p) => cek(p.spesimen, a.id));
      a.refleksi.pilihan.forEach((p) => cek(p.spesimen, a.id));

      const t = a.tantangan;
      switch (t.kind) {
        case "pola-isi":
          t.deret.forEach((d) => d !== "?" && cek(d, a.id));
          t.baki.forEach((d) => cek(d, a.id));
          t.jawaban.forEach((d) => cek(d, a.id));
          break;
        case "pola-susun":
          [...t.contoh, ...t.baki, ...t.jawaban].forEach((d) => cek(d, a.id));
          break;
        case "beda-sendiri":
          t.kisi.forEach((d) => cek(d, a.id));
          break;
        case "ingat-pola":
          [...t.urutan, ...t.baki].forEach((d) => cek(d, a.id));
          break;
        case "pilah-wadah":
          t.wadah.forEach((w) => cek(w.spesimen, a.id));
          t.benda.forEach((b) => cek(b.spesimen, a.id));
          break;
        case "urut-deret":
          t.benda.forEach((b) => cek(b.spesimen, a.id));
          break;
        case "lab-simulasi":
          t.variabel.forEach((v) => cek(v.spesimen, a.id));
          t.keadaan.forEach((k) => cek(k.spesimen, a.id));
          break;
        case "garis-bilangan":
          cek(t.spesimen, a.id);
          break;
        case "lab-takar":
          cek(t.unitSpesimen, a.id);
          t.bahan.forEach((b) => cek(b.spesimen, a.id));
          break;
        case "timbang":
          cek(t.kiri.spesimen, a.id);
          cek(t.kanan.spesimen, a.id);
          break;
      }
    });

    expect(salah).toEqual([]);
  });
});

describe("Jawaban tiap papan konsisten dengan datanya", () => {
  it("pola-isi: jumlah jawaban sama dengan jumlah lubang, dan semuanya ada di baki", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "pola-isi") return;
      const lubang = t.deret.filter((d) => d === "?").length;
      expect(lubang, `${a.id}: harus ada lubang`).toBeGreaterThan(0);
      expect(t.jawaban, `${a.id}: jawaban tidak sebanyak lubang`).toHaveLength(lubang);
      t.jawaban.forEach((j) =>
        expect(t.baki, `${a.id}: jawaban "${j}" tidak ada di baki`).toContain(j)
      );
    });
  });

  it("pola-susun: jawaban tidak kosong dan semuanya bisa diambil dari baki", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "pola-susun") return;
      expect(t.jawaban.length).toBeGreaterThan(2);
      expect(t.contoh.length).toBeGreaterThan(0);
      t.jawaban.forEach((j) => expect(t.baki, `${a.id}`).toContain(j));
    });
  });

  it("beda-sendiri: indeks yang beda ada di dalam kisi dan memang cuma satu", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "beda-sendiri") return;
      expect(t.indeksBeda).toBeGreaterThanOrEqual(0);
      expect(t.indeksBeda).toBeLessThan(t.kisi.length);
      expect(t.alasan.trim().length).toBeGreaterThan(15);
    });
  });

  it("ingat-pola: setiap kartu urutan tersedia di baki", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "ingat-pola") return;
      expect(t.urutan.length).toBeGreaterThanOrEqual(3);
      t.urutan.forEach((u) => expect(t.baki, `${a.id}`).toContain(u));
      // Terlalu cepat mustahil, terlalu lama membosankan.
      expect(t.msPerKartu).toBeGreaterThanOrEqual(500);
      expect(t.msPerKartu).toBeLessThanOrEqual(2000);
    });
  });

  it("pilah-wadah: tiap benda punya wadah yang ada, dan tiap wadah kebagian isi", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "pilah-wadah") return;
      const idWadah = t.wadah.map((w) => w.id);
      expect(new Set(idWadah).size, `${a.id}: id wadah kembar`).toBe(idWadah.length);
      expect(new Set(t.benda.map((b) => b.id)).size).toBe(t.benda.length);

      t.benda.forEach((b) =>
        expect(idWadah, `${a.id}: benda "${b.id}" menunjuk wadah yang tidak ada`).toContain(b.wadahBenar)
      );
      // Wadah kosong berarti anak tidak pernah punya alasan menyentuhnya.
      t.wadah.forEach((w) =>
        expect(
          t.benda.some((b) => b.wadahBenar === w.id),
          `${a.id}: wadah "${w.id}" tidak pernah terpakai`
        ).toBe(true)
      );
    });
  });

  it("urut-deret: nilainya berbeda semua, jadi urutannya tunggal", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "urut-deret") return;
      const nilai = t.benda.map((b) => b.nilai);
      expect(new Set(nilai).size, `${a.id}: ada nilai kembar, urutannya jadi ambigu`).toBe(nilai.length);
      expect(t.benda.length).toBeGreaterThanOrEqual(3);
      expect(t.ciri.trim()).not.toBe("");
    });
  });

  it("lab-simulasi: aturan terakhir tanpa syarat, jadi selalu ada hasil", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "lab-simulasi") return;

      const idKeadaan = t.keadaan.map((k) => k.id);
      const idVariabel = t.variabel.map((v) => v.id);

      expect(t.aturan.length).toBeGreaterThan(1);
      const terakhir = t.aturan[t.aturan.length - 1];
      expect(terakhir.syarat, `${a.id}: aturan terakhir harus tanpa syarat`).toBeUndefined();

      t.aturan.forEach((r) => {
        expect(idKeadaan, `${a.id}: aturan menunjuk keadaan yang tidak ada`).toContain(r.keadaanId);
        Object.keys(r.syarat ?? {}).forEach((k) =>
          expect(idVariabel, `${a.id}: syarat menyebut variabel "${k}" yang tidak ada`).toContain(k)
        );
      });

      // Kondisi ujian harus menyebut semua variabel — kalau tidak, tabel
      // keputusan bisa jatuh ke cabang yang salah tanpa ketahuan.
      idVariabel.forEach((v) =>
        expect(
          Object.keys(t.ujian.kondisi),
          `${a.id}: kondisi ujian tidak menyebut variabel "${v}"`
        ).toContain(v)
      );

      // Nilai awal tiap variabel harus berada di rentangnya sendiri.
      t.variabel.forEach((v) => {
        expect(v.awal).toBeGreaterThanOrEqual(v.min);
        expect(v.awal).toBeLessThanOrEqual(v.max);
      });
    });
  });

  it("lab-simulasi: kondisi ujian punya jawaban yang bisa ditemukan anak", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "lab-simulasi") return;

      // Evaluator ini sengaja ditulis ulang di sini, bukan diimpor dari
      // komponennya. Kalau papan dan uji memakai fungsi yang sama, uji
      // ini cuma membuktikan fungsi itu setuju dengan dirinya sendiri.
      const nilai = (kondisi: Record<string, number>) => {
        for (const r of t.aturan) {
          if (!r.syarat) return r.keadaanId;
          const cocok = Object.entries(r.syarat).every(([k, [lo, hi]]) => {
            const v = kondisi[k];
            return v !== undefined && v >= lo && v <= hi;
          });
          if (cocok) return r.keadaanId;
        }
        return null;
      };

      const hasil = nilai(t.ujian.kondisi);
      expect(hasil, `${a.id}: kondisi ujian tidak menghasilkan keadaan apa pun`).not.toBeNull();
      expect(t.keadaan.map((k) => k.id)).toContain(hasil);
    });
  });

  it("garis-bilangan: targetnya di luar yang sudah diamati tapi masih muat di penggaris", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "garis-bilangan") return;
      // Kalau target ≤ teramati, anak tinggal membaca — bukan memprediksi.
      expect(t.target, `${a.id}: target sudah teramati, tidak ada yang diprediksi`).toBeGreaterThan(
        t.teramati
      );
      expect(t.langkah).toBeGreaterThan(0);
      const jawab = t.mulai + t.langkah * t.target;
      expect(jawab, `${a.id}: jawabannya di luar penggaris`).toBeLessThanOrEqual(t.maks);
    });
  });

  it("lab-takar: jumlah unit yang bisa dibuat sama dengan jawaban yang ditulis", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "lab-takar") return;

      const idBahan = t.bahan.map((b) => b.id);
      t.resep.forEach((r) => {
        expect(idBahan, `${a.id}: resep menyebut bahan "${r.bahanId}" yang tidak ada`).toContain(r.bahanId);
        expect(r.jumlah, `${a.id}: takaran harus lebih dari nol`).toBeGreaterThan(0);
      });

      // Inilah pembagian yang ditemukan anak: bahan yang paling cepat habis
      // menentukan berapa unit yang jadi.
      const bisa = Math.min(
        ...t.resep.map((r) => {
          const b = t.bahan.find((x) => x.id === r.bahanId)!;
          return Math.floor(b.tersedia / r.jumlah);
        })
      );
      expect(bisa, `${a.id}: jawaban tertulis ${t.jawaban}, padahal bahannya cukup untuk ${bisa}`).toBe(
        t.jawaban
      );
      expect(t.jawaban, `${a.id}: harus bisa membuat setidaknya satu`).toBeGreaterThan(0);
    });
  });

  it("lab-takar: ada tepat satu bahan yang membatasi, supaya temuannya jelas", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "lab-takar") return;
      const sisaSesudah = t.resep.map((r) => {
        const b = t.bahan.find((x) => x.id === r.bahanId)!;
        return { id: r.bahanId, muat: Math.floor(b.tersedia / r.jumlah) };
      });
      const paling = Math.min(...sisaSesudah.map((s) => s.muat));
      const pembatas = sisaSesudah.filter((s) => s.muat === paling);
      // Boleh lebih dari satu pembatas (dua bahan habis bersamaan), tapi
      // harus ada bahan lain yang tersisa — kalau semuanya pas habis,
      // tidak ada yang bisa ditemukan.
      expect(pembatas.length, `${a.id}: tidak ada bahan pembatas`).toBeGreaterThanOrEqual(1);
    });
  });

  it("timbang: sisi kiri dan jawaban benar-benar seimbang", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      const t = a.tantangan;
      if (t.kind !== "timbang") return;
      const kiri = t.kiri.jumlah * t.kiri.satuan;
      const kanan = t.jawaban * t.kanan.satuan;
      expect(kanan, `${a.id}: ${kiri} g di kiri tidak bisa disamakan dengan ${t.jawaban} benda`).toBe(kiri);
      expect(t.jawaban).toBeGreaterThan(0);
      expect(t.kanan.satuan).toBeGreaterThan(0);
    });
  });
});

describe("Bahasa", () => {
  it("tidak ada emoji di teks yang dibaca anak", () => {
    const kotor: string[] = [];
    SEMUA_AKTIVITAS.forEach((a) => {
      semuaTeks(a).forEach((t) => {
        if (EMOJI.test(t)) kotor.push(`${a.id}: ${t}`);
      });
    });
    expect(kotor).toEqual([]);
  });

  it("tidak ada teks kosong atau placeholder yang lolos", () => {
    const kosong: string[] = [];
    SEMUA_AKTIVITAS.forEach((a) => {
      semuaTeks(a).forEach((t) => {
        if (!t || !t.trim() || /^(TODO|TBD|lorem|xxx)/i.test(t.trim())) kosong.push(`${a.id}: "${t}"`);
      });
    });
    expect(kosong).toEqual([]);
  });

  it("judulnya tidak ada yang kembar", () => {
    const judul = SEMUA_AKTIVITAS.map((a) => a.judul);
    expect(new Set(judul).size).toBe(judul.length);
  });
});

describe("Karakter peduli lingkungan", () => {
  it("tiap aktivitas menutup dengan satu tindakan nyata, bukan slogan", () => {
    SEMUA_AKTIVITAS.forEach((a) => {
      // Pemeriksaan kasar, dan memang disengaja begitu: slogan tidak
      // menyuruh siapa pun melakukan apa pun, tindakan menyuruh. Daftar
      // ini pernah menangkap dua aktivitas yang menutup dengan penjelasan
      // manis tanpa satu pun hal yang bisa dikerjakan anak sore itu.
      // Kalau menambah aktivitas dengan kata kerja baru, tambahkan di sini
      // — jangan hapus ujinya.
      const adaKerja =
        /\b(taruh|letakkan|buang|pilah|pisahkan|siram|siramkan|kumpulkan|ajak|hitung|cari|simpan|pakai|tanam|lihat|tunjukkan|bawa|beri|isi|tutup|matikan|sapu|rawat|periksa|tempel|catat|biarkan|minta|perhatikan|amati|pungut|angkat|colek|tunggu|rendam|ukur|tambahkan|aduk|tanya|kurangi|coba|pilih|tampung|jangan)/i.test(
          a.karakter.aksi
        );
      expect(adaKerja, `${a.id}: aksi karakter tidak menyuruh melakukan apa pun — "${a.karakter.aksi}"`).toBe(
        true
      );
    });
  });
});
