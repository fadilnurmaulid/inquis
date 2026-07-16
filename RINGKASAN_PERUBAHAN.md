# RINGKASAN PERUBAHAN

Perombakan INQUIS v11 → v12. Dokumen ini menjawab tiga pertanyaan: apa yang berubah, bug apa yang diperbaiki, dan gameplay apa yang baru.

Dokumen pendamping:
- **MODUL_AJAR.md** — modul ajar lengkap, disusun dari 20 aktivitas yang benar-benar terpasang
- **CATATAN_VERIFIKASI.md** — apa yang sudah diperiksa, apa yang **harus Anda jalankan sendiri**, dan peringatan migrasi basis data

---

## 1. GAMEPLAY BARU — 10 mesin permainan

Sebelumnya keempat dunia memakai tiga komponen tantangan yang sama (`magnify`, `sorting`, `predict`), hanya berganti gambar. Dunia 4 bukan permainan yang berbeda; ia Dunia 1 dengan warna lain.

Sekarang ada **sepuluh mesin permainan yang benar-benar berbeda**, tersebar di empat dunia:

| # | Mesin | Berkas | Dipakai di | Apa yang dilakukan anak |
|---|---|---|---|---|
| 1 | **Lengkapi pola** | `game/pola.tsx` | 1-1, 1-2, 3-2 | Menyeret kepingan ke lubang di deret. Kepingan salah kembali ke baki, yang benar menempel |
| 2 | **Susun pola** | `game/pola.tsx` | 1-4 | Membuat pola berulang **sendiri** dari baki kosong — produksi, bukan pengenalan |
| 3 | **Cari yang beda** | `game/pola.tsx` | 1-3, 2-5 | Menguji tiap anggota kisi terhadap satu aturan, menemukan yang menyimpang |
| 4 | **Ingat pola** | `game/pola.tsx` | 1-5 | Urutan tampil sebentar lalu hilang; anak menyusunnya ulang dari ingatan |
| 5 | **Pilah** | `game/pilah.tsx` | 2-1, 2-2, 2-4 | Menyeret benda ke wadah. **Label wadah baru muncul setelah benar** — kalau muncul duluan, tugasnya berubah jadi mencocokkan tulisan |
| 6 | **Urutkan** | `game/pilah.tsx` | 2-3 | Mengurutkan benda berdasarkan besaran tak kasatmata (lama terurai) |
| 7 | **Simulasi** | `game/prediksi.tsx` | 3-1, 3-3, 3-5, 4-4 | Menggeser tuas, mengamati akibatnya. Tombol "Aku siap menebak" **baru terbuka setelah anak mengamati ≥2 keadaan berbeda**, lalu tuas dikunci dan anak menebak keadaan yang belum pernah dicoba |
| 8 | **Garis bilangan** | `game/prediksi.tsx` | 3-4 | Menyeret penanda di garis bilangan untuk memprediksi pertumbuhan tetap |
| 9 | **Takar bahan** | `game/ilmuwan.tsx` | 4-1, 4-3, 4-5 | Menyeret bahan ke resep; stok berkurang; anak **menemukan sendiri** bahan mana yang habis lebih dulu. Itulah pembagian |
| 10 | **Timbangan** | `game/ilmuwan.tsx` | 4-2 | Menyeimbangkan dua sisi timbangan. Timbangannya benar-benar miring, maksimal ±11° |

**Resep kompos** (4-1), sesuai permintaan: **1 pot = 3 cangkang telur + 1 L air cucian beras + 200 g daun kering**.

Pembagian per dunia:

- **Dunia 1 — Pola:** 4 mesin (lengkapi, susun, cari beda, ingat)
- **Dunia 2 — Pemilahan:** 3 mesin (pilah, urutkan, cari beda)
- **Dunia 3 — Prediksi:** 3 mesin (simulasi, garis bilangan, lengkapi pola)
- **Dunia 4 — Ilmuwan Cilik:** 3 mesin (takar, timbang, simulasi)

Uji `tests/unit/game-content.test.ts` memaksa tiap dunia memakai **setidaknya dua mesin berbeda** — supaya tidak ada dunia yang jadi satu jenis diulang lima kali.

---

## 2. SIKLUS INKUIRI — sekarang ditegakkan struktur, bukan niat baik

Setiap aktivitas menempuh 8 tahap: **Tujuan → Pemantik → Eksplorasi → Prediksi → Eksperimen → Refleksi → Penguatan → Karakter**.

Yang berubah: kedelapan tahap adalah **bidang wajib** pada tipe `Aktivitas` di `lib/game/types.ts`. Aktivitas yang melewatkan satu tahap **ditolak TypeScript** sebelum sempat dijalankan. Ini bukan konvensi yang bisa lupa diikuti.

