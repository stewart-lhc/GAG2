# GAG2 SEO 页面架构 PRD 与实施计划

## 元数据

- 计划名称：`growagarden2.pro` Calculator-first SEO 工具矩阵
- 计划日期：2026-08-04
- 当前基线：Next.js 16 `output: "export"` 构建时预渲染静态站点，生产域名 `https://growagarden2.pro`
- 事实源：用户提供的 SEO 专家共享对话（最新产品基线）、当前仓库、生产 URL smoke check
- 任务等级：S2（跨页面、路由迁移、共享数据合同与中高 SEO 回归风险）
- 本计划边界：设计页面、数据合同、任务 DAG 与验收；不包含 Preview/生产部署、GSC 提交、真实通知或外部推广
- 权威状态：本文件是当前唯一产品/页面实施基线；旧两份 PRD 已被取代

## 1. 结论

站点应从旧的 Player Command Center 定位切换为“**首页即主 Calculator，其他页面按不同玩家任务扩展**”的 SEO 工具矩阵。用户已明确 SEO 对话是最新产品基线，旧两份 PRD 已失效，不再用于阻止首页重构。

推荐的最终结构是：

1. 首页承接对话里唯一取得明确搜索量快照的核心意图 `grow a garden 2 calculator`，首屏直接完成植物价值计算。
2. 现有 `/grow-a-garden-2-calculator/` 与首页意图重复；实施时通过 Vercel 托管层 `vercel.json` 单跳永久重定向到 `/`，Preview 必须先验证真实 HTTP 308/301。
3. Trading、Mutation、Pet 三种计算任务使用独立工具页，因为输入、结果和用户决策均不同。
4. Value List 承接 `value list`、`plants base value`、`fruit price` 等同一查价意图，不重复造薄页。
5. Stock Tracker 承接通用 stock；`seed restock time` 先做成独立页面，因为对话将其列为明确长尾机会，但必须有真实刷新数据后才 index。
6. Codes、Release、Link Check、Night Guide、Seeds、Gear 保留为辅助页面，不再决定首页产品定位。
7. 三个 PAA 主题做成有来源的完整指南：Plant Size、Mutations、Pet Weight；不把五个问题拆成五篇近重复内容。
8. 所有依赖未验证游戏数据的页面先进入 `draft/noindex`，达到可审计数据门槛后才进入 sitemap 并开放索引。

## 2. 当前状态与证据

### 2.1 已存在能力

- 已有公开页面：Home、Release、Link Check、Stock、Codes、Calculator、Night Guide、Seeds、Gear、About、Privacy、Terms。
- 已有统一 metadata、canonical、sitemap、robots、Breadcrumb、FAQ、WebApplication、WebSite schema helper。
- 已有 Calculator、Codes、Stock、Night Risk 等交互组件，以及 Roblox snapshot 与来源/置信度表达。
- 生产首页、Calculator、sitemap、robots 在 2026-08-04 smoke check 均返回 HTTP 200。
- 当前工作区有未提交改动，涉及首页、layout、PRD、snapshot、站点数据与来源文案；实施时必须保留，不得回滚或覆盖。

### 2.2 尚不存在或未达到上线标准的能力

- 首页当前仍是旧 Player Command Center，H1 与最新核心词不一致；Calculator 位于独立长路径且工具缺少可验证数据和任务说明。
- Calculator 仍要求用户自行输入 base value，缺少可验证的植物/突变数据集、公式版本与示例预设。
- Trading、Mutation、Pet 专用计算器与 Value List 不存在。
- Seeds、Gear、Stock、Codes 多处仍是 Unknown/placeholder；没有数据时不应扩展成更多可索引空页面。
- 没有当前 GSC URL/Query 证据；用户已明确选择最新对话架构，因此 GSC 基线用于风险记录和迁移观察，不再阻塞产品方向。
- `docs/Grow_a_Garden_2_Tools_Hub_MVP_PRD.md` 与 `docs/gag2-growth-retention-prd.md` 已被本计划取代；实施不得继续从中新增 Player Count、Updates、Guilds、VS 等旧范围。
- 仓库没有 lint/test 命令；真实验证命令是 `npx tsc --noEmit` 与 `npm run build`。

### 2.3 SEO 对话可采用的信号

以下是共享对话中的 discovery 线索，不是本计划在 2026-08-04 重新验证的当前事实。对话没有给出供应商、地区、数据库、采集日或原始导出，因此这些数字不能支撑首页迁移、排名预测或工期承诺：

| 关键词 | 对话快照 | 本计划处理 |
|---|---:|---|
| `grow a garden 2 calculator` | KD 28.8；月搜 15,000 | 最新策略的核心 discovery 线索，首页承接；数字仍不作为排名承诺 |
| `grow a garden 2 trading calculator` | KD 0；搜索量未知 | 独立工具页；由 GSC impressions 验证真实需求 |
| `grow a garden 2 mutation calculator` | KD 10.6；搜索量未知 | 独立工具页；必须有可审计 multiplier 数据 |
| `grow a garden 2 pet calculator` | KD 13.9；搜索量未知 | 独立工具页；没有可靠公式时使用明确的 user-entered 模式或保持 noindex |
| `grow a garden 2 value list` | KD 28；搜索量未复核 | 数据表页，合并 base value / fruit price 同意图 |
| `grow a garden 2 seed tier list` | KD 30.1；搜索量未知 | 方法论与数据齐备后再发布，不做主观薄榜单 |
| `seed restock time` | KD 37.3；搜索量未知 | 建独立 route；未达到 verified cycle 门槛时只允许本地/已授权 Preview 的 noindex 版本，不进 sitemap/nav/llms |
| `stock predictor` | KD 27.1；意图偏视频/讨论 | 暂不建页，避免承诺无法验证的预测能力 |

