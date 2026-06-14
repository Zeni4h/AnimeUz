'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RegionSelector, useRegion } from '@/components/ui/RegionSelector';
import type { StreamingAvailability, StreamingProvider, ExternalLink } from '@/types/anime';
import { tmdbImageUrl } from '@/lib/tmdb/queries';

interface StreamingProvidersProps {
  animeId: number;
  externalLinks: ExternalLink[];
}

interface ProvidersResponse {
  region: string;
  tmdbId: number | null;
  availability: StreamingAvailability | null;
  message?: string;
}

const STREAMING_SITES = new Set([
  'Crunchyroll', 'Netflix', 'Funimation', 'HIDIVE', 'Amazon Prime Video',
  'HBO Max', 'Hulu', 'Disney+', 'Apple TV+', 'Bilibili', 'VRV',
  'Wakanim', 'AnimeLab', 'Animelab',
]);

function ProviderLogo({ provider }: { provider: StreamingProvider }) {
  const logoUrl = tmdbImageUrl(provider.logo_path, 'w92');
  return (
    <a
      href={`https://www.justwatch.com/`}
      target="_blank"
      rel="noopener noreferrer"
      title={provider.provider_name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-elevated)',
          position: 'relative',
          transition: 'transform 200ms, box-shadow 200ms',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1.08)';
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'scale(1)';
          el.style.boxShadow = 'none';
        }}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={provider.provider_name}
            fill
            sizes="52px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
            }}
          >
            📺
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: '0.68rem',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          maxWidth: '60px',
          lineHeight: 1.2,
        }}
      >
        {provider.provider_name}
      </span>
    </a>
  );
}

function ProviderSection({
  label,
  providers,
}: {
  label: string;
  providers: StreamingProvider[];
}) {
  if (providers.length === 0) return null;
  return (
    <div>
      <p
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: '0.75rem',
        }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
        {providers.map((p) => (
          <ProviderLogo key={p.provider_id} provider={p} />
        ))}
      </div>
    </div>
  );
}

export function StreamingProviders({ animeId, externalLinks }: StreamingProvidersProps) {
  const [region, setRegion] = useRegion();
  const [data, setData] = useState<ProvidersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/anime/${animeId}/providers?region=${region}`)
      .then((r) => r.json())
      .then((d: ProvidersResponse) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load streaming providers');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [animeId, region]);

  // AniList external streaming links (fallback)
  const streamingLinks = externalLinks.filter(
    (l) => STREAMING_SITES.has(l.site) || l.type === 'STREAMING',
  );

  const hasProviders =
    data?.availability &&
    (
      data.availability.flatrate.length > 0 ||
      data.availability.rent.length > 0 ||
      data.availability.buy.length > 0
    );

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
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
          <span>📡</span> Where to Watch
        </h2>
        <RegionSelector value={region} onChange={setRegion} size="sm" />
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem 1.75rem' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.875rem' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ width: '52px', height: '52px', borderRadius: '10px' }} />
              ))}
            </div>
          </div>
        )}

        {!loading && error && (
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{error}</p>
        )}

        {!loading && !error && hasProviders && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <ProviderSection
              label="Stream (Included)"
              providers={data!.availability!.flatrate}
            />
            <ProviderSection
              label="Rent"
              providers={data!.availability!.rent}
            />
            <ProviderSection
              label="Buy"
              providers={data!.availability!.buy}
            />

            {data?.availability?.link && (
              <a
                href={data.availability.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ alignSelf: 'flex-start', fontSize: '0.8rem' }}
              >
                View all on JustWatch ↗
              </a>
            )}
          </div>
        )}

        {/* No TMDB data — show AniList fallback links */}
        {!loading && !error && !hasProviders && (
          <div>
            {streamingLinks.length > 0 ? (
              <div>
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '0.8rem',
                    marginBottom: '1rem',
                  }}
                >
                  No provider data for this region. Known streaming links:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {streamingLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      style={{
                        fontSize: '0.8rem',
                        padding: '0.4rem 0.875rem',
                        ...(link.color ? { borderColor: link.color, color: link.color } : {}),
                      }}
                    >
                      {link.site} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>😔</span>
                No streaming information available for this region.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
