# Hytale Plugin Ideas — Backlog (30 concepts)

Pipeline long terme. Les 5 sélectionnés pour Phase 10 sont dans `PLUGINS.md` (GravityFlip, FireballStaff, ShadowClone, GrapplingHook, EarthquakeSlam).

Tous ces concepts suivent la même règle : **1-2 jours de code max, visuellement fort (gif-friendly), wow factor**, mais **rééquilibrés vers les catégories sous-servies** identifiées dans l'analyse de marché Hytale avril 2026 (source : rapport interne).

**Priorité catégories selon marché** (moins saturé → plus saturé) :
- ⭐⭐⭐ Magie (1 plugin payant recensé) — opportunité max
- ⭐⭐⭐ Quêtes & NPCs (catégorie quasi vide)
- ⭐⭐⭐ Patches/fixes utility (2 plugins payants)
- ⭐⭐ Anti-triche (2 plugins gratuits seulement)
- ⭐⭐ Bibliothèques utility (6 plugins)
- ⭐⭐ Intégrations Discord (6 plugins)
- ⭐ Combat unique / counter-play (dans les 120 RPG mais mechanics différenciantes)
- ⭐ MMO mechanics (dungeon keys, classes, stats)

---

## 🔮 Magie & Sorts (catégorie vide payant — opportunité max)

### 1. FrostBreath ⭐⭐⭐
Item "souffle glacé" qui gèle les blocs d'eau en glace devant le joueur et met les mobs en stase bleue 3s.
- Ray-cast 8 blocs + block replace `WATER → ICE` temporaire (scheduler revert)
- `entity.addPotionEffect(SLOWNESS 60 ticks amp 10)` sur mobs touchés
- Particles `SNOWFLAKE` + `ITEM_SNOWBALL` au breath
- 1j de code. Gif satisfaction max, catégorie magie sous-servie.

### 2. LightningWand ⭐⭐⭐
Bâton qui invoque la foudre au point visé (ray-cast 30 blocs). Dégâts AoE + stun 1s dans un rayon de 3.
- `player.getEyeLocation().getDirection()` + ray trace
- `world.strikeLightningEffect(loc)` + `createExplosion(loc, 1.0f, false)` damage only
- Cooldown 3s, animation particle trail avant l'impact
- 1j. Visuellement épique, aucun concurrent direct.

### 3. HealingAura ⭐⭐⭐
Item "healing orb" posé → zone circulaire 5 blocs pendant 10s qui soigne les alliés et buff regen. Particules vertes cascade.
- `spawnEntity(ArmorStand)` invisible au centre + tick task 200 ticks
- Chaque tick : scan joueurs in radius, `setHealth(min(+0.5, max))` + particles `HAPPY_VILLAGER`
- Distinction ami/ennemi via teams ou simple "pas-moi" fallback
- 1j. Pattern support, rare en Hytale payant.

### 4. PoisonCloud Grenade ⭐⭐⭐
Grenade lancée → explosion en nuage vert toxique 4 blocs, dure 8s, damage-over-time + slow.
- `Snowball` reskin vert, `ProjectileHitEvent` → spawn cloud
- Tick task 160 ticks : scan entities, `addPotionEffect(POISON 40 amp 1)` + particles `VILLAGER_ANGRY`
- Alternative PvP/PvE, catégorie magie
- 1j. Simple mais visuellement satisfaisant.

### 5. TeleportScroll ⭐⭐⭐
Parchemin usable : right-click pose un marker persistent. Right-click 2e fois depuis ailleurs = TP retour à la marker (consommé).
- PDC store `Location` dans l'item NBT à la pose
- Charge 1 utilisation par scroll, message visuel hologram "Marker set" au sol
- Animation TP : fade-out particles + `world.strikeLightningEffect`
- 1j. Utility magique, exploration-friendly.

### 6. WindPush ⭐⭐⭐
Sort "souffle de vent" qui repousse tous les entités dans un cône de 6 blocs devant le joueur avec particules blanches.
- Cône calc : scan entities, angle vector < 45° = push
- `entity.setVelocity(direction * 2.5)` + particles `CLOUD` + son whoosh
- Cooldown 4s, item `wind_scroll` charge 5 uses
- 1j. Counter-play PvP, gif max.

### 7. ShockwaveFist ⭐⭐
Gant custom : poing droit déclenche onde circulaire au sol dans un rayon de 4 blocs qui repousse mobs + casse cobweb/leaves.
- Event custom sur `PlayerAnimationEvent` (arm swing) si item en main
- Scan blocs radius 4, si cobweb/leaves → break, entities → knockback
- Particles `EXPLOSION_NORMAL` en ground ripple
- 1j. Variante rapide d'EarthquakeSlam, peut se substituer.

