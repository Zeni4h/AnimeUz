# Component libraries (AnimeUz: Next 16 App Router + Tailwind v4)

| Library | When | Notes |
|---|---|---|
| **shadcn/ui New York** (recommended) | Default for all new UI | Init via CLI, CSS vars, `@/*` alias. Theme to existing violet `#7c6df0` + dark bg. Must set tokens, don't ship default slate look. |
| **Keep hand-rolled** | `Badge.tsx`, `Skeleton.tsx`, `StarRating.tsx` if decent | Wrap, don't duplicate. Migrate to shadcn only where shadcn is better (Select, Dialog, Tooltip, Popover). |
| **ReUI** | Only if data grid/kanban/Gantt needed | Not needed for anime catalog now. |
| **Other (MUI/Ant/HeroUI/coss)** | Only on explicit request | Never as side effect. Separate proposal with tradeoffs. |

## Wiring (Tailwind v4 specific)
1. `components.json`: style new-york, tailwind v4, `app/src/app`, alias `@/*`.
2. Tokens in `src/app/globals.css` `@theme`: map `--color-bg-*` -> shadcn `--background/--card`, `--color-accent` -> `--primary`, text -> `--foreground/--muted-foreground`.
3. `lib/utils.ts` `cn()` from `clsx` + `tailwind-merge` — install if missing.
4. Icons: `lucide-react` via `src/lib/icons.ts` single module. Never import package directly in pages.
5. Server/Client: `page.tsx`/`layout.tsx` stay server. `Dialog/Select/Popover/Tooltip/Command` wrappers get `"use client"` at top.
6. Images: `next/image` with `remotePatterns` already configured. No plain `<img>` for covers.