### 2.4 需要纠正的专家结论

- **Next.js 不是 SEO 风险本身。** 当前页面可在 HTML 中直接输出内容；应验证构建产物与渲染 HTML，而不是为 SEO 改回纯 HTML。
- **当前 `output: "export"` 不支持 Next.js server redirect。** 现有 Calculator 迁移必须由 Vercel 托管层 `vercel.json` 实现；若 Preview 无法证明单跳永久 308/301，则停止迁移，不用静态页面、meta refresh 或 JavaScript redirect 冒充。
- **不要复制竞品数据文件。** 数据应来自游戏内可重复测试、官方公开信息或有许可的社区数据，并记录 source、verified_at、formula_version。
- **FAQ schema 不等于获得 PAA。** FAQ 必须与页面可见内容一致；结构化数据只帮助理解，不承诺 rich result 或 PAA 排名。
- **GSC 提交后 1–2 小时收录不是交付承诺。** 只记录提交动作、抓取状态和实际首次曝光时间。
- **抓取/收录可能需要数天到数周且不保证发生。** 不把“请求编入索引”当成收录验收标准。
- **“一个关键词一个页面”不能机械执行。** 相同搜索意图应合并，避免薄内容、重复内容和关键词蚕食。
- **Meta description 的目标是准确表达和提高点击意愿。** 不把 CTR 写成可直接操纵的排名因子。
- **不得把竞品声称的 mutation 规则直接当成 GAG2 事实。** 现有 PRD 的 Confirmed / Rumor / Unknown 机制继续是发布合同。

## 3. 页面地图与关键词/意图映射

### 3.1 P0：核心获取与可信入口

| 页面 | 推荐 canonical | 主意图 | 页面状态 | 关键动作 |
|---|---|---|---|---|
| Core Calculator Home | `/` | `grow a garden 2 calculator` | 重构现有首页 | 选择植物、重量、修正项和 mutations，输出估值 |
| Legacy Calculator URL | `/grow-a-garden-2-calculator/` | 与首页重复 | 迁移 | Vercel 托管层单跳永久 308/301 到 `/`，不保留第二份 indexable 内容 |
| Stock Tracker | `/grow-a-garden-2-stock-tracker/` | current stock、stock tracker | 保留并增强 | 查看 verified/unknown stock、刷新状态、watch，并链接独立 Restock 页面 |
| Codes | `/grow-a-garden-2-codes/` | codes | 保留并增强 | 复制 verified code、查看 last checked、举报 |
| Release Status | `/grow-a-garden-2-release-date/` | release date、is it out | 保留 | 获取直接答案、状态、来源与更新时间 |
| Roblox Link Check | `/grow-a-garden-2-official-link/` | official link、safe Roblox link | 保留 | 对照 Place ID / Creator / freshness 后打开 Roblox |

### 3.2 P1：高意图工具与数据页

| 页面 | 推荐 canonical | 主意图 | 必须与首页不同的产品任务 | 索引门槛 |
|---|---|---|---|---|
| Trading Calculator | `/grow-a-garden-2-trading-calculator/` | trading calculator、trade value | 比较交易双方的多物品总值、差额与公平区间 | 至少一套已验证 value 数据；不显示真钱价格 |
| Mutation Calculator | `/grow-a-garden-2-mutation-calculator/` | mutation calculator | 对单个植物组合 mutation，解释兼容/叠加规则 | multiplier、叠加公式与版本均可追溯 |
| Pet Calculator | `/grow-a-garden-2-pet-calculator/` | pet calculator、pet weight/value | 处理宠物专属输入和结果，不复用作物 UI 假装完成 | 至少一种可验证计算模式；否则 noindex |
| Value List | `/grow-a-garden-2-value-list/` | value list、plants base value、fruit price | 可搜索/筛选/排序的数据表与详情抽屉 | 数据覆盖率、source、verified_at 达到发布门槛 |
| Seeds Hub | `/grow-a-garden-2-seeds/` | seeds、seed values | 种子事实、获取方式、相关价值与库存入口 | 不发布未验证名称/价格/刷新规律 |
| Gear Hub | `/grow-a-garden-2-gear/` | gear、gear values | 装备事实、效果、来源与相关策略 | 不发布未验证效果/数值 |
| Seed Restock Time | `/grow-a-garden-2-seed-restock-time/` | seed restock time | 独立刷新时间/倒计时任务页 | 有已验证 cycle、时区/服务器口径、last observed 与 stale fallback |

### 3.3 P2：方法论与 PAA 指南

