---
name: my-ui
description: >-
  Build or polish AnimeUz Next.js UI my way. Use for "make it professional",
  "fix UI", "install shadcn", "new page", "this looks like AI slop".
  Enforces my 5 laws: no native controls, no AI slop, no ALL CAPS/emoji, steady motion, consistency.
  Next.js 16 App Router + Tailwind v4 project.
---

# My UI skill (AnimeUz — Next.js 16 + Tailwind v4 + shadcn pending)

Stack truth: Next `16.2.9`, React 19, Tailwind v4 (`@import "tailwindcss"`, `@theme` in `src/app/globals.css`),
App Router (`src/app/layout.tsx`), alias `@/*` -> `src/*`, no `components.json` yet, hand-rolled `src/components/ui/`
(Badge, RegionSelector, Skeleton, StarRating). Read `references/laws.md` before touching UI.

## Step 0: Delivery mode
Direct mode default (own early project). Localhost first, small branch commits. Never push/deploy without `deploy` / `ship it` in latest message.

## Step 1: Read project
1. `package.json`, `src/app/*`, `src/components/**`, `src/app/globals.css` `@theme` tokens, fonts (Outfit headings + Inter body via Google Fonts import).
2. `npm run dev`, screenshot main routes 1440px + 390px. Note current violations: card hover `translateY(-4px)` + glow in `globals.css:129-134`, `btn-primary:hover` glow+lift `globals.css:152-156`, `glow-pulse` animation — all banned by Law 2/4.
3. Vibe: content/discovery site (anime catalog, search, detail). See `references/vibes.md`.

## Step 2: Ask once
Skip what code answers. Recommended first:
1. shadcn: install now via `shadcn@latest init` (recommended, New York style, CSS vars, `@/*` alias)? Keep hand-rolled for now?
2. Which pages in scope? home / search / anime/[id] / layout shell?
3. Icons: keep inline SVG / switch to `lucide-react` via one module `lib/icons.ts` (recommended)?
4. Motion: calm steady (recommended, remove hover lifts/glows) vs keep playful?
Write `DESIGN.md` after go-ahead, wait for `go`.

## Step 3: Foundations (Next.js + Tailwind v4 + shadcn path)
1. Init: `npx shadcn@latest init` — style New York, base Slate, CSS variables YES, `app/src/app` path, alias `@/*`. It writes `components.json`, `lib/utils.ts` (`cn()`), theme vars.
2. Tailwind v4 note: tokens live in `@theme` in `globals.css`, NOT `tailwind.config.js`. Map existing `--color-*`, `--radius-*` into shadcn `--background/--primary/--muted` vars. Keep Outfit/Inter.
3. App Router rules:
   - `layout.tsx` stays Server Component. Interactive shadcn (`Dialog`, `Popover`, `Select`, `Tooltip`) go in `"use client"` files only.
   - Use `next/image` for AniList/TMDB covers (remotePatterns already in `next.config.ts`). Always `alt`, sizes.
   - Fonts: keep Google Fonts link in `layout.tsx:26-29` or move to `next/font`. Don't double-load.
4. Vendor primitives to `src/components/ui/`. House layer `src/components/shared/`: EmptyState, SearchInput, RegionSelector wrapper, StarRating wrapper, ErrorState.
5. Never restyle primitive per page. Never add MUI/Ant/coss as side effect.

## Step 4: Apply laws page by page
With `references/laws.md` open. Fix every instance (search `src/`), reuse components, look-and-feel only. Short copy: title, one line, action.

## Step 5: Verify
Run `references/verification.md`. `npm run build` + `npm run lint` must pass. Report Done/Verified/Not verified/Skipped + localhost link + absolute file paths as plain text.

## Hard rules
- Exact scope. Discuss/plan = no edits.
- No push/merge/deploy without explicit word.
- Fix class not instance, report counts.
- Short plain English. Paths as plain text, not code blocks.
