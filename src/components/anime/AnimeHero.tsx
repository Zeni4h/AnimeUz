import Image from 'next/image';
import type { AnimeDetails } from '@/types/anime';
import { StarRating } from '@/components/ui/StarRating';
import { GenreBadge, StatusBadge, FormatBadge } from '@/components/ui/Badge';

interface AnimeHeroProps {
  anime: AnimeDetails;
}

function formatDate(date: { year?: number | null; month?: number | null; day?: number | null } | null): string {
  if (!date?.year) return 'Unknown';
  if (!date.month) return String(date.year);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.month - 1]} ${date.day ? date.day + ', ' : ''}${date.year}`;
}

export function AnimeHero({ anime }: AnimeHeroProps) {
  const title = anime.title.english ?? anime.title.romaji;
  const studio = anime.studios.find((s) => s.isAnimationStudio)?.name;
  const accentColor = anime.coverImage.color ?? '#7c6df0';

  return (
    <section style={{ position: 'relative' }}>
      {/* Banner */}
      <div
        style={{
          position: 'relative',
          height: '420px',
          overflow: 'hidden',
          background: 'var(--color-bg-elevated)',
        }}
      >
        {anime.bannerImage ? (
          <Image
            src={anime.bannerImage}
            alt={`${title} banner`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${accentColor}33 0%, var(--color-bg-elevated) 100%)`,
            }}
          />
        )}
        {/* Multi-layer gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 100%),
              linear-gradient(to right, rgba(10,10,15,0.9) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Content overlapping the banner */}
      <div
        className="container-page"
        style={{
          position: 'relative',
          marginTop: '-120px',
          paddingBottom: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          {/* Cover image */}
          <div
            style={{
              position: 'relative',
              width: '190px',
              aspectRatio: '2/3',
              flexShrink: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: `0 20px 60px rgba(0,0,0,0.7), 0 0 0 2px ${accentColor}55`,
            }}
          >
            <Image
              src={anime.coverImage.large}
              alt={`${title} cover`}
              fill
              priority
              sizes="190px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Info column */}
          <div style={{ flex: 1, minWidth: 0, paddingBottom: '0.5rem' }}>
            {/* Native title */}
            {anime.title.native && (
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.875rem',
                  marginBottom: '0.35rem',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {anime.title.native}
              </p>
            )}

            {/* Main title */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4vw, 2.75rem)',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {title}
            </h1>

            {/* Romaji subtitle */}
            {anime.title.english && anime.title.romaji && (
              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '1rem',
                  marginBottom: '0.75rem',
                  fontStyle: 'italic',
                }}
              >
                {anime.title.romaji}
              </p>
            )}

            {/* Score + meta row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <StarRating score={anime.averageScore} size="lg" />

              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                <StatusBadge status={anime.status} />
                <FormatBadge format={anime.format} />
                {anime.seasonYear && (
                  <span className="badge badge-format">{anime.seasonYear}</span>
                )}
              </div>
            </div>

            {/* Genres */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
              {anime.genres.map((g) => (
                <GenreBadge key={g} label={g} />
              ))}
            </div>

            {/* Quick stats row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.5rem',
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
              }}
            >
              {anime.episodes && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Episodes</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{anime.episodes}</span>
                </div>
              )}
              {anime.duration && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Duration</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{anime.duration} min</span>
                </div>
              )}
              {studio && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Studio</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{studio}</span>
                </div>
              )}
              {anime.startDate && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aired</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{formatDate(anime.startDate)}</span>
                </div>
              )}
              {anime.popularity && (
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popularity</span>
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>#{anime.popularity.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
