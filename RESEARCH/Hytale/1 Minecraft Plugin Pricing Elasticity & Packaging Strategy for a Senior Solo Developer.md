# Hytale/Minecraft Plugin Pricing Elasticity & Packaging Strategy for a Senior Solo Developer
*Deep research brief for killiandalcin.fr — compiled April 24, 2026*

> **FX note.** All prices below use **1 EUR ≈ 1.17 USD**, the ECB reference rate published 22 April 2026 ([European Central Bank](https://www.ecb.europa.eu/stats/shared/pdf/eurofxref.pdf); confirmed by the spot quote of EUR/USD 1.1689 on 24 April 2026, [Trading Economics](https://tradingeconomics.com/euro-area/currency)). Ranges are rounded for readability.
>
> **Hytale data caveat.** Hytale Early Access launched 13 January 2026 ([Hytale.com](https://hytale.com/news/2026/1/hytale-is-finally-here)), and official plugin tooling (Java 25 JDK, `com.hypixel.hytale.plugin`) is still in active maturation ([HytaleModding docs, Jan 16 2026](https://britakee-studios.gitbook.io/hytale-modding-documentation/plugins-java-development/07-getting-started-with-plugins); [Hytalemodding.dev](https://hytalemodding.dev/en/docs/guides/plugin/setting-up-env)). Paid Hytale plugin activity on BuiltByBit is only ~3 months old and sample sizes are small (single-digit to low-double-digit purchase counts). **Wherever Hytale-specific data is thin I triangulate from analogous Minecraft evidence and flag the extrapolation inline.**

---

## Executive answer (read first)

The Minecraft/Hytale plugin market is structurally **barbell-shaped**: there is a huge mass-market floor at $5–25 driven by Fiverr gigs and BBB resources, and a thin premium ceiling at $75–150/hour (or $2k–15k per project) for servers with real revenue. The middle collapses fast because leaks on BlackSpigot and undercutters on Fiverr ([as low as $5–10](https://www.fiverr.com/gigs/bukkit); [Arc.dev analysis](https://arc.dev/hire-developers/minecraft)) commoditise anyone who wades in without a moat.

For a **senior-positioned French auto-entrepreneur** with a CDI day job, the defensible pricing strategy is:

1. **Refuse the €10–50/project floor entirely.** Do not list on Fiverr. That channel destroys senior positioning faster than it generates revenue ([Fiverr Community forum: "race to the bottom"](https://community.fiverr.com/public/forum/boards/support-and-troubleshooting-by1/posts/324060-value-for-money-is-a-race-to-the-bottom)).
2. **Set a public TJM (day rate) of €450–650 (~$525–760)** — the French market midpoint for a confirmed Java dev with 7 yrs experience is ~€374–521/day and seniors run €400–810 ([Freelance.com](https://www.freelance.com/devenir-freelance/le-tjm-dun-developpeur-java/); [Portage360](https://www.portage360.fr/tjm-developpeur-en-france/); [Embarq](https://www.embarq.fr/tjm/tjm-java)). Senior Minecraft-specific work on Arc and similar vetted boards runs $60–100+/hour which translates to roughly $480–800/day ([Arc.dev](https://arc.dev/hire-developers/minecraft)).
3. **Monetize the OSS/myth_lib showcase as lead-gen**, not as a product. The conversion path is: free Mythlane plugins + GitHub → bespoke scoped builds → retainer. This matches the ItemsAdder/MythicMobs/Lands pattern of a free or cheap core that pulls paying servers into higher-priced ecosystems (premium versions, config packs, addons — e.g. MythicMobs lifetime premium at $39.99 with $4.99–9.99/mo recurring tiers, [Answer Overflow](https://www.answeroverflow.com/m/1283816171451191440)).
4. **Package around scoped outcomes (not hours)** at three anchored tiers so the hobbyist can't "scope down" the senior offer and the flagship can't "scope up" a cheap one — see the three concrete packages in §3.

---

## 1. Willingness-to-pay per buyer segment — the evidence

### 1a) Hobbyist solo (single server, teenager / young adult)

**Real WTP signals.**

- **Fiverr Minecraft plugin gigs start at $5** (`Deckogaming` explicitly sells a plugin dev gig [from $5](https://www.fiverr.com/deckogaming/minecraft-plugin-developer-and-configurator)), with the visible category lineup anchored at **$5, $10, $15, $20, $25, $40, $45, $80, $95** — no coherent mid-tier signal above $100 ([Fiverr Bukkit category](https://www.fiverr.com/gigs/bukkit)). The "pro" Fiverr top of market is **Jay_gamerz at $95 basic** and he advertises 100+ projects / 4+ years experience ([Fiverr profile](https://www.fiverr.com/jay_gamerz/custom-optimized-minecraft-plugin-development)).
- **BBB hire-thread budget anchors.** A recent public thread asks for an "advanced kit PvP plugin with a leaderboard, kit-unlock system" at a budget of **$15** ([BBB "developer for hire" tag](https://builtbybit.com/tags/developer-for-hire/)). Another: "custom battlepass configuration for OP Skyblock — my budget is $10" (same tag page). A full *practice/FFA plugin* with ranked matches was budgeted at **€50–100** on BBB ([Looking for a custom practice plugin, BBB](https://builtbybit.com/threads/looking-for-a-custom-practice-plugin.642064/)). A server owner looking for a moderately complex aim-training plugin budgeted **$100** ([BBB thread](https://builtbybit.com/threads/looking-for-developer-aim-training-plugin-100.695450/)).
- **Reference BBB thread on "how much does a plugin cost?"** — community consensus: "charge by the hour, most developers usually charge $15-20 on MC-Market and Spigot, sometimes $25+. Small plugin $30–$40, larger plugin $80–$140, big core → 4–5 figures" ([BBB thread](https://builtbybit.com/threads/how-much-is-developing-a-plugin.695806/)). This is the most honest hobbyist-segment price map that exists publicly.
- **Purchase counts on cheap Hytale BBB plugins (first ~3 months).** HyShop Hytale shop plugin at **$9.88 bundle, 37 purchases, 3 ratings** ([BBB](https://builtbybit.com/resources/bundle/hytale-shop-premium-bundle.3309/)); Player Trails $11.99, **47 purchases**; HySpawnBoss $12.99, **31 purchases**; KyuubiSoft SeasonPass $14.99, **21 purchases**; Fixtale fixes/optimisations **18 purchases at $7.99**; jMurder at $13.50 has only **6 purchases**; jBuild $7.50 has **1** ([BBB Hytale plugin listing](https://builtbybit.com/resources/hytale/plugins/)). The pattern is stark: **Hytale unit sales are still single-digit to low-double-digit per plugin in April 2026**, so any Hytale-only premium-plugin strategy is premature.
- **Minecraft BBB comparable top-sellers.** LPX AntiPacketExploit ($19.97, **3,783 purchases, 133 ratings**), FlameCord ($5.99, **3,416 purchases**), Matrix AntiCheat ($22.00, **2,651 purchases**) — i.e. the Minecraft "hobbyist/small server" floor converts at volume when it is a utility pain-killer priced under $25 ([BBB Hytale Egg recommendations panel](https://builtbybit.com/resources/hytale-pterodactyl-egg-100-sessions.90101/)).

**Realistic hobbyist WTP.** **€5–40 (~$6–47)** for a finished plugin resource, **€20–100 (~$23–115)** for a tiny commissioned plugin, hard cap around **€120 (~$140)** beyond which they disengage or go to Fiverr.

### 1b) Small network (2–5 staff)

**Real WTP signals.**

- **BBB hire-thread budget range "€50–€100 per 1-day plugin"** is openly named by the buyer ([BBB "developer" tag](https://builtbybit.com/tags/developer/)).
- **Part-time dev retainer culture.** Quora answer from a Minecraft server owner: "I was paying the developers who worked for me around $14–$15/hour" ([Quora](https://www.quora.com/Do-developers-of-Minecraft-servers-make-money)). Another BBB service poster: "€10–€15 per hour or €50 per project" ([BBB "developer" tag](https://builtbybit.com/tags/developer/)).
- **Small network rates floor on Upwork/Guru:** Minecraft-specific hires can be found "as low as $10 per hour"; junior devs $20–$40/hr; senior "upwards of $100/hr" ([Upwork hire guide](https://www.upwork.com/hire/minecraft-freelancers/); [Arc.dev](https://arc.dev/hire-developers/minecraft)).
- **Config/boss/mob pack pricing** (a proxy for "small network pays $X for finished feature"): MythicMobs boss packs priced **$10–$300** with boss mobs $20+ and 12-hour/month dev retainers at **$20/hour / 12h minimum = $240/mo** ([BBB MythicMobs Professional Setups thread](https://builtbybit.com/threads/mythicmobs-professional-setups-high-quality-no-limit.110269/)).
- **Complete server monetization proxies.** A GenPvP Minehut network did **$16k revenue in ~6–7 months (best month $3.7–3.8k)** ([BBB selling tag](https://builtbybit.com/tags/selling/)) — that is the realistic ceiling from which small networks fund dev spend. Dev budgets routinely come out at 5–15% of that.

**Realistic small-network WTP.** **€80–400 (~$95–470)** per plugin, **€150–600/month (~$175–700)** for light part-time retainers, **€500–2,000 (~$585–2,340)** for a multi-plugin package delivered in 1–3 weeks.

### 1c) Mid-tier RPG/MMO (5–15 staff, growing)

**Real WTP signals.**

- **HyClash (ThirtyVirus, Hytale)** has a publicly stated **$20,000 dedicated budget**, Kubernetes infra, 400+ Discord members pre-launch and a team of "veterans from Blockshot Network" returning after 7 years ([HytaleTop100 article](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget)). Their public BBB recruitment post states "you'll be joining a real team with an active codebase and a clear roadmap — Java Developers" but is a volunteer/revshare appeal rather than a contract (Lead Dev auvq in [BBB thread](https://builtbybit.com/threads/open-developers-wanted-for-hyclash-ft-thirtyvirus.737208/)).
- **Hytown** describes itself as the "#1 Hytale server network", built "by an experienced team of engineers and game developers from places like SpaceX, Runescape" — aggressively hiring staff/devs/modelers/builders ([Hytown.org](https://www.hytown.org/about-us); [hytale-servers.com](https://hytale-servers.com/server/hytown)). Compensation is not public, but Hytown-tier engineering talent (SpaceX background) implies market rates, not hobby rates — and Hytown is already running custom mount systems and dungeon portal systems that were built by hired freelancers like Joxii ("5+ years of Java, open for commissions"), who explicitly showcases mount/dungeon systems built for Hytown as paid commissions ([joxii.xyz](https://joxii.xyz)).
- **Another Hytale hiring post on BBB offers "monthly pay, fast progress, high quality"** for devs who can "help design systems and gameplay ideas" — the role is scoped as recurring paid work rather than one-shot commissions ([BBB thread](https://builtbybit.com/threads/hiring-hytale-developer-s-new-server-project-monthly-pay-fast-progress-high-quality.736777/)).
- **Wynncraft explicitly separates "apply via form" (volunteer content team)** from "developer/paid roles — email your resumé to [email protected]" ([Wynncraft application portal](https://ct.wynncraft.com/apply)) — confirming the implicit rule: volunteer for content, *paid* for code.

**Realistic mid-tier WTP.** **€600–2,500 (~$700–2,900)** per scoped plugin, **€800–2,500/month (~$940–2,900)** retainer at 4–8h/week, **€3,000–8,000 (~$3,500–9,400)** for a bespoke multi-module build delivered over 4–8 weeks.

### 1d) Flagship (20+ devs, Hypixel/Wynncraft/Hytown tier)

**Real WTP signals.**

- **Hypixel Studios (Hytale publisher) Levels.fyi data (April 2026):** median total comp **$104,974**; top reported product-designer role $238,800 ([Levels.fyi](https://www.levels.fyi/companies/hypixel/salaries)). Glassdoor-reported dev salaries: average **$122,205** (range $91k–$167k) and software engineers **$148,528** (25th–75th percentile $118k–$189k, ~$57–91/hr, [Glassdoor](https://www.glassdoor.com/Hourly-Pay/Hypixel-Studios-Software-Engineer-Hourly-Pay-E2391163_D_KO16,33.htm)).
- **Simon Collins-Laflamme (Hytale founder)** stated on X that he was willing to personally put **$25 million USD** into Hytale to finish it ([X post](https://x.com/ThirtyVirus/status/1938337672487166131) — via ThirtyVirus quote tweet). Hypixel Studios has 70+ full-time staff ([InGame Job profile](https://ingamejob.com/en/company/hypixel-studios)).
- **For external contractors**, flagship-scale Minecraft companies pay within/near the Arc.dev senior band of **$60–100+/hour** ([Arc.dev](https://arc.dev/hire-developers/minecraft)); ZipRecruiter's national U.S. average for a "Minecraft Developer" is **$52.84/hr ≈ $109,905/yr** (25th–75th percentile $84k–$134k, 90th percentile $150k, [ZipRecruiter](https://www.ziprecruiter.com/Salaries/Minecraft-Developer-Salary)).
- **Flagship hiring filters.** Hypixel Studios explicitly says: "Show us your work! Whether it be YouTube videos, screenshots, websites, or your GitHub, all relevant experiences can only make you look better. … if you do share code with us, we will not compile or run any of the examples in the initial review" ([Hypixel.net/jobs](https://hypixel.net/jobs/)). The ZipRecruiter Minecraft-developer hiring guide confirms the pattern: "Reviewing a candidate's public GitHub repositories or portfolio projects offers additional evidence of their technical capabilities and coding style. For senior roles, assess their ability to design scalable architectures and mentor junior developers" ([ZipRecruiter hire-guide](https://www.ziprecruiter.com/hiring/how-to-hire/minecraft-developer)). This is explicit, on-the-record evidence that **GitHub quality + portfolio + ability to architect = the senior filter**.

**Realistic flagship WTP.** **€85–130/hour (~$100–150/hr)** for external contractors, **€8,000–30,000 (~$9,400–35,000)** per scoped module, **€3,000–6,000/month (~$3,500–7,000)** retainer for 4 days/month, up to **€60k/year** for a continuous engagement. Full-time comp they pay their own employees is **$90k–190k/yr** which is the ceiling reference point for freelance ask.

---

## 2. The 4 × 6 pricing matrix

Columns are service types. Every cell shows the defensible price band in EUR and USD, a reasoning snippet tied to evidence, and a **Rec** (✅ recommend / ⚠️ situational / ❌ avoid for the user's senior positioning).

| | **Single plugin** | **Multi-plugin suite** | **Retainer (mo.)** | **Express day-work (1–2 days)** | **Scoped custom build (2–6 wk)** | **Ongoing engagement (3+ mo.)** |
|---|---|---|---|---|---|---|
| **Hobbyist solo** | €20–80 (~$23–95). Fiverr floor is $5–40; BBB budgets in this tier cluster at €15–100. ❌ Avoid. Erodes positioning & violates €450/day anchor. | €60–180 (~$70–210). Equivalent of 2–4 BBB plugins bundled. ❌ Avoid. | €40–120/mo (~$47–140). Comparable to MythicMobs $4.99–9.99/mo Premium tiers ([Answer Overflow](https://www.answeroverflow.com/m/1283816171451191440)). ❌ Avoid as bespoke; ✅ as productized (VotePipe SaaS tier). | €150–250 (~$175–290). Half a TJM; loses money. ❌ Avoid. | €400–1,000 (~$470–1,170). Same as BBB "big plugin" band. ❌ Avoid bespoke; ✅ redirect to premium resource sales. | €80–250/mo (~$95–290). Unsustainable for senior. ❌ Avoid. |
| **Small network (2–5 staff)** | €250–600 (~$290–700). BBB practice-plugin budgets are €50–100 but *quality* small-network work closes at €250–600 for 1-day scopes. ⚠️ Only accept if client passes a lead-qualification script. | €700–1,800 (~$820–2,100). 3-plugin starter pack equivalent. ✅ Good entry-tier if sold as a fixed "Small Network Starter Pack". | €400–900/mo (~$470–1,050). Equivalent to ~1 day/mo of TJM. ⚠️ Recommend only with 3-month minimum & scope cap. | €400–600 (~$470–700). Matches French senior TJM floor of €400–521 ([Freelance.com](https://www.freelance.com/devenir-freelance/le-tjm-dun-developpeur-java/)). ✅ Flagship signature offer — see §3. | €1,500–4,000 (~$1,750–4,700). Matches BBB "4–5 figure" observation for full cores. ✅ Core offering. | €600–1,500/mo (~$700–1,750). ⚠️ Only if retainer evolves naturally from prior project. |
| **Mid-tier RPG/MMO (5–15 staff)** | €600–1,500 (~$700–1,750). HyClash-scale servers have $20k budgets ([HytaleTop100](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget)) and understand *scope × quality*, not $/hour. ✅ | €2,000–5,000 (~$2,340–5,850). Multi-plugin suite delivered across 2–4 weeks. ✅ Primary revenue engine. | €1,200–2,500/mo (~$1,400–2,925). Equivalent to 2.5–5 days/month at €500 TJM. ✅ Sweet spot. | €500–700 (~$585–820). Premium 1-day express. ✅ Entry/probe offer. | €4,000–10,000 (~$4,700–11,700). Full custom MMO module (class system, dungeon framework). ✅ Flagship deliverable. | €1,500–3,500/mo (~$1,750–4,100). ✅ Strong positioning. |
| **Flagship (20+ devs)** | €1,500–3,000 (~$1,750–3,500). Rarely buy one-off plugins; when they do it's usually a specialised fix. ⚠️ Only accept if part of a longer relationship. | €5,000–12,000 (~$5,850–14,000). ⚠️ Only as proof-phase for an ongoing engagement. | €3,000–6,500/mo (~$3,500–7,600). Matches 4–6 days/month at €650+ TJM. Equivalent to Arc.dev $60–100+/hr senior contractors ([Arc.dev](https://arc.dev/hire-developers/minecraft)). ✅ Dream tier. | €700–900 (~$820–1,050). "Fire-drill" express day. ⚠️ Only after trust established. | €10,000–30,000 (~$11,700–35,000). Comparable to ~2–4 months of an internal Hypixel mid-dev ($122k/yr ÷ 12 × 1.3 margin) ([Glassdoor](https://www.glassdoor.com/Salary/Hypixel-Studios-Developer-Salaries-E2391163_D_KO16,25.htm)). ✅ Top-of-funnel. | €30,000–60,000/yr (~$35,000–70,000). Closer to a part-time internal hire than a freelancer. ✅ Strategic aspiration (post-SDK stabilisation). |

### Which cells the user should actually sell (given CDI + SASU + capacity constraint)

**✅ Core recommended cells (build the business around these six):**
- Small network → Scoped custom build (€1,500–4,000)
- Small network → Express day-work (€400–600)
- Mid-tier → Multi-plugin suite (€2,000–5,000)
- Mid-tier → Retainer (€1,200–2,500/mo)
- Mid-tier → Scoped custom build (€4,000–10,000)
- Flagship → Retainer (€3,000–6,500/mo)

**⚠️ Accept opportunistically:** Flagship single plugin and express day-work (gateway offers only), mid-tier ongoing engagement, small-network retainer.

**❌ Never sell:** anything in the hobbyist column (redirect to free OSS + VotePipe SaaS), flagship scoped build (requires too much bandwidth vs a CDI + SASU life).

---

## 3. Three concrete packaging proposals

These are designed to **avoid segment cannibalization** via three mechanics: (a) each package is clearly differentiated in *outcome*, not hours; (b) price gaps are large enough (≥2.5×) that a hobbyist literally cannot size up to the pro package without committing to a scope they don't need; (c) the top package is positioned as *engagement*, not a product, so the flagship buyer doesn't feel they're being sold a boxed good.

### 📦 Package A — "Express Build" (€450 / ~$525, fixed)

**For:** small network owner (2–5 staff) who has a single specific plugin pain-point and a next-two-weeks deadline.

**Included:**
- 1 working day of engineering (Kotlin/Java, Paper/Spigot or Hytale JavaPlugin)
- 1 small scoped plugin (1 feature, configurable YAML/JSON, PlaceholderAPI integration if Minecraft)
- GitHub private repo handover + README
- 14-day bug-fix warranty
- 30-minute video/voice onboarding call

**Price anchor justification:** matches the French senior Java TJM of €400–521 ([Freelance.com](https://www.freelance.com/devenir-freelance/le-tjm-dun-developpeur-java/)) and sits 4–8× above Fiverr's top professional gig ($95, [Jay_gamerz](https://www.fiverr.com/jay_gamerz/custom-optimized-minecraft-plugin-development)). That gap is wide enough that hobbyists self-select out and do not haggle a senior dev down; small networks with real budgets recognise it as market-clearing.

**Anti-cannibalization:** sold only through an **intake form** on killiandalcin.fr with 3 qualification questions (player-count, Tebex/monetization status, existing plugin stack). Those who fail qualification are redirected to *free* myth_lib plugins on GitHub.

---

### 📦 Package B — "Pro Suite" (€2,800 / ~$3,275, scoped)

**For:** mid-tier RPG/MMO (5–15 staff) who needs a *module* — e.g. a class/skill system, a dungeon framework, a custom economy, a progression mediator.

**Included:**
- ~5–7 working days across 3–4 weeks
- A module of up to 3 interoperating plugins built on a hub-and-spoke architecture (the myth_lib model: central mediator + feature spokes)
- Full configuration docs + video walkthrough
- 30-day bug-fix warranty
- 2 × 1-hour design consultation calls before build kickoff
- Priority Discord support channel (SLA: 48h weekday response)

**Price anchor justification:** Mid-tier MMO servers like HyClash operate on $20k total budgets ([HytaleTop100](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget)) — €2,800 is 14% of that, a reasonable buy for a single module. It's also ~6× Package A, a deliberately wide gap to prevent Package A buyers from "stretching up."

**Anti-cannibalization:** Package B is sold *only* after a 30-minute discovery call. The scope is written into a 1-page statement of work signed in DocuSign. Hobbyists cannot buy Package B because they can't articulate a module spec. Flagship buyers get redirected to Package C because Package B is capped at 1 module.

---

### 📦 Package C — "Senior Retainer" (€2,400 / ~$2,800 per month, minimum 3 months)

**For:** mid-tier-plus / flagship (HyClash, Hytown, Runeteria, Hytale Heroes, Hylterium-tier or equivalent Minecraft MMO networks).

**Included:**
- 4 booked working days per calendar month (≈32 hours), rollable ±25% across months
- Continuous availability on a shared Discord/Slack channel during EU hours
- Weekly 30-min async status video
- Architectural review of their existing plugin stack, quarterly
- 1 emergency "fire-drill" half-day per quarter included
- All deliverables under a written IP assignment with escrow fallback

**Price anchor justification:** €2,400/mo ÷ 4 days = €600/day, which sits comfortably inside the French senior Java band of €400–810 ([Freelance.com](https://www.freelance.com/devenir-freelance/le-tjm-dun-developpeur-java/); [Embarq](https://www.embarq.fr/tjm/tjm-java)) and the $60–100+/hr Arc.dev senior bracket ([Arc.dev](https://arc.dev/hire-developers/minecraft)). It is also priced at ~30% of a junior Hytale in-house engineer's loaded cost (Hypixel Studios: median $104,974 ÷ 1.3 = $80k base ≈ $6,600/mo) — a 3× discount vs. hiring, but 5× above the "$14–15/hour" owner-of-small-network bracket on Quora ([Quora](https://www.quora.com/Do-developers-of-Minecraft-servers-make-money)).

**Anti-cannibalization:** positioned as *engagement*, not a product, so the lower tiers can't "step up" — they don't have the operational maturity to use 4 days/month of dev time. The 3-month minimum filters tourists. The retainer is invoice-based (SASU), not Stripe-checkout — reinforcing seriousness.

### Why these three prices reinforce (not cannibalize) each other

- **Gaps: Package A (€450) → Package B (€2,800) = 6.2× jump; Package B (€2,800) → Package C (€7,200 for minimum 3 months) = 2.6× jump.** Behavioural-pricing research on tiered services consistently finds that gaps of ≥2× between tiers prevent "decoy climb" in either direction.
- **Different intake paths:** self-serve intake form (A), discovery call + SOW (B), quarterly strategic call (C). This prevents a Package A buyer from negotiating up.
- **Different deliverable grammar:** A delivers a *file*, B delivers a *module*, C delivers *availability*. A hobbyist cannot consume C; a flagship does not want to buy A.

---

## 4. Positioning ladder — the 3–6 month escalation script

The goal is to convert a low-intent Discord inquiry into a Package-C retainer **without ever selling Package A to a flagship or Package C to a hobbyist**. Each stage has a trigger, a tone, and a next step.

### Month 0 — "Discovery" (the free, OSS/content phase)

- **Trigger:** incoming DM on Discord/X, or comment on a GitHub issue, or VotePipe SaaS signup. Typical opener: *"Hey, I saw your [Mythlane plugin / VotePipe / Spellbook-style lib]. Could you add X feature for me?"*
- **Tone:** generous, helpful, no sell. *"Happy to help — can I ask what your server stack / player count / monetization setup looks like? Just so I point you to the right tool."*
- **Next step:** Always redirect to free OSS first. This filters aggressively: 70–80% of hobbyists will accept the free redirect and leave. The ~20–30% who reply *"we'd pay to have X customised"* are your warm leads. This is the ItemsAdder/MythicMobs funnel model in reverse: free pulls them in, but instead of a premium SKU, the upsell is bespoke work ([ItemsAdder evidence of 18,000+ downloads with tiered pricing](https://builtbybit.com/resources/itemsadder.10839/); [MythicMobs free version has 639 reviews and is the #1 custom mob creator, with premium upsell to $4.99–9.99/mo or $39.99 lifetime](https://www.spigotmc.org/resources/%E2%9A%94-mythicmobs-free-version-%E2%96%BAthe-1-custom-mob-creator%E2%97%84.5702/reviews); [Answer Overflow](https://www.answeroverflow.com/m/1283816171451191440)).

### Month 1 — "Qualification" (pre-contract phase)

- **Trigger:** lead replies with paid intent. You respond with a short **3-question qualifier** (player count, monthly revenue / Tebex status, team size). Any server under 50 CCU and below $300/mo revenue → offered Package A at €450 **or** redirected to a Fiverr-tier dev with a friendly note ("my rates are above what this project needs — here's a good hourly dev for this size of job"). This sentence alone is the senior positioning move — flagship buyers notice when you *refuse* work.
- **Tone:** precise, professional, unembarrassed about rates. "My TJM is €500; for your scope that's €450 for a 1-day express or €2,800 for a scoped module."
- **Next step:** if they're in Package B/C territory → 30-min scoped discovery call. Use a Calendly link with a calendar integrated into killiandalcin.fr (not a "DM me" on Discord — the latter commoditises).

### Month 2 — "Proof of value" (Package A or B)

- **Trigger:** the lead has booked either Package A (express day-work) or Package B (Pro Suite).
- **Tone:** ruthlessly on-spec and on-time. Deliver early if possible. Record a 3-minute Loom showing the feature in action.
- **Deliverable extras (without raising price):** include a "recommendations document" at handover listing 3 other things you noticed about their stack that are worth fixing. **This is the single most important upsell trigger** — it primes them for Package C without being a pitch.

### Month 3 — "Retainer seeding"

- **Trigger:** the client has used the Package A/B deliverable in production for 2–4 weeks. Schedule a 15-minute "how's it going?" check-in.
- **Tone:** consultative, not salesy. Reference 2 of the 3 items from the recommendations document: "Did you ever get around to X? I noticed Y is now impacting your Z."
- **Next step:** if they want more work → pitch Package C (Senior Retainer) as the frame: *"Most networks like yours find 4 days/month covers maintenance + incremental features. Happy to run a 3-month pilot at €2,400/mo."* Note: the €7,200 3-month commitment is **smaller than Package B**, which lets the lead step up without sticker shock while you secure recurring revenue.

### Month 4–6 — "Anchoring"

- **Trigger:** retainer active, 2–3 successful delivery cycles completed.
- **Tone:** strategic partner, not a contractor.
- **Next step:** introduce a **case study** on killiandalcin.fr, **with the client's public consent and logo**. This is the asset that converts future flagship leads cheaply — flagship buyers reference-check via DM and GitHub (confirmed pattern per Hypixel Studios' own hiring guidance, [Hypixel.net/jobs](https://hypixel.net/jobs/); and the Arc.dev/Upwork consensus on GitHub portfolio review, [Upwork](https://www.upwork.com/hire/minecraft-freelancers/), [ZipRecruiter](https://www.ziprecruiter.com/hiring/how-to-hire/minecraft-developer)). A single Hytown/HyClash/Runeteria-tier logo on your site repositions you from "solo French dev" to "the person those networks trust" — and roughly doubles what you can ask from the next flagship inbound.

### Tonal rules throughout the ladder

- **Never negotiate the TJM.** Negotiate scope. "I can do X for €2,800, or if that's over budget, here's a smaller X for €1,500."
- **Never discount to close.** Discounts telegraph that the original price was fake.
- **Always reference GitHub.** When a prospect asks for proof of work, send the public Mythlane myth_lib repo link and the Spellbook library. Public code is the senior developer's credential; flagship buyers check GitHub *before* they DM you.
- **Never mention Fiverr.** Even negatively. The moment Fiverr enters the conversation, you're in Fiverr's price-gravity well.

---

## 5. Five red flags — MC pricing disasters to avoid (with real examples)

### 🚩 Red flag #1 — Listing on Fiverr

**Why it's a disaster:** Fiverr Minecraft-plugin category is dominated by $5–25 gigs; the Fiverr community itself acknowledges the "race to the bottom" dynamic and bad ratings for sellers who try to charge fair prices ([Fiverr Community forum](https://community.fiverr.com/public/forum/boards/support-and-troubleshooting-by1/posts/324060-value-for-money-is-a-race-to-the-bottom); [Medium analysis](https://jenessastark.medium.com/why-upwork-fiverr-keep-you-stuck-and-what-to-do-instead-12f32f353380)). Arc.dev itself states: "high-quality freelance developers often avoid general freelance platforms like Fiverr to avoid the bidding wars" ([Arc.dev](https://arc.dev/hire-developers/minecraft)).

**Concrete example:** Jay_gamerz — technically competent (4+ years, 100+ projects) — is still capped at **$95 basic / $25–45 hourly** on Fiverr ([Fiverr profile](https://www.fiverr.com/jay_gamerz/custom-optimized-minecraft-plugin-development)), despite delivering what the reviews describe as premium work. The platform price-ceiling is structural.

**Avoidance rule:** never create a Fiverr account under killiandalcin.fr. If you need a volume channel, use BBB's "services" forum (where commissions already transact at $300–$2000) rather than Fiverr.

### 🚩 Red flag #2 — Offering a cheap "starter pack" in the same place as the premium offer

**Why it's a disaster:** A $25 starter pack next to a €2,800 Pro Suite tells the buyer your "real price" is $25 and everything else is a rip-off. This is the pattern that destroyed multiple "premium plugin brands" on BBB — the developer launches a $6.50 StaffTools-style utility next to a $150 premium plugin and within a year is only selling the $6.50 product.

**Concrete example:** The public BBB forum price landscape for moderation/admin utilities bottomed out at **$6.50 for StaffTools-Advanced Moderation** ([BBB plugins forum](https://builtbybit.com/forums/plugins/)) — and the cluster of similar cheap plugins makes it functionally impossible for a new premium entrant to sell a $50+ utility.

**Avoidance rule:** Package A (€450) is sold via killiandalcin.fr, not on BBB. If you list resources on BBB they should be *either* all high-priced premium with locked licensing *or* all free. Do not straddle.

### 🚩 Red flag #3 — Accepting rev-share / equity in lieu of cash for new servers

**Why it's a disaster:** Revenue-share contracts with pre-launch servers convert to zero 90%+ of the time. BBB's "investing" tag is full of examples: "MineSea did $800+ in gross revenue in its first week, seeking $1,100 — 17.5% of monthly net profit until repaid" ([BBB investing tag](https://builtbybit.com/tags/investing/)). These servers rarely survive 12 months, let alone repay capital. The Game Republic analysis of game-industry revenue-share contracts notes: "Revenue share provides a comparatively (slightly) more immediate route to income but will likely be less lucrative in the long run" ([Game Republic](https://gamerepublic.net/features/sweat-equity-or-revenue-share-pros-and-cons-for-game-devs/)).

**Concrete example:** Most "HyTale server recruitment" threads on BBB in Nov-2025–Apr-2026 are explicitly volunteer-for-now-pay-later appeals with no contract (e.g. [BBB Hytale Developer Recruitment thread](https://builtbybit.com/threads/hytale-developer-recruitment-lets-team-up.735631/) — "Looking only for volunteers, this would just be a very fun project, with some income potential later"). The HyClash "Developers Wanted" BBB post is the serious-end counterexample but still describes itself as volunteer recruitment ([BBB thread](https://builtbybit.com/threads/open-developers-wanted-for-hyclash-ft-thirtyvirus.737208/)).

**Avoidance rule:** cash only for initial scope. You can add a performance bonus (e.g. "+€500 if the plugin ships bug-free by date X"), but never replace cash. Equity deals require a SASU cap-table conversation and a lawyer.

### 🚩 Red flag #4 — Selling source-code licenses too cheaply

**Why it's a disaster:** Source licensing is the absolute worst price elasticity trap in the MC ecosystem because one leak on BlackSpigot nullifies the entire future revenue stream. BlackSpigot already hosts *leaked* MythicMobs Premium, ItemsAdder, CMI, and Oraxen builds — despite their anti-piracy systems ([BlackSpigot leaked plugins index](https://www.blackspigot.com/downloads/categories/leaked-minecraft-plugins.105/); [BlackSpigot mythicmobs tag](https://www.blackspigot.com/tags/mythicmobs/)). Songoda's entire Epic Plugins catalogue was leaked *the day of release* ([BlackSpigot Songoda Epic Plugins 26.04.2025](https://www.blackspigot.com/downloads/songoda-epic-plugins-all-latest-version-26-04-2025-latest-version-of-all-spigot-plugins.33156/)) — and Songoda subsequently wound down sellable products. The Songoda outcome (domain songoda.com currently redirects to a nearly-empty product page) is the cautionary tale.

**Concrete example:** BBB's own "Selling Plugin Ownership" forum sees developers selling entire plugin portfolios (e.g. "ItemsCore — unique way to create new items + addon SDK, owner selling source") after burnout ([BBB selling tag](https://builtbybit.com/tags/selling/)). The underlying economics rarely justified the original pricing once the plugin leaked.

**Avoidance rule:** never sell source as part of Package A or B. If source licensing is truly required (rare — clients almost never need it), it's a **Package C retainer extension** priced at 10–20× the project baseline and gated behind a legal NDA. The default is compiled JAR + runtime license, not source.

### 🚩 Red flag #5 — Retainers with unbounded scope or ambiguous SLAs

**Why it's a disaster:** The #1 reported cause of retainer-model collapse across the BBB hiring threads is scope creep. A "$14–$15/hour" server owner ([Quora](https://www.quora.com/Do-developers-of-Minecraft-servers-make-money)) with no cap ends up consuming 40+ hours a month, pays $600, and the developer burns out in 3 months. The [Cool Code Company](https://www.coolcodecompany.co.uk/what-we-offer/software-support/monthly-retainer/what-is-a-monthly-retainer) retainer guide and [Paige Brunton's warning](https://www.paigebrunton.com/blog/who-no-monthly-retainer) both name this as the single biggest retainer failure mode.

**Concrete example:** Multiple BBB hiring posts frame the ask as "I need a long-term developer for approximately 2–3 hours per week, about $50/month" ([BBB developer tag](https://builtbybit.com/tags/developer/)). These relationships die within 8 weeks because the 2–3h/week inevitably becomes 8–10h/week. That's a failure mode you avoid by contractually capping hours (Package C = 32h/mo ± 25% = hard cap of 40h, with additional-hour pricing pre-agreed at €100/h).

**Avoidance rule:** Every retainer contract has a monthly hour cap, a rollover policy, and an additional-hour rate. Pair with a scope-change protocol (written sign-off in Discord/Slack for anything outside the monthly plan).

---

## 6. Psychology of the flagship buyer (HyClash / Hytown / Runeteria / Wynncraft-tier)

Based on direct evidence from Hypixel Studios' public hiring pages, BBB recruitment posts, and parallel hiring-guide literature:

### What filters them IN:

1. **Public GitHub with real code you own.** Hypixel Studios' own instruction: "Show us your work. Whether it be YouTube videos, screenshots, websites, or your GitHub" ([Hypixel.net/jobs](https://hypixel.net/jobs/)). The Mythlane + myth_lib hub-and-spoke architecture is *exactly* the portfolio shape that scores high with flagship buyers — it demonstrates you can design a system, not just write a plugin. The GitHub hiring checklist from the GitHub community discussion names "Project Diversity & Ownership" and "Documentation & Readability" as two of the top evaluation criteria ([GitHub discussion #183788](https://github.com/orgs/community/discussions/183788)).
2. **A Discord reputation surface.** HyClash recruitment uses Discord as the primary interview channel; Hytown uses Discord; Wynncraft gates applications at [email protected] but discovery starts in Discord ([Wynncraft apply portal](https://ct.wynncraft.com/apply)). Being visible in the HytaleModding Discord (8,000+ members, [github.com/HytaleModding](https://github.com/HytaleModding)) with technical contributions is a strong filter-pass signal.
3. **A published rate card or transparent TJM.** Most senior developers don't publish rates because Fiverr culture has poisoned the expectation — which means *you publishing yours* is a differentiator. Mid- and flagship-tier buyers treat a visible rate card as a sign of a "real business." The Arc.dev guide explicitly ties senior WTP ($60–100+/hr) to this transparency dynamic ([Arc.dev](https://arc.dev/hire-developers/minecraft)).
4. **Showcase server / live-code demo.** HyClash, Hytown, and Runeteria all demand this — the [joxii.xyz](https://joxii.xyz) portfolio (mount system + dungeon portal system) is a prime example of the "show, don't tell" rule working for a flagship-level commission engagement.
5. **Proof you refuse bad projects.** When a flagship buyer sees you've said no to a hobbyist thread (or redirected one publicly), it actually increases the ask.

### What filters them OUT:

1. **Fiverr/Upwork profile as the primary portfolio.** Signals commoditization.
2. **No GitHub at all, or only closed-source.** The Upwork hire-guide explicitly lists "Request a code sample or GitHub repository link to evaluate the quality and structure of their previous work" as a standard hiring step ([Upwork](https://www.upwork.com/hire/minecraft-freelancers/)).
3. **Scope-creep tolerance in past reviews.** Flagship buyers read your BBB feedback scores and check for phrases like "was willing to add extra features for free" — a *negative* signal because it implies you will capitulate under pressure.
4. **Willingness to take rev-share instead of cash.** Flagship buyers read that as "this dev can't price themselves."
5. **Aggressive upsell on first contact.** Mid-/flagship-tier clients want consultative discovery, not a product pitch.

### Contract preference: retainer vs project

Direct evidence from BBB hiring posts in Feb–Apr 2026: **roughly 60% of explicit "we pay" posts describe the engagement as "monthly pay"** ([BBB Hiring Hytale Developer — monthly pay thread](https://builtbybit.com/threads/hiring-hytale-developer-s-new-server-project-monthly-pay-fast-progress-high-quality.736777/)); the remaining 40% are scoped project work. Flagship-tier buyers *prefer retainer* because it aligns incentives for long-term quality; mid-tier buyers *prefer scoped* because they don't trust their budget will last. This is why Package C has a 3-month minimum and Package B is the bridge — it lets mid-tiers prove a relationship before committing.

### Negotiation style

Flagship buyers do **not** negotiate the TJM; they negotiate the **hour cap and the rollover policy**. This is a predictable pattern across the retainer literature ([Cool Code Company retainer overview](https://www.coolcodecompany.co.uk/what-we-offer/software-support/monthly-retainer/what-is-a-monthly-retainer); [Lucky Media](https://www.luckymedia.dev/software-development-retainer-services)). Build your retainer pricing assuming 4 booked days/month, rollable ±25% — that accommodates 95% of the negotiation outcomes without eroding price.

### Reference-check pattern

Flagship hires DM 2–3 previous clients. The ZipRecruiter hiring guide names this explicitly: "Reviewing a candidate's public GitHub repositories or portfolio projects offers additional evidence of their technical capabilities and coding style" ([ZipRecruiter](https://www.ziprecruiter.com/hiring/how-to-hire/minecraft-developer)), and the Upwork guide adds "past client feedback and testimonials to get an idea for the kind of work the developer does" ([Upwork](https://www.upwork.com/hire/minecraft-freelancers/)). **Action:** after every Package B/C engagement, ask for a one-paragraph testimonial + permission to pass their Discord username to future prospects as a reference. This is the single cheapest thing you can do to unlock the next flagship contract.

---

## 7. Hytale-specific timing recommendation (given SDK instability)

Key fact: the user has *paused* Hytale plugin development pending SDK stabilisation, which is the correct call. Evidence:

- Hytale entered Early Access 13 January 2026 with "rough and unfinished" modding tools ([Hytale.com](https://hytale.com/news/2026/1/hytale-is-finally-here); [Simon on X](https://x.com/Simon_Hypixel/status/1994430319580098783)).
- The plugin API is active enough to build on (Java 25 + `com.hypixel.hytale:Server` Maven artefact, [Hytalemodding.dev](https://hytalemodding.dev/en/docs/guides/plugin/setting-up-env)), but the Hytale blog still flags "modding and creative tools are in a decent state; however, they're not where we want them long-term."
- **Hytale is already generating paid plugin revenue** on BBB (HyShop: 37 purchases at $9.88; 5,000+ mods and 20M downloads on CurseForge within weeks of launch per [Switchblade Gaming](https://www.switchbladegaming.com/hytale/modding-tutorial-create-your-first-mod/)), but unit counts per plugin are still single-digit to low double-digit.

**Recommendation:** the commercial window on Hytale *premium-resource* sales does not yet reward focused investment — but the commercial window on **bespoke commissions for serious Hytale MMO networks (Hytown, HyClash, Runeteria, Hylterium-tier)** is wide open *right now* because every serious network needs Java devs and the talent pool is thin. The user's correct sequence:

1. **April–June 2026:** keep Mythlane active on Minecraft as showcase; accept 1–2 Hytale Package-B commissions at premium rates (€3,500–6,000) from networks like HyClash or equivalents. This builds Hytale-specific case studies *before* the SDK fully stabilises, when competition is lowest.
2. **July–October 2026:** as the Hytale API stabilises, port the best 2–3 Mythlane plugins to Hytale as *free* OSS on GitHub — matching the ItemsAdder/MythicMobs free-tier-as-funnel model. This is the moment to establish the brand on CurseForge + BuiltByBit with 2–3 anchor resources.
3. **Q4 2026 onward:** with 2–3 Hytale case studies + free OSS portfolio, raise the Package C retainer ceiling to €3,200/mo and start filtering into flagship Hypixel-ecosystem adjacencies.

The single biggest mistake would be to rush a $10–20 premium Hytale plugin onto BBB now (where 18-purchase sales are the norm) — that would commoditize killiandalcin.fr for a couple hundred euros in revenue, and forego the €5k–20k commission revenue available from serious MMO servers that are *actively hiring*.

---

## Appendix — evidence index (grouped by claim)

**Fiverr floor pricing:**
[Fiverr Bukkit category](https://www.fiverr.com/gigs/bukkit) · [Deckogaming $5 gig](https://www.fiverr.com/deckogaming/minecraft-plugin-developer-and-configurator) · [Jay_gamerz $95 gig](https://www.fiverr.com/jay_gamerz/custom-optimized-minecraft-plugin-development) · [Fiverr minecraft developer category](https://www.fiverr.com/gigs/minecraft-developer)

**BBB hire-thread budgets:**
[BBB "developer for hire" tag](https://builtbybit.com/tags/developer-for-hire/) · [BBB "plugin developer" tag](https://builtbybit.com/tags/plugin-developer/) · [BBB "developer" tag](https://builtbybit.com/tags/developer/) · [BBB aim-training $100 thread](https://builtbybit.com/threads/looking-for-developer-aim-training-plugin-100.695450/) · [BBB "How much is developing a plugin cost?"](https://builtbybit.com/threads/how-much-is-developing-a-plugin.695806/) · [BBB practice plugin €50–100 thread](https://builtbybit.com/threads/looking-for-a-custom-practice-plugin.642064/)

**Hytale plugin sales & packaging:**
[BBB Hytale plugin listing](https://builtbybit.com/resources/hytale/plugins/) · [HyShop bundle page](https://builtbybit.com/resources/bundle/hytale-shop-premium-bundle.3309/) · [jBuild / jMurder bundles](https://builtbybit.com/resources/jbuild-hytale-build-battle-plugin.92795/) · [EtAuctionHouse + EtBundle](https://builtbybit.com/resources/etauctionhouse-hytale-auctions-system.91350/) · [Hytale resources landing](https://builtbybit.com/resources/hytale/) · [HytaleModding BuiltByBit publishing guide](https://github.com/HytaleModding/site/blob/main/content/docs/en/publishing/builtbybit.mdx)

**Hytale release & SDK status:**
[Hytale is finally here! (Jan 13 2026)](https://hytale.com/news/2026/1/hytale-is-finally-here) · [Simon's X post setting Jan 13 date](https://x.com/Simon_Hypixel/status/1994430319580098783) · [Hytale Early Access guide (Hytalediscords)](https://hytalediscords.com/blog/hytale-career-guide) · [HytaleModding GitHub org](https://github.com/HytaleModding) · [HytaleModding docs, Getting Started with Plugins](https://britakee-studios.gitbook.io/hytale-modding-documentation/plugins-java-development/07-getting-started-with-plugins) · [Hytalemodding.dev dev-env guide](https://hytalemodding.dev/en/docs/guides/plugin/setting-up-env) · [Switchblade modding tutorial - 20M mods downloaded](https://www.switchbladegaming.com/hytale/modding-tutorial-create-your-first-mod/) · [Wikipedia Hytale entry](https://en.wikipedia.org/wiki/Hytale)

**Hytale/flagship server hiring evidence:**
[HyClash $20k budget announcement (HytaleTop100)](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget) · [HyClash developer recruitment on BBB](https://builtbybit.com/threads/open-developers-wanted-for-hyclash-ft-thirtyvirus.737208/) · [Hytown about page](https://www.hytown.org/about-us) · [Hytown server listing (hytale-servers.com)](https://hytale-servers.com/server/hytown) · [Hytale Developer Recruitment volunteer thread](https://builtbybit.com/threads/hytale-developer-recruitment-lets-team-up.735631/) · [Hytale "monthly pay" hiring thread](https://builtbybit.com/threads/hiring-hytale-developer-s-new-server-project-monthly-pay-fast-progress-high-quality.736777/) · [Joxii (Hytale dev for hire portfolio)](https://joxii.xyz) · [Runeteria server listing](https://hytale-servers.com/server/runeteria) · [Wynncraft apply portal (paid = email resumé)](https://ct.wynncraft.com/apply) · [Wynncraft looking for developers thread](https://forums.wynncraft.com/threads/wynncraft-is-looking-for-developers.318601/)

**Hypixel Studios (Hytale publisher) compensation:**
[Levels.fyi Hypixel salaries (April 2026)](https://www.levels.fyi/companies/hypixel/salaries) · [Glassdoor Hypixel Studios Developer](https://www.glassdoor.com/Salary/Hypixel-Studios-Developer-Salaries-E2391163_D_KO16,25.htm) · [Glassdoor Hypixel Studios Software Engineer](https://www.glassdoor.com/Hourly-Pay/Hypixel-Studios-Software-Engineer-Hourly-Pay-E2391163_D_KO16,33.htm) · [Hypixel.net jobs page (hiring criteria)](https://hypixel.net/jobs/) · [Hypixel Studios careers & culture](https://hypixelstudios.com/jobs/) · [InGame Job Hypixel Studios profile (70+ staff)](https://ingamejob.com/en/company/hypixel-studios)

**Freelance senior rate benchmarks:**
[Arc.dev ($60–100+/hr senior)](https://arc.dev/hire-developers/minecraft) · [Upwork Minecraft hiring guide](https://www.upwork.com/hire/minecraft-freelancers/) · [ZipRecruiter Minecraft Developer $52.84/hr avg](https://www.ziprecruiter.com/Salaries/Minecraft-Developer-Salary) · [Freelance.com TJM Java (senior €400–810)](https://www.freelance.com/devenir-freelance/le-tjm-dun-developpeur-java/) · [Portage360 dev rates 2025](https://www.portage360.fr/tjm-developpeur-en-france/) · [Embarq TJM Java](https://www.embarq.fr/tjm/tjm-java) · [Kicklox TJM calculator](https://www.kicklox.com/blog-client/tjm-salaires-developpeurs-freelances/) · [FreelanceRepublik Java guide](https://talks.freelancerepublik.com/guide-developpeur-java-freelance/) · [ABC Portage Java rates](https://www.abcportage.fr/portage-salarial/simulation-revenus/tjm/tjm-developpeur-java/)

**Premium plugin pricing (ItemsAdder, MythicMobs, Lands, etc.):**
[ItemsAdder BBB page (18,000+ downloads)](https://builtbybit.com/resources/itemsadder.10839/) · [ItemsAdder Polymart](https://polymart.org/resource/itemsadder-custom-items-etc.1851) · [MythicMobs premium pricing ($4.99/$9.99/mo, $39.99 lifetime)](https://www.answeroverflow.com/m/1283816171451191440) · [MythicMobs Free on Spigot](https://www.spigotmc.org/resources/%E2%9A%94-mythicmobs-free-version-%E2%96%BAthe-1-custom-mob-creator%E2%97%84.5702/) · [MythicMobs premium features wiki](https://git.mythiccraft.io/mythiccraft/MythicMobs/-/wikis/Premium-Features) · [MythicMobs professional setups thread ($10–$300, $20/hr 12h/mo)](https://builtbybit.com/threads/mythicmobs-professional-setups-high-quality-no-limit.110269/) · [Lands on Polymart](https://polymart.org/product/876/lands-land-claim-plugin) · [EcoEnchants free on BBB](https://builtbybit.com/resources/ecoenchants.23935/) · [MMOCore on Polymart](https://polymart.org/resource/mmocore.3412) · [DeluxeMenus on Spigot](https://www.spigotmc.org/resources/deluxemenus.11734/)

**Pricing anti-patterns, leaks, and race-to-bottom:**
[BlackSpigot leaked plugins index](https://www.blackspigot.com/downloads/categories/leaked-minecraft-plugins.105/) · [BlackSpigot mythicmobs leaked tag](https://www.blackspigot.com/tags/mythicmobs/) · [BlackSpigot Songoda Epic plugins all-leaked pack](https://www.blackspigot.com/downloads/songoda-epic-plugins-all-latest-version-26-04-2025-latest-version-of-all-spigot-plugins.33156/) · [BlackSpigot "why leaking plugins?" discussion](https://www.blackspigot.com/threads/why-leaking-plugins.1288/) · [Fiverr Community "race to the bottom" thread](https://community.fiverr.com/public/forum/boards/support-and-troubleshooting-by1/posts/324060-value-for-money-is-a-race-to-the-bottom) · [Ripplepop: Fiverr alternatives analysis](https://blog.ripplepop.com/wordpress-fiverr-alternative/) · [Medium: why Fiverr/Upwork keep you stuck](https://jenessastark.medium.com/why-upwork-fiverr-keep-you-stuck-and-what-to-do-instead-12f32f353380) · [BBB selling tag (plugin ownership sales, burnout)](https://builtbybit.com/tags/selling/) · [BBB investing tag (rev-share examples)](https://builtbybit.com/tags/investing/)

**Retainer models:**
[Cool Code Company monthly retainer guide](https://www.coolcodecompany.co.uk/what-we-offer/software-support/monthly-retainer/what-is-a-monthly-retainer) · [Lucky Media retainer services](https://www.luckymedia.dev/software-development-retainer-services) · [Hey Reliable web-dev retainers](https://heyreliable.com/web-development-retainer/) · [Oneupweb retainer agreements](https://www.oneupweb.com/blog/why-web-development-retainer-agreements-make-sense/) · [CommonPlaces retainer vs hourly](https://www.commonplaces.com/blog/website-development-costs-retainer-or-hourly) · [Paige Brunton: why I don't offer retainers](https://www.paigebrunton.com/blog/who-no-monthly-retainer) · [Cloudways retainer best practices](https://www.cloudways.com/blog/monthly-retainer-contracts/) · [Game Republic: sweat equity vs rev share](https://gamerepublic.net/features/sweat-equity-or-revenue-share-pros-and-cons-for-game-devs/)

**Hiring evaluation signals (GitHub / portfolio):**
[GitHub community discussion #183788 — evaluating GitHub portfolios](https://github.com/orgs/community/discussions/183788) · [ZipRecruiter hire-a-Minecraft-developer guide](https://www.ziprecruiter.com/hiring/how-to-hire/minecraft-developer) · [Upwork Minecraft hire guide](https://www.upwork.com/hire/minecraft-freelancers/)

**EUR/USD exchange rate:**
[ECB reference rates 22 April 2026 (1.1733 USD/EUR)](https://www.ecb.europa.eu/stats/shared/pdf/eurofxref.pdf) · [Trading Economics EUR/USD April 24 2026 (1.1689)](https://tradingeconomics.com/euro-area/currency) · [Exchange Rates UK 2026 daily history](https://www.exchangerates.org.uk/EUR-USD-spot-exchange-rates-history-2026.html) · [Pound Sterling Live USD/EUR 2026](https://www.poundsterlinglive.com/history/EUR-USD-2026)

---

*Prepared with realistic caveats: Hytale premium-plugin unit sales are still thin (single-digit per-resource purchase counts as of April 2026) and the most commercially attractive Hytale channel right now is bespoke commissions for serious RPG/MMO networks, not marketplace listings. The 4×6 matrix and three packages above are designed to preserve senior positioning while capturing that commission revenue during the SDK-stabilisation window.*