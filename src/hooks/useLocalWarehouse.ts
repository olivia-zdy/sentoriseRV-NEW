import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useMarket } from "@/context/MarketContext";

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

/** Direct market → warehouse mapping. */
export const MARKET_TO_WAREHOUSE: Record<string, string> = {
  DE: "DE",
  FR: "PL",
  UK: "UK",
  US: "US",
  CN: "CN",
};

/**
 * Regional fallback chain — used only when the primary warehouse for a market
 * is missing/inactive. Order matters: first available wins.
 */
const REGION_FALLBACKS: Record<string, string[]> = {
  DE: ["DE", "PL", "UK"],            // EU central
  FR: ["PL", "DE", "UK"],            // EU
  UK: ["UK", "DE", "PL"],            // UK first, then EU
  US: ["US", "UK", "DE"],            // Americas → Atlantic
  CN: ["CN", "DE", "UK"],            // Asia → EU
};

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

/** Resolves the warehouse for a given market with regional fallback. */
export function resolveWarehouse(
  warehouses: Warehouse[] | undefined,
  marketCode: string
): Warehouse | undefined {
  if (!warehouses || warehouses.length === 0) return undefined;
  const chain = REGION_FALLBACKS[marketCode] ?? [
    MARKET_TO_WAREHOUSE[marketCode] ?? "DE",
    "DE",
  ];
  for (const code of chain) {
    const w = warehouses.find((x) => x.code === code);
    if (w) return w;
  }
  return warehouses.find((w) => w.is_default) ?? warehouses[0];
}

function pickCopy(w: Warehouse, lang: string): string {
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
}

/** Returns the active warehouse + localized shipping copy for the current market. */
export function useActiveWarehouse() {
  const { market } = useMarket();
  const { i18n } = useTranslation();
  const { data: warehouses } = useWarehouses();
  const warehouse = resolveWarehouse(warehouses, market.code);
  const lang = (i18n.language || "en").slice(0, 2).toLowerCase();
  const copy = warehouse ? pickCopy(warehouse, lang) : "";
  return { warehouse, copy, market };
}

/** Returns the localized shipping copy for the warehouse matching the active market. */
export function useLocalShippingCopy(fallback?: string): string {
  const { warehouse, copy } = useActiveWarehouse();
  if (!warehouse) return fallback ?? "";
  return copy || (fallback ?? "");
}
