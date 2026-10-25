# Changelog

All notable changes to this project will be documented in this file.

## [0.3.2] - 2026-10-10

### Added

- Search filters: genre, studio, year, season, format, status, sort via shadcn `Select` (Law 1: no native controls)
- Release calendar page (`/calendar`) with episode air schedule grouped by day, expandable cards
- AniList GraphQL query `GET_AIRING_SCHEDULE` for upcoming episodes

### Fixed

- Law 2 cleanup: removed hover `translateY` lifts and `glow-pulse` animations from `.card:hover`, `.btn-primary:hover`, `.glow-pulse` in `globals.css`
- `AnimeTrailer` play button no longer uses `glow-pulse` animation

### Changed

- `SEARCH_ANIME` GraphQL query extended with `genre_in`, `studio`, `season`, `seasonYear`, `format`, `status`, `sort` variables
- Search API route (`/api/search`) accepts filter params; search page (`/search`) includes `FilterBar` component

## [0.3.1] - 2026-10-10

### Changed

- `RegionSelector` migrated to shadcn `Select` (`use client`), lazy localStorage init — fixes `set-state-in-effect` lint
- `layout.tsx` wrapped in shadcn `TooltipProvider`

## [0.3.0] - 2026-10-10

### Added

- shadcn/ui base-nova init: `components.json`, `src/lib/utils.ts`, `button`, `select`, `dialog`, `popover`, `tooltip`
- `.opencode/skills/my-ui/` — 5 UI laws + Next/Tailwind v4 wiring + verification

### Fixed

- Law 3: removed `uppercase` from `AnimeHero` stats + `StreamingProviders` section, sentence case only
- Theme: mapped shadcn `:root`/`.dark` to violet dark (`#0a0a0f` / `#7c6df0`), removed `@theme inline` collisions

### Known

- Custom `Skeleton.tsx` kept, shadcn skeleton skipped (Windows filename collision)
- `TooltipProvider` not yet wrapped in layout
- `npm run lint` has 2 pre-existing `set-state-in-effect` errors + 1 unused import, unrelated to UI pass

## [0.2.0] - 2026-06-13

### Added

#### Infrastructure
- Next.js 16.2.9 project initialized (App Router, TypeScript strict, src/ layout)
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- `postcss.config.mjs` for Tailwind v4 pipeline
- `.env.local` (API credentials) and `.env.example` (safe template)
- `next.config.ts` with remote image domains (AniList, TMDB, YouTube)

#### Design System (`src/app/globals.css`)
- Dark color palette via CSS custom properties (`--color-bg-*`, `--color-accent*`, etc.)
- Typography: Google Fonts — Outfit (headings) + Inter (body)
- Utility classes: `.container-page`, `.glass`, `.card`, `.btn-primary`, `.btn-ghost`
- Animations: `fade-up`, `shimmer` (skeleton), `pulse-glow`
- Badge classes for genre, status, format

#### Type System
- `src/types/anime.ts` — unified internal types (AnimeSearchResult, AnimeDetails, StreamingAvailability, Region, etc.)
- `src/lib/anilist/types.ts` — raw AniList GraphQL response types
- `src/lib/tmdb/types.ts` — raw TMDB REST response types

#### API Service Layer
- `src/lib/anilist/client.ts` — GraphQL client with Next.js fetch caching (5 min revalidate)
- `src/lib/anilist/queries.ts` — SEARCH_ANIME, GET_ANIME_DETAILS, GET_TRENDING_ANIME
- `src/lib/tmdb/client.ts` — Bearer auth fetch, `findTmdbId()`, `getWatchProviders()`
- `src/lib/tmdb/queries.ts` — 7 regions (UZ, US, GB, DE, JP, RU, HU), image URL builder

#### API Routes
- `GET /api/search?q=<title>` — AniList search, normalized response
- `GET /api/anime/[id]` — AniList details, normalized response
- `GET /api/anime/[id]/providers?region=<code>` — TMDB watch providers per region

#### Components
- `Navbar` — scroll glassmorphism, gradient logo, search form, nav links
- `AnimeHero` — banner + cover art with glow, stats row, genres
- `AnimeSynopsis` — DOMPurify HTML sanitize, collapsible read-more
- `AnimeTrailer` — YouTube embed, thumbnail preview, pulsing play button
- `StreamingProviders` — TMDB provider logos (flatrate/rent/buy), fallback links
- `RegionSelector` — 7 regions dropdown, localStorage persistence (default: UZ)
- `AnimeCard` — cover image, score overlay, genre badges, hover lift
- `SearchBar` — focus ring, size variants, router submission
- `Badge`, `StarRating`, `Skeleton`, `AnimeCardSkeleton`, `AnimeDetailsSkeleton`

#### Pages
- **Homepage** (`/`) — animated hero, ambient blobs, trending grid (SSR)
- **Search** (`/search?q=`) — URL-based state, SSR results, skeletons, empty/error states
- **Anime Details** (`/anime/[id]`) — SSR, dynamic OG metadata, two-column responsive layout

## [0.1.0] - 2026-06-13

### Added

- Project idea finalized
- Repository created
- README.md created
- AI_CONTEXT.md created
- TASKS.md created
- PROJECT_STATE.md created
- DECISIONS.md created
- CHANGELOG.md created