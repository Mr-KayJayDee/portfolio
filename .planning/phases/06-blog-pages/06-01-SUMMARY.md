---
phase: 06-blog-pages
plan: 01
subsystem: content
tags: [nuxt-content, zod-schema, nitro-plugin, reading-time, blog]

requires:
  - phase: 05-nuxt-content-setup-renderer
    provides: blog_fr/blog_en collections + base schema + ContentRenderer pipeline
provides:
  - "Zod schema étendu avec draft (default false) + wordCount + minutes optional"
  - "Nitro hook content:file:afterParse qui injecte wordCount/minutes (200 wpm, min 1) à l'ingestion"
  - "Pure util countWordsInMinimalBody ignorant code/pre tags dans l'AST minimal body"
  - "Composable fallback useReadingTime (200 wpm) pour usage inline dans les templates"
  - "Articles test-kotlin-syntax.md (FR + EN) marqués draft: true — exclus des listings via where('draft', '=', false)"
affects: [06-02-components-ui, 06-03-blog-listing, 06-04-blog-article-chrome, 07-seo, 08-hytale-seed-articles]

tech-stack:
  added: []
  patterns:
    - "Nitro plugin hook content:file:afterParse pour enrichissement au parse-time (convention Nuxt Content v3)"
    - "Zod schema optional sans default pour champs injectés par hook (wordCount/minutes)"
    - "Zod schema optional avec default(false) pour champ auteur-optionnel (draft)"
    - "Pure AST traversal sans dépendance pour counter de mots minimal body v3"

key-files:
  created:
    - server/plugins/reading-time.ts
    - app/utils/countWords.ts
    - app/composables/useReadingTime.ts
  modified:
    - content.config.ts
    - content/fr/blog/test-kotlin-syntax.md
    - content/en/blog/test-kotlin-syntax.md

key-decisions:
  - "Hook Nitro = source of truth pour wordCount/minutes ; composable client = fallback uniquement (D-19)"
  - "Ignorer code/pre tags dans le word count (convention Medium/Dev.to — snippets non-lisibles)"
  - "200 wpm figé partout (listing + article) pour garantir la cohérence d'affichage (D-19)"
  - "draft.default(false) (pas required) pour ne pas casser les articles existants qui n'ont pas le champ"
  - "wordCount/minutes optional sans default — la valeur vient du hook, pas de l'auteur"

patterns-established:
  - "Pattern Nitro plugin content-enrichment : defineNitroPlugin + nitroApp.hooks.hook('content:file:afterParse', ...) avec guard .md"
  - "Pattern schema extension @nuxt/content : étendre le schema Zod partagé (blogSchema var), les defineCollection pointent déjà vers la variable"
  - "Pattern draft filtering : draft: z.boolean().optional().default(false) + where('draft', '=', false) dans les listings"

requirements-completed: [BLOG-02, BLOG-03, BLOG-06]

duration: ~25min
completed: 2026-04-22
---

# Phase 6 Plan 01 : Content Schema + Reading-Time Foundation Summary

**Nitro hook content:file:afterParse injectant wordCount + minutes (200 wpm) sur chaque markdown, schema Zod étendu avec draft/wordCount/minutes, articles de test marqués draft: true**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-22T08:55Z (approx — basé sur le premier commit 6b4935e)
- **Completed:** 2026-04-22T09:05Z
- **Tasks:** 5 / 5
- **Files modified:** 6 (3 créés, 3 modifiés)

## Accomplishments

- Schema Zod de blogSchema étendu avec 3 champs : `draft` (default false), `wordCount` (optional), `minutes` (optional) — les 2 collections blog_fr/blog_en héritent automatiquement via la variable partagée.
- Nitro plugin `server/plugins/reading-time.ts` enregistré sur le hook `content:file:afterParse` : calcule le word count via `countWordsInMinimalBody` et injecte `wordCount` + `minutes = max(1, ceil(count/200))` sur chaque content object `.md`.
- Util pur `app/utils/countWords.ts` : traversal récursif du minimal body `{type, value}` de @nuxt/content v3, ignore les tags `code` et `pre` (snippets non comptés comme lecture lisible). Zero dépendance, zero import.
- Composable `useReadingTime(numberOrString)` : helper synchrone 200 wpm utilisable inline dans templates en fallback quand `article.minutes` n'est pas encore disponible (hot-reload dev).
- Articles `content/{fr,en}/blog/test-kotlin-syntax.md` marqués `draft: true` dans leur frontmatter — ils seront exclus de toutes les queries `.where('draft', '=', false)` de Wave 2/3 mais restent accessibles par URL directe pour les tests internes de rendu (Phase 5).

## Task Commits

Chaque tâche a été commitée atomiquement :

