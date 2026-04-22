---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Plan 07-04 shipped — endpoint Nitro /api/__sitemap__/urls bilingue (draft-filtered, alternates hreflang x-default), validé curl /sitemap.xml
last_updated: "2026-04-22T12:00:00.000Z"
last_activity: 2026-04-22
progress:
  total_phases: 8
  completed_phases: 4
  total_plans: 15
  completed_plans: 14
  percent: 93
---

# Project State

## Project Reference

- PROJECT.md: .planning/PROJECT.md
- REQUIREMENTS.md: .planning/REQUIREMENTS.md
- ROADMAP.md: .planning/ROADMAP.md

## Current Focus

Phase: Phase 7 — SEO Blog
Plan: 07-03 (next — Wave 2, blog index/tags SEO)
Status: Plan 07-04 shipped — endpoint Nitro sitemap bilingue (draft-filtered + hreflang x-default), SEO-12 complet
Last activity: 2026-04-22
Resume file: .planning/phases/07-seo-blog/07-03-PLAN.md

## Accumulated Context

- M1 complet — déployé en production sur killiandalcin.fr (phases 1–4)
- Stack : Nuxt 4 SSR + Nuxt UI v3 + Tailwind v4 + pnpm + @nuxt/content v3
- Phase 5 shipped: @nuxt/content installé, collections bilingues `blog_fr`/`blog_en`, composants MDC (ProseImg, Alert, ProsePre, Columns, Details, Badge, Video, Clear), Shiki single github-dark, `app/pages/blog/[slug].vue` rend les articles FR/EN
- **Gotchas Phase 5 (à retenir)** :
  - Catch-all `[...slug].vue` + `@nuxtjs/i18n` strategy `prefix` → page component résout à `{}` (Vue warn: missing template). Fix : single-segment `[slug].vue`.
  - `queryCollection(variable)` pas analysable par le Vite extractor de @nuxt/content → utiliser toujours des littéraux `queryCollection('blog_fr')` / `queryCollection('blog_en')`.
  - `i18n.baseUrl` requis pour `useLocaleHead` (SEO tags). Ne pas retirer.
  - Redirection langue-détectée sans langue dans l'URL : `detectBrowserLanguage.redirectOn: 'no prefix'` + `fallbackLocale`. Éviter les `routeRules` `/blog/**` hardcodés (cassent le slug + bloquent la détection navigateur).
