// AniList GraphQL query definitions

export const SEARCH_ANIME = `
  query SearchAnime($search: String!, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        averageScore
        genres
        episodes
        status
        season
        seasonYear
        format
      }
    }
  }
`;

export const GET_ANIME_DETAILS = `
  query GetAnimeDetails($id: Int!) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
        color
      }
      bannerImage
      description(asHtml: true)
      averageScore
      genres
      episodes
      status
      season
      seasonYear
      format
      duration
      popularity
      favourites
      countryOfOrigin
      isAdult
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      trailer {
        id
        site
        thumbnail
      }
      studios {
        nodes {
          id
          name
          isAnimationStudio
        }
      }
      externalLinks {
        id
        url
        site
        type
        icon
        color
      }
      tags {
        name
        description
        category
        rank
        isGeneralSpoiler
      }
    }
  }
`;

export const GET_TRENDING_ANIME = `
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: TRENDING_DESC, status_in: [RELEASING, FINISHED]) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
          color
        }
        bannerImage
        averageScore
        genres
        episodes
        status
        season
        seasonYear
        format
      }
    }
  }
`;
