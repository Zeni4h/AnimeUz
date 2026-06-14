'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, FormEvent } from 'react';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  size?: 'sm' | 'lg';
  autoFocus?: boolean;
}

export function SearchBar({
  initialQuery = '',
  placeholder = 'Search for an anime...',
  size = 'lg',
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const isLg = size === 'lg';

  return (
    <form
      onSubmit={handleSubmit}
      id="anime-search-form"
      style={{ display: 'flex', gap: '0.75rem', width: '100%' }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: isLg ? '1.1rem' : '0.875rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: isLg ? '1.2rem' : '1rem',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        <input
          ref={inputRef}
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          style={{
            width: '100%',
            padding: isLg
              ? '0.9rem 1rem 0.9rem 3rem'
              : '0.6rem 0.875rem 0.6rem 2.5rem',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: isLg ? '12px' : '8px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: isLg ? '1.05rem' : '0.9rem',
            outline: 'none',
            transition: 'border-color 200ms, box-shadow 200ms',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,109,240,0.2)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>
      <button
        type="submit"
        className="btn-primary"
        id="search-submit-btn"
        style={{
          padding: isLg ? '0.9rem 1.75rem' : '0.6rem 1.25rem',
          fontSize: isLg ? '1rem' : '0.875rem',
          flexShrink: 0,
        }}
      >
        Search
      </button>
    </form>
  );
}