| 页面 | 推荐 canonical | 覆盖问题 | 页面形式 | 发布条件 |
|---|---|---|---|---|
| Seed Tier List | `/grow-a-garden-2-seed-tier-list/` | seed tier list、best seeds | 有评分维度、证据、版本与变更记录的榜单 | 至少覆盖主要种子，评级方法公开；不能仅用 emoji 分档 |
| Mutation Guide | `/grow-a-garden-2-mutations-guide/` | how many mutations、highest mutation | 定义、规则表、示例、常见误区，导向 Mutation Calculator | 规则有来源；“最高”必须说明口径与版本 |
| Plant Size Guide | `/grow-a-garden-2-plant-size-guide/` | maximize plant size、size multiplier | 直接答案 + 可重复步骤 + 变量解释 | 步骤经过测试；不把 GAG1 规则迁移成 GAG2 事实 |
| Pet Weight Guide | `/grow-a-garden-2-pet-weight-guide/` | compute pet weight | 公式解释、输入示例、误差范围，导向 Pet Calculator | 公式或实验记录可复核 |
| Night Stealing Guide | `/grow-a-garden-2-night-stealing-guide/` | night stealing、AFK risk | 保留现有风险工具与防护清单 | 清楚区分 confirmed mechanic 与 fan-made estimate |

### 3.4 信任、合规与系统页面

| 页面 | URL | 处理 |
|---|---|---|
| About / Methodology | `/about/` | 增加数据来源、验证等级、公式版本、纠错流程、作者/维护者说明 |
| Privacy | `/privacy-policy/` | 保留；新增 analytics、localStorage、提醒/上报时同步 |
| Terms | `/terms/` | 保留；强调非官方、估值不构成交易担保、不收集 Roblox 凭据 |
| Data Console | `/admin/data-console/` | 保持 robots disallow；真正接数据前必须鉴权并显式 noindex |
| Sitemap / Robots / llms.txt | 系统路由 | 仅收录已达到发布门槛的 canonical；llms.txt 链接到核心工具与方法论 |

### 3.5 暂不创建的页面与别名映射

- `grow a garden 2 stock predictor`：当前没有可信预测数据，且对话判断搜索意图并非稳定工具意图。
- 单独的 `plants base value` 与 `fruit price`：与 Value List 同意图，用 H2、筛选和锚点承接。
- 大量单植物/单宠物程序化页面：在唯一内容、数据覆盖、更新机制和模板质量未完成前禁止生成。
- GAG1/GAG2 混合计算页：域名和产品定位聚焦 GAG2，避免版本混淆。
- `/is-grow-a-garden-2-out/`：归并 Release Status，不新建同意图页面。
- `/grow-a-garden-2-official-roblox-link/`：归并现有 Link Check；只有历史 URL 已存在时才配置托管层 301。
- `/grow-a-garden-2-night-stealing/`：归并现有 Night Stealing Guide。
- `/grow-a-garden-2-gears/`：归并现有单数 `/grow-a-garden-2-gear/`。

## 4. 关键页面详细规格

### 4.1 首页：Core Calculator

**SEO 合同**

- Title：`Grow a Garden 2 Calculator - Plant Values, Mutations & Trades`
- H1：`Grow a Garden 2 Calculator`
- Canonical：`/`
- 主意图：`grow a garden 2 calculator`
- Schema：`WebApplication` + `WebSite`；FAQ 仅在可见问答与 JSON-LD 一致时使用

**首屏**

1. 非官方与数据版本提示。
2. 植物搜索/选择；数据不足时保留 user-entered base value fallback。
3. Weight、quantity、verified modifiers、mutation 选择。
4. 实时结果、公式版本、证据、更新时间和置信度。
5. `Calculate`、`Reset`、`Copy result`；不要求登录。

首屏之后展示直接答案、How it works、数据覆盖、Trading/Mutation/Pet/Value List 入口、FAQ、来源、纠错入口与非官方声明。

### 4.2 Legacy Calculator URL 迁移

- 删除旧页面的 indexable 内容，不使用 canonical 软合并。
- 新增 `vercel.json` 托管层永久重定向；平台若以 308 表达 permanent redirect 可接受，以 Preview 实际响应为准。
- 验收必须是实际 HTTP 单跳永久重定向到 `/`，且旧 URL 不在 sitemap、导航或 llms.txt 中。
- 获得单独部署授权后，若 Vercel Preview 无法执行规则，则 Plan Gate 对迁移保持 BLOCKED，不能部署半成品。

### 4.3 Trading Calculator

- 左右两侧分别添加多个物品/宠物/作物，显示数量、单价、总值。
- 输出 total A、total B、difference、percentage gap 与 `Under / Fair range / Over`。
- Fair range 必须由公开配置控制并写明“fan-made estimate”；不可包装成官方价格。
- 支持 copy/share 文本，不生成真钱、Robux 或站外交易 CTA。
- SEO 内容回答 trade value 的计算方法、数据日期与安全边界。

### 4.4 Mutation Calculator

- 选择植物、基础重量/价值、一个或多个 mutation。
- UI 只允许数据合同标记为 compatible 的组合；未知叠加规则显示 Unknown，不猜测。
- 输出每个 multiplier、组合公式、结果、formula version。
- 页面内含 mutation 表、排序/筛选、更新时间，并链接完整 Mutation Guide。

### 4.5 Pet Calculator

- 先明确单一可验证任务，例如 Pet Weight 或 Pet Value；不要把“pet calculator”做成无定义万能页。
- 输入字段、范围、单位和公式由数据合同驱动。
- 没有可靠公式时只能完成本地 noindex 版本；若之后获得 Preview 部署授权，Preview metadata 必须 `noindex` 且不进 sitemap。
- 结果显示假设、误差与验证状态。

