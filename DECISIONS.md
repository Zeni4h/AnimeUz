# Architecture Decisions

## 2026-10-10

### Decision

Install shadcn/ui base-nova, map vars to violet dark theme, keep custom Skeleton.

### Reason

Need accessible Select/Dialog/Popover/Tooltip without hand-rolling. Default shadcn light vars would break dark `#0a0a0f` + accent `#7c6df0`.

### Outcome

`components.json` RSC true + lucide. `:root`/`.dark` set to dark violet. `@theme inline` collisions for `--color-accent`/`--color-border`/`--font-heading` removed. Custom `Skeleton.tsx` kept — Windows case collision with shadcn `skeleton.tsx`.

---

## 2026-10-10

### Decision

Enforce 5 UI laws via `@my-ui` skill. Fix Law 3 first.

### Reason

Uppercase labels + glows looked cheap. Found 6 `uppercase` hits in `AnimeHero`/`StreamingProviders`.

### Outcome

Removed `textTransform: uppercase` from 5 stat labels + provider section. `grep uppercase` now 0 in `src/`.

---

## 2026-06-13

### Decision

Build an Anime Information Platform instead of an anime streaming website.

### Reason

Streaming introduces legal, licensing, hosting, and bandwidth challenges.

### Outcome

Focus on discovery, information, and watch guidance.

---

## 2026-06-13

### Decision

Use AniList API as the primary data source.

### Reason

- Free
- GraphQL
- Modern API
- Rich anime metadata

### Outcome

Anime metadata will be sourced primarily from AniList.

---

## 2026-06-13

### Decision

Use Next.js + TypeScript.

### Reason

- Full-stack capability
- Excellent developer experience
- Strong ecosystem
- SEO support

### Outcome

Frontend and backend APIs can be developed within a single codebase.