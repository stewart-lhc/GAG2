# GAG2 Agent 开发 SOP

本文件约束本项目中的规划、开发、评审、测试与发布行为。先读取真实仓库状态和现有文档；不得为了补齐流程而编造命令、依赖、资源或产品事实。

## 不可破坏原则

- 保留用户和其他 agent 的现有改动，不回滚、覆盖、清理或顺手重构未授权内容。
- 严格遵守文件/模块所有权；需要越界时先报告影响并重新分配。
- 密钥只进入项目认可的 secret manager，不写入仓库、文档、命令参数或日志。
- 未经用户明确授权，不执行生产部署、真实资源创建、付费动作、域名切换或不可逆数据操作。

## 任务分级

| 等级 | 判定标准 | 默认路径 |
|---|---|---|
| `S0` | 文案、注释、局部配置或无行为变化的小修正 | 主线程直接完成并验证 |
| `S1` | 边界明确、单模块、低失败成本 | 主线程、`fast_worker` 或 `worker`；按风险决定是否独立 eval |
| `S2` | 跨模块、共享接口、困难调试、数据合同或中高回归风险 | `planner` → Plan Gate → `fast_worker`/`worker`/`complex_worker` → `evaluator` |
| `S3` | 安全、权限、隐私、数据破坏、生产资源或不可逆发布 | `critical_planner` → Plan Gate → 最小授权实施 → `critical_evaluator` |

- 分级看歧义、耦合度、失败成本和漏检风险，不看改动行数。
- S0/S1 不得为了使用多 Agent 而升级。
- S2/S3 的 Plan Gate 必须明确目标、非目标、依赖、所有权、Acceptance Criteria、测试矩阵、风险、回滚和发布边界。

## Agent 路由

| 角色 | 默认模型 | 用途 |
|---|---|---|
| 主线程 / Orchestrator | `gpt-5.6-sol` / medium | 分级、集成、决策与交付闭环 |
| `planner` | `gpt-5.6-sol` / medium | S2 的跨模块规划、消歧与任务拆分 |
| `critical_planner` | `gpt-5.6-sol` / high | S3 的安全、数据、权限和生产风险规划 |
| `fast_worker` | `gpt-5.6-luna` / medium | 机械修改、测试执行、格式转换和证据整理 |
| `worker` | `gpt-5.6-luna` / high | 边界清楚、可确定性验收的默认实施 |
| `complex_worker` | `gpt-5.6-terra` / high | 跨模块实施与困难调试 |
| `background_deep_worker` | `gpt-5.6-luna` / max | 不在关键路径上的隔离困难任务；必须可验证、可重试且无交互时限 |
| `evaluator` | `gpt-5.6-terra` / high | 普通独立验收 |
| `critical_evaluator` | `gpt-5.6-sol` / high | 安全、数据、权限和生产风险验收 |

- `fast_worker` 只承担步骤与正确答案明确的机械任务；遇到产品判断、跨模块设计或共享接口变更立即升级。
- `worker` 在既定方案下最多进行一次有新证据的修复；仍未通过确定性验收，或首次因理解/架构问题失败时，必须携带失败命令、日志和 diff 升级给 `complex_worker`。
- `background_deep_worker` 只能用于隔离、可确定性验收、失败可安全重试且不占交互关键路径的任务；同一任务最多一个，不得担任 planner、evaluator 或发布决策者。
- Luna `max` 不作为交互式默认值；只允许通过 `background_deep_worker` 显式启用，不能用连续提高 effort 替代升级模型或重新规划。
- 最多 4 个 agent，默认最多并行 2 个实现 worker；只有所有权不重叠且并行缩短关键路径时才并行。

## 实施与验证

- 当前权威命令必须从真实的包管理配置、构建配置、CI 和运行手册中读取。
- 项目尚未定义某类命令时，明确写“不可用”，不得猜测。
- 实现 agent 必须返回：修改文件、执行命令与结果、Acceptance Criteria 对照、文档/发布影响和残余风险。
- 主线程负责查看完整 diff、运行项目级验证并整合并发结果。
- evaluator 首轮只评审和验证，不修改生产代码；发现问题后由原实现者修复，再由原 evaluator 独立复验。

## 当前项目命令

- 安装：`npm install`。
- 开发：`npm run dev`。
- Lint：不可用（`package.json` 未定义 lint 命令）。
- 类型检查：`npx tsc --noEmit`。
- 测试：`npm test`。
- 构建：`npm run build`。
- 部署/dry run：仓库已关联 Vercel 项目，但未定义已检查入库的部署或 dry-run 命令；部署须经单独授权。IndexNow 提交演练可用 `npm run submit:indexnow -- --dry-run`。

## 完成与发布

- 检查 README、CHANGELOG、运行手册、部署/回滚说明是否受影响；受影响时同步，不受影响时明确说明。
- 测试绿色不等于已上线。只有获得发布授权、完成实际部署并进行线上 smoke check 后，才能报告“已上线”。
- 未获发布授权时，状态应写成“实现与本地/Preview 验证完成，尚未发布”。

## 模板

- 规划使用 `docs/agent-workflow/PLAN_TEMPLATE.md`。
- 独立验收使用 `docs/agent-workflow/EVAL_TEMPLATE.md`。
