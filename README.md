# Grow a Garden 2 Tools Hub

Unofficial Grow a Garden 2 fan tools site built with Next.js for Vercel.

## MVP Scope

- Release status and official Roblox link verification
- Fake clone warning
- Stock tracker shell with verified/unknown data states
- Codes page with no fake active codes
- Crop value calculator alpha
- Night stealing risk mini tool
- SEO/AEO foundation: metadata, canonical sitemap, robots, FAQ/WebApplication/WebSite schema, llms.txt, and IndexNow submission

## Development

```bash
npm install
npm run dev
npm run build
npm run submit:indexnow -- --dry-run
```

## Production

Canonical domain: `https://growagarden2.pro`

Core public URLs:

- Live site: `https://growagarden2.pro/`
- Canonical sitemap: `https://growagarden2.pro/sitemap.xml`
- Robots: `https://growagarden2.pro/robots.txt`
- AI/agent summary: `https://growagarden2.pro/llms.txt`
- Official link guard: `https://growagarden2.pro/grow-a-garden-2-official-link/`
- Release status: `https://growagarden2.pro/grow-a-garden-2-release-date/`
- Stock tracker: `https://growagarden2.pro/grow-a-garden-2-stock-tracker/`
- Codes: `https://growagarden2.pro/grow-a-garden-2-codes/`
- Calculator: `https://growagarden2.pro/grow-a-garden-2-calculator/`

The site is intentionally verification-first. Unconfirmed GAG2 stock, codes, release timing, or formulas should remain marked as unknown or awaiting verification until source review is complete.

## Search Submission

After deployment, submit `https://growagarden2.pro/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Use IndexNow for Bing and participating engines:

```bash
npm run submit:indexnow
```

If Google or Bing ownership verification tokens are available, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` before building.
