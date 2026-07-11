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
  hints: [string, string, string]
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
      visualScale: o.visualScale,
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
  };
}

const WORLD_1: ActivityDefinition[] = [
  w1(
    1,
    "Temukan Warna",
    "Amati benda-benda ini dengan teliti!",
    "Ketuk benda yang berwarna BIRU!",
    [
      { id: "a", emoji: "🔴", label: "Merah" },
      { id: "b", emoji: "🟡", label: "Kuning" },
      { id: "c", emoji: "🟢", label: "Hijau" },
      { id: "d", emoji: "🔵", label: "Biru", isCorrect: true },
    ],
    "d",
    ["Lihat warna setiap benda!", "Cari yang berwarna biru 💙", "Ketuk lingkaran biru!"]
  ),
  w1(
    2,
    "Lanjutkan Pola",
    "Amati urutan warna ini!",
    "Warna apa yang selanjutnya?",
    [
      { id: "a", emoji: "🔴", label: "Merah" },
      { id: "b", emoji: "🔵", label: "Biru", isCorrect: true },
      { id: "c", emoji: "🟡", label: "Kuning" },
    ],
    "b",
    ["Pola: merah, biru, merah, biru...", "Setelah merah selalu biru!", "Pilih biru 🔵"]
  ),
  w1(
    3,
    "Cari yang Berbeda",
    "Satu benda berbeda dari yang lain!",
    "Ketuk benda yang BERBEDA!",
    [
      { id: "a", emoji: "⭐", label: "Bintang" },
      { id: "b", emoji: "⭐", label: "Bintang" },
      { id: "c", emoji: "🌙", label: "Bulan", isCorrect: true },
      { id: "d", emoji: "⭐", label: "Bintang" },
    ],
    "c",
    ["Hitung benda yang sama...", "Tiga bintang, satu bulan!", "Ketuk bulan 🌙"]
  ),
  w1(
    4,
    "Pola Warna",
    "Warna-warna ini membentuk pola!",
    "Warna apa yang melengkapi pola?",
    [
      { id: "a", emoji: "🟢", label: "Hijau", isCorrect: true },
      { id: "b", emoji: "🔴", label: "Merah" },
      { id: "c", emoji: "🟣", label: "Ungu" },
    ],
    "a",
    ["Pola: hijau, kuning, hijau, kuning...", "Setelah kuning selalu hijau!", "Pilih hijau 🟢"]
  ),
  w1(
    5,
    "Pola Bentuk",
    "Bentuk-bentuk ini punya urutan!",
    "Bentuk apa selanjutnya?",
    [
      { id: "a", emoji: "🔺", label: "Segitiga", isCorrect: true },
      { id: "b", emoji: "🟦", label: "Kotak" },
      { id: "c", emoji: "⭕", label: "Lingkaran" },
    ],
    "a",
    ["Pola: segitiga, kotak, segitiga, kotak...", "Setelah kotak selalu segitiga!", "Pilih segitiga 🔺"]
  ),
];

function w2(
  n: number,
  title: string,
  instruction: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string
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
    exploreItems: options.map((o) => ({
      id: o.id,
      emoji: o.emoji,
      label: o.label ?? "",
      visualScale: o.visualScale,
    })),
    challengeType: "pick-one",
    challengePrompt,
    options,
    correctOptionId: correctId,
    hints: ["Amati ukuran dan bentuknya!", "Kelompokkan yang mirip!", "Pilih jawaban yang tepat!"],
    reflectionQuestion: "Bagaimana kamu mengurutkannya?",
    reflectionOptions: [
      { id: "r1", emoji: "📏", label: "Menurut ukuran" },
      { id: "r2", emoji: "🎨", label: "Menurut warna" },
      { id: "r3", emoji: "🔷", label: "Menurut bentuk" },
    ],
    primarySkill: "observe",
  };
}

const WORLD_2: ActivityDefinition[] = [
  w2(1, "Urutkan Ukuran", "Amati ukuran benda!", "Mana yang PALING KECIL?", [
    { id: "a", emoji: "🐘", label: "Gajah", visualScale: "lg" },
    { id: "b", emoji: "🐁", label: "Tikus", isCorrect: true, visualScale: "sm" },
    { id: "c", emoji: "🐕", label: "Anjing", visualScale: "md" },
  ], "b"),
  w2(2, "Kelompokkan Warna", "Benda-benda punya warna berbeda!", "Mana yang warna MERAH?", [
    { id: "a", emoji: "🍎", label: "Apel", isCorrect: true },
    { id: "b", emoji: "🍌", label: "Pisang" },
    { id: "c", emoji: "🫐", label: "Bluberi" },
  ], "a"),
  w2(3, "Kelompokkan Bentuk", "Amati bentuknya!", "Mana yang bulat?", [
    { id: "a", emoji: "⚽", label: "Bola", isCorrect: true },
    { id: "b", emoji: "📦", label: "Kotak" },
    { id: "c", emoji: "📐", label: "Segitiga" },
  ], "a"),
  w2(4, "Urutkan Tinggi", "Mana yang paling tinggi?", "Ketuk yang PALING TINGGI!", [
    { id: "a", emoji: "🌱", label: "Tunas", visualScale: "sm" },
    { id: "b", emoji: "🌳", label: "Pohon", isCorrect: true, visualScale: "lg" },
    { id: "c", emoji: "🌿", label: "Semak", visualScale: "md" },
  ], "b"),
  w2(5, "Klasifikasi Akhir", "Kelompokkan hewan darat!", "Mana hewan yang hidup di DARAT?", [
    { id: "a", emoji: "🐟", label: "Ikan" },
    { id: "b", emoji: "🦁", label: "Singa", isCorrect: true },
    { id: "c", emoji: "🐬", label: "Lumba" },
  ], "b"),
];

