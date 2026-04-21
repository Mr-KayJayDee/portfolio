---
status: complete
phase: 05-nuxt-content-setup-renderer
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md]
started: 2026-04-21T00:00:00.000Z
updated: 2026-04-21T21:30:00.000Z
---

## Current Test

[testing complete]

## Tests

### 1. Serveur démarre sans erreur
expected: `pnpm dev` lance Nuxt 4 sur :3000 sans erreur de console liée à @nuxt/content, SQLite ou @tailwindcss/typography. La page d'accueil se charge normalement.
result: pass

### 2. Blocs de code toujours dark
expected: Naviguer vers `/test`. Le bloc Kotlin affiché a un fond sombre (#0d1117) ET des tokens colorés — que ce soit en mode dark ou en mode light (toggle). En light mode, le fond du bloc reste sombre, pas blanc.
result: pass

### 3. Images optimisées via NuxtImg
expected: Sur `/test`, l'image référencée dans l'article est visible (pas de 404). Inspecter le DOM : l'élément rendu est `<img>` avec attribut `loading="lazy"`. ProseImg.vue est l'override utilisé.
result: pass

### 4. Tableau markdown avec prose styling
expected: Sur `/test`, le tableau markdown est rendu avec des bordures visibles, un en-tête distingué et une mise en forme prose correcte (pas du texte brut).
result: pass

### 5. Callouts Alert (4 types)
expected: Sur `/test`, les 4 callouts `::alert{type}` sont rendus comme des boîtes colorées avec icônes : info (bleu), warning (amber), tip (vert), danger (rouge).
result: pass

### 6. Articles bilingues accessibles
expected: Les articles de test existent pour FR et EN. Naviguer vers `/fr/blog/test-kotlin-syntax` (FR) et `/en/blog/test-kotlin-syntax` (EN) — les deux pages chargent sans 404.
result: pass
resolved_by: "127db8b — renamed [...slug].vue → [slug].vue (catch-all pattern broken with @nuxtjs/i18n v10 + Nuxt 4 prefix strategy) + literal queryCollection('blog_fr'/'blog_en') branches for static extractor. Verified via curl: FR + EN return 200 with full markdown content rendered in <main>."

### 7. Collections @nuxt/content configurées
expected: Le fichier `content.config.ts` définit `blog_fr` et `blog_en`. `queryCollection('blog_fr')` retourne les articles FR. Vérifiable via le bon rendu de `/test` (qui query `blog_fr`).
result: pass
resolved_by: "Fixed alongside Test 6 via 127db8b. `/fr/test` (i18n-prefixed version of test.vue) renders correctly and queries blog_fr. `/test` itself 404s by design under strategy: 'prefix' — all routes must be locale-prefixed. Unprefixed URL redirect to detected locale handled by detectBrowserLanguage.redirectOn: 'no prefix' + i18n.baseUrl."

## Summary

total: 7
passed: 7
issues: 0
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Les articles FR/EN du blog doivent se rendre au chemin `/fr/blog/test-kotlin-syntax` et `/en/blog/test-kotlin-syntax` avec le contenu markdown dans `<main>`."
  status: resolved
  reason: "User reported: both empty page, nav and footer there but no content. Vue warn in SSR log: Component <Anonymous> is missing template or render function at <RouteProvider key=\"/fr/blog/test-kotlin-syntax\">. <main class=\"flex-1\"> rendered empty. Non-blocking i18n baseUrl warning also present but unrelated. Same behavior both locales."
  severity: major
  test: 6
  root_cause: "Catch-all pattern [...slug].vue not registered by @nuxtjs/i18n v10 + Nuxt 4 under strategy: 'prefix' — page component resolved to {} causing the Vue warning. Secondary: queryCollection() with a dynamic variable is not picked up by @nuxt/content's static Vite extractor."
  resolved_by_commit: "127db8b"
  artifacts:
    - path: "app/pages/blog/[slug].vue"
      issue: "Renamed from [...slug].vue; queryCollection calls replaced with literal branches"
  missing: []

- truth: "La page query `blog_fr` doit être routable et rendre le contenu markdown."
  status: resolved
  reason: "User reported: /test donne 404. Le commit 7cd1531 a migré test.vue vers le préfixe /fr/blog, mais les routes prefixées sont elles-mêmes cassées (cf gap Test 6)."
  severity: major
  test: 7
  root_cause: "Symptom of same root cause as Test 6. `/test` 404 is by design under strategy: 'prefix'; the correct locale-prefixed route /fr/test renders blog_fr content correctly once the [slug] page fix is in place."
  resolved_by_commit: "127db8b"
  artifacts: []
  missing: []

- truth: "Accès `/blog/<slug>` sans prefix de langue doit rediriger (302) vers `/fr/blog/<slug>` ou `/en/blog/<slug>` selon la langue détectée du client, en préservant le slug."
  status: resolved
  reason: "Follow-up bug during UAT review: old hardcoded routeRules forced /blog/** → /fr/blog (slug lost, hard-coded FR). User wanted language-detected redirect."
  severity: minor
  test: post-uat
  root_cause: "nuxt.config.ts routeRules '/blog/**' → '/fr/blog' (301, slug-destructive, hardcoded) conflicted with i18n's detectBrowserLanguage which only redirected root ('/'). Also missing i18n.baseUrl caused SSR warn on SEO tag generation."
  resolved_by: "detectBrowserLanguage.redirectOn: 'no prefix' + fallbackLocale: 'fr' + baseUrl: 'https://killiandalcin.fr'; removed hardcoded /blog route rules. Verified via curl: Accept-Language: fr → 302 /fr/blog/<slug>, Accept-Language: en → 302 /en/blog/<slug>, slug preserved, cookie persisted."
  artifacts:
    - path: "nuxt.config.ts"
      issue: "i18n.detectBrowserLanguage + baseUrl; removed route rules"
  missing: []
