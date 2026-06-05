# Grow a Garden 2 Tools Hub

**MVP PRD / 产品需求文档**  
面向 Roblox Grow a Garden 2 玩家搜索流量的工具站 MVP

| **字段**     | **内容**                                                                     |
|--------------|------------------------------------------------------------------------------|
| 文档版本     | v0.1                                                                         |
| 日期         | 2026-06-05                                                                   |
| 产品阶段     | MVP / 首发验证                                                               |
| 建议站点定位 | Unofficial fan tools hub: release info + stock tracker + calculators + codes |
| 核心目标     | 先获取搜索流量，再通过提醒、收藏、Discord 订阅形成留存                       |
| 默认语言策略 | 英文优先，中文可作为次级内容或运营后台语言                                   |

> **重要说明：**本文档基于 2026-06-05 可观察到的公开信息和工具站机会判断。Grow a Garden 2 的精确正式上线时间未作为确定事实写入需求；所有上线信息页必须区分 Confirmed / Rumor / Unknown。

免责声明：本 PRD 面向第三方非官方工具站，不代表 Roblox 或 Grow a Garden / Grow a Garden 2 开发者。

# 0. 文档控制

| **项目**     | **说明**                                                                                                           |
|--------------|--------------------------------------------------------------------------------------------------------------------|
| Owner        | Peggy / 产品负责人                                                                                                 |
| 目标读者     | 产品、设计、前端、后端、内容运营、SEO、数据/增长                                                                   |
| MVP 决策原则 | 只做能验证流量、信任和留存的功能；不做复杂账号体系、不碰违规自动化、不做真钱交易。                                 |
| 上线形态     | 响应式 Web 工具站，可后续扩展 Discord Bot、PWA、浏览器通知。                                                       |
| 核心假设     | GAG2 相关搜索会在上线窗口集中爆发；玩家最关心 official link、release status、stock、codes、calculator 和防偷策略。 |

## 目录

1. 一页版结论

2. 背景与机会

3. 产品定位与用户

4. MVP 目标与指标

5. MVP 范围

6. 功能需求

7. 信息架构与 SEO

8. 数据与运营机制

9. UX 与内容规范

10. 技术与非功能需求

11. 合规、风险与安全边界

12. 里程碑、验收与开放问题

附录 A. 外部信号与参考来源

# 1. 一页版结论

> **MVP 定义：**做一个围绕 Grow a Garden 2 的非官方工具站：首屏解决“是否上线、官方链接、有哪些确认信息”，工具层提供 stock tracker、codes 和 calculator alpha；night stealing guide 作为首发后增强，运营层提供 last verified、错误反馈和订阅提醒。

| **维度**       | **PRD 决策**                                                                                                           |
|----------------|------------------------------------------------------------------------------------------------------------------------|
| 产品一句话     | Grow a Garden 2 玩家打开就能知道该去哪玩、现在有什么库存/代码、自己的作物/物品值不值得保留或卖掉。                     |
| MVP 北极星指标 | 每日有效工具使用用户数：完成 stock 查看、code 复制、calculator 计算、official link 点击或订阅提醒的去重用户。          |
| 首发重点       | Release Hub + Official Link/Fake Clone Warning + Stock Tracker + Codes + Calculator Alpha + Night Stealing Guide。     |
| 流量策略       | SEO landing pages 承接 release/codes/stock/calculator/high-intent 查询；工具页用实时状态、倒计时、收藏和提醒提升回访。 |
| 差异化         | 比普通文章站更可信：每条数据有 last verified、source type、confidence；比纯 Discord 更可搜索、可沉淀、可结构化。       |
| 不做什么       | 不做 Roblox 登录、不托管/售卖账号或虚拟物品、不做真钱交易、不提供 exploit/script/automation、不绕过平台保护机制。      |

## 首发 MVP 推荐优先级

| **优先级** | **模块**             | **原因**                                 | **首发交付标准**                                                                        |
|------------|----------------------|------------------------------------------|-----------------------------------------------------------------------------------------|
| P0         | Release Hub          | 上线窗口搜索量最高；能建立可信入口。     | 展示官方链接、确认信息、未确认信息、最近更新时间、fake clone 风险提示。                 |
| P0         | Stock Tracker        | 玩家高频回访需求最强；适合做留存。       | Seed/Gear/Egg/Weather/Event Shop tab；倒计时；last verified；订阅 CTA；错误反馈。       |
| P0         | Codes Page           | SEO 成熟、复制动作强、转化到工具页容易。 | Active/Expired codes；copy；redeem instructions；daily check label。                    |
| P0         | Calculator Alpha     | 高意图长尾，且能证明站点不是纯文章站。   | Crop value calculator + mutation multiplier placeholder + formula notes + report data。 |
| P1         | Night Stealing Guide | GAG2 差异化机制，适合新内容抢位。        | 先做机制指南；风险评分器可作为 P1 mini tool。                                           |
| P2         | Discord Bot/PWA      | 增强留存，但首发可先用等待名单验证。     | 先做 subscribe intent collection，后续再推 Bot 或 PWA 通知。                            |

