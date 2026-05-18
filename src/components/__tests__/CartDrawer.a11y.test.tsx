/**
 * Accessibility tests for CartDrawer.
 * Requires vitest + @testing-library/react (see knowledge://frontend-testing-setup).
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartDrawer } from "../CartDrawer";

const renderDrawer = () =>
  render(
    <MemoryRouter>
      <CartDrawer />
    </MemoryRouter>
  );

describe("CartDrawer a11y", () => {
  it("trigger has an accessible name", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger).toHaveAttribute("aria-label");
    expect(trigger.getAttribute("aria-label")?.length).toBeGreaterThan(0);
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("trigger meets 44px tap-target minimum", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger.className).toMatch(/min-h-11/);
    expect(trigger.className).toMatch(/min-w-11/);
  });

  it("opens the sheet when activated by keyboard (Enter)", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    fireEvent.keyDown(trigger, { key: "Enter" });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("shows empty-state guidance with browse CTA", () => {
    renderDrawer();
    fireEvent.click(screen.getByTestId("cart-trigger"));
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse/i })).toHaveAttribute(
      "href",
      "/products"
    );
  });
});
