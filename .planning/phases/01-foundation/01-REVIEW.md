---
phase: 01-foundation
reviewed: 2026-04-08T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - nuxt.config.ts
  - app/app.vue
  - app/pages/index.vue
  - shared/types/index.ts
  - eslint.config.mjs
  - app/data/projects.ts
  - app/data/testimonials.ts
  - app/data/faq.ts
  - app/data/techstack.ts
  - app/composables/useProjects.ts
findings:
  critical: 1
  warning: 4
  info: 3
  total: 8
status: issues_found
---

# Phase 01 : Rapport de revue de code

**Revue effectuée le :** 2026-04-08
**Profondeur :** standard
**Fichiers analysés :** 10
**Statut :** Problemes detectes

## Résumé

La fondation Nuxt 4 est structurellement saine : le mode SSR est activé, TypeScript strict est configuré, le système de types partagés est cohérent, et le composable `useProjects` suit les bonnes pratiques Composition API. Cependant, plusieurs problèmes méritent attention avant de passer aux phases suivantes.

Le problème le plus critique concerne une clé Google Analytics hardcodée dans `nuxt.config.ts`, directement exposée dans le dépôt public. Les avertissements portent principalement sur la configuration i18n incomplète (stratégie et chemins de locale manquants), un risque de fuite de traduction silencieuse dans `useProjects`, une incohérence de données dans `techstack.ts`, et l'absence de `lang` sur le `<html>` racine. Les points d'information concernent des données en dur en anglais dans les fichiers de données, la configuration ESLint minimale, et la cohérence de la catégorie `socials` dans `TechStack`.

---

## Problemes critiques

### CR-01 : Identifiant Google Analytics hardcoded dans le dépôt

**Fichier :** `nuxt.config.ts:22`
**Problème :** L'identifiant de tracking `G-CDVVNFY6MV` est codé en dur directement dans le fichier de configuration versionné. Bien que `enabled: false` en dev, ce tracking ID est exposé publiquement dans l'historique git et le code source.

**Correction :**
```ts
// nuxt.config.ts
gtag: {
  id: process.env.NUXT_GTAG_ID ?? '',
  enabled: process.env.NODE_ENV === 'production'
}
```
Ajouter `NUXT_GTAG_ID=G-CDVVNFY6MV` dans `.env` (non versionné) et `.env.example` (versionné, sans valeur réelle).

---

## Avertissements

### WR-01 : Configuration i18n incomplète — stratégie et chemins de locale manquants

**Fichier :** `nuxt.config.ts:17-20`
**Problème :** La configuration i18n ne spécifie ni `strategy` ni `langDir`/`locales` avec les chemins de fichiers de traduction. Sans `strategy`, `@nuxtjs/i18n` v9 utilise `'prefix_except_default'` par défaut, ce qui peut provoquer des redirections inattendues et des problèmes de crawl SEO si la stratégie souhaitée est différente. Sans les chemins de fichiers, le module ne peut pas charger les traductions, rendant `useProjects` silencieusement cassé (les clés i18n retournent les clés brutes).

**Correction :**
```ts
i18n: {
  strategy: 'prefix_except_default', // ou 'no_prefix' selon la stratégie choisie
  defaultLocale: 'fr',
  locales: [
    { code: 'fr', language: 'fr-FR', file: 'fr.json' },
    { code: 'en', language: 'en-US', file: 'en.json' },
  ],
  langDir: 'locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
}
```
Note : le CLAUDE.md impose la persistance par cookie uniquement (pas de localStorage), ce que `detectBrowserLanguage.useCookie: true` respecte.

---

### WR-02 : Fuite silencieuse de clé i18n dans `useProjects`

**Fichier :** `app/composables/useProjects.ts:16`
**Problème :** Si la clé `projects.${p.id}.longDescription` n'existe pas dans les fichiers de locale, `t()` retourne la clé brute (ex. `"projects.virtual-tour.longDescription"`) — une chaîne truthy. La condition `|| undefined` ne s'active donc jamais pour les clés manquantes, et `longDescription` se retrouve peuplée avec la clé elle-même au lieu de `undefined`.

```ts
longDescription: t(`projects.${p.id}.longDescription`) || undefined,
// Si la clé n'existe pas, t() retourne la clé brute — chaîne non vide → jamais undefined
```

