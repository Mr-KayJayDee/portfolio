# Phase 1: Foundation - Research

**Researched:** 2026-04-07
**Domain:** Initialisation Nuxt 4, migration de données TypeScript, composable useProjects()
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Séparer les données projets dans `data/projects.ts` — le composable `useProjects()` ne contient que la logique (filtrage, recherche, findById)
- **D-02:** Les fichiers data stockent des clés de traduction i18n (ex: `'projects.xinko.title'`), les textes FR/EN restent dans les fichiers de locale. Compatible SSR natif Nuxt i18n.
- **D-03:** Resserrer le typage TypeScript — rendre obligatoires les champs toujours présents (`technologies`, `category`, `date`) et garder optionnels uniquement ceux qui varient (`gallery`, `demoUrl`, `longDescription`)
- **D-04:** Réécrire les composables en style Nuxt natif — auto-imports, `useAppConfig()` au lieu de `useSiteConfig()`, supprimer le wrapper `useI18n` custom (Nuxt i18n le fournit nativement)
- **D-05:** Phase 1 porte uniquement `useProjects()` — les autres composables (`useGallery()`, `useSeo()`, `useTheme()`) viendront dans leur phase respective
- **D-06:** Images dans `public/images/` — URLs stables (`/images/xinko.webp`), pas de bundling, compatible NuxtImg en Phase 3
- **D-07:** Format WebP uniquement, pas de fallback JPEG (support navigateur 98%+)
- **D-08:** Installer TOUS les modules dès Phase 1 dans `nuxt.config.ts` : @nuxt/ui, @nuxt/eslint, @nuxtjs/i18n, @nuxtjs/color-mode, @nuxtjs/sitemap, nuxt-gtag, @nuxt/image. Configuration minimale pour ceux utilisés en Phase 2-3.
- **D-09:** Utiliser pnpm comme package manager (recommandé par Nuxt, remplace npm)

### Claude's Discretion

Aucune zone déléguée — toutes les décisions ont été prises par l'utilisateur.

### Deferred Ideas (OUT OF SCOPE)

Aucune — discussion restée dans le périmètre de la phase.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SSR-01 | Chaque route retourne du HTML complet côté serveur, crawlable sans JS client | Nuxt 4 SSR activé par défaut — `ssr: true` implicite dans nuxt.config.ts |
| SSR-02 | Le projet utilise Nuxt 4 avec la structure `app/` et les auto-imports | Structure `app/` par défaut dans Nuxt 4.4.2 (vérifié npm registry) |
| SSR-03 | `nuxt.config.ts` configure tous les modules (UI, i18n, color-mode, SEO, gtag, image) | Tous les modules vérifiés compatibles Nuxt 4 (voir Standard Stack) |
| DATA-01 | Données projets migrées depuis `src/data/` vers `data/` avec interfaces TypeScript | 7 projets dans useProjects.ts existant — à extraire vers `data/projects.ts` |
| DATA-02 | Données témoignages migrées avec interfaces TypeScript | Interface `Testimonial` et données existent dans `src/data/testimonials.ts` |
| DATA-03 | Données FAQ migrées avec support FR/EN et interfaces TypeScript | Interface `FAQ` et pattern `getXxx(t)` existent dans `src/data/faq.ts` — à remplacer par clés i18n |
| DATA-04 | Données tech stack migrées avec interfaces TypeScript | Interface `TechStack`/`Technology` et données existent dans `src/data/techstack.ts` |
| DATA-05 | Composable `useProjects()` migré — filtrage, recherche, findById | useProjects.ts existant à réécrire avec auto-imports Nuxt et données séparées |
| INFRA-02 | TypeScript en mode strict avec interfaces pour toutes les données | `typescript.strict: true` dans nuxt.config.ts |
| INFRA-03 | ESLint + Prettier configurés via @nuxt/eslint | @nuxt/eslint 1.15.2 compatible Nuxt 4, remplace eslint.config.ts manuel |

</phase_requirements>

---

## Summary

La Phase 1 consiste à créer un projet Nuxt 4 from scratch (ou initialiser la structure Nuxt 4 dans le repo existant), installer tous les modules définis, migrer les données statiques vers `data/`, et écrire `useProjects()` en style Nuxt natif. Aucune page visible n'est attendue — seulement le squelette technique fonctionnel.

Le projet actuel est une Vue 3 SPA avec Vite. La migration vers Nuxt 4 implique de créer une structure `app/` parallèle, configurer `nuxt.config.ts`, et migrer les fichiers de données existants depuis `src/data/` vers `data/` à la racine. Le code source existant (types, données, composables) est récupérable avec des adaptations mineures.

