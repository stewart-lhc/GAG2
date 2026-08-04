# GAG2 数据源审计（2026-08-04）

本文记录本项目当前使用的 Grow a Garden 2 数据来源、版本裁决和不能声称的内容。所有数值均应携带来源与核验日期；“当前最佳社区记录”不等于官方开发者公式。

## 来源优先级

1. Roblox 官方页面与公开 API：游戏身份、创建时间、开发者、公开统计。
2. 游戏内可重复验证或开发者公告：若后续取得，覆盖社区资料。
3. Grow a Garden 2 Fandom 的最新 MediaWiki revision：作物、公式、Mutation、宠物、商店周期和 Codes。
4. GAG2.GG：完成交易形成的相对交易值与实体目录；不能当作 Sheckles 售价。
5. 其他攻略站：仅用于交叉验证或补充旧快照，发生冲突时不覆盖更新的高等级来源。

## 锁定版本

| 数据 | 版本 / revision | 核验结论 |
|---|---|---|
| Roblox 游戏身份 | 2026-08-04 API 快照 | Place `97598239454123`，Universe `10200395747`，创建者 `Strawberreh Squad` |
| Crop Data | Fandom module revision `6906`，2026-08-03 | 作物基础重量、基础售价、Prime Time |
| Mechanics | Fandom revision `6865`，2026-08-02 | 默认指数 `2.5`、拐点 `5`、尾部指数 `1.5`、Decay、Friend Boost、Restock |
| Mutations | Fandom revision `6848`，2026-08-02 | 同一作物一次只能有一个 Mutation；未发布项不进入默认选项 |
| Pets | Fandom revision `6823`，2026-08-01 | 采用变体与能力资料；没有可靠 GAG2 年龄/重量公式 |
| Seed Shop | Fandom revision `6811`，2026-08-01 | Garden Valley 种子价格、稀有度、库存量、补货概率和可获得状态；没有该 revision 行的作物价格显示 Unknown |
| Gears | Fandom revision `6904`，2026-08-03 | Garden Valley Gear 价格、货币、通用用途、库存量、补货概率和可获得状态；这是 MediaWiki API 直接核验到的该页最新 revision |
| Codes | Fandom revision `5227` + 多来源交叉检查 | 仅标记 `Reported active`，不声称站方游戏内亲测 |

## 公式裁决

社区当前记录的总售价为：

`floor(BaseSell × SizeFactor × FruitStock × Mutation × Decay × FriendBoost × SellTime)`

- `size = weightKg / baseWeightKg`。
- `size <= 5` 时，`SizeFactor = size ^ exponent`；超过 5 后使用尾部指数分段计算。
- 默认 `exponent = 2.5`，Mushroom 为 `1.9`，Bamboo 为 `1.75`。
- 单次收获作物的有效 Mutation 为 `1 + (raw - 1) × 0.15`。
- Friend Boost 为每位同服好友 `+10%`；来源未给公开上限。
- Decay 最低降至 `0.2×`。Wiki 同时记录 mutated crop 可能不受 Decay；界面必须披露这一冲突，不能隐瞒。
- Fruit Stock 每 10 分钟刷新，可选择 Normal `1×`、Big `2×`、Mega `4×`，但项目没有可靠实时库存 feed，不得显示伪造的“当前档位”。

普通攻略仍可见默认指数 `2.65` 以及旧 Mutation 倍率。由于 Fandom 最新 revision 更晚且可审计，本项目采用 `2.5` 和 revision `6848` 的 Mutation 表，并保留来源版本。

## 数据边界

- `Base Sell Value`：作物卖给游戏系统的 Sheckles 基础售价。
- `Seed Purchase Price`：种子商店成本。
- `Relative Trade Value`：玩家交易市场的相对单位，不是 Sheckles，也不是现金或 Robux。
- Shop 价格、库存与概率只从 `src/data/game/shop.ts` 的版本化 observation 渲染；页面组件不得内写这些精确字段。
- 缺值必须显示 Unknown；不得用另一个字段代填。
- Big、Mega、Rainbow 宠物是独立变体，不能用固定市场倍数凭空推导。
- Stock 页面没有自动库存源时只能称 Restock Timer / Watchlist，不能称 Live Stock。
- 不开发 Stock Predictor，不支持真钱、Robux 或站外交易担保。

## 主要来源

- Roblox：https://www.roblox.com/games/97598239454123/Grow-a-Garden-2
- Roblox Games API：https://games.roblox.com/v1/games?universeIds=10200395747
- Crops：https://growagarden2.fandom.com/wiki/Crops
- Crop Data module：https://growagarden2.fandom.com/wiki/Module:Crop_Data
- Mechanics：https://growagarden2.fandom.com/wiki/Mechanics
- Mutations：https://growagarden2.fandom.com/wiki/Mutations
- Pets：https://growagarden2.fandom.com/wiki/Pets
- Gear：https://growagarden2.fandom.com/wiki/Gears
- Codes：https://growagarden2.fandom.com/wiki/Codes
- Seed Shop：https://growagarden2.fandom.com/wiki/Seed_Shop
- Seed Shop revision 6811：https://growagarden2.fandom.com/wiki/Seed_Shop?oldid=6811
- Gears revision 6904：https://growagarden2.fandom.com/wiki/Gears?oldid=6904
- Trade methodology：https://www.gag2.gg/methodology

Fandom 内容适用其页面所示 CC BY-SA 条款。本项目只保存事实字段与来源链接，页面文案自行撰写；未确认许可的图片不复制入库。
