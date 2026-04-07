# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 01-foundation
**Areas discussed:** Structure données, Stratégie composables, Assets images, Modules Phase 1

---

## Structure des données

| Option | Description | Selected |
|--------|-------------|----------|
| Fichier data séparé | Créer data/projects.ts avec les données brutes, le composable ne fait que la logique | ✓ |
| Garder inline | Laisser les données dans le composable comme actuellement | |

**User's choice:** Fichier data séparé
**Notes:** —

| Option | Description | Selected |
|--------|-------------|----------|
| Clés i18n dans data | Les fichiers data stockent des clés de traduction, textes dans les locales | ✓ |
| Textes FR/EN inline | Stocker les textes directement avec objet { fr, en } | |
| Garder pattern t() | Conserver getXxx(t) comme actuellement | |

**User's choice:** Clés i18n dans data
**Notes:** —

| Option | Description | Selected |
|--------|-------------|----------|
| Resserrer | Rendre obligatoires les champs toujours présents | ✓ |
| Migrer tel quel | Copier les types sans changement | |
| Claude décide | Analyse des données réelles | |

**User's choice:** Resserrer
**Notes:** —

---

## Stratégie composables

| Option | Description | Selected |
|--------|-------------|----------|
| Style Nuxt natif | Réécrire pour auto-imports, useAppConfig(), supprimer useI18n custom | ✓ |
| Wrapper minimal | Copier avec minimum de changements | |
| Claude décide | Analyser chaque composable individuellement | |

**User's choice:** Style Nuxt natif
**Notes:** —

| Option | Description | Selected |
|--------|-------------|----------|
| Phase 1 : seulement useProjects | Porter uniquement useProjects() en Phase 1 | ✓ |
| Tout porter maintenant | Migrer tous les composables d'un coup | |

**User's choice:** Phase 1 : seulement useProjects
**Notes:** —

---

## Assets images

| Option | Description | Selected |
|--------|-------------|----------|
| public/ | Images dans public/images/, URLs stables, compatible NuxtImg | ✓ |
| assets/ | Images bundlées par Vite avec hash | |
| Claude décide | Choix selon contraintes | |

**User's choice:** public/
**Notes:** —

| Option | Description | Selected |
|--------|-------------|----------|
| WebP uniquement | Garder .webp partout, support 98%+ | ✓ |
| WebP + fallback JPEG | Prévoir fallbacks via <picture> | |

**User's choice:** WebP uniquement
**Notes:** —

---

## Modules Phase 1

| Option | Description | Selected |
|--------|-------------|----------|
| Tous en Phase 1 | Installer et configurer tous les modules dès le scaffold | ✓ |
| Progressif par phase | Ajouter module par module selon la phase | |
| Claude décide | Juger selon les dépendances | |

**User's choice:** Tous en Phase 1
**Notes:** —

| Option | Description | Selected |
|--------|-------------|----------|
| npm | Rester sur npm comme le projet actuel | |
| pnpm | Passer à pnpm comme recommandé par Nuxt | ✓ |

**User's choice:** pnpm
**Notes:** —

---

## Claude's Discretion

Aucune zone déléguée.

## Deferred Ideas

Aucune.
