# GAG2 SEO 迁移基线

- 记录日期：2026-08-04（Asia/Shanghai）
- 生产域名：`https://growagarden2.pro`
- GSC 数据：当前工作区没有可用的 Search Console 连接或凭据，因此 query/click/impression 基线标记为 `unavailable`
- 处理原则：GSC 不可用不阻塞用户已确认的 Calculator-first 产品方向，但旧 URL 迁移后的曝光变化必须在取得 GSC 权限后补记

## 当前生产状态

| URL | HTTP | Title | H1 | Canonical |
|---|---:|---|---|---|
| `/` | 200 | `Grow a Garden 2 Tools Hub` | `Grow Smarter Than Rumors` | `/` |
| `/grow-a-garden-2-calculator/` | 200 | `Grow a Garden 2 Calculator \| GAG2 Tools` | `Value Calculator` | `/grow-a-garden-2-calculator/` |
| `/sitemap.xml` | 200 | XML sitemap | 不适用 | 不适用 |

## 迁移后的目标

- `/`：唯一的 `Grow a Garden 2 Calculator` indexable canonical。
- `/grow-a-garden-2-calculator/`：Vercel 托管层单跳永久 308/301 到 `/`。
- 旧 URL 从 sitemap、导航和 `llms.txt` 移除。
- Preview/生产部署均需单独授权；未授权前真实重定向状态保持未验证。
