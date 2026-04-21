---
status: testing
phase: 05-nuxt-content-setup-renderer
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md]
started: 2026-04-21T00:00:00.000Z
updated: 2026-04-21T00:00:00.000Z
---

## Current Test

number: 3
name: Images optimisées via NuxtImg
expected: |
  Sur `/test`, l'image référencée dans l'article est visible (pas de 404).
  L'élément DOM rendu est `<img>` avec attribut `loading="lazy"`.
awaiting: user response

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
expected: Les articles de test existent pour FR et EN. Naviguer vers `/blog/test-kotlin-syntax` (FR) et `/en/blog/test-kotlin-syntax` (EN) — les deux pages chargent sans 404.
result: [pending]

### 7. Collections @nuxt/content configurées
expected: Le fichier `content.config.ts` définit `blog_fr` et `blog_en`. `queryCollection('blog_fr')` retourne les articles FR. Vérifiable via le bon rendu de `/test` (qui query `blog_fr`).
result: [pending]

## Summary

total: 7
passed: 0
issues: 0
pending: 7
skipped: 0
blocked: 0

## Gaps

[none yet]
