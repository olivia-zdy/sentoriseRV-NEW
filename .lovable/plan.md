

# BrandAcronym 内容升级计划

## 目标
将 SENTORISE 品牌首字母释义从"消费电子风格"升级为"工程品牌风格"，更克制、更欧洲、更专业。

---

## 变更内容

### 1. 页面标题更新 (WhySentorisePage.tsx)

| 元素 | 当前 | 更新后 |
|------|------|--------|
| 主标题 | Every Letter, A Promise | Every Letter, A Commitment |
| 副标题 | Our name isn't just a brand — it's a commitment... | Our name reflects the principles behind every product we design, test, and deliver — not slogans, but standards we build by. |

### 2. 字母释义数据更新 (BrandAcronym.tsx)

| 字母 | 当前 meaning | 更新后 meaning | 当前 description | 更新后 description |
|------|-------------|---------------|-----------------|-------------------|
| S | Safety First | Safety First | Multi-layer BMS protection | Multi-layer protection, certified components, and strict safety testing. |
| E | Endurance | Endurance | 4000+ cycle lifespan | Designed for long cycle life and stable performance across years of use. |
| N | Nature Friendly | Nature Responsible | Non-toxic, recyclable | Lower-impact materials and responsible lifecycle approach. |
| T | Technology | Smart Monitoring Technology | Smart Bluetooth monitoring | Real-time system visibility for safer, smarter energy control. |
| O | Optimized | Optimized Performance | Peak performance design | Engineered for efficiency and reliability across diverse applications. |
| R | Reliability | Reliability | Tested for real-world use | Tested under demanding environments for dependable power. |
| I | Innovation | Intelligent Design | Self-heating technology | Thoughtful engineering balancing performance, usability, and durability. |
| S | Service | Support & Service | 5-year warranty support | Clear guidance, responsive assistance, and long-term warranty coverage. |
| E | Excellence | Engineering Excellence | International standards | Precision, verification, and continuous improvement in every detail. |

---

## 技术实现

### 文件变更清单

| 文件 | 操作 | 变更内容 |
|------|------|----------|
| `src/pages/WhySentorisePage.tsx` | 编辑 | 更新第170-175行的主标题和副标题文案 |
| `src/components/BrandAcronym.tsx` | 编辑 | 更新第4-14行的 `acronym` 数组数据 |

### 设计原则保留

- 保持 hover 展示 description 的交互逻辑
- 保持 Framer Motion 动画效果
- 保持渐变色配色方案
- 不添加 icon 或插画，只用字体和层级

---

## 预期效果

1. 品牌调性从"消费电子"转向"工程专业"
2. 文案更克制、更欧洲风格
3. 每个字母 = 工程原则 + 用户可感知结果
4. T 不再强调 Bluetooth，而是强调"监控能力"本质

