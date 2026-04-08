---
phase: 02-ssr-shell
plan: 03
subsystem: seo-metadata
tags: [seo, json-ld, useSeoMeta, og-tags, i18n]
dependency_graph:
  requires: [02-01]
  provides: [per-route-seo, json-ld-homepage, og-image-all-routes]
  affects: [app/pages/]
tech_stack:
  added: []
  patterns: [useSeoMeta-per-route, useHead-json-ld, reactive-i18n-seo]
key_files:
  created:
    - app/pages/projects.vue
    - app/pages/about.vue
    - app/pages/contact.vue
    - app/pages/fiverr.vue
    - app/pages/formation.vue
  modified:
    - app/pages/index.vue
decisions:
  - "JSON-LD values hardcoded (not from i18n) per threat model T-02-06 — avoids injection risk"
  - "ogImage uses static absolute URL per D-12 decision"
metrics:
  duration: 48s
  completed: 2026-04-08
---

# Phase 02 Plan 03: Per-route SEO Metadata Summary

useSeoMeta() on all 6 page stubs with localized title/description/og tags via reactive i18n getters, homepage JSON-LD with Person + ProfessionalService schema, og:image absolute URL on every route.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Per-route SEO metadata on all page stubs | 0a58201 | app/pages/index.vue, projects.vue, about.vue, contact.vue, fiverr.vue, formation.vue |

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- All 6 pages contain useSeoMeta: PASS
- index.vue contains application/ld+json: PASS
- All pages contain og-image.png absolute URL: PASS
- JSON-LD contains sameAs with LinkedIn, Fiverr, Gitea: PASS

## Self-Check: PASSED
