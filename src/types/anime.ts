// ─────────────────────────────────────────────────────────────────────────────
// Unified internal types — normalize AniList + TMDB into a single shape
// ─────────────────────────────────────────────────────────────────────────────

export interface AnimeSearchResult {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string | null;
  };
  coverImage: {
    large: string;
    medium: string;
    color: string | null;
  };
  bannerImage: string | null;
  averageScore: number | null; // 0–100
  genres: string[];
  episodes: number | null;
  status: AnimeStatus;
  season: AnimeSeason | null;
  seasonYear: number | null;
  format: AnimeFormat | null;
}

export interface AnimeDetails extends AnimeSearchResult {
  description: string | null; // HTML string from AniList
  trailer: AnimeTrailer | null;
  studios: Studio[];
  externalLinks: ExternalLink[];
  startDate: FuzzyDate | null;
  endDate: FuzzyDate | null;
  duration: number | null; // minutes per episode
  popularity: number | null;
  favourites: number | null;
  countryOfOrigin: string | null;
  isAdult: boolean;
  tags: Tag[];
}

export interface AnimeTrailer {
  id: string;    // YouTube video ID
  site: string;  // "youtube" | "dailymotion"
  thumbnail: string | null;
}

export interface Studio {
  id: number;
  name: string;
  isAnimationStudio: boolean;
}

export interface ExternalLink {
  id: number;
  url: string;
  site: string;
  type: string | null;
  icon: string | null;
  color: string | null;
}

export interface FuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface Tag {
  name: string;
  description: string | null;
  category: string | null;
  rank: number | null;
  isGeneralSpoiler: boolean;
}

// ─── Streaming ───────────────────────────────────────────────────────────────

export interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string; // relative path — prefix with TMDB image base URL
  display_priority: number;
}

export interface StreamingAvailability {
  region: string;
  link: string | null; // TMDB JustWatch deep-link
  flatrate: StreamingProvider[];
  rent: StreamingProvider[];
  buy: StreamingProvider[];
}

// ─── Region ──────────────────────────────────────────────────────────────────

export interface Region {
  code: string;
  label: string;
  flag: string; // emoji flag
}

// ─── Enums ───────────────────────────────────────────────────────────────────

export type AnimeStatus =
  | 'FINISHED'
  | 'RELEASING'
  | 'NOT_YET_RELEASED'
  | 'CANCELLED'
  | 'HIATUS';

export type AnimeSeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';

export type AnimeFormat =
  | 'TV'
  | 'TV_SHORT'
  | 'MOVIE'
  | 'SPECIAL'
  | 'OVA'
  | 'ONA'
  | 'MUSIC';
