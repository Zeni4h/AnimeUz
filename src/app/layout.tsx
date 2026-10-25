import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'AnimeUz — Discover Anime',
    template: '%s | AnimeUz',
  },
  description:
    'Discover anime, find where to watch, view trailers, ratings, genres, and streaming availability across multiple regions.',
  keywords: ['anime', 'streaming', 'watch anime', 'anime database', 'anime search'],
  openGraph: {
    siteName: 'AnimeUz',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <TooltipProvider>
          <Navbar />
          <main>{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
