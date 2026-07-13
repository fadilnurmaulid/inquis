/**
 * Activity definitions — all 20 activities across 4 worlds.
 * Each activity follows: explore → observe → reflect inquiry cycle.
 */

import type { ActivityDefinition } from "./types";

function w1(
  n: number,
  title: string,
  instruction: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  hints: [string, string, string],
  ecoReflection: string,
  reflection?: {
    question: string;
    options: { id: string; emoji: string; label: string }[];
  }
): ActivityDefinition {
  return {
    activityId: `activity-1-${n}`,
    worldId: "world-1",
    worldNumber: 1,
    activityNumber: n,
    title,
    instruction,
    companionIntro: `Hai! Aku Pola 🦋 Ayo amati ${title.toLowerCase()}, seperti anak yang sayang alam!`,
    companionEncourage: "Bagus! Mengamati alam dengan teliti adalah cara pertama untuk mencintainya!",
    explorePrompt: "Ketuk benda-benda ini untuk melihatnya lebih dekat!",
    exploreItems: options.map((o) => ({
      id: o.id,
      emoji: o.emoji,
      label: o.label ?? "",
      color: o.color,
    })),
    challengeType: n === 2 || n === 5 ? "sequence" : "pick-one",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints,
    reflectionQuestion: reflection?.question ?? "Apa yang kamu perhatikan?",
    reflectionOptions: reflection?.options ?? [
      { id: "r1", emoji: "👀", label: "Ada pola yang berulang" },
      { id: "r2", emoji: "🎨", label: "Warnanya sama-sama" },
      { id: "r3", emoji: "🔍", label: "Bentuknya mirip" },
    ],
    primarySkill: "observe",
    ecoReflection,
  };
}