1. **Task 1.1 : Étendre le schema Zod de content.config.ts** — `6b4935e` (feat)
2. **Task 1.2 : Créer app/utils/countWords.ts** — `63d0173` (feat)
3. **Task 1.3 : Créer server/plugins/reading-time.ts** — `5397390` (feat)
4. **Task 1.4 : Créer app/composables/useReadingTime.ts** — `dd9ce6e` (feat)
5. **Task 1.5 : Marquer test-kotlin-syntax.md (FR + EN) draft: true** — `f1d89ea` (chore)

## Files Created/Modified

- `content.config.ts` — Schema Zod étendu : `draft: z.boolean().optional().default(false)`, `wordCount: z.number().optional()`, `minutes: z.number().optional()`. Collections `blog_fr`/`blog_en` inchangées (pointent vers la variable `blogSchema` qui a reçu les nouveaux champs).
- `app/utils/countWords.ts` *(NEW)* — Fonction pure `countWordsInMinimalBody(body: unknown): number` qui traverse le minimal body AST en ignorant code/pre.
- `server/plugins/reading-time.ts` *(NEW)* — Plugin Nitro enregistrant le hook `content:file:afterParse`, importe `countWordsInMinimalBody` via `~/utils/countWords`, injecte `content.wordCount` + `content.minutes`.
- `app/composables/useReadingTime.ts` *(NEW)* — Composable client fallback 200 wpm, accepte `number` OU `string`, retourne `minutes >= 1`. Auto-importé par convention Nuxt.
- `content/fr/blog/test-kotlin-syntax.md` — Frontmatter : ajout `draft: true` après `tags`, corps markdown inchangé (240 → 241 lignes).
- `content/en/blog/test-kotlin-syntax.md` — Idem côté anglais (240 → 241 lignes).

## Schema Diff (before → after)

**Before (Phase 5 heritage, lines 3-9 de content.config.ts) :**
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
})
```

**After :**
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),  // D-18
  wordCount: z.number().optional(),              // injecté par hook Nitro
  minutes: z.number().optional(),                // injecté par hook Nitro
})
```

Les blocs `defineCollection({ schema: blogSchema })` pour `blog_fr` et `blog_en` sont **inchangés** — l'extension se propage automatiquement via la référence variable.

## Hook Behavior (expected)

Après `rm -rf node_modules/.cache/content .nuxt && pnpm dev` (exécuté en fin de plan pour forcer la régénération de la DB SQLite @nuxt/content) :

- Le hook `content:file:afterParse` s'exécute sur chaque fichier parsé.
- Guard `file.id?.endsWith('.md')` skip les non-markdown (défensif).
- `countWordsInMinimalBody(content.body)` retourne le nombre de mots de la prose (code/pre exclus).
- `content.wordCount` et `content.minutes` posés sur l'objet — persistés dans la DB SQLite @nuxt/content, queryables via `queryCollection(...).all()`.
- Aucun warning Zod attendu : le schema expose désormais `wordCount` et `minutes` optional (Pitfall 5 RESEARCH — "les propriétés injectées par hook DOIVENT être déclarées dans le schema pour être visibles via queryCollection").

**wordCount observé sur test-kotlin-syntax.md (ordre de grandeur, basé sur `wc -w`) :**
- FR : ~672 mots bruts dans le fichier (incluant frontmatter + code blocks). Après filtrage frontmatter + code/pre par le hook, count attendu autour de **~300-400 mots lisibles** → `minutes = ceil(350/200) = 2 min` approx.
- EN : ~623 mots bruts → count attendu **~280-380 mots lisibles** → `minutes = 2 min` approx.

Valeur exacte vérifiable au prochain `pnpm dev` via un `console.log(content.wordCount)` temporaire dans le hook (non ajouté — pas dans scope). La source of truth reste la DB SQLite une fois le dev server relancé.

Pas de vérification runtime exécutée dans ce plan (aucun `pnpm dev` lancé) — le plan est intentionnellement data-layer only sans consommateur UI dans sa wave. Le comportement sera validé end-to-end à la Wave 3 quand le listing `/blog` rendra les cards avec `{{ article.minutes }}`.

## Decisions Made

Aucune décision nouvelle au-delà de celles figées dans CONTEXT.md (D-14, D-18, D-19). Le plan a été exécuté exactement selon spec RESEARCH.md + PATTERNS.md.

## Deviations from Plan

**None — plan executed exactly as written.**

Aucune déviation des Rules 1-4 n'a été nécessaire :
- Aucun bug inline à corriger (Rule 1).
- Aucune fonctionnalité critique manquante (Rule 2). Les guards `.md` et `file.id?.` étaient déjà dans la spec RESEARCH.
- Aucun blocage technique (Rule 3). Le typecheck passe sans erreur après chaque tâche.
- Aucune décision architecturale surprise (Rule 4).

