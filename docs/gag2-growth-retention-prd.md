# Grow a Garden 2 工具站增长与玩家留存 PRD

> 项目：growagarden2.pro  
> 仓库：`stewart-lhc/GAG2`  
> 路径：`docs/gag2-growth-retention-prd.md`  
> 版本：v1.0  
> 日期：2026-06-06

---

## 1. 背景与结论

growagarden2.pro 当前已经有可信 MVP 骨架：Release、Official Link、Stock Tracker、Codes、Calculator、Night Stealing Guide、About、Privacy、Terms 等页面方向正确；核心优势是 verified-only、不乱编上线时间、不发假 codes、不要求 Roblox 登录、不碰账号/Robux/虚拟物品交易、不提供脚本或 exploit。

但从玩家角度看，当前站点更像「可信信息页」，还不是会被每天打开的工具站。下一阶段目标是把站点升级成玩家打开 Roblox 前会顺手查看的 30 秒工具面板：

```text
打开 growagarden2.pro
→ 确认 GAG2 是否可玩
→ 打开官方 Roblox 链接
→ 看实时玩家数、访问量和变化
→ 查看 stock/watchlist
→ 检查 verified codes
→ 使用 calculator 或 night risk planner
→ 跳转 Roblox
```

核心策略：

1. 用实时 Roblox Snapshot 建立信任。
2. 用本地 Watchlist 建立回访动机。
3. 用「上次访问以来变化」制造每日查看价值。
4. 用 Night Stealing Planner 做出 GAG2 差异化。
5. 用 SEO 页面矩阵抢占上线前后高意图流量。

---

## 2. 产品目标

### 2.1 业务目标

| 目标 | 说明 |
|---|---|
| 提升回访 | 让用户从一次性查询变成每日打开 |
| 抢占 SEO | 覆盖 release、official link、codes、stock、calculator、night stealing、player count 等关键词 |
| 建立可信定位 | 区别 fake codes、fake clone、标题党攻略站 |
| 沉淀数据资产 | Roblox snapshot、codes、stock reports、用户行为事件 |
| 提高工具使用率 | 每个核心页面都有可操作动作，不只是文章阅读 |

### 2.2 用户目标

玩家来到网站后，需要快速回答：

1. Grow a Garden 2 现在到底能不能玩？
2. 哪个 Roblox 链接是可信入口？
3. 当前玩家数、访问量、收藏量有没有变化？
4. 有没有 verified GAG2 codes？
5. 我关注的 seed、gear、egg、event stock 有没有更新？
6. 我这波 harvest / mutation / crop value 大概值多少？
7. 我准备 AFK 或离开游戏时，要不要先收高价值作物？

---

## 3. 用户画像

| 用户类型 | 特征 | 核心需求 |
|---|---|---|
| 新玩家 | 从 Google、TikTok、YouTube 搜 GAG2 | 找官方链接、确认上线、避免 fake games |
| 活跃玩家 | 每天玩 Grow a Garden / Roblox | 查 stock、codes、更新、player count |
| 高价值玩家 | 关注收益、mutation、稀有物品 | Calculator、trade value、night stealing risk |
| 社区传播者 | 在 Discord、Reddit、X 分享信息 | 分享状态卡、计算结果、提交 stock report |

关键心理：怕错过稀有 stock；怕点到假链接；想比别人更早知道更新；想快速判断现在值不值得上线；想在 AFK 前降低损失。

---

## 4. MVP 范围

### 4.1 P0 必做

| 模块 | 目标 |
|---|---|
| Live Roblox Snapshot | 展示实时玩家数、访问量、收藏量、Roblox updated time、last synced |
| 首页首屏改版 | 从营销文案改为玩家决策面板 |
| Stock Watchlist Mode | 即使 stock 未完全验证，也能让玩家选择关注项 |
| Codes Verified + Scam Filter | 不只显示 0 codes，要解释 fake code 风险并收集提醒意图 |
| Calculator Save/Share/Compare | 从一次性工具变成可保存、可分享、可比较工具 |
| Night Stealing Planner v1 | 做出 GAG2 差异化工具 |
| Change Since Last Visit | 回访时展示上次以来数据变化 |
| SEO 基础 | sitemap、robots、canonical、metadata、structured data、核心落地页 |
| Analytics | 埋点核心行为，衡量粘性和转化 |

