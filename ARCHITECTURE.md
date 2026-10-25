# Architecture (truth as of 2026-10-10)

## What it is

Next.js 16 App Router anime discovery site. No streaming. MVP live on Vercel with basic features only: trending, search, details, trailer, providers.

## Stack

- Frontend: Next 16.2.9, React 19, TS strict, Tailwind v4 (`@theme`, no config file)
- UI: shadcn/ui base-nova + hand-rolled `Badge`, `Skeleton`, `StarRating`. `components.json` RSC true, lucide icons.
- Backend: Next API routes only. No DB, no auth, no Prisma.
- Data: AniList GraphQL (metadata), TMDB (trailers, providers, 7 regions UZ default `animeuz_region` localStorage)
- Images: `next/image`, domains AniList/TMDB/YouTube in `next.config.ts`
- Hosting: Vercel

## Data flow

Browser -> Next page (SSR) -> API route -> AniList/TMDB -> normalize `src/types/anime.ts` -> render.
Search state in URL. Region in localStorage + query param to providers route.

## Layout

- `src/app/` pages + `globals.css` tokens (bg `#0a0a0f`, accent `#7c6df0`, Outfit/Inter)
- `src/components/ui/` shadcn primitives + custom badges/skeletons
- `src/components/` `layout/Navbar`, `anime/*`, `search/*`
- `src/lib/anilist/`, `src/lib/tmdb/`

## Rules

- Server components by default. `use client` only for Dialog/Select/Popover/Tooltip wrappers.
- No PG/Prisma/auth until approved. No new UI library as side effect.
- UI work via `@my-ui` skill. Verify with `npm run build` + `npm run lint`.

## Next

- `TooltipProvider` in layout when Tooltip first used
- Migrate `RegionSelector` to shadcn Select
- Remove hover lifts/glows per Law 2
- Backlog in `TASKS.md`
