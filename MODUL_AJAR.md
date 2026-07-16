# MODUL AJAR

## Little Pattern Explorer

**Media Pembelajaran Digital Berbasis *Mathematical Inquiry* Terintegrasi Pendidikan Karakter Peduli Lingkungan bagi Anak Usia 5–7 Tahun**

---

## A. IDENTITAS MODUL

| | |
|---|---|
| **Nama media** | INQUIS — Little Pattern Explorer |
| **Jenjang** | PAUD (TK B) – SD Kelas 1 |
| **Usia sasaran** | 5–7 tahun |
| **Fase** | Fondasi – Fase A |
| **Mata pelajaran** | Matematika (terintegrasi Pendidikan Karakter Peduli Lingkungan) |
| **Alokasi waktu** | 20 aktivitas × ±10 menit · 4 dunia · dapat ditempuh 4–8 pertemuan |
| **Model pembelajaran** | *Mathematical Inquiry* (inkuiri matematis) — siklus 8 tahap |
| **Moda** | Digital, dimainkan mandiri oleh anak; dapat didampingi guru/orang tua |
| **Perangkat** | Peramban modern di ponsel, tablet, atau komputer |

---

## B. KOMPETENSI AWAL

Anak sudah dapat:

1. Membilang 1–10 secara lisan.
2. Mengenali warna dan bentuk dasar (bulat, lonjong, panjang, pendek).
3. Mengoperasikan sentuh, ketuk, dan seret pada layar.

**Tidak** diperlukan kemampuan membaca lancar. Seluruh instruksi ditulis pendek, disertai gambar, dan setiap benda yang dapat diseret juga dapat diketuk.

---

## C. PROFIL PELAJAR PANCASILA

| Dimensi | Diwujudkan melalui |
|---|---|
| **Bernalar kritis** | Anak mengunci prediksinya **sebelum** percobaan. Sesudah hasil keluar, prediksi tadi dibuka kembali dan dibandingkan. Prediksi yang meleset diberi bingkai sebagai temuan, bukan kegagalan. |
| **Mandiri** | Petunjuk berjenjang tiga tingkat, dan tidak satu pun menyebutkan jawaban akhir. Banyaknya petunjuk yang dipakai dicatat sebagai indeks kemandirian. |
| **Kreatif** | Pada Dunia 3, anak bebas menggeser tuas sesukanya sebelum diminta menebak. Pada Aktivitas 1-4, anak menyusun polanya sendiri — bukan menyalin. |
| **Peduli lingkungan** | Bahan hitungannya adalah kompos, sampah, air, dan tanaman. Setiap aktivitas ditutup satu tindakan nyata berskala rumah tangga. |

---

## D. SARANA DAN PRASARANA

- Perangkat dengan peramban modern (Chrome, Safari, Edge, Firefox).
- Koneksi internet untuk memuat halaman.
- **Opsional, untuk kegiatan luring lanjutan:** daun kering, cangkang telur, air cucian beras, ember bekas, gelas ukur/gelas plastik, penggaris, kacang hijau, kapas.

---

## E. TARGET PESERTA DIDIK

- Anak reguler usia 5–7 tahun.
- Anak yang belum lancar membaca — seluruh teks pendek dan berpasangan dengan gambar.
- Anak dengan hambatan motorik halus — setiap benda yang dapat diseret **juga** dapat diketuk dua kali (pilih, lalu pilih tujuannya).
- Anak yang sensitif terhadap gerakan — seluruh animasi berhenti bila peramban menyalakan `prefers-reduced-motion`.

---

## F. TUJUAN PEMBELAJARAN

Setelah menuntaskan keempat dunia, anak dapat:

1. **Mengenali dan melanjutkan pola berulang** dari benda alam (Dunia 1).
2. **Mengelompokkan benda berdasarkan satu atau dua atribut** yang ia tentukan sendiri (Dunia 2).
3. **Mengurutkan benda** berdasarkan besaran yang tidak terlihat langsung, misalnya lama terurai (Dunia 2).
4. **Memprediksi hasil** dari suatu perubahan berdasarkan pengamatan sebelumnya (Dunia 3).
5. **Membaca dan melanjutkan pertumbuhan tetap** pada garis bilangan (Dunia 3).
6. **Membagi dan menakar** untuk menemukan bahan yang paling cepat habis (Dunia 4).
7. **Menyetarakan dua sisi timbangan** sebagai pengalaman awal kesamaan (Dunia 4).
8. **Melakukan satu tindakan nyata** menjaga lingkungan setelah setiap aktivitas.

