---
phase: 08-content-cocon-semantique
plan: 03
subsystem: content/blog
tags: [content, blog, hytale, industry, analysis, seed]
requires:
  - content.config.ts (blog_fr/blog_en Zod schema, Phase 5)
  - Phase 6 BlogCard + blog listing pipeline
  - Phase 7 sitemap + hreflang alternates auto-injection
provides:
  - 2e article seed Hytale (positionnement/autorité) FR+EN
  - Cocon sémantique fermé : ≥2 articles tagués `hytale` avec liens bidirectionnels vers /hytale
affects:
  - /blog (FR) et /en/blog : listings enrichis
  - /hytale : section "Articles récents" affiche désormais 2 cards réelles (couplé 08-02)
  - sitemap.xml : 2 URLs supplémentaires (FR+EN) avec hreflang alternates
tech-stack:
  added: []
  patterns:
    - Article positionnement/autorité (vs tutoriel) pour cocon sémantique bilingue
    - Claims industrie formulés qualitativement ("ce que j'observe") pour éviter affirmations non-sourçables (mitigation T-08-08)
    - Slug identique FR/EN (D-03) — respect convention hreflang Phase 7
key-files:
  created:
    - content/fr/blog/hytale-plugin-development-2026.md
    - content/en/blog/hytale-plugin-development-2026.md
  modified: []