### 4.2 P1 两周内做

| 模块 | 目标 |
|---|---|
| Player Count History | 24h/7d player count 趋势图 |
| Community Stock Report | 玩家提交 stock，使用 Reported / Cross-checked / Verified 分层 |
| Browser Notification / Discord Alert | 稀有 stock、codes、更新提醒 |
| Update Changelog | 自动记录 Roblox updated time 和站内数据变更 |
| Programmatic SEO Pages | seeds、gears、guilds、night stealing、fake games、player count 等专题 |

### 4.3 暂不做

| 功能 | 原因 |
|---|---|
| Roblox 登录 | 增加安全和合规风险，MVP 不需要 |
| 自动抢 stock / 自动进入服务器 | 平台风险高，不符合工具站定位 |
| 账号、Robux、虚拟物品交易 | 明确不碰 |
| exploit/script/injector | 明确不碰 |
| 重账号体系 | MVP 阶段 localStorage 足够 |

---

## 5. 核心功能 PRD

## 5.1 Live Roblox Snapshot

### 目标

让用户明确感知网站是活的工具，不是过时文章。

### 展示位置

首页首屏、Release 页面、Official Link 页面、Player Count 页面。

### 字段

| 字段 | 说明 |
|---|---|
| Experience page status | Roblox experience 页面是否存在 |
| Playing | 当前在线玩家数 |
| Visits | 累计访问量 |
| Favorites | 收藏量 |
| Last Roblox updated | Roblox API 返回的更新时间 |
| Last synced | 本站最后同步时间 |
| Delta since last snapshot | 与上一条快照相比的变化 |
| Delta since user last visit | 与该用户上次访问相比的变化 |

### 状态表达

不要只显示「Out / Not Out」。拆成三段：

| 状态 | 文案 |
|---|---|
| Experience page exists | Confirmed |
| Public playable status | Live / Mixed signals / Not running / Checking |
| Exact release schedule | Unknown unless official source confirms |

### API/数据建议

1. 后端 cron 每 3–10 分钟拉取 Roblox public games API。
2. 写入 `roblox_snapshots` 表或轻量 KV。
3. 前端读取 `/api/roblox/snapshot`。
4. 页面展示 `Source: Roblox public API`。
5. 保留 7–30 天历史快照用于趋势图。

### 验收标准

- [ ] 首页能展示最新 snapshot。
- [ ] 显示 last synced，并用 `x min ago` 形式展示。
- [ ] API 拉取失败时展示最近一次成功快照，并标记 stale。
- [ ] 不展示没有官方来源的精确上线时间。
- [ ] 玩家无需登录即可查看 snapshot。

---

## 5.2 首页玩家化改版

### 推荐首屏文案

```text
H1: Is Grow a Garden 2 Out? Check the Official Roblox Page First

Subtitle:
Open the safe Roblox link, check live player count, watch stock, verify codes,
and plan before night stealing.

CTA:
[Open Official Roblox Page]
[Check Live Status]
[Watch Stock]
[Check Codes]
```

### 首页首屏卡片

| 卡片 | 内容 |
|---|---|
| Official Link | Safe Roblox page button + fake clone warning |
| Live Status | Playing / Visits / Last synced |
| Codes | 0 verified / last checked / alert me |
| Stock | Watchlist count / verified status |
| Night Planner | AFK risk quick check |

### 验收标准

- [ ] 用户进入首页 3 秒内能找到官方 Roblox 链接。
- [ ] 用户能看到 last synced。
- [ ] 首页不要出现无解释的玄学评分；若保留 readiness score，必须展示公式和原因。
- [ ] 首页首屏 CTA 不超过 4 个。

---

## 5.3 Stock Watchlist Mode

### 背景

GAG/GAG2 玩家强需求是不要错过稀有 stock。即使当前无法稳定验证 GAG2 stock 数据，也可以先用 Watchlist 建立回访行为。

