/**
 * Capaian.
 *
 * Utilitas murni — tanpa "use client", aman dipanggil dari Server
 * maupun Client Component. Wajahnya sekarang id spesimen, bukan emoji.
 */

import type { SpecimenId } from "@/components/illustrations/specimens";

export interface Achievement {
  id: string;
  spesimen: SpecimenId;
  title: string;
  description: string;
  earned: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-step",
    spesimen: "biji",
    title: "Biji Pertama",
    description: "Menyelesaikan satu aktivitas",
    earned: false,
  },
  {
    id: "world-1",
    spesimen: "kupu-kupu",
    title: "Pembaca Pola",
    description: "Menuntaskan Dunia 1",
    earned: false,
  },
  {
    id: "world-2",
    spesimen: "kura-kura",
    title: "Ahli Pilah",
    description: "Menuntaskan Dunia 2",
    earned: false,
  },
  {
    id: "world-3",
    spesimen: "burung",
    title: "Pembaca Cuaca",
    description: "Menuntaskan Dunia 3",
    earned: false,
  },
  {
    id: "world-4",
    spesimen: "pohon-besar",
    title: "Ilmuwan Cilik",
    description: "Menuntaskan keempat dunia",
    earned: false,
  },
  {
    id: "independent",
    spesimen: "kaca-pembesar",
    title: "Jalan Sendiri",
    description: "Tiga aktivitas selesai",
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