**Correction :**
```ts
import { useI18n } from '#i18n'

// Dans le computed :
const rawLong = t(`projects.${p.id}.longDescription`)
longDescription: rawLong === `projects.${p.id}.longDescription` ? undefined : rawLong,
```
Ou, préférablement, utiliser `te()` (translation exists) :
```ts
longDescription: te(`projects.${p.id}.longDescription`)
  ? t(`projects.${p.id}.longDescription`)
  : undefined,
```

---

### WR-03 : `Bootstrap` et `Tailwind CSS` mal classés dans la catégorie `database`

**Fichier :** `app/data/techstack.ts:28-29`
**Problème :** `Bootstrap` (ligne 28) et `Tailwind CSS` (ligne 29) sont placés dans le tableau `database` au lieu de `front`. Ce sont des frameworks CSS/UI — leur présence dans `database` est une erreur de classification qui affectera l'affichage des compétences sur le portfolio.

**Correction :** Déplacer ces deux entrées dans le tableau `front` :
```ts
front: [
  // ... entrées existantes ...
  { name: 'Bootstrap', level: 'Intermediate', image: '/images/bootstrap.webp' },
  { name: 'Tailwind CSS', level: 'Intermediate', image: '/images/tailwindcss.webp' },
],
database: [
  { name: 'MongoDB', level: 'Advanced', image: '/images/mongodb.webp' },
  { name: 'MySQL', level: 'Advanced', image: '/images/mysql.webp' },
  { name: 'Redis', level: 'Advanced', image: '/images/redis.webp' },
  { name: 'SQLite', level: 'Advanced', image: '/images/sqlite.webp' },
  { name: 'PostgreSQL', level: 'Advanced', image: '/images/postgresql.webp' },
],
```

---

### WR-04 : Attribut `lang` absent sur l'élément racine HTML

**Fichier :** `app/app.vue:2`
**Problème :** En SSR avec `@nuxtjs/i18n`, l'attribut `lang` sur `<html>` est normalement injecté automatiquement si la configuration i18n est complète (voir WR-01). Mais l'`app.vue` actuel ne définit aucun `useHead` de base ni `<Html lang="...">`. Si la configuration i18n reste incomplète, les pages seront servies sans `lang` — ce qui est un échec d'accessibilité (WCAG 3.1.1) et nuit au SEO.

**Correction :** Ajouter un fallback dans `app.vue` :
```vue
<script setup lang="ts">
const { locale } = useI18n()
useHead({
  htmlAttrs: { lang: locale },
})
</script>
```

---

## Informations

### IN-01 : Données textuelles en anglais dans les fichiers de données (non-i18n)

**Fichier :** `app/data/projects.ts:92-97`, `app/data/testimonials.ts:11,25`
**Problème :** Les `features` du projet `flowboard` et certains `results` des témoignages sont en anglais hardcodé, alors que le pattern prévu est de résoudre les textes via des clés i18n. Les `features` ne font pas partie de l'`Omit` et ne sont pas documentées comme devant être i18n. A clarifier si c'est intentionnel ou un oubli.

**Suggestion :** Si ces champs doivent être bilingues, les déplacer vers les fichiers de locale. Sinon, documenter explicitement qu'ils sont en anglais uniquement.

---

### IN-02 : `socials` dans `TechStack` — sémantique discutable

**Fichier :** `shared/types/index.ts:35`, `app/data/techstack.ts:61-71`
**Problème :** La catégorie `socials` dans `TechStack` utilise le type `Technology` avec un champ `level`, ce qui n'a pas de sens pour des plateformes sociales (Discord, Instagram...). Afficher un "niveau" sur une plateforme sociale sur un portfolio professionnel peut prêter à confusion.

**Suggestion :** Soit créer un type dédié `SocialLink` (qui existe déjà dans CLAUDE.md), soit supprimer le champ `level` pour cette catégorie via un type union.

---

### IN-03 : ESLint minimal — aucune règle Vue/TypeScript activée explicitement

**Fichier :** `eslint.config.mjs:1-3`
**Problème :** La configuration ESLint délègue entièrement à `withNuxt()` sans aucune surcharge. Les règles essentielles du projet (no `any`, no `console.log`, conventions de nommage) ne sont pas enforced. C'est fonctionnel mais fragile.

**Suggestion :** Ajouter au minimum les règles critiques du projet :
```js
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
})
```

---

_Revue effectuée le 2026-04-08_
_Revieweur : Claude (gsd-code-reviewer)_
_Profondeur : standard_
