import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dir, "..");
const TMP = resolve(ROOT, ".tmp-data");
mkdirSync(TMP, { recursive: true });

function preprocess(src: string): string {
  // Replace asset imports: import x from "@/assets/...";  -> const x = "stub";
  return src.replace(
    /import\s+(\w+)\s+from\s+["']@\/assets\/[^"']+["'];?/g,
    'const $1 = "stub";'
  );
}

const files = ["products.ts", "customerStories.ts", "blogPosts.ts", "accessories.ts"];
for (const f of files) {
  const src = readFileSync(resolve(ROOT, "src/data", f), "utf8");
  writeFileSync(resolve(TMP, f), preprocess(src));
}

const productsMod = await import(resolve(TMP, "products.ts"));
const storiesMod = await import(resolve(TMP, "customerStories.ts"));
const blogMod = await import(resolve(TMP, "blogPosts.ts"));
const accMod = await import(resolve(TMP, "accessories.ts"));

const productFields = ["name", "tagline", "description", "category"];
const productArrFields = ["useCases", "features", "highlights"];
const storyFields = ["name", "location", "scenarioLabel", "quote", "fullStory"];
const storyArrFields = ["productsUsed"];
const blogFields = ["title", "excerpt", "content", "category", "author"];
const blogArrFields = ["tags"];
const accFields = ["name", "subtitle", "description", "estimatedShipping", "seoTitle", "seoDescription", "compatibility"];
const accArrFields = ["keyFeatures", "applications", "packageContents", "warnings"];

function pick(obj: any, fields: string[], arrFields: string[]) {
  const out: any = {};
  for (const f of fields) if (obj[f] != null) out[f] = obj[f];
  for (const f of arrFields) if (Array.isArray(obj[f])) out[f] = obj[f];
  return out;
}

const skel: any = { products: {}, stories: {}, blogPosts: {}, accessories: {} };

for (const p of productsMod.products) {
  const o = pick(p, productFields, productArrFields);
  if (Array.isArray(p.specs)) o.specs = p.specs.map((s: any) => ({ label: s.label }));
  skel.products[p.id] = o;
}
for (const s of storiesMod.customerStories) skel.stories[s.id] = pick(s, storyFields, storyArrFields);
for (const b of blogMod.blogPosts) skel.blogPosts[b.id] = pick(b, blogFields, blogArrFields);
for (const a of accMod.accessoryProducts) {
  const o = pick(a, accFields, accArrFields);
  if (Array.isArray(a.specifications)) o.specifications = a.specifications.map((s: any) => ({ label: s.label, value: s.value }));
  if (Array.isArray(a.sections)) o.sections = a.sections.map((s: any) => ({ title: s.title, content: s.content, ...(s.bullets ? { bullets: s.bullets } : {}) }));
  if (Array.isArray(a.faqs)) o.faqs = a.faqs.map((f: any) => ({ question: f.question, answer: f.answer }));
  skel.accessories[a.id] = o;
}

mkdirSync(resolve(ROOT, "src/data/i18n"), { recursive: true });
writeFileSync(resolve(ROOT, "src/data/i18n/en.json"), JSON.stringify(skel, null, 2));
console.log("en.json:", Object.keys(skel.products).length, "products,",
  Object.keys(skel.stories).length, "stories,",
  Object.keys(skel.blogPosts).length, "blogPosts,",
  Object.keys(skel.accessories).length, "accessories");
