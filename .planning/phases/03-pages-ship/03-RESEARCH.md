# Phase 3: Pages & Ship - Research

**Researched:** 2026-04-08
**Domain:** Nuxt 4 pages, Nuxt UI v3 composants interactifs, Nodemailer SMTP, Docker SSR
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** 6 sections sur la landing : Hero → Projets vedettes → Services → Témoignages → FAQ → CTA final
- **D-02:** Hero texte seul (titre + sous-titre + 3 boutons CTA), pas d'image ni animation
- **D-03:** 3 projets vedettes sur la landing (ceux avec `featured: true`)
- **D-04:** Filtres projects = barre de recherche texte + boutons catégorie — comme l'actuel
- **D-05:** UModal + UCarousel (Nuxt UI v3 natifs) pour la galerie
- **D-06:** Bande de thumbnails cliquables sous l'image principale
- **D-07:** Navigation clavier conservée : flèches gauche/droite + Escape pour fermer
- **D-08:** 3 champs formulaire seulement : Nom, Email, Message
- **D-09:** Validation Zod côté client avant envoi
- **D-10:** Feedback via UToast en haut à droite — succès ou erreur
- **D-11:** Envoi via SMTP direct (OVH) — `server/api/contact.post.ts` avec nodemailer, credentials dans runtimeConfig privé
- **D-12:** SSR node:22-alpine build + node:22-alpine runtime, copie `.output/`
- **D-13:** Variables d'environnement via runtimeConfig (NUXT_PUBLIC_*) — pas de rebuild pour changer les valeurs
- **D-14:** docker-compose.yml existant avec Traefik — mettre à jour le port loadbalancer de 80 vers 3000
- **D-15:** GA4 via nuxt-gtag, activé uniquement en production via runtimeConfig
- **D-16:** Migration fidèle des pages existantes depuis src/views/ — mêmes sections et contenu, composants Nuxt UI
- **D-17:** Page About : bio + tech stack badges (TechBadge.vue à migrer)
- **D-18:** Page Fiverr : hero + service cards + FAQ accordion (UAccordion) + CTA
- **D-19:** Page Formation SUPPRIMÉE
- **D-20:** Page 404 : error.vue Nuxt avec message et lien retour accueil

### Claude's Discretion

- Design exact des cards projets, services, témoignages
- Animations et transitions entre pages/sections
- Espacement, tailles de police, responsive breakpoints
- Structure interne des composants (découpage en sous-composants)
- Ordre des tâches d'implémentation et découpage en plans

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PAGE-01 | Page Landing `/` — hero, projets vedettes, services, CTA | useFeaturedProjects() + UCard + UButton — patterns établis Phase 2 |
| PAGE-02 | Page Projects `/projects` — liste avec filtres (recherche + catégorie) | useProjects() composable déjà migré avec search() + filterByCategory() |
| PAGE-03 | Page Project Detail `/project/[id]` — détail + galerie modale d'images | Route dynamique `[id].vue` + UModal + UCarousel avec emblaApi.scrollTo() |
| PAGE-04 | Page About `/about` — biographie, tech stack badges | Données techstack.ts déjà migrées + UBadge ou UCard pour badges |
| PAGE-05 | Page Contact `/contact` — formulaire validation + envoi SMTP | UForm + Zod + nodemailer dans server/api/contact.post.ts |
| PAGE-06 | Page Fiverr `/fiverr` — landing services, cards, FAQ accordion, CTA | UAccordion avec items array + clés i18n |
| PAGE-07 | Page Formation `/formation` — SUPPRIMÉE (D-19) | Créer une redirection vers `/` ou stub vide |
| PAGE-08 | Page 404 — `error.vue` avec lien retour accueil | error.vue à la racine `app/`, prop `error.status`, clearError({ redirect: '/' }) |
| COMP-01 | Galerie modale — UModal + UCarousel + navigation clavier | UModal v-model:open + UCarousel ref + keydown listener |
| COMP-02 | Formulaire contact — UForm + Zod + envoi SMTP | schema Zod + state reactive + defineEventHandler + readBody + nodemailer |
| COMP-03 | FAQ accordion — UAccordion localisé FR/EN | UAccordion :items avec questionKey/answerKey résolus via t() |
| COMP-04 | Section témoignages — UCard par témoignage | testimonials.ts déjà migré, UCard avec slots header/body |
| INFRA-01 | Dockerfile production multi-stage node:22-alpine | Build stage : npm install + nuxt build ; Runtime : copie .output/, node server/index.mjs |
| INFRA-04 | GA4 via nuxt-gtag, actif uniquement en production | nuxt-gtag v4.1.0 déjà installé ; enabled: process.env.NODE_ENV === 'production' |
</phase_requirements>

