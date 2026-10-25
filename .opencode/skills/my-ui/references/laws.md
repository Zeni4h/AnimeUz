# My 5 UI laws (AnimeUz)

Strength **[5]** = reject if broken. **[4]** = fix in this pass.

## 1. [5] No native controls
Never `<select>`, date/time/color inputs, `alert/confirm`, `title=` tooltips, `<datalist>`.
Use shadcn once installed: `Select`, `Calendar`+`Popover`, `Dialog`/`AlertDialog`, `Tooltip`, `ScrollArea`.
Current: `RegionSelector.tsx`, search filters hand-rolled — migrate to shadcn `Select` in `"use client"` wrapper.
Why: native breaks dark theme, looks old Android.

## 2. [5] No AI slop
No glow/shine, gradient washes, decorative beams, hover movement, icon-in-circle, stacked cards, ambient bg, sparkles.
Banned in this repo today:
- `globals.css:129-134` `.card:hover translateY(-4px)` + double shadow
- `globals.css:152-156` `.btn-primary:hover glow + lift`
- `globals.css:221-223` `.glow-pulse` infinite
- `.glass` blur ok only for navbar overlay, not cards
Buttons: one filled primary per view, outline secondary/Cancel, ghost quiet. Destructive only on confirm.
Why: #1 cheap look.

## 3. [5] No ALL CAPS / emoji
No `uppercase` / `text-transform: uppercase` anywhere. Sentence case.
No emoji in UI. Pills/badges only for states. `Badge.tsx` status/genre use is correct — don't use badges for plain names/facts.
Why: caps shout, emoji = slop signal.

## 4. [4] Steady layout + motion
Nothing moves unless user moved it. No page flash, no grid shift on filter, no popover sliding, no scrollbar flicker.
Tokens: 120/200/280ms, one overlay vocabulary, grids arrive as one block (no row cascade), `prefers-reduced-motion` safe.
Replace `fade-up 0.4s` + `shimmer` overuse with single skeleton for data only.
Touch: 44px targets, 16px inputs, dialogs -> bottom sheets on mobile.
Why: jank kills trust on catalog pages.

## 5. [4] Consistency
One radius (currently `--radius-card:12px/--radius-btn:8px/--radius-badge:6px` — keep, apply everywhere), 4px spacing, 6-7 type roles (Outfit headings, Inter body).
Reuse `src/components/ui/*` before inventing. Side-by-side heights equal. Nothing touches neighbour.
One accent `#7c6df0` for primary only. Semantic: score/status colors already in `@theme` — keep. Every icon/border visible on dark `#0a0a0f`.
Why: search vs detail vs home must feel like one app.
