import type { AnimeStatus, AnimeFormat } from '@/types/anime';

interface BadgeProps {
  label: string;
  variant?: 'genre' | 'status' | 'format' | 'custom';
  status?: AnimeStatus;
  style?: React.CSSProperties;
}

const STATUS_CLASS: Record<AnimeStatus, string> = {
  RELEASING:       'badge badge-status-releasing',
  FINISHED:        'badge badge-status-finished',
  NOT_YET_RELEASED:'badge badge-status-upcoming',
  CANCELLED:       'badge badge-status-hiatus',
  HIATUS:          'badge badge-status-hiatus',
};

const STATUS_LABEL: Record<AnimeStatus, string> = {
  RELEASING:       'Airing',
  FINISHED:        'Finished',
  NOT_YET_RELEASED:'Upcoming',
  CANCELLED:       'Cancelled',
  HIATUS:          'Hiatus',
};

const FORMAT_LABEL: Record<string, string> = {
  TV:       'TV',
  TV_SHORT: 'TV Short',
  MOVIE:    'Movie',
  SPECIAL:  'Special',
  OVA:      'OVA',
  ONA:      'ONA',
  MUSIC:    'Music',
};

export function GenreBadge({ label }: { label: string }) {
  return <span className="badge badge-genre">{label}</span>;
}

export function StatusBadge({ status }: { status: AnimeStatus }) {
  return (
    <span className={STATUS_CLASS[status] ?? 'badge badge-format'}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export function FormatBadge({ format }: { format: AnimeFormat | string | null }) {
  if (!format) return null;
  return (
    <span className="badge badge-format">
      {FORMAT_LABEL[format] ?? format}
    </span>
  );
}

export function Badge({ label, variant = 'genre', style }: BadgeProps) {
  const cls =
    variant === 'genre'  ? 'badge badge-genre' :
    variant === 'format' ? 'badge badge-format' :
    'badge badge-genre';

  return <span className={cls} style={style}>{label}</span>;
}
