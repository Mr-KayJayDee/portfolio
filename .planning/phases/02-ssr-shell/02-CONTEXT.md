# Phase 2: SSR Shell - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Chaque route rend la bonne langue (FR/EN), le bon thème (dark/light), et les bonnes métadonnées SEO côté serveur — confirmé par `curl` sans JavaScript. Le header et footer sont en place avec navigation responsive. Aucune page de contenu n'est construite (Phase 3).

</domain>

<decisions>
## Implementation Decisions

### Header & Navigation
- **D-01:** Barre horizontale classique — logo à gauche, liens de navigation alignés à droite, toggles langue/thème à l'extrémité droite
- **D-02:** Navigation mobile via UDrawer latéral (Nuxt UI v3) — bouton hamburger ouvre un drawer glissant depuis la gauche avec liens + toggles
- **D-03:** Header sticky permanent (fixe en haut au scroll)
- **D-04:** Switch langue = bouton texte simple FR/EN (toggle au clic), pas de dropdown ni drapeaux

### Footer
- **D-05:** Footer minimaliste — une seule bande : copyright © 2026 Killian Dalcin + icônes réseaux sociaux (GitHub, LinkedIn, Fiverr)

### i18n SSR
- **D-06:** Enrichir les fichiers existants fr.json/en.json avec les clés navigation, footer et SEO — un seul fichier par langue
- **D-07:** Config @nuxtjs/i18n déjà en place : strategy prefix_except_default, FR par défaut, détection navigateur + cookie

### Thème dark/light
- **D-08:** Dark mode par défaut pour les nouveaux visiteurs (cohérent avec l'ancien site)
- **D-09:** Persistance cookie via @nuxtjs/color-mode, pas de localStorage, pas de FOUC

### SEO & Métadonnées
- **D-10:** useSeoMeta() par route — title, description, og:title, og:description uniques
- **D-11:** JSON-LD sur la page d'accueil : schéma Person + ProfessionalService pour Killian Dalcin
- **D-12:** og:image dynamique via nuxt-og-image (initialement prévu SEOV2-01, avancé à Phase 2)

### Sitemap
- **D-13:** Toutes les pages publiques incluses dans le sitemap sauf la 404
- **D-14:** Alternates hreflang FR/EN automatiques via intégration @nuxtjs/sitemap + @nuxtjs/i18n

### Layout global
- **D-15:** Default layout Nuxt : header + slot + footer
- **D-16:** Largeur max du contenu : max-w-7xl (1280px), centré

### Design system
- **D-17:** Couleur primaire conservée : #85cb85 (vert menthe) — identité visuelle du site actuel
- **D-18:** Secondaires adaptées selon la règle 60-30-10 : 60% dominant (backgrounds), 30% secondaire (cartes, sections), 10% accent (#85cb85 pour CTA, liens, highlights)
- **D-19:** Règles design à respecter : contraste WCAG 4.5:1 minimum texte, palette 3-5 couleurs max, tester en niveaux de gris
- **D-20:** Tokens Nuxt UI v3 personnalisés dans app.config.ts pour mapper la palette

### Claude's Discretion
- Choix des icônes pour le toggle thème (soleil/lune) et les réseaux sociaux
- Animation/transition du toggle thème
- Espacement et padding internes du layout

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project & Requirements
- `.planning/REQUIREMENTS.md` — Requirements I18N-01 à I18N-05, THEME-01 à THEME-03, SEO-01 à SEO-04, COMP-05, COMP-06
- `.planning/ROADMAP.md` — Phase 2 success criteria (5 critères curl-based)
- `.planning/phases/01-foundation/01-CONTEXT.md` — Décisions Phase 1 (structure données, composables, images)

### Codebase existant (référence pour migration)
- `src/components/layout/AppHeader.vue` — Header actuel à migrer
- `src/components/layout/AppFooter.vue` — Footer actuel à migrer
- `src/assets/main.css` — Variables CSS actuelles (--color-primary: #85cb85)
- `src/locales/en.ts` et `src/locales/fr.ts` — Traductions source à migrer vers JSON
- `src/composables/useTheme.ts` — Logique thème actuelle (localStorage → cookie)
- `src/composables/useSeo.ts` — Logique SEO actuelle (DOM direct → useSeoMeta)

### Configuration Nuxt en place
- `nuxt.config.ts` — Modules déjà configurés : @nuxt/ui, @nuxtjs/i18n, @nuxtjs/sitemap, nuxt-gtag, @nuxt/image
- `app/locales/fr.json` et `app/locales/en.json` — Fichiers i18n Nuxt actuels à enrichir

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/layout/AppHeader.vue` — Structure navigation, liens, toggles à migrer vers composants Nuxt UI v3
- `src/components/layout/AppFooter.vue` — Structure footer avec réseaux sociaux à simplifier
- `src/config/site.ts` — siteConfig avec liens sociaux, contact info, SEO defaults
- `app/locales/fr.json` et `en.json` — Fichiers i18n déjà en place avec clés projets

### Established Patterns
- Nuxt 4 avec `app/` directory, auto-imports, compatibilityVersion 4
- @nuxtjs/i18n configuré prefix_except_default, FR défaut, cookie
- Composables Nuxt natifs (useProjects déjà migré)
- Données statiques dans `app/data/` avec clés i18n

### Integration Points
- `app/app.vue` — Point d'entrée pour le default layout
- `nuxt.config.ts` — Ajouter @nuxtjs/color-mode et nuxt-og-image aux modules
- `app.config.ts` — Tokens Nuxt UI v3 (couleur primaire, thème)
- `app/layouts/default.vue` — À créer : header + slot + footer

</code_context>

<specifics>
## Specific Ideas

- **Couleur primaire #85cb85** — vert menthe, identité visuelle à conserver absolument
- **Règle 60-30-10** pour la distribution des couleurs — l'utilisateur a fourni un guide complet sur la théorie des couleurs à appliquer
- **Accessibilité WCAG** — ratio contraste 4.5:1 minimum, jamais rouge/vert seuls comme indicateurs

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-ssr-shell*
*Context gathered: 2026-04-08*
