# Hytale Plugin Ideas — Backlog (30 concepts)

Idées de plugins pour pipeline long terme. Les 5 sélectionnés pour Phase 10 sont dans `10-CONTEXT.md` (GravityFlip, MagneticHand, TimeRewind, BlackHoleGrenade, Paintball).

Tous ces concepts sont pensés pour être **simples à coder** (1-5 jours chacun), **visuellement fort** (gif-friendly pour DM Discord), et **pousser l'API Hytale** sur au moins un point.

---

## Mouvement & Traversée

### 1. PortalGun
Deux portails (bleu / orange) posés sur n'importe quelle surface. La traversée conserve la vélocité (Portal-like).
Showcase : vectors, projection inverse, téléportation fluide avec gestion de rotation.
Code estimé : ~300 lignes. Wow factor viral ⭐⭐⭐⭐⭐.

### 2. PhaseWalk
Shift + move → passer à travers les murs jusqu'à 2 blocs d'épaisseur, avec effet de distorsion visuelle.
Showcase : détection blocs devant joueur, override collision, particles transparency.
Utile PvP / exploration. ⭐⭐⭐⭐.

### 3. GrapplingHook
Hook lancé, s'accroche au premier block/entité touché. Tire le joueur vers le point d'ancrage.
Showcase : projectiles custom, vectors, animation de rope (particles line).
Gameplay gadget classique mais satisfaisant. ⭐⭐⭐⭐.

### 4. DoubleJump Boots
Bottes custom qui permettent un second saut en l'air, avec particles au boost.
Showcase : item attributes, `PlayerMoveEvent`, air-time detection.
Code minimal, résultat satisfaisant. ⭐⭐⭐.

### 5. FlightCape
Cape qui donne un glide planant : vitesse descente réduite, contrôle directionnel avec look.
Showcase : vector math, gravity override, animation aile.
Parfait pour exploration verticale. ⭐⭐⭐⭐.

### 6. SpiderSilk Shooter
Pistolet à toile : ralentit les mobs touchés, ou s'accroche aux blocs pour un swing type Spider-Man.
Showcase : projectiles, status effects, physics pendulum.
Combat + mobilité. ⭐⭐⭐⭐.

### 7. WormholeTravel
Deux blocs custom liés : marcher sur l'un téléporte instantanément à l'autre (effet vortex).
Showcase : block metadata, région tracking, particles vortex.
Infrastructure réseau/shortcut. ⭐⭐⭐.

---

## Combat & Sorts

### 8. FireballStaff
Bâton magique qui lance des fireballs avec knockback et traînée de feu qui persiste 3s au sol.
Showcase : projectiles custom, block fire set, explosion sans damage terrain.
Classique mais toujours efficace. ⭐⭐⭐⭐.

### 9. EarthquakeSlam
Saut en hauteur → impact au sol = onde de choc qui repousse et stun les mobs dans un rayon.
Showcase : fall distance detection, entity list scan, knockback vector, particles ground ripple.
Effet visuel fort en 150 lignes. ⭐⭐⭐⭐⭐.

### 10. FrostBreath
Item "souffle glacé" — gèle les blocs eau en glace devant le joueur, et met les mobs en stase 3s.
Showcase : ray-casting, block replace temporaire, entity freeze status.
Visuellement propre, pousse l'API status. ⭐⭐⭐⭐.

### 11. LightningRod
Block qui attire la foudre pendant les orages et convertit l'énergie en "puissance" stockée (utilisable par blocks voisins).
Showcase : weather event hook, block neighbors, energy transfer simulation.
Tech progression tease. ⭐⭐⭐.

### 12. BerserkMode
Transformation temporaire : +100% damage mais -50% defense, cooldown 24h in-game, particles rouges.
Showcase : attribute modifiers, potion effects custom, cooldown persistence.
Gameplay risque/récompense. ⭐⭐⭐.

### 13. MirrorShield
Bouclier qui reflète projectiles (arrows, fireballs) vers leur tireur au lieu d'encaisser.
Showcase : entity shooter tracking, projectile redirect, raycast.
Technique, gameplay counter. ⭐⭐⭐⭐.

### 14. ShadowClone Decoy
Juste avant la mort, spawn automatique d'un clone immobile qui tank le prochain hit et disparaît.
Showcase : damage event interception, entity spawn + metadata, timing window.
Anti-grief / PvE assist. ⭐⭐⭐⭐.

### 15. IllusionMirror
Invoque un clone passif qui mime tes mouvements, utile pour tromper les joueurs ennemis en PvP.
Showcase : action record/replay, NPC clone, input buffering.
Avancé techniquement. ⭐⭐⭐⭐.

---

## Monde & Environnement

### 16. TimeBomb Block
Block custom avec timer visible (3-2-1 texte flottant), explosion après X secondes posé.
Showcase : hologram text, scheduler, block explosion custom radius.
Demo propre pour raid gameplay. ⭐⭐⭐.

