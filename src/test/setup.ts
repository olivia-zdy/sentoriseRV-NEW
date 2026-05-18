import "@testing-library/jest-dom";

// jsdom polyfills used by Radix/shadcn components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

if (!(window as unknown as { ResizeObserver?: unknown }).ResizeObserver) {
  (window as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

if (!(window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver) {
  (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return []; }
  };
}

// Minimal i18next stub so components rendering t('cart.openLabel') work
import { vi } from "vitest";
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) => {
      if (opts && typeof opts.count === "number") return `${key} (${opts.count})`;
      return key;
    },
    i18n: { language: "en", changeLanguage: () => Promise.resolve() },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: { type: "3rdParty", init: () => {} },
}));

// Stub the warehouse hook to avoid Supabase calls in tests
vi.mock("@/hooks/useLocalWarehouse", () => ({
  useActiveWarehouse: () => ({
    warehouse: null,
    copy: "",
    market: { code: "DE", flag: "🇩🇪" },
  }),
  useWarehouses: () => ({ warehouses: [], loading: false }),
}));