### MVP 功能

玩家无需登录，可以选择关注项并保存到 localStorage。

| Watch 类型 | 示例 |
|---|---|
| Seed | Rare Seed / Event Seed / High-value Seed |
| Gear | Defense Gear / Utility Gear |
| Pet Egg | Rare Egg / Event Egg |
| Weather/Event | Special weather / limited event |
| Codes | First verified GAG2 code |

### 页面结构

```text
Stock Tracker

Current verified stock:
- Seed Shop: awaiting verified cycle
- Gear Shop: awaiting verified cycle
- Pet Egg: awaiting verified cycle
- Event Shop: awaiting verified cycle

Your Watchlist:
[ ] Rare Seed
[ ] Defense Gear
[ ] Pet Egg
[ ] Event Shop
[ ] Weather/Event

[Save Watchlist]
```

### 验收标准

- [ ] 用户可以选择至少 5 类关注项。
- [ ] 刷新页面后 Watchlist 保留。
- [ ] 首页显示 Watchlist 摘要。
- [ ] 无 verified 数据时，也有清晰空状态和下一步动作。
- [ ] 不把未经验证的 stock 展示为 verified。

---

## 5.4 Codes Verified + Scam Filter

### 页面结构

```text
Grow a Garden 2 Codes

Active GAG2 Codes: 0 verified
Last checked: YYYY-MM-DD HH:mm UTC

No verified GAG2 codes yet.
We do not repost GAG1 codes as GAG2 codes unless confirmed.

Fake code warning:
- Free Robux claims
- External login pages
- Download scripts
- Survey unlock pages
- "20 new codes" bait videos without official source

[Alert me when first verified code drops]
```

### 功能要求

1. Active / Expired 分开。
2. 每个 code 展示：code、reward、status、source、first seen、last verified。
3. 支持复制 code。
4. 支持 report fake code。
5. 没有 code 时，也要有防骗内容、验证规则和提醒入口。

### 验收标准

- [ ] 不展示未验证 code。
- [ ] 不把 GAG1 code 自动归为 GAG2 code。
- [ ] 用户可以一键复制 code。
- [ ] 用户可以提交疑似 fake code。
- [ ] Codes 页至少产生一个用户动作：复制、订阅、举报、跳转官方链接。

---

## 5.5 Calculator Save / Share / Compare

### MVP 输入

| 字段 | 类型 | 说明 |
|---|---|---|
| Crop name | text | 可选 |
| Base value | number | 基础价值 |
| Weight | number | 重量 |
| Amount | number | 数量 |
| Mutation multiplier | number | 变异倍数 |
| Risk mode | select | Normal / Night / AFK |
| Defense confidence | select | Low / Medium / High |

### MVP 输出

| 输出 | 说明 |
|---|---|
| Estimated value | 估算总价值 |
| Formula | 透明展示计算逻辑 |
| Night risk hint | 如果选择 Night/AFK，则提示风险 |
| Recommended action | Harvest now / Keep growing / Protect first |
| Copy result | 复制结果 |
| Save calculation | 保存到 localStorage |
| Compare | 与另一个保存结果比较 |

### 验收标准

- [ ] 计算结果实时更新或点击后更新。
- [ ] 公式透明展示，不伪装为官方公式。
- [ ] 用户可以保存最近 10 条计算。
- [ ] 用户可以复制结果文本。
- [ ] 用户可以比较两条计算结果。
- [ ] 无需登录。

---

## 5.6 Night Stealing Planner v1

### MVP 输入

| 字段 | 类型 |
|---|---|
| Crop estimated value | number |
| Leaving duration | `<15m` / `15–60m` / `1–3h` / `overnight` |
| Is it night? | boolean |
| Crop harvestable? | boolean |
| Defense gear confidence | Low / Medium / High / Unknown |
| Guild protection | Yes / No / Unknown |
| Risk tolerance | Low / Medium / High |

### MVP 输出

