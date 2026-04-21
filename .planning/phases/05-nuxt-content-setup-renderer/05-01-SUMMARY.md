---
phase: 05-nuxt-content-setup-renderer
plan: "01"
subsystem: cms-infrastructure
tags: [nuxt-content, shiki, tailwind-typography, sqlite, i18n, collections]
dependency_graph:
  requires: []
  provides: [nuxt-content-module, shiki-dual-theme, bilingual-collections, typography-plugin]
  affects: [nuxt.config.ts, content.config.ts, app/assets/css/main.css]
tech_stack:
  added:
    - "@nuxt/content@3.13.0"
    - "@tailwindcss/typography@0.5.19"
  patterns:
    - "Shiki dual-theme via theme.default + theme.dark (github-light/github-dark)"
    - "SQLite connecteur natif Node 22 via experimental.sqliteConnector: 'native'"
    - "Collections i18n: prefix_except_default — blog_fr=/blog, blog_en=/en/blog"
    - "@plugin CSS syntax pour Tailwind v4 plugins"
key_files:
  created:
    - content.config.ts
  modified:
    - nuxt.config.ts
    - app/assets/css/main.css
    - .gitignore
decisions:
  - "sqliteConnector: 'native' (Node 22) — évite better-sqlite3 et ses bindings natifs"
  - "Prefixes collections alignés sur i18n.strategy: prefix_except_default (FR sans prefix, EN avec /en/)"
  - "Shiki langs: kotlin, java, typescript, shell, bash, json, vue, html, css"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-21"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 3
---

# Phase 05 Plan 01: @nuxt/content Install & Configuration Summary

Installation et configuration de @nuxt/content v3 avec Shiki dual-theme, collections bilingues FR/EN, et plugin @tailwindcss/typography pour le portfolio Nuxt 4.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Installer @nuxt/content et @tailwindcss/typography | c64709d | package.json, pnpm-lock.yaml |
| 2 | Configurer nuxt.config.ts et main.css | 3381b2e | nuxt.config.ts, app/assets/css/main.css |
| 3 | Créer content.config.ts avec collections bilingues | 8319789 | content.config.ts |
| — | Fix: .data dans .gitignore | f49fab2 | .gitignore |

## Decisions Made

1. **sqliteConnector: 'native'** — Node 22 inclut SQLite natif, évite la dépendance `better-sqlite3` et ses bindings C++ à compiler.
2. **Prefixes i18n des collections** — alignés sur `prefix_except_default` : `blog_fr` → `/blog` (FR = locale par défaut, pas de prefix), `blog_en` → `/en/blog`.
3. **Schema Zod minimal** — `title`, `description`, `date` requis + `tags`, `image` optionnels. Les champs `author` et `og:image` seront ajoutés en Phase 7.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing] .data/ non tracké dans .gitignore**
- **Found during:** Après Task 3 (smoke test `pnpm dev`)
- **Issue:** `@nuxt/content` génère un répertoire `.data/content/` (base SQLite runtime) non ignoré par git
- **Fix:** Ajout de `.data` dans `.gitignore`
- **Files modified:** .gitignore
- **Commit:** f49fab2

## Verification Results

```
grep '"@nuxt/content"' package.json       → "@nuxt/content": "^3.13.0"
grep "'@nuxt/content'" nuxt.config.ts     → '@nuxt/content'
grep "github-dark" nuxt.config.ts         → dark: 'github-dark'
grep "sqliteConnector" nuxt.config.ts     → sqliteConnector: 'native'
grep "nativeSqlite" nuxt.config.ts        → (rien — correct)
grep '@plugin' app/assets/css/main.css   → @plugin "@tailwindcss/typography";
grep "blog_fr\|blog_en" content.config.ts → blog_fr + blog_en
pnpm dev                                  → Nuxt 4.4.2 démarre sur :3000 sans erreur
```

## Known Stubs

Aucun — cette phase ne produit pas de rendu UI, uniquement de l'infrastructure.

## Threat Flags

Aucun nouveau vecteur introduit au-delà de ce qui est documenté dans le threat_model du plan.

## Self-Check: PASSED

- content.config.ts existe : FOUND
- nuxt.config.ts contient '@nuxt/content' : FOUND
- app/assets/css/main.css contient @plugin typography : FOUND
- Commits c64709d, 3381b2e, 8319789, f49fab2 : FOUND
