// Raw AniList GraphQL response types — mirrors the AniList API shape exactly

export interface AniListPageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface AniListTitle {
  romaji: string;
  english: string | null;
  native: string | null;
}

export interface AniListCoverImage {
  large: string;
  medium: string;
  color: string | null;
}

export interface AniListFuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface AniListTrailer {
  id: string;
  site: string;
  thumbnail: string | null;
}

export interface AniListStudio {
  id: number;
  name: string;
  isAnimationStudio: boolean;
}

export interface AniListStudios {
  nodes: AniListStudio[];
}

export interface AniListExternalLink {
  id: number;
  url: string;
  site: string;
  type: string | null;
  icon: string | null;
  color: string | null;
}

export interface AniListTag {
  name: string;
  description: string | null;
  category: string | null;
  rank: number | null;
  isGeneralSpoiler: boolean;
}

export interface AniListMedia {
  id: number;
  title: AniListTitle;
  coverImage: AniListCoverImage;
  bannerImage: string | null;
  description: string | null;
  averageScore: number | null;
  genres: string[];
  episodes: number | null;
  status: string;
  season: string | null;
  seasonYear: number | null;
  format: string | null;
  trailer: AniListTrailer | null;
  studios: AniListStudios;
  externalLinks: AniListExternalLink[];
  startDate: AniListFuzzyDate | null;
  endDate: AniListFuzzyDate | null;
  duration: number | null;
  popularity: number | null;
  favourites: number | null;
  countryOfOrigin: string | null;
  isAdult: boolean;
  tags: AniListTag[];
}

export interface AniListSearchResponse {
  data: {
    Page: {
      pageInfo: AniListPageInfo;
      media: AniListMedia[];
    };
  };
}

export interface AniListDetailsResponse {
  data: {
    Media: AniListMedia;
  };
}

export interface AniListTrendingResponse {
  data: {
    Page: {
      media: AniListMedia[];
    };
  };
}
