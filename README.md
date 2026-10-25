# AnimeUz — Discover Anime

Anime info site, not streaming. Search titles, open details, see synopsis, score, genres, trailer, where to watch by region.

Live MVP on Vercel with basic features: home trending grid, search, anime details, streaming providers with UZ default.

## Stack

- Next.js 16.2.9 App Router, React 19, TypeScript strict
- Tailwind CSS v4 (`@import "tailwindcss"`, `@theme` in `src/app/globals.css`, PostCSS plugin)
- shadcn/ui base-nova (RSC, `components.json`, `src/components/ui/`, `cn` from `cn` package)
- Data: AniList GraphQL primary, TMDB REST secondary for trailers/providers
- No DB. No auth. Do not add PostgreSQL/Prisma/auth until explicitly approved.

## Run

```bash
npm run dev
npm run build
npm run lint
```

Env: see `.env.example` (AniList public, `TMDB_Bearer` for providers). App: http://localhost:3000

## Routes

- `/` home — hero search + trending (SSR)
- `/search?q=` — URL state, SSR results, skeletons
- `/anime/[id]` — SSR details, OG metadata
- `/api/search`, `/api/anime/[id]`, `/api/anime/[id]/providers?region=`

## UI rules

Load `@my-ui` skill for any UI work: `.opencode/skills/my-ui/SKILL.md`.
5 laws: no native controls, no AI slop, no ALL CAPS/emoji, steady motion, consistency.
Theme: dark `#0a0a0f`, accent `#7c6df0`, Outfit headings + Inter body.
shadcn vars in `globals.css` mapped to same palette. Custom `Skeleton.tsx` kept (case collision with shadcn skeleton on Windows).

## Docs

- `ARCHITECTURE.md` — truth
- `DECISIONS.md` — why
- `CHANGELOG.md` — what changed
- `TASKS.md` — backlog only
