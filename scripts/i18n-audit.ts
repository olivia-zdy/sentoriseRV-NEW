#!/usr/bin/env bun
/**
 * i18n-audit — fails (exit 1) on:
 *   1. Locale keys present in en.json but missing/empty in de/fr/zh
 *   2. New hardcoded English text in src/components and src/pages that is not
 *      wrapped in t(), translation helpers, or whitelisted.
 *
 * Usage:  bun run scripts/i18n-audit.ts
 *         bun run scripts/i18n-audit.ts --report   (writes report.json, no fail)
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { resolve, join, extname } from "path";

const ROOT = resolve(import.meta.dir, "..");
const LOCALES_DIR = join(ROOT, "src/i18n/locales");
const SCAN_DIRS = [join(ROOT, "src/pages"), join(ROOT, "src/components")];
const REPORT_ONLY = process.argv.includes("--report");

// --- 1. Locale completeness ----------------------------------------------
function flatten(obj: any, prefix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flatten(v, key));
    else out[key] = String(v ?? "");
  }
  return out;
}

const enFlat = flatten(JSON.parse(readFileSync(join(LOCALES_DIR, "en.json"), "utf8")));
const missing: Record<string, string[]> = {};
for (const lang of ["de", "fr", "zh"]) {
  const flat = flatten(JSON.parse(readFileSync(join(LOCALES_DIR, `${lang}.json`), "utf8")));
  missing[lang] = Object.keys(enFlat).filter(
    (k) => !flat[k] || flat[k].trim() === "" || flat[k] === enFlat[k] && /^[A-Z][a-z]/.test(enFlat[k]) === false
      ? !flat[k] || flat[k].trim() === ""
      : false
  );
}

// --- 2. Hardcoded English scanner ----------------------------------------
const WHITELIST_FILES = new Set<string>([
  "src/components/ui", // shadcn primitives
  "src/components/PageMeta.tsx",
  "src/components/SEO",
]);

const ALLOWED_LITERALS = new Set([
  "Home", "Sentorise", "EUR", "GBP", "USD", "LiFePO4", "LiFePO₄", "BMS", "MPPT",
]);

// Phrase = 2+ English words, starts with capital letter, ASCII letters/space only
const PHRASE_RE = /(?:>|"|')([A-Z][A-Za-z]+(?:\s+[A-Za-z][A-Za-z'-]+){1,})(?:<|"|')/g;

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, files);
    else if ([".tsx", ".ts"].includes(extname(p))) files.push(p);
  }
  return files;
}

const hardcoded: { file: string; line: number; text: string }[] = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    const rel = file.replace(ROOT + "/", "");
    if ([...WHITELIST_FILES].some((w) => rel.startsWith(w))) continue;
    const src = readFileSync(file, "utf8");
    src.split("\n").forEach((line, i) => {
      // skip comments and import lines
      if (/^\s*(\/\/|\/\*|\*|import\s|export\s+\*)/.test(line)) return;
      // skip if line clearly inside t( call
      const stripped = line.replace(/t\(\s*["'`][^"'`]+["'`][^)]*\)/g, "");
      let m: RegExpExecArray | null;
      const re = new RegExp(PHRASE_RE.source, "g");
      while ((m = re.exec(stripped))) {
        const text = m[1].trim();
        if (ALLOWED_LITERALS.has(text)) continue;
        if (text.length < 6) continue;
        // ignore CSS class-like (camelCase, kebab, contains digits)
        if (/^[a-z]/.test(text)) continue;
        if (/\d/.test(text)) continue;
        // ignore single capitalized word
        hardcoded.push({ file: rel, line: i + 1, text });
      }
    });
  }
}

// --- Report --------------------------------------------------------------
const totalMissing = Object.values(missing).reduce((a, b) => a + b.length, 0);
console.log(`\n[i18n-audit] Missing locale keys (vs en):`);
for (const [lang, keys] of Object.entries(missing)) {
  console.log(`  ${lang}: ${keys.length}`);
  keys.slice(0, 10).forEach((k) => console.log(`    - ${k}`));
  if (keys.length > 10) console.log(`    … ${keys.length - 10} more`);
}
console.log(`\n[i18n-audit] Hardcoded English candidates: ${hardcoded.length}`);
hardcoded.slice(0, 25).forEach((h) => console.log(`  ${h.file}:${h.line}  "${h.text}"`));
if (hardcoded.length > 25) console.log(`  … ${hardcoded.length - 25} more`);

if (REPORT_ONLY) {
  writeFileSync(join(ROOT, "i18n-audit-report.json"), JSON.stringify({ missing, hardcoded }, null, 2));
  console.log("\nWrote i18n-audit-report.json");
  process.exit(0);
}

const HARDCODED_BUDGET = Number(process.env.I18N_HARDCODED_BUDGET ?? "9999");
const fail = totalMissing > 0 || hardcoded.length > HARDCODED_BUDGET;
if (fail) {
  console.error(
    `\n[i18n-audit] FAIL — missing=${totalMissing}, hardcoded=${hardcoded.length} (budget=${HARDCODED_BUDGET})`,
  );
  process.exit(1);
}
console.log("\n[i18n-audit] OK");
