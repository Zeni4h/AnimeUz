'use client';

import { useState, useMemo } from 'react';
import { CalendarDay } from './CalendarDay';
import type { AiringScheduleItem } from '@/types/anime';

interface CalendarGridProps {
  airings: AiringScheduleItem[];
}

export function CalendarGrid({ airings }: CalendarGridProps) {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const map = new Map<string, AiringScheduleItem[]>();
    for (const airing of airings) {
      const date = new Date(airing.airingAt * 1000);
      const key = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ ...airing, dayName });
    }
    // Sort days chronologically
    return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  }, [airings]);

  const toggleDay = (key: string) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {Array.from(grouped.entries()).map(([dateKey, dayAirings], dayIndex) => {
        const firstAiring = dayAirings[0];
        const dayName = firstAiring.dayName ?? dateKey;
        const isExpanded = expandedDays.has(dateKey);

        return (
          <CalendarDay
            key={dateKey}
            dateKey={dateKey}
            dayName={dayName}
            airings={dayAirings}
            isExpanded={isExpanded}
            onToggle={() => toggleDay(dateKey)}
            formatTime={formatTime}
            index={dayIndex}
          />
        );
      })}
    </div>
  );
}