- Objectif double : ranker sur "Hytale plugin developer" ET capter trafic longue traîne via contenu communauté
- Articles bilingues : structure FR/EN dans content/ (ex: content/fr/blog/, content/en/blog/)
- og:image par article : image frontmatter ou fallback branded — jamais l'og-image.png générique M1
- **Plan 06-01 shipped (2026-04-22)** : blogSchema étendu (draft.default(false) + wordCount.optional + minutes.optional), Nitro hook `content:file:afterParse` injecte wordCount+minutes (200 wpm, floor 1 min) sur chaque `.md` via `countWordsInMinimalBody`, composable fallback `useReadingTime(number|string)` auto-importé, articles `test-kotlin-syntax.md` (FR+EN) marqués `draft: true` — exclus des listings `where('draft', '=', false)` mais accessibles par URL directe. Cache `node_modules/.cache/content` + `.nuxt` vidés.
- **Gotcha 06-01** : Le hook `content:file:afterParse` exige que `wordCount`/`minutes` soient déclarés dans le schema Zod (`.optional()` sans default) sinon ils sont strippés avant persistance DB — les propriétés injectées par hook ne sont queryables que si le schema les expose.
- **Gotcha 06-01 (convention)** : Dans un plugin Nitro, importer depuis `app/utils/` se fait via `~/utils/...` (et non `~~/app/utils/...`). Nuxt 4 mappe `~/` → `app/` par défaut. Vérifié par typecheck vert sur server/plugins/reading-time.ts.
- **Plan 06-02 shipped (2026-04-22)** : i18n `nav.blog` + 3 clés `a11y.blog*` (avec interpolation `{title}`) + bloc `blog.*` 14 clés (title, subtitle, stats.*, readingTime, prevArticle/nextArticle, backToBlog, toc.title, emptyState.*, breadcrumb.*) ajoutés dans fr.json + en.json. AppHeader.vue navLinks : `{ key: 'blog', path: '/blog' }` inséré entre hytale et projects (ligne 11, ordre D-15 respecté). `app/components/BlogCard.vue` créé (192 lignes, auto-importé Nuxt) : variant `default` (listing) avec cover conditional + tag UBadge + date Intl.DateTimeFormat + h2 + description line-clamp-2 + reading-time (minutes hook || useReadingTime fallback) + extra tags pills + full-card NuxtLink SEO + Schema.org BlogPosting markup ; variant `compact` (prev/next, D-09/D-10) : no image + label row avec UIcon arrow directionnelle + h3 + date + NuxtLink aria-label interpolé `a11y.blogPrev`/`a11y.blogNext`. Typecheck exit 0.
- **Gotcha 06-02 (slug derivation)** : Les articles @nuxt/content ont un `path` de forme `/fr/blog/my-slug`. Dans BlogCard.vue, on extrait le slug via `article.path.split('/').filter(Boolean).pop()` puis on reconstruit `localePath('/blog/' + slug)` — locale-agnostique. Évite de demander un champ `slug` explicite dans le frontmatter (cohérent convention @nuxt/content : path dérivé du nom de fichier).
- **Plan 07-02 shipped (2026-04-22)** : `app/utils/resolve-og-image.ts` (préfixe https://killiandalcin.fr + fallback /og-blog-default.jpg) + `public/og-blog-default.jpg` (placeholder copié depuis og-image.png — design branded 1200×630 en follow-up backlog) + `app/pages/blog/[slug].vue` enrichi : imports KILLIAN_PERSON_ID+resolveOgImage, useAsyncData altExists (détecte pair bilingue FR/EN), computeds ogImage/canonicalUrl/publishedIso/modifiedIso/inLanguageTag, useSeoMeta étendu 5→14 clés (D-15 complet : ogImage, ogUrl, ogLocale, ogLocaleAlternate conditionnel, twitterCard, twitterImage, articlePublishedTime, articleModifiedTime, articleAuthor string[]), useSchemaOrg([defineArticle {author/publisher @id=#killian}, defineBreadcrumb 3 items]). Curl /fr/blog/{slug} valide : og:image absolu, article:published_time, JSON-LD Article + BreadcrumbList.
- **Plan 07-04 shipped (2026-04-22)** : `server/api/__sitemap__/urls.ts` (76 lignes) — `defineSitemapEventHandler` (auto-import @nuxtjs/sitemap v8) avec `Promise.all([queryCollection(event,'blog_fr'), queryCollection(event,'blog_en')]).where('draft','=',false).order('date','DESC').select('path','date','updated').all()`. Map<slug,{fr?,en?}> pour détecter paires bilingues → alternates [fr, en, x-default→FR] si bilingue, sinon []. lastmod = updated ?? date. Validé curl : endpoint JSON valide, sitemap XML multi-sitemap mode (fr-FR.xml + en-US.xml) contient bien les URLs /blog/{slug} avec hreflang x-default, drafts absents. SEO-12 requirement complete.
- **Gotcha 07-04 (queryCollection import)** : `pnpm typecheck` (vue-tsc) ne résout pas l'auto-import Nitro de `queryCollection` dans server/ — il prend la signature client `(collection)` et râle `TS2554 Expected 1, got 2`. Fix : `import { queryCollection } from '@nuxt/content/server'` (même runtime, signature Nitro `(event, collection)` correctement typée). Aussi : `defineSitemapEventHandler` est un auto-import @nuxtjs/sitemap, PAS un export de `#imports` — ne pas importer explicitement.
- **Gotcha 07-02 (typings nuxt-schema-org)** : `defineArticle.inLanguage` inféré `ComputedRef<MaybeFalsy<'fr-FR'>>` (narrow) refuse une union `'fr-FR' | 'en-US'`. Cast localisé `as unknown as ComputedRef<'fr-FR'>` suffit — runtime émet correctement les deux valeurs selon locale. `articleAuthor` de useSeoMeta attend `string[]`, pas `string` (packaging @unhead récent).
