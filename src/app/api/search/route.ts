// GET /api/search?q=<title>&page=<n>
// Returns normalized AnimeSearchResult[]

import { NextRequest, NextResponse } from 'next/server';
import { searchAnime } from '@/lib/anilist/client';
import type { AniListMedia } from '@/lib/anilist/types';
import type { AnimeSearchResult } from '@/types/anime';

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

  if (!query || query.length < 1) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 },
    );
  }

  try {
    const response = await searchAnime(query, page, 20);
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