### 4.6 Value List

- 默认表格字段：Name、Type、Rarity、Base Value、Current/Derived Value、Source、Verified at、Version。
- 支持搜索、类型/rarity 筛选、排序、移动端卡片视图、可分享锚点。
- 首段给出 value list 的定义和版本口径；`Plants Base Value`、`Fruit Price` 作为实体 H2，不另建薄页。
- 只对真实展示的数据输出 `ItemList`；不得伪造 `Product`、`Offer` 或 `AggregateRating`。

### 4.7 Stock、Codes 与信息页

- Stock：先给当前 verified/unknown 状态，再给 seed restock time、历史和 watch 动作；没有数据时明确下一次验证动作。
- Codes：verified active/expired、copy、redeem steps、last checked、fake code report；不使用未验证 code 填满页面。
- Release / Link Check：首段直接回答当前状态，所有事实都带 source 与 checked_at；状态变化时优先降级声明。
- Seeds / Gear：作为实体 hub 和内部链接中心，不在事实不足时做无来源 tier/value 声明。

### 4.8 Seed Restock Time

- 首屏给出当前可验证的 restock cycle、下一次刷新倒计时、服务器/时区口径和 last observed。
- 计时核心使用 `src/lib/calculators/restock.ts`，不依赖客户端本地时区猜测；页面明确显示用于计算的标准时区。
- 数据 stale、cycle 冲突或来源不足时停止预测，显示 Unknown/Needs verification，并保持 noindex。
- 页面包含最近观察记录、如何验证刷新、与 Stock Tracker/Seeds 的双向内链。
- 不扩展为 stock predictor；只计算已有证据支持的固定或可解释 cycle。

## 5. 全站信息架构与内链合同

### 5.1 主导航

- Calculator
- Trading
- Values
- Stock
- Codes
- Guides（Mutation、Plant Size、Pet Weight、Night）

Release 与 Link Check 放在 `Game status` 区域和页脚，不挤占工具主导航；移动端底栏保留 Calculator、Values、Stock、Codes 四个高频任务。

### 5.2 内链规则

- 首页链接所有 P0/P1 工具，但不链接 `draft/noindex` 页面。
- 每个 calculator 链接 Value List、其方法论指南和至少一个相邻工具。
- Value List 的实体行可链接对应 calculator 预选状态；不能生成没有独立价值的实体页。
- Stock 链接 Seeds/Gear；Seeds/Gear 回链 Stock 与 Value List。
- Guide 在首屏直接答案后链接相关工具；工具页链接完整 Guide，形成任务闭环。
- 所有可索引页都有 breadcrumb、方法论/About、来源和纠错入口。

## 6. 数据与内容发布合同

### 6.1 共享数据模型

```ts
type VerificationState = "confirmed" | "estimated" | "unknown" | "stale";

type EvidenceRecord = {
  id: string;
  sourceUrl: string;
  sourceType: "official" | "in_game_test" | "community_cross_checked";
  observedAt: string;
  verifiedAt: string;
  gameVersion: string | "unknown";
  licenseOrUsageNote: string;
  capturedFields: string[];
};

type EntityRecord = {
  id: string;
  entityType: "plant" | "seed" | "fruit" | "pet" | "gear" | "mutation";
  name: string;
  aliases: string[];
  evidenceIds: string[];
  verificationState: VerificationState;
};

type ValueObservation = {
  entityId: string;
  valueType: "base_value" | "trade_value" | "weight" | "price";
  value: number;
  unit?: string;
  evidenceIds: string[];
  verificationState: VerificationState;
  verifiedAt: string;
  gameVersion: string | "unknown";
};

type FormulaRecord = {
  id: string;
  formulaVersion: string;
  gameVersion: string | "unknown";
  formulaKind: "crop_value" | "trade_total" | "mutation_value" | "pet_weight" | "pet_value";
  implementationId:
    | "calculateCropValue"
    | "calculateTradeComparison"
    | "calculateMutationValue"
    | "calculatePetWeight"
    | "calculatePetValue";
  displayExpression: string;
  parameters: Array<{
    name: string;
    unit: string;
    required: boolean;
    min?: number;
    max?: number;
  }>;
  rounding: { mode: "half_up" | "floor" | "ceil"; decimals: number };
  fairRange?: { lowerRatio: number; upperRatio: number };
  compatibleEntityTypes: EntityRecord["entityType"][];
  compatibilityRules: Array<{ leftId: string; rightId: string; allowed: boolean }>;
  evidenceIds: string[];
  goldenExamples: Array<{
    id: string;
    inputs: Record<string, number | string>;
    expected: number;
    tolerance: number;
  }>;
};

type RestockCycleRecord = {
  id: string;
  entityOrShopId: string;
  cycleVersion: string;
  gameVersion: string | "unknown";
  implementationId: "calculateNextRestock";
  intervalSeconds: number;
  timezone: string;
  serverBasis: string;
  anchorAt: string;
  effectiveFrom: string;
  effectiveTo?: string;
  lastObservedAt: string;
  staleAfterSeconds: number;
  evidenceIds: string[];
  verificationState: VerificationState;
  goldenExamples: Array<{
    id: string;
    now: string;
    expectedNextRestock: string;
  }>;
};
```

