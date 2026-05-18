# 运费文案统一与本地化收尾

针对上一轮"移除免运费"后的残留问题做一次系统性收尾：补齐缺失的 i18n 键，删除所有免运费遗留逻辑，统一"欧盟全境配送 · 2–5 个工作日"的承诺文案，并在购物车与结账提示中显示运费计算说明。

## 现状审计

扫描发现的问题：

1. **i18n 键名陈旧** — `products.freeShipping`、`servicePromises.freeShipping/freeShippingDesc`、`trust.freeShipping`、`hero.trustPoints.freeShipping` 仍叫"freeShipping"，但译文已是"欧盟配送"。键名误导。
2. **`AnnouncementBar` / `CartDrawer.shippingNotice`** 用了 `defaultValue` 英文回退 — 一旦四个 locale 没有真实键，非英语用户会看到英文回退。
3. **`TermsPage.tsx` § 4 Shipping and Delivery + Return Shipping + Refund Timeline** 整段硬编码英文，未接入 i18n；且 § Return Shipping 仍提到 "Amazon purchases" 与之前的直销转型矛盾。
4. **`Index.tsx` 副标题** "All products in stock with fast EU shipping. Add to cart and checkout securely." 硬编码英文。
5. **`AccessoriesPage.tsx`** "Est. shipping:" 标签硬编码。
6. **`ShopifyProductDetailPage.tsx` L346** "EU-Wide Shipping" 硬编码（应走 i18n）。
7. **`AccessoryDetailPage.tsx` L134 / L176** "Pre-order · Est. {date}"、"EU-Wide Shipping" 硬编码。
8. **`CartDrawer.tsx` 底部** "Shopping Cart / Your cart is empty / Proceed to Checkout / SSL Encrypted / 30-Day Returns / 5-Year Warranty / Secure checkout powered by Shopify" 全部硬编码英文。
9. **`PrivacyPage.tsx`** "Billing and shipping addresses"、"shipping updates"、"shipping carriers" 硬编码（保留，超出本轮范围，可后续整体本地化时处理）。
10. **`llms.txt`** 内容仅供搜索/LLM 抓取，正确保持英文；当前已是 "shipping fees are calculated at checkout"，无需改动。
11. **无残留进度条逻辑** — `CartDrawer` 中 `FREE_SHIPPING_THRESHOLD_EUR` / `qualified` / `progress` 已删除，本轮验证确认。

## 执行方案

### 1. 重命名 i18n 键，移除"free"前缀

在四个 locale 文件中将 `freeShipping` → `euShipping`、`freeShippingDesc` → `euShippingDesc`，更新引用：

- `src/components/ServicePromises.tsx`
- `src/components/ShopifyProductCard.tsx`
- `src/components/LocalProductCard.tsx`
- `src/components/Hero.tsx`（`sceneTrustPointKeys.solar` 中的 `freeShipping`）

### 2. 落地 announcement / cart 提示键

在 en/de/fr/zh 四个 locale 中显式新增：

- `announcement.shipping` / `announcement.shippingShort`
- `cart.shippingNotice`
- `cart.title` / `cart.empty` / `cart.checkout` / `cart.trust.ssl` / `cart.trust.returns` / `cart.trust.warranty` / `cart.poweredBy`

去掉所有 `defaultValue` 英文回退。

### 3. 重写购物车抽屉文案
全部接入 i18n，并在 checkout 按钮上方新增一行小字提示："运费与税费将在结账时计算 · 欧盟 2–5 个工作日送达"。

### 4. 重写条款页 §4 Shipping & Delivery + Returns
- 整段抽到 i18n 命名空间 `terms.*`
- 移除"Amazon purchases"行（与直销策略一致）
- 在四个 locale 给出完整翻译，覆盖运输政策、退货运费规则、退款时效
- 检查 `TermsPage.tsx` 其它仍硬编码的段落（保修、责任限制等），如本轮时间允许一并接入

### 5. 修复其它硬编码点
- `Index.tsx` 副标题 → `home.shopGridSubtitle`（4 语言译文）
- `AccessoriesPage.tsx` "Est. shipping:" → `accessories.estShipping`
- `ShopifyProductDetailPage.tsx` / `AccessoryDetailPage.tsx` 的 "EU-Wide Shipping" → 复用 `products.euShipping`
- `AccessoryDetailPage.tsx` 预购日期行 → `products.preOrderEst`

### 6. 校验
- 全文搜索 `free.?ship|freeShip|kostenlos.*versand|gratuit|免运|包邮` 确认零残留
- 切到 DE / FR / ZH 三种语言肉眼检查公告栏、信任徽章、产品卡、购物车抽屉、条款页 §4

## 技术细节

- 所有翻译手工撰写（专业术语：LiFePO₄ 保留原文、"working days" → "Werktage / jours ouvrés / 个工作日"、"checkout" → "Kasse / paiement / 结账"）
- 不引入额外依赖，沿用现有 `react-i18next` + `useTranslation`
- `TermsPage` 维持单页结构，长段落用 i18n key 数组渲染列表项
- 不动业务逻辑：购物车状态、Shopify 结账 URL、库存判断保持原样
- llms.txt 是给爬虫的，保持英文不本地化

## 影响范围

修改约 12-14 个文件：4 个 locale json + 7 个组件/页面 tsx + 可能 1-2 个新增工具。新增/重命名 i18n 键约 25-30 条。

## 不在本轮范围

- `PrivacyPage.tsx`、其它法务页的完整本地化
- 博客文章 / 客户故事 / 产品数据文件的多语言化（属于先前未审批的"全站本地化"大计划，单独立项）