---

## Summary

La Phase 3 construit et livre les 8 pages du portfolio avec leurs composants interactifs (galerie modale, formulaire contact, FAQ) et package le tout dans une image Docker SSR prête pour Traefik.

La base technique est solide : Nuxt 4 avec `app/` directory, Nuxt UI v3, i18n, color-mode et sitemap sont tous opérationnels depuis la Phase 2. Les données (`app/data/*.ts`) et le composable `useProjects()` sont déjà migrés. Les stubs de pages existent dans `app/pages/`. Il s'agit donc principalement de **remplir le contenu** des pages existantes et d'ajouter les composants manquants.

Les deux zones de risque technique sont : (1) la galerie modale UCarousel avec thumbnails — la navigation programmatique via `emblaApi` est légèrement non-standard et requiert `useTemplateRef` ; (2) le Dockerfile SSR qui doit switcher de nginx/static vers node/SSR — l'actuel `Dockerfile` copie `dist/` vers nginx, il faut le réécrire entièrement pour copier `.output/` et lancer `node server/index.mjs`.

**Recommandation principale :** Procéder par ordre logique — d'abord les pages statiques simples (Landing, About, Fiverr, Projects), puis les composants interactifs (galerie, formulaire), enfin Docker et GA4. Installer nodemailer (`npm install nodemailer`) et zod (`npm install zod`) avant d'attaquer le formulaire.

---

## Standard Stack

### Core (déjà installé)

| Library | Version installée | Purpose | Source |
|---------|-------------------|---------|--------|
| @nuxt/ui | ^3.0.0 | UModal, UCarousel, UForm, UAccordion, UToast | [VERIFIED: package.json] |
| @nuxt/image | ^2.0.0 | NuxtImg lazy loading + WebP | [VERIFIED: package.json] |
| nuxt-gtag | ^4.1.0 | GA4 production-only | [VERIFIED: package.json] |
| nuxt | ^4.0.0 | error.vue, defineEventHandler, useRuntimeConfig | [VERIFIED: package.json] |

### À installer

| Library | Version actuelle | Purpose | Source |
|---------|-----------------|---------|--------|
| nodemailer | 8.0.5 | SMTP OVH dans server/api route | [VERIFIED: npm registry] |
| zod | 4.3.6 | Validation Zod côté client UForm | [VERIFIED: npm registry] |
| @types/nodemailer | latest | Types TypeScript pour nodemailer | [ASSUMED] |

**Installation :**
```bash
npm install nodemailer zod
npm install --save-dev @types/nodemailer
```

### Alternatives considérées

| Au lieu de | Pourrait utiliser | Compromis |
|------------|------------------|-----------|
| nodemailer direct | nuxt-mail module | nuxt-mail ajoute une couche d'abstraction — inutile pour un seul endpoint |
| Zod | Valibot | Zod est standard avec Nuxt UI v3 UForm (schéma accepté nativement) |
| node:22-alpine | node:22-slim (Debian) | Alpine peut poser des problèmes de musl ABI pour native deps ; nodemailer n'a pas de native deps donc alpine est OK ici |

---

## Architecture Patterns

### Structure projet Phase 3