`EntityRecord`、`ValueObservation`、`FormulaRecord`、`RestockCycleRecord` 与 `EvidenceRecord` 必须分离，避免一个通用 record 把实体、公式、周期和来源混成不可审计的数据。字段级事实通过 `evidenceIds` 指向证据；单一 `sourceUrl` 不足以支撑所有字段。`gameVersion` 必填；无法确认时显式写 `"unknown"` 并阻止该记录进入默认计算。

### 6.2 索引门槛

页面只有同时满足以下条件才允许 `index` 并进入 sitemap：

1. 主工具可完成端到端任务，移动端可用。
2. 页面所有 selectable 记录都在版本化 entity manifest 中，并具备 evidence IDs、source、observedAt、verifiedAt、gameVersion、license/usage note；未知项不会被当作事实参与计算。
3. 有直接答案、方法/公式、至少一个真实示例、限制说明、相关工具内链。
4. Title、H1、canonical 唯一，不与其他页面争夺同一主意图。
5. 构建 HTML 中存在关键内容，禁用 JS 后仍可读取标题、说明、来源和内部链接。
6. Schema 与可见内容一致并通过验证。

额外门槛：

- Calculator：每个公式都有 formulaKind、implementationId、parameters/units、rounding、compatibility、formula version 和正常/边界黄金样例。
- Trading：`fairRange` 必须与 formula version、implementationId 和黄金样例一起版本化，禁止散落在组件中硬编码。
- Restock：必须有 cycleVersion、timezone、serverBasis、anchor/effective window、lastObserved、staleAfter、`calculateNextRestock` 映射；黄金样例覆盖跨日、时区/DST、过期与边界时刻。
- Value List：以 entity manifest 为分母公开覆盖率；所有展示值都有字段级 provenance。
- Tier List：所有纳入对象都有公开评分维度、证据和评分日期；不使用“主要种子”等不可验收描述。
- Guide：使用独立 evidence ledger，不强行依赖 value 数据合同。

未达到门槛时使用 `noindex, follow`，从 sitemap 移除，但 Preview 可继续验收。

## 7. 任务 DAG 与所有权

实施最多同时运行两个实现 worker；不同波次复用 agent，独立 evaluator 不修改生产代码。

