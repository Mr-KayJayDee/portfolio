# Feature Landscape

**Domain:** Freelancer portfolio — niche game plugin developer (Hytale)
**Researched:** 2026-04-10
**Confidence:** MEDIUM — based on codebase analysis, domain knowledge, freelance market patterns; WebSearch unavailable

---

## 1. Freelancer Portfolio Pricing Pages — Visible vs Hidden

### Verdict: Show pricing. Always.

**Rationale for Killian's situation specifically:**

The Hytale plugin dev market on Fiverr has ~1 direct competitor at $45. The market is not price-sensitive yet — it's trust-sensitive. A server owner searching "Hytale plugin developer" has no reference price. Showing prices:
- Filters unserious inquiries before they consume calendar time (critical with only 5-10h/week availability)
- Signals confidence and professionalism
- Anchors expectations upward (a visible €300 tier makes a €100 tier feel reasonable)
- Removes the "I need to ask" friction that kills conversions for international clients in different timezones

**The only valid reason to hide pricing:** Custom enterprise work where scope varies by 10x. That does not apply here — plugin complexity is bounded.

### Recommended Tier Structure

Three tiers work best for plugin dev services. Four or more creates decision paralysis.

| Tier | Name | Price Range | Contents |
|------|------|-------------|----------|
| Starter | Simple Plugin | €80–150 | Single feature, documented, delivered in 5 days, 15 days support |
| Standard | Complex Plugin | €200–400 | Multiple systems (economy, progression, custom events), 30 days support, 1 revision round |
| Premium | Full Experience | €500–900 | Full game loop (dungeon, boss, economy, UI), architecture doc, maintenance contract option |
| Recurring | Maintenance | €30–60/mo | Compatibility updates per Hytale version, bug fixes, 1 minor feature/month |

**Key structural decisions:**

- Put the maintenance tier visually separate — it is a different product (recurring revenue vs one-shot)
- "Starting at" language is fine for custom tier, but anchor with a concrete base price
- Show what is explicitly NOT included (server hosting, assets/textures, art) — this prevents scope creep complaints
- Add a "Most Popular" badge on Standard. It normalizes the mid tier and lifts average order value.

**Nuxt UI v3 implementation:** Use `UCard` grid (3 columns desktop, 1 column mobile). The pricing tiers do not need a dedicated library — straight Tailwind + UCard is sufficient. Avoid installing a pricing-specific component library.

---

## 2. Hytale Plugin Services Page — What Server Owners Need to See

### The buyer persona

