'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect, FormEvent, Suspense } from 'react';

function NavbarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        background: scrolled ? 'rgba(10, 10, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
      }}
    >
      <div
        className="container-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.4rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, var(--color-accent-bright) 0%, #c4b5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            flexShrink: 0,
          }}
        >
          AnimeUz
        </Link>

        {/* Search form */}
        <form
          onSubmit={handleSubmit}
          style={{ flex: 1, maxWidth: '480px', position: 'relative' }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
              fontSize: '1rem',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            ref={inputRef}
            id="navbar-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime..."
            autoComplete="off"
            style={{
              width: '100%',
              padding: '0.55rem 1rem 0.55rem 2.75rem',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: '9999px',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 200ms, box-shadow 200ms',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,109,240,0.15)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </form>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
          <Link
            href="/"
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              transition: 'color 200ms, background 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Home
          </Link>
          <Link
            href="/search"
            style={{
              padding: '0.4rem 0.875rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              transition: 'color 200ms, background 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text-primary)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Browse
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