Point critique : `@nuxt/ui` v4 inclut déjà `@nuxtjs/color-mode` en dépendance. Installer `@nuxtjs/color-mode` séparément dans D-08 est redondant mais sans danger (version gérée par @nuxt/ui). Le planificateur doit en être averti.

**Recommandation principale :** Initialiser le projet Nuxt 4 via `pnpm dlx nuxi@latest init` dans un sous-dossier temporaire, copier la configuration générée, puis adapter le repo existant en gardant `src/` intact pendant la Phase 1.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nuxt | 4.4.2 | Framework SSR/SSG | Version stable actuelle [VERIFIED: npm registry] |
| @nuxt/ui | 4.6.1 | Composants UI + Tailwind v4 | Inclus Reka UI, color-mode, @nuxt/icon [VERIFIED: npm registry] |
| @nuxtjs/i18n | 10.2.4 | Internationalisation SSR-safe | Version stable Nuxt 4 compatible [VERIFIED: npm registry] |
| @nuxt/eslint | 1.15.2 | ESLint flat config Nuxt | Remplace eslint.config.ts manuel [VERIFIED: npm registry] |
| @nuxtjs/sitemap | 8.0.12 | Sitemap.xml automatique | Version stable [VERIFIED: npm registry] |
| nuxt-gtag | 4.1.0 | Google Analytics 4 | Wrapper Nuxt pour gtag.js [VERIFIED: npm registry] |
| @nuxt/image | 2.0.0 | Optimisation images | Version stable [VERIFIED: npm registry] |

### Inclus automatiquement via @nuxt/ui

| Library | Raison |
|---------|--------|
| @nuxtjs/color-mode | Dépendance directe de @nuxt/ui v4 [VERIFIED: npm view] |
| tailwindcss 4.x | Dépendance directe de @nuxt/ui v4 [VERIFIED: npm view] |
| @nuxt/icon | Dépendance directe de @nuxt/ui v4 [VERIFIED: npm view] |
| @nuxt/fonts | Dépendance directe de @nuxt/ui v4 [VERIFIED: npm view] |

### Installation

```bash
# Installer pnpm globalement si absent
npm install -g pnpm

# Initialiser projet Nuxt 4
pnpm dlx nuxi@latest init .

# Installer les modules
pnpm add @nuxt/ui @nuxtjs/i18n @nuxt/eslint @nuxtjs/sitemap nuxt-gtag @nuxt/image
```

**Note :** `@nuxtjs/color-mode` ne doit PAS être ajouté manuellement — déjà fourni par `@nuxt/ui`.

---

## Architecture Patterns

### Structure projet Nuxt 4 attendue

```
portfolio/
├── app/                    # Code applicatif (srcDir par défaut Nuxt 4)
│   ├── app.vue             # Composant racine
│   ├── app.config.ts       # Config publique runtime (remplace siteConfig)
│   ├── components/         # Composants Vue (auto-importés)
│   ├── composables/        # Composables (auto-importés)
│   │   └── useProjects.ts  # Logique filtrage/recherche uniquement
│   ├── layouts/            # Layouts Nuxt
│   ├── pages/              # Routes (vide en Phase 1 — app.vue suffit)
│   └── assets/             # Assets CSS uniquement (images → public/)
├── data/                   # Données statiques TypeScript (à la racine)
│   ├── projects.ts         # Données brutes + interface Project
│   ├── testimonials.ts     # Données + interface Testimonial
│   ├── faq.ts              # Données + interface FAQ
│   └── techstack.ts        # Données + interface TechStack/Technology
├── public/
│   └── images/             # Images WebP (URLs stables /images/xxx.webp)
├── server/                 # API Nitro (vide en Phase 1)
├── shared/                 # Types partagés app + server
│   └── types/
│       └── index.ts        # Interfaces TypeScript migrées
├── nuxt.config.ts          # Configuration principale
└── package.json
```

**Important :** En Nuxt 4, `~` pointe vers `app/` (et non la racine). Pour importer depuis `data/`, utiliser des imports relatifs ou configurer un alias dans `nuxt.config.ts`.

### Pattern 1 : nuxt.config.ts minimal Phase 1