### 8. SummoningSpear ⭐⭐⭐
Lance magique : pose un point d'attraction (cristal flottant) 10s, tous les mobs ennemis dans 20 blocs sont téléportés vers lui.
- Lance lancée + `ProjectileHitEvent` → spawn armorstand cristal (texture custom)
- Tick task 200 ticks : scan mobs hostiles, `teleport(crystal.loc.add(rand, 0, rand))`
- Perfect pour mob-farming automatique / AoE clearing
- 1.5j. Catégorie magie, très utile.

---

## 📜 Quêtes & NPCs légers (catégorie quasi vide)

### 9. SimpleQuestNPC ⭐⭐⭐
NPC statique qui donne une quête basique "tuer 10 zombies" avec dialogue + reward. MVP du marché quêtes.
- Spawn NPC via commande admin, configure via YAML
- Inventory dialog (pattern Bukkit) : "Accept / Decline"
- Tracker kills in PDC, auto-complete + `giveItem(reward)` à la fin
- 2j. Catégorie VIDE, premier plugin sur le marché gagne la position dominante.

### 10. WanderingMerchant ⭐⭐⭐
NPC marchand qui spawn aléatoirement sur la map (pattern Zelda BotW), vend 3 items rares, disparaît après 30 min.
- Scheduler toutes les 2h, pick random chunk actif + spawn
- Inventory trade menu (configure items via YAML)
- Annonce globale "A merchant appeared near [x,z]!" avec lien coord
- 1.5j. Event gameplay, catégorie quêtes/NPC sous-servie.

### 11. BountyBoard ⭐⭐⭐
Block "wanted board" : right-click pour poser une prime en gold sur un joueur. Tuer la cible = payout auto au tueur.
- Block custom + inventory UI "Place bounty" / "View bounties"
- Stockage YAML : `{ target_uuid, amount, poster_uuid }`
- `PlayerDeathEvent` → check si target matches, payout killer via economy API
- 1.5j. Social gameplay driver, catégorie PvP rare.

### 12. EchoLocation Sonar ⭐⭐⭐
Item "sonar crystal" → burst visuel radial qui révèle pendant 5s la position de tous les mobs dans 15 blocs (outline brillant) + les aggro vers toi.
- Item `sonar_crystal` charge 5 uses, cooldown 10s
- Scan `world.getNearbyEntities` radius 15
- Glow effect via `entity.setGlowing(true)` pendant 5s (scheduler revert)
- Aggro force : pour chaque hostile, `mob.setTarget(player)` + particles `SOUL_FIRE_FLAME` en cercle
- 1j. Exploration + combat setup, unique visuel (pas dans baseline, pas de conflit BetterMap).

---

## ⚔️ Combat & Counter-play unique

### 13. ParryWindow ⭐⭐
Timing-based parry : si tu right-click dans les 200ms avant d'être touché, tu annules le dégât et stun 2s l'attaquant avec particules clashes.
- `EntityDamageByEntityEvent` priority HIGHEST
- Check dernière action right-click du défenseur (PDC timestamp)
- Si < 200ms → `setDamage(0)` + `attacker.addPotionEffect(SLOWNESS 40)` + particles `CRIT_MAGIC`
- 1j. Skill-based combat, différenciant PvP.

### 14. RevengeMark ⭐⭐
Premier coup porté = mark visuel au-dessus de l'attaquant (hologram rouge). Ton contre-attaque sur marked = +50% damage + particules feu.
- `EntityDamageByEntityEvent` → PDC mark sur attacker (TTL 10s)
- Hologram visible pour le défenseur uniquement (packet per-player)
- Scale damage event suivant si victim → attacker + marked
- 1j. Counter-play gameplay, catégorie combat niche.

### 15. BloodBlade ⭐⭐
Épée custom : chaque hit réussi te soigne de 10% des dégâts infligés. Particules de sang aux coups critiques.
- Item `blood_blade` + `EntityDamageByEntityEvent` sur wielder
- `setHealth(min(+damage*0.1, maxHealth))` + particles `REDSTONE` (rouge)
- Cooldown soin 1s pour éviter abuse
- 0.5j. Classique vampirique, mais toujours recherché.

### 16. CounterAttack Shield ⭐⭐
Bouclier spécial : bloc dans une fenêtre de 200ms suivant un coup reçu = reflect 50% damage + stun 1.5s.
- Similar à ParryWindow mais triggered par shield sneak
- `entity.addPotionEffect(SLOWNESS 30 amp 3)` + damage reflect calc
- Cooldown 5s pour skill expression
- 1j. Counter-play, catégorie combat premium.