| 输出 | 示例 |
|---|---|
| Risk level | Low / Medium / High |
| Recommended action | Harvest now / Protect first / Safe to leave |
| Explanation | High value + night + low defense = high risk |
| AFK checklist | 收高价值作物、检查防御、查看 guild 状态 |

### 风险评分建议

初版使用规则评分，不伪装为官方公式。

| 条件 | 分数 |
|---|---|
| Crop value 高 | +2 |
| Leaving duration > 1h | +2 |
| Night = yes | +2 |
| Harvestable = yes | +1 |
| Defense confidence = low/unknown | +2 |
| Guild protection = no/unknown | +1 |
| Risk tolerance = low | +1 |

输出规则：0–2 Low，3–5 Medium，6+ High。

### 验收标准

- [ ] 用户能在 30 秒内完成一次风险评估。
- [ ] 结果给出明确建议，而不是只有分数。
- [ ] 明确标注 fan-made planner，不是官方机制公式。
- [ ] 用户可以复制 AFK checklist。
- [ ] 页面 SEO title 包含 `Grow a Garden 2 Night Stealing Guide`。

---

## 5.7 Change Since Last Visit

### 目标

提高回访价值。让用户每次回来都知道和上次有什么不同。

### 数据来源

localStorage 保存用户上次访问时的 snapshot。

```json
{
  "lastVisitAt": "2026-06-06T10:00:00Z",
  "playing": 162,
  "visits": 593710,
  "favorites": 5428,
  "lastRobloxUpdated": "2026-06-06T02:43:38Z",
  "verifiedCodesCount": 0,
  "watchlist": ["rare_seed", "defense_gear"]
}
```

### 展示示例

```text
Since your last visit:
- Visits changed from 493K to 593K
- Roblox experience was updated
- Verified GAG2 codes: still 0
- Your watchlist: Rare Seed, Defense Gear
```

### 验收标准

- [ ] 首次访问展示 `Start tracking changes`。
- [ ] 二次访问展示变化摘要。
- [ ] 用户可以清除本地记录。
- [ ] 所有数据本地保存，不需要账号。

---

## 5.8 Community Stock Report

### 阶段

P1，但 P0 需要预留入口。

### 提交字段

| 字段 | 类型 |
|---|---|
| Shop type | Seed / Gear / Egg / Event / Weather |
| Item name | text |
| Rarity | select |
| Seen at | timestamp |
| Server time | optional |
| Screenshot | optional |
| Reporter nickname | optional |

### 可信状态

| 状态 | 定义 |
|---|---|
| Reported | 单个玩家提交 |
| Cross-checked | 多个玩家报告一致 |
| Verified | 管理员或可信来源确认 |

### 验收标准

- [ ] 用户提交后不会立刻变成 verified。
- [ ] 页面展示 reported 与 verified 的区别。
- [ ] 管理后台可审核、合并、驳回 report。
- [ ] 可标记恶意提交或重复提交。

---

## 6. SEO PRD

### 6.1 P0 SEO 基础

| 项目 | 要求 |
|---|---|
| sitemap.xml | 包含所有核心页面，自动更新 lastmod |
| robots.txt | 包含 Sitemap 地址 |
| canonical | 每页唯一 canonical |
| title | 每页唯一，包含主关键词 |
| meta description | 每页唯一，控制在可读长度 |
| OG/Twitter Card | 分享时展示标题、描述、缩略图 |
| BreadcrumbList | 有面包屑的页面加结构化数据 |
| FAQPage/QAPage | 只有真实 FAQ 内容时添加，不滥用 |

### 6.2 核心页面矩阵