## Issues Encountered

**Observation non-bloquante (Task 1.3 commit) :** Le commit `5397390` de Task 1.3 a inclus `.planning/STATE.md` (modifié en amont par l'init execute-phase) en plus du fichier cible `server/plugins/reading-time.ts`. Conséquences :
- Pas de pollution fonctionnelle (STATE.md sera de toute façon mis à jour en fin de plan).
- Pas de deletions, pas de fichiers sensibles.
- `git show --stat` sur le commit : 2 files (STATE.md + reading-time.ts), diff STATE.md limité à 3 lignes frontmatter.

Pattern à améliorer pour les prochains plans : `git add` doit explicitement lister uniquement les fichiers de la tâche, jamais inclure STATE.md dans un commit de tâche (STATE.md appartient au metadata final commit).

## User Setup Required

None — aucune configuration externe requise. Tous les changements sont code + markdown local.

## Next Phase Readiness

**Plan 06-02 (Composants UI + i18n locales)** peut démarrer immédiatement :
- `blogSchema` expose désormais `draft`, `wordCount`, `minutes` — `BlogCard.vue` pourra typer `article.minutes?: number` et faire `article.minutes ?? useReadingTime(article.description)` avec confiance.
- Le hook Nitro tournera dès le prochain `pnpm dev` (cache déjà supprimé : `node_modules/.cache/content` + `.nuxt` rm'd).
- `useReadingTime` est auto-importé (convention Nuxt `use*`) — prêt à l'emploi dans templates et scripts.
- `countWordsInMinimalBody` est auto-importé dans les plugins Nitro via `~/utils/countWords` (vérifié par le commit du plugin et typecheck).

**Plan 06-03 (Listing `/blog`)** pourra filtrer les drafts via `queryCollection('blog_fr').where('draft', '=', false)` — comme `test-kotlin-syntax.md` est draft, le listing affichera l'empty state D-16 (comportement voulu, tant qu'aucun article Hytale seed n'est ajouté en Phase 8).

**Plan 06-04 (Article chrome)** pourra afficher `{{ page.minutes }}` dans le header article sans calcul client, et utiliser `queryCollectionItemSurroundings` pour prev/next (le filter draft dans `surround` viendra à ce plan-là).

Aucun blocker. Typecheck vert, cache nettoyé.

## Self-Check: PASSED

**Files exist:**
- FOUND: `content.config.ts` (modified, contient les 3 nouveaux champs Zod)
- FOUND: `app/utils/countWords.ts` (34 lignes, export `countWordsInMinimalBody`)
- FOUND: `server/plugins/reading-time.ts` (23 lignes, hook `content:file:afterParse`)
- FOUND: `app/composables/useReadingTime.ts` (17 lignes, export `useReadingTime`)
- FOUND: `content/fr/blog/test-kotlin-syntax.md` (241 lignes, `^draft: true$`)
- FOUND: `content/en/blog/test-kotlin-syntax.md` (241 lignes, `^draft: true$`)

**Commits exist:**
- FOUND: `6b4935e` (feat 06-01: schema)
- FOUND: `63d0173` (feat 06-01: countWords util)
- FOUND: `5397390` (feat 06-01: reading-time plugin)
- FOUND: `dd9ce6e` (feat 06-01: useReadingTime composable)
- FOUND: `f1d89ea` (chore 06-01: drafts)

**Typecheck:** `pnpm typecheck` → exit 0 après chaque tâche, pas d'erreur TS introduite.

**Acceptance criteria (all tasks):**
- Task 1.1 : `grep -c "draft: z.boolean().optional().default(false)" content.config.ts` = 1 ✓, `grep -c "wordCount: z.number().optional()"` = 1 ✓, `grep -c "minutes: z.number().optional()"` = 1 ✓, collections préservées ✓
- Task 1.2 : fichier existe ✓, export unique ✓, skip code/pre présent ✓, zero import ✓
- Task 1.3 : defineNitroPlugin ✓, hook content:file:afterParse ✓, countWordsInMinimalBody appelé ✓, Math.max(1, Math.ceil(wordCount / 200)) ✓, guard .md ✓
- Task 1.4 : export `useReadingTime` ✓, 2× Math.max(1, Math.ceil ✓, split/filter(Boolean) ✓, signature number|string ✓
- Task 1.5 : `^draft: true$` dans chaque fichier = 1 ✓, titre préservé ✓, pas de doublon draft: ✓, corps markdown intact (240 → 241 lignes = +1 frontmatter uniquement)

---
*Phase: 06-blog-pages*
*Plan: 01*
*Completed: 2026-04-22*