```
app/
├── pages/
│   ├── index.vue              # Landing — à enrichir (stub existant)
│   ├── projects.vue           # Projets — à enrichir (stub existant)
│   ├── about.vue              # About — à enrichir (stub existant)
│   ├── contact.vue            # Contact — à enrichir (stub existant)
│   ├── fiverr.vue             # Fiverr — à enrichir (stub existant)
│   └── project/
│       └── [id].vue           # Détail projet — À CRÉER
├── components/
│   ├── sections/
│   │   ├── HeroSection.vue    # À CRÉER
│   │   ├── FeaturedProjectsSection.vue   # À CRÉER
│   │   ├── ServicesSection.vue           # À CRÉER
│   │   ├── TestimonialsSection.vue       # À CRÉER
│   │   ├── FAQSection.vue               # À CRÉER
│   │   └── CTASection.vue               # À CRÉER
│   ├── ProjectCard.vue        # À CRÉER
│   ├── ProjectGallery.vue     # À CRÉER (UModal + UCarousel)
│   ├── ContactForm.vue        # À CRÉER (UForm + Zod)
│   └── TechBadge.vue          # À CRÉER
├── error.vue                  # À CRÉER (racine app/)
server/
└── api/
    └── contact.post.ts        # À CRÉER
```

### Pattern 1 : UModal + UCarousel galerie avec thumbnails

UModal utilise `v-model:open` pour l'état d'ouverture. UCarousel expose son instance Embla via `useTemplateRef` pour permettre la navigation programmatique depuis les thumbnails.

```vue
<!-- Source : ui.nuxt.com/components/modal + ui.nuxt.com/components/carousel -->
<script setup lang="ts">
const isOpen = ref(false)
const currentIndex = ref(0)
const carouselRef = useTemplateRef('carousel')

function openGallery(index: number) {
  currentIndex.value = index
  isOpen.value = true
  // Scroll to correct slide after modal opens
  nextTick(() => {
    carouselRef.value?.emblaApi?.scrollTo(index, true)
  })
}

function goTo(index: number) {
  currentIndex.value = index
  carouselRef.value?.emblaApi?.scrollTo(index, true)
}

// Navigation clavier (D-07)
function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'ArrowRight') carouselRef.value?.emblaApi?.scrollNext()
  if (e.key === 'ArrowLeft') carouselRef.value?.emblaApi?.scrollPrev()
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <UModal v-model:open="isOpen" fullscreen>
    <template #content>
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="gallery"
        arrows
        loop
        @select="(i) => (currentIndex = i)"
      >
        <NuxtImg :src="item" loading="lazy" />
      </UCarousel>
      <!-- Thumbnails -->
      <div class="flex gap-2 mt-4 justify-center">
        <button
          v-for="(img, i) in gallery"
          :key="i"
          :class="{ 'ring-2 ring-primary': i === currentIndex }"
          @click="goTo(i)"
        >
          <NuxtImg :src="img" width="80" height="60" />
        </button>
      </div>
    </template>
  </UModal>
</template>
```

### Pattern 2 : UForm + Zod pour le formulaire contact

```vue
<!-- Source : ui.nuxt.com/components/form -->
<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Minimum 10 caractères'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  email: undefined,
  message: undefined,
})

const toast = useToast()
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: event.data })
    toast.add({ title: 'Message envoyé !', color: 'success', icon: 'i-lucide-check' })
  } catch {
    toast.add({ title: 'Erreur envoi', color: 'error', icon: 'i-lucide-alert-circle' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField label="Nom" name="name">
      <UInput v-model="state.name" />
    </UFormField>
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>
    <UFormField label="Message" name="message">
      <UTextarea v-model="state.message" rows="5" />
    </UFormField>
    <UButton type="submit" :loading="loading">Envoyer</UButton>
  </UForm>
</template>
```

### Pattern 3 : Nodemailer dans server/api/contact.post.ts

```typescript
// Source : nuxt.com/docs/guide/directory-structure/server + GitHub thaikolja/nuxt-nodemailer-example
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig(event) // Passer event pour que les env vars runtime soient appliquées

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: 465,
    secure: true,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  await transporter.sendMail({
    from: `"Portfolio" <${config.smtpUser}>`,
    to: config.smtpTo,
    subject: `Contact portfolio — ${body.name}`,
    text: `De: ${body.name} <${body.email}>\n\n${body.message}`,
    html: `<p><strong>De:</strong> ${body.name} &lt;${body.email}&gt;</p><p>${body.message}</p>`,
  })

  return { success: true }
})
```

**Configuration nuxt.config.ts à ajouter :**