Dua keputusan desain yang penting:

1. **Eksplorasi wajib tuntas.** Tombol lanjut mati sampai anak mengetuk semua benda. Belum ada benar-salah di tahap ini.
2. **Prediksi dibuka setelah hasil, bukan sebelum.** Anak mengunci tebakan, main, lalu prediksinya dibuka dan dibandingkan. Kalau prediksi dinilai duluan, anak belajar menebak-aman. Prediksi meleset diberi bingkai sebagai temuan — dan tidak mengurangi nilai.

---

## 3. BUG YANG DIPERBAIKI

| # | Bug | Penyebab | Perbaikan |
|---|---|---|---|
| 1 | **Layar refleksi kosong sesudah papan seret** | Papan dilepas (`unmount`) saat animasi seret belum selesai, membawa serta keadaan yang belum sempat diteruskan | Papan dan umpan baliknya kini tinggal di layar "eksperimen" yang sama, di dalam satu blok ber-`key` tetap (`"eksperimen-grup"`), dan hanya berpindah kalau anak menekan tombol. `components/game/mesin.tsx` |
| 2 | **"Main lagi" tidak mereset** | Keadaan komponen bertahan; papan tetap terjawab | **Mode main:** navigasi ke `?replay=1` → sesi baru → `key={session.id}` → seluruh mesin lahir ulang. **Mode demo:** nomor putaran dinaikkan → `key={putaran}` → sama efeknya |
| 3 | **Kerangka muat tidak seukuran kartunya** | Kerangka ditulis di berkas terpisah dengan angka yang ditebak sendiri; tiap kali kartu berubah, kerangkanya tertinggal → halaman melompat saat data datang | Kartu dan kerangkanya sekarang **satu berkas, konstanta bersama** (`KULIT`, `LINGKAR`, `TINGGI_JUDUL`, `TINGGI_KETERANGAN`). Sama untuk peta dunia (`KISI`). Tidak bisa berbeda lagi |
| 4 | **Tinggi kartu tidak rata** | Kartu memakai `items-start`; tinggi mengikuti isi | Semua kisi kartu memakai `items-stretch` + `h-full`, dan tinggi judul/keterangan dikunci lewat `min-h` |
| 5 | **`computeAchievements` diimpor dari berkas yang salah** | Diimpor dari `dashboard/achievement-badge.tsx`, padahal diekspor `lib/achievements.ts` | Diperbaiki; sekarang dijaga pemeriksa impor di `tools/verify.mjs` |
| 6 | **Aturan 44px menyasar semua `<a>` dan `<button>`** | Selektor global memaksa tinggi minimum pada setiap tautan, termasuk tautan sebaris di dalam paragraf | Diganti kelas `.target-sentuh` yang dipasang sengaja, hanya pada sasaran sentuh yang sungguhan |
| 7 | **Aksi karakter 2-5 dan 3-3 cuma penjelasan** | Ditutup dengan kalimat manis tanpa satu pun hal yang bisa dikerjakan anak sore itu | Ditulis ulang jadi tindakan nyata. **Ditemukan oleh uji isi**, bukan oleh mata |
| 8 | **Riak tombol dari tengah, bukan dari jari** | Animasi generik | Riak digambar dari koordinat pointer sungguhan, diameternya dihitung agar selalu menutupi tombol dari titik mana pun. Mati kalau `prefers-reduced-motion` |
| 9 | **Warna menunjuk token yang sudah tidak ada** | `bg-inquis-grass`, `bg-inquis-sun`, `duration-fast` — token dihapus, kelasnya tertinggal → tidak menghasilkan CSS apa pun (latar transparan) | Primitif mati dihapus; sisanya ditulis ulang di sistem baru |
| 10 | **Kelas `.child-screen` tidak pernah ada** | Dipakai di layout anak, tapi tidak pernah didefinisikan di `globals.css` | Dihapus |
| 11 | **Risiko galat hidrasi dari `Math.random()`** | Pengacakan saat render berbeda antara server dan peramban | Pengacakan memakai benih tetap (`acakTetap`); posisi latar ditulis tangan, tidak diacak |

---

## 4. GURU DAN ORANG TUA — dihapus sampai ke akarnya

Bukan disembunyikan. Dihapus.

**Rute & komponen:** `app/(teacher)/`, `app/(parent)/`, `components/teacher/`, `lib/services/teacher-analytics.service.ts`

**Peran:** `UserRole` kini `"CHILD" | "ADMIN"`. Dibersihkan di `middleware.ts`, `auth.service.ts`, `auth-redirect.ts`, `role-guard.tsx`, `login-form.tsx`, `db-enums.ts`

