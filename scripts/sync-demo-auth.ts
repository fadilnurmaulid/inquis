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

const DEMO_USERS = [
  { email: "demo.teacher@inquis.app", role: "TEACHER", supabaseId: "demo-teacher-supabase-id" },
  { email: "demo.parent@inquis.app", role: "PARENT", supabaseId: "demo-parent-supabase-id" },
  { email: "rara@inquis.app", role: "CHILD", supabaseId: "demo-child-rara" },
  { email: "bima@inquis.app", role: "CHILD", supabaseId: "demo-child-bima" },
  { email: "siti@inquis.app", role: "CHILD", supabaseId: "demo-child-siti" },
  { email: "andi@inquis.app", role: "CHILD", supabaseId: "demo-child-andi" },
];

async function main() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.warn("🔄 Syncing demo auth users...");

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

    console.log("✓ Created", user.email);
  } else {
    await supabase.auth.admin.updateUserById(authUser.id, {
      password: DEMO_PASSWORD,
      user_metadata: {
        role: user.role,
      },
    });

    console.log("✓ Updated", user.email);
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

  console.warn("✅ Demo auth sync complete.");
  console.warn(`   Password for all demo accounts: ${DEMO_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