| Task ID | 工作项 | 依赖 | Agent | 所有权文件/模块 | 禁止范围 | 产物 |
|---|---|---|---|---|---|---|
| GSC-00 | 导出当前 URL/query 基线 | 无 | 主线程 / fast_worker | 只读 GSC；`docs/seo-baseline/README.md`、`docs/seo-baseline/url-query-baseline.csv` | 不提交索引、不改生产 | 基线导出；无权限则在 README 记录 unavailable，不阻塞已确认方向 |
| EVIDENCE-00 | 建立 entity/value/formula/restock/evidence ledger、manifest 与合法 fixture | 无 | complex_worker | `src/data/game/entities.ts`、`src/data/game/values.ts`、`src/data/game/formulas.ts`、`src/data/game/restock-cycles.ts`、`src/data/game/evidence.ts`、`src/data/game/manifest.ts`、`src/lib/game-data/validate.ts` | 不改 `src/data/site.ts`、页面或竞品数据 | 可审计数据合同、覆盖率与黄金样例 |
| TEST-00 | 引入 Vitest 4.1.10 测试基础 | 无 | fast_worker | `package.json`、`package-lock.json`、`vitest.config.mts`、`tests/test-infrastructure.test.ts` | 不改生产逻辑或 feature test | 新 devDependency `vitest@4.1.10`；script `"test": "vitest run"`；基础 fixture test |
| CALC-01 | 首页 Core Calculator 数据驱动重构 | EVIDENCE-00、TEST-00 | complex_worker | `src/app/page.tsx`、`src/components/CalculatorTool.tsx`、`src/lib/calculators/core.ts`、`tests/calculators/core-calculator.test.ts` | 不改旧 Calculator route、SEO helper/site.ts | 可计算、可复制、可解释的首页主工具 |
| ROUTE-01 | 旧 Calculator 托管层迁移配置 | CALC-01 | worker | `vercel.json`、删除 `src/app/grow-a-garden-2-calculator/page.tsx` | 不用 Next redirect/meta/JS redirect，不改其他页面 | 未授权阶段只完成配置、schema/build 检查；真实 308/301 待单独授权的 Preview 验证 |
| TOOL-02 | Trading Calculator | EVIDENCE-00、TEST-00 | worker | `src/app/grow-a-garden-2-trading-calculator/page.tsx`、`src/components/TradingCalculator.tsx`、`src/lib/calculators/trading.ts`、`tests/calculators/trading-calculator.test.ts` | 不改主 Calculator | 双边交易比较工具 |
| TOOL-03 | Mutation Calculator | EVIDENCE-00、TEST-00 | worker | `src/app/grow-a-garden-2-mutation-calculator/page.tsx`、`src/components/MutationCalculator.tsx`、`src/lib/calculators/mutation.ts`、`tests/calculators/mutation-calculator.test.ts` | 不改 Pet/Stock | mutation 组合与解释工具 |
| TOOL-04 | Pet Calculator Preview → index gate | EVIDENCE-00、TEST-00 | worker；失败升级 complex_worker | `src/app/grow-a-garden-2-pet-calculator/page.tsx`、`src/components/PetCalculator.tsx`、`src/lib/calculators/pet.ts`、`tests/calculators/pet-calculator.test.ts` | 无可靠公式不得 index | 可验证模式；数据未达门槛时现有 Preview route 必须 noindex |
| DATA-02 | Value List | EVIDENCE-00 | worker | `src/app/grow-a-garden-2-value-list/page.tsx`、`src/components/ValueList.tsx` | 不生成实体薄页，不改共享 SEO 文件 | 可筛选值表、锚点、来源与覆盖率 |
| CONTENT-01 | Seeds/Gear/Stock 内容归并 | EVIDENCE-00 | worker | `src/app/grow-a-garden-2-seeds/page.tsx`、`src/app/grow-a-garden-2-gear/page.tsx`、`src/app/grow-a-garden-2-stock-tracker/page.tsx` | 不改组件、导航/site.ts，不编造刷新周期 | 实体 hub 与独立 Restock 页面形成内链闭环 |
| SUPPORT-01 | Codes/Release/Link/Night 辅助页按新架构收口 | EVIDENCE-00 | worker | `src/app/grow-a-garden-2-codes/page.tsx`、`src/app/grow-a-garden-2-release-date/page.tsx`、`src/app/grow-a-garden-2-official-link/page.tsx`、`src/app/grow-a-garden-2-night-stealing-guide/page.tsx`、`src/components/CodesTool.tsx`、`src/components/NightRiskTool.tsx`、`src/components/RobloxSnapshotCard.tsx`、`src/components/SourceList.tsx` | 不抢 Calculator 主意图，不编造 code/release/mechanic | 直接答案、来源/freshness、工具回链与安全边界 |
| RESTOCK-01 | Seed Restock Time | EVIDENCE-00、TEST-00 | worker | `src/app/grow-a-garden-2-seed-restock-time/page.tsx`、`src/components/SeedRestockTimer.tsx`、`src/lib/calculators/restock.ts`、`tests/calculators/seed-restock.test.ts` | 无 verified cycle 不得 index | 可解释倒计时；无数据时 noindex Preview |
| GUIDE-01 | Mutation/Plant Size/Pet Weight 指南与 Seed Tier gate | EVIDENCE-00、TOOL-03/04 | worker | `src/app/grow-a-garden-2-mutations-guide/page.tsx`、`src/app/grow-a-garden-2-plant-size-guide/page.tsx`、`src/app/grow-a-garden-2-pet-weight-guide/page.tsx`、`src/app/grow-a-garden-2-seed-tier-list/page.tsx` | 不改共享 value/site 数据，不用 GAG1 事实填充 | 四个 Preview route 均有完整状态；达到门槛才 index，否则 noindex 且不进 sitemap/nav/llms |
| TRUST-01 | 方法论、隐私、条款与 admin 索引边界 | EVIDENCE-00 | worker | `src/app/about/page.tsx`、`src/app/privacy-policy/page.tsx`、`src/app/terms/page.tsx`、`src/app/admin/data-console/page.tsx` | 不改公开工具页；admin 不得 index | 方法论/evidence/纠错说明；隐私条款同步；admin 显式 noindex |
| SEO-INTEGRATION | metadata/schema/sitemap/robots/llms/nav 串行收口 | 所有页面任务 | worker | `src/data/site.ts`、`src/lib/seo.ts`、`src/app/sitemap.ts`、`src/app/robots.ts`、`src/app/layout.tsx`、`src/components/SiteHeader.tsx`、`src/components/SiteFooter.tsx`、`public/llms.txt` | 不改页面主体，不给 draft 页 index | 唯一 SEO 合同、完整内链与系统文件 |
| DOC-01 | 旧 PRD 退役与新文档收口 | SEO-INTEGRATION | fast_worker | `README.md`、`docs/Grow_a_Garden_2_Tools_Hub_MVP_PRD.md`、`docs/gag2-growth-retention-prd.md`、`docs/GAG2_DATA_MAINTENANCE.md` | 不改生产代码；旧 PRD 改为简短 superseded notice 并保留 Git 历史 | 新计划成为唯一产品基线，维护/回滚说明同步 |
| EVAL-01 | 独立验收 | 所有任务 | evaluator | 只读评审与运行验证 | 首轮不修改生产代码 | EVAL 报告、AC 对照、残余风险 |

### 7.1 实施波次

1. **Wave 0：证据与测试合同** — GSC-00、EVIDENCE-00；随后 TEST-00。
2. **Wave 1：首页与迁移配置** — CALC-01 → ROUTE-01；未获 Preview 部署授权时只完成本地配置/构建，真实永久重定向 Gate 保持 BLOCKED。
3. **Wave 2：工具矩阵** — TOOL-02 与 TOOL-03 并行；随后 DATA-02、TOOL-04、RESTOCK-01。
4. **Wave 3：内容与信任页** — CONTENT-01 与 SUPPORT-01；随后 GUIDE-01、TRUST-01。
5. **Wave 4：全站串行收口** — SEO-INTEGRATION → DOC-01。
6. **Wave 5：独立验收** — EVAL-01；原实现者修复后由同一 evaluator 复验。

## 8. Acceptance Criteria

