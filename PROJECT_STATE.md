# Project State

Last Updated: 2026-06-13

## Current Status

**MVP development complete.**

All core MVP features implemented and running locally on Next.js 16 with Turbopack.

## What Was Built (Sprint 1)

### Infrastructure
- Next.js 16.2.9 with App Router
- TypeScript strict mode — zero type errors
- Tailwind CSS v4 (PostCSS plugin approach, no config file)
- ESLint configured
- `.env.local` and `.env.example` created

### API Layer
- AniList GraphQL client (`src/lib/anilist/client.ts`)
- TMDB REST client with Bearer token auth (`src/lib/tmdb/client.ts`)
- Unified internal type system (`src/types/anime.ts`)

### API Routes
- `GET /api/search?q=<title>` — AniList anime search
- `GET /api/anime/[id]` — AniList anime details
- `GET /api/anime/[id]/providers?region=<code>` — TMDB watch providers

### Pages
- **Homepage** — hero section + trending anime grid (SSR)
- **Search page** — URL-based, server-rendered results, skeletons
- **Anime Details page** — SSR, dynamic OG metadata, two-column layout

### Components
- `Navbar` — scroll-aware glassmorphism, gradient logo, inline search
- `AnimeHero` — banner + cover art + stats
- `AnimeSynopsis` — HTML sanitized via DOMPurify, collapsible
- `AnimeTrailer` — YouTube embed with thumbnail & glow play button
- `StreamingProviders` — TMDB providers + AniList fallback links
- `RegionSelector` — 7 regions, persisted to localStorage, default: UZ
- `AnimeCard`, `SearchBar`, `Badge`, `StarRating`, `Skeleton`

## Current Goal

Deploy to Vercel as next step.

## Next Development Step

1. Deploy to Vercel (connect repo, add env vars)
2. Begin Sprint 2: Database & Caching

## Current Branch

draft

## Available Branches
develop, main

## Known Risks / Limitations

- Streaming provider data requires TMDB match by title; niche/old anime may not resolve.
- AniList external links used as fallback for streaming (good coverage for major platforms).
- Regional availability for UZ is limited — most providers only cover US/GB/JP/DE.
- No caching layer yet — every page render hits AniList API (rate limit: generous but finite).

## Notes For Future AI Sessions

- Do not introduce PostgreSQL or Prisma until Sprint 2 is approved.
- Do not add auth until explicitly requested.
- Next.js App Router, TypeScript strict, Tailwind v4 (CSS @import, no config file).
- Region default is UZ, persisted in localStorage key: `animeuz_region`.