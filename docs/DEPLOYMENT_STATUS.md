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

## Verification

- Local production build passes with 17 static routes.
- Vercel deployment status is `READY`.
- `https://growagarden2-pro.vercel.app` returns `200 OK`.

## Blocked External Configuration

Cloudflare API token verification returned `Invalid API Token`, so the Cloudflare zone and orange-cloud DNS records could not be created from this environment.

Spaceship API requires both `X-API-Key` and `X-API-Secret`. Only one Spaceship value was available, and read requests returned `401 Unauthorized`, so registrar nameservers could not be updated from this environment.

## Required DNS Target

Once Cloudflare API access is available:

- Create or use the Cloudflare zone `growagarden2.pro`.
- Add proxied DNS records:
  - `A` record: `@` -> `76.76.21.21`, proxied.
  - `CNAME` record: `www` -> `cname.vercel-dns.com`, proxied.
- Update Spaceship nameservers to the two Cloudflare nameservers assigned to the zone.
- Re-check in Vercel until both custom domains are configured.
- Verify:
  - `https://growagarden2.pro`
  - `https://www.growagarden2.pro`
  - `https://growagarden2.pro/sitemap.xml`
  - `https://growagarden2.pro/robots.txt`
