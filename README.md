# INQUIS — Little Pattern Explorer

Media pembelajaran digital berbasis *mathematical inquiry* terintegrasi pendidikan karakter peduli lingkungan, untuk anak usia 5–7 tahun.

Anak bertanya, mencoba, lalu tahu. Dua puluh aktivitas matematika yang dimainkan — bukan dibaca.

---

## Mulai

```bash
npm install
npx prisma generate        # WAJIB — skema berubah, baca CATATAN_VERIFIKASI.md bagian 5
npx prisma db push
npm run db:seed
npm run demo:sync          # membuat akun uji coba di Supabase Auth
npm run dev
```

Buka `http://localhost:3000`, lalu tekan **Coba sekarang**.

Akun uji coba (kata sandi `Demo2026!`):
- `rara@inquis.app` — Dunia 1 tuntas, sekarang di Dunia 2
- `bima@inquis.app` — baru mulai

---

## Isi

| | |
|---|---|
| **4 dunia** | Pola · Pemilahan · Prediksi · Ilmuwan Cilik |
| **20 aktivitas** | 5 per dunia |
| **10 mesin permainan** | Tiap dunia punya cara mainnya sendiri |
| **8 tahap inkuiri** | Wajib, ditegakkan tipe data — tidak bisa dilompati |

---

## Struktur

```
app/
  (child)/play/          Area anak — perlu masuk, kemajuan tersimpan
  demo/                  Mode coba — tanpa masuk, tidak tersimpan
components/
  game/                  Mesin aktivitas + 10 papan permainan
  illustrations/         65 spesimen SVG (pengganti emoji)
  brand/                 Logo
  dashboard/             Kartu dunia, peta, capaian, navigasi
  shared/                Latar alam, layar muat
lib/
  game/types.ts          Model data — 8 tahap wajib di sini
  game/content.ts        20 aktivitas, data murni
  services/              Prisma, autentikasi, kemajuan, penilaian
tools/
  verify.mjs             Pemeriksa statis (jalan tanpa npm install)
  cek-isi.mjs            Pemeriksa isi 20 aktivitas
```

---

## Perintah

```bash
npm run dev           # jalankan
npm run build         # bangun produksi
npm run type-check    # periksa tipe
npm run lint          # periksa gaya kode
npm test              # uji unit
npm run test:e2e      # uji ujung-ke-ujung

node tools/verify.mjs   # pemeriksa statis, tanpa dependensi
node tools/cek-isi.mjs  # pemeriksa isi, tanpa dependensi
```

---

## Dokumen

- **MODUL_AJAR.md** — modul ajar lengkap (identitas, tujuan, kegiatan, asesmen, LKPD, glosarium, pustaka)
- **RINGKASAN_PERUBAHAN.md** — apa yang berubah, bug yang diperbaiki, gameplay baru
- **CATATAN_VERIFIKASI.md** — **baca sebelum menjalankan apa pun.** Berisi peringatan migrasi basis data

---

## Cara menambah aktivitas

1. Tambahkan objek `Aktivitas` di `lib/game/content.ts`.
2. TypeScript akan menolak kalau ada satu saja dari 8 tahap yang belum diisi.
3. `node tools/cek-isi.mjs` akan menolak kalau jawabannya tidak konsisten dengan datanya.

Konten adalah data, bukan komponen. Tidak perlu menyentuh React untuk menambah aktivitas.
