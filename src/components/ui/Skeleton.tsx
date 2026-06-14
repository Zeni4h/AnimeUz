interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = '1rem', borderRadius = '6px', style }: SkeletonProps) {
  return (
    <span
      className="skeleton"
      style={{ display: 'block', width, height, borderRadius, ...style }}
      aria-hidden
    />
  );
}

export function AnimeCardSkeleton() {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Cover image */}
      <Skeleton height="280px" borderRadius="12px 12px 0 0" />
      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Skeleton height="1.1rem" width="80%" />
        <Skeleton height="0.9rem" width="55%" />
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
          <Skeleton height="1.4rem" width="4rem" borderRadius="6px" />
          <Skeleton height="1.4rem" width="4rem" borderRadius="6px" />
        </div>
      </div>
    </div>
  );
}

export function AnimeDetailsSkeleton() {
  return (
    <div>
      {/* Banner */}
      <Skeleton height="420px" borderRadius="0" />
      <div className="container-page" style={{ marginTop: '-80px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Skeleton width="200px" height="300px" borderRadius="12px" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '5rem' }}>
            <Skeleton height="2.5rem" width="70%" />
            <Skeleton height="1rem" width="40%" />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1,2,3].map(i => <Skeleton key={i} height="1.5rem" width="5rem" borderRadius="6px" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
