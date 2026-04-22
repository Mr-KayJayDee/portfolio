# Plugins Hytale — Phase 10 (v1.2)

5 plugins **wow + dev rapide (1-2j)** ciblés pour gif Twitter/Discord + DMs. Après analyse de marché (avril 2026), j'ai rééquilibré les 4 remplacements vers des catégories **moins saturées** quand possible (magie = 1 seul plugin payant, système de classes rare, combat-counter spécifique).

Chaque plugin reste **simple à coder, visuellement fort**, et produit un gif 5-10s clip-ready. Les frameworks sérieux (myth_lib OSS, Quest Framework, MythGuard, MythArena) sont déplacés en Phase 12+ (roadmap longue, 2-6 semaines chacun).

---

## 1. GravityFlip Region (~1j)
**Repo :** `hytale-gravity-flip`

Block custom qui définit une zone. Toute entité qui entre a sa gravité inversée (marche plafond, items tombent vers le haut).
- Hook `PlayerMoveEvent`, check région, flip `velocity.y`
- Commande : `/gravityflip define <name>` pour capturer 4 corners ou alors un item (giveable ou craftable comme le //wand pour set pos1 et 2)

---

## 2. ChainLightning Sceptre (~1j)
**Repo :** `hytale-chain-lightning`
**Catégorie marché :** Magie (1 seul plugin payant sur BBB — quasi-vide). **Différentiation vs Wan's Wonder Weapons (342K free)** : ce n'est pas un projectile classique, c'est une mécanique de chaînage visuellement unique.

Bâton magique : cible un mob → la foudre saute de cible en cible (max 5 targets dans un rayon de 8 blocs entre chaque saut), avec dégâts dégressifs et traînées électriques visibles.
- Item custom `chain_lightning_sceptre` cooldown 4s
- Ray-cast 25 blocs → find first entity
- BFS entity graph : chaque cible ajoute la suivante la plus proche (radius 8), skip déjà-hit, max 5 chaînes
- Damage dégressif : 8, 6, 4, 3, 2 HP
- Particles `ELECTRIC_SPARK` + `END_ROD` en ligne entre chaque paire de cibles
- Son `lightning_bolt` atténué à chaque saut

---

## 3. ShadowClone Decoy (~1j)
**Repo :** `hytale-shadow-clone`
**Catégorie marché :** Combat unique / anti-death (gameplay-saving, catégorie peu exploitée)

Juste avant la mort (HP < 2), spawn automatique d'un clone immobile qui tank le prochain hit pendant que le joueur devient invisible 2s et téléporte 5 blocs en arrière. Cooldown 60s.
- `EntityDamageEvent` priority HIGHEST → si health - damage ≤ 2 et pas en cooldown
- Spawn NPC clone (skin du joueur) à la position actuelle
- `player.setInvisible(true)` + teleport derrière + particles `SMOKE`
- Next damage sur le clone → clone.remove() + particles `POOF`
- Cooldown stocké en PDC (PersistentDataContainer)

---

## 4. GrapplingHook (~1.5j)
**Repo :** `hytale-grappling-hook`
**Catégorie marché :** Mouvement (classique mais toujours demandé, pattern Spider-Man recognizable)

Hook custom lancé, s'accroche au premier block/entité touché, tire le joueur vers le point d'ancrage avec animation de rope en particules.
- Item `grappling_hook` right-click → `launchProjectile(CustomProjectile)` linear
- `ProjectileHitEvent` → calcule vecteur (hit_loc - player.loc), `player.setVelocity(vec.normalize().multiply(1.8))`
- Particle line entre joueur et point d'impact pendant le pull (tick task `DUST` noir)
- Block hit = pull fort, entité hit = pull vers l'entité (combat grab)
- Cooldown 5s, range max 20 blocs

---

## 5. EarthquakeSlam (~1j)
**Repo :** `hytale-earthquake-slam`
**Catégorie marché :** Combat AoE visuel (gif-ready max, onde de choc)

Saut en hauteur (>5 blocs chute) → impact au sol = onde de choc circulaire qui repousse et stun 2s les mobs dans un rayon de 6 blocs. Particles ripple ground dramatique.
- `PlayerMoveEvent` détecte fall state (`fallDistance >= 5` + `isOnGround`)
- Scan entities in radius 6 via `world.getNearbyEntities(loc, 6, 2, 6)`
- Knockback vector = (entity.loc - player.loc).normalize().multiply(1.5)
- `entity.addPotionEffect(SLOWNESS 80 ticks amplifier 5)` pour stun
- Particles ripple : `BLOCK_CRACK` (dirt/stone) en cercle expanding 3 ticks

---

## Notes

- **Stack commune** : Java ou Kotlin (first-class supporté), JDK 17+, Gradle Kotlin DSL
- **Package** : `fr.killiandalcin.hytale.<plugin>`
- **License** : MIT (permissif, encourage usage et SEO)
- **README chaque repo** : hero gif 5-10s, tagline EN, features, install, commands, lien portfolio
- **Distribution** : GitHub public (kayjaydee/hytale-*) + release jar attachée à chaque tag v0.x.0. **Pas Fiverr** (destruction positionnement selon analyse de marché)
- **Cible contenu** : 1 gif par plugin à poster sur Twitter/Discord HytaleModding, + portfolio killiandalcin.fr/hytale section "Live Demos"
- **Ordre de ship suggéré** : GravityFlip (#1) d'abord (le plus rapide + impact visuel max), puis ChainLightning Sceptre (#2) + EarthquakeSlam (#5) pour compléter le trio visuellement fort, puis ShadowClone (#3) et GrapplingHook (#4) comme mécaniques plus avancées
- **Audit concurrence** : Aucun des 5 plugins ne duplique les dominants gratuits cités dans l'analyse (BetterMap 502K, EyeSpy 407K, Wan's Wonder Weapons 342K, RPG Leveling 277K, MMO Skill Tree 251K, Spellbook 181K). FireballStaff remplacé par ChainLightning Sceptre pour éviter le conflit direct avec Wan's (custom weapons génériques)

**Effort total estimé : ~6.5 jours** (vs. 10j des 5 précédents). Rééquilibrage vers catégories sous-servies quand possible sans sacrifier le "wow rapide".