```typescript
runtimeConfig: {
  // Privé — jamais exposé au client
  smtpHost: '',    // NUXT_SMTP_HOST
  smtpUser: '',    // NUXT_SMTP_USER
  smtpPass: '',    // NUXT_SMTP_PASS
  smtpTo: '',      // NUXT_SMTP_TO
  public: {
    gtag: { id: '' }, // NUXT_PUBLIC_GTAG_ID (déjà en place)
  },
},
```

**Variables d'environnement `.env` (non commité) :**
```ini
NUXT_SMTP_HOST=ssl0.ovh.net
NUXT_SMTP_USER=contact@killiandalcin.fr
NUXT_SMTP_PASS=xxxx
NUXT_SMTP_TO=contact@killiandalcin.fr
NUXT_PUBLIC_GTAG_ID=G-CDVVNFY6MV
```

### Pattern 4 : UAccordion pour FAQ (D-18)

```vue
<!-- Source : ui.nuxt.com/components/accordion -->
<script setup lang="ts">
import { homeFAQs } from '~/data/faq'
const { t } = useI18n()

const items = computed(() =>
  homeFAQs.map((faq) => ({
    label: t(faq.questionKey),
    content: t(faq.answerKey),
    value: faq.questionKey,
  }))
)
</script>

<template>
  <UAccordion :items="items" type="single" collapsible />
</template>
```

### Pattern 5 : error.vue (PAGE-08 / D-20)

```vue
<!-- Emplacement : app/error.vue — Source : nuxt.com/docs/guide/directory-structure/error -->
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-6">
    <h1 class="text-6xl font-bold">{{ error.status }}</h1>
    <p class="text-xl text-gray-500">
      {{ error.status === 404 ? 'Page introuvable' : 'Une erreur est survenue' }}
    </p>
    <UButton @click="handleError">Retour à l'accueil</UButton>
  </div>
</template>
```

### Pattern 6 : Dockerfile SSR (INFRA-01 / D-12)

```dockerfile
# Source : nuxt.com/docs/deploy/docker + marcusn.dev article 2025-11
# Note: Alpine utilisé car nodemailer n'a pas de native deps liées à glibc

# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime — copie uniquement .output/
FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
WORKDIR /app

COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
```

**docker-compose.yml — modification requise (D-14) :**
```yaml
# Ligne à changer :
- 'traefik.http.services.portfolio.loadbalancer.server.port=3000'  # était 80
```

### Pattern 7 : nuxt-gtag production-only (INFRA-04 / D-15)

```typescript
// nuxt.config.ts — Source : nuxt.com/modules/gtag
gtag: {
  id: '',                                               // Surchargé par NUXT_PUBLIC_GTAG_ID au runtime
  enabled: process.env.NODE_ENV === 'production',       // Off en dev
},
runtimeConfig: {
  public: {
    gtag: { id: '' },  // NUXT_PUBLIC_GTAG_ID — pas de rebuild nécessaire
  },
},
```

### Pattern 8 : NuxtImg pour les images projets

```vue
<!-- Source : image.nuxt.com/usage/nuxt-img -->
<NuxtImg
  :src="project.image"
  :alt="project.title"
  loading="lazy"
  format="webp"
  width="800"
  height="450"
/>
```

### Anti-patterns à éviter

- **Ne pas utiliser `localStorage`** pour persister état modal/gallery — toujours refs Vue
- **Ne pas appeler `emblaApi.scrollTo()` directement après `isOpen = true`** — passer par `nextTick()` pour attendre le rendu du modal
- **Ne pas exposer les credentials SMTP via `runtimeConfig.public`** — les mettre dans la section privée de runtimeConfig uniquement
- **Ne pas hardcoder le port 80 dans docker-compose** — le changer à 3000 (D-14)
- **Ne pas copier `dist/` dans le Dockerfile** — le build Nuxt SSR produit `.output/`, pas `dist/`

---

## Don't Hand-Roll