function w3(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string
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
  };
}

const WORLD_3: ActivityDefinition[] = [
  w3(1, "Prediksi Warna", "Pola warnanya: Hijau, Merah, Hijau, Merah, lalu...?", [
    { id: "a", emoji: "🔴", label: "Merah" },
    { id: "b", emoji: "🟢", label: "Hijau", isCorrect: true },
    { id: "c", emoji: "⚫", label: "Hitam" },
  ], "b"),
  w3(2, "Prediksi Cuaca", "Awan gelap, apa selanjutnya?", [
    { id: "a", emoji: "☀️", label: "Cerah" },
    { id: "b", emoji: "🌧️", label: "Hujan", isCorrect: true },
    { id: "c", emoji: "❄️", label: "Salju" },
  ], "b"),
  w3(3, "Prediksi Tanaman", "Bibit disiram, apa yang terjadi?", [
    { id: "a", emoji: "🌱", label: "Tumbuh", isCorrect: true },
    { id: "b", emoji: "🍂", label: "Layu" },
    { id: "c", emoji: "🪨", label: "Jadi batu" },
  ], "a"),
  w3(4, "Prediksi Pola", "2, 4, 6, ...?", [
    { id: "a", emoji: "7️⃣", label: "7" },
    { id: "b", emoji: "8️⃣", label: "8", isCorrect: true },
    { id: "c", emoji: "9️⃣", label: "9" },
  ], "b"),
  w3(5, "Prediksi Akhir", "Bola digulung, kemana?", [
    { id: "a", emoji: "⬆️", label: "Naik" },
    { id: "b", emoji: "➡️", label: "Maju", isCorrect: true },
    { id: "c", emoji: "🔄", label: "Melayang" },
  ], "b"),
];

function w4(
  n: number,
  title: string,
  challengePrompt: string,
  options: ActivityDefinition["options"],
  correctId: string
): ActivityDefinition {
  return {
    activityId: `activity-4-${n}`,
    worldId: "world-4",
    worldNumber: 4,
    activityNumber: n,
    title,
    instruction: "Gunakan semua keterampilan ilmiahmu!",
    companionIntro: `Hai! Aku Sains 🧪 ${title}!`,
    companionEncourage: "Kamu sudah seperti ilmuwan sejati!",
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
      { id: "r3", emoji: "🌟", label: "Sains itu seru!" },
    ],
    primarySkill: "conclude",
  };
}

const WORLD_4: ActivityDefinition[] = [
  w4(1, "Eksperimen Air", "Air dingin + matahari = ?", [
    { id: "a", emoji: "🧊", label: "Tetap beku" },
    { id: "b", emoji: "💧", label: "Mencair", isCorrect: true },
    { id: "c", emoji: "🔥", label: "Membakar" },
  ], "b"),
  w4(2, "Kesimpulan Bayangan", "Matahari di belakang, bayangan?", [
    { id: "a", emoji: "🌑", label: "Di depan", isCorrect: true },
    { id: "b", emoji: "✨", label: "Hilang" },
    { id: "c", emoji: "🌈", label: "Berwarna" },
  ], "a"),
  w4(3, "Kesimpulan Tanaman", "Tanaman butuh apa?", [
    { id: "a", emoji: "🍬", label: "Permen" },
    { id: "b", emoji: "☀️💧", label: "Matahari & air", isCorrect: true },
    { id: "c", emoji: "📺", label: "TV" },
  ], "b"),
  w4(4, "Kesimpulan Magnet", "Magnet menarik?", [
    { id: "a", emoji: "🧲", label: "Logam", isCorrect: true },
    { id: "b", emoji: "🪵", label: "Kayu" },
    { id: "c", emoji: "🧸", label: "Boneka" },
  ], "a"),
  w4(5, "Ilmuwan Kecil", "Apa langkah pertama sains?", [
    { id: "a", emoji: "👀", label: "Mengamati", isCorrect: true },
    { id: "b", emoji: "😴", label: "Tidur" },
    { id: "c", emoji: "🎮", label: "Main game" },
  ], "a"),
];

export const ALL_ACTIVITIES: Record<string, ActivityDefinition> = Object.fromEntries(
  [...WORLD_1, ...WORLD_2, ...WORLD_3, ...WORLD_4].map((a) => [a.activityId, a])
);

export function getActivityDefinition(activityId: string): ActivityDefinition | null {
  return ALL_ACTIVITIES[activityId] ?? null;
}
