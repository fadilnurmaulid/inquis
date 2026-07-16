/**
 * Sync demo Supabase Auth users with Prisma seed data.
 * Run after db:seed — requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 *
 * Usage: npm run demo:sync
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { DEMO_PASSWORD } from "../lib/demo/accounts";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Harus sama persis dengan prisma/seed.ts dan lib/demo/accounts.ts.
const DEMO_USERS = [
  { email: "rara@inquis.app", role: "CHILD", supabaseId: "demo-child-rara" },
  { email: "bima@inquis.app", role: "CHILD", supabaseId: "demo-child-bima" },
];

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi.");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.warn("Menyelaraskan pengguna uji coba ke Supabase Auth...");

  for (const user of DEMO_USERS) {
  const { data: listData } = await supabase.auth.admin.listUsers();

  let authUser = listData?.users?.find(
    (u) => u.email === user.email
  );

  if (!authUser) {
    const { data, error } =
      await supabase.auth.admin.createUser({
        email: user.email,
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: {
          role: user.role,
        },
      });

    if (error) {
      console.warn(error.message);
      continue;
    }

    authUser = data.user;

    console.log("  dibuat  :", user.email);
  } else {
    await supabase.auth.admin.updateUserById(authUser.id, {
      password: DEMO_PASSWORD,
      user_metadata: {
        role: user.role,
      },
    });

    console.log("  diperbarui:", user.email);
  }

  // ============================
  // UPDATE PRISMA
  // ============================

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      supabaseId: authUser.id,
    },
  });

  console.log("  ↳ synced Prisma");
  }

  await prisma.$disconnect();

  console.warn("Selesai.");
  console.warn(`   Password for all demo accounts: ${DEMO_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
