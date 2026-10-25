# Verification (AnimeUz Next.js)

## 1. Sweep (from repo root)
```bash
SRC=src
rg -n --glob '!**/components/ui/**' '<select\b|type=["'"'"'](date|time|datetime-local|color)["'"'"']|<datalist\b|window\.(alert|confirm|prompt)\(' $SRC
rg -n '\buppercase\b|text-transform:\s*uppercase' $SRC
rg -n --glob '!**/components/ui/**' '<(div|span|button|a|img|td|th|li|p|svg)\b[^>]*\btitle=' $SRC
rg -n '\?\?\s*["'"'"'](—|–|-|--)["'"'"']|\|\|\s*["'"'"'](—|–|-|--)["'"'"']' $SRC
rg -nP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' $SRC
rg -n 'duration-[0-9]+' $SRC
rg -n 'translateY\(-[0-9]' $SRC
rg -n 'box-shadow: 0 0 20px|glow-pulse' $SRC
```
Fix or explain every hit.

## 2. Build
```bash
npm run lint
npm run build
```
Must pass. Note what `build` skips.

## 3. Visual
Home `/`, `/search`, `/anime/[id]` at 390 + 1440, dark (default). Check overflow, touching, invisible borders, leftover glow/lift.

## 4. Interaction
Open/close dialogs/sheets, filter search, back nav restores scroll, Esc closes, Enter submits, image loading has size-matched skeleton (no layout shift).

## 5. Report
```
Done: ...
Verified: pages x widths
Not verified: ... + why
Skipped: ... + why
Links: http://localhost:3000
Files: absolute paths as plain text
```