**Basis data:** enum `Role` kehilangan `TEACHER`/`PARENT`; model `Teacher`, `Parent`, `Classroom`, `ClassEnrollment`, `ParentChild` dihapus beserta relasinya
→ **Perlu migrasi. Baca CATATAN_VERIFIKASI.md bagian 5 sebelum menjalankan apa pun.**

**Akun:** `prisma/seed.ts` dan `scripts/sync-demo-auth.ts` kini hanya menanam **rara** dan **bima** — sama persis dengan `lib/demo/accounts.ts`

**Uji:** `tests/e2e/auth.spec.ts` tidak lagi menguji rute yang sudah tidak ada; diganti uji `/admin` dan uji keterjangkauan mode demo

---

## 5. MODE DEMO — dirombak

Dua jalan, dan bedanya ditulis terang-terangan di halaman:

| Jalan | Rute | Menyimpan? |
|---|---|---|
| **Coba dulu** — tanpa masuk, 20 aktivitas semuanya terbuka | `/demo` → `/demo/peta` → `/demo/main/[id]` | Tidak |
| **Masuk sebagai anak** — akun sungguhan | `/demo` → `/play/home` | Ya |

Mesin permainannya **sama persis**. Bedanya satu prop: `simpan={null}`. Halaman demo tidak menyentuh basis data sama sekali.

Setiap halaman demo punya tombol kembali, dan halaman aktivitas demo memasang pita **"Mode coba · tidak tersimpan"** supaya tidak ada yang salah paham.

---

## 6. VISUAL — sistem "Jurnal Lapangan"

**Emoji dihapus total sebagai objek permainan.** Diganti **65 ilustrasi SVG** di `components/illustrations/specimens.tsx`, dipanggil lewat `<Specimen id="..." />`. Pemeriksa memastikan **0 emoji** tersisa di kode.

**Palet** — kertas daur ulang kehijauan, tinta botani, spesimen berwarna. Tidak ada abu-abu netral; teks gelap adalah hijau tinta (`#1E3326`).

| | |
|---|---|
| Kertas | `#EEF1E6` · `#F7F8F2` · `#E1E7D6` · `#D3DBC4` |
| Tinta | `#1E3326` · `#41604D` · `#7A8F80` · `#AEBCB1` |
| Dunia 1 | `#3E8B54` hijau daun |
| Dunia 2 | `#2F7FA6` biru langit |
| Dunia 3 | `#D9922E` oranye matahari |
| Dunia 4 | `#6B5DD3` ungu nila |

**Huruf** — Baloo 2 (judul & tombol), Plus Jakarta Sans (isi; buatan Tokotype, dirancang untuk bahasa Indonesia), IBM Plex Mono (label spesimen & angka). Ciri khas sistem ini adalah **label spesimen**: mono, huruf besar, berjarak — suara catatan lapangan.

**Logo baru** — huruf I yang sekaligus batang pohon, dengan daun dan tunas. `components/brand/logo.tsx`

**Latar alam** — `components/shared/latar-alam.tsx`. Murni CSS dan SVG sebaris: bukit berlapis, awan hanyut, daun gugur, rumput. Tanpa gambar, tanpa kanvas, tanpa skrip. Semua gerakannya dijalankan compositor peramban (hanya `transform` dan `opacity`), jadi tidak satu bingkai pun dihabiskan di utas utama — penting karena latar ini menyala di belakang papan yang sedang diseret jari anak.

**Mikro-interaksi** — hover naik, tekan turun (`shadow-tekan` masuk ke dalam), riak dari titik jari, pantulan pegas, konfeti 16 keping, spesimen mengapung, cincin berdenyut. Seluruhnya berhenti saat `prefers-reduced-motion` menyala.

---

## 7. AKSESIBILITAS

- **Setiap benda yang bisa diseret juga bisa diketuk.** Ketuk bendanya, ketuk tujuannya. Ini bukan cadangan — ini jalur setara, untuk anak yang motorik halusnya belum siap dan untuk pengguna papan tik.
- Escape membatalkan seretan.
- Toleransi seret 14 px.
- `.target-sentuh` (44 px) dipasang sengaja pada tiap sasaran sentuh.
- Kontras mengikuti WCAG AA pada teks isi.
- `prefers-reduced-motion` dihormati di seluruh aplikasi.
- Penunjuk tahap punya `aria-current` dan nama tahap yang terbaca pembaca layar.

---

## 8. SALINAN & NADA

Kalimat pemasaran dibuang. Contoh:

| Sebelum | Sesudah |
|---|---|
| "Platform pembelajaran inkuiri berbasis sains untuk anak usia 5–7 tahun…" | **"Anak bertanya, mencoba, lalu tahu."** |
| "Ups, Ada yang Salah!" | **"Ada yang tersangkut."** — "Bukan salahmu." |
| "Segera Hadir" + daftar fitur yang belum ada | Dihapus. Yang ada di halaman itu benar-benar ada |
| "Mode Demo · LIDM 2026" | **"Mode coba · tidak tersimpan"** |

