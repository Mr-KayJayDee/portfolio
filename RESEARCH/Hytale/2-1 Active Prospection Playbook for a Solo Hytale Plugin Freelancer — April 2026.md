# Active Prospection Playbook for a Solo Hytale Plugin Freelancer — April 2026

**Prepared for: Killian Dal-Cin (killiandalcin.fr)**
**Time budget: 5–10 h/week active prospection, zero paid ads, 6-month horizon**
**Goal: 2–5 qualified leads/month, funnel one-offs (€200–2,000) into recurring retainers (€800–2,500/month)**

---

## Executive Summary

Hytale launched into Early Access on **13 January 2026** after a chaotic cancellation-and-revival arc ([Hytale](https://hytale.com/news/2026/1/hytale-is-finally-here)). Since launch the ecosystem has moved faster than most expected: Hypixel Studios confirms **4,000+ published mods and 10M+ downloads** within the first ten weeks ([CurseForge](https://hytale.curseforge.com/newworldscontest/)), the official Discord passed **559,000 members** ([Discord](https://discord.com/invite/hytale)), and HytaleCharts already lists **432+ active community servers** ([HytaleCharts](https://hytalecharts.com/)). Critically, **plugins are written in Java on the JVM** with a pom-based template supporting both Java and Kotlin out of the box ([HytaleModding/plugin-template](https://github.com/HytaleModding/plugin-template)), and BuiltByBit opened official Hytale support on launch day ([BuiltByBit](https://builtbybit.com/threads/were-expanding-to-support-hytale-on-january-13th.735764/page-2)).

This is a **gold-rush moment for a senior JVM freelancer**: demand is spiking, supply is mostly juniors and hobbyists, and the big server operators (HyClash, Hytown, Hyternal, Histatu, Runeteria, AresRPG, HYLTERIUM…) are in the middle of their first hiring waves. The strategic thesis of this report is:

1. **BuiltByBit "Hiring Developers" threads + DM cold outreach to flagship server Discords are the two highest-ROI channels right now** — above Twitter/YouTube, above SEO, above Reddit.
2. **Kotlin + 7-year full-stack seniority is a differentiator, not a handicap**, provided you frame output in Java bytecode terms (plugin JARs identical to Java).
3. **The retainer motive cannot be the opener** — every piece of literature on freelance retainers is explicit that you sell a one-off first and upgrade later ([Studio Fellow](https://studiofellow.com/articles/retainers/), [Bidsketch](https://www.bidsketch.com/blog/sales/freelance-retainer-agreement/)). Design the first €300–800 plugin as a qualifying trial.
4. **A blog is a 6-month bet, not a 6-week one.** The short-term prospection ROI lives in forum replies, DMs and Twitter/X GIF demos. The blog's job is to justify the pitch, not to generate it.

---

## 1. Channel ROI Audit — Ranked for Hytale Dev Freelance, April 2026

| Rank | Channel | Effort/hr | Signal quality | Conversion speed | 6-mo potential |
|------|---------|-----------|----------------|------------------|----------------|
| **1** | BuiltByBit "Hiring Developers" threads (Hytale tag) | Low | High (buyer-intent) | Days | Very high |
| **2** | Targeted DMs to flagship server owners via their Discords | Medium | Very high | Days–weeks | Very high |
| **3** | HytaleModding Discord presence (help + showcase) | Low-medium | Medium | Weeks | High (compounding) |
| 4 | Twitter/X weekly GIF-demo cadence | Medium | Medium | Weeks–months | High (long-tail) |
| 5 | CurseForge published mods / Mod Jam entries | High | High (authority) | Months | Very high |
| 6 | Guest content on Britakee docs / Kaupenjoe / joxii cross-promo | Medium | High | Months | High |
| 7 | YouTube 30–90s dev-log shorts | Medium-high | Medium | Months | Medium |
| 8 | Blog SEO on killiandalcin.fr/blog | Low-medium | Low-medium | 3–6+ months | Medium (defensive) |
| 9 | Reddit r/Hytale / r/admincraft | Low | Low | Rare | Low |
| 10 | Cold-DM server owners found only via HytaleCharts/HyServers (no Discord touch) | High | Low | Rare | Low |

### 1.1 BuiltByBit — the #1 channel (and it isn't close)

BuiltByBit (formerly MC-Market) **added an official Hytale section on 13 January 2026** with a dedicated "Hytale mod & plugin development" subforum and "Hiring Developers" threads that have been populated daily since ([BuiltByBit](https://builtbybit.com/threads/were-expanding-to-support-hytale-on-january-13th.735764/page-2), [BuiltByBit plugin dev forum](https://builtbybit.com/forums/development/minecraft-plugins/)). Typical Hytale threads you can observe live include:

- "Hiring Hytale Developer(s) - New Server Project (Monthly Pay, Fast Progress, High Quality)" posted Jan 18, 2026 — explicit monthly-pay intent, asks for Hytale/server dev experience and portfolio ([BBB 736777](https://builtbybit.com/threads/hiring-hytale-developer-s-new-server-project-monthly-pay-fast-progress-high-quality.736777/)).
- "[REQUEST][20 Hours/week] Hytale Development for large scaled project. High Budget with long term roadmap" — explicitly a retainer-shaped brief: "Expect to dedicate 20 hours a week… Developers will be vetted for experience" ([BBB 737528](https://builtbybit.com/threads/request-20-hours-week-hytale-development-for-large-scaled-project-high-budget-with-long-term-roadmap.737528/)).
- "[OPEN] Developers Wanted For HyClash ft. ThirtyVirus" — Lead Game Dev "auvq" posts on behalf of ThirtyVirus' $20K-budgeted MMORPG, recruiting Java developers into a "real team with an active codebase and a clear roadmap" ([BBB 737208](https://builtbybit.com/threads/open-developers-wanted-for-hyclash-ft-thirtyvirus.737208/)).
- Many paid one-off briefs such as "budget is between 50-100 EURO" ticket-style commissions ([BBB developer tag](https://builtbybit.com/tags/developer/)).

**Why it's #1:** intent is explicit ("we are hiring, DM me"), the thread tags filter for Hytale only, and reply etiquette is already normalized — clients expect a DM-on-thread response with portfolio links ([BuiltByBit developer-for-hire tag](https://builtbybit.com/tags/developer-for-hire/)). One or two well-crafted replies per week can realistically produce 1–2 qualified conversations per month.

**What makes a reply convert (observed pattern across BBB hiring threads):**
- First paragraph specific to *their* brief (not a template),
- Immediate, visible portfolio link (killiandalcin.fr + GitHub URL),
- 1–2 line signal of seniority (years, stack, similar Minecraft analogue you've shipped),
- Direct Discord handle in the reply body — threads that rely on "DM me on site" convert noticeably less than ones that drop a handle (observable by counting reactions on duckontren / joxii-style threads, [BBB 729949](https://builtbybit.com/threads/open-free-minecraft-dev-work.729949/)).

### 1.2 Discord DM outreach — the #2 channel

Hytale's structure makes Discord the single highest-leverage discovery graph in the ecosystem. Every flagship server lists its Discord in the HytaleCharts / HyServers / hytale.game directories, with community sizes ranging from ~400 members (HyClash pre-beta) to 57,000+ (Hytown-adjacent) ([HytaleTop100](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget), [HytaleCharts](https://hytalecharts.com/servers)).

**How to find the 10–30 flagship Discords (no public directory exists, so build it manually in ~90 minutes):**
1. Scrape HytaleCharts top-50 by votes ([HytaleCharts](https://hytalecharts.com/servers)), HyServers ([HyServers](https://hyservers.gg/)), HytaleTop100 and hytale.game server list — the overlap is your "flagship" list (Hytown, HyClash, Hyternal, Runeteria, Histatu, Ethertale, Dogecraft, Hyvale, AresRPG, HYLTERIUM, Hyforger, Escape From Hytale, Hyspain, HyWay Brasil, Hyasia, Mythica, Aetherion, DreamTale, etc.).
2. Each listing exposes a Discord invite; join them all on a prospection-only Discord account.
3. Cross-reference with BuiltByBit Hytale hiring threads from the last 60 days — anyone actively recruiting is a priority target.
4. Use Hytale Hub forum directory ([HytaleHub](https://hytalehub.com/groups/categories/discord-servers.5)) and hytale.game Discord list ([hytale.game](https://hytale.game/en/discord-server/)) to fill gaps.

**Discord DM etiquette / deliverability gotchas ([Discord Community Guidelines](https://discord.com/guidelines), [Techbloat guide](https://www.techbloat.com/discord-how-to-send-direct-message-to-non-friend.html)):**
- Many large servers disable member-to-member DMs (spam protection). When DMs are blocked, **reply inside their #looking-for-dev or #dev-chat channel**, then invite them to DM you — not the reverse.
- Never bulk-DM: Discord's rule 13 explicitly prohibits unsolicited bulk messaging. One-to-one, specifically referenced outreach is acceptable; the same copy-pasted message across 20 servers can get your account removed.
- Always reference a specific signal from their server: a bug in a plugin you noticed, a feature they publicly asked for, a thread on their BBB post.

### 1.3 HytaleModding Discord — #3 (credibility, not direct leads)

The HytaleModding Discord hosts ~9,800 members and is effectively the unofficial technical HQ of the ecosystem, alongside the partnering CurseForge/Hypixel channels ([HytaleModding Discord](https://discord.com/invite/hytalemodding), [GitHub org](https://github.com/HytaleModding)). They open-source their plugin-template, Hyssentials library, and patcher tooling. It is **not a job-board** — very few "looking for dev" posts — but it is where Britakee, Kaupenjoe, FancyInnovations, Darkhax/Jared, and Build-9 all hang out ([Britakee template](https://github.com/realBritakee/hytale-template-plugin), [Build-9 template](https://github.com/Build-9/Hytale-Example-Project), [FancyInnovations](https://github.com/FancyInnovations/HytalePlugins)). Consistently answering technical questions in #plugin-help over 6 months builds the single most valuable asset in this market: **niche reputation** — which in turn converts cold BBB replies 2–3× better.

### 1.4 Twitter/X — #4 (slow-burn lead magnet, not quick wins)

Howtomarketagame's breakdown of @sbuggames and EXOR Studios shows the pattern: **short GIFs of a single cool mechanic are the viral unit, not threads and not screenshots** ([How To Market A Game](https://howtomarketagame.com/2021/02/01/how-to-get-more-twitter-followers-and-promote-your-indie-game/)). Game Developer's tips reinforce that GIFs/videos outperform static tweets and that 2–4 posts/week is the sustainable cadence ([Game Developer](https://www.gamedeveloper.com/business/12-tips-to-improve-your-twitter-for-gamedev)). Indie Hackers' "build in public" strategies document that 4 months of consistent posting typically yields 500–5,000 engaged followers — enough to launch a product but **not enough to match BBB leads in the first 3 months** ([Teract.ai](https://www.teract.ai/resources/twitter-strategy-indie-hackers-2026)).

For Killian specifically, the highest-ROI Twitter tactic is to be **visible in the Hytale dev circle** — reply to Kaupenjoe, ThirtyVirus, Britakee, auvq, joxii with technical insight. This is networking disguised as content.

### 1.5 CurseForge contributions — #5 (authority, not distribution)

CurseForge became Hytale's official mod hub at launch ([CurseForge](https://www.curseforge.com/hytale)). The **$100,000 New Worlds Modding Contest runs 3 March – 28 April 2026** across three categories (WorldGen, NPCs, Experiences) ([CurseForge contest](https://hytale.curseforge.com/newworldscontest/), [Hytale blog](https://hytale.com/news/2026/3/hytale-new-worlds-modding-contest)). The first unofficial Mod Jam (30 Jan – 4 Feb 2026) drew 160+ entries for a $5K pool, judged partly by two Hypixel Studios developers ([HytaleCharts recap](https://hytalecharts.com/news/hytale-mod-jam-recap-curseforge-highlights-2026)). **Publishing even one well-received CurseForge mod is a permanent credibility asset** that stays in BBB thread replies forever. Timing-wise, the New Worlds contest submission window closes three days after the prospection plan starts — if Killian is within striking distance of a publishable entry, submit; otherwise plan for the next modjam cycle.

### 1.6 Britakee / joxii / Kaupenjoe content ecosystem — #6

There is a small, identifiable layer of dev-influencers worth engaging:
- **Britakee** runs the GitBook docs used as the community's default reference and a widely-forked plugin template ([Britakee GitBook](https://britakee-studios.gitbook.io/hytale-modding-documentation/plugins-java-development/07-getting-started-with-plugins), [Britakee template](https://github.com/realBritakee/hytale-template-plugin)).
- **joxii (Owen)** runs joxii.xyz, a direct-competitor-slash-peer Hytale mod-dev-for-hire site, with 5+ years Java, commissioned work in class systems / matchmaking / economy — a useful benchmark for positioning and pricing ([joxii.xyz](https://joxii.xyz)).
- **Kaupenjoe** is the official Hytale Modding Ambassador, runs the #1 modding YouTube channel in the space, maintains the Trello wishlist Hypixel Studios is actually watching ([Hytale contest page](https://hytale.com/news/2026/3/hytale-new-worlds-modding-contest), [Kaupenjoe courses](https://courses.kaupenjoe.net/)).

A guest tutorial or a PR to Britakee's docs is probably the single highest-leverage content investment Killian can make in the first 6 months — it places his name next to the default reference every new Hytale dev reads.

### 1.7 Reddit — confirmed low-value for dev leads

r/Hytale and r/HytaleInfo are healthy for news/hype (50K+ subscribers gained in the 24h after the revival announcement, per the Switchblade Gaming analysis ([Switchblade](https://www.switchbladegaming.com/hytale/player-count-2026/))), and r/admincraft remains a hub for server operator discussion, but hiring/commissioning intent almost exclusively migrates to BBB or Discord rather than Reddit. Treat Reddit as **zero-effort news monitoring**, not prospection.

### 1.8 Pure DM cold outreach to server owners via listing sites alone — explicitly low-value

Reaching owners you found only through HytaleCharts/HyServers without touching their Discord first converts poorly because (a) most server owner accounts have "DMs from server members only" enabled ([Discord support](https://support.discord.com/hc/en-us/community/posts/360029391971-Add-a-server-setting-to-disallow-private-messages-to-users?page=4)) and (b) you have no shared context, making your message indistinguishable from the "cold sales" that cold-email benchmarks show converting at 1–3% ([Breakcold](https://www.breakcold.com/blog/cold-email-reply-rate)). The same outreach routed through joining the target's Discord and referencing a specific channel discussion commonly clears 10% — mirroring the LinkedIn-vs-email advantage Sopro documents ([Sopro](https://sopro.io/resources/blog/cold-outreach-statistics/)).

---

## 2. Concrete Tactics for the Top 3 Channels

### 2.1 BuiltByBit — Tactical Playbook

#### Template A — Reply to a "Looking for Hytale Developer" thread (convert ~10–20% of replies into DM conversations)

> Hey {Name},
>
> Saw your post about {their specific phrase — e.g. "MMO-scale economy + auction house"}. That's exactly the kind of system I shipped twice in production over the last 18 months (Minecraft Paper, JVM stack, MySQL + Redis), and I've been testing it against the Hytale server.jar since EA launched in January.
>
> A couple of quick checks so we don't waste each other's time:
> 1. Are you targeting persistent inventory or instance-scoped for the auction house?
> 2. What's your anti-dupe threshold — transactional log at the DB level, or are you OK with eventual consistency?
>
> Background for context: 7 years full-stack (Kotlin/Java/TS), senior CDI dev, freelance on the side. Portfolio with code samples: **killiandalcin.fr** — GitHub: **github.com/{handle}**.
>
> If those answers line up, I can send a 2-page scope proposal within 48h.
>
> Discord: **{handle}** — happy to jump on a 20-min call this week.

**Psychology notes:**
- **Specificity** — the opening names *their* feature verbatim; ~18% reply-rate research confirms personalized openers roughly double response vs. generic ([Martal B2B benchmarks](https://martal.ca/b2b-cold-email-statistics-lb/)).
- **Pattern interrupt** — most replies on BBB are "hi, add me on discord, dm me" ([observable pattern, BBB 687291](https://builtbybit.com/threads/hiring-developers.687291/)). Starting with two technical questions signals a senior who won't waste their time.
- **Reciprocity** — offering a free 2-page scope proposal lowers commitment to reply.
- **Social proof without bragging** — "shipped twice in production" is quantified but understated.
- **Hard stop, soft CTA** — a time-bounded offer + explicit Discord handle + call window reduces friction.

#### Template B — Reply when the brief is tiny (€50–100 single plugin)

> {Specific feature} is doable — takes me ~half a day if the spec is clear. Fixed price 120€, delivered in 48h with a MIT-licensed source on GitHub and 30 days of free bug-fix support.
>
> Want to start the spec? Discord **{handle}**.

Psychology: anchor slightly above their stated budget range to screen out race-to-the-bottom clients, bundle a **free bug-fix window** to plant the seed for a retainer conversation 30 days later.

#### KPIs to track for BBB

| Metric | Target month 1–2 | Target month 3–6 |
|---|---|---|
| Thread replies posted / week | 4–6 | 6–10 |
| Reply → Discord DM conversion | 20% | 30% |
| DM → quote sent | 40% | 50% |
| Quote → signed (one-off) | 20% | 30% |
| Time-to-first-response | <12h | <4h |
| Qualified leads / month | 1–2 | 3–5 |

Quote/conversion ratios calibrated against general B2B cold-outreach benchmarks (~5–10% reply, ~2–5% meeting ([Instantly](https://instantly.ai/blog/cold-email-reply-rate-benchmarks/))) multiplied by the ~3× uplift that buyer-intent forum threads provide over cold email.

### 2.2 Discord DM outreach — Tactical Playbook

#### Template C — Flagship server "I noticed your plugin breaks X" opener

> Hey {handle} — I'm Killian, JVM dev (Kotlin/Java, 7y, senior at {redacted}). Long-time lurker in your Discord, just saw your dev team mention the {specific pain point, e.g. "dupe issue with instance re-entry"} in #dev-log three days ago.
>
> I actually hit the same issue prototyping against the Hytale server.jar last month — fix is a combination of {one concrete, non-obvious technical hint — 1 sentence}. Happy to sketch it in a 10-min call or just send a gist if that's more your speed.
>
> No pitch, just scratching an itch. If it turns out you want help shipping it, we can talk money after.
>
> Portfolio: killiandalcin.fr / GitHub: {url}

**Psychology notes:**
- **Explicit non-pitch** — removes the defensive reflex server owners have toward cold DMs in large public Discords.
- **Value-first / reciprocity** — Cialdini's classic reciprocity trigger; the BBB culture already has a "free dev work for vouch" meme ([BBB 729949](https://builtbybit.com/threads/open-free-minecraft-dev-work.729949/)) so free-first is a legitimate genre.
- **Receipt specificity** — "in #dev-log three days ago" proves you're a real member, not a spammer, addressing the #1 trust issue flagship servers have ([Discord guidelines §13](https://discord.com/guidelines)).
- **Ladder** — the value gift becomes a conversation starter; the conversation becomes a trial task; the trial task becomes a paid one-off; the one-off becomes a retainer. Never pitch retainer on first touch — every retainer guide says so ([Studio Fellow](https://studiofellow.com/articles/retainers/), [Bidsketch](https://www.bidsketch.com/blog/sales/freelance-retainer-agreement/)).

#### Template D — Following up after a shipped one-off (retainer conversion)

> Now that {plugin name} has been stable in prod for 30 days, I usually ask clients whether they'd rather:
>
> **Option A** — I disappear, you call me when something breaks (I charge hourly, 90€/h, 48h turnaround not guaranteed).
>
> **Option B** — 30-day subscription: priority Discord support + 8 hours/month of fixes, balance changes and small features. 800€/month, rolls unused hours to the next month, 14 days to cancel.
>
> 70% of my clients pick B because they hate the "is my plugin broken or is Hytale broken?" investigation loop. Happy to send the B contract if that's useful.

Psychology: classic "option A anchor" retainer framing (Austin Church's subscription concept ([Freelance Cake](https://www.freelancecake.com/blog/11-steps-for-creating-and-selling-your-freelance-retainer-offer)), Brennan Dunn / Double-Your-Freelancing retainer ladder ([DYF](https://doubleyourfreelancing.com/freelancers-guide-client-retainer-agreements/))) — make the ad-hoc alternative painful enough that the subscription looks cheap.

#### KPIs for Discord DM outreach

| Metric | Target |
|---|---|
| Servers joined & passively observed | 20–30 top Hytale |
| Value-first DMs sent / week | 3–5 (NEVER bulk) |
| Reply rate | 25–40% (vs. 1–5% cold email baseline — [GMass](https://www.gmass.co/blog/average-cold-email-response-rate/)) |
| Reply → qualified call | 30% |
| Qualified leads / month from Discord | 1–2 |

### 2.3 HytaleModding Discord presence — Tactical Playbook

#### Cadence: 30 minutes/day, 6 days/week

1. Answer one technical question in #plugin-help per day (Kotlin or Java, depending on asker's stack).
2. Contribute one PR to HytaleModding repos (plugin-template, wiki, Hyssentials) per month ([GitHub org](https://github.com/HytaleModding)).
3. Post one original code snippet or benchmark per week in #showcase.

#### The Kotlin play

The official plugin template advertises support for **"Java or Kotlin"** ([HytaleModding template](https://github.com/HytaleModding/plugin-template)), and Spigot's docs have documented Kotlin integration for years ([SpigotMC Kotlin wiki](https://www.spigotmc.org/wiki/how-to-use-kotlin-in-your-plugins/)). This gives Killian a pre-made content niche: **"Hytale plugin in idiomatic Kotlin" tutorials and helper libraries**. There are currently zero authoritative Kotlin-for-Hytale guides in the English ecosystem (the closest reference is deanveloper/KotlinPlugin and hazae41/mc-kutils for Bukkit ([GitHub](https://github.com/deanveloper/KotlinPlugin), [hazae41 mc-kutils](https://github.com/hazae41/mc-kutils))). Owning that slot is a ~20h content investment that pays credibility dividends indefinitely.

#### KPIs

| Metric | Target |
|---|---|
| GitHub stars on your public Hytale repo | 20 (m1) → 100+ (m6) |
| Answers marked helpful in #plugin-help | 30/month |
| Mentions / tags by other devs | 2 → 10/month |
| Inbound DMs asking for help → paid | 0 → 1–2/month by m4 |

### 2.4 Weekly Cadence Plans

#### 5h/week version (minimum viable)

| Day | Activity | Time |
|---|---|---|
| Mon | Scan BBB "Hiring Developers" Hytale tag, write 2 replies | 60 min |
| Tue | HytaleModding Discord: 1 answer + 1 comment on others' work | 30 min |
| Wed | Ship 1 Twitter/X GIF of a mechanic from your Mythlane work (no project name mentioned, visual only) | 45 min |
| Thu | BBB: 2 more replies + follow up on previous DMs | 60 min |
| Fri | Discord DMs: 2 value-first messages to flagship server leads | 45 min |
| Sat | Portfolio/admin: update killiandalcin.fr with one new code sample | 30 min |
| Sun | Review KPIs, plan next week, read one competitor's thread (joxii, themuscular, Halos Dev) | 30 min |
| **Total** | | **~5h** |

#### 10h/week version (target conversion in 3–4 months)

| Day | Activity | Time |
|---|---|---|
| Mon | BBB replies (4–6), plus one long-form "offering services" thread refresh every 8 weeks | 90 min |
| Tue | HytaleModding Discord answers (2–3) + open-source PR work | 90 min |
| Wed | Twitter thread (text+GIF) on a Kotlin-for-Hytale tip + 1 reply to each of Kaupenjoe/ThirtyVirus/Britakee/joxii | 90 min |
| Thu | Record + edit 1 × 60s YouTube Short (tutorial format) | 120 min |
| Fri | Discord DM round (3–5 servers) + inbound lead triage | 90 min |
| Sat | 1 blog post, 800–1,500 words, targeting a long-tail query (see §3.2) | 120 min |
| Sun | Follow-ups to silent threads (first follow-up alone adds 40–50% more replies — [Instantly](https://instantly.ai/blog/cold-email-reply-rate-benchmarks/)) + KPI review | 60 min |
| **Total** | | **~10h** |

---

## 3. Content Strategy as Long-Tail Lead Magnet

### 3.1 Is a blog on killiandalcin.fr/blog viable?

**Yes, but as a 6-month supporting asset — not a lead-source in its own right.**

The Hytale niche is small enough that precise search-volume numbers for "hytale plugin developer" and "hytale custom plugin" are below the measurement floor of mainstream tools (Google Trends shows a massive launch-week Hytale interest spike but Keyword Planner / Ahrefs / Semrush publicly report zero measurable volume for the commercial long-tail ([PC Gamer / Yahoo](https://tech.yahoo.com/gaming/articles/hytale-surges-most-watched-game-205857959.html))). Two observations nevertheless favor a blog:

1. **Google rewards brand-new specific queries disproportionately.** Long-tail SEO authorities document that ~15% of all queries are brand new and long-tail queries convert at 2.5× the rate of head terms ([EnFuse](https://www.enfuse-solutions.com/harnessing-the-power-of-long-tail-keywords-in-niche-markets/), [HubSpot](https://blog.hubspot.com/blog/tabid/6307/bid/4723/6-ways-to-leverage-the-long-tail-in-your-marketing.aspx)). For "how do I handle player persistence in Hytale plugins" a single well-written blog post will rank #1 almost by default because the SERP is empty.
2. **The blog is the pitch accelerator, not the pitch itself.** Indie Hackers discussion threads converge on a consistent finding: blogs rarely generate direct clients but the right clients "invariably mention they read my articles" when converting ([Indie Hackers](https://www.indiehackers.com/post/do-you-have-a-blog-share-it-2816af4021)).

### 3.2 Keyword targets (qualitative, since volume data is below tool-floor)

| Tier | Query | Intent | Priority |
|---|---|---|---|
| Commercial | "hytale plugin developer", "hire hytale developer", "hytale custom plugin", "développeur hytale freelance" | Buyer | HIGH — own these even if <10 searches/mo |
| Technical | "hytale plugin kotlin", "hytale plugin persistence", "hytale event listener tutorial", "hytale plugin boilerplate" | Dev peer | MEDIUM — builds authority |
| Reference | "hytale plugin api vs bukkit", "hytale vs minecraft plugin development", "hytale server.jar browser" | Mixed | MEDIUM — high backlink potential |
| French | "développeur plugin hytale", "développeur serveur hytale", "hytale plugin sur mesure" | Buyer FR | HIGH — near-zero competition |

The French-language slots are essentially empty right now (HytaVerse and the Hytale Francophone Discord exist but no dev-services site ranks in French, [HytaVerse](https://disboard.org/server/1460648826837795021), [Hytale Francophone](https://disboard.org/server/1268553412564222023)). Killian should own the FR commercial cluster within 2–3 posts.

### 3.3 YouTube shorts vs. blog posts — which converts Minecraft/Hytale buyers?

**Short-form video outperforms long-form blog for this specific audience on a pure view-to-lead basis**, but both are needed. Evidence:
- Game Developer's gamedev Twitter analysis concludes "almost only videos and GIFs" — static tweets and text threads under-perform ([Game Developer](https://www.gamedeveloper.com/business/12-tips-to-improve-your-twitter-for-gamedev)).
- How-To-Market-A-Game documents follower-growth spikes tied 1:1 to individual GIF-of-mechanic tweets ([HTMAG](https://howtomarketagame.com/2021/02/01/how-to-get-more-twitter-followers-and-promote-your-indie-game/)).
- Kaupenjoe's entire Hytale modding brand is YouTube-first; his courses monetize the YouTube traffic, not the other way around ([Kaupenjoe courses](https://courses.kaupenjoe.net/)).

**Format recommendation:** 60-second dev-log format ("I spent 3h making this Hytale boss-phase system — here's the single Kotlin function that makes it work") outperforms tutorial format for converting *buyers* (they want to know you can ship, not that you can teach). Tutorial format is better for building HytaleModding Discord reputation and SEO authority.

### 3.4 Minimum viable content schedule (6-month compounding)

| Cadence | Asset | Purpose |
|---|---|---|
| 1 blog post / 2 weeks | 1,000–2,000w, one long-tail keyword | SEO, authority, pitch-accelerator |
| 2 X/Twitter posts / week | GIF-of-mechanic + reply-to-big-account | Algorithmic reach, network |
| 1 YouTube Short / 2 weeks | 30–90s dev-log of a single feature | Buyer-facing "can you ship" proof |
| 1 HytaleModding Discord PR or issue / month | Open-source contribution | Niche reputation |
| 1 CurseForge mod update / 2 months | Small free plugin | Permanent credibility asset |

Indie Hacker / solo-dev case studies (Courtland Allen's IH, Sbug Games, Paralives) agree that **4 months of consistent cadence is the break-even point** where compounding kicks in ([HTMAG](https://howtomarketagame.com/2021/02/01/how-to-get-more-twitter-followers-and-promote-your-indie-game/), [Teract](https://www.teract.ai/resources/twitter-strategy-indie-hackers-2026)). Below that, you'll see no traffic and a lot of wasted effort — which is why content is explicitly the **second priority** behind BBB/Discord during months 1–3.

---

## 4. Signals That Scare vs. Convert Flagship Buyers

Hytale flagships explicitly model their hiring on their Minecraft-network forebears. Hypixel Studios' own application guide says: **"Show us what you've done relevant to the area in which you are applying. You can do this via YouTube videos, screenshots, websites, links to GitHub, etc. We will not compile and run any code examples for initial review"** ([Hypixel Studios jobs](https://hypixelstudios.com/jobs/)). This is the template flagship community servers follow.

### 4.1 Auto-reject signals (observed across BBB hiring threads and Hypixel Studios criteria)

| Signal | Why it fails |
|---|---|
| "Hi I can do anything, DM me" | Generic = spam. BBB culture penalizes this visibly (zero replies vs. 10+ on specific ones — [BBB threads pattern](https://builtbybit.com/forums/development/minecraft-plugins/)) |
| Corporate-consulting tone ("Our firm offers enterprise-grade solutions") | Triggers service-team allergy. Lease's thread is explicit: "I want NO service teams referring me to a public discord, I'd rather not even have a service team contact me." ([BBB 375524](https://builtbybit.com/threads/thread-design-paid.375524/)) |
| No portfolio / "DM me for examples" | Hypixel's hiring page requires portfolio upfront ([HS jobs](https://hypixelstudios.com/jobs/)). Same culture in server hiring. |
| Wrong stack claim ("I can do JavaScript, Python, C++…") | Senior Minecraft/Hytale ops explicitly require Java — "If you are new to java and developing for minecraft/hytale, this is not the project for you" ([BBB 737528](https://builtbybit.com/threads/request-20-hours-week-hytale-development-for-large-scaled-project-high-budget-with-long-term-roadmap.737528/)) |
| Free/super-cheap work | Race-to-the-bottom signals junior; filters you out of flagship pool |
| No Discord handle | Every BBB thread expects Discord contact; absence reads as friction |
| Under-18 or teenager vibe (emoji spam, texting voice) | ThirtyVirus' team reportedly selects returning pros — "veterans of Blockshot Network, returning with 7 years of professional experience" ([HytaleTop100](https://hytaletop100.com/blog/thirtyvirus-announces-hyclash-ambitious-new-hytale-server-network-with-20k-budget)) |
| Bulk-templated reply (word-for-word across threads) | BBB mods actively remove such replies; clients notice |

### 4.2 Convert signals — the flagship reply stack

Based on patterns in the HyClash, Hytown and Riftgarde hiring threads, the replies that *get replies* combine at least four of:

1. **Active GitHub** with a public Hytale repo (even a template fork with 2 meaningful commits beats an empty profile).
2. **Live, playable demo** — a 20-second GIF or a small Modrinth/CurseForge listing you can share in-thread.
3. **Technical blog or docs page** — the killiandalcin.fr/blog post you wrote last month about exactly the problem they have.
4. **HytaleModding Discord reputation** — "pinged me on HytaleModding #plugin-help last week, solid answer" is gold.
5. **Referral / vouch** — BBB's vouch culture (feedback score visible on every profile) is the canonical trust ladder ([BBB feedback score system](https://builtbybit.com/threads/open-free-minecraft-dev-work.729949/)).
6. **Cross-ecosystem seniority signal** — Minecraft Paper/Bukkit plugins shipped, SpigotMC premium resource listing, or similar. ThirtyVirus himself uses his UberItems plugin as the primary proof of technical credibility ([ThirtyVirus portfolio](https://thirtyvirus.com/portfolio/)).
7. **Specific technical answer embedded in the reply** — the equivalent of a mini-trial-task unprompted.

### 4.3 Trial tasks / code review challenges

Flagship servers in this market rarely run formal Leetcode-style tests (unlike venture-backed game studios — [Trio.dev](https://trio.dev/interview-coding-challenges/), [Coderpad](https://coderpad.io/blog/hiring-developers/test-developers-skills-before-hiring/)). Instead, the typical pattern (observable across Matej's LearnSpigot recruitment, ConspiracyCraft/Affinity applications, and HyClash's BBB thread) is:

1. **Portfolio review** — GitHub + website + deployed work.
2. **One unpaid small task** (2–4 hours) with a specific deliverable — e.g., "write a boss-phase state machine for this mob spec."
3. **Paid trial project** (1–2 week first plugin) — this is effectively the "first one-off" in Killian's playbook.
4. **Retainer or ongoing role** — only after the trial.

**Shortcut:** the most efficient way to bypass steps 1–2 is to **arrive with the trial already done before being asked**. A public GitHub repo titled e.g. `hytale-boss-phases-kotlin` with a README, GIF, and 200 lines of clean Kotlin effectively pre-clears the trial. Darkhax & Jared's `Hytale-Example-Project` and HytaleModding's `plugin-template` are the community baseline — anything you build above them is trial-complete ([Build-9](https://github.com/Build-9/Hytale-Example-Project), [HytaleModding template](https://github.com/HytaleModding/plugin-template)).

### 4.4 Minecraft flagship hiring analogues (for calibration)

- **Hypixel/Hytale studios** require portfolio-first applications, don't review code initially ([Hypixel Studios jobs](https://hypixelstudios.com/jobs/)).
- **ThirtyVirus' HyClash** invested $20K personally, uses Kubernetes sharding, team is ex-Blockshot pros — applications go through Discord after an auvq BBB post ([BBB 737208](https://builtbybit.com/threads/open-developers-wanted-for-hyclash-ft-thirtyvirus.737208/)).
- **Hytown** team is "engineers from SpaceX, Runescape, and beyond" ([Hytown about](https://www.hytown.org/about-us)) — this is a bar that rewards senior-level signaling (CDI experience is an asset, not a liability).
- **Matej's ChatControl** hires with "Skype interview, code samples reviewed, must have C1+ English, microphone required" and pays $175/month for ~8 hours of structured retainer work ([MC-Market/BBB 391893](https://www.mc-market.org/threads/391893/)) — a useful benchmark for the low end of the retainer market.

---

## 5. Local Optimization — France + Kotlin

### 5.1 French residency — net neutral-to-positive

The Hytale ecosystem is overwhelmingly English-speaking (official Discord in English, BBB in English, most flagships headquartered in NA/UK). Hypixel Studios explicitly requires overlap with "GMT-8 to GMT+1 business hours" ([HS jobs](https://hypixelstudios.com/jobs/)) — CET/Paris is inside that window, so timezone is an advantage, not a friction. Speaking English fluently (C1+) is table stakes across BBB hiring threads ([MC-Market 391893](https://www.mc-market.org/threads/391893/)). Beyond table stakes, France is neutral.

The upside is the **untouched French sub-market**. HytaVerse (play.hytaverse.fr), the Hytale Francophone Discord (discord.gg/hytalefrance), HyWay Brasil (Portuguese), Hyspain (Spanish) all exist but no French freelancer is publicly positioned to serve them ([HytaVerse](https://disboard.org/server/1460648826837795021)). A French-language "Développeur Plugin Hytale" landing page on killiandalcin.fr/fr paired with presence in these Discords is a ~10h investment that could own the French-language slot for the entire 6-month horizon.

Pricing benchmark: Malt's 2026 barometer puts the **average French freelance Kotlin dev at €469/day (€536/day in Paris)** and Java at €433/day ([Malt Kotlin](https://www.malt.fr/t/barometre-tarifs/tech/developpeur-backend/developpeur-kotlin), [Malt Java](https://www.malt.fr/t/barometre-tarifs/tech/developpeur-backend/developpeur-java)). A 7-year senior is typically in the €500–650/day band. Killian's Hytale retainer at €800–2,500/month implies 2–5 days of work/month — this is entirely consistent with, and slightly below, what the French market will absorb, leaving margin to offer international clients Euro-denominated pricing without downgrading.

### 5.2 Kotlin — a clear asset

JVM bytecode compatibility means **a Kotlin-written plugin is a .jar file indistinguishable from a Java one at load time** — the official HytaleModding plugin template explicitly supports both ([HytaleModding template](https://github.com/HytaleModding/plugin-template)). SpigotMC has documented Kotlin-in-plugins since 2023 ([SpigotMC wiki](https://www.spigotmc.org/wiki/how-to-use-kotlin-in-your-plugins/)), and mature Kotlin Minecraft plugin libraries (deanveloper/KotlinPlugin, hazae41/mc-kutils, SimpleMC template) prove the stack in production ([deanveloper](https://github.com/deanveloper/KotlinPlugin), [mc-kutils](https://github.com/hazae41/mc-kutils)).

**Positioning rule:** in buyer-facing copy (BBB threads, killiandalcin.fr), always say *"plugins in Java/Kotlin — JVM output, identical .jar artifact"*. In dev-peer copy (HytaleModding Discord, Twitter, blog, tutorial videos), lean into Kotlin-specific idioms (`?.` null-safety collapses, coroutines for async ticks, receiver-scoped DSLs for config). This gives two distinct value propositions from the same codebase:
- **To buyers:** "senior, plus modern stack, zero integration risk."
- **To peers:** "the idiomatic Kotlin person in Hytale," which is a reputation moat roughly equivalent to what Kaupenjoe built for Forge/Fabric tutorials.

### 5.3 Risks and mitigations

| Risk | Mitigation |
|---|---|
| Some buyers insist on "Java only" — reading Kotlin on handover scares them | Offer a "Java handover" contract clause: plugin is delivered both as .jar and, at client request, as auto-decompiled Java source. Spigot plugins have used Kotlin for 3+ years with zero compat issues ([SpigotMC](https://www.spigotmc.org/wiki/how-to-use-kotlin-in-your-plugins/)) |
| Kotlin stdlib dependency on shared servers | Use shadowJar bundling (Britakee template already does this — [Britakee](https://github.com/realBritakee/hytale-template-plugin)) or document MCKotlin/Modrinth shared-library option ([Modrinth MCKotlin](https://modrinth.com/plugin/mckotlin)) |
| Smaller market (~95% Java defaults in Hytale, per ecosystem observation) | The Kotlin angle is content differentiation, not sales filter. Every buyer still gets a plugin that runs on their stock server |
| French freelance-status admin (URSSAF, micro-entreprise) invoicing international clients | Use Wise/PayPal for USD/GBP, keep French-franc invoicing standard; this is solved Malt-ecosystem territory — not a sales-blocker |

---

## 6. Integrated 6-Month Plan (what to actually do, week by week)

### Month 1 — Foundation & First Leads

- Week 1: Build `killiandalcin.fr/services` page (EN + FR), publish 3 GitHub repos (`hytale-kotlin-plugin-starter`, one showcase mod, one example boss-phase system), post one "offering services" thread on BBB Hytale section with explicit Kotlin/Java stack and portfolio links, join 20 flagship Discords.
- Week 2: Reply to 8 BBB hiring threads; first 3–5 DMs (value-first) to flagship dev channels; start answering HytaleModding #plugin-help daily.
- Week 3: Ship one 60s YouTube Short (dev-log), one blog post (target: "Hytale plugin in Kotlin — minimal setup").
- Week 4: Review: target 1 signed one-off (€200–600), 3–5 DM conversations open.

### Month 2 — Conversion & Authority

- 10–15 BBB replies total; 8–12 DMs total; ship 2 more Shorts, 2 blog posts, 1 CurseForge micro-plugin.
- Submit to the New Worlds contest if realistic (closes 28 April 2026 — [CurseForge contest](https://hytale.curseforge.com/newworldscontest/)), otherwise plan for the next modjam.
- Target: 2–3 signed one-offs, first retainer discussion triggered (from a month-1 client whose plugin went live).

### Month 3 — First Retainer

- Pitch Template D to 2 month-1 clients at their 30-day post-delivery mark. Expect 1 conversion.
- Continue BBB/Discord cadence, now with "here's a live retainer client" social proof.
- Target: 1 retainer signed (€800/month trial), 2–3 new one-offs.

### Month 4–6 — Compounding

- Blog ranks start appearing for long-tail queries; inbound DMs begin (1–2/month by month 5).
- CurseForge authority compounds: one well-received plugin = permanent reply fuel.
- Target: 2–3 retainers at €800–2,500/month, 2–4 one-offs/month, 3–5 qualified leads/month consistently.

---

## 7. What to Measure (Master KPI Dashboard)

| Metric | Baseline | Month 3 target | Month 6 target |
|---|---|---|---|
| BBB thread replies posted | 0 | 20/mo | 30/mo |
| Inbound Discord DMs | 0 | 3/mo | 8–10/mo |
| Portfolio (killiandalcin.fr) unique visitors | ? | 200/mo | 600–1,000/mo |
| GitHub Hytale-repo stars | 0 | 50 | 150+ |
| CurseForge plugin downloads | 0 | 200 | 2,000+ |
| Qualified leads (scope discussed) | 0 | 3/mo | 5+/mo |
| Signed one-offs | 0 | 2–3/mo | 3–5/mo |
| Active retainers | 0 | 1 | 2–3 |
| Monthly revenue from Hytale freelance | €0 | €1,200–2,000 | €3,500–7,500 |

---

## 8. Caveats and Epistemic Hygiene

Several facts in this report should be held lightly:

- **"4,000+ mods, 10M+ downloads"** comes from CurseForge and Hypixel Studios' own contest landing page ([CurseForge contest](https://hytale.curseforge.com/newworldscontest/)) — these are marketing-adjacent numbers and the HytaleCharts January figure was reported at 3,000 mods / 10M downloads just two weeks post-launch ([Switchblade](https://www.switchbladegaming.com/hytale/player-count-2026/)); both should be treated as directional rather than audited.
- **Hytale player-count claims** were contaminated by a viral-but-fabricated "2.8M concurrent" number at launch ([Switchblade](https://www.switchbladegaming.com/hytale/player-count-2026/)). I have only used Discord size, CurseForge downloads and Twitch peak viewership ([PC Gamer](https://www.pcgamer.com/games/survival-crafting/hytale-surges-to-the-most-watched-game-on-twitch-attracting-over-420-000-viewers-with-its-long-awaited-launch/)) which are verifiable.
- **Cold-outreach reply-rate benchmarks** (1–5% cold email, ~10% LinkedIn, 18% personalized) are from general B2B research ([Instantly](https://instantly.ai/blog/cold-email-reply-rate-benchmarks/), [Martal](https://martal.ca/b2b-cold-email-statistics-lb/), [Sopro](https://sopro.io/resources/blog/cold-outreach-statistics/)). Hytale's buyer-intent forum threads are structurally more favorable than cold email — 10–20% reply-to-DM conversion on BBB is plausible but not empirically validated for this specific niche.
- **French Kotlin/Java daily rates** from Malt ([Malt](https://www.malt.fr/t/barometre-tarifs/tech/developpeur-backend/developpeur-kotlin)) reflect mainstream enterprise freelance, not gaming/Minecraft freelance which historically pays less per hour but offers looser scope.
- **The €100K New Worlds Modding Contest closes 28 April 2026** ([CurseForge](https://hytale.curseforge.com/newworldscontest/)). If this plan starts before that date, entering is high-EV; if after, wait for the next announced modjam (cadence appears to be one every 4–8 weeks).
- **"2–5 qualified leads/month" as the stated 6-month goal** is reachable with this plan based on ecosystem size (432+ active servers, dozens of flagship buyers, 500K+ community members), but requires consistent 8–10h/week execution from month 2 onward. The 5h/week version probably caps at 1–2 leads/month unless one of the Mythlane features ships publicly and produces independent inbound.
- **Mythlane is treated as a private project throughout**, per the brief. In practice, the moment Mythlane reaches a demo-able state it becomes Killian's single highest-value portfolio asset and should immediately move to the top of every pitch; this plan assumes that happens in month 4–6 at the earliest.

---

**Bottom line:** the Hytale market in April 2026 is an unusual window where demand, a hyped-up buyer base, and a still-immature supply side are all aligned. A senior French/Kotlin full-stack dev with 5–10h/week and good execution on BBB + flagship Discord outreach can credibly hit 2–5 qualified leads/month by month 3 and one-to-three retainers by month 6 — without spending a euro on ads. The single biggest risk is not the market; it's the temptation to over-invest in content (blog, YouTube) in months 1–2 at the expense of the two channels that actually produce the cash: BBB replies and flagship-Discord DMs.