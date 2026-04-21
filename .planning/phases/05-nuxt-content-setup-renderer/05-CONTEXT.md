# Phase 5: @nuxt/content Setup & Renderer - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Installer et configurer `@nuxt/content` pour que le markdown rende fidèlement du contenu technique : blocs de code colorés, images optimisées, tableaux, callouts/alerts — sans configuration supplémentaire dans les phases suivantes.

Cette phase ne crée pas encore les pages blog (Phase 6) ni les articles réels (Phase 8). Elle pose l'infrastructure de rendu.

</domain>

<decisions>
## Implementation Decisions

### Style du rendu markdown
- **D-01:** Utiliser `@tailwindcss/typography` (plugin officiel). Classe `prose dark:prose-invert` sur le wrapper `<article>`. Compatible Tailwind v4, support dark mode natif synchronisé avec `colorMode` existant.

### Callouts / Alerts
- **D-02:** Implémenter via la syntaxe MDC de `@nuxt/content` — `::alert{type="warning"}` dans le markdown appelle un composant Vue dédié (`components/content/Alert.vue`). Aucun HTML brut dans les fichiers markdown.

### Structure content/
- **D-03:** Dossiers par langue : `content/fr/blog/` et `content/en/blog/`. Un fichier markdown par article par langue, avec le même slug. Aligné avec `@nuxtjs/i18n` strategy `prefix_except_default`.

### Syntax highlighting
- **D-04:** Shiki intégré à `@nuxt/content` v3 (zéro dépendance supplémentaire). Langages à déclarer dans `nuxt.config.ts` : Kotlin, Java, TypeScript, Shell. Thème dark/light synchronisé avec `colorMode` du site.

### Claude's Discretion
- Choix du thème Shiki exact (ex: `github-dark` / `github-light` ou variante) — cohérence avec la charte dark/light du site.
- Nombre et types de callouts MDC à créer au minimum (au moins : info, warning, tip).
- Frontmatter schema exact des articles (title, description, date, tags, image...) — à définir mais pas bloquant pour cette phase.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements
- `.planning/REQUIREMENTS.md` §BLOG-01, BLOG-04, BLOG-05 — exigences exactes de cette phase

### Stack existant
- `nuxt.config.ts` — configuration actuelle (modules, i18n, colorMode, image) à étendre, ne pas réécrire
- `assets/css/main.css` — styles globaux existants, vérifier compatibilité avec prose Tailwind

### Documentation externe (à consulter)
- `@nuxt/content` v3 docs : https://content.nuxt.com — installation, MDC syntax, ContentRenderer
- `@tailwindcss/typography` : https://tailwindcss.com/docs/typography-plugin — configuration prose

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `@nuxt/image` déjà installé et configuré → `<NuxtImg>` disponible pour les images dans les articles via MDC ou ContentRenderer
- `colorMode` configuré avec cookie (SSR-safe) → le thème Shiki doit répondre à `useColorMode().value`

### Established Patterns
- Modules Nuxt déclarés dans `nuxt.config.ts` → ajouter `@nuxt/content` dans le tableau `modules`
- Composants auto-importés depuis `~/components` avec `pathPrefix: false` → les composants MDC dans `components/content/` seront auto-importés

### Integration Points
- `nuxt.config.ts` → ajouter `@nuxt/content` dans `modules` + config `content: {}` + `shiki` langages
- `assets/css/main.css` → importer `@tailwindcss/typography` si nécessaire
- `components/content/` → dossier à créer pour les composants MDC (Alert, etc.)
- `content/fr/blog/` et `content/en/blog/` → à créer avec au moins 1 article de test Kotlin

</code_context>

<specifics>
## Specific Ideas

- L'article de test (critère de succès) doit contenir un bloc Kotlin coloré, une image, un tableau et un callout — couvre les 4 success criteria de la phase.
- Le callout minimum pour valider : `::alert{type="info"}` rendant un composant stylisé Nuxt UI ou Tailwind.

</specifics>

<deferred>
## Deferred Ideas

- Pages /blog et /blog/[slug] — Phase 6
- SEO par article (useSeoMeta, JSON-LD Article) — Phase 7
- Articles seed Hytale réels — Phase 8
- Frontmatter complet avec og:image par article — Phase 7

</deferred>

---

*Phase: 05-nuxt-content-setup-renderer*
*Context gathered: 2026-04-21*