### 17. SoulLink ⭐⭐⭐
Sort qui lie 2 joueurs : HP partagés, death d'un = teleport instant de l'autre à sa tombe. Particules chaîne violette visible.
- Item "soul linker" = bond permanent jusqu'à cast `/unlink`
- Tick task : sync `max(p1.hp, p2.hp) / 2` via PDC
- `PlayerDeathEvent` sur linked → téléport partner + revive avec 1HP
- 1j. Mécanique coop unique, catégorie vide.

---

## 🛡️ Anti-triche léger (catégorie sous-servie)

### 18. AFK Spotlight ⭐⭐
Détecte les joueurs AFK (>5 min sans input) → pillar lumineuse au-dessus d'eux + tag hologram "[AFK]". Staff tools.
- `PlayerMoveEvent` refresh timestamp PDC
- Scheduler chaque 30s : check dernière activité, si > 300s → spawn particles vertical
- Commande admin `/afkkick <time>` bonus
- 1j. Utility admin, catégorie anti-triche light.

### 19. FastHand Detector ⭐⭐⭐
Compte les clicks/s d'un joueur. Au-delà d'un seuil (15 CPS) = notif Discord staff + log anti-bot.
- `PlayerInteractEvent` → increment counter sliding window 1s
- Si > threshold → webhook Discord avec timestamp + logs
- Permissions `/fasthand.bypass` pour staff légit
- 1j. Light anti-cheat, catégorie vraiment vide.

### 20. DuplicateItem Finder ⭐⭐⭐
Tool admin qui scanne tous les inventories (online + offline via NBT) pour détecter des items avec même UUID PDC.
- Commande `/finddupes <item_uuid_tag>` scan players
- Output Discord webhook : liste joueurs + locations
- Utile pour dupe glitches après un patch compromis
- 1j. Anti-triche spécifique, niche monétisable.

---

## 🤖 Discord & Intégrations (catégorie 6 plugins seulement)

### 21. DeathFeed Discord ⭐⭐
Chaque mort PvP/PvE postée live sur un channel Discord avec embed (tueur, victime, arme, lieu).
- `PlayerDeathEvent` + JDA/Kord webhook
- Embed formatted : avatar Minecraft via API mcheads, location
- Config filter par type (PvP only / PvE only / all)
- 0.5j. Léger, mais fréquemment demandé.

### 22. ChatBridge Discord ⭐⭐⭐
Chat in-game ↔ Discord channel bidirectionnel. Format configurable, mentions Discord → @ en jeu.
- Webhook Discord outbound (easy) + bot inbound via JDA
- `AsyncPlayerChatEvent` → send embed
- Listener Discord message → broadcast en jeu avec préfixe `[Discord] Username`
- 0.5j. Classique mais 6 concurrents seulement, place à prendre.

### 23. JoinLeave Notifier ⭐
Event `join/leave` → message Discord embed avec count live des joueurs online et uptime serveur.
- `PlayerJoinEvent` + `PlayerQuitEvent` + webhook
- Embed color vert/rouge, count via `Bukkit.getOnlinePlayers().size()`
- Optional : nouveau record de joueurs → alert spéciale
- 0.5j. Quickwin, petit mais utile.

---

## 🧰 Mini-bibliothèques utility (catégorie 6 plugins — place pour des micros)

### 24. Hologram Pro ⭐⭐⭐
API simple pour créer des holograms (texte flottant) avec animation, multi-lignes, updates temps réel.
- Class `Hologram(location, lines)` + `.update()`, `.animate()`, `.remove()`
- Basé sur `ArmorStand` invisible markers (pattern standard)
- Fade-in/fade-out via packet or scheduler
- 1.5j. Utility dev utile, peut devenir dépendance d'autres plugins.

### 25. SmoothCamera Cinematic ⭐⭐
API cam en vol pour cinematics admin (trailers serveur, cutscenes). Courbe Bezier entre waypoints.
- Commande `/cam record` + `/cam play` (record waypoints)
- Bezier interpolation smooth entre points
- `player.setGameMode(SPECTATOR)` + teleport tick by tick
- 1j. Niche mais demandée pour serveurs RPG communication.

### 26. ConfigReload Master ⭐
Commande unique `/configreload` qui scanne tous les plugins et reload les configs sans `/reload` (évite les memory leaks).
- Reflection sur `Plugin.reloadConfig()` de tous les plugins chargés
- Whitelist configurable (évite reload des plugins incompatibles)
- Log détaillé per-plugin status
- 0.5j. Utility admin, quick-win.

