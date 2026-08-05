# Calculator UI 生产发布计划

## 元数据

- 计划名称：桌面计算器布局与 Harvest List 修复发布
- 当前基线：`origin/main` 为 `adc9649`；候选分支为 `codex/gag2-ui-feedback`
- 事实源：用户浏览器截图、当前组件实现、GitHub PR #5、Vercel Git 部署状态
- 任务等级：S3

## 目标、非目标与约束

- 目标：消除 1376×911 的计算器尾行空白；Add harvest 后自动展开列表；数量与删除操作对齐；在 1376×911 与 453×911 实测。
- 非目标：不改计算公式、游戏数据、SEO、域名、Cloudflare 或 Vercel 配置。
- 约束：只提交本任务组件与测试；保留用户现有 `AGENTS.md` 改动；以 GitHub→Vercel 既有集成发布。

## 任务 DAG 与所有权

| Task ID | 工作项 | Agent | 所有权 | 产物 |
|---|---|---|---|---|
| T1 | 语义网格、Harvest 展开、操作对齐 | worker | `CalculatorTool.tsx`、`.module.css`、对应测试 | 候选提交 |
| T2 | 两视口浏览器回归 | 主线程 | 本地浏览器会话 | 截图和交互证据 |
| T3 | Preview 与完整差异独立验收 | critical_evaluator | 只读 | PASS/FAIL |
| T4 | 合并、Vercel 生产发布、线上 smoke | 主线程 | GitHub/Vercel | 生产 SHA 与访问证据 |

## Acceptance Criteria

| ID | 可观察行为 | 验证 |
|---|---|---|
| AC1 | 桌面无孤立 Decay、无重叠或横向溢出 | 1376×911 浏览器实测 |
| AC2 | 手机 Fruit Price、Mutation 全宽且不溢出 | 453×911 浏览器实测 |
| AC3 | Add 后 Harvest List 自动展开，手动收起后再次 Add 重开，Reset 关闭 | 浏览器交互 |
| AC4 | 数量、删除按钮底边对齐；数量改变后总价同步 | 浏览器交互 |
| AC5 | 单元、类型、构建均通过 | `npm test`、`npx tsc --noEmit`、`npm run build` |
| AC6 | Preview/Production 部署 SHA 与候选/合并 SHA 一致 | GitHub/Vercel 状态与线上 smoke |

## 风险、回滚与发布

- 风险：混入用户未提交文件、Preview 与生产 SHA 不一致、缓存响应误判。
- 回滚：如生产 smoke 失败，创建 GitHub revert 提交，等待该提交的 Vercel Production success 后复验。
- 发布边界：用户已明确授权 push、PR、合并和生产发布；不授权 Vercel/Cloudflare 配置改动或直接 CLI 部署。

## Plan Gate

- 结论：PASS。
- 首批任务：T1、T2；T3 PASS 和 Preview success 是合并前硬门槛。
