'use client';

import { useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface AnimeSynopsisProps {
  description: string | null;
}

const TRUNCATE_LENGTH = 600;

export function AnimeSynopsis({ description }: AnimeSynopsisProps) {
  const [expanded, setExpanded] = useState(false);

  if (!description) {
    return (
      <div
        style={{
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          padding: '1.5rem',
          background: 'var(--color-bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
        }}
      >
        No synopsis available.
      </div>
    );
  }

  const clean = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p', 'span'],
    ALLOWED_ATTR: [],
  });

  const isLong = clean.replace(/<[^>]*>/g, '').length > TRUNCATE_LENGTH;

  // Strip all tags for truncation preview
  const plainText = clean.replace(/<[^>]*>/g, '');
  const preview = isLong && !expanded ? plainText.slice(0, TRUNCATE_LENGTH) + '…' : null;

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '1.5rem 1.75rem',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: 'var(--color-text-primary)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span>📖</span> Synopsis
      </h2>

      <div
        style={{
          color: 'var(--color-text-secondary)',
          lineHeight: 1.8,
          fontSize: '0.95rem',
        }}
      >
        {preview ? (
          <p>{preview}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: clean }} />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded((e) => !e)}
          id="synopsis-toggle-btn"
          style={{
            marginTop: '0.875rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-accent-bright)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 200ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-accent-bright)')}
        >
          {expanded ? '▲ Show less' : '▼ Read more'}
        </button>
      )}
    </div>
  );
}
