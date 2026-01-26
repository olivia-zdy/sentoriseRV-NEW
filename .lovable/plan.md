
# 实时库存、电池选择器与系统接线图实施计划

## 概述

本计划实施三个关键功能来提升用户决策体验和购买紧迫感：
1. **实时库存与预计发货时间** - 增加购买紧迫感
2. **Battery Selector 交互工具** - 引导式产品推荐
3. **RV 系统接线图** - 展示与现有系统的兼容性

---

## 一、实时库存与预计发货时间显示

### 1.1 产品数据扩展

**修改 `src/data/products.ts`**

为每个产品添加库存相关字段：

```text
// 新增字段类型
stockQuantity: number;      // 实际库存数量
lowStockThreshold?: number; // 低库存阈值（默认10）
restockDate?: string;       // 预计补货日期
```

### 1.2 库存状态组件

**新建 `src/components/StockStatus.tsx`**

功能特性：
- 显示库存状态：充足 / 低库存 / 即将售罄 / 预售
- 库存紧张时显示剩余数量（如 "Only 3 left!"）
- 显示预计发货时间（基于当前日期计算）
- 使用进度条直观展示库存水平
- 添加微妙的脉冲动画吸引注意力

```text
库存状态显示逻辑：
- stockQuantity > lowStockThreshold: "In Stock" (绿色)
- stockQuantity <= lowStockThreshold && > 5: "Low Stock" (黄色)
- stockQuantity <= 5 && > 0: "Only X left!" (红色 + 脉冲动画)
- stockQuantity === 0: "Pre-order" 或 "Restocking soon" (灰色)
```

### 1.3 发货时间计算

```text
发货时间逻辑：
- 库存充足: "Ships in 1-2 business days"
- 低库存: "Ships in 2-3 business days"  
- 无库存: "Expected restock: [日期]"

预计送达显示：
- 基于当前日期 + 发货时间 + 运输时间 (2-5天)
- 示例: "Order now, arrives: Feb 1-4, 2026"
```

### 1.4 应用位置

| 组件 | 显示内容 |
|------|----------|
| ProductCard | 库存状态徽章 + "Only X left" 警告 |
| ProductDetailPage | 完整库存信息 + 发货时间 + 送达日期 |

---

## 二、Battery Selector 交互工具

### 2.1 组件设计

**新建 `src/components/BatterySelector.tsx`**

一个多步骤问答式推荐工具：

#### 步骤1: 使用场景
```text
"What will you be powering?"
□ RV / Motorhome
□ Van / Camper Van  
□ Off-Grid Solar System
□ Marine / Boat
□ Portable / Camping
□ Backup Power
```

#### 步骤2: 空间限制
```text
"What's your space situation?"
□ Standard battery bay (Group 31)
□ Tight space / Under-seat (MINI/DIN H8)
□ Large dedicated area
□ Not sure
```

#### 步骤3: 电力需求
```text
"How much power do you need?"
□ Light use (lights, phone charging) → 6Ah-50Ah
□ Moderate (fridge, laptop, lights) → 100Ah
□ Heavy (multiple appliances, long trips) → 200Ah+
□ Help me calculate
```

#### 步骤4: 气候条件
```text
"Will you use it in cold weather?"
□ Yes, below freezing (-20°C) → Heated model
□ Occasionally cool (0-10°C)
□ Mostly warm climates
```

### 2.2 推荐逻辑

```text
推荐算法规则：

场景 × 空间 × 电力 × 气候 → 产品推荐

示例组合：
- RV + Standard + Heavy + Cold → Plus 200Ah Heated
- Van + Tight + Moderate + Warm → Core 100Ah MINI
- Camping + Any + Light + Any → Lite 50Ah
- EU Motorhome + Under-seat + Moderate + Cool → Core 100Ah DIN H8
```

### 2.3 结果展示

推荐结果页面包含：
- 最佳匹配产品卡片（高亮显示）
- "Why this battery?" 解释匹配原因
- 1-2 个替代选项（如 "Also consider..."）
- 直接链接到产品详情页
- "Start Over" 按钮

### 2.4 页面集成

| 位置 | 入口方式 |
|------|----------|
| Hero CTA | "Find Your Battery" 按钮跳转 |
| SceneNavigation 上方 | 嵌入式卡片入口 |
| 新页面 `/battery-selector` | 完整交互体验 |

---

## 三、RV 系统接线图

### 3.1 新建系统图示组件

**新建 `src/components/SystemDiagram.tsx`**

使用 SVG 或结构化组件展示典型 RV 电力系统架构：

#### 图示内容

