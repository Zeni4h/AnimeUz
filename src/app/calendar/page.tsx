import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAiringSchedule } from '@/lib/anilist/client';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { CalendarSkeleton } from '@/components/calendar/CalendarSkeleton';
import type { AiringScheduleItem } from '@/types/anime';
import type { AniListAiringSchedule } from '@/lib/anilist/types';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Release Calendar — AnimeUz',
    description: 'Upcoming anime episode release schedule by day',
  };
}

function normalizeAiring(airing: AniListAiringSchedule): AiringScheduleItem {
  return {
    id: airing.id,
    episode: airing.episode,
    airingAt: airing.airingAt,
    timeUntilAiring: airing.timeUntilAiring,
    media: {
      id: airing.media.id,
      title: {
        romaji: airing.media.title.romaji,
        english: airing.media.title.english,
        native: airing.media.title.native,
      },
      coverImage: {
        large: airing.media.coverImage.large,
        medium: airing.media.coverImage.medium,
        color: airing.media.coverImage.color,
      },
      bannerImage: null,
      format: airing.media.format as AiringScheduleItem['media']['format'],
      status: airing.media.status as AiringScheduleItem['media']['status'],
      season: airing.media.season as AiringScheduleItem['media']['season'],
      seasonYear: airing.media.seasonYear,
      genres: airing.media.genres,
      episodes: airing.media.episodes,
      averageScore: airing.media.averageScore,
    },
  };
}

async function CalendarResults() {
  let results: AiringScheduleItem[] = [];
  let error = false;

  try {
    const res = await getAiringSchedule(1, 100);
    results = res.data.Page.airingSchedules.map(normalizeAiring);
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
        <p>Failed to load calendar. Please try again.</p>
      </div>
    );
  }

  return <CalendarGrid airings={results} />;
}

export default async function CalendarPage() {
  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      {/* Header */}
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
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Release Calendar
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Upcoming episode air dates — grouped by day
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="container-page" style={{ padding: '2rem 1.5rem' }}>
        <Suspense fallback={<CalendarSkeleton />}>
          <CalendarResults />
        </Suspense>
      </div>
    </div>
  );
}