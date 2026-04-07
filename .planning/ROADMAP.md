# Roadmap: Portfolio Killian Dalcin — Nuxt 4 Migration

## Overview

Three phases following the strict build order from research: first lay the Nuxt 4 project skeleton with all modules configured and data migrated, then implement the SSR-critical cross-cutting concerns (i18n, theme, SEO, header/footer), and finally build all pages and ship to production via Docker. Every page is crawlable by search engines when Phase 3 completes.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Nuxt 4 project scaffold, all modules configured, static data migrated, composables ported
- [ ] **Phase 2: SSR Shell** - i18n FR/EN, dark/light theme, SEO per route, header + footer layout
- [ ] **Phase 3: Pages & Ship** - All 8 pages, interactive components, EmailJS plugin, GA4, Dockerfile

## Phase Details

### Phase 1: Foundation
**Goal**: The Nuxt 4 project runs locally with all modules installed, data in `data/`, composables wired, and TypeScript strict mode passing
**Depends on**: Nothing (first phase)
**Requirements**: SSR-01, SSR-02, SSR-03, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. `nuxt dev` starts without errors and serves a blank app at `localhost:3000`
  2. All static data files exist under `data/` and are importable with TypeScript strict — no `any` types
  3. `useProjects()` composable returns typed project list and supports filtering by category and search
  4. `npx nuxi typecheck` and `npx eslint .` exit with 0 errors
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Scaffold Nuxt 4, modules, TypeScript strict, interfaces
- [ ] 01-02-PLAN.md — Migration donnees statiques + useProjects()

### Phase 2: SSR Shell
**Goal**: Every route renders the correct language, theme, and SEO metadata on the server — confirmed by `curl` with no JavaScript
**Depends on**: Phase 1
**Requirements**: I18N-01, I18N-02, I18N-03, I18N-04, I18N-05, THEME-01, THEME-02, THEME-03, SEO-01, SEO-02, SEO-03, SEO-04, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. `curl http://localhost:3000` returns French HTML; `curl http://localhost:3000/en/` returns English HTML — no JS required
  2. Switching language via the header dropdown persists across page reload (cookie, no FOUC)
  3. Toggling dark/light mode in the header persists across page reload with no flash on cold load
  4. `curl http://localhost:3000` response includes `<title>`, `og:title`, `og:description`, and JSON-LD script tag
  5. `http://localhost:3000/sitemap.xml` returns a valid XML sitemap with `hreflang` alternates for FR and EN URLs
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Scaffold Nuxt 4, modules, TypeScript strict, interfaces
- [ ] 01-02-PLAN.md — Migration donnees statiques + useProjects()
**UI hint**: yes

### Phase 3: Pages & Ship
**Goal**: All portfolio pages are live, forms work, analytics fire in production, and the Docker image builds and runs
**Depends on**: Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07, PAGE-08, COMP-01, COMP-02, COMP-03, COMP-04, INFRA-01, INFRA-04
**Success Criteria** (what must be TRUE):
  1. All 8 routes (`/`, `/projects`, `/project/[id]`, `/about`, `/contact`, `/fiverr`, `/formation`, 404) return complete HTML when fetched with `curl`
  2. Clicking an image in a project detail page opens a modal carousel with keyboard navigation (arrow keys + Escape closes)
  3. Submitting the contact form with valid data shows a success toast; EmailJS delivers the email
  4. `docker build` completes and `docker run` serves the SSR app on port 3000
  5. Google Analytics 4 events appear in GA4 DebugView when browsing in production mode
**Plans**: 2 plans
Plans:
- [ ] 01-01-PLAN.md — Scaffold Nuxt 4, modules, TypeScript strict, interfaces
- [ ] 01-02-PLAN.md — Migration donnees statiques + useProjects()
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/TBD | Not started | - |
| 2. SSR Shell | 0/TBD | Not started | - |
| 3. Pages & Ship | 0/TBD | Not started | - |
