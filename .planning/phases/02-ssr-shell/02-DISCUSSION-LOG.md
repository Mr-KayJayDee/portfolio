# Phase 2: SSR Shell - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 02-ssr-shell
**Areas discussed:** Header & navigation, Footer, i18n SSR, SEO & métadonnées, Thème dark/light, Layout global, Sitemap & hreflang, Design system

---

## Header & Navigation

### Navigation desktop

| Option | Description | Selected |
|--------|-------------|----------|
| Barre horizontale | Logo gauche, liens droite, toggles extrémité droite. Pattern portfolio classique. | ✓ |
| Centré avec logo | Logo centré, liens de chaque côté. Style plus créatif. | |

**User's choice:** Barre horizontale
**Notes:** Aucune

### Switch de langue

| Option | Description | Selected |
|--------|-------------|----------|
| Code texte FR/EN | Bouton toggle simple affichant le code langue | ✓ |
| Dropdown sélecteur | USelect avec liste des langues | |
| Drapeaux | Icônes drapeau cliquables | |

**User's choice:** Code texte FR/EN
**Notes:** Aucune

### Navigation mobile

| Option | Description | Selected |
|--------|-------------|----------|
| UDrawer latéral | Hamburger → drawer glissant avec liens + toggles | ✓ |
| Menu plein écran | Overlay plein écran, liens centrés en grand | |

**User's choice:** UDrawer latéral
**Notes:** Aucune

### Header sticky

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky permanent | Header fixe en haut pendant le scroll | ✓ |
| Sticky hide/show | Disparaît au scroll bas, réapparaît au scroll haut | |
| Statique | Défile avec la page | |

**User's choice:** Sticky permanent
**Notes:** Aucune

---

## Footer

| Option | Description | Selected |
|--------|-------------|----------|
| Minimaliste | Une bande : copyright + icônes réseaux sociaux | ✓ |
| Multi-colonnes | Colonnes Navigation, Contact, Social | |

**User's choice:** Minimaliste
**Notes:** Aucune

---

## i18n SSR

| Option | Description | Selected |
|--------|-------------|----------|
| Enrichir fichiers existants | Ajouter clés nav/footer/SEO dans fr.json et en.json | ✓ |
| Fichiers séparés par domaine | nav.json, footer.json, seo.json par langue | |

**User's choice:** Enrichir fichiers existants
**Notes:** Aucune

---

## SEO & métadonnées

### JSON-LD

| Option | Description | Selected |
|--------|-------------|----------|
| Person + ProfessionalService | Double schéma pour Knowledge Panel | ✓ |
| Person seul | Schéma simple | |

**User's choice:** Person + ProfessionalService
**Notes:** Aucune

### og:image

| Option | Description | Selected |
|--------|-------------|----------|
| Image statique unique | Une og:image générique dans public/ | |
| Image par page | Différentes og:image manuelles | |
| Génération dynamique (v2) | Via nuxt-og-image | ✓ |

**User's choice:** Génération dynamique via nuxt-og-image
**Notes:** Initialement prévu SEOV2-01, l'utilisateur a choisi de l'avancer à Phase 2

---

## Thème dark/light

| Option | Description | Selected |
|--------|-------------|----------|
| Dark | Thème sombre par défaut, cohérent avec l'ancien site | ✓ |
| Préférence système | Détecte prefers-color-scheme | |
| Light | Thème clair par défaut | |

**User's choice:** Dark
**Notes:** Aucune

---

## Layout global

| Option | Description | Selected |
|--------|-------------|----------|
| max-w-7xl / 1280px | Standard Tailwind, bon équilibre | ✓ |
| max-w-6xl / 1152px | Plus resserré | |
| Pleine largeur | Pas de max-width | |

**User's choice:** max-w-7xl / 1280px
**Notes:** Aucune

---

## Sitemap & hreflang

| Option | Description | Selected |
|--------|-------------|----------|
| Tout inclure sauf 404 | Toutes pages publiques + hreflang auto | ✓ |
| Exclure Fiverr/Formation | Pages secondaires exclues | |

**User's choice:** Tout inclure sauf 404
**Notes:** Aucune

---

## Design system

| Option | Description | Selected |
|--------|-------------|----------|
| Bleu/Indigo | Classique tech/dev | |
| Vert/Émeraude | Plus original | |
| Conserver couleurs actuelles | Reprendre palette du site Vue 3 | ✓ (adapté) |

**User's choice:** Garder la couleur primaire (#85cb85 vert menthe) et adapter les secondaires
**Notes:** L'utilisateur a fourni un guide complet sur la théorie des couleurs : règle 60-30-10, contraste WCAG 4.5:1, palette 3-5 couleurs max, schémas harmonieux, tester en niveaux de gris.

---

## Claude's Discretion

- Icônes toggle thème (soleil/lune)
- Animation/transition du toggle thème
- Espacement et padding internes du layout

## Deferred Ideas

Aucune — la discussion est restée dans le scope de la phase.
