# Performance, SEO, and SSR Plan

## Phase 1 — Baseline & Goals
- [ ] Run Lighthouse (mobile) on `/` in `pnpm dev` and note LCP/TTFB/CLS.
- [ ] Set budgets: LCP < 2.5s, TTFB < 200ms (edge), CLS < 0.1.
- [ ] List routes and critical assets (fonts, SVGs, hero images).

## Phase 2 — Rendering & Routing
- [ ] Prefer server components; keep client components only where interactivity is required (calendar UI).
- [ ] Mark static pages with `export const dynamic = 'force-static'` or `revalidate` value.
- [ ] Add sitemap and robots routes allowing all crawlers; confirm canonical URLs.
- [ ] Ensure Metadata API is complete (title, description, OG/Twitter).

## Phase 3 — Payload & Build Hygiene
- [ ] Remove unused/large deps after running bundle analyzer.
- [ ] Lazy-load heavy UI (charts/Radix extras) with `next/dynamic` when SSR not needed.
- [ ] Switch `next.config.mjs` to stop ignoring TypeScript build errors; fix blockers.
- [ ] Enable Next image optimization (remove `unoptimized: true`) or document why not.
- [ ] Swap to `next/font` subsets with `display: swap`.

## Phase 4 — CSS & Mobile-First
- [ ] Audit `globals.css` and key components for mobile-first spacing and layout.
- [ ] Use clamp-based typography; ensure tap targets ≥ 48px.
- [ ] Test at 360–430px and 768px widths.

## Phase 5 — SEO Enhancements
- [ ] Single `<h1>` per page; semantic heading order.
- [ ] Alt text on images/icons; descriptive titles for controls.
- [ ] Add JSON-LD (tool/product) and Open Graph 1200×630 assets.
- [ ] Optional: `humans.txt` and `/feed` if updates exist.

## Phase 6 — Crawler & Bot Access
- [ ] `robots.txt` with `User-agent: *` and sitemap URL; no disallows.
- [ ] Verify 200 responses for key pages; avoid bot-blocking headers.
- [ ] Middleware only when needed; keep publicly accessible.

## Phase 7 — Accessibility (SEO-adjacent)
- [ ] Run `pnpm lint` with Next a11y rules.
- [ ] Keyboard tab/shift-tab navigation works; visible focus states.
- [ ] Contrast >= 4.5:1 on text/icons.

## Phase 8 — Observability
- [ ] Add Lighthouse CI or automated Web Vitals via `@vercel/analytics`.
- [ ] Add bundle analyzer script for PRs.
- [ ] Use preview deploys to validate perf/SEO before merge.

## Phase 9 — Deployment
- [ ] Prefer edge runtime where compatible; otherwise static export.
- [ ] Set CDN caching for static assets (long max-age + immutable).
- [ ] Capture final Lighthouse (mobile) snapshot and attach to PR.

## Phase 10 — Maintenance
- [ ] Document ongoing budgets and steps in `AGENTS.md`.
- [ ] Schedule quarterly audits (deps, Lighthouse, broken links).
