# Repository Guidelines

## Project Structure & Modules
- `app/` — Next.js App Router entry; `layout.tsx` wires global fonts/background; `page.tsx` renders `CalendarPage`.
- `components/ui/` — shadcn-style primitives (buttons, dialog, form, etc.).
- `components/common/calendar/` — calendar experience and Ethiopian↔Gregorian logic; keep helpers pure and locale-safe.
- `components/` (root) — feature blocks such as `conversion-card.tsx`, `calendar-grid.tsx`, `geez-reference.tsx`.
- `lib/` — shared utilities (e.g., `calendar-utils.ts`, `utils.ts`) used across views.
- `hooks/` — reusable client hooks like `use-mobile` and toast helpers.
- `styles/` and `app/globals.css` — Tailwind v4 design tokens and theme; `public/` holds static assets/icons.

## Build, Test & Dev Commands (pnpm)
- `pnpm install` — install dependencies.
- `pnpm dev` — run Next.js locally with hot reload at http://localhost:3000.
- `pnpm build` — production build; fails on unresolved imports but TypeScript errors are ignored per `next.config.mjs`.
- `pnpm lint` — Next/ESLint + Tailwind checks; run before opening a PR.
- `pnpm start` — serve the built app (`pnpm build` first).

## Coding Style & Naming
- Language: TypeScript + React function components; prefer named exports over defaults when practical.
- Indentation: 2 spaces; keep imports grouped (external → aliased `@/` → relative).
- Styling: Tailwind v4; co-locate utility classes, order roughly layout → spacing → color → state. Use theme tokens (`bg-background`, `text-foreground`, brand scales) instead of raw hex.
- State logic: keep calendar/math helpers pure (`lib/calendar-utils.ts`, `components/common/calendar/lib`). Avoid mutating date objects; convert through helper functions.

## Testing Guidelines
- No automated tests are present yet; at minimum run `pnpm lint` before pushing.
- When adding logic in calendar utilities, prefer small pure functions and add unit tests in a future `__tests__/` folder (Vitest/Jest acceptable). Name files `<module>.test.ts`.

## Commit & Pull Request Guidelines
- Commits: short, imperative mood (e.g., "Add geez numeral toggle", "Refine footer links"); scope tags optional (`calendar:`, `ui:`) when helpful.
- Pull Requests should include: brief summary, linked issue (if any), screenshots/GIFs for UI changes, and a checklist of commands run (lint/build). Call out breaking changes or new env vars explicitly.

## Security & Config Notes
- Keep secrets out of the repo; prefer `.env.local` (not committed). No public API keys should live in `next.config.mjs` or `app/`.
- Images are unoptimized (`next.config.mjs`), and TypeScript errors are ignored during build—watch lint output to prevent regressions.
