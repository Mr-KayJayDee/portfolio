---
phase: 05-nuxt-content-setup-renderer
plan: "02"
subsystem: mdc-components
tags: [prose-img, alert, mdc, shiki, test-articles]
dependency_graph:
  requires: ['01']
  provides: [ProseImg, Alert, ProsePre, test-articles]
  affects:
    - app/components/content/ProseImg.vue
    - app/components/content/Alert.vue
    - app/components/content/ProsePre.vue
    - app/components/content/Clear.vue
    - app/components/content/Columns.vue
    - app/components/content/Details.vue
    - app/components/content/Badge.vue
    - app/components/content/Video.vue
    - content/fr/blog/test-kotlin-syntax.md
    - content/en/blog/test-kotlin-syntax.md
    - nuxt.config.ts
    - app/assets/css/main.css
key_files:
  created:
    - app/components/content/ProseImg.vue
    - app/components/content/Alert.vue
    - app/components/content/ProsePre.vue
    - app/components/content/Clear.vue
    - app/components/content/Columns.vue
    - app/components/content/Details.vue
    - app/components/content/Badge.vue
    - app/components/content/Video.vue
    - content/fr/blog/test-kotlin-syntax.md
    - content/en/blog/test-kotlin-syntax.md
  modified:
    - nuxt.config.ts
    - app/assets/css/main.css
decisions:
  - "Alert.vue: SVG inline à la place de UAlert — incompatibilité couleurs Nuxt UI v3 avec prose"
  - "ProseImg.vue: span.block à la place de figure — évite block-in-p HTML invalide (SSR hydration mismatch)"
  - "ProseImg.vue: inheritAttrs false — les classes MDC custom ne surchargent pas le layout auto"
  - "Shiki: single theme github-dark (jamais dual-theme) — blocs code toujours dark indépendamment du mode UI"
  - "ProsePre.vue: bg-[#0d1117] hardcodé sur le wrapper div, pre bg-transparent"
  - "Composants bonus: Columns, Details, Badge, Video, Clear — hors scope initial, ajoutés pour richesse MDC"
metrics:
  duration: "~2 sessions"
  completed: "2026-04-21"
  tasks_completed: 2
  tasks_total: 2
  files_created: 10
  files_modified: 2
  checkpoint: "approved"
---

# Phase 05 Plan 02: MDC Components & Test Articles Summary

Création des composants de rendu markdown (ProseImg, Alert, ProsePre) et des articles de test bilingues FR/EN validant les 4 success criteria de la phase. Plusieurs composants MDC bonus ont été ajoutés (Columns, Details, Badge, Video, Clear).

## Tasks Completed

| Task | Name | Commits | Files |
|------|------|---------|-------|
| 1 | Créer ProseImg.vue et Alert.vue | c9a14a9 → b0af1d3 | ProseImg.vue, Alert.vue |
| 2 | Créer articles de test FR/EN | 0fa19a7 | test-kotlin-syntax.md ×2 |
| — | ProsePre override dark bg | f179d64 | ProsePre.vue, main.css |
| — | Composants MDC bonus | 60e05f7 | Columns/Details/Video/Badge/Clear |
| — | Fix: Shiki single dark theme | c5be72b | nuxt.config.ts, main.css |

## Decisions Made

1. **Alert.vue sans UAlert** — UAlert de Nuxt UI v3 ne supporte pas les variantes de couleur arbitraires dans le contexte prose. Solution : `<div>` + SVG inline + Tailwind classes directes. Résultat visuellement identique à la spec.

2. **ProseImg `<span class="block">` au lieu de `<figure>`** — `<figure>` est un élément block. Quand Shiki enveloppe `![img]()` dans un `<p>`, un block-in-p produit un HTML invalide. Le navigateur restrucutre le DOM au parse, créant un mismatch de hydration SSR. `<span class="block">` est valide dans un `<p>`.

3. **Shiki single theme `github-dark`** — La configuration dual-theme (`default: github-light`) injectait un fond blanc via les CSS variables `--shiki-default` en light mode. Passer à un seul thème `github-dark` garantit que les blocs de code restent toujours dark, indépendamment du mode couleur de l'interface.

## Deviations from Plan

### Alert.vue: SVG inline vs UAlert
- **Planned**: `<UAlert :color="..." variant="soft">`
- **Actual**: `<div>` + 4 icônes SVG inline + classes Tailwind
- **Reason**: UAlert ne supporte pas les couleurs `info/warning/tip/danger` comme color tokens dans Nuxt UI v3. Le résultat visuel est conforme à la UI-SPEC.

### Composants MDC bonus hors scope
- **Added**: `Columns.vue`, `Details.vue`, `Badge.vue`, `Video.vue`, `Clear.vue`
- **Reason**: Nécessaires pour un article de showcase complet et le futur contenu Hytale

## Checkpoint Visual — Approved

Validation humaine effectuée sur `http://localhost:3000/test` :
- [x] Bloc Kotlin coloré (github-dark, fond #0d1117)
- [x] Image rendue via `<img>` avec lazy loading
- [x] Tableau markdown avec prose styling
- [x] Callouts info/warning/tip/danger fonctionnels
- [x] Columns, Details, Badge inline, Clear — fonctionnels
- [ ] Vidéo YouTube — non fonctionnelle (hors scope de correction)
- [x] Mode light/dark sans impact sur les blocs code (fix appliqué)

## Self-Check: PASSED
