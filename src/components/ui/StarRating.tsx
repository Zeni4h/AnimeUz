interface StarRatingProps {
  score: number | null; // AniList 0–100 scale
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export function StarRating({ score, size = 'md', showNumber = true }: StarRatingProps) {
  if (score === null || score === undefined) {
    return (
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
        No rating
      </span>
    );
  }

  // Convert 0–100 → 0–10 → 0–5 stars
  const outOfTen = score / 10;
  const filled = Math.round(outOfTen / 2);
  const half = (outOfTen / 2) % 1 >= 0.4 && filled < 5 ? 1 : 0;
  const empty = 5 - filled - half;

  const scoreColor =
    score >= 75 ? 'var(--color-score-high)' :
    score >= 60 ? 'var(--color-score-mid)' :
                  'var(--color-score-low)';

  const starSize = size === 'sm' ? '0.75rem' : size === 'lg' ? '1.1rem' : '0.9rem';
  const numSize  = size === 'sm' ? '0.8rem'  : size === 'lg' ? '1.1rem' : '0.95rem';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
      }}
      aria-label={`Score: ${outOfTen.toFixed(1)} out of 10`}
    >
      <span style={{ display: 'flex', gap: '1px' }}>
        {Array.from({ length: filled }).map((_, i) => (
          <span key={`f-${i}`} style={{ color: '#facc15', fontSize: starSize }}>★</span>
        ))}
        {half === 1 && (
          <span style={{ color: '#facc15', fontSize: starSize }}>⯨</span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} style={{ color: 'var(--color-text-muted)', fontSize: starSize }}>☆</span>
        ))}
      </span>
      {showNumber && (
        <span
          style={{
            color: scoreColor,
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: numSize,
          }}
        >
          {outOfTen.toFixed(1)}
        </span>
      )}
    </span>
  );
}