---

## G. PEMAHAMAN BERMAKNA

> Matematika bukan aturan yang harus dihafal, melainkan cara melihat yang membuat dunia lebih mudah ditebak.

Anak yang mengetahui bahwa daun tersusun berselang-seling dapat menebak daun berikutnya. Anak yang mengetahui satu pot kompos memerlukan tiga cangkang telur dapat menghitung sendiri berapa pot yang jadi dari sembilan cangkang. Kedua hal itu matematika, dan keduanya berguna sore itu juga.

---

## H. PERTANYAAN PEMANTIK

Setiap aktivitas dibuka satu pertanyaan terbuka yang **belum ada jawabannya**. Contoh yang terpasang:

| Aktivitas | Pertanyaan pemantik |
|---|---|
| 1-1 Ranting Berpola | Kalau ranting ini terus tumbuh, daun apa yang muncul berikutnya? |
| 2-3 Siapa Paling Cepat Hilang? | Kalau semuanya dikubur hari ini, mana yang paling dulu hilang? |
| 3-1 Berapa Gelas Cukup? | Tanaman butuh air. Tapi berapa banyak yang cukup? |
| 4-1 Kompos untuk Pot Budi | Bahan Budi segini. Cukup untuk berapa pot? |

Pertanyaan pemantik **tidak** dijawab di layar itu. Anak diajak mengamati dulu.

---

## I. STRUKTUR: SIKLUS INKUIRI 8 TAHAP

Setiap aktivitas — tanpa kecuali — menempuh urutan berikut. Urutan ini **tidak dapat dilompati**: kedelapan tahap adalah bidang wajib pada tipe data `Aktivitas` (`lib/game/types.ts`), sehingga aktivitas yang melewatkan satu tahap ditolak kompiler sebelum sempat dijalankan.

| # | Tahap | Yang terjadi | Peran guru |
|---|---|---|---|
| 1 | **Tujuan** | Ditulis dari sisi anak: "Kamu akan…" | Bacakan bila anak belum lancar membaca |
| 2 | **Pertanyaan pemantik** | Satu pertanyaan terbuka, belum dijawab | Tahan diri untuk tidak menjawab |
| 3 | **Eksplorasi** | Anak mengetuk 3–4 benda dan membaca catatannya. Belum ada benar-salah | Biarkan anak mengetuk berulang |
| 4 | **Prediksi** | Anak memilih satu tebakan dan **menguncinya**. Tidak diberi umpan balik | Tegaskan: menebak salah itu boleh |
| 5 | **Eksperimen** | Papan permainan. Di sinilah tebakan diuji | Jangan tunjukkan jawaban; gunakan tombol petunjuk |
| 6 | **Refleksi** | Anak menceritakan caranya berpikir. Tidak ada jawaban salah | Tanyakan lagi secara lisan: "kok tahu?" |
| 7 | **Penguatan konsep** | Baru di sini matematikanya diberi nama | Ulangi istilahnya dengan bahasa sendiri |
| 8 | **Peduli lingkungan** | Satu tindakan nyata untuk hari itu | Tindak lanjuti di rumah/sekolah |

**Catatan penting:** prediksi anak baru dibuka **setelah** hasil percobaan keluar — bukan sebelumnya. Ini disengaja. Kalau prediksi dinilai lebih dulu, anak belajar menebak-aman; kalau dibuka sesudahnya, anak melihat sendiri hubungan antara dugaan dan bukti.

---

## J. KEGIATAN PEMBELAJARAN

### Pertemuan 1 — Dunia 1: Penjelajah Pola Alam

**Pendamping:** Kupi (kupu-kupu) · **Warna:** hijau daun · **Kompetensi utama:** mengamati

| No | Judul | Mesin permainan | Fokus matematis |
|---|---|---|---|
| 1-1 | Ranting Berpola | Lengkapi pola | Menemukan satuan pola berulang (AB, ABC) |
| 1-2 | Dua Lubang di Kebun Bunga | Lengkapi pola | Menerapkan satuan pola pada dua posisi tak berurutan |
| 1-3 | Jejak di Tanah Basah | Cari yang beda | Menguji anggota kelompok terhadap satu aturan |
| 1-4 | Kalung Daun Buatanmu | Susun pola | Menghasilkan pola sendiri (produksi, bukan pengenalan) |
| 1-5 | Kupu-kupu Lewat Sebentar | Ingat pola | Memori urutan; pola sebagai alat bantu ingat |

