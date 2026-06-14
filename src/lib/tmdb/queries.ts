// TMDB regions and API constants

import type { Region } from '@/types/anime';

export const TMDB_API_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

/** Supported streaming regions */
export const REGIONS: Region[] = [
  { code: 'UZ', label: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', label: 'Germany', flag: '🇩🇪' },
  { code: 'JP', label: 'Japan', flag: '🇯🇵' },
  { code: 'RU', label: 'Russia', flag: '🇷🇺' },
  { code: 'HU', label: 'Hungary', flag: '🇭🇺' },
];

export const DEFAULT_REGION = 'UZ';

/** Build a full TMDB image URL */
export function tmdbImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w185',
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
