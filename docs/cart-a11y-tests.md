# CartDrawer 无障碍测试用例

> 项目尚未引入 Vitest（参考 `knowledge://frontend-testing-setup` 启用）。
> 启用后将以下文件保存为 `src/components/__tests__/CartDrawer.a11y.test.tsx`。

```tsx
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
  it("触发按钮具有可访问名称", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger).toHaveAttribute("aria-label");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("触发按钮满足 44×44 触摸目标", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    expect(trigger.className).toMatch(/min-h-11/);
    expect(trigger.className).toMatch(/min-w-11/);
  });

  it("可通过键盘聚焦并打开", () => {
    renderDrawer();
    const trigger = screen.getByTestId("cart-trigger");
    trigger.focus();
    expect(document.activeElement).toBe(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("空购物车显示引导文案与 CTA", () => {
    renderDrawer();
    fireEvent.click(screen.getByTestId("cart-trigger"));
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse/i })).toHaveAttribute(
      "href",
      "/products"
    );
  });
});
```

## 购物车入口审计

| 位置 | 触发 CartDrawer | 备注 |
| --- | --- | --- |
| 桌面 Header Actions | ✅ | `CartDrawer` 实例 |
| 移动端 Header Actions | ✅ | 本次新增/修复 |
| Footer | ❌ | 无购物车链接（DTC 站点惯例，保留） |
| 404 / NotFound | ❌ | 仅指向产品页 |
| 移动端折叠菜单（汉堡内） | ❌ | 建议未来添加 |

页面内 “Add to cart” 按钮直接走 `useCartStore.addToCart`，不通过 Header 入口，符合预期。
