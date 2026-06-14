// Raw TMDB API response types

export interface TMDBSearchResult {
  id: number;
  name?: string;        // TV shows
  title?: string;       // Movies
  original_name?: string;
  first_air_date?: string;
  release_date?: string;
  media_type?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBSearchResult[];
  total_pages: number;
  total_results: number;
}

export interface TMDBWatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface TMDBWatchProviderRegion {
  link: string;
  flatrate?: TMDBWatchProvider[];
  rent?: TMDBWatchProvider[];
  buy?: TMDBWatchProvider[];
  free?: TMDBWatchProvider[];
  ads?: TMDBWatchProvider[];
}

export interface TMDBWatchProvidersResponse {
  id: number;
  results: Record<string, TMDBWatchProviderRegion>;
}

export interface TMDBFindResult {
  movie_results: TMDBSearchResult[];
  tv_results: TMDBSearchResult[];
}
