'use client';

import { useEffect, useState } from 'react';
import { REGIONS, DEFAULT_REGION } from '@/lib/tmdb/queries';
import type { Region } from '@/types/anime';

const STORAGE_KEY = 'animeuz_region';

interface RegionSelectorProps {
  value?: string;
  onChange?: (region: string) => void;
  size?: 'sm' | 'md';
}

export function useRegion(): [string, (r: string) => void] {
  const [region, setRegionState] = useState<string>(DEFAULT_REGION);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && REGIONS.some((r) => r.code === stored)) {
      setRegionState(stored);
    }
  }, []);

  function setRegion(r: string) {
    setRegionState(r);
    localStorage.setItem(STORAGE_KEY, r);
  }

  return [region, setRegion];
}

export function RegionSelector({ value, onChange, size = 'md' }: RegionSelectorProps) {
  const [internalRegion, setInternalRegion] = useRegion();
  const active = value ?? internalRegion;
  const handleChange = onChange ?? setInternalRegion;

  const current = REGIONS.find((r) => r.code === active) ?? REGIONS[0];

  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        id="region-selector-btn"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: size === 'sm' ? '0.3rem 0.75rem' : '0.5rem 1rem',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 500,
          fontSize: size === 'sm' ? '0.8rem' : '0.875rem',
          cursor: 'pointer',
          transition: 'border-color 200ms, color 200ms',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-accent)';
          e.currentTarget.style.color = 'var(--color-text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }}
        aria-label="Select region"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.flag}</span>
        <span>{current.code}</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <ul
            role="listbox"
            aria-label="Select streaming region"
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              zIndex: 50,
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '0.35rem',
              minWidth: '180px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
              listStyle: 'none',
            }}
          >
            {REGIONS.map((r: Region) => (
              <li key={r.code}>
                <button
                  role="option"
                  aria-selected={r.code === active}
                  onClick={() => {
                    handleChange(r.code);
                    setOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '6px',
                    background: r.code === active ? 'rgba(124,109,240,0.15)' : 'transparent',
                    color: r.code === active ? 'var(--color-accent-bright)' : 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: r.code === active ? 600 : 400,
                    fontSize: '0.875rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 150ms, color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    if (r.code !== active) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (r.code !== active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{r.flag}</span>
                  <span>{r.label}</span>
                  {r.code === active && (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
