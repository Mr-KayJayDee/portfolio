---
phase: 08-content-cocon-semantique
plan: 01
subsystem: content/ui
tags: [nuxt-content, i18n, hytale, cocon-semantique, blog]
requirements: [SEO-14]
requires:
  - BlogCard.vue (variant compact)
  - queryCollection('blog_fr'|'blog_en') collections Phase 5
  - i18n locales fr/en
provides:
  - HytaleRecentArticles.vue (section auto-importee, masquee si 0 article hytale)
  - i18n hytale.recentArticles.{title,subtitle,viewAll}
  - injection <HytaleRecentArticles /> en fin de /hytale
affects:
  - app/pages/hytale.vue
tech-stack:
  added: []
  patterns:
    - queryCollection bilingual literal branches (Phase 5 Pitfall D-03)
    - JS post-filter tags.includes('hytale') + slice(0,2) (D-11)
    - v-if="articles.length" hide-if-empty (D-12)
key-files:
  created:
    - app/components/HytaleRecentArticles.vue
  modified:
    - app/pages/hytale.vue
    - i18n/locales/fr.json
    - i18n/locales/en.json
decisions:
  - Filtre JS tags.includes('hytale') choisi sur LIKE SQL (D-11 — LIKE unreliable sur JSON array SQLite)
  - Style accentue pour cles i18n recentArticles (aligne blog.* 2026, ecart avec hytale.* legacy ASCII accepte)
  - Injection apres TestimonialsSection, dernier enfant du root div de /hytale
  - BlogCard variant=compact sans prop direction (default 'next' accepte, pas de semantique prev/next dans ce contexte)
metrics:
  duration: ~5 min
  completed: 2026-04-22
  tasks: 2
  files: 4
---

# Phase 8 Plan 01: Scaffold HytaleRecentArticles — Summary

Scaffolding du cocon semantique cote /hytale : composant `HytaleRecentArticles.vue` (queryCollection bilingue + filtre JS tag `hytale` + limit 2), injection dans `/hytale`, cles i18n FR/EN. Section degrade gracieusement (v-if) tant que 0 article publie, permettant de shipper Wave 1 sans rompre /hytale.

## Changes

### Task 1 — HytaleRecentArticles.vue (commit `ddfc685`)

Nouveau composant `app/components/HytaleRecentArticles.vue` (72 lignes, auto-importe) :

- **Script** : branches litterales `queryCollection('blog_fr')` / `queryCollection('blog_en')` sur ternaire `isFr.value` (Phase 5 Pitfall D-03), key `hytale-recent-${locale.value}` + `watch: [locale]`, chaine `.where('draft','=',false).order('date','DESC').all()`.
- **Filtre JS** : `articles = computed(() => all.filter(a => Array.isArray(a.tags) && a.tags.includes('hytale')).slice(0, 2))` — guard Array.isArray contre TypeError (T-08-01), filtre JS car LIKE SQLite unreliable sur tags[] (D-11).
- **Template** : `<section v-if="articles.length">` (masque total si vide, D-12), header `// recent-articles` + h2 `text-3xl sm:text-4xl` + subtitle, grille `grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6`, `<BlogCard variant="compact">` v-for, footer NuxtLink `localePath('/blog')` avec icon arrow-right.

### Task 2 — Injection + i18n (commit `bf2ec86`)

- `app/pages/hytale.vue` : `<HytaleRecentArticles />` insere apres le wrapper TestimonialsSection, avant fermeture root div. Aucun script change (auto-import Nuxt).
- `i18n/locales/fr.json` : nouveau bloc `hytale.recentArticles` sibling de `hero/services/pricing` avec title "Articles récents", subtitle "Les dernières publications sur le développement de plugins Hytale", viewAll "Voir tous les articles" (style accentue aligne `blog.*` 2026).
- `i18n/locales/en.json` : miroir EN "Recent articles" / "Latest writing on Hytale plugin development" / "View all articles".

## Verification

- `pnpm typecheck` exit 0 (deux passes, apres chaque tache)
- `node -e "JSON.parse(...)"` FR + EN OK (pas de trailing comma ni syntax error)
- `grep "queryCollection\\('blog_(fr|en)'\\)"` → 2 branches litterales presentes
- `grep "v-if=\"articles.length\""` → present
- `grep "variant=\"compact\""` → present
- `grep "tags.*includes.*'hytale'"` → filtre JS present
- `grep "<HytaleRecentArticles"` dans hytale.vue → present ligne 38
- `grep "\"recentArticles\""` dans fr.json + en.json → ligne 556 sur les deux
- Curl SSR reporte en Wave 2 (articles pas encore publies → section absente du HTML, comportement attendu D-12)

## Deviations from Plan

None — plan executed exactly as written. Le filtre JS etait prevu par le plan (D-11), aucune surprise. Les cles i18n en style accentue respectent la recommandation PATTERNS.md.

## Decisions Made

1. **Filtre JS tags** (D-11 applied) : `Array.isArray(a.tags) && a.tags.includes('hytale')` au lieu de `.where('tags', 'LIKE', ...)` SQL. Raison : LIKE sur champ JSON-array SQLite non fiable ; guard Array.isArray = mitigation T-08-01 threat register.
2. **Style i18n accentue** : coherence avec bloc `blog.*` Phase 6-02 (convention 2026). Le bloc `hytale.*` legacy ASCII reste pour retrocompatibilite ; les nouvelles cles adoptent la convention actuelle.
3. **Position d'injection** : derniere position du root div, apres le wrapper `bg-gray-50/50` des Testimonials, conforme CONTEXT D-10 "en bas de page, avant footer-CTA existant" (footer-CTA vit dans AppFooter layout, hors page).
4. **Pas de prop `direction`** sur BlogCard : variant compact accepte default 'next' (icon arrow-right), coherent avec le CTA viewAll aussi en arrow-right. Pas de semantique prev/next dans ce contexte de listing.

## Threat Flags

Aucune nouvelle surface de menace introduite hors du threat model du plan. Les 3 threats (T-08-01 tampering frontmatter, T-08-02 draft leak, T-08-03 DoS) sont tous mitigees comme prevu :
- T-08-01 → `Array.isArray(a.tags)` guard avant `.includes()`
- T-08-02 → `.where('draft', '=', false)` filtre SQL obligatoire
- T-08-03 → accept (volume d'articles < 100 attendu)

## Follow-ups (Wave 2)

- Publier les 2 articles seed (how-to-build-your-first-hytale-plugin + hytale-plugin-development-2026) en FR+EN avec `draft: false` + tag `hytale`
- Curl `/hytale` + `/en/hytale` pour valider apparition de la section avec les 2 slugs (conforme must_have truth #1)

## Self-Check: PASSED

- [x] `app/components/HytaleRecentArticles.vue` exists
- [x] `app/pages/hytale.vue` contains `<HytaleRecentArticles`
- [x] `i18n/locales/fr.json` contains `"recentArticles"` block with 3 keys
- [x] `i18n/locales/en.json` contains `"recentArticles"` block with 3 keys
- [x] Commit `ddfc685` found in `git log`
- [x] Commit `bf2ec86` found in `git log`
- [x] `pnpm typecheck` exit 0