A Hytale server owner is typically:
- Non-technical (they run a server, they don't code it)
- Risk-averse (bad plugin = server downtime = player churn)
- Skeptical ("can you even build Hytale plugins, the game just launched")
- Looking for long-term relationship, not one-shot delivery

They have Minecraft server experience and will compare to that ecosystem. Key questions in their head:

1. Does this dev actually know Hytale specifically, or will they fake it?
2. What happens when the next Hytale update breaks my plugin?
3. Can I see examples or a demo?
4. Will they be around in 6 months?

### Page sections — recommended order

**Section 1: Credibility header**
- Title: "Hytale Plugin Developer" — not "Game Dev" or "Modder"
- One-liner that addresses skepticism: "Building for Hytale since Early Access — I track every API change so your server stays running"
- Availability badge (reuse the animated one from HeroSection)

**Section 2: What makes Hytale plugins different**
- Short educational paragraph (3-4 sentences) explaining the Hytale API vs Minecraft — this signals genuine knowledge
- Mention: Hytale uses a Java/Kotlin API, the modding system is fundamentally different from Spigot/Paper, requires adapting to active API evolution
- This signals to server owners that this developer is not a Minecraft dev pretending

**Section 3: Services grid (the pricing section described above)**
- Four cards: Simple, Complex, Full Experience, Maintenance
- Each card must answer: What do I get? How long? What's the support situation?

**Section 4: The maintenance pitch — this is the unique selling point**
- Dedicated callout/alert component (UAlert or custom banner)
- Message: Hytale updates frequently during Early Access. Every major update risks breaking plugins. A maintenance contract means zero downtime and no re-negotiation on every patch.
- This is the structural advantage from PROJECT.md — lean into it hard

**Section 5: Process (3-step)**
- Step 1: Discovery call (Discord preferred — server owners are on Discord)
- Step 2: Spec + quote in 48h
- Step 3: Delivery with documentation
- Keep this extremely short — server owners don't read walls of text

**Section 6: Demo / Portfolio**
- If no Hytale projects exist yet: use Minecraft plugin work as proof of concept + explicit note "Hytale API is similar to Java/Kotlin modding I've done for Minecraft — I'm actively building Hytale demos"
- A "coming soon" placeholder is better than no section — it signals intent
- Video embed or GIF of a plugin in action converts better than screenshots

**Section 7: FAQ specific to Hytale**
- "The game is in Early Access, is this risky?" — address directly
- "What if Hytale updates break my plugin?" — maintenance contract answer
- "Do you have experience with Hytale specifically?" — honest answer + Minecraft parallel
- "Can I pay per update?" — redirect to maintenance tier

**Section 8: CTA**
- Primary: "Book a Discovery Call" (Discord link or contact form)
- Secondary: "View Pricing"

### Route: `/hytale` (not `/games` or `/modding`)

The URL slug matters for SEO. `/hytale` captures "hytale plugin developer" searches directly. Register `hytale` in the nav alongside the existing pages.

---

## 3. Testimonials Section — Displaying 5–10 Reviews

### Current state

`testimonials.ts` has 5 real reviews, all 5-star, all from Fiverr. All French-language except one English ("awesome guy"). `testimonialsStats` declares 10 total reviews and 25 projects — slightly inflated vs actual data shown.

### The small-count problem

5 reviews is not a weakness if framed correctly. The mistake is showing 5 cards and letting the sparseness speak for itself. Solutions:

**Pattern 1: Featured + Grid (recommended)**
- 1 large "featured" testimonial card (the unqlf_ one — it's the most specific and includes project type "Plugin Minecraft")
- 4 smaller cards below in 2x2 grid
- This asymmetric layout fills the space and makes 5 cards look curated rather than scarce
- The `featured: true` flag is already on the right testimonial in the data

**Pattern 2: Carousel with autoplay**
- Works for mobile; hides the count
- Risk: autoplay is annoying and reduces trust
- Not recommended

**Pattern 3: Stats bar above cards**
- "5.0 / 5.0 — 10+ verified reviews on Fiverr" + link to Fiverr profile
- This shifts the authority to a third-party platform — more credible than displaying 5 internal cards
- Add a Fiverr logo/icon next to the stat to reinforce the source
- The `reviewsLink` already exists in i18n pointing to the Fiverr profile

**Pattern 4: Language split — show the English one on the EN locale**
- The "awesome guy" testimonial (botuhuh) is English and international — feature it prominently on the EN locale
- French testimonials go first on FR locale
- This can be implemented by sorting testimonials client-side by language match — simple logic in the component

### Recommended implementation

Use Pattern 1 + Pattern 3 combined:
- Stats bar (5.0 rating, link to Fiverr) at top
- Featured card (full-width or 60% width)
- 4-card 2x2 grid
- "See all reviews on Fiverr" CTA link at bottom

For the Hytale page specifically, filter testimonials to show only `project_type === 'Plugin Minecraft'` — only 1 exists currently, but it's the most relevant. Pad with a "Review coming soon" placeholder card until more Hytale reviews accumulate.

### What to fix in the data

The `results` field is weak — values like `"Prix: Jusqu'à 50€"` and `"Durée: 10 jours"` reveal order size which may underposition the service. Consider removing the price from results display or changing it to outcome-focused language: "Delivered 2 days early", "Still using the plugin 6 months later".

---

## 4. Hero Section — Niche Positioning "Hytale Plugin Developer"

### Current problem (confirmed by reading the code)

The hero title uses `t('home.title')` which resolves to "Expert Full Stack Developer for Hire | Vue.js, React & Node.js Specialist" in EN. The code splits the last two words for gradient styling — this technique only works if the last two words are the differentiating concept (they're not: "Node.js Specialist" gets the gradient).

Additionally, the terminal code block hardcodes `'Full Stack Dev'` as the role. The terminal does show `'Hytale Plugins'` in the skills array — good — but it is buried among 6 other skills.

The availability badge says "Available for projects" — hardcoded English in the template (not using i18n key), which is a bug.

### Hero best practices for niche positioning

**Rule 1: Specialization in H1, not in paragraph**
The H1 must state the specialization. Visitors scan H1, they don't read paragraphs. "Hytale Plugin Developer" must be in the H1, not in the subtitle or skills list.

**Rule 2: Acknowledge the broader skill set in subtitle, not in title**
The subtitle is the right place to mention Vue/Node/web work — it reassures server owners that this is a real professional developer, not a hobbyist.

**Rule 3: Dual-audience heading (Hytale + Web)**
Killian has two buyer types: Hytale server owners and web clients. The hero must serve the primary audience (Hytale — the strategic bet) without completely alienating web clients.

Recommended approach: tabbed or split hero is overkill. Use a primary H1 that leads with Hytale, with a secondary descriptor:

```
Hytale Plugin Developer
& Freelance Web Dev
```

The gradient goes on "Hytale Plugin Developer". Web services are the secondary line.

**Rule 4: Specificity = trust**
"I build custom Hytale plugins that survive every API update" beats "I build custom solutions that scale."

**Rule 5: Terminal widget — update the role**
Change `'Full Stack Dev'` to `'Hytale Plugin Dev'` in HeroSection.vue. This is a hardcoded string in the template (line 104), not using i18n, so fix it directly.

### i18n changes required in hero

The `home.title` split-by-last-2-words approach is fragile — it produces different results for FR and EN because sentence structure differs. The right solution:

- Split `home.title` into two keys: `home.title.main` and `home.title.highlight`
- `home.title.highlight` gets the gradient styling
- This removes the brittle `split(' ').slice(-2)` logic

New i18n values:

```json
// EN
"home": {
  "title": {
    "main": "Hytale Plugin Developer",
    "highlight": "& Freelance Web Dev"
  },
  "subtitle": "I build custom Hytale plugins that survive every API update — and web apps that convert. 7+ years of experience, 0 missed deadlines."
}

// FR
"home": {
  "title": {
    "main": "Développeur de Plugins Hytale",
    "highlight": "& Dev Web Freelance"
  },
  "subtitle": "Je construis des plugins Hytale qui survivent à chaque mise à jour de l'API — et des applications web qui convertissent. 7+ ans d'expérience, 0 délais manqués."
}
```

The availability badge text ("Available for projects") is hardcoded in HeroSection.vue line 30 — needs to be an i18n key `home.availableBadge`.

---

## 5. i18n Audit — Finding Missing and Bad Translations

### Issues already visible in the current files

**Structural parity issues (EN has keys FR is missing or vice versa):**
- Both files have identical key structure currently — no missing keys found at top level
- Risk area: as new pages (Hytale) and features (pricing) are added, keys will diverge

**Quality issues in existing translations:**

EN quality problems:
- `home.title` = "Expert Full Stack Developer for Hire | Vue.js, React & Node.js Specialist" — generic SEO-spam tone, not the niche positioning needed
- `seo.home.title` still says "Freelance Full Stack Developer" — must change to include Hytale
- `seo.home.description` makes no mention of Hytale, plugins, or game development
- `a11y.logoLabel` = "Full Stack Developer" — must update when hero positioning changes
- `footer.servicesList` contains "Mobile Apps" and "Tech Consulting" — neither is a real service offered
- `fiverr.subtitle` claims "500+ orders delivered" and "100% satisfaction rate" — verify these are accurate; if not, this is a credibility risk

FR quality problems:
- `about.title` = "À propos de Killian'- Développeur Full Stack" — the dash is missing a space before it (`Killian'-` should be `Killian' —` or just remove)
- `faq.homeFaq.delivery.answer` mentions "Bot Discord simple" as the first example — for a Hytale-focused portfolio this should lead with Hytale plugin timelines
- `contact.methods.availability` = "Disponible pour remote & freelance" — the English word "remote" in French copy feels lazy; use "télétravail"

Hardcoded strings (not using i18n at all):
- HeroSection.vue line 30: `"Available for projects"` — hardcoded EN
- HeroSection.vue line 104: `'Full Stack Dev'` — hardcoded in terminal widget
- HeroSection.vue line 148: `"50+ projects"` — hardcoded EN
- HeroSection.vue line 152: `"5.0 rating"` — hardcoded EN

### Audit methodology for ongoing use

**Method 1: Key extraction diff (best for structural parity)**

```bash
# Extract all keys from both files and diff
node -e "
  const en = require('./i18n/locales/en.json');
  const fr = require('./i18n/locales/fr.json');
  const flatten = (obj, prefix='') => Object.keys(obj).reduce((acc, k) => {
    const key = prefix ? prefix + '.' + k : k;
    return typeof obj[k] === 'object' && !Array.isArray(obj[k])
      ? { ...acc, ...flatten(obj[k], key) }
      : { ...acc, [key]: obj[k] };
  }, {});
  const enKeys = Object.keys(flatten(en));
  const frKeys = Object.keys(flatten(fr));
  const missingInFr = enKeys.filter(k => !frKeys.includes(k));
  const missingInEn = frKeys.filter(k => !enKeys.includes(k));
  console.log('Missing in FR:', missingInFr);
  console.log('Missing in EN:', missingInEn);
"
```

Run this after every feature addition that adds i18n keys.

**Method 2: Search for hardcoded strings in templates**

```bash
# Find text content in templates that bypasses t()
grep -rn '>[A-Z][a-z]' app/components/ app/pages/ | grep -v '{{' | grep -v 't(' | grep -v ':' | grep -v '<!--'
```

This catches hardcoded visible text. It produces false positives — review manually.

**Method 3: Check for untranslated key echoes**

When `t('some.key')` is called and the key does not exist in the locale, vue-i18n returns the key string itself (e.g., `"some.key"` appears as text). During dev, check the rendered pages in both locales — any dotted key string in the UI is a missing translation.

**Method 4: Translation quality review checklist**

For each new locale string, verify:
- [ ] Is it natural in the target language (not machine-translated)?
- [ ] Does it match the tone of surrounding copy?
- [ ] Does it reference the correct product/service (Hytale vs generic web dev)?
- [ ] Are technical terms consistent? (e.g., "plugin" vs "mod" vs "extension")
- [ ] French: are accents correct? (é, è, ê, à, ù, ç, î, ô — check manually, JSON editors strip them)
- [ ] French: formal "vous" used consistently? (current copy mixes registers slightly)

**Nuxt i18n specific: missing locale file fallback**

Nuxt i18n falls back to the default locale (FR) when a key is missing in EN. This means missing EN keys silently show French text to English users. The extraction diff above catches this — run it as a pre-commit check or add to CI.

---

## Table Stakes vs Differentiators

### Table Stakes (must have)

| Feature | Why Expected | Complexity |
|---------|--------------|------------|
| Pricing grid with 3-4 tiers | Freelancers without visible pricing lose conversions | Low |
| Hytale page with service details | Core positioning — without it the site is a generic portfolio | Medium |
| Updated hero H1 with Hytale | SEO + first impression — current H1 targets wrong audience | Low |
| Testimonials visible on homepage | Social proof — already in codebase, needs display improvement | Low |
| i18n complete in both locales | Basic professionalism — hardcoded English strings on FR locale is broken | Low |

### Differentiators

| Feature | Value Proposition | Complexity |
|---------|-------------------|------------|
| Maintenance contract pitch on Hytale page | Unique positioning — recurring revenue, addresses Hytale's update risk | Low (copy only) |
| Plugin demo video/GIF embed | Converts skeptics who don't understand what a plugin looks like | Medium |
| Hytale API knowledge section | Proves genuine expertise vs "I can do Minecraft so I can do Hytale" | Low (copy only) |
| Testimonials filtered by project type per page | Relevant social proof (Minecraft reviews on Hytale page) | Low |

### Anti-Features

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| "Available for projects" badge with hardcoded text | Breaks FR locale | Use i18n key |
| Inflated stats (500+ orders, 100% satisfaction) without verification | Credibility risk if questioned | Use conservative/accurate numbers |
| Four CTA buttons in hero | Decision paralysis, reduces click-through | Two max: primary (Hytale page) + secondary (contact) |
| Mobile Apps service in footer | Killian doesn't offer this — visitor confusion | Remove or replace with "Hytale Plugins" |

---

## Feature Dependencies

```
Updated i18n keys → Hero refocus (new title structure required)
Hero refocus → Hytale page (consistent positioning across both)
Hytale page → Pricing grid (pricing is a section of the Hytale page, or linked from it)
Pricing grid → Testimonials (social proof adjacent to pricing converts better)
```

## MVP Recommendation

Build in this order:

1. **i18n fixes + hardcoded string cleanup** — 1-2h, unblocks everything else, fixes broken FR locale
2. **Hero refocus** — 1h, highest SEO impact, changes H1 which search engines read first
3. **Hytale page** (`/hytale`) — 4-6h, the core missing piece; pricing grid lives here
4. **Testimonials display improvement** — 1h, Featured + stats pattern, already has data

Defer:
- Plugin demo video — requires recording/capturing gameplay footage, not a code task
- Maintenance contract as a formal product page — copy on the Hytale page is enough for now

---

*Sources: codebase analysis (i18n/locales/en.json, fr.json, HeroSection.vue, testimonials.ts, PROJECT.md, STRUCTURE.md) — MEDIUM confidence based on domain knowledge and direct code inspection*
