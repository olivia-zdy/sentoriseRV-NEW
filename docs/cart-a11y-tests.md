# Cart 入口审计

集中记录所有"打开购物车"的入口。每个入口在挂载时通过 `useCartEntry(id)`
注册到 `useCartUI` 全局 store，测试在 `src/components/__tests__/CartDrawer.test.tsx`
中验证：

1. **全部入口已注册**（防止漏挂或移除）
2. **每个入口点击后实际打开 CartDrawer**
3. **CartDrawer 4 条无障碍用例通过**

## 入口注册表

| ID (`CART_ENTRY_POINTS`) | 位置 | 组件 | 触发方式 | testid |
| --- | --- | --- | --- | --- |
| `header-desktop` | 桌面 Header Actions | `<CartDrawer />` | 点击图标 → `useCartUI.openCart` | `cart-trigger` |
| `header-mobile` | 移动 Header Actions | `<CartDrawer entryId="header-mobile" />` | 点击图标 | `cart-trigger` |
| `mobile-menu` | 移动汉堡菜单底部 | `<MobileMenuCartEntry />` | 按钮点击 | `cart-entry-mobile-menu` |
| `footer` | Footer Support 列底部 | `<FooterCartLink />` | 文本链接点击 | `cart-entry-footer` |

## 当前未触发 CartDrawer 的位置（按设计保留）

| 位置 | 行为 | 原因 |
| --- | --- | --- |
| 产品页 "Add to cart" 按钮 | 调用 `cartStore.addItem`，不打开抽屉 | 不打断添加流程，由 toast 反馈 |
| 404 NotFound 页 | 仅指向 `/products` | 该页用户无购物意图 |

## 运行测试

```bash
bun run test          # 一次性运行
bun run test:watch    # 监听模式
```

预期：8 passed（3 入口审计 + 4 a11y + 1 入口审计内部 each 参数化展开）。

## 新增/移除入口时的清单

1. 在 `CART_ENTRY_POINTS`（`src/stores/cartUIStore.ts`）增加常量
2. 入口组件中 `const openCart = useCartEntry(CART_ENTRY_POINTS.XXX)`
3. 在本文件的"入口注册表"中追加一行
4. 在 `CartDrawer.test.tsx > Cart entry-point audit` 的 `expected` 数组与
   参数化用例中增补
5. 运行 `bun run test`
