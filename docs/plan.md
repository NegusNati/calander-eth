# Performance, SEO, and SSR Plan

## Phase 1 — Baseline & Goals
- [x] Run Lighthouse (mobile) on `/` in `pnpm dev` and note LCP/TTFB/CLS. (Nov 19, 2025 via `chrome@142` "Chrome for Testing" cache + `npx lighthouse`; score 63. Metrics: LCP 7.29s, FCP 1.07s, TTFB 2.40s, CLS 0.0002, TBT 447ms, Speed Index 4.03s, TTI 7.99s. LCP asset was `ethiopiac_num_pattern.svg` hero logo; breakdown showed TTFB dominating.)
- [x] Set budgets: LCP < 2.5s, TTFB < 200ms (edge), CLS < 0.1. (Nov 19, 2025)
- [x] List routes and critical assets (fonts, SVGs, hero images). (Routes: `/` only; critical assets: `public/placeholder.jpg`, `placeholder.svg/.png`, `icon*.png/.svg`, `shader_bg.svg`, `ethiopiac_num_pattern.svg`; fonts via `next/font` Geist sans/mono.)

> Latest (prod build, Nov 19, 2025): Lighthouse mobile perf 95. Metrics: LCP 2.96s, FCP 1.06s, TTFB 6ms, CLS 0.0002, TBT 2ms, Speed Index 1.06s, TTI 3.25s. LCP no longer blocked by hero art.

## Phase 2 — Rendering & Routing
- [ ] Prefer server components; keep client components only where interactivity is required (calendar UI).
- [x] Mark static pages with `export const dynamic = 'force-static'` or `revalidate` value. (Home revalidated hourly to keep "today" fresh while cutting TTFB.)
- [x] Add sitemap and robots routes allowing all crawlers; confirm canonical URLs. (Added `/sitemap.xml` and `/robots.txt` pointing at `https://ethiopian-calendar.app`.)
- [x] Ensure Metadata API is complete (title, description, OG/Twitter). (Titles/descriptions present; OG/Twitter point to 1200x630 placeholder, canonical handled via `metadataBase`.)

## Phase 3 — Payload & Build Hygiene
- [ ] Remove unused/large deps after running bundle analyzer.
- [ ] Lazy-load heavy UI (charts/Radix extras) with `next/dynamic` when SSR not needed.
- [ ] Switch `next.config.mjs` to stop ignoring TypeScript build errors; fix blockers.
- [x] Enable Next image optimization (remove `unoptimized: true`) or document why not. (Image optimizer re-enabled; only local assets used.)
- [x] Swap to `next/font` subsets with `display: swap`. (Geist sans/mono now set to `display: 'swap'`.)

## Phase 4 — CSS & Mobile-First
- [ ] Audit `globals.css` and key components for mobile-first spacing and layout.
- [ ] Use clamp-based typography; ensure tap targets ≥ 48px.
- [ ] Test at 360–430px and 768px widths.
- [x] Decorative art deferred: hero background art now swaps to lazy CSS backgrounds after idle to avoid LCP impact.

## Phase 5 — SEO Enhancements
- [ ] Single `<h1>` per page; semantic heading order.
- [x] Alt text on images/icons; descriptive titles for controls. (Remaining inline images now decorative or descriptive; hero decor removed.)
- [x] Add JSON-LD (tool/product) and Open Graph 1200×630 assets. (WebSite JSON-LD injected via layout; OG/Twitter already set.)
- [ ] Optional: `humans.txt` and `/feed` if updates exist.

## Phase 6 — Crawler & Bot Access
- [x] `robots.txt` with `User-agent: *` and sitemap URL; no disallows. (Added in App Router.)
- [ ] Verify 200 responses for key pages; avoid bot-blocking headers.
- [ ] Middleware only when needed; keep publicly accessible.

## Phase 7 — Accessibility (SEO-adjacent)
- [ ] Run `pnpm lint` with Next a11y rules.
- [ ] Keyboard tab/shift-tab navigation works; visible focus states.
- [ ] Contrast >= 4.5:1 on text/icons.

## Phase 8 — Observability
- [x] Add Lighthouse CI or automated Web Vitals via `@vercel/analytics`. (Analytics client wired in layout.)
- [x] Add bundle analyzer script for PRs. (`pnpm analyze` runs `ANALYZE=true next build` with @next/bundle-analyzer.)
- [ ] Use preview deploys to validate perf/SEO before merge.

## Phase 9 — Deployment
- [ ] Prefer edge runtime where compatible; otherwise static export.
- [ ] Set CDN caching for static assets (long max-age + immutable).
- [ ] Capture final Lighthouse (mobile) snapshot and attach to PR.

## Phase 10 — Maintenance
- [ ] Document ongoing budgets and steps in `AGENTS.md`.
- [ ] Schedule quarterly audits (deps, Lighthouse, broken links).
