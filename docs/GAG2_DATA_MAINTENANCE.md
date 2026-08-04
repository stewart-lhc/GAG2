# GAG2 数据维护与发布手册

本手册是 `growagarden2.pro` 的数据更新、验证和索引晋级操作说明。当前数据 ledger 已发布版本化作物、Mutation、宠物、相对交易值、公式和 Restock cycle；任何新增或更新字段仍必须先具备可审计证据，没有证据时显示 Unknown，不得补写猜测值。

## 1. 数据文件与职责

所有记录位于 `src/data/game/`，由 `src/data/game/manifest.ts` 组装为 `gameDataLedger`：

- `evidence.ts`：来源 URL、来源类型、观察/验证时间、游戏版本、许可说明和捕获字段。
- `entities.ts`：植物、种子、水果、宠物、装备、突变等实体及其 `evidenceIds`。
- `values.ts`：`base_value`、`trade_value`、`weight`、`price` 观察值；未知值用“没有记录”表达，不用 0 占位。
- `formulas.ts`：公式版本、实现 ID、参数单位、舍入规则、兼容性、证据和黄金样例。
- `restock-cycles.ts`：周期、时区、服务器口径、锚点、生效区间、最后观察时间、过期阈值和黄金样例。
- `manifest.ts`：实体是否可选择、是否可进入默认计算；未通过证据审核的记录必须保持不可选择。

`src/lib/game-data/validate.ts` 是发布前的 fail-closed 校验器。不要在组件中另写一份数值、mutation multiplier、fair range 或 restock 周期。

## 2. 新增或更新记录

1. 先记录可复核来源，再新增 `EvidenceRecord`。每条证据必须有有效 `sourceUrl`、`sourceType`、`observedAt`、`verifiedAt`、`gameVersion` 和 `licenseOrUsageNote`，并列出实际捕获字段。
2. 在 `entities.ts` 添加实体并绑定字段级 `evidenceIds`。实体状态必须明确为 `confirmed`、`estimated`、`unknown` 或 `stale`；不确定记录不得标为 confirmed。
3. 在 `values.ts` 添加数值观察；确认实体、有限数字、验证时间、游戏版本和证据均齐全后，才能被默认计算选中。
4. 在 `formulas.ts` 添加公式版本和实现映射，写明参数/单位、舍入方式、兼容组合与至少一个 golden example。修改公式时递增 `formulaVersion`，不要静默改旧版本含义。
5. 在 `restock-cycles.ts` 添加周期时，同时记录 timezone、serverBasis、anchor/effective window、lastObservedAt、staleAfterSeconds 和跨日/边界样例。冲突或过期时降级为 `unknown`/`stale`，停止倒计时预测。
6. 最后更新 `manifest.ts`。只有证据齐全、版本已知且状态 confirmed 的实体，才可设 `selectable: true` 与 `defaultCalculationEligible: true`。

## 3. 发布前检查

在仓库根目录执行：

```bash
npm test
npx tsc --noEmit
npm run build
```

检查重点：

- `validateGameDataContract()` 无 contract issue；未知实体、未知版本、缺证据、无效时间/数字、公式或 restock 样例错误必须让验证失败。
- 计算器的正常值、零/负数/NaN、上限、未知组合、舍入和空边界测试保持通过；restock 测试覆盖跨日、时区/DST、边界和 stale。
- 构建 HTML 仍有唯一 H1、直接答案、来源与主要内链；schema 只描述页面可见内容。
- `noindex, follow` 页面未进入 sitemap、主导航或 `public/llms.txt`；admin 同时保持 `noindex, nofollow` 与 robots disallow。

若数据变更导致上述检查失败，停止发布，不要用跳过校验、假值或临时 fallback 让构建变绿。

## 4. 索引晋级门槛

记录进入默认计算或页面从 `noindex` 晋级前，必须同时满足：

1. 工具可以完成端到端任务，移动端输入有 label、范围和错误提示。
2. 所有 selectable 记录都有实体 manifest、字段级证据、source、observed/verified 时间、game version 和许可说明。
3. 页面有直接答案、方法/公式、真实示例、限制说明和相关工具内链。
4. title、H1、canonical 唯一，且不与另一 URL 争夺同一搜索意图。
5. 禁用 JavaScript 仍能从构建 HTML 读到标题、说明、来源和主要链接。
6. JSON-LD 与可见 FAQ/列表一致，不伪造 Product、Offer、Rating 或“官方价格”。

通过审核后，才同步页面 metadata、`src/app/sitemap.ts`、导航和 `public/llms.txt`；只改其中一处会造成索引合同漂移。未达标时保持 `noindex, follow`，但可以继续在本地或已授权 Preview 验收。

## 5. 回滚与事故处理

- 数据错误：恢复到最近一个已确认的 data/formula/cycle 版本；无法立即确认时，将相关记录降级为 `unknown` 或 `stale`。
- 新页面或数据不可信：先从导航、sitemap、llms.txt 移除并保持 noindex，不删除原始证据记录。
- 前端/公式回归：使用正常 Git revert 或回滚提交；不得 `git reset --hard`、覆盖他人未提交改动或直接删除 ledger。
- 线上发布前必须重新运行测试、类型检查和构建；线上发布与 Preview smoke check 需要单独授权。本仓库当前只完成本地实现/验证，未执行部署。

每次数据更新建议在提交说明中写明：数据版本、游戏版本、证据 ID、受影响页面、验证命令和是否触发索引晋级。这样可以按版本快速定位并回退，而不依赖口头记忆。
