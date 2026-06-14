'use client';

import { useState } from 'react';
import type { AnimeTrailer as TrailerType } from '@/types/anime';

interface AnimeTrailerProps {
  trailer: TrailerType | null;
  title: string;
}

export function AnimeTrailer({ trailer, title }: AnimeTrailerProps) {
  const [playing, setPlaying] = useState(false);

  if (!trailer || trailer.site !== 'youtube') {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${trailer.id}?autoplay=1&rel=0&modestbranding=1`;
  const thumbUrl = trailer.thumbnail ?? `https://img.youtube.com/vi/${trailer.id}/maxresdefault.jpg`;

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        style={{
          padding: '1.25rem 1.75rem 1rem',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🎬</span> Trailer
        </h2>
      </div>

      {/* Video area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          background: '#000',
        }}
      >
        {playing ? (
          <iframe
            src={embedUrl}
            title={`${title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        ) : (
          <button
            id="trailer-play-btn"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title} trailer`}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: 'transparent',
              display: 'block',
            }}
          >
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={`${title} trailer thumbnail`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                // Fallback to HQ thumbnail
                e.currentTarget.src = `https://img.youtube.com/vi/${trailer.id}/hqdefault.jpg`;
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.35)',
                transition: 'background 200ms',
              }}
            />

            {/* Play button */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '72px',
                height: '72px',
                background: 'rgba(124, 109, 240, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 0 0 var(--color-accent-glow)',
                transition: 'transform 200ms, box-shadow 200ms, background 200ms',
              }}
              className="glow-pulse"
            >
              <span style={{ fontSize: '1.75rem', marginLeft: '4px' }}>▶</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