| AC ID | 可观察行为 | 验证方法 | 通过标准 | 对应 Task |
|---|---|---|---|---|
| AC-01 | 首页是唯一 Core Calculator canonical | 本地检查 title/H1/canonical/sitemap；授权后检查实际 HTTP redirect | `/` 自指 canonical；旧 URL 不在 sitemap/导航/llms；经授权 Preview 必须单跳永久 308/301 到 `/` | CALC-01/ROUTE-01/SEO-INTEGRATION |
| AC-02 | 首页首屏可完成估值 | 移动端手测 + 浏览器键盘操作 | 15 秒内完成一次计算；输入有 label、范围、错误提示 | CALC-01 |
| AC-03 | 结果可解释 | 检查结果 UI | 展示输入、公式版本、evidence/freshness、置信度与限制 | EVIDENCE-00/CALC-01 |
| AC-04 | Trading 任务独立成立 | 两侧添加多项并比较 | 总值、差额、百分比、公平口径正确；不出现真钱或 Robux 定价 | TOOL-02 |
| AC-05 | Mutation 不计算未知组合 | 自动 fixture + 手测 | compatible 组合正确；unknown/incompatible 明确阻止或降级 | TOOL-03 |
| AC-06 | Pet 页面不会伪装为完成 | 检查数据与 metadata | 有可靠公式则通过黄金样例；否则 noindex 且不在 sitemap | TOOL-04 |
| AC-07 | Value List 可承接同意图长尾 | 搜索/筛选/排序/锚点手测 | base value 和 fruit price 有实体 H2/锚点；无重复薄页 | DATA-02 |
| AC-08 | 未验证数据不作为事实发布 | 搜索 `confirmed`/数值与 evidence ledger | 所有 selectable/关键数值有字段级 evidence、observedAt、verifiedAt、gameVersion、license；Unknown 不参与默认计算 | EVIDENCE-00/CONTENT-01/GUIDE-01 |
| AC-09 | 页面可被爬虫直接理解 | 查看构建后的 HTML | 禁用 JS 仍有唯一 H1、直接答案、来源、主要内链 | 全部公开页 |
| AC-10 | Schema 与页面一致 | 外部 Schema Validator + 人工比对 | JSON-LD 中每个 FAQ/Item 都在页面可见；无虚假 Product/Rating；不把 rich result 当成功指标 | SEO-INTEGRATION |
| AC-11 | 导航与 sitemap 只暴露可发布页面 | 路由枚举、抓 sitemap/robots/llms | 无 draft/noindex URL；无 404 内链；admin noindex/disallow | SEO-INTEGRATION |
| AC-12 | 项目验证绿色 | 执行真实命令 | `npx tsc --noEmit` 与 `npm run build` 退出码 0 | EVAL-01 |
| AC-13 | 性能与可访问性不过度回退 | Lighthouse/人工键盘检查 | Mobile LCP 目标 <2.5s；交互可聚焦、有 label、无严重 a11y error | EVAL-01 |
| AC-14 | 文档与实现同步 | diff review | README/PRD/维护与回滚说明反映实际路由和数据门槛 | DOC-01 |
| AC-15 | 旧 PRD 已退役 | 检查两份旧 PRD、README 与新计划 | 旧 PRD 只保留 superseded notice 并链接本计划；不再有并行产品基线 | DOC-01 |
| AC-16 | 计算核心有确定性自动验证 | 运行新增 `npm test` | 正常、0/负数/NaN、上限、未知组合、舍入、双方相等/空边、restock 边界黄金样例全部通过 | TEST-00/CALC-01/TOOL-02~04/RESTOCK-01 |
| AC-17 | 辅助与信任页服从新主架构 | 检查页面首段、来源、内链与 robots | Codes/Release/Link/Night 不抢 Calculator 主意图；About 有方法论；admin noindex；Privacy/Terms 与实际数据使用一致 | SUPPORT-01/TRUST-01 |

## 9. 测试矩阵

| 层级 | 主路径 | 错误路径 | 边界/回归 | 真实命令或步骤 |
|---|---|---|---|---|
| 类型/构建 | 所有 route 静态生成 | 缺数据、非法 enum | 新页面不破坏现有 route | `npx tsc --noEmit`；`npm run build` |
| 自动测试基础 | test script 与首个 fixture | 测试失败退出非 0 | package lock 可复现 | TEST-00 新增后运行 `npm test`；当前尚不可用 |
| Calculator | 合法植物/重量/mutation | 空值、0、负值、NaN、未知组合 | 最小/最大值、数量 1、浮点舍入 | `npm test` + 浏览器手测 |
| Trading | 双边各一项、多项 | 单边为空、未知价格 | 相等、极大差额、重复物品、舍入 | `npm test` + 浏览器手测 |
| Value List | 搜索/筛选/排序/锚点 | 无结果、缺 source | 移动端表格、长名称 | 浏览器手测 |
| SEO | title/H1/canonical/schema | duplicate canonical、draft 进 sitemap | trailing slash、旧 URL redirect、404 | 检查构建 HTML；本地 `curl.exe -I`；Schema validator |
| Accessibility | 键盘完成主任务 | error 文案可感知 | 320px viewport、200% zoom | 外部人工步骤：浏览器 keyboard/响应式检查；axe 非仓库命令 |
| Performance | 经授权 Preview/生产核心路由实测 | 慢资源/JS error | Mobile LCP 与交互回归 | 外部人工步骤：Lighthouse；未授权时只记录为待验证 |
| Preview/Production（均需单独授权） | `/` 200、旧 Calculator 单跳永久 308/301 | 404/5xx、redirect loop、canonical 错误 | robots/sitemap/llms 缓存 | 仓库当前无部署/dry-run 命令；授权后用平台流程部署并 `curl.exe -I` smoke |

