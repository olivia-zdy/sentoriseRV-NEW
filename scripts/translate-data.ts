/**
 * Translate src/data/i18n/en.json to de/fr/zh using Lovable AI Gateway.
 * Sends each top-level section separately (products, stories, blogPosts, accessories)
 * and merges. Preserves JSON keys and structure. Preserves brand names, model codes,
 * tech abbreviations (LiFePO₄, BMS, MPPT, BLE), units, ratings.
 *
 * Usage: bun scripts/translate-data.ts [lang]    (lang optional; default all)
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dir, "..");
const API_KEY = process.env.LOVABLE_API_KEY;
if (!API_KEY) throw new Error("LOVABLE_API_KEY not set");

const LANG_NAMES: Record<string, string> = {
  de: "German (Germany, formal Sie-form for tech/marketing)",
  fr: "French (France, formal vous, marketing-grade)",
  zh: "Simplified Chinese (Mainland China, professional industrial tone)",
};

const SYSTEM = (lang: string) => `You are a senior technical translator for Sentorise, a European DTC brand selling LiFePO4 energy-storage batteries.

Translate the user-provided JSON values from English to ${LANG_NAMES[lang]}.

STRICT RULES:
1. Output VALID JSON only. Same structure, same keys, same array order.
2. Translate STRING values only. Numbers, booleans, IDs unchanged.
3. NEVER translate / change:
   - Brand & product line names: Sentorise, Lite, Core, Plus, Mini, DIN H8
   - Model codes: SENT-*, EAN numbers
   - Tech terms/abbreviations: LiFePO₄, LiFePO4, BMS, MPPT, BLE, Bluetooth, SoC, DC, AC, IP65, IP67, UN38.3, CE, RoHS, Ah, Wh, V, A, mm, kg, °C
   - URLs, emails, file names
4. Tone: calm, professional, technically trustworthy. No hype, no emojis, no exclamation marks unless in source.
5. For markdown content (blogPosts.content), preserve all markdown syntax (#, ##, **, lists, code blocks) exactly. Translate prose only.
6. For ${lang === "zh" ? "Chinese: use 全角 punctuation in prose, but keep ASCII inside model codes and units." : "European languages: keep typographic quotes natural."}
7. Return ONLY the translated JSON object — no commentary, no markdown fences.`;

async function translateChunk(lang: string, obj: any): Promise<any> {
  const body = {
    model: "google/gemini-2.5-flash",
    messages: [
      { role: "system", content: SYSTEM(lang) },
      { role: "user", content: JSON.stringify(obj) },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  };
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`AI gateway ${res.status}: ${t.slice(0, 400)}`);
  }
  const j = await res.json();
  const text = j.choices?.[0]?.message?.content ?? "";
  try {
    return JSON.parse(text);
  } catch (e) {
    // Try to extract JSON block
    const m = text.match(/\{[\s\S]*\}/);
    if (m) return JSON.parse(m[0]);
    throw new Error("Failed to parse JSON from AI response: " + text.slice(0, 300));
  }
}

// Chunk large sections by record count to keep responses reliable.
async function translateSection(lang: string, section: Record<string, any>, perChunk: number, label: string) {
  const ids = Object.keys(section);
  const out: Record<string, any> = {};
  for (let i = 0; i < ids.length; i += perChunk) {
    const slice = ids.slice(i, i + perChunk);
    const chunk: Record<string, any> = {};
    for (const id of slice) chunk[id] = section[id];
    console.log(`  [${lang}] ${label} ${i + 1}-${i + slice.length}/${ids.length}`);
    let attempts = 0;
    while (true) {
      try {
        const translated = await translateChunk(lang, chunk);
        for (const id of slice) {
          if (translated[id]) out[id] = translated[id];
          else { console.warn(`    missing id ${id}, keeping EN`); out[id] = chunk[id]; }
        }
        break;
      } catch (e: any) {
        attempts++;
        console.warn(`    retry ${attempts}: ${e.message}`);
        if (attempts >= 3) {
          console.warn(`    giving up chunk, keeping EN`);
          for (const id of slice) out[id] = chunk[id];
          break;
        }
        await new Promise((r) => setTimeout(r, 2000 * attempts));
      }
    }
    await new Promise((r) => setTimeout(r, 800));
  }
  return out;
}

async function main() {
  const en = JSON.parse(readFileSync(resolve(ROOT, "src/data/i18n/en.json"), "utf8"));
  const requested = process.argv[2];
  const langs = requested ? [requested] : ["de", "fr", "zh"];
  for (const lang of langs) {
    console.log(`=== ${lang} ===`);
    const out: any = {};
    out.products = await translateSection(lang, en.products, 3, "products");
    out.stories = await translateSection(lang, en.stories, 3, "stories");
    out.blogPosts = await translateSection(lang, en.blogPosts, 1, "blogPosts"); // long markdown
    out.accessories = await translateSection(lang, en.accessories, 2, "accessories");
    writeFileSync(resolve(ROOT, `src/data/i18n/${lang}.json`), JSON.stringify(out, null, 2));
    console.log(`Wrote src/data/i18n/${lang}.json`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
