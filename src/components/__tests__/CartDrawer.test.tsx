import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartDrawer } from "../CartDrawer";
import { FooterCartLink } from "../FooterCartLink";
import { MobileMenuCartEntry } from "../MobileMenuCartEntry";
import { useCartUI, CART_ENTRY_POINTS } from "@/stores/cartUIStore";
import { useCartStore } from "@/stores/cartStore";

// Reset zustand stores between tests
beforeEach(() => {
  act(() => {
    useCartUI.setState({ isOpen: false, registered: new Set() });
    useCartStore.setState({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isSyncing: false,
    });
  });
});

const renderAll = () =>
  render(
    <MemoryRouter>
      <CartDrawer entryId={CART_ENTRY_POINTS.HEADER_DESKTOP} />
      <CartDrawer entryId={CART_ENTRY_POINTS.HEADER_MOBILE} />
      <MobileMenuCartEntry />
      <FooterCartLink />
    </MemoryRouter>
  );

describe("Cart entry-point audit", () => {
  it("registers all four documented entry points when mounted", () => {
    renderAll();
    const registered = useCartUI.getState().getRegisteredEntries().sort();
    expect(registered).toEqual(
      [
        CART_ENTRY_POINTS.FOOTER,
        CART_ENTRY_POINTS.HEADER_DESKTOP,
        CART_ENTRY_POINTS.HEADER_MOBILE,
        CART_ENTRY_POINTS.MOBILE_MENU,
      ].sort()
    );
  });

  it.each([
    ["cart-trigger", "header trigger"],
    ["cart-entry-mobile-menu", "mobile hamburger entry"],
    ["cart-entry-footer", "footer entry"],
  ])("opens the drawer when %s is activated (%s)", (testid) => {
    renderAll();
    expect(useCartUI.getState().isOpen).toBe(false);
    // Get the first matching trigger (header has two CartDrawer instances)
    const trigger = screen.getAllByTestId(testid)[0];
    fireEvent.click(trigger);
    expect(useCartUI.getState().isOpen).toBe(true);
  });
});

describe("CartDrawer a11y", () => {
  const renderDrawer = () =>
    render(
      <MemoryRouter>
        <CartDrawer entryId={CART_ENTRY_POINTS.HEADER_DESKTOP} />
      </MemoryRouter>
    );

  it("trigger exposes an accessible name and dialog semantics", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger).toHaveAttribute("aria-label");
    expect(trigger.getAttribute("aria-label")?.length).toBeGreaterThan(0);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("trigger meets the 44x44 tap-target minimum", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger.className).toMatch(/min-h-11/);
    expect(trigger.className).toMatch(/min-w-11/);
  });

  it("is keyboard focusable and opens via click activation", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(trigger);
    expect(useCartUI.getState().isOpen).toBe(true);
  });

  it("shows empty-state guidance with a Browse batteries CTA", async () => {
    renderDrawer();
    fireEvent.click(screen.getByTestId("cart-trigger"));
    // Drawer renders via portal; query whole document
    const cta = await screen.findByRole("link", { name: /cart\.emptyCta/i });
    expect(cta).toHaveAttribute("href", "/products");
  });
});
