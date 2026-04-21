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
result: issue
reported: "both empty page, nav and footer there but no content — Vue warn: Component <Anonymous> is missing template or render function at <RouteProvider key=\"/fr/blog/test-kotlin-syntax\">. <main> SSR renders empty: `<main class=\"flex-1\"><!--[--><!----><!--]--></main>`. Same behavior FR and EN."
severity: major

### 7. Collections @nuxt/content configurées
expected: Le fichier `content.config.ts` définit `blog_fr` et `blog_en`. `queryCollection('blog_fr')` retourne les articles FR. Vérifiable via le bon rendu de `/test` (qui query `blog_fr`).
result: issue
reported: "/test donne 404. Route `/test` supprimée/déplacée par commit 7cd1531 'fix(05): update test.vue path to /fr/blog prefix' — donc plus de page showcase standalone, et les routes blog prefixées elles-mêmes sont cassées (cf Test 6)."
severity: major

## Summary

total: 7
passed: 5
issues: 2
pending: 0
skipped: 0
blocked: 0

## Gaps

- truth: "Les articles FR/EN du blog doivent se rendre au chemin `/fr/blog/test-kotlin-syntax` et `/en/blog/test-kotlin-syntax` avec le contenu markdown dans `<main>`."
  status: failed
  reason: "User reported: both empty page, nav and footer there but no content. Vue warn in SSR log: Component <Anonymous> is missing template or render function at <RouteProvider key=\"/fr/blog/test-kotlin-syntax\">. <main class=\"flex-1\"> rendered empty. Non-blocking i18n baseUrl warning also present but unrelated. Same behavior both locales."
  severity: major
  test: 6
  artifacts: []
  missing: []

- truth: "La page query `blog_fr` doit être routable (historiquement `/test`, depuis commit 7cd1531 déplacée sous `/fr/blog`) et rendre le contenu markdown."
  status: failed
  reason: "User reported: /test donne 404. Le commit 7cd1531 a migré test.vue vers le préfixe /fr/blog, mais les routes prefixées sont elles-mêmes cassées (cf gap Test 6)."
  severity: major
  test: 7
  artifacts: []
  missing: []