# 2. 背景与机会

## 2.1 已确认的外部信息

**截至 2026-06-05**，Roblox 上可见 Grow A Garden 2 体验页，页面显示发布者为 @BMWLux，描述称其为 GAG 的 sequel，并明确提到 expanded map、bigger gardens、guilds、new gears、new seeds，以及夜晚离开花园可能被别人偷取的机制。\[S1\]

这意味着 MVP 信息页可以把“续作存在、页面存在、核心玩法方向、night stealing 机制”作为 Confirmed 内容；但精确正式上线日期和全量稳定开放状态必须继续标注为 Unknown / Not confirmed。

## 2.2 市场/流量信号

| **信号**            | **观察**                                                                                                                                         | **对 MVP 的启发**                                                                           |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Codes 内容站        | PCGamesN 等站点持续更新 Grow a Garden codes，并说明 codes 可提供 seed packs、decorations、pets 等奖励且玩家需要反复检查。\[S3\]                  | Codes 页适合作为 SEO 入口，但不能只做 codes，要把流量导向 stock/calculator/official link。  |
| Stock Tracker 需求  | 已有 Google Play 第三方 app 主打 real-time stock updates、restock notifications、refresh schedule、history pattern、trading insights。\[S2\]     | 库存/倒计时/提醒是强需求，MVP 应把 stock tracker 放在首屏导航。                             |
| 社区 Discord 模式   | PCGamesN 提到 community-led tracker Discord，并给出 GAG 旧版 seed/gear 5 分钟、egg 30 分钟的参考节奏。\[S4\]                                     | 实时信息可以先用人工/社区上报 + last verified 承接，再逐步自动化合规数据运营。              |
| Calculator 成熟需求 | Fan-made Grow a Garden Calculator 覆盖植物价值、mutation、weight、pet XP、hatch tools、trade value，并标注 fanmade、in-game testing only。\[S5\] | 计算器是长尾 SEO 和工具深度的核心，应尽早做 alpha，并保持“基于测试、不使用游戏代码”的口径。 |

## 2.3 机会判断

- **窗口期机会：**GAG2 上线/预热阶段的搜索意图会集中在 release date、official link、codes、stock、stealing、guilds、seeds、pets。

- **可信度机会：**大量内容会以“泄露/猜测/点击标题”抢流量，工具站用 confirmed/rumor 分层能建立信任。

- **留存机会：**stock、codes、weather/event、night stealing 提醒天然需要高频回访。

- **长尾机会：**calculator、trade value、mutation、best seeds、gear tier list 等页面适合持续沉淀搜索流量。

# 3. 产品定位与用户

## 3.1 产品定位

| **项目** | **定义**                                                                               |
|----------|----------------------------------------------------------------------------------------|
| 工作名   | GAG2 Tools Hub                                                                         |
| 定位     | 面向 Grow a Garden 2 玩家和内容创作者的非官方工具站。                                  |
| 核心价值 | 快：第一时间知道状态；准：数据有验证标签；有用：直接计算、复制、订阅、跳转官方链接。   |
| 品牌语气 | Trustworthy, fast, tool-first, no scam, no exploit。中文运营可表达为“快、准、少废话”。 |
| 用户承诺 | 不保证所有游戏数据实时准确；但每条关键数据都展示最后验证时间、来源类型和错误反馈入口。 |

## 3.2 目标用户画像

| **画像**       | **痛点**                                     | **核心需求**                              | **关键页面/功能**           |
|----------------|----------------------------------------------|-------------------------------------------|-----------------------------|
| Launch 玩家    | 不知道 GAG2 是否真上线，怕点到假游戏。       | 官方链接、确认信息、上线状态、快速入门。  | Release Hub / Official Link |
| 库存党/肝帝    | 错过 rare seed、gear、egg 或 event shop。    | 当前库存、下次刷新、提醒、历史出现频率。  | Stock Tracker / Alerts      |
| 价值/交易玩家  | 不知道作物、mutations、pets、gear 是否划算。 | 价值计算、稀有度、风险提醒。              | Calculator / Value List     |
| 内容创作者     | 需要快速整理新机制、代码、更新点。           | 确认信息、表格化数据、可引用截图/摘要。   | Release Hub / Guides        |
| SEO 泛流量用户 | 搜索一个具体问题，希望立刻得到答案。         | 简短答案、FAQ、结构化数据、相关工具跳转。 | Codes / Guide pages         |

