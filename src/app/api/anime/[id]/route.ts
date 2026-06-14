// GET /api/anime/[id]
// Returns normalized AnimeDetails

import { NextRequest, NextResponse } from 'next/server';
import { getAnimeDetails } from '@/lib/anilist/client';
import type { AniListMedia } from '@/lib/anilist/types';
import type { AnimeDetails } from '@/types/anime';

function normalizeDetails(media: AniListMedia): AnimeDetails {
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
    description: media.description,
    averageScore: media.averageScore,
    genres: media.genres,
    episodes: media.episodes,
    status: media.status as AnimeDetails['status'],
    season: media.season as AnimeDetails['season'],
    seasonYear: media.seasonYear,
    format: media.format as AnimeDetails['format'],
    duration: media.duration,
    popularity: media.popularity,
    favourites: media.favourites,
    countryOfOrigin: media.countryOfOrigin,
    isAdult: media.isAdult,
    startDate: media.startDate,
    endDate: media.endDate,
    trailer: media.trailer,
    studios: media.studios.nodes,
    externalLinks: media.externalLinks,
    tags: media.tags,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) {
    return NextResponse.json({ error: 'Invalid anime ID' }, { status: 400 });
  }

  try {
    const response = await getAnimeDetails(animeId);
    const details = normalizeDetails(response.data.Media);
    return NextResponse.json(details);
  } catch (err) {
    console.error(`[/api/anime/${id}]`, err);
    return NextResponse.json(
      { error: 'Failed to fetch anime details' },
      { status: 500 },
    );
  }
}
