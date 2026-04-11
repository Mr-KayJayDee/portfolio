---
phase: 2
slug: content
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-10
---

# Phase 2 — Content — UI Design Contract

> Contrat visuel et d'interaction pour la phase Content. Genere par gsd-ui-researcher, verifie par gsd-ui-checker.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | Nuxt UI v3 (UCard, UButton, UIcon, etc.) — source: CLAUDE.md |
| Preset | not applicable |
| Component library | Nuxt UI v3 (basé sur Radix primitives via reka-ui) |
| Icon library | Lucide via `i-lucide-*` (UIcon) — source: HeroSection.vue existant |
| Font | Inter ou system-ui (hérité de Nuxt UI v3 default) |

Note: shadcn non applicable — stack Nuxt 4 + Nuxt UI v3 + Tailwind v4.
Registry safety gate: non applicable (Nuxt UI v3 est la source officielle, pas de tiers).

---

## Spacing Scale

Déclaré (multiples de 4, aligné avec l'échelle Tailwind utilisée dans le codebase existant):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Gaps icônes, padding inline (gap-1, p-1) |
| sm | 8px | Espacement compact — badges, labels (gap-2, p-2) |
| md | 16px | Espacement default — padding cartes, champs (p-4, gap-4) |
| lg | 24px | Section padding interne — entre éléments de section (p-6, gap-6) |
| xl | 32px | Gaps layout — grilles pricing (gap-8) |
| 2xl | 48px | Séparations de sections majeures (py-12) |
| 3xl | 64px | Espacement page — sections hero/content (py-16 à py-24) |

Exceptions:
- Touch targets boutons CTA: min 44px de hauteur (`py-3` + hauteur de texte = ~44px OK)
- Carousel testimonials: padding horizontal -mx-4 px-4 conservé pour débordement visuel (pattern existant)
- Hero section: py-16 md:py-24 conservé tel quel (source: HeroSection.vue)

---

## Typography

Détectée dans le codebase existant — reproduire exactement ces valeurs:

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body / quote testimonial | 14px (text-sm) | 400 (regular) | 1.5 (leading-relaxed) |
| Label / meta / badge | 14px (text-sm) | 500 (medium) | 1.4 |
| Heading section (h2) | 30-48px responsif (text-3xl→text-5xl) | 700 (bold) | 1.2 |
| Display / H1 hero | 36-72px responsif (text-4xl→text-7xl) | 800 (extrabold) | 1.1 (tracking-tight) |

Règles supplémentaires:
- Accent décoratif mono: `font-mono text-sm` pour labels de section (ex: `// testimonials`, `// pricing`)
- Gradient text sur H1 et H2: `bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-400 bg-clip-text text-transparent` (pattern existant)
- Sous-titres de sections: `text-lg text-gray-500 dark:text-gray-400 leading-relaxed`
- Prix dans grille tarifaire: `text-3xl font-bold` pour le montant, `text-sm text-gray-500` pour la période/unité

---

## Color

Palette détectée dans `app/assets/css/main.css` + composants existants:

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `bg-white dark:bg-gray-950` | Fond page, sections principales |
| Secondary (30%) | `bg-gray-50 dark:bg-gray-900` / `bg-white/80 dark:bg-gray-900/60` | Cartes, terminal hero, cartes témoignages, cartes pricing |
| Accent (10%) | `brand-500` = `#85cb85` (vert) | Voir liste ci-dessous |
| Destructive | Non applicable dans cette phase — aucune action destructive |

Accent réservé exclusivement à:
1. Badge "Disponible pour vos projets" — fond `bg-brand-500/10`, texte `text-brand-700 dark:text-brand-400`
2. Curseur et highlight terminal hero — `bg-brand-500`, `text-brand-500`
3. Bouton CTA primaire — `bg-brand-500 hover:bg-brand-600`
4. Stats témoignages (chiffres) — gradient `from-brand-400 to-brand-600`
5. Hover border cartes testimonials/pricing — `hover:border-brand-500/40`
6. Étoiles rating: `text-yellow-400` (NON brand-500 — jaune uniquement pour étoiles)
7. Gradient H1 hero — `from-brand-500 via-brand-400 to-emerald-400`

Dark mode: systématiquement déclaré en paire `light dark:dark` sur chaque token de couleur.

---

## Composants Nuxt UI v3 — Inventaire Phase 2

| Composant | Usage | Props clés |
|-----------|-------|-----------|
| `UCard` | Cartes pricing, cartes témoignages page /hytale | `class` pour override padding |
| `UButton` | CTA "Demander un devis", CTA Discord, CTA Contact | `color="primary"` ou outline |
| `UBadge` | Badge "Disponible pour vos projets", badge tier pricing | `color`, `variant` |
| `UIcon` | Toutes icônes (i-lucide-*) | `name`, `class` pour taille |
| `UDivider` | Séparation entre stats témoignages | vertical |
| `NuxtLink` | Navigation interne — liens /contact, /hytale | `localePath()` obligatoire |
| `NuxtImg` | Avatars témoignages | `loading="lazy"`, `width`, `height` |

Pas de composant carousel natif Nuxt UI v3 — utiliser le pattern scroll horizontal existant (`overflow-x-auto snap-x snap-mandatory`) déjà en place dans TestimonialsSection.vue.

---

## Copywriting Contract

### Hero Homepage (refonte CONT-01)

| Element | FR | EN |
|---------|----|----|
| H1 | "Hytale Plugin Developer" (gradient sur les 2 derniers mots) | "Hytale Plugin Developer" |
| Sous-titre | "Des plugins performants et sur-mesure pour votre serveur Hytale" | "High-performance, custom plugins for your Hytale server" |
| Badge statut | "Disponible pour vos projets" | "Available for projects" |
| CTA primaire | "Rejoindre sur Discord" | "Join on Discord" |
| CTA secondaire | "Me contacter" | "Contact me" |
| Floating card stats | "50+ projets" / "Note 5.0" | "50+ projects" / "5.0 rating" |
| Terminal — role | `'Hytale Plugin Developer'` (remplace 'Full Stack Dev') | idem |

### Page /hytale — Hero dédié (CONT-02)

| Element | FR | EN |
|---------|----|----|
| Label mono | `// hytale` | `// hytale` |
| H1 | "Plugins Hytale sur-mesure" | "Custom Hytale Plugins" |
| Sous-titre | "Développement de plugins performants pour votre serveur Hytale, de la conception à la livraison." | "High-performance plugin development for your Hytale server, from design to delivery." |

### Grille Tarifaire — 5 tiers (CONT-03 / D-09 / D-10)

| Tier | FR label | EN label | Prix FR | Prix EN | CTA |
|------|----------|----------|---------|---------|-----|
| Plugin Simple | "Plugin Simple" | "Simple Plugin" | "À partir de 50€" | "From €50" | "Demander un devis" / "Request a quote" |
| Plugin Complexe | "Plugin Complexe" | "Complex Plugin" | "Sur devis" | "Custom quote" | "Demander un devis" / "Request a quote" |
| Sur-Mesure | "Développement Sur-Mesure" | "Custom Development" | "Sur devis" | "Custom quote" | "Demander un devis" / "Request a quote" |
| Maintenance | "Maintenance & Support" | "Maintenance & Support" | "À partir de 30€/mois" | "From €30/month" | "Demander un devis" / "Request a quote" |
| Web | "Développement Web" | "Web Development" | "Sur devis" | "Custom quote" | "Demander un devis" / "Request a quote" |

CTA universel pricing: "Demander un devis" → redirige `/contact` (source: D-11).

### Témoignages (CONT-04)

| Element | FR | EN |
|---------|----|----|
| Label mono section | `// témoignages` | `// testimonials` |
| Titre section | (existant — conserver, passer en i18n si hardcodé) | (existant) |
| Stat — clients | "avis clients" | "client reviews" |
| Stat — note | "note moyenne" | "average rating" |
| Stat — projets | "projets livrés" | "projects delivered" |
| totalReviews corrigé | `5` (source: D-16, FIX-04) | `5` |

### États vides et erreurs

| Element | Copy FR | Copy EN |
|---------|---------|---------|
| État vide témoignages (si aucun chargé) | "Aucun témoignage disponible pour l'instant." | "No testimonials available yet." |
| Erreur chargement image avatar | Masquer l'image, afficher initiales (fallback silencieux) | idem |
| Pas de cas de destruction dans cette phase | n/a | n/a |

Aucune action destructive dans cette phase — pas de confirmation dialog requise.

---

## Patterns d'Interaction

### Carousel / Scroll horizontal (homepage + /hytale)

- Pattern: `overflow-x-auto snap-x snap-mandatory scrollbar-hide` (source: TestimonialsSection.vue existant)
- Homepage: 2-3 témoignages featured (source: D-15)
- Page /hytale: les 5 témoignages complets avec plus de détails (source: D-15)
- Pas de navigation dots/arrows requise en v1 — scroll natif suffit

### Cartes Pricing

- Layout: grille responsive `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (5 tiers → 2+3 ou 3+2)
- Hover: `hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1` (pattern cartes existant)
- Tier le plus populaire: badge "Populaire" / "Popular" en `UBadge color="primary"`
- CTA de chaque carte: `UButton` full-width vers `/contact`

### Lien Discord (D-02, D-07)

- Bouton hero primaire: ouvre profil Discord personnel dans un nouvel onglet (`target="_blank" rel="noopener"`)
- Icône: `i-lucide-message-circle` ou `i-simple-icons-discord` si disponible dans Nuxt UI

### Badge "Disponible"

- Composant: inline-flex avec point animé `animate-ping` (pattern existant HeroSection.vue)
- Passer la string en i18n (source: D-03) — clé: `hero.badge.available`

---

## SEO & i18n — Contraintes Visuelles

- Toutes les strings visibles dans cette phase doivent avoir une clé i18n dans `fr.json` et `en.json` (source: I18N-03)
- Pas de strings hardcodées dans les templates — 0 exception pour cette phase
- Titre de page /hytale: `useSeoMeta()` avec `title` et `ogTitle` spécifiques (source: I18N-04)
- `totalReviews` dans `testimonials.ts` corrigé à `5` avant affichage (source: FIX-04 / D-16)

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Nuxt UI v3 (officiel) | UCard, UButton, UBadge, UIcon, UDivider | not required — officiel Nuxt |
| shadcn | aucun | not applicable — projet Nuxt/Vue |
| tiers | aucun | not applicable |

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
