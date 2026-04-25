---
title: "GravityFlip: from client brief to a production-grade Hytale plugin"
description: "Lessons learned shipping GravityFlip — how a vague request (\"I want to flip gravity\") became an architected, configurable Hytale plugin that builders can use without touching code."
date: "2026-04-25"
tags: ["hytale", "case-study", "gravity-flip", "consulting"]
draft: false
---

> **TL;DR** — A client pinged me to "invert gravity in part of my map". Five questions later we were building a **multi-region plugin** with an in-game wand, JSON persistence, and three visualization modes. It's now live in production: [GravityFlip on Modtale](https://modtale.net/mod/gravity-flip).

## The original brief

The Discord message ran two sentences long:

> *"Hi, I'd like a plugin that flips gravity on a zone of my server. It's for an event this weekend, I can pay."*

This is exactly the most dangerous brief shape. Read fast, it sounds clear (*"flip gravity"* + *"zone"* — that's enough to start coding, right?). Read carefully, it says **nothing** specific:

- *"a zone"* — how many? one, configured via YAML? several, managed in-game? server-wide?
- *"flip gravity"* — for whom? players only? falling items? mobs? projectiles?
- *"for an event this weekend"* — one-off, or a reusable tool for the server's builders later?
- *"I can pay"* — what scope, what budget? Essential plugin at €149 or full system at €349?

I've made it a rule to **never write code until I've exhausted ambiguity**. It feels counter-intuitive when the client is in a hurry, but 30 minutes of questions saves 10 hours of rewrites.

## The five questions that changed everything

### 1. "How many zones, and who defines them?"

Answer: *"At first I thought just one, but actually I'd like my builders to create more without asking me each time."*

Immediate decision: **multi-region system** with persistence. Hardcoded YAML is out (too much friction). We pivot to an **in-game wand** plus `/gravityflip define <name>` commands. Classic Bukkit/Spigot community pattern, ported to Hytale.

### 2. "Who flips? Players only, or everything?"

Answer: *"Players for sure, but flipping dropped items would be sweet too. Mobs I'm not sure."*

Decision: **three booleans per region** — `AffectPlayers`, `AffectItems`, `AffectNpcs`. Default: all on, but the builder can disable mobs on a "jump arena" zone if floating mobs ruin the gameplay. The marginal cost of those three toggles in the JSON codec was zero — optionality offered for free.

### 3. "What happens when a player enters the zone at full free-fall speed?"

Answer (after a pause): *"Uhh... I hadn't thought about it. They shouldn't take fall damage, right?"*

Decision: **configurable `GracePeriodMs` (default 2500ms)**. During the transition, we smooth the gravity flip instead of an instant binary swap that produces brutal acceleration and absurd fall damage. Bonus: a `FallDamage` toggle (default false) for zones where falling should still cost something gameplay-wise.

That's the kind of detail **a written brief never surfaces**. A real conversation does.

### 4. "Do you want to see the zones when you're inside one?"

Answer: *"Yeah in build mode I have to, otherwise I lose track. But in player mode nothing should show."*

Decision: **three visualization modes**.
- `Outline` — configurable wireframe color (`VisualColor`, default `#00FFFF`) — build mode
- `Particles` — edge-emitting particles (`Torch_Fire` default), more subtle but visible
- `None` — invisible, production mode

Per-region toggle via the `/gravityflip toggle` command. Build and live mode coexist on the same map without re-deploying the plugin.

### 5. "Is this one-shot or are you reusing it?"

Answer: *"One-shot for the event, but if it's well done I'll keep it."*

Pivotal decision: we treat this project as **a production plugin**, not a script. Concretely:
- JSON persistence in `Server/mods/Mythlane_GravityFlip/regions.json` (not memory-only)
- 10 Hz tick loop with concurrent snapshots (lock-free reads)
- Unit tests on pure logic (codec, AABB geometry)
- Auto-seeded demo region on first run for instant onboarding
- Polished EN README, distributable

**Cost vs "quick & dirty"** : about 30 % more time. **Benefit** : the client moved from "I need it by Saturday" to "I still use it, my builders love it". The plugin is now publishable, monetizable, and so it became a shared asset.

## The architecture that emerged

```
Player / NPC / Item
       │
       ▼   (each tick, 10 Hz)
 RegionTickLoop  ◄─── snapshots from regions.json
       │
       ▼
 GravityApplier + FallDamageGuard
       │
       ▼
 per-region effect
```

The wand follows its own cycle:

```
Player click  →  WandSelectionStore
                       │
                       ▼
              /gravityflip define <name>
                       │
                       ▼
                 Region registry  →  regions.json (auto-save)
```

Stack: **Java 25**, official Hytale Plugin API (`com.hypixel.hytale.plugin`), Gradle Shadow to relocate Gson (avoiding stdlib conflicts), JUnit 5 for tests. Source ~2,500 lines, 30 % of which is tests.

### The piece of code that took the most thinking

The **GracePeriodMs**. Not the code itself but the idea behind it: instead of a binary flip, we interpolate the vertical velocity component over a sliding window. Naively:

```java
// naive version — produces absurd fall damage
if (region.contains(entity)) {
    entity.velocity.y = -entity.velocity.y;  // instant flip
}
```

With a grace period, smooth transition:

```java
// production version — gradual entry
final long timeInRegion = now - entry.enteredAt();
final double gracePct = Math.min(1.0, timeInRegion / region.gracePeriodMs());
final double targetVy = -region.verticalForce(); // antigrav
entity.velocity.y = lerp(entity.velocity.y, targetVy, gracePct);
```

Three extra lines, but that's what makes the difference between a plugin that's "fun for 30 seconds" and a plugin that players actually use without rage-quitting.

## What this project taught me (or reminded me)

**First**: senior dev value isn't in code-typing speed. It's in the **series of questions** that turn a vague brief into an actionable spec. Without question 3 (free-fall), the client would have shipped the event with absurd fall damage, and the plugin would've been dropped after the weekend.

**Second**: a Hytale plugin that sells isn't a script. It's a **production-grade Java codebase** with persistence, tests, docs, and sub-5-minute onboarding. The client paid €349 (the "Custom System" tier), not €50 Fiverr — and the premium is justified by the quality the client will exploit for months.

**Third**: every plugin I write ends up published. GravityFlip is freely available on [Modtale](https://modtale.net/mod/gravity-flip) and soon on CurseForge. This doesn't dilute the value of paid commissions — it **boosts** my credibility to future prospects looking for a developer who can ship clean code, not just glue StackOverflow snippets.

## Got a Hytale project in mind?

The pattern is always the same: we talk for 30 minutes, I ask the 5-10 questions that kill ambiguity, I send a firm quote, I deliver. Pricing is public on [/hytale](/hytale) — €149 for an essential plugin, €349 for a custom system, €790+ for custom MMO infrastructure.

No Fiverr, no race-to-the-bottom. Just a senior dev shipping code you'll still use six months later.

[Request a quote](/contact) · [See GravityFlip in action](https://modtale.net/mod/gravity-flip) · [See my other plugins](/projects)
