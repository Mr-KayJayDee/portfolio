---
plan: 01-02
phase: 01-cleanup-fixes
status: complete
completed: 2026-04-21
---

# Summary: Migrate Dockerfile to pnpm, add contact API rate limiting

## What was built

- Dockerfile migré de npm vers pnpm avec `corepack enable` + `pnpm install --frozen-lockfile`
- Build multi-stage : stage builder (node:22-alpine) + stage runner avec `.output/` uniquement
- Créé `server/plugins/rate-limit.ts` — plugin Nitro avec rate limiting IP-based (3 req/min) sur `/api/contact` POST, retourne 429 en cas de dépassement

## Key files

- `Dockerfile` — pnpm build reproductible
- `server/plugins/rate-limit.ts` — rate limiting contact API

## Self-Check: PASSED
