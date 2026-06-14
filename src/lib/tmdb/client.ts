// TMDB REST API client — server-side only

import type {
  TMDBSearchResponse,
  TMDBWatchProvidersResponse,
} from './types';
import type { StreamingAvailability } from '@/types/anime';
import { TMDB_API_BASE } from './queries';

const TMDB_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

if (!TMDB_TOKEN && typeof window === 'undefined') {
  // Warn at startup on server — does not throw so build still works
  console.warn('[TMDB] TMDB_READ_ACCESS_TOKEN is not set. Streaming data will be unavailable.');
}

/** Authenticated fetch to TMDB REST API */
async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  if (!TMDB_TOKEN) {
    throw new Error('TMDB_READ_ACCESS_TOKEN is not configured');
  }

  const url = new URL(`${TMDB_API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      Accept: 'application/json',
    },
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText} (${path})`);
  }

  return res.json() as Promise<T>;
}

// ─── Public helpers ───────────────────────────────────────────────────────────

/**
 * Find a TMDB TV show ID for an anime by searching its title.
 * Returns null if no match is found.
 */
export async function findTmdbId(
  title: string,
  year?: number | null,
): Promise<number | null> {
  try {
    const params: Record<string, string> = { query: title };
    if (year) params.first_air_date_year = String(year);

    const data = await tmdbFetch<TMDBSearchResponse>('/search/tv', params);

    if (data.results.length === 0) {
      // Fallback: try without the year constraint
      if (year) return findTmdbId(title, null);
      return null;
    }

    // Return the most popular result
    return data.results[0].id;
  } catch {
    return null;
  }
}

/**
 * Get streaming provider availability for a TMDB TV show in a given region.
 */
export async function getWatchProviders(
  tmdbId: number,
  region: string,
): Promise<StreamingAvailability | null> {
  try {
    const data = await tmdbFetch<TMDBWatchProvidersResponse>(
      `/tv/${tmdbId}/watch/providers`,
    );

    const regionData = data.results[region];
    if (!regionData) return null;

    return {
      region,
      link: regionData.link ?? null,
      flatrate: (regionData.flatrate ?? []).map((p) => ({
        provider_id: p.provider_id,
        provider_name: p.provider_name,
        logo_path: p.logo_path,
        display_priority: p.display_priority,
      })),
      rent: (regionData.rent ?? []).map((p) => ({
        provider_id: p.provider_id,
        provider_name: p.provider_name,
        logo_path: p.logo_path,
        display_priority: p.display_priority,
      })),
      buy: (regionData.buy ?? []).map((p) => ({
        provider_id: p.provider_id,
        provider_name: p.provider_name,
        logo_path: p.logo_path,
        display_priority: p.display_priority,
      })),
    };
  } catch {
    return null;
  }
}
