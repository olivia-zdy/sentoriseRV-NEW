

# Bundle对比说明卡片增强计划

## 目标
为ProductAccessories模块中的每个Bundle套餐添加详细的对比说明卡片，帮助用户快速理解不同档位的区别，做出合适的购买决策。

---

## 当前状态分析

现有三个Bundle档位：
- **Starter Bundle** (15% off): 基础配件 - Anderson线缆 + 保险丝座 + 端子套件
- **Complete Bundle** (20% off): 完整安装 - 充电器 + 线缆 + 保险丝 + 监控 + 端子
- **Pro Bundle** (20% off): 专业系统 - 20A充电器 + 监控 + 保险丝 + 分配总线

当前问题：用户无法快速判断哪个Bundle适合自己的使用场景。

---

## 实施方案

### 1. 新增Bundle对比数据结构

为每个Bundle添加：
- `bestFor`: 目标用户描述（如"First-time RV owners"）
- `includes`: 功能亮点图标列表
- `doesNotInclude`: 不包含的项目（与更高级别对比）
- `upgradeReason`: 升级到更高档位的理由

### 2. 对比卡片UI设计

```
┌─────────────────────────────────────────────────────────────┐
│  Bundle对比说明区域（在Bundle网格上方）                      │
├─────────────────┬─────────────────┬─────────────────────────┤
│ Starter         │ Complete        │ Pro                     │
│ "Get Started"   │ "Most Popular"  │ "Full System"           │
├─────────────────┼─────────────────┼─────────────────────────┤
│ Best for:       │ Best for:       │ Best for:               │
│ Basic setup     │ Full install    │ High-capacity systems   │
├─────────────────┼─────────────────┼─────────────────────────┤
│ ✓ Cables        │ ✓ All Starter + │ ✓ 20A Charger           │
│ ✓ Fuse          │ ✓ Charger       │ ✓ Advanced Monitor      │
│ ✓ Terminals     │ ✓ Monitor       │ ✓ Bus Bar               │
│                 │                 │ ✓ Protection            │
├─────────────────┼─────────────────┼─────────────────────────┤
│ ✗ No charger    │ ✗ No bus bar    │ ✓ Everything included   │
│ ✗ No monitor    │                 │                         │
├─────────────────┼─────────────────┼─────────────────────────┤
│ €50.XX          │ €119.XX         │ €135.XX                 │
│ [Add Bundle]    │ [Add Bundle]    │ [Add Bundle]            │
└─────────────────┴─────────────────┴─────────────────────────┘
```

### 3. 交互增强

- 添加"Compare Bundles"展开/折叠按钮
- 高亮推荐的Bundle（如Complete标记为"Most Popular"）
- 移动端：使用水平滑动卡片或堆叠布局

---

## 技术实现细节

### 数据结构更新

```typescript
interface BundleOption {
  id: string;
  name: string;
  description: string;
  accessories: string[];
  discountPercent: number;
  forProducts: string[];
  // 新增字段
  tier: "starter" | "complete" | "pro";
  bestFor: string;
  highlights: string[];
  limitations: string[];
  isRecommended?: boolean;
}
```

### Bundle对比数据

| 属性 | Starter | Complete | Pro |
|------|---------|----------|-----|
| bestFor | "Basic wiring, DIY beginners" | "Full RV/solar install" | "200Ah+ systems, multi-battery" |
| highlights | Cables, Fuse, Terminals | +Charger, +Monitor | 20A Charger, Bus Bar |
| limitations | No charger, No monitor | No bus bar | - |
| isRecommended | false | true | false |

### 组件结构

```
ProductAccessories
├── BundleComparisonHeader (新增)
│   └── 3列对比表格
├── BundleCards (现有，略微调整)
│   └── 添加tier标记和推荐badge
└── IndividualAccessories (现有)
```

---

## 移动端适配

- 对比表格改为水平滚动卡片
- 每个Bundle卡片宽度80vw，可左右滑动
- 添加滑动指示器dots
- "Compare All"按钮打开全屏对比sheet

---

## 文件变更清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/ProductAccessories.tsx` | 编辑 | 更新Bundle数据结构，添加对比卡片组件 |

---

## 预期效果

1. 用户一眼看出三档Bundle的差异
2. 明确"推荐"选项降低选择焦虑
3. "不包含"列表帮助用户评估是否需要升级
4. 移动端友好的滑动对比体验

