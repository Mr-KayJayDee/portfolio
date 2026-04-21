---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: SEO Hytale — Autorité & Contenu
status: In Progress
last_updated: "2026-04-21T00:00:00.000Z"
progress:
  total_phases: 4
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

- PROJECT.md: .planning/PROJECT.md
- REQUIREMENTS.md: .planning/REQUIREMENTS.md
- ROADMAP.md: .planning/ROADMAP.md

## Current Focus

Phase: Phase 5 — @nuxt/content Setup & Renderer
Plan: —
Status: Roadmap defined, ready to plan Phase 5
Last activity: 2026-04-21 — M1.1 roadmap created (phases 5–8)

## Accumulated Context

- M1 complet — déployé en production sur killiandalcin.fr (phases 1–4)
- Stack : Nuxt 4 SSR + Nuxt UI v3 + Tailwind v4 + pnpm
- Blog/CMS était Out of Scope en M1, promu en priorité principale pour M1.1
- Renderer markdown doit supporter : syntax highlighting, images, embeds, tables, alerts — utiliser @nuxt/content
- Objectif double : ranker sur "Hytale plugin developer" ET capter trafic longue traîne via contenu communauté
- Phase 5 ajoute @nuxt/content comme dépendance — vérifier compatibilité Nuxt 4 / compatibilityVersion 4
- Articles bilingues : structure FR/EN dans content/ (ex: content/fr/blog/, content/en/blog/)
- og:image par article : image frontmatter ou fallback branded — jamais l'og-image.png générique M1