```text
典型 RV 电力系统架构图：

┌─────────────────────────────────────────────────────────────┐
│                      SOLAR PANELS                           │
│                    ┌───┐ ┌───┐ ┌───┐                        │
│                    │ ☀ │ │ ☀ │ │ ☀ │                        │
│                    └─┬─┘ └─┬─┘ └─┬─┘                        │
│                      └──────┼──────┘                        │
│                             ▼                               │
│                   ┌─────────────────┐                       │
│                   │  MPPT CONTROLLER │                      │
│                   │  (Victron/Renogy)│                      │
│                   └────────┬────────┘                       │
│                            ▼                                │
│  ┌────────────┐    ┌─────────────────┐    ┌────────────┐   │
│  │ DC-DC      │───▶│   SENTORISE     │◀───│ AC CHARGER │   │
│  │ CHARGER    │    │   LiFePO4       │    │ (Shore)    │   │
│  │ (Alternator)│   │   12V 100Ah     │    │            │   │
│  └────────────┘    └────────┬────────┘    └────────────┘   │
│                             │                               │
│                             ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   FUSE BOX / BUS BAR                 │   │
│  └──┬──────┬──────┬──────┬──────┬──────┬──────┬───────┘   │
│     ▼      ▼      ▼      ▼      ▼      ▼      ▼           │
│   Lights  Fridge  USB   Pump   Fan   Heater  Inverter    │
│                                              ▼            │
│                                         AC Outlets        │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 交互特性

- **悬停高亮**：鼠标悬停在组件上显示详细说明
- **组件标注**：
  - Solar Panel → "Compatible with any panel up to 400W"
  - MPPT Controller → "Works with Victron, Renogy, EPEver"
  - DC-DC Charger → "Charges from vehicle alternator"
  - Sentorise Battery → "Bluetooth monitoring via app"
- **响应式设计**：移动端简化显示

### 3.3 多场景图示

创建多个预设场景模板：

| 场景 | 图示重点 |
|------|----------|
| Basic RV | Solar + Battery + Loads |
| Full RV System | Solar + DC-DC + Shore + Battery + Inverter |
| Van Build | Compact layout, DC-DC focused |
| Off-Grid Cabin | Large solar array + battery bank |

### 3.4 Features 区域集成

在 Features.tsx 的 "Built for Your System" 分组中添加接线图入口：

```text
新增功能卡片：
"See How It Connects"
点击展开模态框或内联展示系统接线图
用户可选择不同场景查看对应配置
```

---

## 文件变更清单

### 新建文件 (4个)

| 文件路径 | 用途 |
|----------|------|
| `src/components/StockStatus.tsx` | 库存状态显示组件 |
| `src/components/BatterySelector.tsx` | 电池选择器交互组件 |
| `src/components/SystemDiagram.tsx` | 系统接线图组件 |
| `src/pages/BatterySelectorPage.tsx` | 电池选择器独立页面 |

### 修改文件 (6个)

| 文件路径 | 改动内容 |
|----------|----------|
| `src/data/products.ts` | 添加 stockQuantity, lowStockThreshold, restockDate 字段 |
| `src/components/ProductCard.tsx` | 集成 StockStatus 组件 |
| `src/pages/ProductDetailPage.tsx` | 增强库存显示和发货时间 |
| `src/components/Features.tsx` | 添加 SystemDiagram 入口卡片 |
| `src/pages/Index.tsx` | 添加 BatterySelector 入口 |
| `src/App.tsx` | 添加 /battery-selector 路由 |

---

## 实施优先级

| 优先级 | 任务 | 预计复杂度 |
|--------|------|------------|
| P0 | 库存状态组件 + 产品数据扩展 | 低 |
| P0 | ProductCard/ProductDetailPage 库存集成 | 低 |
| P1 | BatterySelector 多步骤交互组件 | 中 |
| P1 | BatterySelector 推荐逻辑 | 中 |
| P2 | SystemDiagram 接线图组件 | 中 |
| P2 | Features 区域图示集成 | 低 |

---

## 用户体验流程

```text
用户访问首页
      │
      ├─── Hero CTA "Find Your Battery" 
      │           │
      │           ▼
      │    ┌─────────────────────┐
      │    │  BatterySelector    │
      │    │  步骤1 → 2 → 3 → 4  │
      │    │                     │
      │    │  推荐结果:          │
      │    │  Core 100Ah MINI    │
      │    └──────────┬──────────┘
      │               │
      │               ▼
      │        ProductDetailPage
      │               │
      ▼               ▼
   产品列表 ──────► 产品详情
                      │
         ┌────────────┴────────────┐
         │                         │
    ┌────▼─────┐             ┌─────▼─────┐
    │ Stock:   │             │ Delivery: │
    │ Only 3!  │             │ Feb 1-4   │
    │ (红色脉冲)│             │           │
    └──────────┘             └───────────┘
                      │
                      ▼
              增加购买紧迫感
              Request Quote →
```

---

## 技术说明

### 库存数据来源

当前使用静态数据模拟，后续可扩展为：
- 从数据库读取实时库存
- 通过 Edge Function 连接 ERP/库存管理系统
- 添加库存预警通知功能

### BatterySelector 状态管理

使用 React useState 管理多步骤表单状态，无需复杂的状态管理库。推荐逻辑为纯前端计算，基于产品 useCases、dimensions、hasHeating 等现有字段进行匹配。

### SystemDiagram 实现方式

使用结构化的 React 组件 + CSS Grid/Flexbox 布局，而非复杂的 SVG 绘图，确保可维护性和响应式适配。
