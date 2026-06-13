# Architecture

## System Overview

Anime Information Platform is a full-stack Next.js application.

The application provides anime information, streaming availability, trailers, and future anime-related tools.

## Technology Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS

Backend:

* Next.js API Routes

Database:

* PostgreSQL
* Prisma ORM

External APIs:

* AniList API
* TMDB API

Hosting:

* Vercel
* Neon PostgreSQL

## High-Level Architecture

Browser
↓
Next.js Frontend
↓
Next.js API Routes
↓
PostgreSQL

External Services:

* AniList API
* TMDB API

## Phase 1 Data Flow

User searches anime

↓

Frontend Search Page

↓

Search API Route

↓

AniList API

↓

Response Processing

↓

Frontend Results

## Initial Features

### Search

Responsibilities:

* Search anime by title
* Display search results

### Anime Details

Responsibilities:

* Synopsis
* Ratings
* Genres
* Trailer
* Streaming providers
* Region availability

## Planned Future Modules

### Release Calendar

Purpose:
Track upcoming anime episodes and seasonal releases.

### Watch Order Guides

Purpose:
Help users navigate complex franchises.

### Character Database

Purpose:
Provide detailed anime character information.

### Anime News

Purpose:
Aggregate anime industry news and provide AI-generated summaries.

## Database Strategy

Phase 1:
Minimal local database.

Use AniList API directly when possible.

Phase 2:
Cache frequently requested anime data.

Phase 3:
Store watch-order guides, news summaries, and user-generated content.

## AI Agent Workflow

Before work:

1. Read AI_CONTEXT.md
2. Read PROJECT_STATE.md
3. Read TASKS.md

After work:

1. Update TASKS.md
2. Update CHANGELOG.md
3. Update PROJECT_STATE.md
4. Update DECISIONS.md if architecture changes
