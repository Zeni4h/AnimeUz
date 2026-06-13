# AI Context

## Project Name

AnimeUz

## Project Purpose

Build an anime information website that aggregates anime metadata, streaming availability, and release information.

The website is NOT a streaming platform.

## Current Development Stage

Early development.

No production features implemented yet.
    
Database is intentionally postponed.

The MVP should use AniList API directly.

Do not introduce PostgreSQL or Prisma unless a feature explicitly requires persistent storage.

## Initial Feature Scope

### Anime Details Page

Display:

* Title
* Cover image
* Banner image
* Synopsis
* Ratings
* Genres
* Trailer
* Streaming availability
* Region availability

### Search

Users can search anime by title.

## Planned Future Features

* Release Calendar
* Watch Order Guides
* Character Database
* Anime News + AI Summaries

## Primary Data Source

AniList API

Use AniList as the primary source of anime metadata.

## Secondary Data Sources

TMDB API

Used for:

* Trailers
* Streaming providers
* Regional availability

## Architecture Principles

* TypeScript everywhere
* Strong typing
* Reusable components
* Server-side fetching where appropriate
* Clean API abstraction layer
* Mobile-first UI

## Coding Standards

* Use TypeScript strict mode
* Prefer reusable components
* Avoid duplicated logic
* Create utility functions for API access
* Keep business logic separate from UI

## AI Agent Instructions

Before starting work:

1. Read TASKS.md
2. Read PROJECT_STATE.md
3. Read DECISIONS.md

After completing work:

1. Update TASKS.md
2. Update CHANGELOG.md
3. Update PROJECT_STATE.md
4. Document major architecture decisions in DECISIONS.md
