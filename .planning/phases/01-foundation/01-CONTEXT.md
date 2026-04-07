# Phase 1: Foundation - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Le projet Nuxt 4 tourne localement avec tous les modules installés, données migrées sous `data/`, composable `useProjects()` câblé, et TypeScript strict mode passant. Aucune page visible — seulement le squelette technique.

</domain>

<decisions>
## Implementation Decisions

### Structure des données
- **D-01:** Séparer les données projets dans `data/projects.ts` — le composable `useProjects()` ne contient que la logique (filtrage, recherche, findById)
- **D-02:** Les fichiers data stockent des clés de traduction i18n (ex: `'projects.xinko.title'`), les textes FR/EN restent dans les fichiers de locale. Compatible SSR natif Nuxt i18n.
- **D-03:** Resserrer le typage TypeScript — rendre obligatoires les champs toujours présents (`technologies`, `category`, `date`) et garder optionnels uniquement ceux qui varient (`gallery`, `demoUrl`, `longDescription`)

### Stratégie composables
- **D-04:** Réécrire les composables en style Nuxt natif — auto-imports, `useAppConfig()` au lieu de `useSiteConfig()`, supprimer le wrapper `useI18n` custom (Nuxt i18n le fournit nativement)
- **D-05:** Phase 1 porte uniquement `useProjects()` — les autres composables (`useGallery()`, `useSeo()`, `useTheme()`) viendront dans leur phase respective

### Assets images
- **D-06:** Images dans `public/images/` — URLs stables (`/images/xinko.webp`), pas de bundling, compatible NuxtImg en Phase 3
- **D-07:** Format WebP uniquement, pas de fallback JPEG (support navigateur 98%+)

### Modules Nuxt
- **D-08:** Installer TOUS les modules dès Phase 1 dans `nuxt.config.ts` : @nuxt/ui, @nuxt/eslint, @nuxtjs/i18n, @nuxtjs/color-mode, @nuxtjs/sitemap, nuxt-gtag, @nuxt/image. Configuration minimale pour ceux utilisés en Phase 2-3.
- **D-09:** Utiliser pnpm comme package manager (recommandé par Nuxt, remplace npm)

### Claude's Discretion
Aucune zone déléguée — toutes les décisions ont été prises par l'utilisateur.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in:
- `.planning/REQUIREMENTS.md` — Requirements SSR-01, SSR-02, SSR-03, DATA-01 à DATA-05, INFRA-02, INFRA-03
- `.planning/ROADMAP.md` — Phase 1 success criteria
- `.planning/codebase/CONVENTIONS.md` — Naming patterns and code style to follow
- `.planning/codebase/STRUCTURE.md` — Current project structure for migration reference
- `src/types/index.ts` — Current type definitions to migrate and tighten
- `src/data/` — Current data files to migrate (faq.ts, techstack.ts, testimonials.ts)
- `src/composables/useProjects.ts` — Current composable to rewrite in Nuxt style

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/types/index.ts` — Types `Project`, `ProjectButton`, `Technology`, `TechStack` à migrer et resserrer
- `src/data/faq.ts`, `src/data/techstack.ts`, `src/data/testimonials.ts` — Données statiques à migrer vers `data/`
- `src/composables/useProjects.ts` — Logique de filtrage/recherche à extraire (données inline à séparer)

### Established Patterns
- Données i18n via fonctions `getXxx(t)` qui appellent `t()` — à remplacer par clés i18n dans les fichiers data
- Composables exportent une seule fonction nommée `export function useXxx()`
- Code style : Prettier (no semi, single quotes, 100 chars), ESLint flat config

### Integration Points
- Les données projets référencent des images via `@/assets/images/` — à remapper vers `/images/`
- `useProjects()` importe `useI18n` custom — à remplacer par l'auto-import Nuxt i18n

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-07*