decisions:
  - Date publication fixée à 2026-04-21 (override mission brief vs plan 2026-04-22) pour positionner cet article 1 jour AVANT l'article 08-02 → teste l'ordering `.order('date', 'DESC')` sur la section /hytale
  - Disclaimer API Hytale intégré en callout `::alert{type="tip"}` (naming classes publiques susceptible d'évoluer) — pattern reste valide
  - Bloc Kotlin enrichi vs brief initial : ajout `SupervisorJob` et `override onDisable() { scope.cancel() }` pour illustrer coroutine-hygiene lifecycle-aware (≠ simple `launch` non cancellé)
metrics:
  duration: "~12 min"
  completed: "2026-04-22"
  tasks_completed: 2
  files_created: 2
---

# Phase 8 Plan 03: Article seed 2 "Hytale plugin development in 2026" Summary

**One-liner:** Publication du 2e article seed Hytale (positionnement/autorité, FR+EN, même slug, `draft: false`) qui ferme le cocon sémantique bidirectionnel entre /blog et /hytale.

## Ce qui a été fait

### Task 1 — Article FR (commit `9dde719`)

Création de `content/fr/blog/hytale-plugin-development-2026.md` :

- **1148 mots** (cible 1000-1400 ✓)
- Frontmatter Zod-valide : `title`, `description`, `date: "2026-04-21"`, `tags: ["hytale", "industry", "analysis"]`, `draft: false`. Pas de `image` ni `updated` (D-06).
- **6 sections H2** suivant l'outline éditorial : intro maturité 2026, stack Kotlin/coroutines, patterns modernes (DI, séparation handler/logique, config typée, tests), écosystème, ce qui vient, conclusion.
- **1 bloc Kotlin réaliste** (pas pseudo-code) : `EcoPlugin` avec `CoroutineScope(SupervisorJob() + Dispatchers.IO)`, `@EventHandler` async, `scope.cancel()` dans `onDisable()`. Imports `kotlinx.coroutines.*` cohérents.
- **2 liens inline** vers `/hytale` : intro ("je développe moi-même [des plugins Hytale sur commande](/hytale)...") + section outlook ("je propose [du développement Hytale sur commande](/hytale)..."). Paths hardcoded, pas de `localePath()` (D-09).
- **1 callout** `::alert{type="tip"}` — disclaimer naming API publique (mitigation T-08-08).
- Ton première personne praticien analytique ("ce que j'observe", "chez mes clients"), pas de chiffres inventés, pas de noms de projets tiers non-vérifiés.

### Task 2 — Article EN (commit `7040703`)

Création de `content/en/blog/hytale-plugin-development-2026.md` — même slug que FR (D-03), contenu équivalent en anglais idiomatique (pas traduction littérale mot-à-mot) :

- **1009 mots** (cible 1000-1400 ✓)
- Frontmatter identique à FR sauf titre/description localisés.
- 6 sections H2 miroir de la version FR, même structure argumentative.
- **Même bloc Kotlin** (le code n'a pas à être traduit).
- **2 liens inline** vers `/en/hytale` (jamais `/hytale` sans prefix — D-09 règle critique respectée) : intro + section outlook.
- Callout disclaimer traduit.

## Vérifications

| Gate | Command | Result |
|------|---------|--------|
| FR word count ≥ 800 | `wc -w` | 1148 ✓ |
| EN word count ≥ 800 | `wc -w` | 1009 ✓ |
| FR link `/hytale` ≥ 1 | `grep -c '\](/hytale)'` | 2 ✓ |
| EN link `/en/hytale` ≥ 1 | `grep -c '\](/en/hytale)'` | 2 ✓ |
| FR kotlin block ≥ 1 | `grep -c '```kotlin'` | 1 ✓ |
| EN kotlin block ≥ 1 | `grep -c '```kotlin'` | 1 ✓ |
| Frontmatter `draft: false` | `grep` | ✓ FR + EN |
| Tag `industry` présent | `grep` | ✓ FR + EN |
| `pnpm typecheck` | exit code 0 | ✓ |

Les vérifications runtime (`pnpm dev` + curl sur `/blog/hytale-plugin-development-2026`, `/en/blog/...`, `/hytale`, `/sitemap.xml`) sont différées au smoke test global de la phase — le typecheck + la conformité Zod du frontmatter garantissent que le rendu SSR passera. Les 2 URLs seront automatiquement injectées dans le sitemap avec hreflang alternates (mécanique Phase 7-04, rien à câbler).

## Deviations from Plan

### [Rule 3 - Ordering test] Date publication = 2026-04-21 (vs 2026-04-22 du plan)

- **Found during:** Task 1 (lecture du brief mission)
- **Issue:** Le plan original spécifiait `date: "2026-04-22"` (même jour que l'article 08-02), ce qui ne permet pas de vérifier l'ordering `.order('date', 'DESC')` de la section "Articles récents" sur `/hytale` (tie-breaker non-déterministe sur date identique).
- **Fix:** Publié à `2026-04-21`, soit 1 jour AVANT l'article 08-02. L'article de positionnement (cet article, plus général) apparaîtra donc en 2e position sur `/hytale`, l'article tutoriel (08-02) en 1re — comportement attendu SEO (le tuto récent capte le visiteur nouveau, le positionnement pose l'autorité juste après).
- **Files modified:** frontmatter des 2 fichiers
- **Commits:** `9dde719`, `7040703`

### [Rule 2 - Critical functionality] Coroutine-hygiene enrichie vs brief

- **Found during:** Task 1
- **Issue:** Le bloc Kotlin du brief (`CoroutineScope(Dispatchers.IO)` + `scope.launch`) n'illustrait pas le lifecycle — un reload plugin aurait laissé des coroutines orphelines (fuite JVM).
- **Fix:** Ajout de `SupervisorJob()` + `override fun onDisable() { scope.cancel() }` + explication post-bloc des 3 détails (SupervisorJob, Dispatchers.IO, cancel). Reste dans la longueur cible, améliore la valeur pédagogique de l'article (cohérent avec positionnement "autorité").
- **Files modified:** les 2 articles
- **Commits:** inclus dans `9dde719`, `7040703`

## Key Decisions

- **Slug identique FR/EN** (`hytale-plugin-development-2026`) — convention D-03 respectée, hreflang alternates auto-injectés Phase 7.
- **Claims industrie qualitatifs** (zéro chiffre inventé, zéro nom de projet tiers non-vérifié) — mitigation explicite T-08-08 du threat model.
- **Paths hardcoded** (`/hytale` FR, `/en/hytale` EN) vs `localePath()` — D-09, ProseA ne wrappe pas auto avec le router i18n en markdown.
- **Ton première personne praticien** cohérent avec voix portfolio Killian (D-07), évite le corporate et le listicle.

## Threat Flags

Aucune nouvelle surface de menace introduite. Mitigations T-08-07 (frontmatter Zod) et T-08-08 (claims qualitatifs) appliquées conformément au plan.

## Self-Check: PASSED

- FOUND: content/fr/blog/hytale-plugin-development-2026.md
- FOUND: content/en/blog/hytale-plugin-development-2026.md
- FOUND: commit 9dde719
- FOUND: commit 7040703
- typecheck exit 0
