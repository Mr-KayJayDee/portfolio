---
phase: 03-pages-ship
plan: 04
subsystem: infrastructure-cleanup
tags: [dockerfile, docker, ssr, ga4, legacy-cleanup, traefik]
dependency_graph:
  requires: [03-02-PLAN, 03-03-PLAN]
  provides: [ssr-dockerfile, docker-compose-traefik, clean-repo]
  affects: []
tech_stack:
  added: []
  patterns: [multi-stage Dockerfile node:22-alpine, .output SSR deploy, Traefik port 3000]
key_files:
  created:
    - .dockerignore
  modified:
    - Dockerfile
    - docker-compose.yml
decisions:
  - "Dockerfile uses node:22-alpine for both build and runtime stages (no nginx)"
  - "SMTP and GA4 env vars injected via docker-compose environment section"
  - "Formation page not redirected — returns 404 naturally per D-19"
  - "GA4 nuxt-gtag config already correct from Plan 01 — no changes needed"
metrics:
  duration: 59s
  completed: 2026-04-08
  tasks: 2
  files: 169
---

# Phase 03 Plan 04: Dockerfile SSR + GA4 + Legacy Cleanup Summary

Multi-stage Dockerfile rewritten from nginx/dist to node:22-alpine build+runtime copying .output/ with node server, docker-compose Traefik port updated 80->3000 with SMTP/GA4 env vars, 166 legacy SPA files deleted (src/, old/, nginx.conf, index.html, eslint.config.ts, env.d.ts).

## Task Results

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Dockerfile SSR multi-stage + docker-compose Traefik port 3000 | 39749c6 | Dockerfile, .dockerignore, docker-compose.yml |
| 2 | GA4 production-only + legacy cleanup | 081ed03 | 166 files deleted (src/, old/, nginx.conf, index.html, eslint.config.ts, env.d.ts) |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- Dockerfile uses node:22-alpine in 2 stages, copies .output/, CMD node /app/.output/server/index.mjs
- .dockerignore excludes node_modules, .nuxt, .output, src, .git, .planning
- docker-compose.yml loadbalancer.server.port=3000
- docker-compose.yml has NUXT_SMTP_HOST/USER/PASS/TO and NUXT_PUBLIC_GTAG_ID env vars (${VAR} references, no hardcoded secrets)
- nuxt-gtag enabled only in production (import.meta.env.NODE_ENV === 'production')
- runtimeConfig.public.gtag.id present for runtime injection
- No app/pages/formation.vue exists — /formation returns 404
- src/ directory completely removed
- old/, nginx.conf, index.html, eslint.config.ts, env.d.ts removed

## Self-Check: PASSED
