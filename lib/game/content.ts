/**
 * Isi 20 aktivitas.
 *
 * Setiap aktivitas mengisi kedelapan tahap inkuiri (lihat lib/game/types.ts).
 * Sepuluh mesin permainan dibagi supaya tiap dunia punya rasa main sendiri:
 *
 *   Dunia 1 · Pola      → pola-isi, beda-sendiri, pola-susun, ingat-pola
 *   Dunia 2 · Pilah     → pilah-wadah, urut-deret, beda-sendiri
 *   Dunia 3 · Prediksi  → lab-simulasi, pola-isi, garis-bilangan
 *   Dunia 4 · Ilmuwan   → lab-takar, timbang, lab-simulasi
 *
 * Catatan tentang bahasa: kalimat untuk anak ditulis pendek, kata kerja
 * di depan, tanpa pujian berlebihan. Nada yang benar adalah nada seorang
 * pendamping yang penasaran — bukan pembawa acara.
 */

import type { Aktivitas } from "./types";

/* ══ DUNIA 1 · Penjelajah Pola Alam ═══════════════════════════════ */

const DUNIA_1: Aktivitas[] = [
  {
    id: "activity-1-1",
    worldId: "world-1",
    worldNumber: 1,
    nomor: 1,
    judul: "Ranting Berpola",
    keterampilan: "observe",
    tujuan: "Kamu akan menemukan bagian pola yang berulang, lalu memakainya untuk menebak daun berikutnya.",
    pemantik: "Kalau kamu tahu urutan daun di ranting ini, apa yang bisa kamu tebak tentang daun yang belum tumbuh?",
    eksplorasi: {
      ajakan: "Ketuk tiap daun. Amati bentuk dan warnanya.",
      benda: [
        { spesimen: "daun-hijau", label: "Daun hijau", catatan: "Masih muda dan lentur. Warnanya dari zat hijau daun." },
        { spesimen: "daun-kering", label: "Daun kering", catatan: "Sudah tua dan rapuh. Zat hijaunya sudah habis." },
        { spesimen: "daun-muda", label: "Daun muda", catatan: "Baru tumbuh, warnanya lebih pucat." },
        { spesimen: "kaca-pembesar", label: "Kaca pembesar", catatan: "Dekatkan untuk melihat urat halus di daun." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: menurutmu daun yang hilang itu daun apa?",
      pilihan: [
        { id: "p1", label: "Daun hijau", spesimen: "daun-hijau" },
        { id: "p2", label: "Daun kering", spesimen: "daun-kering" },
        { id: "p3", label: "Belum tahu, mau coba dulu", spesimen: "kaca-pembesar" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "pola-isi",
      perintah: "Letakkan daun yang hilang di tempat kosong.",
      deret: ["daun-hijau", "daun-kering", "daun-hijau", "daun-kering", "?"],
      baki: ["daun-hijau", "daun-kering", "daun-maple"],
      jawaban: ["daun-hijau"],
      aturan: "A B A B A",
      petunjuk: [
        "Lihat dari kiri. Daun mana yang muncul lagi setelah daun kering?",
        "Dua daun ini bergantian terus: hijau, kering, hijau, kering.",
        "Yang terakhir sebelum lubang adalah daun kering. Setelah kering, gilirannya hijau.",
      ],
    },
    refleksi: {
      pertanyaan: "Bagaimana kamu tahu daun mana yang harus diletakkan?",
      pilihan: [
        { id: "r1", label: "Aku lihat urutannya berulang", spesimen: "daun-hijau" },
        { id: "r2", label: "Aku hitung dari kiri satu per satu", spesimen: "kaca-pembesar" },
        { id: "r3", label: "Aku coba dulu, ternyata cocok", spesimen: "tunas" },
      ],
    },
    penguatan:
      "Bagian yang berulang tadi namanya satuan pola. Di sini satuannya dua daun: hijau lalu kering. Kalau satuan pola sudah ketemu, kamu bisa menebak apa pun yang datang berikutnya, tanpa perlu melihatnya lebih dulu.",
    karakter: {
      judul: "Daun kering bukan sampah",
      aksi: "Kalau menyapu halaman hari ini, kumpulkan daun keringnya di satu pojok tanah. Dalam beberapa minggu daun itu berubah jadi pupuk untuk tanaman di sekitarnya.",
    },
  },

  {
    id: "activity-1-2",
    worldId: "world-1",
    worldNumber: 1,
    nomor: 2,
    judul: "Dua Lubang di Kebun Bunga",
    keterampilan: "observe",
    tujuan: "Kamu akan memakai satu satuan pola untuk mengisi lubang yang letaknya berjauhan.",
    pemantik: "Kalau satu bunga hilang dari tengah barisan, dari mana kamu tahu bunga apa yang dulu ada di situ?",
    eksplorasi: {
      ajakan: "Ketuk bunga-bunga ini. Cari yang paling beda.",
      benda: [
        { spesimen: "bunga-sakura", label: "Bunga sakura", catatan: "Lima kelopak, warnanya merah muda." },
        { spesimen: "bunga-matahari", label: "Bunga matahari", catatan: "Kelopaknya banyak dan kuning. Kepalanya menghadap matahari." },
        { spesimen: "lebah", label: "Lebah", catatan: "Datang mencari madu, sambil membantu bunga berbuah." },
        { spesimen: "kuncup", label: "Kuncup", catatan: "Bunga yang belum terbuka." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: menurutmu satuan polanya berisi berapa bunga?",
      pilihan: [
        { id: "p1", label: "Dua bunga", spesimen: "bunga-sakura" },
        { id: "p2", label: "Tiga bunga", spesimen: "bunga-matahari" },
        { id: "p3", label: "Empat bunga", spesimen: "kuncup" },
      ],
      sesuaiId: "p2",
    },
    tantangan: {
      kind: "pola-isi",
      perintah: "Isi dua tempat kosong di barisan bunga.",
      deret: [
        "bunga-sakura",
        "bunga-sakura",
        "bunga-matahari",
        "bunga-sakura",
        "?",
        "bunga-matahari",
        "bunga-sakura",
        "bunga-sakura",
        "?",
      ],
      baki: ["bunga-sakura", "bunga-matahari", "bunga-tulip"],
      jawaban: ["bunga-sakura", "bunga-matahari"],
      aturan: "A A B  A A B  A A B",
      petunjuk: [
        "Tutup dulu bagian kanan dengan tanganmu. Lihat tiga bunga pertama saja.",
        "Tiga bunga pertama itu berulang: sakura, sakura, matahari.",
        "Hitung bertiga-tiga dari kiri. Lubang pertama ada di urutan kedua satuannya.",
      ],
    },
    refleksi: {
      pertanyaan: "Bagian mana yang paling menolongmu?",
      pilihan: [
        { id: "r1", label: "Melihat tiga bunga pertama", spesimen: "bunga-sakura" },
        { id: "r2", label: "Menghitung bertiga-tiga", spesimen: "bunga-matahari" },
        { id: "r3", label: "Membandingkan kiri dan kanan lubang", spesimen: "kaca-pembesar" },
      ],
    },
    penguatan:
      "Satuan pola di sini panjangnya tiga: sakura, sakura, matahari. Panjang satuan tidak selalu dua. Begitu kamu tahu panjangnya, kamu bisa mengisi lubang di mana pun, bahkan yang jauh di kanan.",
    karakter: {
      judul: "Bunga memberi makan lebah",
      aksi: "Kalau ada bunga di halaman atau pot di rumah, biarkan mekar sampai layu sendiri. Selama mekar, lebah dan kupu-kupu makan dari situ.",
    },
  },

  {
    id: "activity-1-3",
    worldId: "world-1",
    worldNumber: 1,
    nomor: 3,
    judul: "Jejak di Tanah Basah",
    keterampilan: "observe",
    tujuan: "Kamu akan memeriksa sekelompok benda dan menemukan satu yang tidak mengikuti aturan kelompoknya.",
    pemantik: "Semua jejak ini tercetak di tanah yang sama. Apa yang membuat salah satunya bukan milik hewan?",
    eksplorasi: {
      ajakan: "Ketuk tiap jejak. Bandingkan jumlah jarinya.",
      benda: [
        { spesimen: "jejak-hewan", label: "Jejak hewan", catatan: "Ada bantalan besar di belakang dan jari-jari kecil di depan." },
        { spesimen: "jejak-manusia", label: "Jejak manusia", catatan: "Panjang, ada tumit, telapak, dan jari yang berbaris." },
        { spesimen: "tanah", label: "Tanah basah", catatan: "Tanah basah menyimpan bentuk jejak lebih lama." },
        { spesimen: "kaca-pembesar", label: "Kaca pembesar", catatan: "Bantu melihat tepi jejak yang samar." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: apa yang akan kamu bandingkan lebih dulu?",
      pilihan: [
        { id: "p1", label: "Bentuk jejaknya", spesimen: "jejak-hewan" },
        { id: "p2", label: "Ukurannya", spesimen: "kaca-pembesar" },
        { id: "p3", label: "Arah hadapnya", spesimen: "angin" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "beda-sendiri",
      perintah: "Ketuk satu jejak yang berbeda dari yang lain.",
      kisi: [
        "jejak-hewan",
        "jejak-hewan",
        "jejak-hewan",
        "jejak-hewan",
        "jejak-manusia",
        "jejak-hewan",
        "jejak-hewan",
        "jejak-hewan",
        "jejak-hewan",
      ],
      indeksBeda: 4,
      alasan: "Delapan jejak punya bantalan bulat dan empat jari kecil. Satu jejak punya tumit panjang dan lima jari berbaris, itu jejak kaki manusia.",
      petunjuk: [
        "Jangan lihat semuanya sekaligus. Periksa satu baris dulu, lalu baris berikutnya.",
        "Delapan jejak bentuknya sama persis. Satu tidak.",
        "Cari jejak yang punya tumit panjang, bukan bantalan bulat.",
      ],
    },
    refleksi: {
      pertanyaan: "Bagaimana caramu memeriksanya?",
      pilihan: [
        { id: "r1", label: "Baris per baris", spesimen: "jejak-hewan" },
        { id: "r2", label: "Langsung terlihat berbeda", spesimen: "kaca-pembesar" },
        { id: "r3", label: "Kubandingkan dua-dua", spesimen: "jejak-manusia" },
      ],
    },
    penguatan:
      "Kamu baru saja memakai aturan kelompok. Semua jejak hewan punya ciri yang sama; satu jejak melanggar ciri itu, jadi dia bukan anggota kelompok. Menemukan yang melanggar aturan adalah cara ilmuwan menguji apakah aturannya benar.",
    karakter: {
      judul: "Amati tanpa mengganggu",
      aksi: "Kalau menemukan jejak hewan di kebun atau taman, cukup amati dan hitung jarinya. Jangan diikuti sampai ke sarangnya, hewan liar butuh rumah yang tidak terusik.",
    },
  },

  {
    id: "activity-1-4",
    worldId: "world-1",
    worldNumber: 1,
    nomor: 4,
    judul: "Kalung Daun Buatanmu",
    keterampilan: "explore",
    tujuan: "Kamu akan membuat sendiri pola yang berulang, bukan sekadar menebaknya.",
    pemantik: "Kalau kamu yang membuat aturannya, bagaimana orang lain bisa tahu lanjutan kalungmu?",
    eksplorasi: {
      ajakan: "Ketuk bahan-bahan kalung ini.",
      benda: [
        { spesimen: "bunga-matahari", label: "Bunga matahari", catatan: "Besar dan kuning. Enak jadi penanda awal satuan." },
        { spesimen: "daun-hijau", label: "Daun hijau", catatan: "Kecil, lentur, gampang ditusuk benang." },
        { spesimen: "biji", label: "Biji", catatan: "Keras. Kalau ditanam, bisa tumbuh jadi pohon." },
        { spesimen: "daun-bulat", label: "Daun bulat", catatan: "Bentuknya lain dari daun runcing." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: kamu perlu tahu apa dulu supaya bisa melanjutkan kalungnya?",
      pilihan: [
        { id: "p1", label: "Bagian yang berulang", spesimen: "bunga-matahari" },
        { id: "p2", label: "Jumlah semua manik", spesimen: "biji" },
        { id: "p3", label: "Warna kesukaanku", spesimen: "daun-hijau" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "pola-susun",
      perintah: "Lanjutkan kalungnya. Ikuti aturan yang sama seperti bagian awal.",
      contoh: ["bunga-matahari", "daun-hijau", "daun-hijau"],
      jawaban: ["bunga-matahari", "daun-hijau", "daun-hijau", "bunga-matahari", "daun-hijau", "daun-hijau"],
      baki: ["bunga-matahari", "daun-hijau", "biji"],
      aturan: "A B B  A B B  A B B",
      petunjuk: [
        "Baca bagian yang sudah jadi dengan suara pelan: bunga, daun, daun.",
        "Satu satuan berisi tiga manik: satu bunga lalu dua daun.",
        "Setelah dua daun, mulai lagi dari bunga.",
      ],
    },
    refleksi: {
      pertanyaan: "Waktu menyusun, kamu memikirkan apa?",
      pilihan: [
        { id: "r1", label: "Mengulang satuan yang sama", spesimen: "bunga-matahari" },
        { id: "r2", label: "Menyebutnya keras-keras", spesimen: "daun-hijau" },
        { id: "r3", label: "Melihat bagian awal terus", spesimen: "kaca-pembesar" },
      ],
    },
    penguatan:
      "Membuat pola dan menebak pola adalah keterampilan yang sama, dibalik. Waktu kamu menyusun A-B-B berulang-ulang, kamu sedang membuat aturan yang bisa dibaca orang lain. Itulah gunanya pola: satu aturan pendek untuk barisan sepanjang apa pun.",
    karakter: {
      judul: "Ambil yang sudah jatuh",
      aksi: "Kalau membuat prakarya dari daun atau bunga, pakai yang sudah gugur di tanah. Yang masih menempel di pohon masih bekerja membuat makanan untuk tanamannya.",
    },
  },

  {
    id: "activity-1-5",
    worldId: "world-1",
    worldNumber: 1,
    nomor: 5,
    judul: "Kupu-kupu Lewat Sebentar",
    keterampilan: "observe",
    tujuan: "Kamu akan mengingat sebuah urutan yang hanya tampak sebentar, lalu menyusunnya kembali.",
    pemantik: "Kupu-kupu tidak menunggu. Bagaimana caramu mengingat urutan yang cuma lewat sekejap?",
    eksplorasi: {
      ajakan: "Ketuk penghuni kebun ini sebelum mereka pergi.",
      benda: [
        { spesimen: "kupu-kupu", label: "Kupu-kupu", catatan: "Sayapnya kiri dan kanan sama persis. Itu juga sebuah pola." },
        { spesimen: "lebah", label: "Lebah", catatan: "Bergaris kuning-hitam bergantian." },
        { spesimen: "burung", label: "Burung", catatan: "Datang mencari ulat di daun." },
        { spesimen: "bunga-sakura", label: "Bunga sakura", catatan: "Tempat kupu-kupu berhenti minum." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: cara mengingat mana yang mau kamu pakai?",
      pilihan: [
        { id: "p1", label: "Menyebut urutannya dalam hati", spesimen: "kupu-kupu" },
        { id: "p2", label: "Mengingat warnanya saja", spesimen: "bunga-sakura" },
        { id: "p3", label: "Membaginya jadi dua bagian", spesimen: "lebah" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "ingat-pola",
      perintah: "Perhatikan urutannya, lalu susun ulang dari ingatanmu.",
      urutan: ["kupu-kupu", "bunga-sakura", "kupu-kupu", "lebah"],
      baki: ["kupu-kupu", "bunga-sakura", "lebah", "burung"],
      msPerKartu: 750,
      petunjuk: [
        "Sebut urutannya dalam hati saat muncul: kupu, bunga, kupu, lebah.",
        "Yang pertama dan yang ketiga sama.",
        "Yang terakhir adalah satu-satunya yang bergaris kuning-hitam.",
      ],
    },
    refleksi: {
      pertanyaan: "Apa yang membantumu mengingat?",
      pilihan: [
        { id: "r1", label: "Menyebutnya dalam hati", spesimen: "kupu-kupu" },
        { id: "r2", label: "Ada yang muncul dua kali", spesimen: "bunga-sakura" },
        { id: "r3", label: "Mengingat yang pertama dulu", spesimen: "lebah" },
      ],
    },
    penguatan:
      "Menyebut urutan dengan kata membuatnya lebih mudah diingat daripada mengingat gambarnya. Ilmuwan melakukan hal yang sama: mereka menuliskan apa yang mereka lihat, supaya tidak hilang.",
    karakter: {
      judul: "Kebun kecil, tamu banyak",
      aksi: "Satu pot bunga di teras cukup untuk mengundang kupu-kupu. Kalau ada, letakkan di tempat yang kena matahari pagi.",
    },
  },
];

/* ══ DUNIA 2 · Penjelajah Pemilahan ═══════════════════════════════ */

const DUNIA_2: Aktivitas[] = [
  {
    id: "activity-2-1",
    worldId: "world-2",
    worldNumber: 2,
    nomor: 1,
    judul: "Dua Keranjang",
    keterampilan: "observe",
    tujuan: "Kamu akan mengelompokkan sampah berdasarkan satu pertanyaan: bisa membusuk atau tidak.",
    pemantik: "Kenapa kulit pisang hilang sendiri di tanah, tapi botol plastik tetap ada bertahun-tahun?",
    eksplorasi: {
      ajakan: "Ketuk tiap sampah. Cari tahu asalnya dari mana.",
      benda: [
        { spesimen: "kulit-pisang", label: "Kulit pisang", catatan: "Dari buah. Cacing dan jamur bisa memakannya." },
        { spesimen: "botol-plastik", label: "Botol plastik", catatan: "Dibuat di pabrik. Tidak ada makhluk yang bisa memakannya." },
        { spesimen: "cacing", label: "Cacing tanah", catatan: "Pemakan sampah dari makhluk hidup. Kotorannya menyuburkan tanah." },
        { spesimen: "kaleng", label: "Kaleng", catatan: "Dari logam. Bisa dilebur dan dipakai lagi." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: apa yang membuat sesuatu bisa membusuk?",
      pilihan: [
        { id: "p1", label: "Berasal dari makhluk hidup", spesimen: "kulit-pisang" },
        { id: "p2", label: "Warnanya gelap", spesimen: "tanah" },
        { id: "p3", label: "Bentuknya lunak", spesimen: "sisa-sayur" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "pilah-wadah",
      perintah: "Masukkan tiap sampah ke keranjang yang tepat.",
      wadah: [
        { id: "organik", nama: "Bisa membusuk", spesimen: "kompos", warna: "#3E8B54" },
        { id: "anorganik", nama: "Tidak bisa membusuk", spesimen: "ember", warna: "#2F7FA6" },
      ],
      benda: [
        { id: "b1", spesimen: "kulit-pisang", wadahBenar: "organik" },
        { id: "b2", spesimen: "botol-plastik", wadahBenar: "anorganik" },
        { id: "b3", spesimen: "sisa-sayur", wadahBenar: "organik" },
        { id: "b4", spesimen: "kaleng", wadahBenar: "anorganik" },
        { id: "b5", spesimen: "daun-kering", wadahBenar: "organik" },
        { id: "b6", spesimen: "styrofoam", wadahBenar: "anorganik" },
      ],
      petunjuk: [
        "Tanyakan pada tiap benda: dulunya bagian dari makhluk hidup atau bukan?",
        "Kulit buah, daun, dan sisa sayur pernah hidup. Plastik dan logam tidak pernah.",
        "Kalau dulunya pernah hidup, cacing dan jamur bisa memakannya.",
      ],
    },
    refleksi: {
      pertanyaan: "Mana yang paling bikin ragu?",
      pilihan: [
        { id: "r1", label: "Wadah styrofoam", spesimen: "styrofoam" },
        { id: "r2", label: "Daun kering", spesimen: "daun-kering" },
        { id: "r3", label: "Tidak ada, semuanya jelas", spesimen: "kompos" },
      ],
    },
    penguatan:
      "Kamu memilah pakai satu aturan: pernah hidup atau tidak. Satu aturan yang jelas membuat setiap benda punya tempat, dan tidak ada yang masuk dua keranjang sekaligus. Itu yang disebut mengelompokkan.",
    karakter: {
      judul: "Mulai dari satu keranjang",
      aksi: "Minta izin menaruh satu wadah khusus di dapur untuk sisa sayur dan kulit buah. Cukup satu, tidak perlu langsung banyak.",
    },
  },

  {
    id: "activity-2-2",
    worldId: "world-2",
    worldNumber: 2,
    nomor: 2,
    judul: "Tiga Keranjang di Sekolah",
    keterampilan: "question",
    tujuan: "Kamu akan memilah dengan dua pertanyaan sekaligus, bukan satu.",
    pemantik: "Kaleng tidak bisa membusuk, tapi juga tidak seharusnya dibuang. Jadi dia masuk keranjang yang mana?",
    eksplorasi: {
      ajakan: "Ketuk tiap benda. Perhatikan bahan pembuatnya.",
      benda: [
        { spesimen: "kardus", label: "Kardus", catatan: "Dari serat kayu. Bisa dilumatkan dan dicetak jadi kardus baru." },
        { spesimen: "kaleng", label: "Kaleng", catatan: "Dilebur dan dicetak ulang berkali-kali tanpa rusak." },
        { spesimen: "styrofoam", label: "Styrofoam", catatan: "Hampir tidak ada yang mau mendaur ulangnya. Sulit sekali." },
        { spesimen: "ampas-kopi", label: "Ampas kopi", catatan: "Sisa seduhan. Bagus dicampur ke kompos." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: berapa pertanyaan yang kamu butuhkan untuk tiga keranjang?",
      pilihan: [
        { id: "p1", label: "Satu pertanyaan", spesimen: "kompos" },
        { id: "p2", label: "Dua pertanyaan", spesimen: "kardus" },
        { id: "p3", label: "Tiga pertanyaan", spesimen: "kaleng" },
      ],
      sesuaiId: "p2",
    },
    tantangan: {
      kind: "pilah-wadah",
      perintah: "Pilah sembilan benda ini ke tiga keranjang.",
      wadah: [
        { id: "kompos", nama: "Kompos", spesimen: "kompos", warna: "#3E8B54" },
        { id: "daur", nama: "Daur ulang", spesimen: "ember", warna: "#2F7FA6" },
        { id: "sisa", nama: "Sisa lain", spesimen: "kantong-plastik", warna: "#8C5A3C" },
      ],
      benda: [
        { id: "b1", spesimen: "kulit-jeruk", wadahBenar: "kompos" },
        { id: "b2", spesimen: "kardus", wadahBenar: "daur" },
        { id: "b3", spesimen: "styrofoam", wadahBenar: "sisa" },
        { id: "b4", spesimen: "ampas-kopi", wadahBenar: "kompos" },
        { id: "b5", spesimen: "kaleng", wadahBenar: "daur" },
        { id: "b6", spesimen: "tutup-botol", wadahBenar: "sisa" },
        { id: "b7", spesimen: "cangkang-telur", wadahBenar: "kompos" },
        { id: "b8", spesimen: "koran", wadahBenar: "daur" },
        { id: "b9", spesimen: "kantong-plastik", wadahBenar: "sisa" },
      ],
      petunjuk: [
        "Tanya pertama: pernah hidup atau tidak? Kalau pernah, dia ke kompos.",
        "Untuk yang tidak pernah hidup, tanya kedua: bisa dilebur atau dilumatkan jadi barang baru?",
        "Kardus dan koran dari kayu, kaleng dari logam, ketiganya bisa dipakai ulang. Yang terlalu kecil atau tercampur biasanya tidak bisa.",
      ],
    },
    refleksi: {
      pertanyaan: "Setelah memilah, kamu jadi tahu apa?",
      pilihan: [
        { id: "r1", label: "Ada sampah yang tidak bisa ke mana-mana", spesimen: "styrofoam" },
        { id: "r2", label: "Banyak sampah sebenarnya masih berguna", spesimen: "kardus" },
        { id: "r3", label: "Memilah butuh lebih dari satu pertanyaan", spesimen: "kompos" },
      ],
    },
    penguatan:
      "Dua pertanyaan menghasilkan tiga kelompok. Pertanyaan pertama membelah semuanya jadi dua, pertanyaan kedua membelah salah satu bagian lagi. Bertanya secara berurutan seperti ini membuat pemilahan yang rumit jadi mudah.",
    karakter: {
      judul: "Keranjang yang paling sedikit",
      aksi: "Perhatikan keranjang 'sisa lain', itu yang berakhir di tempat pembuangan. Minggu ini, coba kurangi isinya satu barang saja, misalnya bawa botol minum sendiri.",
    },
  },

  {
    id: "activity-2-3",
    worldId: "world-2",
    worldNumber: 2,
    nomor: 3,
    judul: "Siapa Paling Cepat Hilang?",
    keterampilan: "explore",
    tujuan: "Kamu akan mengurutkan benda dari yang paling cepat sampai paling lama terurai di tanah.",
    pemantik: "Kalau hari ini kamu membuang kaleng di kebun, siapa yang masih akan melihatnya saat kamu dewasa?",
    eksplorasi: {
      ajakan: "Ketuk tiap benda dan baca berapa lama ia bertahan di tanah.",
      benda: [
        { spesimen: "kulit-pisang", label: "Kulit pisang", catatan: "Hilang dalam sekitar 1 bulan." },
        { spesimen: "kertas", label: "Kertas", catatan: "Sekitar 3 bulan kalau kena hujan." },
        { spesimen: "kaleng", label: "Kaleng", catatan: "Sekitar 50 tahun." },
        { spesimen: "botol-plastik", label: "Botol plastik", catatan: "Ratusan tahun. Lebih lama dari usia kakek-nenekmu." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: menurutmu mana yang paling lama bertahan?",
      pilihan: [
        { id: "p1", label: "Kertas", spesimen: "kertas" },
        { id: "p2", label: "Kaleng", spesimen: "kaleng" },
        { id: "p3", label: "Botol plastik", spesimen: "botol-plastik" },
      ],
      sesuaiId: "p3",
    },
    tantangan: {
      kind: "urut-deret",
      perintah: "Urutkan dari yang paling cepat hilang ke yang paling lama.",
      benda: [
        { id: "u1", spesimen: "kulit-pisang", nilai: 1, label: "1 bulan" },
        { id: "u2", spesimen: "kertas", nilai: 3, label: "3 bulan" },
        { id: "u3", spesimen: "kardus", nilai: 12, label: "1 tahun" },
        { id: "u4", spesimen: "kaleng", nilai: 600, label: "50 tahun" },
        { id: "u5", spesimen: "botol-plastik", nilai: 5400, label: "450 tahun" },
      ],
      arah: "kecil-besar",
      ciri: "lama terurai",
      satuan: "bulan",
      petunjuk: [
        "Mulai dari yang paling gampang: mana yang pernah kamu lihat membusuk di tanah?",
        "Yang pernah hidup selalu lebih cepat hilang daripada yang dibuat pabrik.",
        "Sisa dua terakhir: logam berkarat pelan-pelan, tapi plastik hampir tidak berubah sama sekali.",
      ],
    },
    refleksi: {
      pertanyaan: "Angka mana yang paling mengejutkanmu?",
      pilihan: [
        { id: "r1", label: "450 tahun untuk satu botol", spesimen: "botol-plastik" },
        { id: "r2", label: "Cuma 1 bulan untuk kulit pisang", spesimen: "kulit-pisang" },
        { id: "r3", label: "Kaleng ternyata lama juga", spesimen: "kaleng" },
      ],
    },
    penguatan:
      "Mengurutkan berarti membandingkan dua benda berkali-kali: mana yang lebih lama? Setelah semuanya berbaris, kamu bisa membaca jaraknya. Kulit pisang dan botol plastik sama-sama sampah, tapi jaraknya 450 tahun.",
    karakter: {
      judul: "Satu botol, satu keputusan",
      aksi: "Botol plastik yang kamu pakai hari ini akan bertahan lebih lama daripada kamu. Isi ulang botolmu, jangan beli yang baru.",
    },
  },

  {
    id: "activity-2-4",
    worldId: "world-2",
    worldNumber: 2,
    nomor: 4,
    judul: "Pulangkan ke Rumahnya",
    keterampilan: "observe",
    tujuan: "Kamu akan mengelompokkan hewan berdasarkan tempat tinggalnya.",
    pemantik: "Kenapa ikan tidak bisa pindah ke hutan, padahal sama-sama ada air di sana?",
    eksplorasi: {
      ajakan: "Ketuk tiap hewan. Cari tahu ia bernapas dengan apa.",
      benda: [
        { spesimen: "ikan", label: "Ikan", catatan: "Bernapas dengan insang. Hanya bisa mengambil udara dari air." },
        { spesimen: "burung", label: "Burung", catatan: "Bernapas dengan paru-paru. Bersarang di dahan pohon." },
        { spesimen: "kura-kura", label: "Kura-kura", catatan: "Ada yang di darat, ada yang di laut. Tergantung jenisnya." },
        { spesimen: "air", label: "Air laut", catatan: "Asin. Berbeda dari air sungai dan air hujan." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: apa yang menentukan rumah seekor hewan?",
      pilihan: [
        { id: "p1", label: "Cara ia bernapas dan makan", spesimen: "ikan" },
        { id: "p2", label: "Warna tubuhnya", spesimen: "kupu-kupu" },
        { id: "p3", label: "Besar kecilnya", spesimen: "burung" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "pilah-wadah",
      perintah: "Antar tiap hewan pulang ke rumahnya.",
      wadah: [
        { id: "hutan", nama: "Hutan", spesimen: "pohon-besar", warna: "#3E8B54" },
        { id: "air", nama: "Perairan", spesimen: "air", warna: "#2F7FA6" },
      ],
      benda: [
        { id: "b1", spesimen: "burung", wadahBenar: "hutan" },
        { id: "b2", spesimen: "ikan", wadahBenar: "air" },
        { id: "b3", spesimen: "kupu-kupu", wadahBenar: "hutan" },
        { id: "b4", spesimen: "kura-kura", wadahBenar: "air" },
        { id: "b5", spesimen: "cacing", wadahBenar: "hutan" },
        { id: "b6", spesimen: "siput", wadahBenar: "hutan" },
      ],
      petunjuk: [
        "Tanya: hewan ini bernapas mengambil udara dari air, atau dari langit?",
        "Ikan dan kura-kura laut mengambil udara dari air.",
        "Cacing dan siput hidup di tanah lembap, bukan di dalam air.",
      ],
    },
    refleksi: {
      pertanyaan: "Yang mana paling sulit ditentukan?",
      pilihan: [
        { id: "r1", label: "Kura-kura", spesimen: "kura-kura" },
        { id: "r2", label: "Siput", spesimen: "siput" },
        { id: "r3", label: "Semuanya jelas buatku", spesimen: "burung" },
      ],
    },
    penguatan:
      "Kelompok yang baik dibuat dari ciri yang penting, bukan ciri yang kelihatan. Warna dan ukuran mudah dilihat, tapi yang menentukan rumah seekor hewan adalah cara ia bernapas dan mencari makan.",
    karakter: {
      judul: "Rumah mereka bukan tempat sampah",
      aksi: "Sampah yang hanyut di selokan akhirnya sampai ke sungai dan laut, rumah ikan dan kura-kura. Pungut satu sampah dari selokan depan rumah, kalau aman diambil.",
    },
  },

  {
    id: "activity-2-5",
    worldId: "world-2",
    worldNumber: 2,
    nomor: 5,
    judul: "Yang Tidak Pernah Bernapas",
    keterampilan: "question",
    tujuan: "Kamu akan menguji sebuah kelompok dan menemukan anggota yang tidak memenuhi syarat.",
    pemantik: "Batu bisa bertambah besar kalau tertimbun tanah. Kalau begitu, kenapa dia bukan makhluk hidup?",
    eksplorasi: {
      ajakan: "Ketuk tiap benda. Tanya: dia butuh makan atau tidak?",
      benda: [
        { spesimen: "tunas", label: "Tunas", catatan: "Tumbuh, butuh air, dan bisa berkembang biak." },
        { spesimen: "batu", label: "Batu", catatan: "Tidak makan, tidak bernapas, tidak berkembang biak." },
        { spesimen: "siput", label: "Siput", catatan: "Bergerak pelan, makan daun, bertelur." },
        { spesimen: "kaca-pembesar", label: "Kaca pembesar", catatan: "Alat. Dibuat manusia, bukan tumbuh sendiri." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: syarat mana yang paling menentukan?",
      pilihan: [
        { id: "p1", label: "Butuh makan dan air", spesimen: "tunas" },
        { id: "p2", label: "Bisa bergerak", spesimen: "siput" },
        { id: "p3", label: "Bisa bertambah besar", spesimen: "batu" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "beda-sendiri",
      perintah: "Ketuk satu-satunya yang bukan makhluk hidup.",
      kisi: ["tunas", "siput", "kupu-kupu", "cacing", "burung", "batu", "rumput", "lebah", "semak"],
      indeksBeda: 5,
      alasan: "Semua yang lain butuh makan, tumbuh, dan berkembang biak. Batu tidak melakukan satu pun dari ketiganya, dia bisa terlihat lebih besar hanya kalau ada yang menempel padanya.",
      petunjuk: [
        "Periksa satu per satu. Tanya tiga hal: makan? tumbuh? punya keturunan?",
        "Delapan benda menjawab ya untuk ketiganya.",
        "Satu benda menjawab tidak untuk ketiganya sekaligus.",
      ],
    },
    refleksi: {
      pertanyaan: "Pertanyaan mana yang paling cepat menemukannya?",
      pilihan: [
        { id: "r1", label: "Dia butuh makan atau tidak", spesimen: "tunas" },
        { id: "r2", label: "Dia bisa punya anak atau tidak", spesimen: "lebah" },
        { id: "r3", label: "Aku langsung tahu tanpa bertanya", spesimen: "batu" },
      ],
    },
    penguatan:
      "Aturan kelompok yang kuat punya lebih dari satu syarat, dan semua syarat harus terpenuhi. Batu gagal di ketiga syarat sekaligus. Menguji anggota dengan daftar syarat adalah cara berpikir yang dipakai ilmuwan setiap hari.",
    karakter: {
      judul: "Yang hidup butuh dijaga",
      aksi: "Rumput, siput, dan cacing sama-sama butuh tanah yang bersih; batu tidak butuh apa-apa. Angkat satu sampah plastik dari tanah di halamanmu hari ini, lalu lihat siapa yang tinggal di bawahnya.",
    },
  },
];

/* ══ DUNIA 3 · Penjelajah Prediksi Alam ═══════════════════════════ */

const DUNIA_3: Aktivitas[] = [
  {
    id: "activity-3-1",
    worldId: "world-3",
    worldNumber: 3,
    nomor: 1,
    judul: "Berapa Gelas Cukup?",
    keterampilan: "predict",
    tujuan: "Kamu akan mengubah satu hal, mengamati akibatnya, lalu memprediksi hasil yang belum kamu coba.",
    pemantik: "Kalau tanaman disiram lebih banyak, apakah dia pasti tumbuh lebih subur?",
    eksplorasi: {
      ajakan: "Ketuk tiap benda sebelum masuk ke laboratorium.",
      benda: [
        { spesimen: "tetes-air", label: "Air", catatan: "Mengangkut makanan dari tanah ke seluruh bagian tanaman." },
        { spesimen: "tanaman-subur", label: "Tanaman subur", catatan: "Daunnya tegak dan hijau penuh." },
        { spesimen: "tanaman-layu", label: "Tanaman layu", catatan: "Daunnya menggantung karena kekurangan air." },
        { spesimen: "pot", label: "Pot", catatan: "Lubang di bawahnya membuang air berlebih." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum ke lab: kalau air ditambah terus-menerus, apa yang terjadi?",
      pilihan: [
        { id: "p1", label: "Makin subur terus", spesimen: "tanaman-subur" },
        { id: "p2", label: "Bagus sampai batas tertentu, lalu rusak", spesimen: "tetes-air" },
        { id: "p3", label: "Tidak berpengaruh", spesimen: "batu" },
      ],
      sesuaiId: "p2",
    },
    tantangan: {
      kind: "lab-simulasi",
      perintah: "Geser kedua tuas. Amati apa yang terjadi pada tanaman.",
      variabel: [
        { id: "air", nama: "Air per minggu", min: 0, max: 8, awal: 0, satuan: "gelas", spesimen: "tetes-air" },
        { id: "hari", nama: "Sudah berjalan", min: 1, max: 14, awal: 7, satuan: "hari", spesimen: "matahari" },
      ],
      keadaan: [
        { id: "layu", nama: "Layu", spesimen: "tanaman-layu", keterangan: "Kekurangan air. Daun menggantung." },
        { id: "hidup", nama: "Bertahan", spesimen: "tunas", keterangan: "Cukup untuk hidup, belum cukup untuk tumbuh besar." },
        { id: "subur", nama: "Subur", spesimen: "tanaman-subur", keterangan: "Air pas. Daun tegak dan hijau." },
        { id: "busuk", nama: "Akar busuk", spesimen: "daun-gugur", keterangan: "Air terlalu banyak. Akar terendam dan membusuk." },
      ],
      aturan: [
        { syarat: { air: [0, 1] }, keadaanId: "layu" },
        { syarat: { air: [2, 3] }, keadaanId: "hidup" },
        { syarat: { air: [4, 6] }, keadaanId: "subur" },
        { keadaanId: "busuk" },
      ],
      ujian: {
        kondisi: { air: 7, hari: 10 },
        pertanyaan: "Tuas dikunci di 7 gelas per minggu selama 10 hari. Apa yang akan terjadi?",
      },
      petunjuk: [
        "Coba dulu tuas air di posisi paling kiri. Lihat hasilnya. Lalu geser ke paling kanan.",
        "Ada dua cara tanaman bisa rusak, dan keduanya ada di ujung tuas.",
        "7 gelas lebih dekat ke ujung kanan daripada ke tengah.",
      ],
    },
    refleksi: {
      pertanyaan: "Apa yang kamu temukan di lab tadi?",
      pilihan: [
        { id: "r1", label: "Terlalu banyak air juga merusak", spesimen: "daun-gugur" },
        { id: "r2", label: "Ada takaran yang paling pas", spesimen: "tanaman-subur" },
        { id: "r3", label: "Aku harus mencoba dulu untuk tahu", spesimen: "gelas-ukur" },
      ],
    },
    penguatan:
      "Lebih banyak tidak selalu lebih baik. Kalau kamu menggambar hasilnya, bentuknya seperti bukit: naik, sampai puncak, lalu turun lagi. Banyak hal di alam berperilaku seperti ini.",
    karakter: {
      judul: "Siram secukupnya",
      aksi: "Sebelum menyiram, colek tanahnya dengan jari. Kalau masih lembap, tunggu besok. Menyiram berlebihan membunuh tanaman sekaligus memboroskan air.",
    },
  },

  {
    id: "activity-3-2",
    worldId: "world-3",
    worldNumber: 3,
    nomor: 2,
    judul: "Catatan Cuaca Seminggu",
    keterampilan: "predict",
    tujuan: "Kamu akan memakai pola dari catatan lama untuk memprediksi hari yang belum datang.",
    pemantik: "Kalau kamu punya catatan cuaca enam hari, apakah itu cukup untuk menebak hari ketujuh?",
    eksplorasi: {
      ajakan: "Ketuk tiap tanda cuaca di catatan.",
      benda: [
        { spesimen: "matahari", label: "Cerah", catatan: "Air di daun dan tanah menguap naik ke langit." },
        { spesimen: "awan", label: "Berawan", catatan: "Uap air berkumpul jadi titik-titik kecil." },
        { spesimen: "awan-hujan", label: "Hujan", catatan: "Titik air jadi terlalu berat, lalu jatuh." },
        { spesimen: "ember", label: "Ember penakar", catatan: "Alat sederhana untuk mengukur berapa banyak hujan turun." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mencoba: catatan cuaca ini kelihatan seperti apa?",
      pilihan: [
        { id: "p1", label: "Berulang teratur", spesimen: "awan" },
        { id: "p2", label: "Acak, tidak ada aturannya", spesimen: "angin" },
        { id: "p3", label: "Makin lama makin hujan", spesimen: "hujan" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "pola-isi",
      perintah: "Lengkapi catatan cuaca yang hilang.",
      deret: ["matahari", "awan", "awan-hujan", "matahari", "?", "awan-hujan", "matahari", "awan", "?"],
      baki: ["matahari", "awan", "awan-hujan"],
      jawaban: ["awan", "awan-hujan"],
      aturan: "cerah → berawan → hujan, lalu mulai lagi",
      petunjuk: [
        "Baca catatannya dari kiri, seperti membaca hari demi hari.",
        "Tiga hari pertama berulang lagi di hari keempat, kelima, keenam.",
        "Setelah cerah selalu berawan dulu, baru hujan.",
      ],
    },
    refleksi: {
      pertanyaan: "Menurutmu, cuaca sungguhan seteratur ini?",
      pilihan: [
        { id: "r1", label: "Tidak, cuaca asli lebih berubah-ubah", spesimen: "angin" },
        { id: "r2", label: "Kadang teratur, kadang tidak", spesimen: "awan" },
        { id: "r3", label: "Aku mau mencatat cuaca sendiri dulu", spesimen: "ember" },
      ],
    },
    penguatan:
      "Prediksi dari pola adalah tebakan terbaik berdasarkan catatan, bukan kepastian. Cuaca sungguhan lebih rumit dari catatan tujuh hari. Karena itu ilmuwan mengumpulkan catatan bertahun-tahun sebelum berani memprediksi.",
    karakter: {
      judul: "Jadi pencatat cuaca",
      aksi: "Taruh gelas kosong di halaman saat hujan. Besoknya, ukur tinggi airnya dengan penggaris dan catat. Seminggu saja sudah jadi data.",
    },
  },

  {
    id: "activity-3-3",
    worldId: "world-3",
    worldNumber: 3,
    nomor: 3,
    judul: "Sungai dan Penghuninya",
    keterampilan: "predict",
    tujuan: "Kamu akan menemukan batas, titik ketika penambahan kecil membuat perubahan besar.",
    pemantik: "Satu bungkus plastik di sungai mungkin tidak terasa. Mulai dari berapa bungkus, ikannya mulai terganggu?",
    eksplorasi: {
      ajakan: "Ketuk isi sungai ini.",
      benda: [
        { spesimen: "ikan", label: "Ikan", catatan: "Mengambil udara dari air lewat insang." },
        { spesimen: "kantong-plastik", label: "Kantong plastik", catatan: "Mengambang, menghalangi cahaya matahari masuk ke air." },
        { spesimen: "air", label: "Air sungai", catatan: "Air jernih artinya cahaya bisa masuk sampai ke dasar." },
        { spesimen: "botol-plastik", label: "Botol plastik", catatan: "Pecah jadi butiran kecil, lalu tertelan ikan." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum ke lab: sungai jadi rusak dengan cara bagaimana?",
      pilihan: [
        { id: "p1", label: "Pelan-pelan, sedikit demi sedikit", spesimen: "tetes-air" },
        { id: "p2", label: "Baik-baik saja sampai batas, lalu cepat rusak", spesimen: "kantong-plastik" },
        { id: "p3", label: "Langsung rusak sejak sampah pertama", spesimen: "botol-plastik" },
      ],
      sesuaiId: "p2",
    },
    tantangan: {
      kind: "lab-simulasi",
      perintah: "Tambahkan sampah sedikit demi sedikit. Perhatikan kapan sungainya berubah.",
      variabel: [
        { id: "sampah", nama: "Sampah di sungai", min: 0, max: 12, awal: 0, satuan: "buah", spesimen: "kantong-plastik" },
        { id: "arus", nama: "Kekuatan arus", min: 1, max: 3, awal: 2, satuan: "tingkat", spesimen: "air" },
      ],
      keadaan: [
        { id: "jernih", nama: "Jernih", spesimen: "ikan", keterangan: "Cahaya sampai ke dasar. Ikan berkembang biak." },
        { id: "keruh", nama: "Mulai keruh", spesimen: "air", keterangan: "Ikan masih hidup, tapi tidak bertelur lagi." },
        { id: "rusak", nama: "Rusak", spesimen: "kantong-plastik", keterangan: "Cahaya tertutup. Ikan pergi atau mati." },
      ],
      aturan: [
        { syarat: { sampah: [0, 2] }, keadaanId: "jernih" },
        { syarat: { sampah: [3, 6] }, keadaanId: "keruh" },
        { keadaanId: "rusak" },
      ],
      ujian: {
        kondisi: { sampah: 8, arus: 2 },
        pertanyaan: "Ada 8 sampah di sungai dengan arus sedang. Bagaimana keadaan ikannya?",
      },
      petunjuk: [
        "Geser tuas sampah satu langkah saja tiap kali. Berhenti setiap kali gambarnya berubah.",
        "Ada dua titik perubahan. Catat di angka berapa saja.",
        "8 sudah lewat titik perubahan yang kedua.",
      ],
    },
    refleksi: {
      pertanyaan: "Apa yang paling penting dari percobaan tadi?",
      pilihan: [
        { id: "r1", label: "Ada titik ketika sungai tiba-tiba rusak", spesimen: "kantong-plastik" },
        { id: "r2", label: "Sedikit sampah pun sudah mulai berpengaruh", spesimen: "air" },
        { id: "r3", label: "Sampahku sendiri ikut dihitung", spesimen: "ikan" },
      ],
    },
    penguatan:
      "Perubahan tidak selalu rata. Dari 0 ke 2 sampah, sungai masih jernih. Dari 6 ke 7, semuanya berubah. Titik seperti itu namanya ambang batas, dan kita biasanya baru menyadarinya setelah terlewat.",
    karakter: {
      judul: "Kamu salah satu dari yang delapan",
      aksi: "Sampah di sungai datang dari banyak orang, sedikit-sedikit. Berkurangnya juga begitu. Hari ini, bawa pulang bungkus jajanmu sendiri dan buang di tempat sampah rumah.",
    },
  },

  {
    id: "activity-3-4",
    worldId: "world-3",
    worldNumber: 3,
    nomor: 4,
    judul: "Kecambah di Penggaris",
    keterampilan: "predict",
    tujuan: "Kamu akan mengukur pertumbuhan tetap, lalu memprediksi tinggi di hari yang belum tiba.",
    pemantik: "Kecambah tumbuh 2 cm setiap hari. Tanpa menunggu, bagaimana kamu tahu tingginya di hari keenam?",
    eksplorasi: {
      ajakan: "Ketuk isi pot percobaan ini.",
      benda: [
        { spesimen: "biji", label: "Biji kacang hijau", catatan: "Di dalamnya ada cadangan makanan untuk tumbuh." },
        { spesimen: "tunas", label: "Kecambah", catatan: "Biji yang mulai tumbuh. Batangnya memanjang tiap hari." },
        { spesimen: "gelas-ukur", label: "Penggaris", catatan: "Alat untuk mengukur tinggi dengan angka, bukan kira-kira." },
        { spesimen: "tetes-air", label: "Air", catatan: "Membangunkan biji yang sedang tidur." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum mengukur: bagaimana caramu menebak tinggi hari keenam?",
      pilihan: [
        { id: "p1", label: "Tambah 2 cm untuk tiap hari", spesimen: "gelas-ukur" },
        { id: "p2", label: "Kalikan tinggi hari pertama dengan enam", spesimen: "tunas" },
        { id: "p3", label: "Tunggu sampai hari keenam", spesimen: "biji" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "garis-bilangan",
      perintah: "Geser penanda ke tinggi kecambah pada hari ke-6.",
      spesimen: "tunas",
      satuan: "cm",
      mulai: 0,
      langkah: 2,
      teramati: 3,
      target: 6,
      maks: 16,
      namaLangkah: "hari",
      petunjuk: [
        "Lihat tiga hari yang sudah diukur. Berapa tambahnya tiap hari?",
        "Setiap hari tambah 2 cm. Hari ke-3 sudah 6 cm.",
        "Dari hari ke-3 ke hari ke-6 ada 3 hari lagi. Tambahkan 2 cm sebanyak tiga kali.",
      ],
    },
    refleksi: {
      pertanyaan: "Bagaimana kamu sampai ke angkanya?",
      pilihan: [
        { id: "r1", label: "Kutambah 2 berulang-ulang", spesimen: "tunas" },
        { id: "r2", label: "Kulanjutkan lompatannya di penggaris", spesimen: "gelas-ukur" },
        { id: "r3", label: "Kuhitung 6 kali 2", spesimen: "biji" },
      ],
    },
    penguatan:
      "Menambah 2 berulang kali sama dengan mengalikan dengan 2. Karena tambahannya selalu sama, lompatannya di penggaris berjarak sama juga, itulah kenapa kamu bisa melompat langsung ke hari ke-6 tanpa melewati hari ke-4 dan ke-5.",
    karakter: {
      judul: "Tanam yang bisa kamu makan",
      aksi: "Rendam segenggam kacang hijau semalam, lalu taruh di kapas basah. Ukur tiap hari. Dalam seminggu kamu punya kecambah, dan data pertamamu.",
    },
  },

  {
    id: "activity-3-5",
    worldId: "world-3",
    worldNumber: 3,
    nomor: 5,
    judul: "Dua Tuas Sekaligus",
    keterampilan: "predict",
    tujuan: "Kamu akan mencari tahu bagaimana dua hal bekerja bersama-sama, bukan sendiri-sendiri.",
    pemantik: "Tanaman butuh matahari dan air. Kalau salah satunya nol, apakah yang satunya masih ada gunanya?",
    eksplorasi: {
      ajakan: "Ketuk keduanya sebelum masuk lab.",
      benda: [
        { spesimen: "matahari", label: "Matahari", catatan: "Daun memakai cahaya untuk membuat makanan sendiri." },
        { spesimen: "tetes-air", label: "Air", catatan: "Bahan yang diolah daun bersama cahaya." },
        { spesimen: "daun-hijau", label: "Daun", catatan: "Dapurnya tanaman. Di sinilah cahaya dan air diolah." },
        { spesimen: "tanaman-layu", label: "Tanaman layu", catatan: "Tanda ada yang kurang, tapi belum tentu tahu yang mana." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum ke lab: air banyak tapi matahari nol. Bagaimana hasilnya?",
      pilihan: [
        { id: "p1", label: "Tetap tumbuh, air sudah cukup", spesimen: "tetes-air" },
        { id: "p2", label: "Tidak tumbuh, dua-duanya wajib ada", spesimen: "matahari" },
        { id: "p3", label: "Tumbuh pelan-pelan saja", spesimen: "tunas" },
      ],
      sesuaiId: "p2",
    },
    tantangan: {
      kind: "lab-simulasi",
      perintah: "Coba berbagai gabungan cahaya dan air.",
      variabel: [
        { id: "cahaya", nama: "Matahari per hari", min: 0, max: 10, awal: 0, satuan: "jam", spesimen: "matahari" },
        { id: "air", nama: "Air per minggu", min: 0, max: 8, awal: 0, satuan: "gelas", spesimen: "tetes-air" },
      ],
      keadaan: [
        { id: "mati", nama: "Tidak tumbuh", spesimen: "biji", keterangan: "Salah satu bahan tidak ada sama sekali." },
        { id: "kurus", nama: "Kurus dan pucat", spesimen: "tanaman-layu", keterangan: "Ada keduanya, tapi salah satu terlalu sedikit." },
        { id: "subur", nama: "Subur", spesimen: "tanaman-subur", keterangan: "Cahaya dan air sama-sama cukup." },
        { id: "gosong", nama: "Daun gosong", spesimen: "daun-kering", keterangan: "Cahaya terlalu terik dan air tak cukup mengimbangi." },
      ],
      aturan: [
        { syarat: { cahaya: [0, 0] }, keadaanId: "mati" },
        { syarat: { air: [0, 0] }, keadaanId: "mati" },
        { syarat: { cahaya: [9, 10], air: [1, 3] }, keadaanId: "gosong" },
        { syarat: { cahaya: [4, 8], air: [4, 6] }, keadaanId: "subur" },
        { keadaanId: "kurus" },
      ],
      ujian: {
        kondisi: { cahaya: 6, air: 5 },
        pertanyaan: "Matahari 6 jam sehari, air 5 gelas seminggu. Bagaimana tanamannya?",
      },
      petunjuk: [
        "Tahan satu tuas di tempat, geser tuas yang lain. Itu cara ilmuwan menguji satu hal.",
        "Coba nol-kan salah satu tuas. Perhatikan: yang satunya jadi tidak berpengaruh sama sekali.",
        "Untuk subur, keduanya harus di daerah tengah, bukan ujung.",
      ],
    },
    refleksi: {
      pertanyaan: "Cara mencoba mana yang paling menolong?",
      pilihan: [
        { id: "r1", label: "Menggeser satu tuas saja tiap kali", spesimen: "gelas-ukur" },
        { id: "r2", label: "Mencoba yang ekstrem dulu", spesimen: "matahari" },
        { id: "r3", label: "Mencoba acak sampai ketemu", spesimen: "angin" },
      ],
    },
    penguatan:
      "Kalau salah satu bahan nol, hasilnya nol, sebanyak apa pun bahan yang lain. Dan untuk menguji dua hal, ubah satu saja setiap kali. Kalau dua-duanya digeser bersamaan, kamu tidak akan tahu mana yang menyebabkan perubahan.",
    karakter: {
      judul: "Cari tempat yang pas",
      aksi: "Sebelum menaruh pot, perhatikan halaman selama sehari: bagian mana yang kena matahari pagi tapi teduh saat siang? Di situ tempat terbaiknya.",
    },
  },
];

/* ══ DUNIA 4 · Ilmuwan Cilik Peduli Bumi ══════════════════════════ */

const DUNIA_4: Aktivitas[] = [
  {
    id: "activity-4-1",
    worldId: "world-4",
    worldNumber: 4,
    nomor: 1,
    judul: "Kompos untuk Pot Budi",
    keterampilan: "conclude",
    tujuan: "Kamu akan menghitung berapa banyak yang bisa dibuat dari bahan yang terbatas.",
    pemantik: "Bahan Budi ada tiga macam, jumlahnya berbeda-beda. Yang mana yang menentukan berapa pot jadinya?",
    eksplorasi: {
      ajakan: "Ketuk tiap bahan. Baca kegunaannya.",
      benda: [
        { spesimen: "cangkang-telur", label: "Cangkang telur", catatan: "Ditumbuk halus. Memberi kapur supaya tanah tidak terlalu asam." },
        { spesimen: "air", label: "Air cucian beras", catatan: "Mengandung sisa pati. Bakteri baik memakannya." },
        { spesimen: "daun-kering", label: "Daun kering", catatan: "Bagian cokelat. Membuat kompos tidak becek dan tidak bau." },
        { spesimen: "kompos", label: "Kompos jadi", catatan: "Hasil akhirnya: gembur, cokelat, dan berbau seperti tanah hujan." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum menghitung: menurutmu berapa pot yang jadi?",
      pilihan: [
        { id: "p1", label: "2 pot", spesimen: "pot" },
        { id: "p2", label: "3 pot", spesimen: "pot-isi" },
        { id: "p3", label: "Belum tahu, mau menakar dulu", spesimen: "gelas-ukur" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "lab-takar",
      perintah: "Seret bahan ke pot. Isi sebanyak yang bisa kamu buat.",
      cerita:
        "Untuk membuat kompos satu pot, Budi butuh 3 cangkang telur, 1 liter air cucian beras, dan 200 gram daun kering. Budi punya 7 cangkang telur, 3 liter air cucian beras, dan 400 gram daun kering.",
      unitNama: "pot",
      unitSpesimen: "pot",
      resep: [
        { bahanId: "cangkang", jumlah: 3 },
        { bahanId: "air", jumlah: 1 },
        { bahanId: "daun", jumlah: 200 },
      ],
      bahan: [
        { id: "cangkang", nama: "Cangkang telur", spesimen: "cangkang-telur", tersedia: 7, satuan: "buah" },
        { id: "air", nama: "Air cucian beras", spesimen: "air", tersedia: 3, satuan: "liter" },
        { id: "daun", nama: "Daun kering", spesimen: "daun-kering", tersedia: 400, satuan: "gram" },
      ],
      jawaban: 2,
      petunjuk: [
        "Kerjakan satu bahan dulu. Cangkang telurnya cukup untuk berapa pot?",
        "Cangkang cukup untuk 2 pot. Air cukup untuk 3 pot. Daun cukup untuk 2 pot.",
        "Satu pot butuh ketiga bahan lengkap. Jadi yang menentukan adalah bahan yang paling cepat habis.",
      ],
    },
    refleksi: {
      pertanyaan: "Kenapa hasilnya bukan 3 pot?",
      pilihan: [
        { id: "r1", label: "Cangkang telurnya habis duluan", spesimen: "cangkang-telur" },
        { id: "r2", label: "Satu pot harus lengkap ketiga bahannya", spesimen: "pot-isi" },
        { id: "r3", label: "Airnya justru berlebih", spesimen: "air" },
      ],
    },
    penguatan:
      "Yang menentukan hasil bukan bahan yang paling banyak, tapi bahan yang paling cepat habis. Air Budi cukup untuk 3 pot, tapi cangkangnya hanya untuk 2, jadi jadinya 2. Sisa 1 liter air tidak berguna tanpa cangkang.",
    karakter: {
      judul: "Air cucian beras jangan dibuang",
      aksi: "Besok saat mencuci beras, tampung airnya di ember. Siramkan ke tanaman. Gratis, dan tanamannya suka.",
    },
  },

  {
    id: "activity-4-2",
    worldId: "world-4",
    worldNumber: 4,
    nomor: 2,
    judul: "Timbangan Kompos",
    keterampilan: "conclude",
    tujuan: "Kamu akan membuat dua sisi timbangan menjadi sama berat.",
    pemantik: "Timbangan miring ke kiri. Berapa yang harus ditambahkan di kanan supaya lurus?",
    eksplorasi: {
      ajakan: "Ketuk alat dan bahannya.",
      benda: [
        { spesimen: "timbangan", label: "Timbangan", catatan: "Lurus artinya kedua sisi sama berat. Bukan sama banyak." },
        { spesimen: "daun-kering", label: "Daun kering", catatan: "Segenggam daun kering beratnya sekitar 100 gram." },
        { spesimen: "cangkang-telur", label: "Cangkang telur", catatan: "Satu cangkang sekitar 50 gram setelah kering." },
        { spesimen: "sekop", label: "Sekop", catatan: "Untuk mengaduk agar bahan tercampur rata." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum menimbang: sisi kanan butuh lebih banyak benda atau lebih sedikit?",
      pilihan: [
        { id: "p1", label: "Lebih banyak, karena satuannya lebih ringan", spesimen: "cangkang-telur" },
        { id: "p2", label: "Lebih sedikit", spesimen: "daun-kering" },
        { id: "p3", label: "Sama banyak", spesimen: "timbangan" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "timbang",
      perintah: "Tambahkan cangkang telur di kanan sampai timbangannya lurus.",
      kiri: { spesimen: "daun-kering", nama: "Daun kering", jumlah: 4, satuan: 100 },
      kanan: { spesimen: "cangkang-telur", nama: "Cangkang telur", satuan: 50 },
      jawaban: 8,
      petunjuk: [
        "Hitung dulu berat sisi kiri seluruhnya.",
        "Sisi kiri 4 × 100 gram = 400 gram. Satu cangkang 50 gram.",
        "Berapa kali 50 gram supaya jadi 400 gram? Coba tambahkan satu-satu sambil melihat timbangannya.",
      ],
    },
    refleksi: {
      pertanyaan: "Apa yang kamu perhatikan?",
      pilihan: [
        { id: "r1", label: "Jumlahnya beda, tapi beratnya sama", spesimen: "timbangan" },
        { id: "r2", label: "Yang ringan perlu lebih banyak", spesimen: "cangkang-telur" },
        { id: "r3", label: "Aku tambah satu-satu sampai lurus", spesimen: "sekop" },
      ],
    },
    penguatan:
      "Sama berat tidak sama dengan sama banyak. 4 benda bisa setara dengan 8 benda kalau yang satu dua kali lebih berat. Timbangan yang lurus adalah tanda 'sama dengan', sisi kiri dan kanan bernilai sama, walau bentuknya berbeda.",
    karakter: {
      judul: "Kompos butuh takaran",
      aksi: "Kompos yang baik butuh bagian cokelat (daun kering) lebih banyak daripada bagian hijau (sisa sayur). Kalau bau, tambahkan daun kering.",
    },
  },

  {
    id: "activity-4-3",
    worldId: "world-4",
    worldNumber: 4,
    nomor: 3,
    judul: "Pupuk Cair dari Kulit Pisang",
    keterampilan: "conclude",
    tujuan: "Kamu akan menakar lagi dengan resep berbeda, dan memeriksa bahan mana yang membatasi.",
    pemantik: "Kali ini bahannya cuma dua. Apakah caranya masih sama seperti di pot kompos?",
    eksplorasi: {
      ajakan: "Ketuk bahan pupuk cair ini.",
      benda: [
        { spesimen: "kulit-pisang", label: "Kulit pisang", catatan: "Kaya kalium. Membantu tanaman berbunga dan berbuah." },
        { spesimen: "air", label: "Air", catatan: "Merendam kulit pisang supaya zatnya keluar." },
        { spesimen: "botol-plastik", label: "Botol bekas", catatan: "Wadah rendaman. Sekali ini plastik jadi berguna lagi." },
        { spesimen: "gelas-ukur", label: "Gelas ukur", catatan: "500 ml sama dengan setengah liter." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum menakar: bahan mana yang akan habis duluan?",
      pilihan: [
        { id: "p1", label: "Kulit pisang", spesimen: "kulit-pisang" },
        { id: "p2", label: "Air", spesimen: "air" },
        { id: "p3", label: "Dua-duanya habis bersamaan", spesimen: "gelas-ukur" },
      ],
      sesuaiId: "p3",
    },
    tantangan: {
      kind: "lab-takar",
      perintah: "Seret bahan ke botol. Buat sebanyak yang bisa.",
      cerita:
        "Satu botol pupuk cair butuh 2 kulit pisang dan 500 ml air. Di dapur ada 9 kulit pisang dan 2.000 ml air.",
      unitNama: "botol",
      unitSpesimen: "botol-plastik",
      resep: [
        { bahanId: "kulit", jumlah: 2 },
        { bahanId: "air", jumlah: 500 },
      ],
      bahan: [
        { id: "kulit", nama: "Kulit pisang", spesimen: "kulit-pisang", tersedia: 9, satuan: "buah" },
        { id: "air", nama: "Air", spesimen: "air", tersedia: 2000, satuan: "ml" },
      ],
      jawaban: 4,
      petunjuk: [
        "Periksa bahannya satu per satu, sama seperti waktu membuat kompos.",
        "9 kulit pisang cukup untuk 4 botol, dan tersisa 1. Air 2.000 ml cukup untuk tepat 4 botol.",
        "Keduanya sama-sama berhenti di 4. Sisa satu kulit pisang tidak bisa jadi botol kelima.",
      ],
    },
    refleksi: {
      pertanyaan: "Sisa satu kulit pisang itu bagaimana?",
      pilihan: [
        { id: "r1", label: "Tidak cukup, satu botol butuh dua", spesimen: "kulit-pisang" },
        { id: "r2", label: "Simpan saja untuk kompos", spesimen: "kompos" },
        { id: "r3", label: "Tambah air lagi supaya jadi 5 botol", spesimen: "air" },
      ],
    },
    penguatan:
      "Cara berpikirnya sama persis dengan pot kompos, walaupun bahan dan angkanya berbeda. Bagi tiap bahan dengan kebutuhannya, lalu ambil hasil yang paling kecil. Sisa yang tidak cukup untuk satu unit penuh tidak dihitung.",
    karakter: {
      judul: "Sisa dapur, bukan sampah dapur",
      aksi: "Kulit pisang, kulit jeruk, dan ampas kopi semuanya masih berguna. Sebelum membuang, tanya dulu: ini bisa jadi apa?",
    },
  },

  {
    id: "activity-4-4",
    worldId: "world-4",
    worldNumber: 4,
    nomor: 4,
    judul: "Bak Kompos yang Pas",
    keterampilan: "conclude",
    tujuan: "Kamu akan mencari perbandingan yang tepat antara dua bahan.",
    pemantik: "Kompos yang bau dan kompos yang kering sama-sama gagal. Apa yang membedakan keduanya dari yang berhasil?",
    eksplorasi: {
      ajakan: "Ketuk isi bak kompos.",
      benda: [
        { spesimen: "sisa-sayur", label: "Bagian hijau", catatan: "Sisa sayur dan kulit buah. Basah dan cepat busuk." },
        { spesimen: "daun-kering", label: "Bagian cokelat", catatan: "Daun kering dan kardus sobek. Kering dan berongga." },
        { spesimen: "cacing", label: "Cacing", catatan: "Pekerja utamanya. Butuh udara di sela-sela bahan." },
        { spesimen: "kompos", label: "Kompos jadi", catatan: "Gembur, cokelat gelap, baunya seperti tanah setelah hujan." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum ke lab: kompos jadi bau kalau apa?",
      pilihan: [
        { id: "p1", label: "Terlalu banyak bagian hijau", spesimen: "sisa-sayur" },
        { id: "p2", label: "Terlalu banyak bagian cokelat", spesimen: "daun-kering" },
        { id: "p3", label: "Terlalu banyak cacing", spesimen: "cacing" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "lab-simulasi",
      perintah: "Atur takaran kedua bahan. Cari yang menghasilkan kompos bagus.",
      variabel: [
        { id: "hijau", nama: "Bagian hijau", min: 0, max: 6, awal: 3, satuan: "ember", spesimen: "sisa-sayur" },
        { id: "cokelat", nama: "Bagian cokelat", min: 0, max: 12, awal: 3, satuan: "ember", spesimen: "daun-kering" },
      ],
      keadaan: [
        { id: "becek", nama: "Becek dan bau", spesimen: "sisa-sayur", keterangan: "Terlalu banyak hijau. Tidak ada rongga udara, jadi busuk." },
        { id: "bagus", nama: "Kompos bagus", spesimen: "kompos", keterangan: "Perbandingannya pas. Cacing bekerja, tidak bau." },
        { id: "kering", nama: "Kering, tidak berubah", spesimen: "daun-kering", keterangan: "Terlalu banyak cokelat. Tidak ada makanan untuk bakteri." },
      ],
      aturan: [
        { syarat: { hijau: [0, 0] }, keadaanId: "kering" },
        { syarat: { cokelat: [0, 1] }, keadaanId: "becek" },
        { syarat: { hijau: [2, 3], cokelat: [4, 9] }, keadaanId: "bagus" },
        { syarat: { hijau: [4, 6], cokelat: [8, 12] }, keadaanId: "bagus" },
        { syarat: { hijau: [4, 6], cokelat: [2, 7] }, keadaanId: "becek" },
        { keadaanId: "kering" },
      ],
      ujian: {
        kondisi: { hijau: 2, cokelat: 6 },
        pertanyaan: "2 ember hijau dan 6 ember cokelat. Hasilnya apa?",
      },
      petunjuk: [
        "Coba yang ekstrem dulu: semua hijau tanpa cokelat, lalu sebaliknya.",
        "Kompos bagus selalu butuh bagian cokelat lebih banyak daripada hijau.",
        "Bandingkan angkanya: 2 hijau berbanding 6 cokelat. Cokelatnya tiga kali lipat.",
      ],
    },
    refleksi: {
      pertanyaan: "Apa aturan yang kamu temukan?",
      pilihan: [
        { id: "r1", label: "Cokelat harus lebih banyak dari hijau", spesimen: "daun-kering" },
        { id: "r2", label: "Yang penting perbandingannya, bukan jumlahnya", spesimen: "kompos" },
        { id: "r3", label: "Dua-duanya harus ada, tidak boleh nol", spesimen: "cacing" },
      ],
    },
    penguatan:
      "Yang menentukan bukan berapa embernya, tapi perbandingannya. 2 berbanding 6 dan 4 berbanding 12 sama-sama berhasil, karena perbandingannya sama: satu banding tiga. Perbandingan adalah cara membandingkan dua jumlah sekaligus.",
    karakter: {
      judul: "Bak kompos di rumah",
      aksi: "Ember bekas cat yang dilubangi bawahnya sudah cukup untuk mulai. Isi berselang-seling: sisa sayur, lalu daun kering, ulangi. Aduk seminggu sekali.",
    },
  },

  {
    id: "activity-4-5",
    worldId: "world-4",
    worldNumber: 4,
    nomor: 5,
    judul: "Bedeng Kebun Sekolah",
    keterampilan: "conclude",
    tujuan: "Kamu akan memakai semua yang sudah kamu pelajari untuk merencanakan kebun sungguhan.",
    pemantik: "Bahannya tiga macam dan jumlahnya banyak. Apakah caranya masih sama seperti waktu bahannya sedikit?",
    eksplorasi: {
      ajakan: "Ketuk isi gudang kebun.",
      benda: [
        { spesimen: "tunas", label: "Bibit", catatan: "Ditanam berjarak supaya akarnya tidak berebut." },
        { spesimen: "kompos", label: "Kompos", catatan: "Dicampur ke tanah sebelum menanam." },
        { spesimen: "ember", label: "Air", catatan: "Disiram pagi, sebelum matahari terlalu tinggi." },
        { spesimen: "sekop", label: "Sekop", catatan: "Untuk menggemburkan tanah bedeng." },
      ],
    },
    prediksi: {
      pertanyaan: "Sebelum menghitung: menurutmu berapa bedeng yang jadi?",
      pilihan: [
        { id: "p1", label: "3 bedeng", spesimen: "tunas" },
        { id: "p2", label: "4 bedeng", spesimen: "kompos" },
        { id: "p3", label: "7 bedeng", spesimen: "ember" },
      ],
      sesuaiId: "p1",
    },
    tantangan: {
      kind: "lab-takar",
      perintah: "Isi bedeng sebanyak yang sanggup dibuat gudang ini.",
      cerita:
        "Satu bedeng kebun sekolah butuh 6 bibit, 3 kg kompos, dan 4 liter air. Di gudang tersedia 20 bibit, 12 kg kompos, dan 30 liter air.",
      unitNama: "bedeng",
      unitSpesimen: "tanah",
      resep: [
        { bahanId: "bibit", jumlah: 6 },
        { bahanId: "kompos", jumlah: 3 },
        { bahanId: "air", jumlah: 4 },
      ],
      bahan: [
        { id: "bibit", nama: "Bibit", spesimen: "tunas", tersedia: 20, satuan: "batang" },
        { id: "kompos", nama: "Kompos", spesimen: "kompos", tersedia: 12, satuan: "kg" },
        { id: "air", nama: "Air", spesimen: "ember", tersedia: 30, satuan: "liter" },
      ],
      jawaban: 3,
      petunjuk: [
        "Periksa ketiganya satu per satu, seperti biasa.",
        "Bibit cukup untuk 3 bedeng (sisa 2). Kompos cukup untuk 4. Air cukup untuk 7.",
        "Ambil yang paling kecil dari ketiganya.",
      ],
    },
    refleksi: {
      pertanyaan: "Kalau mau menambah satu bedeng lagi, apa yang paling kamu butuhkan?",
      pilihan: [
        { id: "r1", label: "Bibit, itu yang paling cepat habis", spesimen: "tunas" },
        { id: "r2", label: "Kompos", spesimen: "kompos" },
        { id: "r3", label: "Air, biar aman", spesimen: "ember" },
      ],
    },
    penguatan:
      "Angkanya berubah, caranya tetap: bagi tiap bahan dengan kebutuhannya, ambil yang paling kecil. Kamu juga jadi tahu apa yang harus ditambah kalau mau lebih banyak, bukan bahan yang berlebih, tapi bahan yang paling cepat habis.",
    karakter: {
      judul: "Kebun kecil, mulai dari sini",
      aksi: "Satu bedeng cukup untuk mulai. Ajak dua teman, minta izin gurumu, dan pilih pojok halaman yang kena matahari pagi.",
    },
  },
];

/* ── Kumpulan & pencarian ──────────────────────────────────────── */

export const SEMUA_AKTIVITAS: Aktivitas[] = [...DUNIA_1, ...DUNIA_2, ...DUNIA_3, ...DUNIA_4];

const PETA = new Map(SEMUA_AKTIVITAS.map((a) => [a.id, a]));

export function getAktivitas(id: string): Aktivitas | undefined {
  return PETA.get(id);
}

export function aktivitasDunia(worldId: string): Aktivitas[] {
  return SEMUA_AKTIVITAS.filter((a) => a.worldId === worldId).sort((a, b) => a.nomor - b.nomor);
}