| Problème | Ne pas construire | Utiliser | Pourquoi |
|---------|------------------|---------|----------|
| Modal + carousel | Custom overlay + swiper CSS | UModal + UCarousel | Nuxt UI gère a11y, focus trap, transition, dismiss on escape |
| Validation formulaire | Regex maison ou conditions if/else | Zod + UForm | UForm consomme nativement le schéma Zod, affiche les erreurs sur les champs |
| Notifications toast | div flottant custom | useToast() + UApp | Nuxt UI gère la pile de toasts, position, durée, icônes |
| FAQ accordion | div + show/hide custom | UAccordion | Gère a11y ARIA, animation, type single/multiple |
| SMTP transport | fetch directe vers OVH | nodemailer | nodemailer gère TLS, retry, pooling — critique pour OVH port 465 |

---

## Common Pitfalls

### Pitfall 1 : UToast sans `<UApp>`

**Ce qui se passe :** `useToast().add()` est appelé mais aucune notification n'apparaît.
**Pourquoi :** Le rendu des toasts requiert `<UApp>` comme wrapper — il est normalement dans `app/app.vue`.
**Comment éviter :** Vérifier que `app/app.vue` contient `<UApp><NuxtLayout>...</NuxtLayout></UApp>`.
**Signe d'alerte :** Aucune erreur console, mais les toasts silencieux.

### Pitfall 2 : emblaApi null au moment du scrollTo

**Ce qui se passe :** `carouselRef.value?.emblaApi?.scrollTo(index)` ne fait rien lors de l'ouverture de la galerie.
**Pourquoi :** Le modal vient d'être monté, Embla n'est pas encore initialisé au même tick.
**Comment éviter :** Entourer l'appel dans `nextTick(() => { ... })` après avoir mis `isOpen.value = true`.
**Signe d'alerte :** La galerie s'ouvre toujours à l'index 0 même si on clique sur l'image 3.

### Pitfall 3 : Dockerfile copie dist/ au lieu de .output/

**Ce qui se passe :** `docker build` réussit mais `docker run` échoue avec "Cannot find module".
**Pourquoi :** L'ancien Dockerfile (SPA nginx) copie `dist/`. Nuxt SSR produit `.output/server/index.mjs`.
**Comment éviter :** Le nouveau Dockerfile doit `COPY --from=builder /app/.output /app/.output` et lancer `node /app/.output/server/index.mjs`.
**Signe d'alerte :** `docker run` montre "Error: Cannot find module '/app/server/index.mjs'".

### Pitfall 4 : runtimeConfig SMTP exposé côté client

**Ce qui se passe :** Les credentials SMTP apparaissent dans le HTML rendu ou les DevTools network.
**Pourquoi :** Si mis dans `runtimeConfig.public`, ils sont sérialisés dans le payload Nuxt visible côté client.
**Comment éviter :** `smtpHost/User/Pass` doivent être dans la section privée de `runtimeConfig` (pas sous `public`).
**Signe d'alerte :** `window.__NUXT__` contient les credentials SMTP.

### Pitfall 5 : server/api route non trouvée en développement

**Ce qui se passe :** `$fetch('/api/contact', ...)` retourne 404.
**Pourquoi :** Nuxt doit détecter automatiquement les fichiers dans `server/api/` — s'assurer que le répertoire `server/` est à la racine du projet, pas dans `app/`.
**Comment éviter :** Créer `server/api/contact.post.ts` à la racine (même niveau que `app/`, `nuxt.config.ts`).
**Signe d'alerte :** 404 sur `POST /api/contact` alors que le fichier existe.

### Pitfall 6 : error.vue dans le mauvais répertoire

**Ce qui se passe :** Les erreurs 404 affichent la page Nuxt par défaut, pas la page custom.
**Pourquoi :** `error.vue` doit être dans `app/` (pas dans `app/pages/`).
**Comment éviter :** Créer `app/error.vue` (non dans pages/).
**Signe d'alerte :** La page 404 montre le design Nuxt par défaut gris.

---

## Code Examples

### Route dynamique project/[id].vue

```vue
<!-- app/pages/project/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const { findById } = useProjects()
const project = findById(route.params.id as string)

// 404 si projet non trouvé
if (!project.value) {
  throw createError({ status: 404, statusText: 'Project not found' })
}

useSeoMeta({
  title: () => project.value?.title ?? '',
  description: () => project.value?.description ?? '',
})
</script>
```

### Filtre projets (PAGE-02)