## 3.3 核心 Job-to-be-Done

- **JTBD-1：**当我搜索 GAG2 release date 时，我想立刻判断“是否已上线、官方入口在哪里、哪些信息是真的”。

- **JTBD-2：**当我在玩游戏时，我想知道当前 stock 和下次刷新时间，这样我不用一直盯着游戏。

- **JTBD-3：**当我拿到作物/物品时，我想快速估值和判断是否卖掉、保留或防偷。

- **JTBD-4：**当新代码/新活动出现时，我想快速复制并知道是否仍可用。

# 4. MVP 目标与指标

## 4.1 业务目标

- 在 GAG2 上线窗口期内，快速获得 release/codes/stock/calculator 相关自然搜索流量。

- 把一次性搜索用户转化为高频工具用户和提醒订阅用户。

- 建立“非官方但可信”的数据运营标准，为后续 Bot、PWA、广告/会员商业化打基础。

## 4.2 成功指标

| **指标层级** | **指标**                | **MVP 目标值**                             | **说明**                                                                               |
|--------------|-------------------------|--------------------------------------------|----------------------------------------------------------------------------------------|
| North Star   | Daily Active Tool Users | 首发 14 天内达到 2,000+/day                | 触发任一工具动作：stock filter、copy code、calculate、official link click、subscribe。 |
| Acquisition  | Organic sessions        | 首发 14 天内达到 5,000+/day 或环比持续增长 | 依赖上线窗口和索引速度，目标用于判断是否继续投入内容。                                 |
| Activation   | Tool action rate        | \>= 35%                                    | 访问工具页用户中完成至少一个工具动作的比例。                                           |
| Retention    | D1 return rate          | \>= 12%                                    | 通过 stock/codes/alerts 提升回访；无需登录也可用 cookie/匿名 ID 粗略估算。             |
| Trust        | Data correction rate    | \< 3% critical corrections/day             | 严重错误包括 active code 失效、stock 与验证不符、官方链接错误。                        |
| SEO          | Indexed pages           | P0 页面 100% 被索引                        | Release/Codes/Stock/Calculator/Official link/Night stealing。                          |
| Performance  | Mobile LCP              | \< 2.5s                                    | 核心用户多为移动端，工具页必须快。                                                     |

## 4.3 指标埋点事件

| **事件名**            | **触发时机**             | **关键属性**                                |
|-----------------------|--------------------------|---------------------------------------------|
| page_view             | 页面加载                 | page_type, slug, referrer, language, device |
| official_link_click   | 点击 Roblox 官方页面链接 | source_page, link_position                  |
| stock_filter_apply    | 切换商店/稀有度/物品过滤 | shop_type, rarity, item_id                  |
| stock_subscribe_click | 点击提醒订阅             | shop_type, item_id, channel                 |
| code_copy             | 复制兑换码               | code_id, status                             |
| calculator_result     | 完成一次计算             | calculator_type, item_id, mutation_count    |
| report_wrong_data     | 提交错误反馈             | entity_type, entity_id, severity            |
| search_internal       | 站内搜索                 | query, result_count                         |

# 5. MVP 范围

## 5.1 P0 / 必须做

| **模块**                     | **范围**                                                                                         | **验收口径**                                                        |
|------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| Release Hub                  | GAG2 上线状态、官方链接、confirmed/rumor/unknown、更新日志。                                     | 用户 10 秒内能判断是否上线、去哪里玩、哪些信息可信。                |
| Official Link & Fake Warning | 官方 Roblox link CTA、发布者信息、仿冒风险提示。                                                 | 首屏和 release 页均有明显入口；链接可配置；跳转有埋点。             |
| Stock Tracker                | Seed/Gear/Egg/Event/Weather tabs；当前库存、刷新倒计时、last verified、confidence。              | 即使数据不全，也不能显示为“确定”；必须有 unavailable/unknown 状态。 |
| Codes Page                   | Active/Expired codes、copy、兑换步骤、last checked。                                             | 一键复制；失效码明确标记；没有 active code 时显示空状态而非标题党。 |
| Calculator Alpha             | Crop value calculator：选择 crop、输入 weight/amount、选择 mutation multiplier、输出估算 value。 | 完成一次计算不超过 15 秒；结果页可分享；公式和数据更新时间可见。    |
| Admin/Data Console           | 运营可增改 item、stock、code、source、verification。                                             | 不需要复杂权限，MVP 可单管理员；所有前台数据来自 CMS/DB。           |
| SEO Foundation               | 页面 metadata、FAQ schema、canonical、sitemap、robots、OG。                                      | P0 页面可被搜索引擎索引；动态页面有合理 SSR/SSG。                   |
| Analytics                    | 基础事件埋点和转化漏斗。                                                                         | 能看到页面、工具动作、订阅意图、外链点击、错误反馈。                |

