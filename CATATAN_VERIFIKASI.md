# CATATAN VERIFIKASI

Dokumen ini jujur tentang apa yang **sudah** diperiksa dan apa yang **belum bisa** diperiksa. Bacalah sebelum mengirimkan produk ini ke mana pun.

---

## 1. Ringkasan singkat

| Pemeriksaan | Status | Dijalankan di mana |
|---|---|---|
| Galat sintaks (68 berkas) | **LULUS — 0** | Di sini, lewat parser TypeScript |
| Impor yang menunjuk berkas/ekspor tidak ada | **LULUS — 0** | Di sini |
| Tautan `<Link>` ke rute yang tidak ada | **LULUS — 0** | Di sini |
| Emoji tersisa di kode | **LULUS — 0** | Di sini |
| Jejak penamaan lomba di kode aplikasi | **LULUS — 0** | Di sini |
| Keutuhan isi 20 aktivitas (8 tahap, aritmetika tiap papan) | **LULUS** | Di sini, lewat transpilasi langsung |
| `npm run lint` (ESLint) | **BELUM DIJALANKAN** | Harus di komputer Anda |
| `npm run type-check` (tsc) | **BELUM DIJALANKAN** | Harus di komputer Anda |
| `npm test` (Vitest) | **BELUM DIJALANKAN** | Harus di komputer Anda |
| `npm run build` (Next.js + Prisma) | **BELUM DIJALANKAN** | Harus di komputer Anda |
| `npm run test:e2e` (Playwright) | **BELUM DIJALANKAN** | Harus di komputer Anda |

---

## 2. Kenapa empat perintah itu belum dijalankan

Lingkungan tempat perombakan ini dikerjakan **tidak punya akses jaringan**. Akibatnya `npm install` gagal, dan tanpa `node_modules`:

- **ESLint** tidak bisa jalan — `next lint` butuh paket `eslint-config-next`.
- **tsc** tidak bisa memeriksa tipe dengan benar — semua `@types/*`, tipe React, tipe Next.js, dan `@prisma/client` tidak ada. Menjalankannya tanpa itu hanya akan memuntahkan ratusan galat palsu "cannot find module", bukan galat yang sebenarnya.
- **Vitest** tidak terpasang.
- **`next build`** butuh `prisma generate` lebih dulu, dan biner Prisma diunduh saat pemasangan.

Menyatakan "build lolos" tanpa benar-benar menjalankannya adalah kebohongan. Karena itu status di atas ditulis apa adanya.

---

## 3. Apa yang dipakai sebagai gantinya

Dua perkakas ditulis khusus, keduanya berjalan tanpa dependensi apa pun:

### `tools/verify.mjs` — pemeriksa statis

```bash
node tools/verify.mjs
```

Memakai kompiler TypeScript (satu-satunya paket yang tersedia global) untuk mem-parsing **setiap** berkas `.ts`/`.tsx` di `app/`, `components/`, `lib/`, `types/`, `tests/`, `prisma/`, dan `scripts/`, lalu memeriksa lima hal:

1. **Sintaks** — tiap berkas benar-benar bisa di-parse.
2. **Impor** — tiap `import` menunjuk berkas yang ada, **dan** simbol yang diimpor benar-benar diekspor berkas itu. Inilah yang menangkap `computeAchievements` yang salah alamat dan sembilan impor yatim setelah komponen lama dihapus.
3. **Rute** — tiap `<Link href="...">` internal menunjuk rute yang benar-benar terdaftar di App Router.
4. **Emoji** — nol emoji tersisa di seluruh kode.
5. **Kata terlarang** — nol jejak penamaan lomba.

Ini **bukan** pengganti `tsc`. Perkakas ini tidak memeriksa tipe: kalau sebuah `props` salah bentuk, ia tidak akan tahu. Ia hanya memastikan tidak ada berkas rusak dan tidak ada tautan menggantung.

### `tools/cek-isi.mjs` — pemeriksa isi

```bash
node tools/cek-isi.mjs
```