---

## 🎯 MMO RPG mechanics (serveurs flagship demande concrète)

### 27. RuneInscriber ⭐⭐⭐
Table custom où le joueur grave des runes sur des items pour effets custom (lifesteal 3%, speed, fortune, thorns).
- Block "rune table" + inventory GUI
- Slot item + slot rune stone + anvil button
- NBT write modifier custom, event listener apply effect
- 1.5j. RPG feature majeure, demandé par tous les serveurs MMO.

### 28. DungeonKey ⭐⭐⭐
Clé consommable qui ouvre une porte-instance unique. Crée une instance privée du donjon pour le joueur + party.
- Item `dungeon_key` + `PlayerInteractEvent` sur block `dungeon_door`
- Schematic paste de la zone instance
- Teleport party + lock le door après entry
- 1.5j. Mechanic MMO rare, monétisable.

### 29. PartyHPBar ⭐⭐
HP bar visible au-dessus des teammates de ta party (hologram per-player). Changement couleur selon HP %.
- `scoreboard` or armorstand packet per viewer
- Update tick task si health change
- Couleur : vert > 60%, jaune > 30%, rouge sinon
- 1j. QoL MMO, catégorie party sous-servie.

### 30. Storm Seal Talisman ⭐⭐⭐
Talisman qui charge l'énergie pendant les orages (visible jauge hologram au-dessus du joueur). Clic droit = décharge AoE de foudre dans 8 blocs. Accumulation passive.
- Item `storm_seal` persistent avec PDC `charge: Float`
- `WeatherChangeEvent` STORM → tick task augmente charge + 0.1/seconde si le joueur est outdoor
- Hologram jauge au-dessus du joueur quand charge > 0 (scheduler update)
- Clic droit si charge ≥ 0.5 → `world.strikeLightningEffect()` × 3 aléatoire dans radius 8 + damage AoE, reset charge
- 1.5j. Unique (pas de "food buff" vanilla-like, pas de conflit Wan's Wonder Weapons ni RPG Leveling). Weather interaction rare.

---

## Notes

- Concepts tirés d'analyse de marché (avril 2026) rééquilibrés vers catégories sous-servies : **magie, quêtes, patches/anti-triche, intégrations Discord** sont les zones vides prioritaires
- Tous les concepts restent **1-2 jours max**, **gif-friendly**, alignés avec le principe "wow + dev rapide"
- **Audit concurrence gratuite** : aucun concept ne duplique les dominants cités dans l'analyse (BetterMap 502K maps, EyeSpy 407K spy, Wan's Wonder Weapons 342K custom weapons, RPG Leveling 277K, MMO Skill Tree 251K, Advanced Item Info 232K, Overstacked 209K stacks, Simply Trash 192K, Vein Mining 184K, Spellbook 181K magic framework).
  - **TreasureHunt Map** (version ancienne) remplacé par **EchoLocation Sonar** (#12) → évite conflit BetterMap
  - **StatBoost Food** (version ancienne) remplacé par **Storm Seal Talisman** (#30) → évite conflit Wan's Wonder Weapons + RPG Leveling
- Plusieurs concepts sont complémentaires → bundles possibles (ex: FrostBreath + LightningWand + HealingAura = "Spell Pack" $15)
- Les 5 plugins actifs pour Phase 10 restent dans `PLUGINS.md` (GravityFlip, ChainLightning Sceptre, ShadowClone, GrapplingHook, EarthquakeSlam)

## Pipeline Suggéré (post Phase 10)

Si Phase 10 convertit en clients :
- **Batch 2 (v1.3)** — Spell Pack : FrostBreath (#1), LightningWand (#2), HealingAura (#3) → bundle magie premium $15
- **Batch 3 (v1.4)** — MMO Essentials : RuneInscriber (#27), DungeonKey (#28), PartyHPBar (#29) → bundle MMO $20
- **Batch 4 (v1.5)** — Admin Suite : AFK Spotlight (#18), FastHand Detector (#19), DuplicateItem Finder (#20) → bundle admin $15
- **Batch 5 (v1.6)** — Combat Unique : ParryWindow (#13), RevengeMark (#14), CounterAttack Shield (#16), SoulLink (#17) → bundle combat $18

**Frameworks long terme (Phase 12+)** : myth_lib OSS, Quest Framework, MythGuard Anti-Cheat MMO, MythArena matchmaking — pas dans ce backlog, planning séparé (2-6 semaines chacun).
