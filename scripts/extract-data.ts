/**
 * Extract translatable strings from src/data/*.ts into JSON skeleton.
 * Run with: bun scripts/extract-data.ts
 */
import { plugin } from "bun";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

plugin({
  name: "asset-stub",
  setup(build) {
    build.onResolve({ filter: /\.(png|jpg|jpeg|webp|svg|gif)(\?.*)?$/ }, (args) => ({
      path: args.path,
      namespace: "stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: 'export default "stub";',
      loader: "ts",
    }));
  },
});

const ROOT = resolve(import.meta.dir, "..");

// Set up @/ alias via Bun.resolveSync hook
const origImport = async (rel: string) => {
  const abs = resolve(ROOT, "src", rel);
  return await import(abs);
};

const productsMod = await origImport("data/products.ts");
const storiesMod = await origImport("data/customerStories.ts");
const blogMod = await origImport("data/blogPosts.ts");
const accMod = await origImport("data/accessories.ts");

// Translatable field whitelists
const productFields = [
  "name", "tagline", "description", "category",
];
const productArrFields = ["useCases", "features", "highlights"];

const storyFields = ["name", "location", "scenarioLabel", "quote", "fullStory"];
const storyArrFields = ["productsUsed"];

const blogFields = ["title", "excerpt", "content", "category", "author"];
const blogArrFields = ["tags"];

const accFields = [
  "name", "subtitle", "description", "estimatedShipping",
  "seoTitle", "seoDescription", "compatibility",
];
const accArrFields = ["keyFeatures", "applications", "packageContents", "warnings"];

function pickFields(obj: any, fields: string[], arrFields: string[]) {
  const out: Record<string, any> = {};
  for (const f of fields) if (obj[f] != null) out[f] = obj[f];
  for (const f of arrFields) if (Array.isArray(obj[f])) out[f] = obj[f];
  return out;
}

const skeleton: any = { products: {}, stories: {}, blogPosts: {}, accessories: {} };

for (const p of productsMod.products as any[]) {
  const o = pickFields(p, productFields, productArrFields);
  // specs: translate labels only
  if (Array.isArray(p.specs)) o.specs = p.specs.map((s: any) => ({ label: s.label }));
  skeleton.products[p.id] = o;
}

for (const s of storiesMod.customerStories as any[]) {
  skeleton.stories[s.id] = pickFields(s, storyFields, storyArrFields);
}

for (const b of blogMod.blogPosts as any[]) {
  skeleton.blogPosts[b.id] = pickFields(b, blogFields, blogArrFields);
}

for (const a of accMod.accessoryProducts as any[]) {
  const o = pickFields(a, accFields, accArrFields);
  if (Array.isArray(a.specifications)) o.specifications = a.specifications.map((s: any) => ({ label: s.label, value: s.value }));
  if (Array.isArray(a.sections)) o.sections = a.sections.map((s: any) => ({ title: s.title, content: s.content, bullets: s.bullets || undefined }));
  if (Array.isArray(a.faqs)) o.faqs = a.faqs.map((f: any) => ({ question: f.question, answer: f.answer }));
  skeleton.accessories[a.id] = o;
}

mkdirSync(resolve(ROOT, "src/data/i18n"), { recursive: true });
writeFileSync(resolve(ROOT, "src/data/i18n/en.json"), JSON.stringify(skeleton, null, 2));
console.log("Wrote en.json with",
  Object.keys(skeleton.products).length, "products,",
  Object.keys(skeleton.stories).length, "stories,",
  Object.keys(skeleton.blogPosts).length, "blogPosts,",
  Object.keys(skeleton.accessories).length, "accessories");
