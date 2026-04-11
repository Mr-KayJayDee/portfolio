# Phase 2: Content - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Un visiteur comprend immediatement que Killian est dev Hytale, peut voir les services/prix, et lire des temoignages clients. Cela couvre : refonte hero homepage, creation page /hytale avec pricing, affichage temoignages sur 2 pages, et mise a jour du positionnement site.ts.

</domain>

<decisions>
## Implementation Decisions

### Hero & Messaging
- **D-01:** H1 = "Hytale Plugin Developer" — positionnement niche direct, pas de titre generique
- **D-02:** CTAs = Discord (profil personnel pour l'instant, a changer si serveur cree) + Contact
- **D-03:** Badge "Available for projects" → passer en i18n (FR: "Disponible pour vos projets")
- **D-04:** Sous-titre angle benefice client : "Des plugins performants et sur-mesure pour votre serveur Hytale"
- **D-05:** Layout hero = garder le grid 2 colonnes (texte gauche, placeholder/illustration droite)
- **D-06:** Pas d'image pour l'instant cote droit — placeholder en attendant des assets Hytale
- **D-07:** Lien Discord = profil personnel existant dans site.ts (provisoire)

### Claude's Discretion (Hero)
- Stats/chiffres cles dans le hero : Claude decide si pertinent pour la conversion

### Page Hytale & Pricing
- **D-08:** Page /hytale avec 4 sections : hero dedie Hytale, services/expertise, grille tarifaire, temoignages
- **D-09:** 4-5 tiers de pricing : plugin simple / complexe / sur-mesure / maintenance / web (comme CONT-03)
- **D-10:** Prix en mode mix : prix fixes pour simple/maintenance, sur devis pour complexe/sur-mesure
- **D-11:** CTA de chaque tier = "Demander un devis" → redirige vers /contact
- **D-12:** Pas de demos — Hytale est sorti (janvier 2026), mais pas d'assets a montrer pour l'instant

### Temoignages
- **D-13:** Garder les 5 temoignages Fiverr existants tels quels (Minecraft/Discord = transferable)
- **D-14:** Pas de nouveaux temoignages Hytale a ajouter pour l'instant
- **D-15:** Homepage : 2-3 featured en carousel. Page /hytale : tous les 5 en carousel avec plus de details
- **D-16:** Corriger totalReviews : le vrai nombre est 5, pas 10 ni 50
- **D-17:** Format d'affichage = carousel/slider sur les deux pages

### Transition de Positionnement
- **D-18:** Positionnement Hytale-first, web secondaire — homepage et branding centres Hytale, services web restent accessibles mais pas mis en avant
- **D-19:** Toutes les pages existantes restent (about, projects, fiverr, contact), on ajoute /hytale
- **D-20:** siteConfig.title = "Killian' DAL-CIN - Hytale Plugin Developer | Freelance"
- **D-21:** jobTitle dans site.ts = "Hytale Plugin Developer" (SEO-05)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in:
- `.planning/REQUIREMENTS.md` — CONT-01, CONT-02, CONT-03, CONT-04, SEO-05
- `.planning/ROADMAP.md` §Phase 2 — success criteria and dependencies
- `.planning/codebase/STRUCTURE.md` — file locations and conventions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `HeroSection.vue` — hero existant avec grid 2 colonnes, a adapter (pas recreer)
- `TestimonialsSection.vue` — composant temoignages existant, reutilisable
- `ServicesSection.vue` — composant services existant sur homepage
- `ProjectCard.vue` — card component reutilisable
- `app/data/testimonials.ts` — 5 temoignages structures avec types
- `app/data/site.ts` — config site a mettre a jour (title, description, jobTitle)
- Nuxt UI v3 composants (UCard, UButton, etc.) pour le pricing grid

### Established Patterns
- Pages dans `app/pages/` avec auto-routing Nuxt
- Sections dans `app/components/sections/` composees dans les pages
- i18n via `useI18n()` + `i18n/locales/fr.json` et `en.json`
- Data statique typee dans `app/data/`
- Types dans `shared/types/index.ts`

### Integration Points
- Nouvelle page `app/pages/hytale.vue` (auto-routee en /hytale)
- Navigation AppHeader.vue — ajouter lien /hytale
- i18n keys a ajouter dans fr.json et en.json pour tout le nouveau contenu
- site.ts — mettre a jour title, description, ajouter jobTitle

</code_context>

<specifics>
## Specific Ideas

- Hytale est sorti depuis le 13 janvier 2026 — ce n'est pas un jeu a venir, c'est un jeu actif
- Les temoignages Minecraft/Discord servent de preuve de competence gaming transferable a Hytale
- Le Discord CTA pointe vers le profil personnel en attendant un eventuel serveur communautaire

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-content*
*Context gathered: 2026-04-11*
