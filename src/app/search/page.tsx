import type { Metadata } from 'next';
import { Suspense } from 'react';
import { searchAnime } from '@/lib/anilist/client';
import { AnimeCard } from '@/components/search/AnimeCard';
import { SearchBar } from '@/components/search/SearchBar';
import { AnimeCardSkeleton } from '@/components/ui/Skeleton';
import type { AnimeSearchResult } from '@/types/anime';
import type { AniListMedia } from '@/lib/anilist/types';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" — Search Results` : 'Browse Anime',
    description: q
      ? `Search results for "${q}" on AnimeUz`
      : 'Browse and search anime on AnimeUz',
  };
}

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

async function SearchResults({ query, page }: { query: string; page: number }) {
  if (!query) return null;

  let results: AnimeSearchResult[] = [];
  let total = 0;
  let error = false;

  try {
    const res = await searchAnime(query, page, 24);
    results = res.data.Page.media.map(normalizeMedia);
    total = res.data.Page.pageInfo.total;
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</p>
        <p>Failed to fetch results. Please try again.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔍</p>
        <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
          No results for &ldquo;{query}&rdquo;
        </p>
        <p>Try a different spelling or search in Japanese.</p>
      </div>
    );
  }

  return (
    <>
      {/* Result count */}
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
          marginBottom: '1.25rem',
        }}
      >
        About {total.toLocaleString()} results for{' '}
        <strong style={{ color: 'var(--color-text-secondary)' }}>&ldquo;{query}&rdquo;</strong>
      </p>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '1rem',
        }}
      >
        {results.map((anime, i) => (
          <div
            key={anime.id}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 25}ms` }}
          >
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </>
  );
}

function SearchSkeletonGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '1rem',
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', page: pageStr = '1' } = await searchParams;
  const page = Math.max(1, parseInt(pageStr, 10) || 1);

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      {/* Search header */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-surface)',
          padding: '2rem 0',
        }}
      >
        <div className="container-page">
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.75rem',
              marginBottom: '1.25rem',
              color: 'var(--color-text-primary)',
            }}
          >
            {q ? (
              <>
                Results for{' '}
                <span style={{ color: 'var(--color-accent-bright)' }}>&ldquo;{q}&rdquo;</span>
              </>
            ) : (
              'Browse Anime'
            )}
          </h1>
          <SearchBar initialQuery={q} size="lg" />
        </div>
      </div>

      {/* Results */}
      <div className="container-page" style={{ padding: '2rem 1.5rem' }}>
        {q ? (
          <Suspense fallback={<SearchSkeletonGrid />}>
            <SearchResults query={q} page={page} />
          </Suspense>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: 'var(--color-text-muted)',
            }}
          >
            <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🎌</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
              Start searching to discover anime
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
