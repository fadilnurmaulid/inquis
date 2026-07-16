#!/usr/bin/env node
/**
 * Harness verifikasi statis INQUIS.
 *
 * Dipakai karena lingkungan build ini tidak punya akses jaringan sehingga
 * `npm install` (dan karenanya `next build` / `tsc` / `vitest` dengan
 * dependensi asli) tidak bisa dijalankan. Harness ini memakai parser
 * TypeScript langsung untuk memeriksa hal-hal yang paling sering rusak saat
 * refactor besar:
 *
 *   1. Galat sintaks di setiap file .ts/.tsx (parser TypeScript asli).
 *   2. Setiap import lokal ("@/..." atau relatif) menunjuk ke file nyata.
 *   3. Setiap named import benar-benar diekspor oleh file tujuannya.
 *   4. Setiap rute internal (href/router.push) cocok dengan App Router.
 *   5. Tidak ada emoji tersisa di kode sumber.
 *   6. Tidak ada string yang diminta dihapus (branding lomba, dll).
 *   7. Tidak ada import yang menunjuk file yang sudah dihapus.
 *
 * Bukan pengganti `tsc --noEmit`; itu tetap harus dijalankan di mesin yang
 * punya node_modules. Lihat CATATAN_VERIFIKASI.md.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT = resolve(process.cwd());
const SRC_DIRS = ["app", "components", "lib", "types", "tests", "prisma", "scripts"];
const EXT = [".ts", ".tsx"];

/* ── util ─────────────────────────────────────────────────────── */
const problems = [];
const add = (file, msg, kind) => problems.push({ file, msg, kind });

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXT.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

const files = SRC_DIRS.flatMap((d) => walk(join(ROOT, d)));
const rel = (f) => relative(ROOT, f);

/* ── 1. sintaks + kumpulkan import/export ─────────────────────── */
const exportsOf = new Map(); // file absolut -> Set<string>
const importsOf = []; // { file, spec, names, line }

function collectExports(sf, file) {
  const names = new Set();
  const visit = (node) => {
    const mods = ts.canHaveModifiers(node) ? ts.getModifiers(node) ?? [] : [];
    const isExported = mods.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    const isDefault = mods.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword);

    if (isExported) {
      if (isDefault) names.add("default");
      if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) {
        if (node.name) names.add(node.name.text);
      } else if (
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isModuleDeclaration(node)
      ) {
        if (node.name && ts.isIdentifier(node.name)) names.add(node.name.text);
      } else if (ts.isVariableStatement(node)) {
        for (const d of node.declarationList.declarations) {
          if (ts.isIdentifier(d.name)) names.add(d.name.text);
          else if (ts.isObjectBindingPattern(d.name))
            for (const el of d.name.elements)
              if (ts.isIdentifier(el.name)) names.add(el.name.text);
        }
      }
    }
    if (ts.isExportAssignment(node)) names.add("default");
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) names.add(el.name.text);
    }
    // `export * from "./x"` — tandai agar pengecekan named import dilewati.
    if (ts.isExportDeclaration(node) && !node.exportClause) names.add("*");
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sf, visit);
  exportsOf.set(file, names);
}

function collectImports(sf, file) {
  ts.forEachChild(sf, (node) => {
    if (!ts.isImportDeclaration(node)) return;
    if (!ts.isStringLiteral(node.moduleSpecifier)) return;
    const spec = node.moduleSpecifier.text;
    const names = [];
    const c = node.importClause;
    if (c) {
      if (c.name) names.push("default");
      if (c.namedBindings) {
        if (ts.isNamedImports(c.namedBindings))
          for (const el of c.namedBindings.elements)
            names.push((el.propertyName ?? el.name).text);
        else names.push("*ns*");
      }
    }
    const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    importsOf.push({ file, spec, names, line: line + 1 });
  });
}

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const sf = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.ESNext,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const diags = sf.parseDiagnostics ?? [];
  for (const d of diags) {
    const { line, character } = sf.getLineAndCharacterOfPosition(d.start);
    add(rel(file), `sintaks ${line + 1}:${character + 1} — ${ts.flattenDiagnosticMessageText(d.messageText, " ")}`, "syntax");
  }
  collectExports(sf, file);
  collectImports(sf, file);
}

