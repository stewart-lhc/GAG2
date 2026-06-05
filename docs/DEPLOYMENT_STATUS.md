# Deployment Status

Date: 2026-06-05

## Completed

- GitHub repository: `https://github.com/stewart-lhc/GAG2`
- Vercel project: `tenkmrr/growagarden2-pro`
- Vercel production deployment: `https://growagarden2-lf3bd9dwt-tenkmrr.vercel.app`
- Vercel production alias: `https://growagarden2-pro.vercel.app`
- Custom domains added to Vercel:
  - `growagarden2.pro`
  - `www.growagarden2.pro`
- Cloudflare zone created:
  - Zone ID: `df8347a5ef8c11e092c8cd9f06f156a6`
  - Status: `active`
  - Nameservers: `kobe.ns.cloudflare.com`, `stella.ns.cloudflare.com`
- Cloudflare DNS records created:
  - Proxied `A` record: `growagarden2.pro` -> `76.76.21.21`
  - Proxied `CNAME` record: `www.growagarden2.pro` -> `cname.vercel-dns.com`
- Cloudflare settings:
  - SSL mode: `full`
  - Always Use HTTPS: `on`
- Spaceship nameservers updated:
  - `kobe.ns.cloudflare.com`
  - `stella.ns.cloudflare.com`

## Verification

- Local production build passes with 17 static routes.
- Vercel deployment status is `READY`.
- `https://growagarden2-pro.vercel.app` returns `200 OK`.
- `https://growagarden2.pro` returns `200 OK` through Cloudflare and Vercel.
- `https://www.growagarden2.pro` returns `200 OK` through Cloudflare and Vercel.
- `https://growagarden2.pro/sitemap.xml` returns the canonical sitemap.
- `https://growagarden2.pro/robots.txt` returns crawler rules and the sitemap URL.
- Fresh asset verification passed: page HTML and all referenced CSS/JS/favicon assets return `200 OK` with no redirect loop.