```vue
<script setup lang="ts">
const { projects, filterByCategory, search } = useProjects()
const searchQuery = ref('')
const activeCategory = ref<string | null>(null)

const filtered = computed(() => {
  let result = projects.value
  if (activeCategory.value) {
    result = result.filter((p) => p.category === activeCategory.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q))
    )
  }
  return result
})

const categories = computed(() => [...new Set(projects.value.map((p) => p.category))])
</script>
```

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build + runtime Docker | ✓ | v25.2.1 (local) / v22 dans Docker | — |
| Docker | INFRA-01 | [ASSUMED] | — | Tester manuellement |
| nodemailer | COMP-02 SMTP | ✗ (à installer) | 8.0.5 sur npm | — |
| zod | COMP-02 validation | ✗ (à installer) | 4.3.6 sur npm | — |
| OVH SMTP (ssl0.ovh.net:465) | COMP-02 envoi email | [ASSUMED] | — | Tester avec `NUXT_SMTP_HOST` réel |

**Dépendances manquantes sans fallback :**
- OVH SMTP credentials — doivent être fournis par l'utilisateur dans `.env` avant test du formulaire

**Dépendances manquantes avec fallback :**
- Aucune

---

## Validation Architecture

Tests automatisés exclus du scope (REQUIREMENTS.md Out of Scope : "Tests automatisés — Migration d'abord"). Validation manuelle uniquement.

**Critères de succès Phase 3 (vérification manuelle) :**

| Critère | Commande de vérification |
|---------|-------------------------|
| 8 routes SSR | `curl http://localhost:3000/` — vérifie HTML complet |
| Galerie clavier | Ouvrir modal → flèches → Escape dans navigateur |
| Formulaire envoi | Soumettre formulaire → vérifier réception email + toast succès |
| Docker build | `docker build -t portfolio .` |
| Docker run | `docker run -p 3000:3000 portfolio` → `curl localhost:3000` |
| GA4 DebugView | Naviguer en production → vérifier events dans GA4 DebugView |

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Non | Pas d'auth sur le portfolio |
| V3 Session Management | Non | Pas de session |
| V4 Access Control | Non | Toutes les pages sont publiques |
| V5 Input Validation | Oui | Zod côté client + validation côté serveur recommandée |
| V6 Cryptography | Non | SMTP TLS géré par nodemailer |

### Threat Patterns pour le stack formulaire

| Pattern | STRIDE | Mitigation standard |
|---------|--------|---------------------|
| Spam SMTP via API ouverte | Spoofing | Rate limiting Nitro ou validation honeypot |
| XSS dans corps email | Tampering | Échapper le HTML dans `html:` nodemailer (pas de `innerHTML` direct) |
| Credentials SMTP leakés | Information disclosure | Section privée runtimeConfig uniquement (jamais `public`) |

**Note importante :** `server/api/contact.post.ts` est un endpoint public sans auth. Sans rate limiting, il peut être utilisé pour spammer l'adresse OVH. Pour Phase 3, ajouter une simple validation côté serveur (longueur champs) à défaut d'un vrai rate limiter.

**Validation côté serveur minimale à inclure dans contact.post.ts :**
```typescript
const { name, email, message } = await readBody(event)
if (!name || !email || !message || message.length > 5000) {
  throw createError({ statusCode: 400, message: 'Invalid input' })
}
```

---

## State of the Art

| Ancienne approche | Approche actuelle | Quand changé | Impact |
|-------------------|------------------|--------------|--------|
| nginx + dist/ (SPA) | node + .output/ (SSR) | Ce projet | Le Dockerfile entier à réécrire |
| Custom GalleryModal.vue | UModal + UCarousel | Phase 3 | Moins de code, a11y gratuit |
| useSeo() composable custom | useSeoMeta() Nuxt builtin | Phase 2 | Déjà migré |
| localStorage thème | Cookie color-mode | Phase 2 | Déjà migré |

---

## Assumptions Log

