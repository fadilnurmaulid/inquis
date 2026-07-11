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
  ecoReflection: string
): ActivityDefinition {
  return {
    activityId: `activity-1-${n}`,
    worldId: "world-1",
    worldNumber: 1,
    activityNumber: n,
    title,
    instruction,
    companionIntro: `Hai! Aku Pola 🦋 Ayo amati ${title.toLowerCase()}!`,
    companionEncourage: "Bagus! Kamu sedang berpikir seperti ilmuwan kecil!",
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
    reflectionQuestion: "Apa yang kamu perhatikan?",
    reflectionOptions: [
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
    "Ketuk daun yang SAMA dengan yang di tengah!",
    [
      { id: "a", emoji: "🍁", label: "Daun Maple" },
      { id: "b", emoji: "🍃", label: "Daun Hijau", isCorrect: true },
      { id: "c", emoji: "🍂", label: "Daun Kering" },
      { id: "d", emoji: "🍃", label: "Daun Hijau", isCorrect: true },
    ],
    "d",
    ["Lihat bentuk daunnya dengan teliti!", "Yang sama adalah daun hijau 🍃", "Ketuk daun hijau di kanan!"],
    "Setiap daun punya bentuk yang khas, itu membantu tumbuhan mengenali jenisnya sendiri."
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
    "Bunga tumbuh dengan pola yang teratur agar bisa menarik lebah dan kupu-kupu untuk membantu penyerbukan."
  ),
  w1(
    3,
    "Cari Jejak yang Berbeda",
    "Satu jejak kaki berbeda dari yang lain!",
    "Ketuk jejak yang BERBEDA!",
    [
      { id: "a", emoji: "🐾", label: "Jejak Hewan" },
      { id: "b", emoji: "🐾", label: "Jejak Hewan" },
      { id: "c", emoji: "🦶", label: "Jejak Manusia", isCorrect: true },
      { id: "d", emoji: "🐾", label: "Jejak Hewan" },
    ],
    "c",
    ["Hitung jejak yang sama...", "Tiga jejak hewan, satu jejak manusia!", "Ketuk jejak manusia 🦶"],
    "Mengamati jejak kaki membantu kita mengenali hewan apa saja yang tinggal di sekitar kita."
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
    ["Pola: hijau, kuning, hijau, kuning...", "Setelah kuning selalu hijau!", "Pilih hijau 🟢"],
    "Daun berwarna hijau karena mengandung klorofil, zat yang membantu tumbuhan membuat makanannya dari sinar matahari."
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
    "Tumbuhan tumbuh melalui tahapan yang teratur, dari biji, tunas, hingga menjadi pohon besar yang kuat."
  ),
];

function w2(
  n: number,
  title: string,
  instruction: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string
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
    reflectionQuestion: "Bagaimana kamu mengelompokkannya?",
    reflectionOptions: [
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
    "Mana yang termasuk sampah ORGANIK?",
    [
      { id: "a", emoji: "🍌", label: "Kulit Pisang", isCorrect: true },
      { id: "b", emoji: "🥤", label: "Botol Plastik" },
      { id: "c", emoji: "🥫", label: "Kaleng" },
    ],
    "a",
    "Sampah organik seperti kulit buah bisa terurai secara alami dan diolah menjadi pupuk kompos."
  ),
  w2(
    2,
    "Kelompokkan Sampah Daur Ulang",
    "Benda-benda ini bisa didaur ulang atau tidak!",
    "Mana yang bisa DIDAUR ULANG?",
    [
      { id: "a", emoji: "📦", label: "Kardus", isCorrect: true },
      { id: "b", emoji: "🍎", label: "Sisa Buah" },
      { id: "c", emoji: "🍂", label: "Daun Kering" },
    ],
    "a",
    "Kardus dan kertas termasuk sampah yang bisa didaur ulang menjadi barang baru, sehingga mengurangi sampah menumpuk."
  ),
  w2(
    3,
    "Makhluk Hidup dan Tak Hidup",
    "Amati mana yang hidup!",
    "Mana yang termasuk MAKHLUK HIDUP?",
    [
      { id: "a", emoji: "🐦", label: "Burung", isCorrect: true },
      { id: "b", emoji: "🪨", label: "Batu" },
      { id: "c", emoji: "🧱", label: "Bata" },
    ],
    "a",
    "Makhluk hidup seperti burung bisa bernapas, bergerak, dan tumbuh, berbeda dengan benda mati seperti batu."
  ),
  w2(
    4,
    "Urutkan Tinggi Pohon",
    "Mana yang paling tinggi?", 
    "Ketuk pohon yang PALING TINGGI!",
    [
      { id: "a", emoji: "🌱", label: "Tunas" },
      { id: "b", emoji: "🌳", label: "Pohon Dewasa", isCorrect: true },
      { id: "c", emoji: "🌿", label: "Semak" },
    ],
    "b",
    "Pohon dewasa yang tinggi memberi banyak oksigen dan tempat berteduh bagi hewan serta manusia."
  ),
  w2(
    5,
    "Hewan Hutan atau Laut",
    "Kelompokkan hewan berdasarkan habitatnya!",
    "Mana hewan yang hidup di HUTAN?",
    [
      { id: "a", emoji: "🐬", label: "Lumba-lumba" },
      { id: "b", emoji: "🦁", label: "Singa", isCorrect: true },
      { id: "c", emoji: "🐠", label: "Ikan" },
    ],
    "b",
    "Setiap hewan punya habitat masing-masing. Menjaga hutan dan laut tetap bersih membantu hewan tetap punya tempat tinggal."
  ),
];

function w3(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string
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
    reflectionQuestion: "Kenapa kamu memilih itu?",
    reflectionOptions: [
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
    "Plants need sunlight and water to grow. Tanaman butuh air dan sinar matahari agar tumbuh subur."
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
    "Tanaman yang tidak disiram akan layu karena kekurangan air, sama seperti kita yang butuh minum setiap hari."
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
    "Throwing trash into rivers can harm living things. Membuang sampah ke sungai dapat mengganggu kehidupan ikan dan hewan air lainnya."
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
    "Awan gelap biasanya membawa hujan yang menyuburkan tanah dan membantu tanaman tumbuh."
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
    "Taking care of nature starts with small daily habits. Menjaga hutan tetap lestari membantu hewan mempunyai tempat tinggal yang aman."
  ),
];

function w4(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string,
  ecoReflection: string
): ActivityDefinition {
  return {
    activityId: `activity-4-${n}`,
    worldId: "world-4",
    worldNumber: 4,
    activityNumber: n,
    title,
    instruction: "Gunakan semua keterampilan ilmiahmu!",
    companionIntro: `Hai! Aku Sains 🧪 ${title}!`,
    companionEncourage: "Kamu sudah seperti ilmuwan sejati yang peduli bumi!",
    explorePrompt: "Jelajahi dulu sebelum menyimpulkan!",
    exploreItems: options.map((o) => ({ id: o.id, emoji: o.emoji, label: o.label ?? "" })),
    challengeType: "conclude",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints: ["Amati, tanya, prediksi, jelajahi!", "Apa kesimpulanmu?", "Pilih yang paling masuk akal!"],
    reflectionQuestion: "Apa yang kamu pelajari?",
    reflectionOptions: [
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
    "Bunga tumbuh paling baik di tempat yang terkena cukup sinar matahari."
  ),
  w4(
    2,
    "Mengapa Satu Tanaman Lebih Sehat?",
    "Satu tanaman disiram rutin, satu lagi tidak. Mana yang lebih sehat?",
    [
      { id: "a", emoji: "🌿", label: "Yang Rutin Disiram", isCorrect: true },
      { id: "b", emoji: "🥀", label: "Yang Tidak Disiram" },
      { id: "c", emoji: "🍬", label: "Sama Saja" },
    ],
    "a",
    "Tanaman yang disiram secara rutin tumbuh lebih sehat karena air membantu tanaman mengangkut makanannya."
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
    "We can help Earth by sorting our waste. Memilah dan mendaur ulang sampah membantu mengurangi sampah yang menumpuk."
  ),
  w4(
    4,
    "Bagaimana Hewan Mencari Makan?",
    "Hewan mencari makanan menggunakan apa?",
    [
      { id: "a", emoji: "👃", label: "Indra Penciuman & Penglihatan", isCorrect: true },
      { id: "b", emoji: "📺", label: "Menonton TV" },
      { id: "c", emoji: "📱", label: "Bermain Gawai" },
    ],
    "a",
    "Hewan menggunakan indra seperti penciuman dan penglihatan untuk menemukan makanan di alam."
  ),
  w4(
    5,
    "Ilmuwan Cilik Peduli Bumi",
    "Apa langkah pertama untuk menjaga alam?",
    [
      { id: "a", emoji: "👀", label: "Mengamati Lingkungan", isCorrect: true },
      { id: "b", emoji: "😴", label: "Tidur" },
      { id: "c", emoji: "🎮", label: "Main Game" },
    ],
    "a",
    "Taking care of nature starts with small daily habits. Menjaga alam dimulai dari kebiasaan kecil sehari-hari, seperti mengamati lingkungan di sekitar kita."
  ),
];

export const ALL_ACTIVITIES: Record<string, ActivityDefinition> = Object.fromEntries(
  [...WORLD_1, ...WORLD_2, ...WORLD_3, ...WORLD_4].map((a) => [a.activityId, a])
);

export function getActivityDefinition(activityId: string): ActivityDefinition | null {
  return ALL_ACTIVITIES[activityId] ?? null;
}