/* ── 2 & 3. resolusi import lokal + named export ──────────────── */
function resolveLocal(fromFile, spec) {
  let base;
  if (spec.startsWith("@/")) base = join(ROOT, spec.slice(2));
  else if (spec.startsWith("./") || spec.startsWith("../")) base = resolve(dirname(fromFile), spec);
  else return null; // paket eksternal — di luar cakupan
  const cands = [
    base,
    ...EXT.map((e) => base + e),
    ...EXT.map((e) => join(base, "index" + e)),
    base + ".css",
    base + ".json",
  ];
  return cands.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

for (const imp of importsOf) {
  if (!imp.spec.startsWith("@/") && !imp.spec.startsWith("./") && !imp.spec.startsWith("../")) continue;
  const target = resolveLocal(imp.file, imp.spec);
  if (!target) {
    add(rel(imp.file), `baris ${imp.line}: import "${imp.spec}" tidak menunjuk file mana pun`, "import");
    continue;
  }
  if (target.endsWith(".css") || target.endsWith(".json")) continue;
  const ex = exportsOf.get(target);
  if (!ex) continue;
  if (ex.has("*")) continue; // ada re-export bintang
  for (const n of imp.names) {
    if (n === "*ns*") continue;
    if (!ex.has(n))
      add(
        rel(imp.file),
        `baris ${imp.line}: "${n}" tidak diekspor oleh ${relative(ROOT, target)}`,
        "import"
      );
  }
}

/* ── 4. rute ──────────────────────────────────────────────────── */
function collectRoutes() {
  const routes = new Set();
  const appDir = join(ROOT, "app");
  const rec = (dir, segs) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        if (name.startsWith("(") && name.endsWith(")")) rec(p, segs); // route group
        else if (name.startsWith("@") || name === "api") continue;
        else rec(p, [...segs, name]);
      } else if (/^page\.(tsx|ts)$/.test(name)) {
        routes.add("/" + segs.join("/"));
      }
    }
  };
  if (existsSync(appDir)) rec(appDir, []);
  routes.add("/");
  return routes;
}
const ROUTES = collectRoutes();

function routeMatches(path) {
  const clean = path.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  for (const r of ROUTES) {
    const rp = r === "/" ? ["/"] : r.split("/").filter(Boolean);
    const cp = clean === "/" ? ["/"] : clean.split("/").filter(Boolean);
    if (rp.length !== cp.length) continue;
    if (rp.every((seg, i) => seg.startsWith("[") || seg === cp[i])) return true;
  }
  return false;
}

const LINK_RE = /(?:href=|router\.(?:push|replace)\(|redirect\()\s*[{("'`]{1,2}\s*(\/[A-Za-z0-9\-_/[\]$.?=&{}`+ ]*)/g;
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const m of text.matchAll(LINK_RE)) {
    let path = m[1].trim();
    if (path.includes("${")) path = path.replace(/\$\{[^}]*\}/g, "x"); // template → segmen dinamis
    if (path.includes("[")) continue;
    if (!routeMatches(path))
      add(rel(file), `rute "${path}" tidak ada di app router`, "route");
  }
}

/* ── 5. emoji ─────────────────────────────────────────────────── */
const EMOJI_RE =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}\u{2B00}-\u{2BFF}]/u;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((l, i) => {
    const m = l.match(EMOJI_RE);
    if (m) add(rel(file), `baris ${i + 1}: emoji "${m[0]}" masih ada — ${l.trim().slice(0, 60)}`, "emoji");
  });
}

/* ── 6. string terlarang ──────────────────────────────────────── */
const BANNED = [
  "LIDM",
  "Lomba Inovasi Digital",
  "Platform pembelajaran inkuiri untuk anak usia",
  "dashboard guru",
  "Dashboard Guru",
];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((l, i) => {
    for (const b of BANNED)
      if (l.includes(b)) add(rel(file), `baris ${i + 1}: string terlarang "${b}"`, "banned");
  });
}

/* ── laporan ──────────────────────────────────────────────────── */
const KINDS = ["syntax", "import", "route", "emoji", "banned"];
const LABEL = {
  syntax: "Galat sintaks",
  import: "Import bermasalah",
  route: "Rute tidak ada",
  emoji: "Emoji tersisa",
  banned: "String terlarang",
};

console.log(`\nMemeriksa ${files.length} file di ${SRC_DIRS.join(", ")}\n`);
let total = 0;
for (const k of KINDS) {
  const list = problems.filter((p) => p.kind === k);
  total += list.length;
  const mark = list.length === 0 ? "LULUS" : "GAGAL";
  console.log(`  [${mark}] ${LABEL[k]}: ${list.length}`);
  for (const p of list.slice(0, 30)) console.log(`         · ${p.file}: ${p.msg}`);
  if (list.length > 30) console.log(`         · … dan ${list.length - 30} lagi`);
}
console.log(`\n  Rute terdaftar: ${[...ROUTES].sort().join("  ")}`);
console.log(total === 0 ? "\nSemua pemeriksaan statis lulus.\n" : `\n${total} masalah ditemukan.\n`);
process.exit(total === 0 ? 0 : 1);
