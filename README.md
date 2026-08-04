# Grow a Garden 2 Calculator

`growagarden2.pro` 是一个非官方的 Grow a Garden 2 玩家工具站。当前产品基线来自最新的 SEO 专家对话；旧版 Player Command Center PRD 已退役。首页是唯一的 Core Calculator，其他页面围绕交易、库存、代码、状态、安全和方法论形成工具矩阵。

## 当前页面架构

| 页面 | 路径 | 索引状态 | 用途 |
| --- | --- | --- | --- |
| Core Calculator | `/` | index | 输入植物价值、重量、数量和修正项，解释估值公式 |
| Trading Calculator | `/grow-a-garden-2-trading-calculator/` | index gate | 比较交易双方总值与公平区间；仅为游戏内估值 |
| Restock Watchlist | `/grow-a-garden-2-stock-tracker/` | index | 5 分钟全球对齐倒计时与本地关注清单；不冒充实时库存 |
| Codes | `/grow-a-garden-2-codes/` | index | 只展示已验证代码及检查时间 |
| Release Status | `/grow-a-garden-2-release-date/` | index | 直接回答状态并附来源与更新时间 |
| Official Link Check | `/grow-a-garden-2-official-link/` | index | 校验 Roblox 官方入口，避免克隆链接 |
| Night Stealing Guide | `/grow-a-garden-2-night-stealing-guide/` | index | 风险规划与防护清单，区分事实与 fan-made 估计 |
| About / Privacy / Terms | `/about/`、`/privacy-policy/`、`/terms/` | index | 方法论、数据使用和非官方边界 |
| Mutation / Pet / Value / Restock / Guides / Seeds / Gear | 各自 `/grow-a-garden-2-*` 路径 | index | 使用版本化数据；缺失字段继续显示 Unknown，不跨单位补值 |
| Data Console | `/admin/data-console/` | `noindex, nofollow` + robots disallow | 仅供后续鉴权后台设计，不是公开数据入口 |

旧路径 `/grow-a-garden-2-calculator/` 已移除页面内容，并在 [vercel.json](./vercel.json) 配置托管层永久重定向到 `/`；真实 Preview/生产响应仍需单独授权后验证。

## 数据与可信度边界

站点采用 evidence-first、fail-closed 的数据合同。实体、数值、公式、restock cycle 和证据记录彼此分离；只有具备 `evidenceIds`、`sourceUrl`、观察/验证时间、`gameVersion`、使用许可说明和黄金样例的记录，才可能进入默认计算。当前 ledger 已包含 44 个作物、13 个可选 Mutation、16 个宠物事实、25 条 Seed 与 3 条 Gear 相对交易值；Base Sell、Seed Cost 和 Relative Trade Value 保持独立单位，缺值不会互相代填。

新增或更新数据前请遵循 [GAG2 数据维护与发布手册](./docs/GAG2_DATA_MAINTENANCE.md)。页面达到端到端可用、来源可追溯、HTML 可读、schema 与可见内容一致等门槛后，才可以从 `noindex` 晋级为可索引并加入 sitemap/nav/llms.txt。

## 本地开发与验证

```bash
npm install
npm run dev
npm test
npx tsc --noEmit
npm run build
npm run submit:indexnow -- --dry-run
```

仓库目前没有独立 lint 命令；不要把 lint 当作可用的验收步骤。`npm run submit:indexnow` 的非 dry-run、GSC/Bing 提交、外部通知、Preview 和生产部署均需要另外的授权。本轮只完成实现与本地验证，尚未发布。

## 品牌与 SEO 资产

品牌与 SEO 资产套件包括 `logo-mark`、`logo-lockup`、`favicon` 套件、`apple`、`android`、`maskable`、`og-default`、`twitter-card` 和 `site.webmanifest`。本地验证命令为 `npm test`、`npx tsc --noEmit` 与 `npm run build`；当前状态为本地完成，尚未发布。

## 生产信息（部署后）

- Canonical domain: `https://growagarden2.pro`
- Sitemap: `https://growagarden2.pro/sitemap.xml`
- Robots: `https://growagarden2.pro/robots.txt`
- AI/agent summary: `https://growagarden2.pro/llms.txt`

部署后再向 Google Search Console 和 Bing Webmaster Tools 提交 sitemap；收录、排名和 1–2 小时内可见不属于交付承诺。库存仍需玩家在游戏内确认；Codes 只标记为 `Reported active` 并显示来源检查日。公式、数据版本和冲突裁决见 [数据源审计](./docs/research/gag2-data-source-audit.md)。

## 文档基线

- [SEO 页面架构与实施计划](./docs/GAG2_SEO_PAGE_ARCHITECTURE_PLAN.md)：当前唯一产品/页面实施基线。
- [数据维护与发布手册](./docs/GAG2_DATA_MAINTENANCE.md)：ledger、验证、索引门槛和回滚流程。
- [旧 MVP PRD](./docs/Grow_a_Garden_2_Tools_Hub_MVP_PRD.md)、[旧增长 PRD](./docs/gag2-growth-retention-prd.md)：仅供历史追溯，已被上述计划取代。
