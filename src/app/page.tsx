import type { Metadata } from 'next';
import Link from 'next/link';
import { getTrendingAnime } from '@/lib/anilist/client';
import { AnimeCard } from '@/components/search/AnimeCard';
import { SearchBar } from '@/components/search/SearchBar';
import type { AnimeSearchResult } from '@/types/anime';
import type { AniListMedia } from '@/lib/anilist/types';

export const metadata: Metadata = {
  title: 'AnimeUz — Discover Anime',
  description:
    'Discover trending anime, find where to watch, view trailers and streaming availability across multiple regions.',
};

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

export default async function HomePage() {
  let trending: AnimeSearchResult[] = [];

  try {
    const res = await getTrendingAnime(1, 18);
    trending = res.data.Page.media.map(normalizeMedia);
  } catch {
    // Silent fail — show empty state
  }

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background blobs */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(124,109,240,0.12) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '-15%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(196,181,253,0.07) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </div>

        <div className="container-page" style={{ position: 'relative', textAlign: 'center' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(124,109,240,0.12)',
              border: '1px solid rgba(124,109,240,0.3)',
              borderRadius: '9999px',
              padding: '0.3rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-accent-bright)',
            }}
          >
            <span>✨</span> Anime Discovery Platform
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}
          >
            Find Your Next{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-bright) 0%, #c4b5fd 50%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Favourite Anime
            </span>
          </h1>

          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: '1.1rem',
              maxWidth: '560px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Search thousands of anime titles. Find where to stream, view trailers,
            ratings, and genres — all in one place.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: '580px', margin: '0 auto' }}>
            <SearchBar placeholder="Search for an anime... e.g. Attack on Titan" size="lg" autoFocus />
          </div>

          {/* Quick links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Popular:</span>
            {['Naruto', 'Attack on Titan', 'One Piece', 'Demon Slayer', 'Jujutsu Kaisen'].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="tag-popular"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Section ─────────────────────────────────────────── */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container-page">
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '1.4rem',
                    background: 'var(--color-accent)',
                    borderRadius: '2px',
                    boxShadow: '0 0 12px var(--color-accent-glow)',
                  }}
                />
                Trending Now
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                Most popular anime this season
              </p>
            </div>
            <Link href="/search" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
              Browse All →
            </Link>
          </div>

          {/* Grid */}
          {trending.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '1rem',
              }}
            >
              {trending.map((anime, i) => (
                <div
                  key={anime.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📡</p>
              <p>Could not load trending anime. Check your connection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
