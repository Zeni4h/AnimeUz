'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/Badge';
import type { AnimeSeason, AnimeFormat, AnimeStatus, SearchSort } from '@/types/anime';

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural',
  'Thriller', 'Mecha', 'Music', 'Ecchi', 'Harem', 'Isekai',
];

const STUDIOS = [
  'MAPPA', 'Ufotable', 'Wit Studio', 'Kyoto Animation', 'Bones',
  'Production I.G', 'Madhouse', 'Sunrise', 'A-1 Pictures', 'CloverWorks',
  'J.C.Staff', 'Studio Trigger', 'P.A. Works', 'White Fox', 'David Production',
  'Lerche', 'Troyca', 'Orange', 'Science SARU', 'Studio Bind',
];

const YEARS = Array.from({ length: 2025 - 1970 + 1 }, (_, i) => 2025 - i);

const SEASONS: { value: AnimeSeason; label: string }[] = [
  { value: 'WINTER', label: 'Winter' },
  { value: 'SPRING', label: 'Spring' },
  { value: 'SUMMER', label: 'Summer' },
  { value: 'FALL', label: 'Fall' },
];

const FORMATS: { value: AnimeFormat; label: string }[] = [
  { value: 'TV', label: 'TV' },
  { value: 'TV_SHORT', label: 'TV Short' },
  { value: 'MOVIE', label: 'Movie' },
  { value: 'SPECIAL', label: 'Special' },
  { value: 'OVA', label: 'OVA' },
  { value: 'ONA', label: 'ONA' },
  { value: 'MUSIC', label: 'Music' },
];

const STATUSES: { value: AnimeStatus; label: string }[] = [
  { value: 'RELEASING', label: 'Airing' },
  { value: 'FINISHED', label: 'Finished' },
  { value: 'NOT_YET_RELEASED', label: 'Upcoming' },
  { value: 'HIATUS', label: 'Hiatus' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const SORTS: { value: SearchSort; label: string }[] = [
  { value: 'SEARCH_MATCH', label: 'Best Match' },
  { value: 'POPULARITY_DESC', label: 'Popularity' },
  { value: 'TRENDING_DESC', label: 'Trending' },
  { value: 'SCORE_DESC', label: 'Score' },
  { value: 'START_DATE_DESC', label: 'Newest' },
  { value: 'UPDATED_AT_DESC', label: 'Recently Updated' },
];

interface FilterBarProps {
  initialQuery: string;
}

const selectWidths = {
  genre: 'w-[170px]',
  studio: 'w-[170px]',
  year: 'w-[110px]',
  season: 'w-[130px]',
  format: 'w-[140px]',
  status: 'w-[130px]',
  sort: 'w-[170px]',
} as const;

export function FilterBar({ initialQuery }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getFilters = useCallback(() => {
    const filters: Record<string, string> = {};
    if (searchParams.get('genre')) filters.genre = searchParams.get('genre')!;
    if (searchParams.get('studio')) filters.studio = searchParams.get('studio')!;
    if (searchParams.get('year')) filters.year = searchParams.get('year')!;
    if (searchParams.get('season')) filters.season = searchParams.get('season')!;
    if (searchParams.get('format')) filters.format = searchParams.get('format')!;
    if (searchParams.get('status')) filters.status = searchParams.get('status')!;
    if (searchParams.get('sort')) filters.sort = searchParams.get('sort')!;
    return filters;
  }, [searchParams]);

  const updateFilter = useCallback(
    (key: string, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('q', initialQuery);
      params.set('page', '1');
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams, initialQuery],
  );

  const clearAll = useCallback(() => {
    router.push(`/search?q=${encodeURIComponent(initialQuery)}`);
  }, [router, initialQuery]);

  const filters = getFilters();
  const activeCount = Object.keys(filters).length;

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '1rem 0',
      }}
    >
      <div className="container-page">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {activeCount > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {Object.entries(filters).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => updateFilter(key, undefined)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                  }}
                >
                  <Badge
                    label={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    variant="genre"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  />
                </button>
              ))}
              <button
                onClick={clearAll}
                style={{
                  padding: '0.25rem 0.625rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  transition: 'color 200ms, border-color 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent-bright)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                Clear all
              </button>
            </div>
          )}

          <Select
            value={filters.genre ?? ''}
            onValueChange={(v) => updateFilter('genre', v || undefined)}
          >
            <SelectTrigger className={selectWidths.genre}>
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.studio ?? ''}
            onValueChange={(v) => updateFilter('studio', v || undefined)}
          >
            <SelectTrigger className={selectWidths.studio}>
              <SelectValue placeholder="Studio" />
            </SelectTrigger>
            <SelectContent>
              {STUDIOS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.year ? String(filters.year) : ''}
            onValueChange={(v) => updateFilter('year', v ? parseInt(v, 10) : undefined)}
          >
            <SelectTrigger className={selectWidths.year}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.season ?? ''}
            onValueChange={(v) => updateFilter('season', v || undefined)}
          >
            <SelectTrigger className={selectWidths.season}>
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              {SEASONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.format ?? ''}
            onValueChange={(v) => updateFilter('format', v || undefined)}
          >
            <SelectTrigger className={selectWidths.format}>
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              {FORMATS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status ?? ''}
            onValueChange={(v) => updateFilter('status', v || undefined)}
          >
            <SelectTrigger className={selectWidths.status}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.sort ?? ''}
            onValueChange={(v) => updateFilter('sort', v || undefined)}
          >
            <SelectTrigger className={selectWidths.sort}>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}