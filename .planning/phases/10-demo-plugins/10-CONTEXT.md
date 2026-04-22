# Phase 10 — Demo Plugins Hytale — Context

## Goal

Produire 5 mini-plugins Hytale open-source publiés sur GitHub avec README EN pro, pour donner des preuves concrètes à montrer en DM Discord / Fiverr. Chaque plugin = 1 repo, 1 gif/screenshot, 1 paragraphe de description.

## Business Rationale

- **Blocker prospection #1** : zéro démo crédible à montrer actuellement
- **Objectif** : pivot de "0 démo" → "5 démos variées" en 7-14 jours de travail réparti
- **Target audience** : Hytale server owners (Discord), Fiverr buyers, recruiters gaming

## Les 5 Concepts Retenus

### 1. GravityFlip Region
**Pitch** : Block spécial qui définit une zone → entités dedans ont gravité inversée.
**Wow factor** : ⭐⭐⭐⭐⭐ (viral-friendly, gif 5s)
**Complexité** : ⭐ (~150 lignes)
**API showcase** : physics override, region system
**Core mechanics** :
- `PlayerMoveEvent` listener → check if in registered region
- Flip `velocity.y` (ou apply upward force chaque tick)
- Blocks `gravityflip_block` placés en 4 corners définissent la zone
**Repo name** : `hytale-gravity-flip`

### 2. MagneticField Hand
**Pitch** : Item `magnet_tool` → drops dans 8 blocs gravitent vers le joueur, trail de particules. Shift = répulsion.
**Wow factor** : ⭐⭐⭐⭐ (satisfying visual, utile)
**Complexité** : ⭐⭐ (~200 lignes)
**API showcase** : particles, entity velocity, item events
**Core mechanics** :
- `ItemHeldEvent` → start tick task si magnet_tool
- Chaque tick : scan entities.items nearby, apply Vector.subtract(player.loc, item.loc).normalize().multiply(0.3)
- `spawnParticle(DUST, item.loc, color=#a0a0ff)`
- Detect `player.isSneaking()` → invert direction
**Repo name** : `hytale-magnet-hand`

### 3. TimeRewind Watch
**Pitch** : `pocket_watch` clic droit → rewind 10 dernières secondes (position, rotation, dégâts annulés).
**Wow factor** : ⭐⭐⭐⭐⭐ (Prince of Persia, gameplay unique)
**Complexité** : ⭐⭐⭐ (~300 lignes)
**API showcase** : state serialization, scheduler, entity manipulation, damage events
**Core mechanics** :
- `Deque<PlayerState>` par joueur (capacité 200 ticks = 10s@20tps)
- Chaque tick : `states.offer({loc, yaw, pitch, health, timestamp})`; pop old
- On `rightClick(pocket_watch)` : lock input, replay states reverse chaque tick (or teleport instant)
- Restore health si tracked damage during rewind window
**Repo name** : `hytale-time-rewind`

### 4. BlackHole Grenade
**Pitch** : Item lancé → trou noir 3s. Aspire mobs + items + joueurs dans 12 blocs. Implosion finale avec explosion particules.
**Wow factor** : ⭐⭐⭐⭐⭐ (spectaculaire, clip-ready)
**Complexité** : ⭐⭐ (~250 lignes)
**API showcase** : projectiles, entity pull, particle math (vortex)
**Core mechanics** :
- `ProjectileHitEvent` sur custom item → spawn armorstand invisible au point d'impact
- 60 ticks scheduler : chaque tick, scan entities in radius 12, apply Vector toward center * strength
- Spawn particles en spiral (helix math) autour du center point
- Final tick : `world.createExplosion(loc, 2.0f, false)` + burst particles
**Repo name** : `hytale-blackhole-grenade`

### 5. Paintball Arena
**Pitch** : Arme `paintball_gun` tire snowballs colorés. Impact = block change de tint. Arena auto-scorée par équipe.
**Wow factor** : ⭐⭐⭐⭐ (mini-jeu complet)
**Complexité** : ⭐⭐⭐⭐ (~400 lignes)
**API showcase** : projectiles, block manipulation, scoreboard, teams, persistence
**Core mechanics** :
- `PlayerInteractEvent` (right-click paintball_gun) → `launchProjectile(Snowball)` avec metadata color
- `ProjectileHitEvent` sur target block : wrap block in `PaintedBlock` (stocke couleur originale + tint appliqué)
- `HashMap<Team, Set<Block>>` pour compter % territoire peint
- Scoreboard sidebar live : team A: 42%, team B: 38%
- Arena reset command : restore original blocks from persistence
**Repo name** : `hytale-paintball`

## Shared Infrastructure (par repo)

Chaque repo aura :
- `build.gradle.kts` (Kotlin DSL) ou `build.gradle` (Java) — à décider
- `src/main/kotlin/fr/killiandalcin/<plugin>/` — source
- `plugin.yml` — manifest Hytale
- `README.md` — EN pro :
  - Hero gif/screenshot
  - Tagline 1 phrase
  - Features bullet points
  - Installation (drop jar in /plugins, reload)
  - Commands/permissions
  - Credits + lien portfolio killiandalcin.fr
- `LICENSE` (MIT)
- `.github/workflows/release.yml` — auto-build jar on tag push
- `docs/demo.gif` ou screenshot (1-5 Mo max)

## Open Questions

1. **Kotlin ou Java ?** — Stack blog article seed utilise Java (com.hypixel.hytale.plugin). Kotlin modernise mais Minecraft/Hytale dev majoritaire Java.
2. **GitHub org ou perso ?** — `kayjaydee/hytale-*` (perso visible) ou créer org `killiandalcin-hytale` ?
3. **Gif creation tool ?** — ffmpeg + recorder in-game, ou OBS + gifski ? Target ~2 Mo max par gif.
4. **Order de ship** — Tous en parallèle, ou 1 par semaine pour générer du contenu Twitter/X/Discord étalé ?

## Success Criteria (Phase 10)

- 5 repos GitHub publics avec README EN complet
- 5 .jar téléchargeables (release ou build artifact)
- 5 gifs/screenshots dans `/public/demos/` du portfolio
- Composant `HytaleDemoGrid.vue` intégré sur `/hytale` affichant les 5 démos
- i18n FR+EN des cards démos