| URL | 目标关键词 | 页面目标 |
|---|---|---|
| `/` | grow a garden 2 | 首页聚合 |
| `/is-grow-a-garden-2-out/` | is grow a garden 2 out | 上线状态 |
| `/grow-a-garden-2-release-date/` | grow a garden 2 release date | 发布信息 |
| `/grow-a-garden-2-official-roblox-link/` | grow a garden 2 official link | 官方链接 |
| `/grow-a-garden-2-fake-games/` | grow a garden 2 fake games | 防假链接 |
| `/grow-a-garden-2-stock-tracker/` | grow a garden 2 stock tracker | Stock 工具 |
| `/grow-a-garden-2-codes/` | grow a garden 2 codes | Codes 验证 |
| `/grow-a-garden-2-calculator/` | grow a garden 2 calculator | 计算器 |
| `/grow-a-garden-2-night-stealing/` | grow a garden 2 night stealing | 夜晚偷取攻略 |
| `/grow-a-garden-2-player-count/` | grow a garden 2 player count | 玩家数趋势 |
| `/grow-a-garden-2-guilds/` | grow a garden 2 guilds | Guilds 机制 |
| `/grow-a-garden-2-gears/` | grow a garden 2 gears | Gears/防御 |
| `/grow-a-garden-2-seeds/` | grow a garden 2 seeds | Seeds 列表 |
| `/grow-a-garden-2-vs-grow-a-garden/` | grow a garden 2 vs grow a garden | 对比页 |
| `/grow-a-garden-2-updates/` | grow a garden 2 updates | 更新日志 |

### 6.3 页面内容原则

1. 不为了 SEO 编造未确认信息。
2. 未确认信息必须明确标注 Rumor / Unverified。
3. 每页都要有一个工具型动作，不能只有文章。
4. 每页必须有 last updated / last verified。
5. 每页内部链接到至少 2 个相关工具页。

---

## 7. 数据与后台

### 7.1 数据表建议

#### `roblox_snapshots`

| 字段 | 类型 |
|---|---|
| id | uuid |
| universe_id | string |
| playing | integer |
| visits | integer |
| favorites | integer |
| roblox_updated_at | datetime |
| fetched_at | datetime |
| source_url | string |
| fetch_status | success/fail |
| error_message | text nullable |

#### `verified_codes`

| 字段 | 类型 |
|---|---|
| id | uuid |
| code | string |
| reward | string |
| status | active/expired/unverified/rejected |
| source_type | official/community/manual |
| source_url | string nullable |
| first_seen_at | datetime |
| last_verified_at | datetime |
| notes | text |

#### `stock_reports`

| 字段 | 类型 |
|---|---|
| id | uuid |
| shop_type | seed/gear/egg/event/weather |
| item_name | string |
| rarity | string nullable |
| seen_at | datetime |
| reporter_name | string nullable |
| screenshot_url | string nullable |
| status | reported/cross_checked/verified/rejected |
| created_at | datetime |
| reviewed_at | datetime nullable |
| reviewer | string nullable |

#### `site_events`

| 字段 | 类型 |
|---|---|
| id | uuid |
| event_name | string |
| page_path | string |
| anonymous_user_id | string |
| payload | json |
| created_at | datetime |

### 7.2 管理后台 P0

后台至少支持：查看 Roblox snapshot 状态、手动触发 Roblox sync、管理 codes、管理 stock reports、编辑页面 last verified 文案、查看关键事件统计。

---

## 8. 埋点设计

### 8.1 核心事件

| 事件名 | 触发 |
|---|---|
| `official_link_click` | 点击官方 Roblox 链接 |
| `live_status_view` | 查看 Live Snapshot |
| `stock_watchlist_save` | 保存 stock watchlist |
| `code_copy` | 复制 code |
| `code_alert_intent` | 点击 code alert |
| `fake_code_report_submit` | 提交 fake code |
| `calculator_calculate` | 计算器计算 |
| `calculator_save` | 保存计算结果 |
| `calculator_share` | 复制/分享计算结果 |
| `night_planner_calculate` | 夜晚风险计算 |
| `afk_checklist_copy` | 复制 AFK checklist |
| `stock_report_submit` | 提交 stock report |
| `returning_user_change_view` | 回访用户看到变化摘要 |

### 8.2 指标

| 指标 | 目标 |
|---|---|
| D1 Returning Rate | 衡量是否形成回访 |
| Watchlist Save Rate | 衡量工具粘性 |
| Official Link CTR | 衡量首页核心动作 |
| Calculator Completion Rate | 衡量工具可用性 |
| Night Planner Completion Rate | 衡量差异化工具价值 |
| Codes Alert Intent Rate | 衡量通知需求 |
| Stock Report Submit Rate | 衡量社区参与 |
| Indexed Pages Count | 衡量 SEO 基础是否生效 |
| Organic Clicks | 衡量搜索流量增长 |