Mentranspilasi `lib/game/content.ts` lalu memeriksa datanya langsung. Ini menjalankan asersi yang sama dengan `tests/unit/game-content.test.ts`, tapi tanpa Vitest. Yang diperiksa antara lain:

- 20 aktivitas, 5 per dunia, bernomor 1..5 tanpa lompatan.
- Kesepuluh mesin permainan benar-benar terpakai; tiap dunia mencampur setidaknya dua.
- Kedelapan tahap inkuiri terisi dan tidak ada yang cuma placeholder.
- Tiap aktivitas punya tiga petunjuk yang berbeda-beda.
- **Aritmetika tiap papan:**
  - `lab-takar` — jumlah unit yang bisa dibuat, dihitung ulang dari `tersedia ÷ jumlah`, harus sama dengan `jawaban` yang ditulis.
  - `timbang` — `kiri.jumlah × kiri.satuan` harus sama persis dengan `jawaban × kanan.satuan`.
  - `garis-bilangan` — target harus di luar yang sudah teramati (kalau tidak, anak cuma membaca, bukan memprediksi), dan jawabannya harus muat di penggaris.
  - `lab-simulasi` — aturan terakhir wajib tanpa syarat, kondisi ujian wajib menyebut semua variabel, dan kondisi ujian harus benar-benar menghasilkan sebuah keadaan.
  - `pilah-wadah` — tiap benda menunjuk wadah yang ada, dan tiap wadah kebagian isi.
  - `pola-isi` — jumlah jawaban harus sama dengan jumlah lubang, dan semuanya ada di baki.

**Uji ini menangkap dua bug nyata** saat dijalankan pertama kali: aktivitas 2-5 dan 3-3 menutup dengan penjelasan manis tanpa satu pun hal yang bisa dikerjakan anak sore itu. Keduanya sudah diperbaiki di `lib/game/content.ts`.

---

## 4. Yang harus Anda jalankan di komputer sendiri

Berurutan, dan **jangan lewati satu pun**:

```bash
# 1. Pasang dependensi
npm install

# 2. Buat klien Prisma  (WAJIB — skema berubah, lihat bagian 5)
npx prisma generate

# 3. Periksa tipe
npm run type-check

# 4. Periksa gaya kode
npm run lint

# 5. Jalankan uji unit
npm test

# 6. Bangun produksi
npm run build

# 7. Jalankan
npm run dev
```

### Kalau langkah 3 atau 4 menemukan galat

Sangat mungkin ada. Kode ini ditulis tanpa bisa dijalankan tsc, jadi kesalahan tipe kecil bisa lolos. Yang paling mungkin muncul:

- **Tipe hasil kueri Prisma.** Beberapa `.map()` dan `.filter()` atas hasil Prisma diberi anotasi tipe manual karena `@prisma/client` tidak ada di sini. Setelah `prisma generate`, anotasi itu mungkin perlu dilonggarkan atau dihapus.
- **`prisma/seed.ts`** diawali `// @ts-nocheck` — memang begitu dari awal, dipertahankan.

Kalau ada galat, kirimkan keluarannya; itu jauh lebih cepat diperbaiki daripada ditebak.

---

## 5. PERHATIAN — skema basis data berubah

`prisma/schema.prisma` **berubah**. Yang dihapus:

- Nilai enum `Role.TEACHER` dan `Role.PARENT` (tersisa `CHILD` dan `ADMIN`).
- Model `Teacher`, `Parent`, `Classroom`, `ClassEnrollment`, `ParentChild`.
- Relasi `User.teacher`, `User.parent`, `Child.parents`, `Child.classEnrollments`.

Ini konsekuensi langsung dari permintaan menghapus jalur guru dan orang tua. Setelah `prisma generate`, Anda perlu memigrasikan basis datanya:

```bash
# Untuk basis data pengembangan yang isinya boleh hilang:
npx prisma db push --force-reset
npm run db:seed
npm run demo:sync
```

```bash
# Untuk basis data yang datanya ingin dipertahankan, buat migrasi:
npx prisma migrate dev --name hapus-guru-dan-orang-tua
```