Nol jejak penamaan lomba di kode aplikasi — dijaga pemeriksa.

---

## 9. KODE MATI YANG DIHAPUS

`components/activities/` (6 berkas) · `lib/activities/` (3) · `components/illustrations/nature-icons.tsx` · `components/shared/emoji-asset.tsx` · `lib/assets/emoji-map.ts` · `components/shared/inquis-logo-mark.tsx` · `components/shared/page-header.tsx` · `components/shared/error-boundary.tsx` (tidak pernah dipasang; App Router sudah punya `error.tsx`) · `components/dashboard/dashboard-error.tsx` (tidak dipakai) · `components/ui/{badge,card,avatar,progress,skeleton}.tsx` (0 pemakai, warnanya menunjuk token yang sudah tidak ada) · `tests/unit/activities.test.ts`

---

## 10. UJI

**Baru:** `tests/unit/game-content.test.ts` — menjaga isi 20 aktivitas. Bukan uji "ada 20 aktivitas", melainkan uji **aritmetika tiap papan**: kalau suatu hari `tersedia` di resep kompos diubah tanpa memperbarui `jawaban`, anak akan diberi tahu jawabannya salah padahal dia benar. Bug seperti itu tidak akan kelihatan di layar mana pun sampai ada anak yang menangis.

Uji ini sudah membuktikan gunanya: ia menangkap aksi karakter 2-5 dan 3-3 yang cuma penjelasan.

**Diperluas:** `tests/unit/types.test.ts` — pendamping dunia wajib spesimen sungguhan, warna tiap dunia wajib unik.

**Diperbarui:** `tests/e2e/auth.spec.ts` — rute guru/orang tua diganti uji `/admin` dan mode demo.

---

## 11. YANG BELUM DIVERIFIKASI

**Baca CATATAN_VERIFIKASI.md.** Ringkasnya: lingkungan kerja ini tidak punya jaringan, jadi `npm install` gagal dan **ESLint, tsc, Vitest, dan `next build` belum pernah dijalankan**. Sebagai gantinya ditulis dua pemeriksa yang berjalan tanpa dependensi (`tools/verify.mjs` dan `tools/cek-isi.mjs`), keduanya bersih. Tapi itu bukan pengganti perkakas sungguhan.

**Anda harus menjalankan sendiri:**

```bash
npm install && npx prisma generate && npm run type-check && npm run lint && npm test && npm run build
```

Kalau ada galat, kirimkan keluarannya.

---

## 12. TINJAUAN PRODUK AKHIR (putaran terakhir)

**Gameplay.** Papan "Cari yang beda" (1-3, 2-5) dulunya bisa tamat dengan satu ketukan beruntung — peluang 1/6 menang tanpa berpikir. Sekarang dua ketukan: pilih (kartu terangkat, bercincin oranye) lalu tegaskan lewat tombol "Yang ini beda!". Komitmen sebelum jawaban, konsisten dengan tahap prediksi. Ritme keempat dunia diperiksa: seret-isi (D1), pilah-multi (D2), jelajah→kunci→tebak (D3), takar-sampai-habis (D4) — tidak ada yang satu-klik-selesai lagi.

**Bug refleksi.** Akar: `AnimatePresence mode="wait"` membuat layar refleksi menunggu animasi keluar layar eksperimen yang kadang tak pernah selesai (gestur seret + animasi bersarang). Dihapus total; perpindahan layar kini keyed remount murni. `layoutId` bersama lintas layar juga dihapus.

**UX.** Umpan balik hasil digulirkan otomatis ke pandangan (di ponsel ia lahir di bawah papan, di luar layar). Mode demo diberi layar muat. Gerbang dunia di /demo/peta jadi kartu warna penuh dengan pendamping mengapung berjenjang.

**Copywriting.** Seluruh teks mesin dipangkas ke panjang aplikasi anak; teks 20 aktivitas diukur programatik — pemantik rata-rata 91 huruf (dua kalimat dibacakan), tujuh penguatan terpanjang ditinjau satu per satu dan dipertahankan karena tiap kalimatnya membawa konsep (tahap penguatan memang dibacakan bersama orang dewasa).

**Identitas.** `app/icon.svg`, `app/apple-icon.svg`, dan `app/manifest.ts` kini satu logo yang sama (I-pohon). Chrome meng-cache favicon: perlu hard refresh setelah build baru.

**Verifikasi akhir:** 5/5 pemeriksa statis lulus, 20/20 aktivitas lulus asersi isi, 0 emoji, 0 jejak lomba, 0 impor putus.
