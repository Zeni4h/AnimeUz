import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co', // AniList cover images
      },
      {
        protocol: 'https',
        hostname: 'img.anilist.co', // AniList banner images
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // TMDB provider logos
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // YouTube thumbnails
      },
    ],
  },
};

export default nextConfig;
