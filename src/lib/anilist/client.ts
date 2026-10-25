// AniList GraphQL client — server-side only

import type {
  AniListSearchResponse,
  AniListDetailsResponse,
  AniListTrendingResponse,
  AniListAiringScheduleResponse,
} from './types';

const ANILIST_API_URL =
  process.env.ANILIST_API_URL ?? 'https://graphql.anilist.co';

/**
 * Execute a typed GraphQL query against the AniList API.
 * Always runs server-side (API Routes / RSC).
 */
async function gqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(ANILIST_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 }, // cache for 5 minutes (Next.js fetch cache)
  });

  if (!res.ok) {
    throw new Error(
      `AniList API error: ${res.status} ${res.statusText}`,
    );
  }

  const json = (await res.json()) as T;
  return json;
}

// ─── Public helpers ───────────────────────────────────────────────────────────

import { SEARCH_ANIME, GET_ANIME_DETAILS, GET_TRENDING_ANIME, GET_AIRING_SCHEDULE } from './queries';
import type { SearchFilters } from '@/types/anime';

export async function searchAnime(
  query: string,
  page = 1,
  perPage = 20,
  filters?: SearchFilters,
): Promise<AniListSearchResponse> {
  const sort = filters?.sort ?? 'SEARCH_MATCH';
  return gqlFetch<AniListSearchResponse>(SEARCH_ANIME, {
    search: query,
    page,
    perPage,
    genre: filters?.genre,
    studio: filters?.studio,
    season: filters?.season,
    seasonYear: filters?.year,
    format: filters?.format,
    status: filters?.status,
    sort: Array.isArray(sort) ? sort : [sort],
  });
}

export async function getAnimeDetails(
  id: number,
): Promise<AniListDetailsResponse> {
  return gqlFetch<AniListDetailsResponse>(GET_ANIME_DETAILS, { id });
}

export async function getTrendingAnime(
  page = 1,
  perPage = 18,
): Promise<AniListTrendingResponse> {
  return gqlFetch<AniListTrendingResponse>(GET_TRENDING_ANIME, {
    page,
    perPage,
  });
}

export async function getAiringSchedule(
  page = 1,
  perPage = 50,
): Promise<AniListAiringScheduleResponse> {
  return gqlFetch<AniListAiringScheduleResponse>(GET_AIRING_SCHEDULE, {
    page,
    perPage,
  });
}