---

## 9. 用户故事与验收标准

### Story 1：新玩家确认官方入口

作为新玩家，我想确认 GAG2 的官方 Roblox 页面，这样我不会点到 fake game。

- [ ] 首页首屏有明显 Official Roblox Page 按钮。
- [ ] Official Link 页面解释为什么这是可信入口。
- [ ] 页面提示不要输入 Roblox 密码、cookie、token。
- [ ] 用户点击官方链接会触发埋点。

### Story 2：活跃玩家查看实时状态

作为活跃玩家，我想知道当前玩家数和访问量有没有变化，这样我能判断是否值得上线看看。

- [ ] 页面展示 playing、visits、favorites、last synced。
- [ ] 数据过期时显示 stale。
- [ ] 二次访问显示 since last visit。
- [ ] 有 player count history 页面入口。

### Story 3：玩家关注稀有 stock

作为玩家，我想选择我关注的 seed/gear/egg，这样数据可用时我能更快发现变化。

- [ ] Stock 页可保存 Watchlist。
- [ ] 刷新页面后 Watchlist 仍在。
- [ ] 首页展示 Watchlist 摘要。
- [ ] 无 verified stock 时也有清晰空状态。

### Story 4：玩家查 codes 但不被骗

作为玩家，我想知道有没有 verified GAG2 codes，同时识别 fake codes。

- [ ] Codes 页显示 active/expired/last checked。
- [ ] 没有 code 时展示防骗提示。
- [ ] 不发布未验证 code。
- [ ] 用户可提交 fake code report。

### Story 5：玩家 AFK 前判断风险

作为玩家，我准备离开游戏一段时间，想知道是否应该先收掉高价值作物。

- [ ] Night Planner 可输入 crop value、离开时间、night、defense、guild 等字段。
- [ ] 输出 Low/Medium/High 风险。
- [ ] 输出明确建议。
- [ ] 可复制 AFK checklist。

---

## 10. 非功能需求

### 10.1 性能

1. 首页 LCP 目标 < 2.5s。
2. JS 首屏包体尽量小，工具逻辑按页面分包。
3. Snapshot API 设置缓存，避免每次请求都打第三方 API。
4. P95 API 响应 < 500ms，失败时回退最近快照。

### 10.2 安全

1. 不收集 Roblox 密码、cookie、token。
2. 所有用户提交内容做基本过滤和长度限制。
3. Stock report screenshot 如果开放上传，需要限制类型和大小。
4. 管理后台需要鉴权。
5. 不执行任何用户提交脚本。
6. 外链打开使用安全属性。

### 10.3 隐私

1. MVP 不要求登录。
2. Watchlist 和 recent calculations 默认保存在 localStorage。
3. Analytics 使用匿名 ID。
4. Privacy 页面说明收集的数据范围和用途。

### 10.4 合规边界

禁止：Roblox 账号登录代理、自动抢 stock、自动 redeem code、账号/Robux/虚拟物品真钱交易、exploit/script/injector、绕过 Roblox 技术限制或安全机制。

允许：信息展示、手动输入计算、玩家自愿提交 stock report、官方链接导航、本地 Watchlist、浏览器/Discord 通知意图，前提是不要求 Roblox 凭据。

---

## 11. 排期建议

### Day 1–2：可信数据与 SEO 基础

- [ ] Roblox snapshot cron。
- [ ] 首页 Live Snapshot 卡片。
- [ ] Release / Official Link 页面同步显示 snapshot。
- [ ] sitemap.xml。
- [ ] robots.txt。
- [ ] canonical / metadata。
- [ ] 基础埋点。

### Day 3–5：玩家动作闭环

- [ ] Stock Watchlist localStorage。
- [ ] Codes scam filter + alert intent。
- [ ] Calculator save/copy/compare。
- [ ] Night Planner v1。
- [ ] Change Since Last Visit。
- [ ] 首页 Watchlist 和变化摘要。

