# Development Tasks

## Current Sprint (MVP)
## MVP Definition

A user can:

1. Search for anime.
2. Open an anime details page.
3. View synopsis.
4. View ratings.
5. View genres.
6. View trailers.
7. View streaming availability.

The project is considered MVP-complete when all above items work in production.

### Project Setup

* [x] Initialize Next.js project
* [x] Configure TypeScript
* [x] Configure Tailwind CSS v4
* [x] Setup ESLint
* [x] Create .env.local and .env.example

### API Integration

* [x] Connect to AniList API
* [x] Create API service layer (lib/anilist/, lib/tmdb/)
* [x] Create Anime Search endpoint (/api/search)
* [x] Create Anime Details endpoint (/api/anime/[id])
* [x] Create Streaming Providers endpoint (/api/anime/[id]/providers)

### Frontend

* [x] Create Homepage (trending anime + hero search)
* [x] Create Anime Search page
* [x] Create Anime Details page

### Anime Details Features

* [x] Display synopsis (with read-more expand)
* [x] Display ratings (star rating + numeric score)
* [x] Display genres
* [x] Display trailers (YouTube embed with thumbnail)
* [x] Display streaming availability (TMDB watch providers)
* [x] Display region availability (7 regions, user-selectable, persisted to localStorage)

### Deployment

* [ ] Deploy first version to Vercel

---

## Next Sprint

### Database & Caching

* [ ] Setup PostgreSQL
* [ ] Setup Prisma
* [ ] Design cache schema
* [ ] Cache frequently requested anime

### User Features

* [ ] User accounts
* [ ] Favorites list
* [ ] Recently viewed anime

---

## Backlog

### Anime Release Calendar

* [ ] Seasonal anime page
* [ ] Episode schedule
* [ ] Countdown system

### Anime Watch Order Guides

* [ ] Franchise database
* [ ] Watch-order pages

### Anime Character Database

* [ ] Character pages
* [ ] Voice actor pages
* [ ] Character relationships

### Anime News + AI Summaries

* [ ] RSS ingestion
* [ ] AI summarization
* [ ] News pages

### Search Improvements

* [ ] Advanced filters
* [ ] Genre filters
* [ ] Studio filters
* [ ] Year filters

### Future Ideas

* [ ] Anime recommendation engine
* [ ] Personalized recommendations
* [ ] User collections
* [ ] Seasonal trends dashboard
