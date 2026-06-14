import Image from 'next/image';
import Link from 'next/link';
import type { AnimeSearchResult } from '@/types/anime';
import { StarRating } from '@/components/ui/StarRating';
import { GenreBadge, StatusBadge, FormatBadge } from '@/components/ui/Badge';

interface AnimeCardProps {
  anime: AnimeSearchResult;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const title = anime.title.english ?? anime.title.romaji;
  const topGenres = anime.genres.slice(0, 2);

  const accentColor = anime.coverImage.color ?? '#7c6df0';

  return (
    <Link href={`/anime/${anime.id}`} style={{ display: 'block' }}>
      <article
        className="card"
        style={{ overflow: 'hidden', cursor: 'pointer', height: '100%' }}
      >
        {/* Cover image */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '2/3',
            overflow: 'hidden',
            background: 'var(--color-bg-elevated)',
          }}
        >
          {anime.coverImage.large ? (
            <Image
              src={anime.coverImage.large}
              alt={`${title} cover`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              style={{ objectFit: 'cover', transition: 'transform 400ms ease' }}
              className="anime-card-img"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text-muted)',
                fontSize: '2rem',
              }}
            >
              🎬
            </div>
          )}

          {/* Score overlay */}
          {anime.averageScore && (
            <div
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
                borderRadius: '6px',
                padding: '0.2rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span style={{ color: '#facc15', fontSize: '0.75rem' }}>★</span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  color:
                    anime.averageScore >= 75 ? 'var(--color-score-high)' :
                    anime.averageScore >= 60 ? 'var(--color-score-mid)' :
                    'var(--color-score-low)',
                }}
              >
                {(anime.averageScore / 10).toFixed(1)}
              </span>
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Format badge inside image */}
          {anime.format && (
            <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem' }}>
              <FormatBadge format={anime.format} />
            </div>
          )}
        </div>

        {/* Card body */}
        <div
          style={{
            padding: '0.875rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            borderTop: `2px solid ${accentColor}22`,
          }}
        >
          <h3
            className="line-clamp-2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.925rem',
              color: 'var(--color-text-primary)',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>

          {anime.title.romaji && anime.title.english && (
            <p
              className="line-clamp-1"
              style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
            >
              {anime.title.romaji}
            </p>
          )}

          {/* Genres */}
          {topGenres.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.15rem' }}>
              {topGenres.map((g) => (
                <GenreBadge key={g} label={g} />
              ))}
            </div>
          )}

          {/* Footer row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.25rem',
            }}
          >
            <StatusBadge status={anime.status} />
            {anime.episodes && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {anime.episodes} ep
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
