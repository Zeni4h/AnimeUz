'use client';

export function CalendarSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: 5 }).map((_, dayIdx) => (
        <article
          key={dayIdx}
          className="animate-fade-up"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            overflow: 'hidden',
            animationDelay: `${dayIdx * 30}ms`,
          }}
        >
          {/* Day header skeleton */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                className="skeleton"
                style={{ width: '56px', height: '28px', borderRadius: '8px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <div className="skeleton" style={{ width: '120px', height: '20px' }} />
                <div className="skeleton" style={{ width: '80px', height: '16px' }} />
              </div>
            </div>
          </div>

          {/* Content skeleton */}
          <div style={{ padding: '0.5rem 1.25rem 1rem' }}>
            {Array.from({ length: 3 }).map((_, itemIdx) => (
              <div
                key={itemIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.875rem 0',
                }}
              >
                <div className="skeleton" style={{ width: '64px', height: '96px', borderRadius: '6px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ width: '70%', height: '18px', marginBottom: '0.5rem' }} />
                  <div className="skeleton" style={{ width: '40%', height: '14px' }} />
                </div>
                <div className="skeleton" style={{ width: '80px', height: '18px', textAlign: 'right' }} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}