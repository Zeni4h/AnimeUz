// GET /api/search?q=<title>&page=<n>&genre=<genre>&studio=<studio>&year=<year>&season=<season>&format=<format>&status=<status>&sort=<sort>
// Returns normalized AnimeSearchResult[]

import { NextRequest, NextResponse } from 'next/server';
import { searchAnime } from '@/lib/anilist/client';
import type { AniListMedia } from '@/lib/anilist/types';
import type { AnimeSearchResult, SearchFilters } from '@/types/anime';

function normalizeMedia(media: AniListMedia): AnimeSearchResult {
  return {
    id: media.id,
    title: {
      romaji: media.title.romaji,
      english: media.title.english,
      native: media.title.native,
    },
    coverImage: {
      large: media.coverImage.large,
      medium: media.coverImage.medium,
      color: media.coverImage.color,
    },
    bannerImage: media.bannerImage,
    averageScore: media.averageScore,
    genres: media.genres,
    episodes: media.episodes,
    status: media.status as AnimeSearchResult['status'],
    season: media.season as AnimeSearchResult['season'],
    seasonYear: media.seasonYear,
    format: media.format as AnimeSearchResult['format'],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();
  const page = parseInt(searchParams.get('page') ?? '1', 10);

  const filters: SearchFilters = {};
  if (searchParams.get('genre')) filters.genre = searchParams.get('genre')!;
  if (searchParams.get('studio')) filters.studio = searchParams.get('studio')!;
  if (searchParams.get('year')) filters.year = parseInt(searchParams.get('year')!, 10);
  if (searchParams.get('season')) filters.season = searchParams.get('season') as SearchFilters['season'];
  if (searchParams.get('format')) filters.format = searchParams.get('format') as SearchFilters['format'];
  if (searchParams.get('status')) filters.status = searchParams.get('status') as SearchFilters['status'];
  if (searchParams.get('sort')) filters.sort = searchParams.get('sort') as SearchFilters['sort'];

  if (!query || query.length < 1) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 },
    );
  }

  try {
    const response = await searchAnime(query, page, 20, filters);
    const results = response.data.Page.media.map(normalizeMedia);
    const pageInfo = response.data.Page.pageInfo;

    return NextResponse.json({ results, pageInfo });
  } catch (err) {
    console.error('[/api/search]', err);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 },
    );
  }
}
