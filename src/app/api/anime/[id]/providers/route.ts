// GET /api/anime/[id]/providers?region=UZ
// Resolves TMDB ID from AniList title, then fetches streaming providers

import { NextRequest, NextResponse } from 'next/server';
import { getAnimeDetails } from '@/lib/anilist/client';
import { findTmdbId, getWatchProviders } from '@/lib/tmdb/client';
import { REGIONS, DEFAULT_REGION } from '@/lib/tmdb/queries';

const VALID_REGION_CODES = new Set(REGIONS.map((r) => r.code));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) {
    return NextResponse.json({ error: 'Invalid anime ID' }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const region = (searchParams.get('region') ?? DEFAULT_REGION).toUpperCase();

  if (!VALID_REGION_CODES.has(region)) {
    return NextResponse.json(
      { error: `Invalid region. Supported: ${[...VALID_REGION_CODES].join(', ')}` },
      { status: 400 },
    );
  }

  try {
    // 1. Get anime details to retrieve the title and year
    const anilistResponse = await getAnimeDetails(animeId);
    const media = anilistResponse.data.Media;

    const title =
      media.title.english ?? media.title.romaji ?? media.title.native ?? '';
    const year = media.seasonYear ?? media.startDate?.year ?? null;

    // 2. Resolve to TMDB ID
    const tmdbId = await findTmdbId(title, year);

    if (!tmdbId) {
      return NextResponse.json({
        region,
        tmdbId: null,
        availability: null,
        message: 'No TMDB match found for this anime',
      });
    }

    // 3. Get watch providers for the region
    const availability = await getWatchProviders(tmdbId, region);

    return NextResponse.json({ region, tmdbId, availability });
  } catch (err) {
    console.error(`[/api/anime/${id}/providers]`, err);
    return NextResponse.json(
      { error: 'Failed to fetch streaming providers' },
      { status: 500 },
    );
  }
}