## 5.2 P1 / 首发后 1-2 周增强

- Calculator 扩展为多物品对比、value-to-weight、pet XP、trade value 和更完整的 mutation 数据。

- Night Stealing 风险评分器：输入作物价值、夜晚时间、保护 gear/guild 情况，输出 sell/hold/protect 建议。

- Discord Bot 或 PWA 推送：先上线 waitlist，验证订阅需求后再开发。

- Item database 页面：seed、gear、egg、pet、guild upgrades、weather/events 的可搜索词典。

- 双语页面：英文主站 + 中文工具说明/运营内容，根据 Search Console 数据决定优先级。

## 5.3 明确不做

- 不做 Roblox 账号登录、账号托管、自动代玩、自动抢库存。

- 不做账号、Robux、虚拟物品的真钱买卖撮合。

- 不提供 exploit、script、注入器、绕过反作弊、绕过平台保护机制的教程或下载。

- 不宣称“官方”或使用可能导致混淆的品牌表达；全站显示 unofficial fan site disclaimer。

- 不把未经验证的 YouTube/Discord/社媒爆料作为 confirmed 信息。

- 不在 MVP 建完整社交社区、论坛、复杂登录体系或 UGC 内容审核系统。

# 6. 功能需求

## 6.1 FR-001 Release Hub

| **字段** | **需求**                                                                                                  |
|----------|-----------------------------------------------------------------------------------------------------------|
| 目标     | 承接 release date / is GAG2 out / official link 等高意图搜索，并建立信任。                                |
| 页面元素 | 状态卡片、官方链接按钮、confirmed 信息表、rumor/unknown 区、最近更新、FAQ、订阅更新 CTA。                 |
| 状态定义 | Confirmed: 有官方 Roblox 页面或开发者公开信息支持；Rumor: 社区传播但未有官方证据；Unknown: 尚无可信来源。 |
| 验收标准 | 任何上线日期不能在无确认源的情况下写成确定；每条关键结论必须有 source label 和 last updated。             |

## 6.2 FR-002 Official Link / Fake Clone Warning

| **字段** | **需求**                                                                                 |
|----------|------------------------------------------------------------------------------------------|
| 目标     | 降低用户进入仿冒体验或被骗的风险。                                                       |
| 页面元素 | 官方 Roblox link、发布者/体验 ID 展示、复制链接、打开前提示、仿冒识别 FAQ。              |
| 风控规则 | 所有“official link”均从后台配置；上线前由运营二次验证；前台显示 verification timestamp。 |
| 验收标准 | 官方链接错配为 Sev-1；必须可在 5 分钟内通过后台热更新。                                  |

## 6.3 FR-003 Stock Tracker

| **字段**     | **需求**                                                                                                             |
|--------------|----------------------------------------------------------------------------------------------------------------------|
| 目标         | 让玩家不用反复进游戏/Discord，也能查看库存、刷新时间和提醒。                                                         |
| MVP 数据范围 | Seed Shop、Gear Shop、Pet Egg Shop、Event Shop、Weather/Event。GAG2 数据不足时可用空状态 + “awaiting verification”。 |
| 展示字段     | item name、shop、rarity、status、price/requirement、refresh ETA、last seen、last verified、confidence、source type。 |
| 交互         | shop tab、rarity filter、search、copy/share、subscribe intent、report wrong data。                                   |
| 状态         | In stock / Out of stock / Unknown / Awaiting verification / Event-only。                                             |
| 验收标准     | 用户能在 2 次点击内看到目标商店；所有库存数据必须有 last verified；过期数据自动降级为 stale。                        |

## 6.4 FR-004 Codes Page

| **字段** | **需求**                                                                   |
|----------|----------------------------------------------------------------------------|
| 目标     | 承接 codes 搜索并提供强工具动作。                                          |
| 展示字段 | code、reward、status、first seen、last checked、expires if known、source。 |
| 交互     | copy code、redeem instruction、report expired、subscribe to new codes。    |
| 内容规则 | 没有新 code 时必须写“目前未发现新 active code”，不要伪造。                 |
| 验收标准 | 复制成功率可埋点；active/expired 切换清晰；过期反馈进入运营队列。          |

## 6.5 FR-005 Calculator Alpha