| # | Claim | Section | Risk si faux |
|---|-------|---------|-------------|
| A1 | `@types/nodemailer` est le package de types correct pour nodemailer 8.x | Standard Stack | Types manquants — TypeScript strict échouera ; vérifier avec `npm view @types/nodemailer` |
| A2 | OVH SMTP fonctionne sur ssl0.ovh.net:465 avec auth PLAIN | Pattern 3 | L'envoi échoue — tester avec les vraies credentials avant de fermer la phase |
| A3 | Docker est disponible sur la machine de déploiement de Killian'| Environment Availability | INFRA-01 bloqué — confirmer avec `docker --version` |
| A4 | `UCarousel` expose `emblaApi` directement via `useTemplateRef` dans Nuxt UI v3 | Pattern 1 | Navigation thumbnail cassée — fallback : gérer index manuellement avec `watch` |

---

## Open Questions

1. **Port OVH SMTP**
   - Ce qu'on sait : OVH supporte 465 (SSL) et 587 (STARTTLS)
   - Ce qui est flou : lequel utiliser avec les credentials Killian
   - Recommandation : tester les deux ; 465 avec `secure: true` en premier

2. **Page Formation (D-19 supprimée)**
   - Ce qu'on sait : la page est supprimée du contenu, mais un stub `fiverr.vue` + route `/fiverr` existent
   - Ce qui est flou : faut-il une redirection `/formation` → `/` ou laisser une 404
   - Recommandation : ajouter un middleware ou `definePageMeta({ redirect: '/' })` dans formation.vue si le stub existe encore

3. **UApp dans app.vue Phase 2**
   - Ce qu'on sait : UToast requiert `<UApp>` wrapper
   - Ce qui est flou : est-ce que `app/app.vue` de Phase 2 l'a déjà inclus
   - Recommandation : vérifier `app/app.vue` avant d'implémenter le formulaire toast

---

## Sources

### Primary (HIGH confidence)
- [ui.nuxt.com/components/modal](https://ui.nuxt.com/components/modal) — Props UModal, v-model:open, slots
- [ui.nuxt.com/components/carousel](https://ui.nuxt.com/components/carousel) — Props UCarousel, emblaApi.scrollTo pattern
- [ui.nuxt.com/components/form](https://ui.nuxt.com/components/form) — UForm + Zod schema, FormSubmitEvent
- [ui.nuxt.com/components/accordion](https://ui.nuxt.com/components/accordion) — UAccordion items array + slots
- [ui.nuxt.com/components/toast](https://ui.nuxt.com/components/toast) — useToast() API + UApp
- [nuxt.com/docs/guide/directory-structure/error](https://nuxt.com/docs/guide/directory-structure/error) — error.vue pattern + clearError
- [nuxt.com/docs/guide/directory-structure/server](https://nuxt.com/docs/guide/directory-structure/server) — defineEventHandler, readBody, useRuntimeConfig(event)
- [image.nuxt.com/usage/nuxt-img](https://image.nuxt.com/usage/nuxt-img) — NuxtImg props loading, format, width/height
- package.json du projet — versions installées vérifiées

### Secondary (MEDIUM confidence)
- [nuxt.com/modules/gtag](https://nuxt.com/modules/gtag) — nuxt-gtag v4 runtimeConfig + enabled production
- [marcusn.dev/articles/2025-11/ultraslim-multistage-image-for-ssr-nuxt-4-typescript-docker](https://marcusn.dev/articles/2025-11/ultraslim-multistage-image-for-ssr-nuxt-4-typescript-docker) — Dockerfile SSR Nuxt 4 (pattern node-server)
- [github.com/thaikolja/nuxt-nodemailer-example](https://github.com/thaikolja/nuxt-nodemailer-example) — Nodemailer dans Nuxt 4 server route

### Tertiary (LOW confidence)
- A1 à A4 dans Assumptions Log — non vérifiés en session

---

## Metadata

**Confidence breakdown:**
- Standard Stack : HIGH — packages vérifiés npm registry + package.json existant
- Architecture patterns : HIGH — APIs vérifiées docs officielles Nuxt UI v3 + Nuxt 4
- Nodemailer SMTP : MEDIUM — pattern confirmé par GitHub example, credentials OVH non testés
- Dockerfile SSR : MEDIUM — pattern node-server confirmé par article 2025, non testé localement
- Pitfalls : HIGH — basés sur les APIs vérifiées + erreurs connues

**Research date:** 2026-04-08
**Valid until:** 2026-05-08 (stack stable, Nuxt UI v3 en GA)