### Week 2：增长与社区

- [ ] Player Count History。
- [ ] Community Stock Report。
- [ ] Admin review flow。
- [ ] Fake games 页面。
- [ ] GAG2 vs GAG 页面。
- [ ] Guilds / gears / seeds 专题页。
- [ ] Browser notification 或 Discord alert 原型。

---

## 12. 风险与应对

| 风险 | 影响 | 应对 |
|---|---|---|
| 官方信息变化快 | 页面过时导致信任下降 | last synced + last verified + 快照历史 |
| Stock 数据不可靠 | 玩家误导、信任受损 | Reported / Cross-checked / Verified 分层 |
| SEO 竞争激烈 | 增长慢 | 用工具型页面和实时数据差异化 |
| Fake code 泛滥 | 用户被骗 | Scam filter + verified-only |
| 平台合规风险 | 站点被投诉或品牌风险 | 不碰登录、交易、脚本、自动化 |
| 低龄用户多 | UX/安全要求更高 | 简洁文案、强防骗提示、少收集数据 |

---

## 13. 成功标准

### 首周

1. Google Search Console 完成验证。
2. 核心页面进入 sitemap。
3. 首页展示 Live Snapshot。
4. Watchlist save rate > 5%。
5. Calculator completion rate > 10%。
6. Official link CTR 可被稳定追踪。

### 30 天

1. D1 returning rate 有明显提升。
2. Player count / stock / codes / calculator 页面成为主要入口之一。
3. 至少 30% 工具页访问产生一个行为事件。
4. 至少 5 个核心关键词有 impression。
5. Community report 有真实提交，且不破坏 verified-only 可信定位。

---

## 14. 开发任务拆分

### Backend

- [ ] 新增 Roblox snapshot fetcher。
- [ ] 新增 snapshot API。
- [ ] 新增 snapshot storage。
- [ ] 新增 codes data model。
- [ ] 新增 stock report model。
- [ ] 新增 admin review API。
- [ ] 新增 analytics event API 或接入现有 analytics。

### Frontend

- [ ] 首页 Live Snapshot 卡片。
- [ ] 首页 Official Link CTA。
- [ ] 首页 Watchlist 摘要。
- [ ] Change Since Last Visit 组件。
- [ ] Stock Watchlist 组件。
- [ ] Codes scam filter 区块。
- [ ] Calculator save/copy/compare。
- [ ] Night Planner v1。
- [ ] Player Count 页面 v1。

### SEO

- [ ] sitemap.xml。
- [ ] robots.txt。
- [ ] canonical。
- [ ] metadata。
- [ ] OG/Twitter cards。
- [ ] Breadcrumb structured data。
- [ ] FAQ structured data only where applicable。
- [ ] 新增 10 个核心专题页面。

### Content

- [ ] Official link 防假说明。
- [ ] Fake code 防骗说明。
- [ ] Night stealing AFK checklist。
- [ ] GAG2 vs GAG1 对比。
- [ ] Seeds/gears/guilds 占位但不编造。
- [ ] Release status 文案重写。

---

## 15. Open Questions

1. 当前技术栈是否已有 server-side cron 能力？如果没有，使用 Vercel Cron、GitHub Actions、Cloudflare Workers 还是其他方案？
2. 是否已有数据库？如果没有，P0 是否先用 KV/JSON snapshot？
3. 是否需要 Discord Bot，还是先做浏览器通知/邮件收集？
4. 是否允许用户上传 screenshot？如允许，需要确定存储和审核策略。
5. Player Count History 保留 7 天、30 天还是 90 天？
6. docs 页面作为公开 product spec，还是仅 repo 内部使用？

---

## 16. 推荐下一步

优先级最高的 4 件事：

1. Live Roblox API Snapshot。
2. Personal Stock / Code Watchlist。
3. Change Since Last Visit。
4. Night Stealing Planner。

这四件事完成后，growagarden2.pro 才会从「我搜到一次的页面」升级为「我玩之前会回来看的工具站」。