| **字段**   | **需求**                                                                                         |
|------------|--------------------------------------------------------------------------------------------------|
| 目标       | 验证 calculator 长尾流量和工具粘性，为后续复杂估值做基础。                                       |
| MVP 计算器 | Crop value calculator：选择 crop、输入 weight/amount、选择 mutation multiplier、输出估算 value。 |
| 扩展位     | Value-to-weight、pet XP、egg hatch、trade value、night stealing risk。                           |
| 数据口径   | 所有公式标注“based on in-game testing / community reports”；不使用游戏代码、反编译或注入数据。   |
| 验收标准   | 完成一次计算不超过 15 秒；结果页可分享；公式和数据更新时间可见。                                 |

## 6.6 FR-006 Night Stealing Guide / Risk Mini Tool

| **字段**  | **需求**                                                                       |
|-----------|--------------------------------------------------------------------------------|
| 目标      | 利用 GAG2 新机制差异化抢占“stealing / defense / night guide”搜索。             |
| MVP 内容  | 机制解释、收获策略、rare crop 放置建议、防御 gear/guild 协作建议、常见误区。   |
| Mini tool | 输入 crop value、是否夜晚、是否离开、defense level，输出低/中/高风险和建议。   |
| 验收标准  | 所有未确认机制必须标注 speculative；不鼓励骚扰、骗取账号或违反游戏规则的行为。 |

## 6.7 FR-007 Admin/Data Console

| **对象**      | **字段**                                                                                          |
|---------------|---------------------------------------------------------------------------------------------------|
| items         | id, name, slug, type, rarity, shop_type, price, icon_url, status, notes                           |
| stock_entries | id, item_id, shop_type, status, quantity, seen_at, expires_at, source_id, confidence, verified_by |
| codes         | id, code, reward, status, first_seen_at, last_checked_at, expires_at, source_id                   |
| sources       | id, source_type, url, author, reliability_score, last_reviewed_at                                 |
| reports       | id, entity_type, entity_id, user_note, severity, created_at, resolved_at                          |
| seo_pages     | slug, title, h1, meta_description, status, canonical, schema_type, updated_at                     |

# 7. 信息架构与 SEO

## 7.1 MVP 站点地图

| **URL**                               | **页面类型**      | **主搜索意图**                 | **MVP CTA**                               |
|---------------------------------------|-------------------|--------------------------------|-------------------------------------------|
| /                                     | Home / Tools Hub  | grow a garden 2 tools          | 进入 Stock / Release / Codes / Calculator |
| /grow-a-garden-2-release-date         | Release Hub       | release date / is it out       | 查看官方链接 / 订阅更新                   |
| /grow-a-garden-2-official-link        | Trust page        | official link / real or fake   | 打开 Roblox 官方页                        |
| /grow-a-garden-2-stock-tracker        | Tool              | stock tracker / restock timer  | 筛选库存 / 订阅提醒                       |
| /grow-a-garden-2-codes                | Codes             | codes / redeem codes           | 复制 code / 订阅新 code                   |
| /grow-a-garden-2-calculator           | Tool              | calculator / value / mutations | 完成计算 / 分享结果                       |
| /grow-a-garden-2-night-stealing-guide | Guide + mini tool | stealing / defense / night     | 计算风险 / 看防偷建议                     |
| /grow-a-garden-2-seeds                | Database          | seeds list / best seeds        | 查看库存 / 计算价值                       |
| /grow-a-garden-2-gear                 | Database          | gear list / best gear          | 查看库存 / 防偷指南                       |
| /about                                | Trust             | unofficial fan site            | 了解数据来源 / 联系纠错                   |

## 7.2 SEO 页面模板要求

- **Answer-first：**首屏 80-120 字内直接回答搜索问题，不先铺垫。

- **Freshness：**标题附近显示 Updated / Last verified，重要页面每天至少检查一次。

- **Schema：**Release/Guide 页使用 FAQPage；Codes 页使用 ItemList/FAQ；工具页使用 SoftwareApplication 或 WebApplication。

- **Internal links：**每页至少链接到 Stock、Codes、Calculator、Official Link 中的 2 个相关工具。

- **Index control：**低质参数页 noindex；高价值 database detail 页可 index。

- **Snippet control：**每页 H1 与 title 明确包含 Grow a Garden 2 / GAG2 关键词。

## 7.3 内容质量规则

| **规则**                         | **执行方式**                                                            |
|----------------------------------|-------------------------------------------------------------------------|
| Confirmed / Rumor / Unknown 分层 | Release、guide、stock notes 必须标注信息级别。                          |
| 更新时间可见                     | 首屏或卡片内显示 last updated；数据项显示 last verified。               |
| 禁止标题党                       | 不能用“已确认上线日期”承接未确认内容。                                  |
| 纠错闭环                         | 每个数据卡片有 report wrong data；后台可标记 resolved。                 |
| 引用透明                         | 源链接放在 Source / References 区；社媒和视频爆料默认不升为 confirmed。 |