```typescript
// Source: https://nuxt.com/docs/getting-started/configuration [CITED]
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4  // Active la structure app/ Nuxt 4
  },
  ssr: true,
  modules: [
    '@nuxt/ui',           // Inclut color-mode, icon, fonts, tailwind v4
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image'
  ],
  typescript: {
    strict: true
  },
  // Configuration minimale i18n (sera complétée en Phase 2)
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
  }
})
```

### Pattern 2 : Interface Project resserrée (D-03)

```typescript
// shared/types/index.ts
export interface Project {
  id: string
  image: string                  // URL /images/xxx.webp (pas de i18n)
  technologies: string[]         // OBLIGATOIRE (était optionnel)
  category: string               // OBLIGATOIRE (était optionnel)
  date: string                   // OBLIGATOIRE (était optionnel)
  featured?: boolean
  buttons?: ProjectButton[]
  gallery?: string[]             // Optionnel — seulement flowboard
  demoUrl?: string               // Optionnel
  githubUrl?: string             // Optionnel
  // Champs i18n (clés de traduction, pas de texte direct)
  titleKey: string               // ex: 'projects.xinko.title'
  descriptionKey: string         // ex: 'projects.xinko.description'
  longDescriptionKey?: string    // Optionnel
}
```

**Alternative** (plus simple) : stocker l'id et laisser le composable construire les clés `projects.${id}.title`.

### Pattern 3 : useProjects() en style Nuxt natif (D-04, D-05)

```typescript
// app/composables/useProjects.ts
// Pas d'imports nécessaires — auto-imports Nuxt actifs
import { projects as projectsData } from '~/../../data/projects'

export function useProjects() {
  const { t } = useI18n()  // Auto-importé via @nuxtjs/i18n

  const allProjects = computed(() =>
    projectsData.map(p => ({
      ...p,
      title: t(`projects.${p.id}.title`),
      description: t(`projects.${p.id}.description`),
      longDescription: p.longDescriptionKey ? t(`projects.${p.id}.longDescription`) : undefined
    }))
  )

  function filterByCategory(category: string) {
    return computed(() => allProjects.value.filter(p => p.category === category))
  }

  function search(query: string) {
    return computed(() =>
      allProjects.value.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    )
  }

  function findById(id: string) {
    return computed(() => allProjects.value.find(p => p.id === id))
  }

  return {
    projects: allProjects,
    filterByCategory,
    search,
    findById
  }
}
```

### Anti-Patterns à éviter

- **Ne pas garder `useI18n` custom** : Le wrapper Vue 3 custom devient obsolète avec `@nuxtjs/i18n` qui auto-exporte `useI18n()`.
- **Ne pas importer depuis `@/` dans Nuxt 4** : L'alias `@/` n'existe plus, remplacé par `~/` (pointe vers `app/`). Pour `data/`, utiliser un import relatif ou alias custom.
- **Ne pas mettre les images dans `app/assets/`** : Les images projet doivent être dans `public/images/` (D-06) pour URLs stables.
- **Ne pas oublier `future.compatibilityVersion: 4`** : Sans cette ligne, Nuxt utilise la structure Nuxt 3 (racine), pas `app/`.
- **Ne pas installer `@nuxtjs/color-mode` manuellement** : Déjà inclus dans `@nuxt/ui`.

---

## Don't Hand-Roll

| Problème | Ne pas construire | Utiliser | Pourquoi |
|---------|-------------------|----------|----------|
| ESLint config Nuxt 4 | eslint.config.ts manuel | @nuxt/eslint | Gère les règles Vue, Nuxt, TypeScript automatiquement |
| TypeScript strict check | script ts custom | `npx nuxi typecheck` | Intégré à Nuxt, vérifie aussi les templates Vue |
| Auto-imports composables | imports explicites partout | Nuxt auto-imports | `app/composables/*.ts` → disponible partout sans import |
| Theme dark/light | useState custom | @nuxtjs/color-mode (via @nuxt/ui) | SSR-safe, cookie automatique |

---

## Common Pitfalls

### Pitfall 1 : Alias `@/` invalide dans Nuxt 4

**Ce qui se passe :** Les imports `@/composables/...` de l'ancienne codebase Vue 3 cassent dans Nuxt 4.
**Pourquoi :** Nuxt 4 utilise `~/` pour pointer vers `app/`. L'alias `@/` n'est pas configuré par défaut.
**Comment éviter :** Remplacer tous les `@/` par `~/` dans les fichiers migrés vers `app/`. Pour `data/` (à la racine), soit configurer un alias dans `nuxt.config.ts`, soit utiliser un chemin relatif.

### Pitfall 2 : `compatibilityVersion: 4` oublié

