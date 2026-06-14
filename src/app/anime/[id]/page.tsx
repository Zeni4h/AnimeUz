import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAnimeDetails } from '@/lib/anilist/client';
import type { AnimeDetails } from '@/types/anime';
import type { AniListMedia } from '@/lib/anilist/types';
import { AnimeHero } from '@/components/anime/AnimeHero';
import { AnimeSynopsis } from '@/components/anime/AnimeSynopsis';
import { AnimeTrailer } from '@/components/anime/AnimeTrailer';
import { StreamingProviders } from '@/components/anime/StreamingProviders';
import { GenreBadge } from '@/components/ui/Badge';

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

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

export async function generateMetadata({ params }: AnimePageProps): Promise<Metadata> {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) return { title: 'Anime Not Found' };

  try {
    const res = await getAnimeDetails(animeId);
    const media = res.data.Media;
    const title = media.title.english ?? media.title.romaji;
    const plainDesc = media.description?.replace(/<[^>]*>/g, '').slice(0, 160) ?? '';

    return {
      title,
      description: plainDesc || `View details, streaming availability, trailer, and more for ${title}.`,
      openGraph: {
        title,
        description: plainDesc,
        images: media.bannerImage ? [{ url: media.bannerImage }] : [],
      },
    };
  } catch {
    return { title: 'Anime Details' };
  }
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;
  const animeId = parseInt(id, 10);

  if (isNaN(animeId)) notFound();

  let anime: AnimeDetails;

  try {
    const res = await getAnimeDetails(animeId);
    anime = normalizeDetails(res.data.Media);
  } catch {
    notFound();
  }

  const displayTags = anime.tags
    .filter((t) => !t.isGeneralSpoiler && (t.rank ?? 0) >= 60)
    .slice(0, 10);

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh' }}>
      {/* Hero */}
      <AnimeHero anime={anime} />

      {/* Content area */}
      <div className="container-page" style={{ padding: '2.5rem 1.5rem 4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(340px, 100%)',
            gap: '2rem',
            alignItems: 'start',
          }}
          className="anime-details-grid"
        >
          {/* Main column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
            <AnimeSynopsis description={anime.description} />
            <AnimeTrailer trailer={anime.trailer} title={anime.title.english ?? anime.title.romaji} />
            <StreamingProviders animeId={anime.id} externalLinks={anime.externalLinks} />
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Info card */}
            <div
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                  Information
                </h2>
              </div>
              <dl style={{ padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { label: 'Format', value: anime.format?.replace('_', ' ') },
                  { label: 'Episodes', value: anime.episodes },
                  { label: 'Duration', value: anime.duration ? `${anime.duration} min` : null },
                  { label: 'Status', value: anime.status },
                  { label: 'Season', value: anime.season ? `${anime.season} ${anime.seasonYear ?? ''}` : anime.seasonYear },
                  { label: 'Country', value: anime.countryOfOrigin },
                  { label: 'Favourites', value: anime.favourites?.toLocaleString() },
                ].map(({ label, value }) =>
                  value ? (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid var(--color-border)',
                        alignItems: 'flex-start',
                      }}
                    >
                      <dt style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-heading)', flexShrink: 0 }}>
                        {label}
                      </dt>
                      <dd style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', textAlign: 'right' }}>
                        {String(value)}
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </div>

            {/* Tags card */}
            {displayTags.length > 0 && (
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                    Tags
                  </h2>
                </div>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {displayTags.map((tag) => (
                    <span
                      key={tag.name}
                      title={tag.description ?? tag.name}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'var(--color-text-muted)',
                        border: '1px solid var(--color-border)',
                        fontFamily: 'var(--font-heading)',
                        cursor: 'default',
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* All genres */}
            {anime.genres.length > 0 && (
              <div
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                    Genres
                  </h2>
                </div>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {anime.genres.map((g) => (
                    <GenreBadge key={g} label={g} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .anime-details-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