const WORLD_1: ActivityDefinition[] = [
  w1(
    1,
    "Temukan Daun Kembar",
    "Amati daun-daun ini. Mana yang sama?",
    "Coba cari daun yang sama persis dengan yang di tengah, ya!",
    [
      { id: "a", emoji: "🍁", label: "Daun Maple" },
      { id: "b", emoji: "🍃", label: "Daun Hijau", isCorrect: true },
      { id: "c", emoji: "🍂", label: "Daun Kering" },
      { id: "d", emoji: "🍃", label: "Daun Hijau", isCorrect: true },
    ],
    "d",
    ["Lihat bentuk daunnya dengan teliti!", "Yang sama adalah daun hijau 🍃", "Ketuk daun hijau di kanan!"],
    "Setiap daun punya bentuk yang khas. Dengan mengenali bentuk daun, kita bisa tahu jenis tumbuhan dan cara merawatnya dengan tepat.",
    {
      question: "Kenapa penting untuk mengenali jenis daun di sekitar kita?",
      options: [
        { id: "r1", emoji: "🍃", label: "Supaya tahu cara merawat tanaman itu" },
        { id: "r2", emoji: "🎨", label: "Aku suka lihat bentuknya saja" },
        { id: "r3", emoji: "👀", label: "Aku tebak dari ukurannya" },
      ],
    }
  ),
  w1(
    2,
    "Lanjutkan Pola Bunga",
    "Amati urutan bunga ini!",
    "Bunga apa yang selanjutnya?",
    [
      { id: "a", emoji: "🌸", label: "Bunga Sakura" },
      { id: "b", emoji: "🌻", label: "Bunga Matahari", isCorrect: true },
      { id: "c", emoji: "🌷", label: "Tulip" },
    ],
    "b",
    ["Pola: sakura, matahari, sakura, matahari...", "Setelah sakura selalu bunga matahari!", "Pilih bunga matahari 🌻"],
    "Bunga tumbuh dengan pola yang teratur agar bisa menarik lebah dan kupu-kupu. Menjaga bunga di sekitar rumah membantu para penyerbuk ini tetap ada.",
    {
      question: "Kenapa kita perlu menjaga bunga-bunga di sekitar kita?",
      options: [
        { id: "r1", emoji: "🐝", label: "Supaya lebah dan kupu-kupu punya makanan" },
        { id: "r2", emoji: "🔁", label: "Aku lihat urutannya berulang, jadi menarik" },
        { id: "r3", emoji: "🎯", label: "Aku coba-coba saja" },
      ],
    }
  ),
  w1(
    3,
    "Cari Jejak yang Berbeda",
    "Satu jejak kaki berbeda dari yang lain!",
    "Coba temukan jejak yang beda sendiri dari yang lain!",
    [
      { id: "a", emoji: "🐾", label: "Jejak Hewan" },
      { id: "b", emoji: "🐾", label: "Jejak Hewan" },
      { id: "c", emoji: "🦶", label: "Jejak Manusia", isCorrect: true },
      { id: "d", emoji: "🐾", label: "Jejak Hewan" },
    ],
    "c",
    ["Hitung jejak yang sama...", "Tiga jejak hewan, satu jejak manusia!", "Ketuk jejak manusia 🦶"],
    "Mengamati jejak kaki membantu kita mengenali hewan apa saja yang tinggal di sekitar kita, tanpa perlu mengganggu mereka.",
    {
      question: "Kenapa kita sebaiknya tidak mengganggu hewan liar di alam?",
      options: [
        { id: "r1", emoji: "🐾", label: "Supaya mereka tetap aman di rumahnya" },
        { id: "r2", emoji: "👣", label: "Aku hanya suka mengamati jejaknya" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu alasannya" },
      ],
    }
  ),
  w1(
    4,
    "Pola Warna Alam",
    "Warna-warna daun ini membentuk pola!",
    "Warna apa yang melengkapi pola?",
    [
      { id: "a", emoji: "🟢", label: "Hijau", isCorrect: true },
      { id: "b", emoji: "🟤", label: "Cokelat" },
      { id: "c", emoji: "🟣", label: "Ungu" },
    ],
    "a",
    ["Pola: hijau, cokelat, hijau, cokelat...", "Setelah cokelat selalu hijau!", "Pilih hijau 🟢"],
    "Daun berwarna hijau karena mengandung klorofil, yang membantu tumbuhan membuat makanan dari sinar matahari sekaligus menghasilkan udara segar untuk kita.",
    {
      question: "Kenapa tumbuhan hijau penting untuk kita?",
      options: [
        { id: "r1", emoji: "🌬️", label: "Tumbuhan menghasilkan udara segar" },
        { id: "r2", emoji: "🔁", label: "Warnanya berganti-gantian teratur" },
        { id: "r3", emoji: "☀️", label: "Aku ingat daun butuh matahari" },
      ],
    }
  ),
  w1(
    5,
    "Pola Pertumbuhan",
    "Tahap tumbuhnya tanaman punya urutan!",
    "Tahap apa selanjutnya?",
    [
      { id: "a", emoji: "🌳", label: "Pohon Besar", isCorrect: true },
      { id: "b", emoji: "🌰", label: "Biji" },
      { id: "c", emoji: "🌱", label: "Tunas" },
    ],
    "a",
    ["Pola: biji, tunas, pohon besar...", "Setelah tunas selalu tumbuh menjadi pohon besar!", "Pilih pohon besar 🌳"],
    "Tumbuhan tumbuh melalui tahapan yang teratur, dari biji, tunas, hingga menjadi pohon besar. Merawatnya sejak biji adalah cara nyata menjaga bumi.",
    {
      question: "Kalau kamu menanam biji hari ini, apa yang perlu kamu lakukan?",
      options: [
        { id: "r1", emoji: "💧", label: "Merawatnya dengan sabar setiap hari" },
        { id: "r2", emoji: "🌱", label: "Aku pernah lihat tanaman tumbuh" },
        { id: "r3", emoji: "💭", label: "Aku tebak dari urutannya" },
      ],
    }
  ),
];

function w2(
  n: number,
  title: string,
  instruction: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string,
  reflection?: {
    question: string;
    options: { id: string; emoji: string; label: string }[];
  }
): ActivityDefinition {
  return {
    activityId: `activity-2-${n}`,
    worldId: "world-2",
    worldNumber: 2,
    activityNumber: n,
    title,
    instruction,
    companionIntro: `Hai! Aku Sori 🐢 Ayo urutkan ${title.toLowerCase()}!`,
    companionEncourage: "Hebat! Kamu pandai mengelompokkan!",
    explorePrompt: "Ketuk dan amati benda-benda ini!",
    exploreItems: options.map((o) => ({ id: o.id, emoji: o.emoji, label: o.label ?? "" })),
    challengeType: "pick-one",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints: ["Amati ukuran dan bentuknya!", "Kelompokkan yang mirip!", "Pilih jawaban yang tepat!"],
    reflectionQuestion: reflection?.question ?? "Bagaimana kamu mengelompokkannya?",
    reflectionOptions: reflection?.options ?? [
      { id: "r1", emoji: "📏", label: "Menurut ukuran" },
      { id: "r2", emoji: "🎨", label: "Menurut warna" },
      { id: "r3", emoji: "🔷", label: "Menurut bentuk" },
    ],
    primarySkill: "observe",
    ecoReflection,
  };
}

const WORLD_2: ActivityDefinition[] = [
  w2(
    1,
    "Pilah Sampah Organik",
    "Amati jenis sampah ini!",
    "Menurutmu, mana ya yang termasuk sampah organik?",
    [
      { id: "a", emoji: "🍌", label: "Kulit Pisang", isCorrect: true },
      { id: "b", emoji: "🥤", label: "Botol Plastik" },
      { id: "c", emoji: "🥫", label: "Kaleng" },
    ],
    "a",
    "Sampah organik seperti kulit buah bisa terurai secara alami dan diolah menjadi pupuk kompos.",
    {
      question: "Apa bedanya sampah organik dengan yang lain?",
      options: [
        { id: "r1", emoji: "🍌", label: "Berasal dari makhluk hidup" },
        { id: "r2", emoji: "🌱", label: "Bisa membusuk secara alami" },
        { id: "r3", emoji: "🤷", label: "Aku belum yakin, tebak saja" },
      ],
    }
  ),
  w2(
    2,
    "Kelompokkan Sampah Daur Ulang",
    "Benda-benda ini bisa didaur ulang atau tidak!",
    "Coba tebak, mana yang bisa kita daur ulang?",
    [
      { id: "a", emoji: "📦", label: "Kardus", isCorrect: true },
      { id: "b", emoji: "🍎", label: "Sisa Buah" },
      { id: "c", emoji: "🍂", label: "Daun Kering" },
    ],
    "a",
    "Kardus dan kertas termasuk sampah yang bisa didaur ulang menjadi barang baru, sehingga mengurangi sampah menumpuk.",
    {
      question: "Kenapa kardus bisa didaur ulang, ya?",
      options: [
        { id: "r1", emoji: "📦", label: "Bahannya bisa diolah jadi baru" },
        { id: "r2", emoji: "♻️", label: "Aku sering lihat orang mendaur ulang kertas" },
        { id: "r3", emoji: "💭", label: "Aku menebak dari bentuknya" },
      ],
    }
  ),
  w2(
    3,
    "Makhluk Hidup dan Tak Hidup",
    "Semua makhluk hidup butuh perawatan dan kasih sayang kita!",
    "Menurutmu, mana yang termasuk makhluk hidup dan perlu kita jaga?",
    [
      { id: "a", emoji: "🐦", label: "Burung", isCorrect: true },
      { id: "b", emoji: "🪨", label: "Batu" },
      { id: "c", emoji: "🧱", label: "Bata" },
    ],
    "a",
    "Makhluk hidup seperti burung bisa bernapas, bergerak, dan tumbuh. Karena itu, mereka butuh makanan, air, dan tempat tinggal yang aman dari kita.",
    {
      question: "Apa yang bisa kita lakukan untuk makhluk hidup di sekitar kita?",
      options: [
        { id: "r1", emoji: "🐦", label: "Menjaga rumah dan makanannya tetap ada" },
        { id: "r2", emoji: "🪨", label: "Batu tidak butuh dijaga seperti ini" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu caranya" },
      ],
    }
  ),
  w2(
    4,
    "Urutkan Tinggi Pohon",
    "Pohon besar sudah tumbuh puluhan tahun, kita perlu menjaganya!",
    "Coba tunjuk pohon yang paling tinggi, ya!",
    [
      { id: "a", emoji: "🌱", label: "Tunas" },
      { id: "b", emoji: "🌳", label: "Pohon Dewasa", isCorrect: true },
      { id: "c", emoji: "🌿", label: "Semak" },
    ],
    "b",
    "Pohon dewasa yang tinggi memberi banyak oksigen dan tempat berteduh bagi hewan serta manusia.",
    {
      question: "Kenapa pohon dewasa itu penting untuk lingkungan?",
      options: [
        { id: "r1", emoji: "🌳", label: "Memberi udara segar untuk kita" },
        { id: "r2", emoji: "🐿️", label: "Jadi rumah untuk hewan" },
        { id: "r3", emoji: "🌤️", label: "Tempat berteduh dari panas" },
      ],
    }
  ),
  w2(
    5,
    "Hewan Hutan atau Laut",
    "Setiap hewan butuh rumahnya sendiri untuk bertahan hidup!",
    "Menurutmu, hewan mana yang tinggal di hutan?",
    [
      { id: "a", emoji: "🐬", label: "Lumba-lumba" },
      { id: "b", emoji: "🦁", label: "Singa", isCorrect: true },
      { id: "c", emoji: "🐠", label: "Ikan" },
    ],
    "b",
    "Setiap hewan punya habitat masing-masing. Menjaga hutan tetap hijau dan laut tetap bersih adalah cara kita melindungi rumah mereka.",
    {
      question: "Apa yang terjadi kalau rumah hewan rusak?",
      options: [
        { id: "r1", emoji: "🏚️", label: "Hewan itu kehilangan tempat tinggal" },
        { id: "r2", emoji: "🌳", label: "Karena itu aku mau menjaga hutan" },
        { id: "r3", emoji: "🐬", label: "Aku belum kepikiran soal ini" },
      ],
    }
  ),
];

function w3(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string,
  reflection?: {
    question: string;
    options: { id: string; emoji: string; label: string }[];
  }
): ActivityDefinition {
  return {
    activityId: `activity-3-${n}`,
    worldId: "world-3",
    worldNumber: 3,
    activityNumber: n,
    title,
    instruction: "Amati lalu tebak apa yang akan terjadi!",
    companionIntro: `Hai! Aku Predik 🔮 Ayo prediksi ${title.toLowerCase()}!`,
    companionEncourage: "Prediksimu bagus! Itu cara berpikir ilmiah!",
    explorePrompt: "Ketuk untuk melihat lebih dekat!",
    exploreItems: options.map((o) => ({ id: o.id, emoji: o.emoji, label: o.label ?? "" })),
    challengeType: "predict",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints: ["Amati polanya dulu!", "Apa yang biasanya terjadi?", "Prediksi terbaikmu!"],
    reflectionQuestion: reflection?.question ?? "Kenapa kamu memilih itu?",
    reflectionOptions: reflection?.options ?? [
      { id: "r1", emoji: "💭", label: "Karena polanya" },
      { id: "r2", emoji: "📖", label: "Pernah lihat sebelumnya" },
      { id: "r3", emoji: "🤔", label: "Tebak yang masuk akal" },
    ],
    primarySkill: "predict",
    ecoReflection,
  };
}

const WORLD_3: ActivityDefinition[] = [
  w3(
    1,
    "Prediksi Tanaman Disiram",
    "Tanaman disiram air setiap hari, apa yang terjadi?",
    [
      { id: "a", emoji: "🌱", label: "Tumbuh Subur", isCorrect: true },
      { id: "b", emoji: "🍂", label: "Layu" },
      { id: "c", emoji: "🪨", label: "Jadi Batu" },
    ],
    "a",
    "Tanaman butuh air dan sinar matahari agar tumbuh subur, sama seperti kita yang butuh makan dan istirahat.",
    {
      question: "Kalau kamu punya tanaman di rumah, apa yang perlu kamu lakukan?",
      options: [
        { id: "r1", emoji: "💧", label: "Menyiramnya secara rutin" },
        { id: "r2", emoji: "🌱", label: "Membiarkannya saja" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu caranya" },
      ],
    }
  ),
  w3(
    2,
    "Prediksi Tanaman Tidak Disiram",
    "Tanaman tidak disiram selama berhari-hari, apa yang terjadi?",
    [
      { id: "a", emoji: "🌸", label: "Berbunga Lebat" },
      { id: "b", emoji: "🥀", label: "Layu", isCorrect: true },
      { id: "c", emoji: "🌳", label: "Makin Tinggi" },
    ],
    "b",
    "Tanaman yang tidak disiram akan layu karena kekurangan air, sama seperti kita yang butuh minum setiap hari.",
    {
      question: "Apa yang bisa terjadi kalau kita lupa merawat tanaman?",
      options: [
        { id: "r1", emoji: "🥀", label: "Tanaman itu bisa layu dan mati" },
        { id: "r2", emoji: "🌳", label: "Tidak apa-apa, nanti tumbuh sendiri" },
        { id: "r3", emoji: "💭", label: "Aku tebak saja" },
      ],
    }
  ),
  w3(
    3,
    "Prediksi Sampah di Sungai",
    "Sampah dibuang ke sungai, apa yang terjadi pada ikan?",
    [
      { id: "a", emoji: "🐟", label: "Ikan Sehat" },
      { id: "b", emoji: "🤢", label: "Ikan Terganggu", isCorrect: true },
      { id: "c", emoji: "🎉", label: "Ikan Senang" },
    ],
    "b",
    "Membuang sampah ke sungai dapat mengganggu kehidupan ikan dan hewan air lainnya. Sungai yang bersih adalah rumah yang sehat untuk mereka.",
    {
      question: "Apa yang bisa kamu lakukan supaya sungai tetap bersih?",
      options: [
        { id: "r1", emoji: "🗑️", label: "Membuang sampah pada tempatnya" },
        { id: "r2", emoji: "🐟", label: "Ikut menjaga agar ikan tetap sehat" },
        { id: "r3", emoji: "🤷", label: "Aku belum kepikiran soal ini" },
      ],
    }
  ),
  w3(
    4,
    "Prediksi Cuaca dan Awan",
    "Awan menjadi gelap, apa yang akan terjadi?",
    [
      { id: "a", emoji: "☀️", label: "Cerah Terus" },
      { id: "b", emoji: "🌧️", label: "Hujan", isCorrect: true },
      { id: "c", emoji: "❄️", label: "Salju" },
    ],
    "b",
    "Awan gelap biasanya membawa hujan. Air hujan menyuburkan tanah dan mengisi sungai, salah satu sumber air bersih untuk alam.",
    {
      question: "Kenapa hujan penting untuk alam di sekitar kita?",
      options: [
        { id: "r1", emoji: "🌱", label: "Membantu tanaman dan sungai tetap terisi" },
        { id: "r2", emoji: "☔", label: "Aku suka main hujan-hujanan" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu manfaatnya" },
      ],
    }
  ),
  w3(
    5,
    "Prediksi Rumah Hewan",
    "Hutan tempat tinggal hewan ditebang, apa yang terjadi pada hewan?",
    [
      { id: "a", emoji: "🏠", label: "Kehilangan Rumah", isCorrect: true },
      { id: "b", emoji: "🎈", label: "Tetap Nyaman" },
      { id: "c", emoji: "🎮", label: "Tidak Berpengaruh" },
    ],
    "a",
    "Menjaga hutan tetap lestari membantu hewan mempunyai tempat tinggal yang aman. Menebang hutan sembarangan berarti merampas rumah mereka.",
    {
      question: "Kenapa kita perlu menjaga hutan tetap lestari?",
      options: [
        { id: "r1", emoji: "🏠", label: "Supaya hewan tetap punya rumah" },
        { id: "r2", emoji: "🌳", label: "Aku suka pohon yang rimbun" },
        { id: "r3", emoji: "🎈", label: "Aku belum kepikiran soal ini" },
      ],
    }
  ),
];

function w4(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string,
  reflection?: {
    question: string;
    options: { id: string; emoji: string; label: string }[];
  }
): ActivityDefinition {
  return {
    activityId: `activity-4-${n}`,
    worldId: "world-4",
    worldNumber: 4,
    activityNumber: n,
    title,
    instruction: "Gunakan semua keterampilan ilmiahmu!",
    companionIntro: `Hai! Aku Sains 🧪 Yuk kita cari tahu: ${title.toLowerCase()}!`,
    companionEncourage: "Kamu sudah seperti ilmuwan sejati yang peduli bumi!",
    explorePrompt: "Jelajahi dulu sebelum menyimpulkan!",
    exploreItems: options.map((o) => ({ id: o.id, emoji: o.emoji, label: o.label ?? "" })),
    challengeType: "conclude",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints: ["Amati, tanya, prediksi, jelajahi!", "Apa kesimpulanmu?", "Pilih yang paling masuk akal!"],
    reflectionQuestion: reflection?.question ?? "Apa yang kamu pelajari?",
    reflectionOptions: reflection?.options ?? [
      { id: "r1", emoji: "🔬", label: "Cara mengamati" },
      { id: "r2", emoji: "💡", label: "Cara berpikir" },
      { id: "r3", emoji: "🌟", label: "Menjaga alam itu seru!" },
    ],
    primarySkill: "conclude",
    ecoReflection,
  };
}

const WORLD_4: ActivityDefinition[] = [
  w4(
    1,
    "Di Mana Bunga Sebaiknya Ditanam?",
    "Bunga butuh sinar matahari, sebaiknya ditanam di mana?",
    [
      { id: "a", emoji: "🌞", label: "Tempat Terang", isCorrect: true },
      { id: "b", emoji: "🌑", label: "Tempat Gelap" },
      { id: "c", emoji: "🧊", label: "Dalam Kulkas" },
    ],
    "a",
    "Bunga tumbuh paling baik di tempat yang terkena cukup sinar matahari, ini penting diketahui sebelum kita menanam di rumah.",
    {
      question: "Kalau kamu ingin menanam bunga di rumah, di mana tempat terbaiknya?",
      options: [
        { id: "r1", emoji: "🌞", label: "Di tempat yang kena sinar matahari" },
        { id: "r2", emoji: "🏠", label: "Di mana saja, tidak penting" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu" },
      ],
    }
  ),
  w4(
    2,
    "Mengapa Satu Tanaman Lebih Sehat?",
    "Satu tanaman dirawat rutin, satu lagi dibiarkan saja. Mana yang lebih sehat?",
    [
      { id: "a", emoji: "🌿", label: "Yang Rutin Disiram", isCorrect: true },
      { id: "b", emoji: "🥀", label: "Yang Tidak Disiram" },
      { id: "c", emoji: "🍬", label: "Sama Saja" },
    ],
    "a",
    "Tanaman yang dirawat secara rutin tumbuh lebih sehat. Ini membuktikan bahwa merawat alam butuh konsistensi, bukan cuma sesekali.",
    {
      question: "Apa artinya 'merawat alam' yang sebenarnya?",
      options: [
        { id: "r1", emoji: "📅", label: "Melakukannya rutin, bukan sesekali" },
        { id: "r2", emoji: "🌿", label: "Cukup sekali saja sudah cukup" },
        { id: "r3", emoji: "🍬", label: "Aku belum yakin" },
      ],
    }
  ),
  w4(
    3,
    "Bagaimana Cara Mengurangi Sampah?",
    "Apa yang bisa kita lakukan untuk mengurangi sampah?",
    [
      { id: "a", emoji: "♻️", label: "Memilah & Daur Ulang", isCorrect: true },
      { id: "b", emoji: "🗑️", label: "Membuang Sembarangan" },
      { id: "c", emoji: "🔥", label: "Membakar Semua" },
    ],
    "a",
    "Memilah dan mendaur ulang sampah membantu mengurangi sampah yang menumpuk di bumi kita.",
    {
      question: "Apa satu kebiasaan yang bisa kamu mulai hari ini untuk mengurangi sampah?",
      options: [
        { id: "r1", emoji: "♻️", label: "Memilah sampah organik dan anorganik" },
        { id: "r2", emoji: "🗑️", label: "Membuang semuanya jadi satu saja" },
        { id: "r3", emoji: "🤔", label: "Aku belum kepikiran" },
      ],
    }
  ),
  w4(
    4,
    "Bagaimana Hewan Mencari Makan di Alam?",
    "Hewan liar mencari makanan sendiri menggunakan apa?",
    [
      { id: "a", emoji: "👃", label: "Indra Penciuman & Penglihatan", isCorrect: true },
      { id: "b", emoji: "📺", label: "Menonton TV" },
      { id: "c", emoji: "📱", label: "Bermain Gawai" },
    ],
    "a",
    "Hewan menggunakan indra penciuman dan penglihatan untuk mencari makanan. Alam yang bersih dan hijau membantu mereka bertahan hidup sendiri.",
    {
      question: "Kenapa hewan liar butuh alam yang bersih dan hijau?",
      options: [
        { id: "r1", emoji: "🌳", label: "Supaya mereka bisa mencari makan sendiri" },
        { id: "r2", emoji: "📺", label: "Supaya bisa menonton TV" },
        { id: "r3", emoji: "🤔", label: "Aku belum tahu alasannya" },
      ],
    }
  ),
  w4(
    5,
    "Ilmuwan Cilik Peduli Bumi",
    "Setelah semua petualanganmu, apa langkah pertama untuk menjaga alam?",
    [
      { id: "a", emoji: "👀", label: "Mengamati Lingkungan", isCorrect: true },
      { id: "b", emoji: "😴", label: "Tidur" },
      { id: "c", emoji: "🎮", label: "Main Game" },
    ],
    "a",
    "Menjaga alam dimulai dari kebiasaan kecil sehari-hari: mengamati sekitar, merawat tanaman, memilah sampah, dan menjaga rumah para hewan.",
    {
      question: "Dari semua yang sudah kamu pelajari, apa yang ingin kamu lakukan untuk bumi mulai hari ini?",
      options: [
        { id: "r1", emoji: "🌱", label: "Merawat tanaman di sekitarku" },
        { id: "r2", emoji: "♻️", label: "Memilah sampah dengan benar" },
        { id: "r3", emoji: "🌍", label: "Menjaga alam sekitar tetap bersih" },
      ],
    }
  ),
];

export const ALL_ACTIVITIES: Record<string, ActivityDefinition> = Object.fromEntries(
  [...WORLD_1, ...WORLD_2, ...WORLD_3, ...WORLD_4].map((a) => [a.activityId, a])
);

export function getActivityDefinition(activityId: string): ActivityDefinition | null {
  return ALL_ACTIVITIES[activityId] ?? null;
}