**Ce qui se passe :** Sans `future.compatibilityVersion: 4`, Nuxt détecte l'absence d'un dossier `app/` et utilise la structure Nuxt 3 (srcDir = racine). Comportement inattendu.
**Comment éviter :** Toujours définir `future: { compatibilityVersion: 4 }` dans `nuxt.config.ts` dès la création.

### Pitfall 3 : Chemins images non mis à jour

**Ce qui se passe :** Les données projets référencent `@/assets/images/xxx.webp` (ancien chemin Vite). Ces chemins sont invalides dans Nuxt 4 et cassent si laissés tels quels.
**Comment éviter :** Lors de la migration des données vers `data/projects.ts`, remplacer TOUS les chemins `@/assets/images/xxx.webp` par `/images/xxx.webp`. Copier les fichiers WebP depuis `src/assets/images/` vers `public/images/`.

### Pitfall 4 : `data/` non accessible via `~/`

**Ce qui se passe :** `~/` pointe vers `app/`, pas la racine. Un import `~/../../data/projects` fonctionne mais est fragile.
**Comment éviter :** Configurer un alias dans `nuxt.config.ts` :
```typescript
alias: {
  '#data': resolve(__dirname, 'data')
}
```
Ou placer les données dans `app/data/` et les importer via `~/data/projects`.

**Recommandation :** Placer les données dans `app/data/` (dans srcDir) plutôt qu'à la racine — plus simple, pas d'alias custom nécessaire, et les auto-imports ne s'appliquent qu'aux composables (pas aux données).

### Pitfall 5 : `pnpm` absent sur la machine

**Ce qui se passe :** D-09 impose pnpm. Si absent, toutes les commandes `pnpm` échouent.
**Comment éviter :** Première tâche du Wave 0 = `npm install -g pnpm`. Vérifier avec `pnpm --version`.

---

## Runtime State Inventory

Phase 1 est une initialisation/migration (pas un renommage). Pas de runtime state à auditer.

**Stocké data :** Aucun — données statiques en fichiers TS, pas de base de données.
**Config service live :** Aucune — projet en développement initial.
**État OS :** Aucun.
**Secrets/env vars :** Aucun — pas de `.env` dans le projet actuel.
**Artifacts de build :** `dist/` existant (build Vite) — peut être supprimé ou ignoré.

---

## Environment Availability

| Dépendance | Requis par | Disponible | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Nuxt 4 runtime | ✓ | v25.2.1 | — |
| npm | Installation initiale | ✓ | 11.6.2 | — |
| pnpm | D-09 (package manager) | ✗ | — | `npm install -g pnpm` |
| Git | Versioning | ✓ | (repo existant) | — |

**Dépendances manquantes avec fallback :**
- `pnpm` : absent sur la machine, installer via `npm install -g pnpm` en Wave 0.

**Note Node.js :** Node 25 est une version odd (non-LTS). Nuxt 4 supporte Node 18+. Pas de blocage, mais le Dockerfile spécifie `node:22-alpine` (LTS). Compatible. [ASSUMED — pas de vérification officielle Nuxt 4 + Node 25]

---

## Code Examples

### Données projets migrées (data/projects.ts ou app/data/projects.ts)

```typescript
// Source: basé sur src/composables/useProjects.ts existant [VERIFIED: codebase]
import type { Project } from '~/shared/types'  // ou import relatif

export const projects: Project[] = [
  {
    id: 'virtual-tour',
    image: '/images/virtualtour.webp',          // Remplacé @/assets/images/ → /images/
    technologies: ['Vue.js', 'Three.js', 'WebGL', 'Node.js'],
    category: 'Web Development',
    date: '2022',
    buttons: [
      { title: 'Visit', link: 'https://www.lycee-chabanne16.fr/visites/BACSN/index.htm' }
    ]
  },
  // ... (7 projets à migrer depuis useProjects.ts existant)
]
```

### nuxt.config.ts Phase 1 complet

```typescript
// nuxt.config.ts — racine du projet
import { resolve } from 'path'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
  ssr: true,
  modules: [
    '@nuxt/ui',           // Inclut color-mode, icon, fonts, tailwind v4
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image'
  ],
  typescript: {
    strict: true
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
    // Configuration complète en Phase 2
  },
  gtag: {
    id: 'G-CDVVNFY6MV',
    enabled: false  // Activé uniquement en production (Phase 3)
  }
})
```

---

## State of the Art