说明：当前 `package.json` 没有 lint/test 脚本，`.github` CI 也不存在，因此 lint/test/CI 当前均为“不可用”。TEST-00 是拟新增能力，在其落地前不得把 `npm test` 写成已存在命令；Lighthouse、axe、Schema Validator 是外部人工步骤。

## 10. 风险、回滚与发布

### 10.1 主要风险

| 风险 | 影响 | 控制 |
|---|---|---|
| 首页/Calculator 迁移 | 丢失既有 URL 权益或形成重复页 | 保存 GSC 基线；本地先完成唯一 canonical；经授权 Vercel Preview 证明永久 308/301 后才允许生产迁移 |
| 静态导出误用 framework redirect | 构建失败或旧 URL 仍返回 200 | 只使用 `vercel.json` 托管层规则并实际验证；不用 Next/meta/JS redirect 代替 |
| 游戏数据错误或过时 | 计算错误、信任受损 | verification state、formula version、stale 降级、纠错入口 |
| 为未知长尾批量造页 | 薄内容与索引膨胀 | index gate；同意图合并；GSC 证据后再拆页 |
| Trading 被理解为真钱交易 | 合规/品牌风险 | 仅 fan-made in-game estimate；禁止 Robux/现金/第三方交易入口 |
| FAQ/schema 过度承诺 | structured data policy 风险 | 只标记可见事实，不承诺 PAA/rich result |
| 用户当前未提交改动被覆盖 | 数据/工作损失 | 每个 worker 先看 status/diff，限定文件所有权，禁止 reset/checkout |

### 10.2 回滚

- 路由迁移：保留迁移前 commit、GSC 基线和 redirect map；回滚时移除 `vercel.json` 对应规则、恢复旧 Calculator route，并恢复首页原结构和各自 canonical。
- 数据发布：按 formula/data version 回退到最近已确认 snapshot；严重错误优先将记录降级为 Unknown/Stale。
- 新页面：从导航、sitemap、llms.txt 移除并设 noindex，不删除原始验证记录。
- 前端：通过正常 Git revert/回滚提交恢复；不得使用 `git reset --hard` 或覆盖用户未提交改动。

### 10.3 文档影响

- 实施时必须同步 `README.md`、数据维护说明和发布/回滚说明；两份旧 PRD 改为 superseded notice，统一指向本计划。
- 当前计划本身不改变产品代码，因此本轮 README/CHANGELOG 无需改动。
- 仓库当前没有 CHANGELOG；实施阶段若建立版本发布流程，再新增并记录首个可追溯版本。

### 10.4 Preview / Production 授权状态

- 本地实现、`npx tsc --noEmit`、`npm test`（TEST-00 落地后）与 `npm run build`：可按计划执行。
- 仓库当前没有已检查入库的 Preview/生产部署或 dry-run 命令；Preview 与生产部署均需用户单独授权。
- GSC/Bing 提交、IndexNow 非 dry-run、真实通知、外部推广：**未授权**。
- 未授权时 ROUTE-01 只能报告“配置与本地构建完成，真实 308/301 尚未验证”；整体状态只能是“实现与本地验证完成，尚未 Preview/发布”。

## 11. 发布后的量化验证

不以专家工具的 KD 作为成功标准，使用真实数据形成 14/30 天回看：

- 每个 canonical URL 的 impressions、clicks、CTR、average position。
- Query cluster：calculator、trading、mutation、pet、value list、stock/restock、codes。
- 工具完成率、复制/分享率、Value List 筛选率、相邻工具点击率。
- 旧 Calculator URL 的永久重定向命中、新首页 canonical 的收录状态及核心 query 迁移。
- draft/noindex 页面是否意外出现在 sitemap 或索引报告。
- 只有当单实体 query 产生稳定曝光、且能提供独立内容价值时，才批准拆分程序化页面。

## 12. Plan Gate

- 结论：**PASS WITH DATA GATES**
- 已采用用户明确决策：SEO 对话是最新产品基线；`/` 改为 Core Calculator，旧 `/grow-a-garden-2-calculator/` 迁移到首页；旧两份 PRD 退役。
- 可立即开始：GSC-00、EVIDENCE-00、TEST-00。GSC 无权限只记录 unavailable，不阻塞已确认产品方向。
- 路由发布 Gate：当前因缺少 Preview 部署授权保持 `BLOCKED`；授权后 `vercel.json` 必须在 Vercel Preview 返回实际单跳永久 308/301。
- Pet Calculator、Seed Tier List、三篇规则指南的 index 条件：数据/公式/方法达到本计划第 6.2 节门槛。
- Seed Restock Time 的 index 条件：已验证 cycle、服务器/时区口径、last observed 与 stale fallback 达到第 6.2 节门槛。
- Production 条件：独立 evaluator 通过、用户另行明确授权、部署后完成 live smoke check。
