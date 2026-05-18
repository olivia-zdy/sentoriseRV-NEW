# 全站本地化（DE / FR / ZH）

目标：让 Sentorise 网站在德语、法语、中文三个语言下完整可读，包括 UI、静态文案、产品描述、客户故事、博客文章、条款隐私等长内容。EN 保持为源语言。

## 现状

- i18n 基础设施已就绪：`react-i18next`，4 个 locale 文件（en/de/fr/zh，各 ~578 行）。
- 但仍有大量硬编码英文，分布在：
  - **30+ 组件**（BatterySelector、Testimonials、ContactForm、SystemDiagram、ProductUseCases 等）
  - **20+ 页面**（BluetoothGuide、Certifications、Compare、WhySentorise、ProductDetail 等）
  - **静态数据**（`src/data/products.ts`、`src/data/stories.ts`、`src/data/blogPosts.ts`、配件、认证清单）
  - **法务页**（Terms、Privacy、Imprint、Returns、Warranty 条款）

## 执行方案

分三阶段，全部使用 Lovable AI Gateway（google/gemini-2.5-flash）作为翻译引擎，按术语表统一专业用词（LiFePO₄、BMS、循环寿命、低温保护等）。

### Phase 1 — UI 字符串抽取与翻译
1. 扫描 `src/components/` 与 `src/pages/` 下所有硬编码英文 JSX 文本
2. 按组件/页面分命名空间扩展 `en.json`（如 `batterySelector.*`、`bluetoothGuide.*`、`certifications.*`）
3. 用 `useTranslation` 替换硬编码文本
4. 用脚本调用 Lovable AI 把新增 EN keys 批量翻译到 DE / FR / ZH，写入对应 locale 文件
5. 术语表硬约束（如 "LiFePO₄" 保持原样、"BMS" 中文保留、"5-Year Warranty" → "5 年质保 / 5 Jahre Garantie / Garantie 5 ans"）

### Phase 2 — 结构化数据本地化
针对 `products.ts`、`stories.ts`、`blogPosts.ts`、`accessories.ts`、`certifications.ts`：

1. 将文本字段（title、description、features、specs labels、story body 等）改为 `{ en, de, fr, zh }` 多语言对象
2. 添加 `useLocalized()` 工具函数，根据当前 i18n 语言返回对应字符串
3. 用脚本把现有 EN 内容批量翻译填充其它三种语言

### Phase 3 — 长文本与法务页
1. Terms / Privacy / Imprint / Returns / Warranty 等长内容拆为按语言加载的 markdown 文件：`src/content/legal/{lang}/terms.md`
2. Blog 文章 body 同样转为 `src/content/blog/{lang}/{slug}.md`
3. PageMeta（title / description）按语言切换

## 技术细节

- **翻译脚本**：`scripts/translate.ts`，使用项目内已有 Lovable AI 网关密钥（无需用户提供 key），分批 50 keys/请求，温度 0.2，附术语表 system prompt
- **质量保障**：保留 EN 原文为 fallback，缺失 key 时 i18next 自动回退；保留所有 ICU 占位符（`{{count}}`、`{threshold}`）
- **SEO**：`PageMeta` 组件读取 i18n title/description，避免在 `<head>` 中硬编码英文
- **CN 市场**：上一轮已添加，本次将其中文文案补全
- **不翻译**：品牌名 Sentorise、产品系列名 Lite/Core/Plus、技术缩写 BMS/LiFePO₄/CE/RoHS/UN38.3、电邮地址、公司注册号、URL

## 工作量与产出

- 预计修改 60-90 个文件，新增 4 个 markdown 内容目录 + 1 个翻译脚本
- 建议分多个回合执行（每回合一个阶段），避免单次 diff 过大难以审阅
- 本次回合执行 **Phase 1**，完成后请审阅再继续 Phase 2/3

## 风险与取舍

- 机器翻译的德语/法语技术文档需人工抽检（尤其安规、保修法律措辞）
- 中文市场（CNY）已加入，但物流/支付配送目前仅覆盖欧洲，CN 选项是 UI 演示用途
- 静态数据多语言化会增加 `products.ts` 体积约 4 倍，构建产物相应变大