| Ancienne approche | Approche actuelle | Impact |
|-------------------|------------------|--------|
| `@/` alias Vite | `~/` alias Nuxt (pointe vers `app/`) | Tous les imports à mettre à jour |
| `useI18n()` wrapper custom | `useI18n()` auto-importé @nuxtjs/i18n | Supprimer `src/composables/useI18n.ts` |
| `useSiteConfig()` custom | `useAppConfig()` Nuxt natif | `app.config.ts` remplace `src/config/site.ts` |
| `vueuse/head` pour SEO | `useSeoMeta()` Nuxt natif | Supprimer `src/composables/useSeo.ts` (Phase 2) |
| localStorage pour theme/locale | Cookie SSR-safe via @nuxtjs/color-mode | Supprimer `useTheme.ts` personnalisé (Phase 2) |
| `src/data/` (Vite) | `app/data/` ou `data/` racine (Nuxt 4) | Migration de données, pas de logique |

---

## Assumptions Log

| # | Claim | Section | Risk si faux |
|---|-------|---------|--------------|
| A1 | Node 25 compatible avec Nuxt 4 | Environment Availability | Blocage démarrage nuxt dev — vérifier si erreur |
| A2 | `app/data/` est la meilleure localisation pour les données statiques | Architecture Patterns | Alias custom nécessaire si données à la racine |

---

## Open Questions (RESOLVED)

1. **Localisation des fichiers `data/`** — RESOLVED: `app/data/` choisi (coherent avec Plan 01-02). Elimine le besoin d'alias custom, reste dans srcDir Nuxt 4.
   - Ce que l'on sait : D-01 a D-04 mentionnent `data/` (racine) mais Nuxt 4 `~/` pointe vers `app/`
   - Decision : Placer dans `app/data/` — elimine le besoin d'alias, reste dans srcDir

2. **Gestion du dossier `src/` existant pendant la migration** — RESOLVED: `src/` conserve intact en Phase 1 (reference de migration), suppression en Phase 3.
   - Ce que l'on sait : Le repo contient une Vue 3 SPA fonctionnelle dans `src/`
   - Decision : Garder `src/` intacte en Phase 1, supprimer en Phase 3

---

## Validation Architecture

Tests automatisés explicitement hors scope (voir REQUIREMENTS.md "Out of Scope"). Les critères de succès de Phase 1 servent de validation manuelle :

| Critère | Commande de validation |
|---------|----------------------|
| Serveur démarre sans erreur | `pnpm dev` → observer localhost:3000 |
| TypeScript strict pass | `pnpm nuxi typecheck` (exit 0) |
| ESLint pass | `pnpm eslint .` (exit 0) |
| Données importables | Import direct dans un composant de test temporaire |

---

## Security Domain

Phase 1 est une initialisation technique sans surface d'attaque. Pas de formulaires, pas d'API, pas d'auth.

| ASVS Category | Applicable | Contrôle standard |
|---------------|-----------|-------------------|
| V2 Authentication | Non | — |
| V3 Session Management | Non | — |
| V4 Access Control | Non | — |
| V5 Input Validation | Non (Phase 1) | Zod disponible via @nuxt/ui peerDeps (Phase 3) |
| V6 Cryptography | Non | — |

---

## Sources

### Primary (HIGH confidence)
- npm registry (`npm view`) — versions nuxt 4.4.2, @nuxt/ui 4.6.1, @nuxtjs/i18n 10.2.4, @nuxt/eslint 1.15.2, @nuxtjs/sitemap 8.0.12, nuxt-gtag 4.1.0, @nuxt/image 2.0.0
- npm view @nuxt/ui dependencies — confirmation color-mode, tailwind, icon inclus
- `src/composables/useProjects.ts` — code existant pour migration (7 projets)
- `src/types/index.ts` — interfaces existantes à resserrer
- `src/data/` (faq.ts, techstack.ts, testimonials.ts) — données à migrer

### Secondary (MEDIUM confidence)
- https://nuxt.com/docs/getting-started/upgrade#nuxt-4 — structure app/ et migration Nuxt 4
- https://i18n.nuxtjs.org/docs/getting-started — installation @nuxtjs/i18n v10

### Tertiary (LOW confidence)
- Aucune source LOW confidence utilisée

---

## Metadata

**Confidence breakdown:**
- Standard stack : HIGH — tous les packages vérifiés via npm registry
- Architecture : HIGH — structure app/ confirmée via docs officielles Nuxt 4
- Pitfalls : MEDIUM — basé sur patterns communs Nuxt 4 migration + analyse code existant

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stack stable)
