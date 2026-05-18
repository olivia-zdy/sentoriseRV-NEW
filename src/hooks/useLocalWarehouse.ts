import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

export interface Warehouse {
  id: string;
  code: string;
  display_name: string;
  country_codes: string[];
  shipping_copy_en: string;
  shipping_copy_de: string;
  shipping_copy_fr: string;
  shipping_copy_zh: string;
  is_default: boolean;
  sort_order: number;
  active: boolean;
}

const COUNTRY_CACHE_KEY = "sentorise_user_country";
const COUNTRY_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h

/** Detect user country via free GeoJS endpoint, cached in localStorage for 24h. */
async function detectCountry(): Promise<string | null> {
  try {
    const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (cached) {
      const { code, ts } = JSON.parse(cached);
      if (Date.now() - ts < COUNTRY_CACHE_TTL && code) return code;
    }
  } catch {
    // ignore parse errors
  }

  try {
    const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const code = (data?.country || "").toUpperCase();
    if (code) {
      localStorage.setItem(
        COUNTRY_CACHE_KEY,
        JSON.stringify({ code, ts: Date.now() })
      );
      return code;
    }
  } catch {
    // network/cors/timeout — silently fall back
  }
  return null;
}

function useUserCountry() {
  const [country, setCountry] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    detectCountry().then((c) => {
      if (!cancelled) setCountry(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return country;
}

export function useWarehouses() {
  return useQuery({
    queryKey: ["warehouses-active"],
    queryFn: async (): Promise<Warehouse[]> => {
      const { data, error } = await supabase
        .from("warehouses")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Warehouse[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

/** Returns the localized shipping copy for the user's local warehouse. */
export function useLocalShippingCopy(fallback?: string): string {
  const { i18n } = useTranslation();
  const country = useUserCountry();
  const { data: warehouses } = useWarehouses();

  if (!warehouses || warehouses.length === 0) return fallback ?? "";

  const lang = (i18n.language || "en").slice(0, 2).toLowerCase();
  const pickCopy = (w: Warehouse) => {
    switch (lang) {
      case "de":
        return w.shipping_copy_de;
      case "fr":
        return w.shipping_copy_fr;
      case "zh":
        return w.shipping_copy_zh;
      default:
        return w.shipping_copy_en;
    }
  };

  if (country) {
    const match = warehouses.find((w) =>
      w.country_codes.includes(country)
    );
    if (match) return pickCopy(match);
  }

  const def = warehouses.find((w) => w.is_default) ?? warehouses[0];
  return pickCopy(def);
}
