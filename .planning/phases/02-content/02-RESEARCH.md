# Phase 2: Content - Research

**Researched:** 2026-04-10
**Domain:** Nuxt 4 page authoring, i18n content, Nuxt UI v3 pricing grids, testimonials carousel
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** H1 = "Hytale Plugin Developer" — positionnement niche direct, pas de titre generique
- **D-02:** CTAs = Discord (profil personnel pour l'instant) + Contact
- **D-03:** Badge "Available for projects" → passer en i18n (FR: "Disponible pour vos projets")
- **D-04:** Sous-titre angle benefice client : "Des plugins performants et sur-mesure pour votre serveur Hytale"
- **D-05:** Layout hero = garder le grid 2 colonnes (texte gauche, placeholder/illustration droite)
- **D-06:** Pas d'image pour l'instant cote droit — placeholder en attendant des assets Hytale
- **D-07:** Lien Discord = profil personnel existant dans site.ts (provisoire)
- **D-08:** Page /hytale avec 4 sections : hero dedie Hytale, services/expertise, grille tarifaire, temoignages
- **D-09:** 4-5 tiers de pricing : plugin simple / complexe / sur-mesure / maintenance / web
- **D-10:** Prix en mode mix : prix fixes pour simple/maintenance, sur devis pour complexe/sur-mesure
- **D-11:** CTA de chaque tier = "Demander un devis" → redirige vers /contact
- **D-12:** Pas de demos — Hytale est sorti (janvier 2026), mais pas d'assets a montrer
- **D-13:** Garder les 5 temoignages Fiverr existants tels quels
- **D-14:** Pas de nouveaux temoignages Hytale a ajouter pour l'instant
- **D-15:** Homepage : 2-3 featured en carousel. Page /hytale : tous les 5 en carousel avec plus de details
- **D-16:** Corriger totalReviews : le vrai nombre est 5, pas 10 ni 50
- **D-17:** Format d'affichage = carousel/slider sur les deux pages
- **D-18:** Positionnement Hytale-first, web secondaire
- **D-19:** Toutes les pages existantes restent (about, projects, fiverr, contact), on ajoute /hytale
- **D-20:** siteConfig.title = "Killian' DAL-CIN - Hytale Plugin Developer | Freelance"
- **D-21:** jobTitle dans site.ts = "Hytale Plugin Developer" (SEO-05)

### Claude's Discretion
- Stats/chiffres cles dans le hero : Claude decide si pertinent pour la conversion

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Refonte Hero accueil — "Hytale Plugin Developer" en H1, CTA Discord/contact, bilingue | HeroSection.vue existant a adapter; i18n keys home.title, home.subtitle, home.cta.* a remplacer |
| CONT-02 | Page Hytale dediee `/hytale` — services plugin dev, tiers pricing, demos placeholders, maintenance, bilingue | Nouvelle page `app/pages/hytale.vue` + sections composees; pattern identique a index.vue |
| CONT-03 | Grille tarifaire — plugin simple/complexe/sur-mesure/maintenance/web avec prix visibles | UCard Nuxt UI v3 en grid; data statique dans app/data/; i18n keys hytale.pricing.* |
| CONT-04 | Temoignages — section featured + stats sur homepage et page Hytale (5 avis Fiverr existants) | TestimonialsSection.vue reutilisable; prop `featured` deja presente sur Testimonial type; corriger totalReviews: 5 |
| SEO-05 | jobTitle corrige — "Hytale Plugin Developer" dans site.ts et JSON-LD | site.ts: title + ajouter jobTitle field; index.vue JSON-LD Person.jobTitle a mettre a jour |
</phase_requirements>

---

## Summary

Phase 2 est une phase de contenu pur dans un codebase Nuxt 4 SSR deja fonctionnel. L'infrastructure (routing, i18n, Nuxt UI v3, layouts) existe et fonctionne. Le travail consiste a adapter des composants existants et creer une nouvelle page `/hytale` en suivant des patterns deja etablis dans le projet.

Le principal risque est la coherence i18n : chaque string visible doit avoir une cle dans `fr.json` ET `en.json`. Le codebase a deja des strings hardcodees (badge "Available for projects" dans HeroSection.vue ligne 31, floating cards "50+ projects" et "5.0 rating" lignes 148-153) qui doivent passer en i18n dans cette phase. Les donnees incoherentes (`totalReviews: 10`, `reviewCount: '10'` dans site.ts) doivent etre corrigees a 5.

**Primary recommendation:** Adapter HeroSection existant (pas recreer), creer hytale.vue en composant sections reutilisables, tout le nouveau contenu passe par i18n avant d'atterrir dans le template.

---

## Standard Stack

### Core (deja installe dans le projet)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Nuxt 4 | installed | SSR framework, auto-routing `app/pages/` | Stack decide en phase 1 |
| Nuxt UI v3 | installed | UCard, UButton, UBadge pour pricing grid | Constraint CLAUDE.md: Nuxt UI v3 en priorite |
| @nuxtjs/i18n | installed | useI18n(), useLocalePath(), fr/en JSON | Pattern etabli dans tout le projet |
| Tailwind v4 | installed | Classes utilitaires CSS | Stack decide |

### Patterns etablis dans le projet [VERIFIED: codebase]
- Pages: `app/pages/nom.vue` → route `/nom` automatique (Nuxt auto-routing)
- Sections: `app/components/sections/NomSection.vue` composees dans les pages
- i18n: `useI18n()` dans `<script setup>`, cles dans `i18n/locales/fr.json` et `en.json`
- SEO: `useSeoMeta()` + `useHead()` en haut de chaque page vue
- Data statique typee: `app/data/nom.ts` exportant des constantes typees avec `~~/shared/types`
- Images: `NuxtImg` avec `loading="lazy"` pour les non-critiques

### Alternatives Considered
Aucune — tout le stack est verrouille par CLAUDE.md et les phases precedentes.

---

## Architecture Patterns

### Recommended Project Structure (extensions pour phase 2)
```
app/
├── pages/
│   ├── index.vue          # MODIFIER: hero Hytale + temoignages featured
│   └── hytale.vue         # CREER: page dediee Hytale
├── components/
│   └── sections/
│       ├── HeroSection.vue           # MODIFIER: H1 Hytale, CTAs Discord+Contact, i18n badge
│       ├── TestimonialsSection.vue   # MODIFIER: prop featured pour filtrage homepage
│       └── hytale/
│           ├── HytaleHeroSection.vue      # CREER: hero dedie page /hytale
│           ├── HytalePricingSection.vue   # CREER: grille tarifaire 4-5 tiers
│           └── HytaleServicesSection.vue  # CREER: expertise/services Hytale (optionnel si ServicesSection adaptable)
├── data/
│   ├── site.ts            # MODIFIER: title, jobTitle, reviewCount corriges
│   ├── testimonials.ts    # MODIFIER: totalReviews: 5 (correction FIX-04)
│   └── pricing.ts         # CREER: tiers de pricing Hytale
i18n/
├── locales/
│   ├── fr.json            # MODIFIER: ajouter hytale.*, corriger home.*, testimonials.*
│   └── en.json            # MODIFIER: idem, toutes les cles FR doivent exister en EN
shared/
└── types/
    └── index.ts           # MODIFIER si besoin: PricingTier interface, jobTitle dans SiteConfig
```

### Pattern 1: Nouvelle page Nuxt avec sections composees
**What:** `app/pages/hytale.vue` suit exactement le pattern de `index.vue`
**When to use:** Toujours — c'est le pattern etabli du projet

```typescript
// Source: app/pages/index.vue (pattern existant)
<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.hytale.title'),
  description: () => t('seo.hytale.description'),
  ogTitle: () => t('seo.hytale.title'),
  ogDescription: () => t('seo.hytale.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogType: 'website',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Hytale Plugin Development',
      provider: { '@type': 'Person', name: "Killian' DAL-CIN" },
    }),
  }],
})
</script>

<template>
  <div>
    <HytaleHeroSection />
    <HytaleServicesSection />
    <HytalePricingSection />
    <TestimonialsSection />  <!-- reutilise tel quel, tous les 5 -->
  </div>
</template>
```

### Pattern 2: Pricing grid avec Nuxt UI v3 UCard
**What:** Grid de cards avec UCard pour chaque tier de pricing
**When to use:** Section HytalePricingSection.vue

```typescript
// Source: [ASSUMED] Nuxt UI v3 UCard pattern — a verifier contre docs officielles si besoin
// Pattern repris du design Fiverr existant (app/pages/fiverr.vue)
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <UCard v-for="tier in pricingTiers" :key="tier.id"
      :class="tier.featured ? 'ring-2 ring-brand-500' : ''">
      <template #header>
        <h3>{{ t(`hytale.pricing.${tier.id}.name`) }}</h3>
        <p class="text-3xl font-bold">{{ tier.price }}</p>
      </template>
      <ul>
        <li v-for="feature in tier.features" :key="feature">
          <UIcon name="i-lucide-check" /> {{ t(`hytale.pricing.${tier.id}.features.${feature}`) }}
        </li>
      </ul>
      <template #footer>
        <UButton :to="localePath('/contact')" block>
          {{ t('hytale.pricing.cta') }}
        </UButton>
      </template>
    </UCard>
  </div>
</template>
```

### Pattern 3: TestimonialsSection avec prop featured
**What:** La section temoignages existante supporte deja `featured?: boolean` sur le type `Testimonial`. Pour la homepage, filtrer sur `featured: true` (2-3 temoignages). Pour /hytale, afficher tous les 5.
**When to use:** Homepage = `testimonials.filter(t => t.featured)`, /hytale = `testimonials` complet

```typescript
// Source: app/components/sections/TestimonialsSection.vue (existant)
// app/data/testimonials.ts: seul unqlf_ a featured: true actuellement
// → marquer 2-3 comme featured pour la homepage

// Prop a ajouter a TestimonialsSection.vue:
const props = defineProps<{
  featured?: boolean
}>()
const displayed = computed(() =>
  props.featured ? testimonials.filter(t => t.featured) : testimonials
)
```

### Pattern 4: i18n — procedure d'ajout de cles
**What:** Toute string visible doit etre dans les deux fichiers JSON
**When to use:** A chaque nouveau texte ajoute

```
Procedure:
1. Definir la cle dans fr.json avec la valeur FR
2. Ajouter la meme cle dans en.json avec la valeur EN
3. Utiliser t('cle') dans le template — jamais de string literale visible
```

### Anti-Patterns to Avoid
- **String hardcodee dans le template:** `HeroSection.vue` ligne 31 a "Available for projects" en dur → doit devenir `{{ t('home.badge.available') }}`
- **Floating cards hardcodees:** Lignes 148-153 de HeroSection.vue ont "50+ projects" et "5.0 rating" en dur → i18n ou supprimer
- **Copier-coller de sections entières:** Adapter `TestimonialsSection` via prop plutot que dupliquer
- **Donnees incoherentes:** `totalReviews: 10` dans testimonials.ts ET `reviewCount: '10'` dans site.ts → les deux a corriger a 5

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Pricing cards | Custom card HTML | `UCard` Nuxt UI v3 | Deja installe, coherent avec le design system |
| Boutons CTA | `<a>` custom | `UButton` avec `:to` | Routing i18n automatique via `localePath()` |
| Navigation vers /hytale | Modifier le HTML du header | Ajouter entree dans `navLinks` computed de AppHeader.vue | Pattern etabli, une seule ligne a ajouter |
| Carousel/slider JS custom | Implementer swipe events | `overflow-x-auto snap-x` CSS (deja dans TestimonialsSection) | Le composant existant utilise deja ce pattern CSS |

**Key insight:** 80% de cette phase est de la configuration de donnees et d'i18n, pas du nouveau code UI.

---

## Common Pitfalls

### Pitfall 1: Oublier la cle EN quand on ajoute une cle FR
**What goes wrong:** La page `/en/hytale` affiche la cle brute (ex: "hytale.pricing.cta") au lieu du texte
**Why it happens:** fr.json mis a jour, en.json oublie
**How to avoid:** Toujours editer les deux fichiers en meme temps
**Warning signs:** `curl localhost:3000/en/hytale | grep "hytale\."` retourne des resultats

### Pitfall 2: jobTitle manquant dans SiteConfig type
**What goes wrong:** TypeScript strict mode refuse `siteConfig.jobTitle = '...'` si le champ n'est pas dans l'interface
**Why it happens:** `SiteConfig` dans `shared/types/index.ts` n'a pas de champ `jobTitle` actuellement
**How to avoid:** Ajouter `jobTitle?: string` a l'interface avant de l'utiliser dans site.ts
**Warning signs:** Erreur `vue-tsc` au build

### Pitfall 3: Navigation /hytale absente du header mobile
**What goes wrong:** Le lien /hytale est visible sur desktop mais pas dans le menu mobile
**Why it happens:** `navLinks` dans AppHeader.vue alimente a la fois le nav desktop et le drawer mobile — une seule entree suffit si le composant est bien structure
**How to avoid:** Verifier que le drawer mobile utilise bien la meme `navLinks` computed (c'est le cas dans le pattern actuel)

### Pitfall 4: TestimonialsSection importe directement les donnees (pas de prop)
**What goes wrong:** Pour filtrer les featured sur la homepage, il faut refactorer le composant
**Why it happens:** `TestimonialsSection.vue` importe `testimonials` directement (ligne 2 du composant)
**How to avoid:** Ajouter une prop optionnelle `featured?: boolean` et filtrer le tableau en interne — ca ne casse pas l'usage existant sur fiverr.vue et contact.vue s'ils l'utilisent

### Pitfall 5: reviewCount incoherent entre site.ts et testimonials.ts
**What goes wrong:** `aggregateRating.reviewCount: '10'` dans site.ts et `totalReviews: 10` dans testimonials.ts alors que la decision D-16 dit 5
**Why it happens:** FIX-04 du REQUIREMENTS.md cible cette incohererence
**How to avoid:** Les deux doivent etre corriges a 5 dans la meme tache

---

## Code Examples

### Mise a jour HeroSection.vue — badge i18n
```typescript
// AVANT (hardcode, ligne 31):
<span class="text-sm font-medium text-brand-700 dark:text-brand-400">Available for projects</span>

// APRES (i18n):
<span class="text-sm font-medium text-brand-700 dark:text-brand-400">{{ t('home.badge.available') }}</span>

// fr.json: "home": { "badge": { "available": "Disponible pour vos projets" } }
// en.json: "home": { "badge": { "available": "Available for projects" } }
```

### Mise a jour HeroSection.vue — H1 Hytale
```typescript
// i18n keys a remplacer dans fr.json:
// "home": {
//   "title": "Hytale Plugin Developer",           ← H1 (D-01)
//   "subtitle": "Des plugins performants et sur-mesure pour votre serveur Hytale",  ← D-04
//   "cta": {
//     "viewProjects": "Voir mes projets",
//     "discord": "Rejoindre sur Discord",         ← D-02
//     "contactMe": "Devis Gratuit Sous 24h"
//   }
// }
```

### Structure data pricing.ts a creer
```typescript
// app/data/pricing.ts
import type { PricingTier } from '~~/shared/types'

export const hytalepricing: PricingTier[] = [
  { id: 'simple',      priceFixed: '150€',  featured: false },
  { id: 'complex',     priceFixed: null,    priceLabel: 'Sur devis', featured: true },
  { id: 'custom',      priceFixed: null,    priceLabel: 'Sur devis', featured: false },
  { id: 'maintenance', priceFixed: '50€/mo', featured: false },
  { id: 'web',         priceFixed: '300€',  featured: false },
]

// Interface a ajouter dans shared/types/index.ts:
export interface PricingTier {
  id: string
  priceFixed: string | null
  priceLabel?: string
  featured?: boolean
}
```

### Correction site.ts
```typescript
// MODIFIER dans app/data/site.ts:
export const siteConfig: SiteConfig = {
  title: "Killian' DAL-CIN - Hytale Plugin Developer | Freelance",  // D-20
  jobTitle: 'Hytale Plugin Developer',                               // D-21 / SEO-05
  // ...
  seo: {
    organization: {
      aggregateRating: {
        ratingValue: '5',
        reviewCount: '5',  // D-16: correction de 10 → 5
      },
    },
  },
}
```

### Correction testimonials.ts
```typescript
// MODIFIER totalReviews:
export const testimonialsStats: TestimonialsStats = {
  totalReviews: 5,       // D-16: correction de 10 → 5
  averageRating: 5.0,
  projectsCompleted: 25, // conserver (plausible)
}

// Marquer 2-3 comme featured pour la homepage:
{ name: 'unqlf_',  featured: true,  ... },  // deja featured
{ name: 'colo263', featured: true,  ... },  // a ajouter
{ name: 'cobra2',  featured: true,  ... },  // a ajouter (3 max)
```

### Ajout lien /hytale dans AppHeader.vue
```typescript
// MODIFIER navLinks dans app/components/layout/AppHeader.vue:
const navLinks = computed(() => [
  { key: 'home',     path: '/' },
  { key: 'hytale',   path: '/hytale' },   // ← AJOUTER
  { key: 'projects', path: '/projects' },
  { key: 'about',    path: '/about' },
  { key: 'contact',  path: '/contact' },
  { key: 'fiverr',   path: '/fiverr' },
])

// fr.json: "nav": { "hytale": "Hytale" }
// en.json: "nav": { "hytale": "Hytale" }
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Strings hardcodees dans HeroSection | i18n via t() | Phase 2 | Obligation pour bilingue et success criteria CONT-01 |
| `totalReviews: 10` | `totalReviews: 5` | Phase 2 | Correction donnees incoherentes (FIX-04) |
| `jobTitle: 'Full Stack...'` dans JSON-LD | `jobTitle: 'Hytale Plugin Developer'` | Phase 2 | SEO-05 |

**Deprecated/outdated dans le contexte de cette phase:**
- CTAs "view projects" / "fiverr" dans le hero → remplacer par Discord + Contact (D-02)
- titre site.ts "Full Stack Developer | Vue.js, React, Node.js Expert" → D-20

---

## Open Questions

1. **Prix concrets pour les tiers de pricing**
   - What we know: D-09/D-10 definissent les tiers et le mode (fixe vs devis)
   - What's unclear: Les montants exacts (ex: "150€" pour plugin simple est une estimation du researcher)
   - Recommendation: Claude utilise des prix plausibles basés sur le marche freelance FR; Killian peut les ajuster apres livraison

2. **Stats hero — chiffres pertinents ?**
   - What we know: D-Discretion laisse ca a Claude
   - What's unclear: "7 ans d'experience" et "5 avis Fiverr" sont des chiffres modestes pour un hero
   - Recommendation: Garder les floating cards (50+ projects, 5.0 rating) mais les passer en i18n; ne pas afficher de chiffres trompeurs

3. **CTA Discord dans le hero — 2 ou 3 boutons ?**
   - What we know: D-02 = Discord + Contact. Le hero actuel a 3 boutons (projects, fiverr, contact)
   - What's unclear: Garder "voir mes projets" en 3e bouton ou seulement Discord + Contact ?
   - Recommendation: 3 boutons: Discord (primaire), Contact (secondaire), Hytale (tertiaire) — maximize conversion

---

## Environment Availability

Step 2.6: SKIPPED — phase purement contenu/code, pas de dependances externes nouvelles. Le stack est deja installe depuis Phase 1.

---

## Validation Architecture

> `workflow.nyquist_validation` non trouve dans `.planning/config.json` → traite comme enabled.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Pas de framework de test detecte dans le projet |
| Config file | none |
| Quick run command | `curl localhost:3000 \| grep -i hytale` (smoke test manuel) |
| Full suite command | `pnpm build && pnpm preview` + verification manuelle |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | H1 contient "Hytale" sur homepage | smoke | `curl localhost:3000 \| grep -i '<h1'` | ❌ Wave 0 |
| CONT-02 | /hytale existe avec 3+ tiers pricing | smoke | `curl localhost:3000/hytale \| grep -i 'devis'` | ❌ Wave 0 |
| CONT-03 | 4-5 tiers visibles dans /hytale | smoke | `curl localhost:3000/hytale \| grep -c 'tier\|pricing'` | ❌ Wave 0 |
| CONT-04 | Temoignages sur homepage ET /hytale | smoke | `curl localhost:3000 \| grep -i 'fiverr'` | ❌ Wave 0 |
| SEO-05 | jobTitle dans site.ts | manual | `grep "Hytale Plugin Developer" app/data/site.ts` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm dev` + verification visuelle en browser
- **Per wave merge:** `pnpm build` green + smoke curl tests
- **Phase gate:** Success criteria du ROADMAP verifies avant `/gsd-verify-work`

### Wave 0 Gaps
- [ ] Pas de framework de test installe — tests = smoke curl + verification manuelle selon success criteria

*(Note: Le REQUIREMENTS.md marque "Tests automatises: Ship d'abord, tests ensuite" — Out of Scope)*

---

## Security Domain

> Aucune nouvelle surface d'attaque introduite dans cette phase. Contenu statique SSR + i18n + data files. Pas de nouveaux endpoints API. Pas d'input utilisateur ajoutee.

Applicable ASVS: V5 Input Validation — N/A (pas de nouveau formulaire). Toutes les donnees sont statiques et typees TypeScript.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Prix "150€" pour plugin simple Hytale | Code Examples / pricing.ts | Killian doit ajuster — donnees affichees aux visiteurs |
| A2 | Ajouter `featured: true` a colo263 et cobra2 pour la homepage | Code Examples | Killian peut choisir d'autres temoignages featured |
| A3 | `projectsCompleted: 25` conserve dans testimonialsStats | Code Examples | Killian confirme si le chiffre est exact |

---

## Sources

### Primary (HIGH confidence)
- `app/components/sections/HeroSection.vue` — strings hardcodees identifiees (lignes 31, 148, 152)
- `app/data/testimonials.ts` — totalReviews: 10, 1 temoignage featured
- `app/data/site.ts` — title et jobTitle actuels, reviewCount: '10'
- `app/components/layout/AppHeader.vue` — pattern navLinks, navigation structure
- `app/pages/index.vue` — pattern useSeoMeta + useHead + sections composees
- `i18n/locales/fr.json` — structure des cles existantes, home.title actuel
- `shared/types/index.ts` — interfaces TypeScript existantes (SiteConfig sans jobTitle)

### Secondary (MEDIUM confidence)
- [ASSUMED] Pattern UCard Nuxt UI v3 pour pricing — a verifier contre docs si comportement inattendu

---

## Metadata

**Confidence breakdown:**
- Fichiers a modifier: HIGH — codebase lu directement
- Patterns a suivre: HIGH — indexes dans des fichiers existants fonctionnels
- Contenu prix/temoignages: LOW — hypotheses sur les montants, Killian valide
- i18n keys a creer: HIGH — structure claire, pattern etabli

**Research date:** 2026-04-10
**Valid until:** 2026-05-10 (stack stable, contenu peut changer)