# 8. 数据与运营机制

## 8.1 数据来源分级

| **等级** | **来源类型**                                        | **可用于**                         | **前台标记**                  |
|----------|-----------------------------------------------------|------------------------------------|-------------------------------|
| A        | 官方 Roblox 页面、开发者公开账号、官方 Discord 公告 | Confirmed 信息、官方链接、核心机制 | Confirmed / Official source   |
| B        | 站内运营 in-game testing、多人交叉验证              | stock、calculator、item data       | Verified by testing           |
| C        | 社区上报、Discord tracker、玩家截图                 | 待验证库存、传闻、早期数据库       | Community report / Unverified |
| D        | YouTube 标题、二手博客、未附证据社媒                | 仅作为选题线索                     | Do not display as fact        |

## 8.2 更新频率

| **对象**            | **MVP 更新频率**                                         | **过期/降级规则**                                          |
|---------------------|----------------------------------------------------------|------------------------------------------------------------|
| Release status      | 每日检查；上线窗口每 2-4 小时检查                        | 超过 24 小时显示“last checked”；超过 72 小时提示可能过期。 |
| Official link       | 每日检查；重要变更即时更新                               | 链接错误 Sev-1，前台立即隐藏 CTA 或改成 warning。          |
| Stock data          | 根据可验证能力，目标 5-30 分钟级；无法验证则显示 Unknown | 超过预设 TTL 自动标记 stale，不再显示为 current。          |
| Codes               | 每日检查；活动期 2-4 小时检查                            | 收到 3 个以上 expired report 进入 priority review。        |
| Calculator formulas | 有版本更新后检查；常规每周检查                           | 公式不确定时标注 estimate，并保留 notes。                  |

## 8.3 运营后台最小流程

1.  运营从来源收集信息，先创建 source 记录并标注 reliability。

2.  新增/更新 item、stock、code 或 release status。

3.  关键数据需要二次确认后将 confidence 提升到 High。

4.  前台自动显示 source type、last verified 和 confidence。

5.  用户 report wrong data 后进入 reports 队列；运营处理后记录 resolved_at 和处理备注。

## 8.4 数据展示状态

| **状态**   | **适用场景**                       | **前台文案示例**                     |
|------------|------------------------------------|--------------------------------------|
| Current    | 数据在 TTL 内且来源可靠            | Last verified 8 min ago              |
| Stale      | 超过 TTL 但仍可能有参考价值        | May be outdated - needs verification |
| Unknown    | 未获得可验证数据                   | No verified stock data yet           |
| Unverified | 仅社区上报                         | Community report - not verified      |
| Disabled   | 链接/代码/数据存在高风险或明显错误 | Temporarily hidden while we verify   |

# 9. UX 与内容规范

## 9.1 设计原则

- **Mobile-first：**目标用户大量来自手机搜索和 Roblox 移动端，首屏操作区要可单手完成。

- **Tool-first：**文章解释不能压过工具本体；用户进入页面后 1 屏内看到结果或输入框。

- **Trust-first：**数据不确定时明确说不确定，不用“probably confirmed”包装。

- **Fast feedback：**复制、筛选、计算、订阅点击后都需要即时 toast 或状态变化。

- **Low friction：**MVP 不强制登录；订阅可先收 email/Discord handle 或浏览器通知授权。

## 9.2 关键页面草图描述

| **页面**       | **首屏结构**                                                    | **底部/扩展结构**                                                  |
|----------------|-----------------------------------------------------------------|--------------------------------------------------------------------|
| Release Hub    | Status card + Official link CTA + Last checked + Confirmed list | Rumors/Unknown、FAQ、更新日志、订阅更新。                          |
| Stock Tracker  | Shop tabs + Search + Current status cards + Refresh countdown   | Rare item watchlist、history、report wrong data、how stock works。 |
| Codes          | Active code cards + Copy button + Last checked                  | Expired codes、redeem guide、FAQ、new code alerts。                |
| Calculator     | Input panel + result card + formula notes                       | Mutation list、example calculations、report formula issue。        |
| Night Stealing | Quick answer + risk mini tool                                   | 策略指南、gear/guild recommendations、FAQ。                        |

## 9.3 文案规范

| **场景**       | **推荐文案**                                                        | **避免文案**                         |
|----------------|---------------------------------------------------------------------|--------------------------------------|
| 未确认上线日期 | No exact release date has been officially confirmed yet.            | GAG2 release date confirmed!         |
| 库存未知       | No verified stock data yet. Check back soon or report what you see. | Stock is empty.                      |
| 社区上报       | Community report - waiting for verification.                        | Confirmed by players.                |
| 非官方说明     | Unofficial fan site. Not affiliated with Roblox or the creators.    | Official Grow a Garden 2 tracker.    |
| 外链 Roblox    | Open the Roblox experience page.                                    | Get free Robux / claim rewards here. |

