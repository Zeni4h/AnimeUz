'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import type { AiringScheduleItem } from '@/types/anime';

interface CalendarDayProps {
  dateKey: string;
  dayName: string;
  airings: AiringScheduleItem[];
  isExpanded: boolean;
  onToggle: () => void;
  formatTime: (ts: number) => string;
  index: number;
}

export function CalendarDay({
  dateKey,
  dayName,
  airings,
  isExpanded,
  onToggle,
  formatTime,
  index,
}: CalendarDayProps) {
  const sortedAirings = [...airings].sort((a, b) => a.airingAt - b.airingAt);

  return (
    <article
      className="animate-fade-up"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
        animationDelay: `${index * 30}ms`,
      }}
    >
      {/* Day header */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '1rem 1.25rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              minWidth: '56px',
              padding: '0.375rem 0.75rem',
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent-bright)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.85rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            {(() => {
              const d = new Date(`${dateKey}T00:00:00`);
              return d.getDate();
            })()}
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--color-text-primary)',
              }}
            >
              {dayName}
            </span>
            <span
              style={{
                marginLeft: '0.75rem',
                padding: '0.125rem 0.5rem',
                background: 'var(--color-bg-elevated)',
                color: 'var(--color-text-secondary)',
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                borderRadius: '9999px',
                border: '1px solid var(--color-border)',
              }}
            >
              {airings.length} episode{airings.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <ChevronDown
          size={18}
          style={{
            color: 'var(--color-text-muted)',
            transition: 'transform 200ms',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Expandable content */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: isExpanded ? '2000px' : '0',
          transition: 'max-height 300ms ease',
        }}
      >
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-bg-surface)',
          }}
        >
          {sortedAirings.map((airing, i) => {
              const media = airing.media;
              const title = media.title.english ?? media.title.romaji;

              return (
                <Link
                  key={airing.id}
                  href={`/anime/${media.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.875rem 1.25rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    borderBottom: i < sortedAirings.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 150ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-bg-elevated)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Cover */}
                  <div
                    style={{
                      position: 'relative',
                      width: '64px',
                      height: '96px',
                      flexShrink: 0,
                      borderRadius: '6px',
                      overflow: 'hidden',
                      background: 'var(--color-bg-elevated)',
                    }}
                  >
                    {media.coverImage.medium ? (
                      <Image
                        src={media.coverImage.medium}
                        alt={`${title} cover`}
                        fill
                        sizes="64px"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.3,
                        marginBottom: '0.25rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      <span>
                        Episode {airing.episode}
                        {media.episodes && ` / ${media.episodes}`}
                      </span>
                      <span aria-hidden="true">•</span>
                      <span>{formatTime(airing.airingAt)} UTC</span>
                    </div>
                  </div>

                  {/* Time until airing */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: '0.25rem',
                      minWidth: '100px',
                      textAlign: 'right',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color:
                          airing.timeUntilAiring < 3600
                            ? 'var(--color-score-high)'
                            : airing.timeUntilAiring < 86400
                            ? 'var(--color-accent-bright)'
                            : 'var(--color-text-secondary)',
                      }}
                    >
                      {(() => {
                        const secs = airing.timeUntilAiring;
                        if (secs < 60) return `${secs}s`;
                        const mins = Math.floor(secs / 60);
                        if (mins < 60) return `${mins}m`;
                        const hours = Math.floor(mins / 60);
                        if (hours < 24) return `${hours}h ${mins % 60}m`;
                        const days = Math.floor(hours / 24);
                        return `${days}d ${hours % 24}h`;
                      })()}
                    </span>
                    {media.averageScore && (
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          color:
                            media.averageScore >= 75
                              ? 'var(--color-score-high)'
                              : media.averageScore >= 60
                              ? 'var(--color-score-mid)'
                              : 'var(--color-score-low)',
                        }}
                      >
                        {(media.averageScore / 10).toFixed(1)}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </article>
  );
}