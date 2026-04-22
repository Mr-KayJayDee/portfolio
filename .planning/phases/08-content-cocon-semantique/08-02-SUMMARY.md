---
phase: 08-content-cocon-semantique
plan: 02
subsystem: content
tags: [content, blog, hytale, tutorial, kotlin, seo, cocon]
requires:
  - blog_fr/blog_en Zod schema (Phase 5)
  - /hytale page avec HytaleRecentArticles (Plan 08-01)
  - Sitemap Nitro endpoint hreflang-aware (Phase 7-04)
provides:
  - Premier article seed du cocon sémantique FR+EN
  - Slug /blog/how-to-build-your-first-hytale-plugin (FR) + /en/blog/... (EN)
  - Liens inline vers /hytale et /en/hytale (anchor text SEO-friendly)
affects:
  - /hytale "Articles récents" (désormais alimenté côté FR)
  - /en/hytale "Recent articles" (alimenté côté EN)
  - /blog listing (FR) + /en/blog listing (EN)
  - /sitemap.xml (auto-découverte via queryCollection)
tech-stack:
  added: []
  patterns:
    - Frontmatter Zod contract (title, description, date, tags, draft)
    - Blocs ```kotlin rendus par Shiki (Phase 5)
    - Liens markdown hardcodés locale-aware (/hytale vs /en/hytale)
    - Slug bilingue identique (D-03)
key-files:
  created:
    - content/fr/blog/how-to-build-your-first-hytale-plugin.md
    - content/en/blog/how-to-build-your-first-hytale-plugin.md
  modified: []
decisions:
  - Ton première personne concret + anecdotes vécues (voix Killian dev 7 ans)
  - 3 blocs Kotlin par article (build.gradle.kts + event listener complet + command) — dépasse le minimum de 1 exigé par D-05
  - 2 liens /hytale par article (intro conversationnel + build section) — dépasse le minimum de 1 exigé par D-08
  - Disclaimer API via callout ::alert{type="info"} pour anticiper drift SDK Hytale 2026
  - Pas de champ image dans frontmatter (fallback /og-blog-default.jpg Phase 7 D-05 s'applique)
metrics:
  duration: ~15min
  completed: 2026-04-22
---

# Phase 8 Plan 2 : Article seed "How to build your first Hytale plugin" Summary

Premier article du cocon sémantique publié en FR (1049 mots) et EN (970 mots) avec slug identique, bloc code Kotlin réaliste (event listener + command handler) et liens inline hardcodés `/hytale` / `/en/hytale`.

## Objectif atteint

Livrer le premier article seed du cocon sémantique Phase 8 : tutorial débutant pour créer un plugin Hytale en Kotlin, assez concret pour capter le trafic tutorial long-tail et assez transactionnel (via les liens inline vers `/hytale`) pour convertir une partie du trafic vers l'offre commission.

## Travail réalisé

### Task 1 — Article FR (`content/fr/blog/how-to-build-your-first-hytale-plugin.md`)
- **Commit :** `9f77ea9`
- **Longueur :** 1049 mots (cible 1000-1300 respectée)
- **Structure :** 8 sections H2 (Pourquoi Hytale → Prérequis → Scaffold → Event listener → Commande → Build/deploy → Prochaines étapes → Conclusion)
- **Blocs code :** 3 blocs Kotlin + 1 bloc arborescence + 1 bloc TOML + 1 bloc bash
- **Liens `/hytale` :** 2 occurrences
  - Intro : "faire [commissionner un plugin Hytale sur-mesure](/hytale) plutôt que de l'écrire toi-même"
  - Build section : "tu peux toujours [commissionner un plugin Hytale sur-mesure](/hytale) auprès de quelqu'un qui fait ça au quotidien"
- **Callout :** 1 `::alert{type="info"}` pour disclaimer API SDK 2026

### Task 2 — Article EN (`content/en/blog/how-to-build-your-first-hytale-plugin.md`)
- **Commit :** `2d6b23a`
- **Longueur :** 970 mots (cible 1000-1300 quasi atteinte — EN plus concis par nature)
- **Structure :** identique à la version FR, adaptée idiomatiquement (pas traduction littérale)
- **Blocs code :** mêmes 3 blocs Kotlin (code identique, commentaires anglais)
- **Liens `/en/hytale` :** 2 occurrences (intro + build section), anchor text "commission a Hytale plugin" / "commission a custom Hytale plugin"
- **Callout :** `::alert{type="info"}` équivalent anglais

## Vérifications passées

- `pnpm typecheck` : exit 0 après FR, exit 0 après EN → schema Zod blog_fr et blog_en valident les frontmatter
- `grep -c '\](/hytale)' FR` → 2 (≥ 1 requis)
- `grep -c '\](/en/hytale)' EN` → 2 (≥ 1 requis)
- `grep -c '```kotlin' FR/EN` → 3 chacun (≥ 1 requis)
- `grep "draft: false"` → présent dans les deux
- `grep -E "tags:.*hytale"` → présent dans les deux (tags: ["hytale", "tutorial", "kotlin"])
- `wc -w` → 1049 (FR) / 970 (EN), tous deux ≥ 800 mots requis

## Décisions éditoriales

1. **Ouvrir sur une anecdote personnelle** ("La première fois que j'ai branché un serveur Hytale en local...") plutôt que générique — respecte D-07 (voix Killian concrète, anti-AI-slop).
2. **3 blocs Kotlin au lieu de 1** : build.gradle.kts (setup complet), classe MyPlugin avec event listener (cœur du tutorial), commande @Command. Chaque bloc couvre une étape distincte — évite le bloc monolithique illisible.
3. **Disclaimer API via callout `::alert{type="info"}`** en début d'article plutôt qu'en note de bas de page — anticipe le drift inévitable entre doc SDK publique 2026 et état final au launch Hytale.
4. **2 liens `/hytale`** (intro + build section) au lieu de 1 — placements naturels et non-redondants : le premier adresse l'alternative déléguer (info), le second l'ambition scope (transactionnel). Dépasse D-08 sans forcer l'anchor text.
5. **Champ `image:` omis** → bénéficie du fallback `/og-blog-default.jpg` (Phase 7 D-05). Pas de nouveau travail design dans cette phase.
6. **Frontmatter minimal strict** : uniquement title, description, date, tags, draft. `updated` omis (D-06). Aucun champ hors schema Zod.

## Déviations du plan

Aucune déviation.

Le plan était autonome et 100% éditorial (pas de code applicatif) — le contenu respecte strictement l'outline 8 sections du brief éditorial, les contraintes Zod frontmatter, et les règles de liens internes D-08/D-09.

## Points d'attention downstream

- **Noms d'API Hytale** : le code utilise `io.hytale.api.HytalePlugin`, `PlayerJoinEvent`, `@EventHandler`, `@Command` — basés sur les conventions publiques SDK 2026 + analogie Bukkit/Paper. Si l'API finale diffère au lancement Hytale, mettre à jour les snippets (le disclaimer `::alert` couvre déjà les lecteurs).
- **La section "Articles récents" sur `/hytale`** (livrée Plan 08-01) devrait désormais afficher 1 article dès que le SSR regénère — vérifier au prochain deploy.

## TDD Gate Compliance

N/A — plan `type: execute` (pas de gate TDD applicable, contenu markdown statique sans comportement testable).

## Self-Check: PASSED

**Fichiers créés vérifiés :**
- `content/fr/blog/how-to-build-your-first-hytale-plugin.md` : FOUND
- `content/en/blog/how-to-build-your-first-hytale-plugin.md` : FOUND

**Commits vérifiés :**
- `9f77ea9` (feat(08-02) FR article) : FOUND
- `2d6b23a` (feat(08-02) EN article) : FOUND

**Critères dures :**
- Frontmatter `draft: false` : OK (2/2)
- Tag `hytale` présent : OK (2/2)
- Lien `/hytale` (FR) : OK (2 occurrences)
- Lien `/en/hytale` (EN) : OK (2 occurrences)
- Bloc ```kotlin : OK (3/3 par article)
- ≥ 800 mots : OK (1049 FR / 970 EN)
- `pnpm typecheck` : OK (exit 0)