# 10. 技术与非功能需求

## 10.1 建议技术架构

| **层**        | **MVP 建议**                                                                          |
|---------------|---------------------------------------------------------------------------------------|
| Frontend      | Next.js / React，SSG + SSR 混合；核心工具页可静态生成并用 API 拉取最新数据。          |
| Hosting/CDN   | Vercel 或 Cloudflare Pages；图片走 CDN；边缘缓存工具数据。                            |
| Database      | Supabase Postgres 或 Neon；items、stock_entries、codes、sources、reports、seo_pages。 |
| Admin         | 轻量 Admin UI，支持 CRUD、source tagging、verification、report queue。                |
| Cache         | Upstash Redis 或 KV，用于 stock current view、rate limit、hot pages cache。           |
| Search        | MVP 用数据库 ILIKE/简单索引；后续加 Meilisearch/Algolia。                             |
| Analytics     | GA4/Plausible + Search Console；关键事件自定义。                                      |
| Notifications | MVP 收集订阅意图；P1 接 Discord webhook/PWA push/email。                              |

## 10.2 非功能需求

| **类别**      | **要求**                                  | **验收标准**                                           |
|---------------|-------------------------------------------|--------------------------------------------------------|
| Performance   | 移动端首屏快，工具交互即时。              | P0 页面 LCP \< 2.5s，INP \< 200ms，JS bundle 控制。    |
| Availability  | 首发窗口流量峰值不能频繁 5xx。            | 核心页面 CDN 缓存；DB/API 失败时显示最近缓存 + stale。 |
| Accessibility | 按钮/表单可键盘操作，颜色对比合格。       | 核心流程通过 Lighthouse/Axe 基础检查。                 |
| Security      | 后台鉴权、输入校验、rate limit。          | report 接口防 spam；Admin 仅白名单访问。               |
| Privacy       | 不收集 Roblox 密码/账号；订阅信息最小化。 | 隐私政策说明用途；用户可退订/删除订阅。                |
| SEO           | 可索引、结构化、无重复内容。              | Sitemap 正常；canonical 正确；FAQ schema 不滥用。      |
| Observability | 错误和数据延迟可见。                      | API error、stale data、report queue 有 dashboard。     |

# 11. 合规、风险与安全边界

## 11.1 合规原则

Roblox Terms of Use 明确要求用户只能按 Roblox 条款允许的方式使用 Robux 或 Virtual Content，并不认可第三方服务中的出售、转移、购买或其他使用；因此本工具站不得做真钱交易、账号交易、Robux 或虚拟物品交易撮合。\[S6\]

- 全站 footer 和 about 页显示 unofficial fan site disclaimer。

- 不要求用户输入 Roblox 用户名、密码、cookie、token 或任何敏感账号凭据。

- 不提供绕过平台规则、自动化刷取、脚本注入、抢库存、外挂、漏洞利用内容。

- 不把未确认数据包装为官方信息；所有关键页面保留 source 和 timestamp。

- 用户纠错/社区上报内容不直接变成 confirmed，需要运营验证。

## 11.2 风险矩阵

| **风险**                    | **概率** | **影响** | **缓解方案**                                                            |
|-----------------------------|----------|----------|-------------------------------------------------------------------------|
| GAG2 上线节奏变化或页面下线 | 中       | 高       | Release Hub 改为 status/official source monitoring；内容不写死日期。    |
| 库存数据不准导致信任下降    | 高       | 高       | last verified、confidence、stale 状态、纠错队列；不确定则显示 Unknown。 |
| SEO 竞争激烈                | 高       | 中       | 工具优先、更新频率、结构化数据、长尾页面矩阵。                          |
| 被误认为官方或侵权          | 中       | 高       | 站名、logo、disclaimer、About、不要复制 Roblox/GAG 官方素材。           |
| 用户提交 spam/错误数据      | 高       | 中       | rate limit、review queue、信誉权重、手动审核。                          |
| 商业化触碰平台红线          | 中       | 高       | 广告/赞助可做；禁止真钱交易、账号/物品销售、free Robux 诱导。           |

# 12. 里程碑、验收与开放问题

## 12.1 3 周 MVP 里程碑

