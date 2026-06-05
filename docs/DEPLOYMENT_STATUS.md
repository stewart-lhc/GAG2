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
  - Status: `pending`
  - Nameservers: `kobe.ns.cloudflare.com`, `stella.ns.cloudflare.com`
- Cloudflare DNS records created:
  - Proxied `A` record: `growagarden2.pro` -> `76.76.21.21`
  - Proxied `CNAME` record: `www.growagarden2.pro` -> `cname.vercel-dns.com`
- Cloudflare settings:
  - SSL mode: `full`
  - Always Use HTTPS: `on`

## Verification

- Local production build passes with 17 static routes.
- Vercel deployment status is `READY`.
- `https://growagarden2-pro.vercel.app` returns `200 OK`.

## Blocked External Configuration

Spaceship API requires both `X-API-Key` and `X-API-Secret`. Only one Spaceship value was available, and read requests returned `401 Unauthorized`, so registrar nameservers could not be updated from this environment.

## Required Registrar Cutover

Once Spaceship API access is available:

- Update Spaceship nameservers to:
  - `kobe.ns.cloudflare.com`
  - `stella.ns.cloudflare.com`
- Re-check in Vercel until both custom domains are configured.
- Verify:
  - `https://growagarden2.pro`
  - `https://www.growagarden2.pro`
  - `https://growagarden2.pro/sitemap.xml`
  - `https://growagarden2.pro/robots.txt`
