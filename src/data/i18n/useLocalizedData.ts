import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import enData from "./en.json";
import deData from "./de.json";
import frData from "./fr.json";
import zhData from "./zh.json";

type Lang = "en" | "de" | "fr" | "zh";

const TABLES: Record<Lang, any> = {
  en: enData,
  de: deData,
  fr: frData,
  zh: zhData,
};

function langKey(raw?: string): Lang {
  const l = (raw || "en").toLowerCase().split("-")[0];
  if (l === "de" || l === "fr" || l === "zh") return l;
  return "en";
}

/**
 * Overlay localized string fields onto a base record.
 * Arrays are replaced positionally when the localized array has same length.
 * Nested arrays of {label,value,question,answer,title,content,bullets} merge by index.
 */
function merge<T>(base: T, overlay: any): T {
  if (!overlay || typeof overlay !== "object") return base;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...(base as any) };
  for (const k of Object.keys(overlay)) {
    const o = overlay[k];
    const b = (base as any)?.[k];
    if (Array.isArray(o) && Array.isArray(b)) {
      out[k] = b.map((item: any, i: number) => {
        const ov = o[i];
        if (ov == null) return item;
        if (typeof item === "object" && typeof ov === "object") return { ...item, ...ov };
        return ov ?? item;
      });
    } else if (o != null && typeof o !== "object") {
      out[k] = o;
    } else if (o && typeof o === "object" && b && typeof b === "object") {
      out[k] = { ...b, ...o };
    } else if (o != null) {
      out[k] = o;
    }
  }
  return out;
}

export function useLocalizedList<T extends { id: string }>(
  items: T[],
  dataset: "products" | "stories" | "blogPosts" | "accessories"
): T[] {
  const { i18n } = useTranslation();
  const lang = langKey(i18n.language);
  return useMemo(() => {
    if (lang === "en") return items;
    const table = TABLES[lang]?.[dataset] || {};
    return items.map((it) => {
      const overlay = table[it.id];
      return overlay ? merge(it, overlay) : it;
    });
  }, [items, lang, dataset]);
}

export function useLocalizedItem<T extends { id: string }>(
  item: T | undefined | null,
  dataset: "products" | "stories" | "blogPosts" | "accessories"
): T | undefined | null {
  const { i18n } = useTranslation();
  const lang = langKey(i18n.language);
  return useMemo(() => {
    if (!item) return item;
    if (lang === "en") return item;
    const overlay = TABLES[lang]?.[dataset]?.[item.id];
    return overlay ? merge(item, overlay) : item;
  }, [item, lang, dataset]);
}