### 17. WeatherStaff
Bâton qui change la météo dans un rayon de 30 blocs autour du joueur (pluie, neige, soleil).
Showcase : weather packet per-region, particle emitter, item right-click cycle.
Builder/admin friendly. ⭐⭐⭐⭐.

### 18. BiomeChanger
Item qui modifie le biome local (sable → neige, forêt → marais) dans un carré 16x16.
Showcase : biome set API, chunk re-render, persistence.
Sandbox creative. ⭐⭐⭐.

### 19. DayNightSpeed Crystal
Cristal tenu → accélère le cycle jour/nuit personnel (ne change pas serveur, effet client).
Showcase : world time manipulation scope, per-player packets.
Technique propre. ⭐⭐.

### 20. WildMineshaft Generator
Commande admin : génère un donjon-mine procédural sous le joueur, avec couloirs, salles, loot chests.
Showcase : proceduraux generation, structure templates, random walkers.
Impressionne en 1 commande. ⭐⭐⭐⭐⭐.

### 21. GravityWell Tower
Tour placée qui crée une zone de gravité augmentée (x3) dans 10 blocs de rayon autour.
Showcase : per-region physics override (complement de GravityFlip), entity pull tower.
Combo avec GravityFlip pour showcase cohérent. ⭐⭐⭐.

---

## Social & Multiplayer

### 22. WhisperChat
Nouveau channel chat : messages locaux audibles uniquement dans un rayon de 20 blocs (RP).
Showcase : chat event interception, proximity calc, channel system.
Serveurs RP love this. ⭐⭐⭐.

### 23. EmoteSystem
10 emotes custom (wave, dance, bow, sit) avec animations via armor stands / NPCs.
Showcase : animation frames, pose data, command radial menu.
Social, gif-friendly. ⭐⭐⭐⭐.

### 24. DuelArena Block
Block "challenge" : clic droit sur un joueur → pop-up invitation → téléport duel dans arène dédiée.
Showcase : inventory save/restore, region teleport, winner detection, reward system.
Mini-système PvP complet en 400 lignes. ⭐⭐⭐⭐.

### 25. BountyBoard (Wanted System)
Tableau affiché : poser une prime sur un joueur en gold. Tuer la cible = payout auto au tueur.
Showcase : economy integration, death event + killer tracking, UI board.
Social gameplay driver. ⭐⭐⭐⭐.

### 26. TradingCaravan NPC
Marchand PNJ itinérant qui spawn aléatoirement sur des points de la map et vend des items rares.
Showcase : NPC pathing, scheduled spawn, inventory trade menu.
Event gameplay. ⭐⭐⭐⭐.

---

## Économie & Progression

### 27. XPStorage Crystal
Cristal qui stocke le XP excédentaire d'un joueur (au-delà d'un seuil). Récupérable plus tard.
Showcase : XP event, inventory persistence, GUI interaction.
Utility propre, loved by server owners. ⭐⭐⭐.

### 28. RuneInscriber
Table d'enchantement custom : grave des runes sur items pour effets custom (lifesteal, speed, fortune).
Showcase : item metadata NBT, enchantment event, GUI multi-input.
Vraie feature RPG. ⭐⭐⭐⭐⭐.

### 29. TreasureHunt Map
Map parchemin généré avec coords brouillées → guide le joueur vers un chest loot random enterré.
Showcase : random world coords, map rendering, chest loot table.
Exploration gameplay driver. ⭐⭐⭐⭐.

### 30. BankVault
Coffre privé partagé entre tous les mondes/dimensions pour un même joueur (cross-server friendly).
Showcase : persistent inventory, UUID keying, database integration ou YAML.
Essential utility. ⭐⭐⭐.

---

## Notes

- Les concepts 1-5 (GravityFlip, MagneticHand, TimeRewind, BlackHoleGrenade, Paintball) sont dans `10-CONTEXT.md` pour Phase 10.
- Ce backlog peut alimenter de futurs milestones (v1.3+) au rythme de 2-3 plugins par trimestre.
- Chaque plugin publié = 1 article blog associé potentiel (tutoriel dev + démo) → cocon sémantique étendu.
- Priorité à classer par : effet visuel (gif-ready) → showcase API inédite → complexité croissante.

## Pipeline Suggéré (post Phase 10)

Si les 5 premiers convertissent bien en clients, next batch :
- **Batch 2 (v1.3)** : PortalGun (#1), GrapplingHook (#3), EarthquakeSlam (#9) — combat/mobilité spectacle
- **Batch 3 (v1.4)** : RuneInscriber (#28), DuelArena (#24), BountyBoard (#25) — gameplay serveur complet
- **Batch 4 (v1.5)** : WildMineshaft (#20), TreasureHunt (#29), TradingCaravan (#26) — exploration