Migrasi ini **akan menghapus tabel** `teachers`, `parents`, `classrooms`, `class_enrollments`, dan `parent_children` beserta isinya. Kalau ada data di sana yang masih Anda butuhkan, cadangkan dulu.

---

## 6. Akun uji coba

Tiga berkas harus selalu menyebut anak yang sama. Kalau salah satu berbeda, tombol "Masuk sebagai anak" akan menunjuk akun yang tidak ada:

| Berkas | Isinya |
|---|---|
| `lib/demo/accounts.ts` | Yang ditampilkan di tombol |
| `prisma/seed.ts` | Yang ditanam di basis data |
| `scripts/sync-demo-auth.ts` | Yang dibuat di Supabase Auth |

Ketiganya sekarang berisi **rara@inquis.app** dan **bima@inquis.app** saja, kata sandi `Demo2026!`.

---

## 7. Yang tidak bisa diperiksa perkakas mana pun

Hal-hal berikut hanya bisa dipastikan dengan **membuka aplikasinya di peramban**:

1. **Perataan dan tinggi kartu.** Kartu dunia dan kerangka muatnya sekarang berbagi konstanta di satu berkas (`components/dashboard/world-card.tsx`), jadi keduanya tidak bisa berbeda lagi. Tapi hanya mata yang bisa memastikan hasilnya benar-benar tidak melompat.
2. **Rasa gerakan.** Riak tombol, pantulan, konfeti, daun gugur — semuanya perlu dirasakan, bukan dibaca.
3. **Seret di layar sentuh.** Diuji secara logika, tapi jari anak umur enam adalah penguji terbaik.
4. **Huruf Google Fonts.** `next/font/google` mengunduh huruf saat build. Belum pernah diunduh di sini.
5. **Bug refleksi kosong sesudah seret.** Perbaikannya struktural (papan dan umpan balik tinggal di satu blok ber-`key` tetap dan tidak pernah dilepas di tengah animasi), tapi konfirmasinya harus dengan menyeret sungguhan.
6. **"Main lagi" mereset penuh.** Mode main lewat `?replay=1` + `key={session.id}`; mode demo lewat penambahan nomor putaran. Perlu ditekan sungguhan.

---

## 8. Daftar periksa sebelum mengirim

- [ ] `npm install` berhasil
- [ ] `npx prisma generate` berhasil
- [ ] `npm run type-check` — 0 galat
- [ ] `npm run lint` — 0 galat
- [ ] `npm test` — semua lulus
- [ ] `npm run build` — berhasil
- [ ] Buka `/` — halaman depan tampil, tidak ada teks penamaan lomba
- [ ] Buka `/demo` → "Mulai coba" → mainkan satu aktivitas sampai penutup
- [ ] Tekan "Main lagi" — papan benar-benar kosong lagi
- [ ] Masuk sebagai rara@inquis.app — peta dunia tampil dengan kemajuan
- [ ] Mainkan satu aktivitas sampai selesai — kemajuannya bertambah
- [ ] Seret sesuatu di papan, selesaikan — layar refleksi **tidak kosong**
- [ ] Buka di ponsel — tombol cukup besar, tidak ada yang terpotong
- [ ] Nyalakan "kurangi gerakan" di sistem — animasi berhenti, aplikasi tetap bisa dipakai

---

## 9. Catatan kecil

- **`.kiro/`** masih berisi dokumen spesifikasi lama, termasuk `steering/lidm-2026.md` dan `specs/teacher-panel/`. Isinya sudah tidak menggambarkan produk ini lagi. Direktori itu perkakas internal Anda, bukan bagian produk, jadi dibiarkan apa adanya — tapi sebaiknya dirapikan atau dikeluarkan dari paket kiriman.
- **`package.json`** tidak diubah. Beberapa dependensi Radix kini tidak terpakai lagi karena primitif `avatar`, `progress`, `card`, `badge`, dan `skeleton` sudah dihapus (tidak ada yang memakainya, dan warnanya menunjuk token yang sudah tidak ada). Menghapus dependensinya aman tapi tidak mendesak.
- **`tools/`** berisi kedua perkakas di atas. Boleh ikut dikirim (bermanfaat), boleh dihapus.