**Alur 10 menit:**
1. *Pembukaan (1')* — Guru membacakan pertanyaan pemantik. **Tidak menjawab.**
2. *Inti (7')* — Anak menempuh eksplorasi → prediksi → eksperimen → refleksi secara mandiri.
3. *Penutup (2')* — Guru membacakan penguatan konsep, lalu membacakan ajakan peduli lingkungan dan menyepakati kapan akan dikerjakan.

---

### Pertemuan 2 — Dunia 2: Penjelajah Pemilahan

**Pendamping:** Kura (kura-kura) · **Warna:** biru langit · **Kompetensi utama:** mengamati, bertanya

| No | Judul | Mesin permainan | Fokus matematis |
|---|---|---|---|
| 2-1 | Dua Keranjang | Pilah | Klasifikasi satu atribut |
| 2-2 | Tiga Keranjang di Sekolah | Pilah | Klasifikasi dua atribut sekaligus |
| 2-3 | Siapa Paling Cepat Hilang? | Urutkan | Mengurutkan besaran tak kasatmata (lama terurai) |
| 2-4 | Pulangkan ke Rumahnya | Pilah | Klasifikasi berdasarkan habitat |
| 2-5 | Yang Tidak Pernah Bernapas | Cari yang beda | Menguji atribut "hidup" pada suatu himpunan |

**Catatan pedagogis:** pada aktivitas Pilah, label wadah **baru muncul setelah** anak menempatkan benda dengan benar. Bila label ditampilkan lebih dulu, tugasnya berubah menjadi mencocokkan tulisan, bukan mengelompokkan.

---

### Pertemuan 3 — Dunia 3: Penjelajah Prediksi Alam

**Pendamping:** Ciap (burung) · **Warna:** oranye matahari · **Kompetensi utama:** memprediksi

| No | Judul | Mesin permainan | Fokus matematis |
|---|---|---|---|
| 3-1 | Berapa Gelas Cukup? | Simulasi | Hubungan sebab-akibat satu variabel |
| 3-2 | Catatan Cuaca Seminggu | Lengkapi pola | Pola sebagai dasar prediksi data |
| 3-3 | Sungai dan Penghuninya | Simulasi | Menemukan ambang batas |
| 3-4 | Kecambah di Penggaris | Garis bilangan | Pertumbuhan tetap; ekstrapolasi pada garis bilangan |
| 3-5 | Dua Tuas Sekaligus | Simulasi | Dua variabel bekerja bersamaan |

**Cara kerja laboratorium simulasi:** anak menggeser tuas dan mengamati hasilnya. Tombol **"Aku siap menebak"** baru terbuka setelah anak mengamati **sedikitnya dua keadaan berbeda**. Ini memaksa eksplorasi mendahului prediksi — persis yang dituntut metode inkuiri. Setelah tombol ditekan, tuas dikunci dan anak harus menebak keadaan yang **belum pernah** ia coba.

---

### Pertemuan 4 — Dunia 4: Ilmuwan Cilik Peduli Bumi

**Pendamping:** Lebi (lebah) · **Warna:** ungu nila · **Kompetensi utama:** menyimpulkan

| No | Judul | Mesin permainan | Fokus matematis |
|---|---|---|---|
| 4-1 | Kompos untuk Pot Budi | Takar bahan | Pembagian; menemukan bahan pembatas |
| 4-2 | Timbangan Kompos | Timbangan | Kesamaan dua sisi; satuan berat |
| 4-3 | Pupuk Cair dari Kulit Pisang | Takar bahan | Pembagian dengan resep berbeda |
| 4-4 | Bak Kompos yang Pas | Simulasi | Perbandingan dua bahan |
| 4-5 | Bedeng Kebun Sekolah | Takar bahan | Sintesis seluruh kompetensi |

**Resep kompos yang dipakai (Aktivitas 4-1):**

> **1 pot kompos = 3 cangkang telur + 1 liter air cucian beras + 200 g daun kering**

Anak menyeret bahan, stoknya berkurang, lalu ia menemukan sendiri bahwa **satu bahan habis lebih dulu daripada yang lain** — dan bahan itulah yang menentukan berapa pot yang jadi. Inilah pembagian, ditemukan lewat tangan sebelum diberi nama.

---

## K. ASESMEN

### 1. Asesmen formatif (otomatis, berjalan di dalam media)

| Yang direkam | Cara membacanya |
|---|---|
| **Indeks kemandirian** | 1,0 bila selesai tanpa petunjuk; 0,7 bila memakai petunjuk. Turun berarti anak butuh pendampingan lebih, **bukan** berarti anak kurang mampu |
| **Prediksi vs hasil** | Prediksi yang meleset **tidak** mengurangi nilai. Yang dinilai adalah anak mau menebak |
| **Jawaban refleksi** | Disimpan sebagai teks. Inilah data paling berharga bagi guru |
| **Skor lima kompetensi** | Amati, Tanya, Prediksi, Jelajahi, Simpulkan |

**Penting:** pengulangan aktivitas lewat tombol **"Main lagi"** **tidak pernah** dinilai dan tidak pernah membuka dunia baru. Hanya percobaan pertama yang dihitung (`isFirstAttempt`). Anak bebas bermain ulang sebanyak apa pun tanpa risiko merusak catatannya.

### 2. Asesmen sumatif (luring, oleh guru)

| Kriteria | Berkembang | Sesuai harapan | Melampaui |
|---|---|---|---|
| Mengenali pola | Melanjutkan pola AB dengan bantuan | Melanjutkan pola ABC mandiri | Membuat pola sendiri dan menjelaskan aturannya |
| Mengelompokkan | Mengelompokkan dengan 1 atribut | Mengelompokkan dengan 2 atribut | Mengusulkan atribut pengelompokan sendiri |
| Memprediksi | Menebak tanpa alasan | Menebak dan menyebut alasannya | Menebak, beralasan, lalu menguji sendiri |
| Menakar/membagi | Menghitung dengan bantuan | Menemukan bahan pembatas | Menjelaskan mengapa bahan itu yang membatasi |
| Peduli lingkungan | Menyebutkan tindakannya | Melakukan tindakannya | Mengajak orang lain melakukan |

### 3. Rubrik refleksi lisan

Setelah anak menyelesaikan satu aktivitas, tanyakan:

1. "Tadi kamu menebak apa?"
2. "Ternyata bagaimana?"
3. "Kok kamu tahu?"

Pertanyaan ketiga yang paling penting. Anak yang dapat menjawabnya sedang **bernalar**, bukan mengingat.

---

## L. PENGAYAAN

Untuk anak yang sudah tuntas keempat dunia:

1. **Kompos sungguhan.** Praktikkan resep 4-1 dengan bahan nyata. Ember bekas cat yang dilubangi bawahnya sudah cukup.
2. **Jurnal kecambah.** Rendam kacang hijau semalam, taruh di kapas basah, ukur tiap hari dengan penggaris selama seminggu. Bandingkan dengan Aktivitas 3-4.
3. **Pencatat hujan.** Taruh gelas kosong di halaman. Ukur tinggi airnya tiap hari, catat selama seminggu. Bandingkan dengan Aktivitas 3-2.
4. **Buat polamu sendiri.** Kumpulkan daun gugur, susun pola berulang di atas kertas, lalu minta teman menebak lanjutannya.

---

## M. REMEDIAL

| Kesulitan yang tampak | Penanganan |
|---|---|
| Anak tidak melanjutkan pola | Kembali ke 1-1. Susun pola dengan benda nyata (sendok–garpu–sendok–garpu) sebelum kembali ke layar |
| Anak menebak asal | Wajar dan tidak apa-apa. Tanyakan lisan: "kenapa pilih itu?" Alasan apa pun diterima. Yang dilatih adalah kebiasaan beralasan |
| Anak selalu memakai ketiga petunjuk | Bukan masalah nilai. Dampingi satu aktivitas penuh sambil bertanya, bukan memberi tahu |
| Anak frustrasi di Dunia 4 | Dunia 4 memang paling berat. Kerjakan 4-1 bersama-sama dengan bahan nyata di meja, baru kembali ke layar |
| Anak tidak dapat menyeret | Beri tahu bahwa setiap benda **juga** bisa diketuk: ketuk bendanya, lalu ketuk tujuannya |

---

## N. LKPD (Lembar Kerja Peserta Didik) — Luring

### LKPD 1 · Pola di Sekitarku (setelah Dunia 1)

> Cari **tiga** pola berulang di rumah atau sekolahmu. Gambar di kotak.
> Contoh: ubin lantai, pagar, kancing baju.
>
> ☐ Pola 1: ______________________
> ☐ Pola 2: ______________________
> ☐ Pola 3: ______________________
>
> Pertanyaan: pola mana yang paling mudah ditebak lanjutannya? Kenapa?

### LKPD 2 · Isi Keranjangku (setelah Dunia 2)

> Selama **satu hari**, catat sampah yang kamu buang.
>
> | Yang kubuang | Masuk keranjang mana? |
> |---|---|
> | | |
> | | |
> | | |
>
> Pertanyaan: keranjang mana yang paling penuh? Bisakah dikurangi satu barang besok?

### LKPD 3 · Buku Cuaca (setelah Dunia 3)

> Taruh gelas kosong di halaman. Isi tabel ini selama satu minggu.
>
> | Hari | Cuaca | Tinggi air (cm) |
> |---|---|---|
> | Senin | | |
> | Selasa | | |
> | … | | |
>
> Pertanyaan: menurutmu besok hujan atau tidak? Kenapa kamu berpikir begitu?

### LKPD 4 · Kompos Pertamaku (setelah Dunia 4)

> Kumpulkan bahan berikut, lalu hitung.
>
> | Bahan | Yang kupunya | Perlu untuk 1 pot | Cukup untuk berapa pot? |
> |---|---|---|---|
> | Cangkang telur | ____ butir | 3 butir | ____ |
> | Air cucian beras | ____ liter | 1 liter | ____ |
> | Daun kering | ____ gram | 200 gram | ____ |
>
> **Jadi aku bisa membuat ____ pot.**
>
> Pertanyaan: bahan mana yang habis paling dulu? Kalau bahan itu ditambah, apa yang terjadi?

---

## O. GLOSARIUM

| Istilah | Arti untuk anak |
|---|---|
| **Pola** | Bagian yang berulang terus-menerus |
| **Satuan pola** | Potongan terkecil yang diulang |
| **Prediksi** | Tebakan yang punya alasan |
| **Mengelompokkan** | Menaruh yang mirip di tempat yang sama |
| **Atribut** | Ciri suatu benda: warna, bentuk, ukuran |
| **Mengurutkan** | Menyusun dari paling sedikit ke paling banyak |
| **Menakar** | Mengukur banyaknya bahan |
| **Bahan pembatas** | Bahan yang habis paling dulu, sehingga membatasi berapa yang bisa dibuat |
| **Seimbang** | Dua sisi timbangan sama berat |
| **Kompos** | Pupuk dari sisa daun dan sayur yang membusuk |
| **Terurai** | Hancur pelan-pelan menyatu dengan tanah |

---

## P. GLOSARIUM UNTUK GURU

| Istilah | Arti |
|---|---|
| ***Mathematical Inquiry*** | Pendekatan pembelajaran matematika yang memulai dari pertanyaan dan penyelidikan, bukan dari aturan lalu latihan |
| **Siklus inkuiri** | Urutan tahap yang ditempuh anak dari bertanya sampai menyimpulkan |
| **Indeks kemandirian** | Ukuran seberapa sedikit bantuan yang dibutuhkan anak untuk menyelesaikan tugas |
| ***Scaffolding*** | Bantuan berjenjang yang ditarik sedikit demi sedikit seiring anak menguasai tugasnya |
| **Bahan pembatas** (*limiting reagent*) | Konsep kimia yang di sini diperkenalkan lewat pengalaman: bahan yang paling cepat habis menentukan hasil akhir |
| **Prediksi terkunci** | Prediksi yang direkam sebelum percobaan sehingga tidak dapat direvisi setelah melihat hasil |

---

## Q. DAFTAR PUSTAKA

1. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2022). *Capaian Pembelajaran Fase Fondasi dan Fase A*. Jakarta: Kemendikbudristek.
2. Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2022). *Dimensi, Elemen, dan Subelemen Profil Pelajar Pancasila pada Kurikulum Merdeka*. Jakarta: Badan Standar, Kurikulum, dan Asesmen Pendidikan.
3. Artigue, M., & Blomhøj, M. (2013). Conceptualizing inquiry-based education in mathematics. *ZDM Mathematics Education*, 45(6), 797–810.
4. Clements, D. H., & Sarama, J. (2014). *Learning and Teaching Early Math: The Learning Trajectories Approach* (2nd ed.). New York: Routledge.
5. Papic, M. M., Mulligan, J. T., & Mitchelmore, M. C. (2011). Assessing the development of preschoolers' mathematical patterning. *Journal for Research in Mathematics Education*, 42(3), 237–268.
6. Sarama, J., & Clements, D. H. (2009). *Early Childhood Mathematics Education Research: Learning Trajectories for Young Children*. New York: Routledge.
7. Vygotsky, L. S. (1978). *Mind in Society: The Development of Higher Psychological Processes*. Cambridge, MA: Harvard University Press.
8. Wilson, C. D., Taylor, J. A., Kowalski, S. M., & Carlson, J. (2010). The relative effects and equity of inquiry-based and commonplace science teaching on students' knowledge, reasoning, and argumentation. *Journal of Research in Science Teaching*, 47(3), 276–301.
9. UNESCO. (2017). *Education for Sustainable Development Goals: Learning Objectives*. Paris: UNESCO Publishing.

---

## R. LAMPIRAN — Peta Aktivitas Lengkap

| Dunia | # | Aktivitas | Mesin permainan | Tindakan peduli lingkungan |
|---|---|---|---|---|
| 1 | 1-1 | Ranting Berpola | Lengkapi pola | Kumpulkan daun kering jadi satu pojok |
| 1 | 1-2 | Dua Lubang di Kebun Bunga | Lengkapi pola | Biarkan bunga mekar sampai layu sendiri |
| 1 | 1-3 | Jejak di Tanah Basah | Cari yang beda | Amati jejak hewan tanpa mengikuti sarangnya |
| 1 | 1-4 | Kalung Daun Buatanmu | Susun pola | Pakai daun yang sudah gugur untuk prakarya |
| 1 | 1-5 | Kupu-kupu Lewat Sebentar | Ingat pola | Letakkan satu pot bunga di tempat matahari pagi |
| 2 | 2-1 | Dua Keranjang | Pilah | Minta izin menaruh satu wadah sisa dapur |
| 2 | 2-2 | Tiga Keranjang di Sekolah | Pilah | Kurangi isi keranjang "sisa lain" satu barang |
| 2 | 2-3 | Siapa Paling Cepat Hilang? | Urutkan | Isi ulang botol minum sendiri |
| 2 | 2-4 | Pulangkan ke Rumahnya | Pilah | Pungut satu sampah dari selokan depan rumah |
| 2 | 2-5 | Yang Tidak Pernah Bernapas | Cari yang beda | Angkat satu sampah plastik dari tanah halaman |
| 3 | 3-1 | Berapa Gelas Cukup? | Simulasi | Colek tanah dulu sebelum menyiram |
| 3 | 3-2 | Catatan Cuaca Seminggu | Lengkapi pola | Taruh gelas kosong saat hujan, ukur besoknya |
| 3 | 3-3 | Sungai dan Penghuninya | Simulasi | Bawa pulang bungkus jajan sendiri |
| 3 | 3-4 | Kecambah di Penggaris | Garis bilangan | Rendam kacang hijau, ukur tiap hari |
| 3 | 3-5 | Dua Tuas Sekaligus | Simulasi | Perhatikan halaman sehari sebelum menaruh pot |
| 4 | 4-1 | Kompos untuk Pot Budi | Takar bahan | Tampung air cucian beras untuk menyiram |
| 4 | 4-2 | Timbangan Kompos | Timbangan | Tambahkan daun kering kalau kompos bau |
| 4 | 4-3 | Pupuk Cair dari Kulit Pisang | Takar bahan | Tanya dulu sebelum membuang sisa dapur |
| 4 | 4-4 | Bak Kompos yang Pas | Simulasi | Mulai bak kompos dari ember bekas cat |
| 4 | 4-5 | Bedeng Kebun Sekolah | Takar bahan | Ajak dua teman, minta izin guru, pilih pojok halaman |

---

*Modul ini disusun mengikuti media yang benar-benar terpasang. Setiap aktivitas, pertanyaan pemantik, dan tindakan peduli lingkungan di atas dapat ditemukan apa adanya di dalam `lib/game/content.ts`.*
