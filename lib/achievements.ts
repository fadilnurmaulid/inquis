// lib/achievements.ts
// Pure utility — NO "use client". Aman dipanggil dari Server maupun Client.

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    emoji: "🌱",
    title: "Langkah Pertama",
    description: "Selesaikan aktivitas pertamamu",
    earned: false,
  },
  {
    id: "world-1",
    emoji: "🦋",
    title: "Pengamat Alam Cilik",
    description: "Selesaikan Dunia 1: Penjelajah Pola Alam",
    earned: false,
  },
  {
    id: "world-2",
    emoji: "🐢",
    title: "Pahlawan Daur Ulang",
    description: "Selesaikan Dunia 2: Penjelajah Pemilahan",
    earned: false,
  },
  {
    id: "world-3",
    emoji: "🔮",
    title: "Peramal Alam",
    description: "Selesaikan Dunia 3: Penjelajah Prediksi Alam",
    earned: false,
  },
  {
    id: "world-4",
    emoji: "🧪",
    title: "Sahabat Bumi",
    description: "Selesaikan semua 4 dunia",
    earned: false,
  },
  {
    id: "independent",
    emoji: "⭐",
    title: "Ilmuwan Mandiri",
    description: "Selesaikan 3 aktivitas tanpa petunjuk",
    earned: false,
  },
];

export function computeAchievements(data: {
  totalCompletedActivities: number;
  completedWorlds: number;
  totalWorlds: number;
}): Achievement[] {
  return ACHIEVEMENTS.map((a) => {
    let earned = false;
    switch (a.id) {
      case "first-step":
        earned = data.totalCompletedActivities >= 1;
        break;
      case "world-1":
        earned = data.completedWorlds >= 1;
        break;
      case "world-2":
        earned = data.completedWorlds >= 2;
        break;
      case "world-3":
        earned = data.completedWorlds >= 3;
        break;
      case "world-4":
        earned = data.completedWorlds >= data.totalWorlds;
        break;
      case "independent":
        earned = data.totalCompletedActivities >= 3;
        break;
    }
    return { ...a, earned };
  });
}