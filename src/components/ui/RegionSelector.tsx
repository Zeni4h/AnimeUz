'use client';

import { useState } from 'react';
import { REGIONS, DEFAULT_REGION } from '@/lib/tmdb/queries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

const STORAGE_KEY = 'animeuz_region';

interface RegionSelectorProps {
  value?: string;
  onChange?: (region: string) => void;
  size?: 'sm' | 'md';
}

function readStored(): string {
  if (typeof window === 'undefined') return DEFAULT_REGION;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && REGIONS.some((r) => r.code === stored)) return stored;
  } catch {
    // ignore (private mode)
  }
  return DEFAULT_REGION;
}

export function useRegion(): [string, (r: string) => void] {
  const [region, setRegionState] = useState<string>(readStored);

  function setRegion(r: string) {
    setRegionState(r);
    try {
      localStorage.setItem(STORAGE_KEY, r);
    } catch {
      // ignore
    }
  }

  return [region, setRegion];
}

export function RegionSelector({ value, onChange, size = 'md' }: RegionSelectorProps) {
  const [internalRegion, setInternalRegion] = useRegion();
  const active = value ?? internalRegion;
  const handleChange = onChange ?? setInternalRegion;

  const current = REGIONS.find((r) => r.code === active) ?? REGIONS[0];

  return (
    <Select value={active} onValueChange={(v) => { if (v) handleChange(v); }}>
      <SelectTrigger
        id="region-selector-btn"
        size={size === 'sm' ? 'sm' : 'default'}
        aria-label="Select region"
      >
        <span aria-hidden>{current.flag}</span>
        <span>{current.code}</span>
      </SelectTrigger>
      <SelectContent align="end" aria-label="Select streaming region">
        {REGIONS.map((r) => (
          <SelectItem key={r.code} value={r.code}>
            <span aria-hidden>{r.flag}</span>
            <span>{r.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
