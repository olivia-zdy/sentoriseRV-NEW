import { create } from "zustand";
import { useEffect } from "react";

/**
 * Global UI state + entry-point registry for the cart drawer.
 *
 * Every component that exposes a "open cart" affordance MUST:
 *   1. import { CART_ENTRY_POINTS, useCartUI } from "@/stores/cartUIStore"
 *   2. register itself via `useCartEntry(CART_ENTRY_POINTS.X)`
 *   3. call `openCart()` on activation
 *
 * Tests use `getRegisteredEntries()` to audit coverage.
 */

export const CART_ENTRY_POINTS = {
  HEADER_DESKTOP: "header-desktop",
  HEADER_MOBILE: "header-mobile",
  MOBILE_MENU: "mobile-menu",
  FOOTER: "footer",
} as const;

export type CartEntryId = (typeof CART_ENTRY_POINTS)[keyof typeof CART_ENTRY_POINTS];

interface CartUIState {
  isOpen: boolean;
  registered: Set<CartEntryId>;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
  registerEntry: (id: CartEntryId) => void;
  unregisterEntry: (id: CartEntryId) => void;
  getRegisteredEntries: () => CartEntryId[];
}

export const useCartUI = create<CartUIState>((set, get) => ({
  isOpen: false,
  registered: new Set<CartEntryId>(),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
  registerEntry: (id) => {
    const next = new Set(get().registered);
    next.add(id);
    set({ registered: next });
  },
  unregisterEntry: (id) => {
    const next = new Set(get().registered);
    next.delete(id);
    set({ registered: next });
  },
  getRegisteredEntries: () => Array.from(get().registered),
}));

/** Hook for entry components to self-register while mounted. */
export const useCartEntry = (id: CartEntryId) => {
  const registerEntry = useCartUI((s) => s.registerEntry);
  const unregisterEntry = useCartUI((s) => s.unregisterEntry);
  const openCart = useCartUI((s) => s.openCart);
  
  useEffect(() => {
    registerEntry(id);
    return () => unregisterEntry(id);
  }, [id, registerEntry, unregisterEntry]);
  
  return openCart;
};