| **阶段**             | **时间**  | **产出**                                                                 |
|----------------------|-----------|--------------------------------------------------------------------------|
| Phase 0 - 准备       | Day 0-2   | 域名、技术栈、信息架构、数据模型、基础设计系统、外部来源清单。           |
| Phase 1 - P0 页面    | Day 3-7   | Home、Release Hub、Official Link、Codes、Stock Tracker 静态/半动态版本。 |
| Phase 2 - 工具与后台 | Day 8-12  | Admin/Data Console、Calculator Alpha、report wrong data、埋点。          |
| Phase 3 - SEO/运营   | Day 13-17 | Sitemap、schema、FAQ、数据更新 SOP、Search Console、监控。               |
| Phase 4 - 软发布     | Day 18-21 | 小范围发布、收集纠错、修正内容、准备 Discord/PWA 订阅 P1。               |

## 12.2 MVP 上线验收清单

- [ ] P0 页面全部可访问，移动端无明显布局问题。
- [ ] Release Hub 中 confirmed/rumor/unknown 分层清晰，未写死未确认日期。
- [ ] Official link 可后台配置，前台展示 last verified。
- [ ] Stock Tracker 支持 shop tab、search、status、TTL/stale、report wrong data。
- [ ] Codes 页面支持 active/expired、copy、last checked、report expired。
- [ ] Calculator Alpha 可完成一次计算，显示公式口径和更新时间。
- [ ] 全站 footer 有 unofficial fan site disclaimer。
- [ ] GA4/Plausible 事件可在 dashboard 看到。
- [ ] Sitemap、robots、canonical、FAQ schema 已上线并通过基础校验。
- [ ] Admin/Data Console 可在 5 分钟内修正 Sev-1 信息。

## 12.3 开放问题

- GAG2 是否会稳定公开开放，还是阶段性测试/私有化？这会影响 Release Hub 的状态定义。

- GAG2 的 shop refresh cycle 是否沿用 GAG1？MVP 不能默认，需要上线后验证。

- Stock 数据源如何长期合规获取？建议先人工/社区验证，后续只使用官方允许或公开可接受方式。

- 是否做英文单语还是中英双语？建议英文主站抢全球搜索，中文作为二级目录或运营后台语言。

- 是否接 Discord Bot？建议先用 subscribe intent 数据判断需求，再决定开发。

# 附录 A. 外部信号与参考来源

以下来源用于确定 MVP 的市场信号和合规边界。产品上线时建议将来源管理放入后台，并定期复核。

| **编号** | **来源**                                    | **URL**                                                                                                 | **PRD 用途**                                                                                                           |
|----------|---------------------------------------------|---------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| S1       | Roblox - Grow A Garden 2 experience page    | https://www.roblox.com/games/95204935687527/Grow-A-Garden-2                                             | 确认页面存在、By @BMWLux、sequel 描述、地图/公会/gear/seeds/night stealing/offline growth。                            |
| S2       | Google Play - Track stock for grow a garden | https://play.google.com/store/apps/details?id=grow.garden.tracker.item.timer.egg.seed.inventory.harvest | 竞品/需求信号：real-time stock updates、restock notifications、refresh schedules、history pattern。                    |
| S3       | PCGamesN - Grow a Garden codes              | https://www.pcgamesn.com/grow-a-garden/codes                                                            | Codes 页面需求信号：active/expired codes、redeem guide、持续更新。                                                     |
| S4       | PCGamesN - Grow a Garden stock tracker      | https://www.pcgamesn.com/grow-a-garden/stock-tracker                                                    | 库存/Discord tracker 需求信号和旧版刷新节奏参考。                                                                      |
| S5       | Grow a Garden Calculator                    | https://www.growagardencalculator.com/                                                                  | Calculator 竞品/需求信号：植物价值、mutation、weight、pet XP、hatch tools、trade value；fanmade/in-game testing 口径。 |
| S6       | Roblox Terms of Use                         | https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use                           | 合规边界：Robux/Virtual Content 第三方交易和账号责任等规则。                                                           |

# 附录 B. 术语表

| **术语**       | **说明**                                                       |
|----------------|----------------------------------------------------------------|
| GAG / GAG2     | Grow a Garden / Grow a Garden 2 的社区简称。                   |
| Stock Tracker  | 展示商店当前库存、刷新倒计时、历史出现、提醒订阅的工具。       |
| Last verified  | 数据被运营、社区或测试流程确认的最近时间。                     |
| Confidence     | 数据可信度等级，通常由来源质量、交叉验证次数、时间新鲜度决定。 |
| Stale          | 数据超过有效期，仍可参考但不能当作当前状态。                   |
| Night Stealing | GAG2 页面描述中出现的夜晚离开花园会被别人偷取的机制方向。      |

> **建议下一步：**先搭建 P0 页面和后台数据模型，抢占 release/official link/codes/stock/calculator 五个搜索入口。真正影响留存的是 stock tracker 和提醒订阅，因此不要把 MVP 做成纯文章站。
