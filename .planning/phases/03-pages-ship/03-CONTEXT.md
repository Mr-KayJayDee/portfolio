# Phase 3: Pages & Ship - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Toutes les 8 pages du portfolio sont construites avec contenu réel, les composants interactifs fonctionnent (galerie modale, formulaire contact, FAQ accordion), EmailJS envoie les emails, GA4 est actif en production, et le Dockerfile SSR est prêt pour le déploiement via Traefik.

</domain>

<decisions>
## Implementation Decisions

### Page d'accueil (Landing)
- **D-01:** 6 sections conservées : Hero → Projets vedettes → Services → Témoignages → FAQ → CTA final
- **D-02:** Hero texte seul (titre + sous-titre + 3 boutons CTA), pas d'image ni animation
- **D-03:** 3 projets vedettes sur la landing (ceux avec `featured: true` dans les données)

### Page Projects
- **D-04:** Filtres = barre de recherche texte + boutons catégorie (Web, Bot, Plugin, etc.) — comme l'actuel

### Galerie modale images
- **D-05:** UModal + UCarousel (composants Nuxt UI v3 natifs) pour la galerie
- **D-06:** Bande de thumbnails cliquables sous l'image principale
- **D-07:** Navigation clavier conservée : flèches gauche/droite + Escape pour fermer

### Formulaire contact
- **D-08:** 3 champs seulement : Nom, Email, Message — friction minimale
- **D-09:** Validation Zod côté client avant envoi
- **D-10:** Feedback via UToast (notification Nuxt UI) en haut à droite — succès ou erreur
- **D-11:** Envoi via EmailJS (plugin côté client, clés dans runtimeConfig)

### Dockerfile & déploiement
- **D-12:** SSR avec Node.js — node:22-alpine build + node:22-alpine runtime, copie `.output/`
- **D-13:** Variables d'environnement via runtimeConfig (NUXT_PUBLIC_*) — pas de rebuild pour changer les valeurs
- **D-14:** docker-compose.yml existant avec Traefik — mettre à jour le port loadbalancer de 80 vers 3000
- **D-15:** GA4 via nuxt-gtag, activé uniquement en production via runtimeConfig

### Pages restantes (About, Fiverr, Formation, 404)
- **D-16:** Migration fidèle des pages existantes depuis src/views/ — mêmes sections et contenu, composants Nuxt UI
- **D-17:** Page About : bio + tech stack badges (TechBadge.vue à migrer)
- **D-18:** Page Fiverr : hero + service cards + FAQ accordion (UAccordion) + CTA
- **D-19:** Page Formation : contenu formations comme l'actuel
- **D-20:** Page 404 : error.vue Nuxt avec message et lien retour accueil

### Claude's Discretion
- Design exact des cards projets, services, témoignages
- Animations et transitions entre pages/sections
- Espacement, tailles de police, responsive breakpoints
- Structure interne des composants (découpage en sous-composants)
- Ordre des tâches d'implémentation et découpage en plans

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Projet & Requirements
- `.planning/REQUIREMENTS.md` — Requirements PAGE-01 à PAGE-08, COMP-01 à COMP-04, INFRA-01, INFRA-04
- `.planning/ROADMAP.md` — Phase 3 success criteria (5 critères)
- `.planning/phases/02-ssr-shell/02-CONTEXT.md` — Décisions Phase 2 (design system, layout, couleurs)

### Pages source (migration reference)
- `src/views/HomePage.vue` — Structure landing : 6 sections
- `src/views/ProjectsPage.vue` — Liste projets avec filtres
- `src/views/ProjectDetailPage.vue` — Détail projet + galerie
- `src/views/AboutPage.vue` — Bio + tech stack
- `src/views/ContactPage.vue` — Formulaire + infos contact
- `src/views/FiverrPage.vue` — Landing services Fiverr
- `src/views/FormationPage.vue` — Page formations

### Composants source (migration reference)
- `src/components/sections/HeroSection.vue` — Hero avec CTA buttons
- `src/components/sections/FeaturedProjectsSection.vue` — Projets vedettes
- `src/components/sections/ServicesSection.vue` — Services cards
- `src/components/sections/CTASection.vue` — CTA final
- `src/components/GalleryModal.vue` — Galerie modale actuelle (custom)
- `src/components/ProjectCard.vue` — Card projet
- `src/components/TestimonialsSection.vue` — Témoignages
- `src/components/ServiceFAQ.vue` — FAQ accordion
- `src/components/FiverrHero.vue` — Hero Fiverr
- `src/components/FiverrServiceCard.vue` — Cards services Fiverr
- `src/components/TechBadge.vue` — Badge technologie
- `src/components/ContactMethod.vue` — Méthode de contact

### Données migrées
- `app/data/projects.ts` — Projets avec interfaces TypeScript
- `app/data/testimonials.ts` — Témoignages
- `app/data/faq.ts` — FAQ
- `app/data/techstack.ts` — Stack technique

### Infrastructure
- `docker-compose.yml` — Config Traefik existante (port à mettre à jour)
- `Dockerfile` — Dockerfile actuel à réécrire pour SSR
- `src/config/site.ts` — Configuration site (contacts, réseaux sociaux)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `app/composables/useProjects.ts` — Composable projets déjà migré avec filtrage et recherche
- `app/data/*.ts` — 4 fichiers de données statiques déjà migrés avec interfaces TypeScript
- `i18n/locales/fr.json` et `en.json` — 500+ clés de traduction incluant contenu pages
- `app/components/layout/AppHeader.vue` et `AppFooter.vue` — Layout déjà en place
- `app/layouts/default.vue` — Layout par défaut header + slot + footer

### Established Patterns
- Nuxt 4 avec `app/` directory, auto-imports, compatibilityVersion 4
- Nuxt UI v3 pour tous les composants (UButton, UCard, UModal, UAccordion, UForm, UInput, UTextarea, UToast)
- useSeoMeta() par route pour les métadonnées SEO
- Couleur primaire brand #85cb85 via CSS @theme + app.config.ts
- i18n via useI18n() avec clés localisées

### Integration Points
- Pages stubs dans `app/pages/` (index, projects, about, contact, fiverr, formation) — à enrichir
- Route dynamique à créer : `app/pages/project/[id].vue`
- `error.vue` à créer à la racine de `app/`
- nuxt.config.ts gtag config à activer avec runtimeConfig
- Dockerfile à réécrire complètement

</code_context>

<specifics>
## Specific Ideas

- Galerie avec thumbnails cliquables — l'utilisateur veut pouvoir naviguer visuellement entre les images
- Formulaire contact minimaliste (3 champs) — friction minimale pour maximiser les conversions
- Déploiement existant via Traefik avec TLS wildcard sur killiandalcin.fr

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-pages-ship*
*Context gathered: 2026-04-08*
