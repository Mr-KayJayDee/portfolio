# Marché Hytale du plugin payant, fenêtre ouverte, vitre fragile

**Trois mois après l'Early Access du 13 janvier 2026, le marché du développement payant de plugins Hytale est embryonnaire mais monétisable dès maintenant — à condition de viser les niches délaissées et d'assumer une volatilité technique forte.** L'écosystème compte déjà ~3 500–5 000 mods sur CurseForge (majoritairement gratuits), ~278–295 plugins payants sur BuiltByBit, et 235 créateurs Hytale recensés sur cette même plateforme. Mais les volumes de ventes restent modestes (le best-seller plugin vérifié affiche 37 achats, le meilleur *server setup* 208). La demande existe — serveurs phares comme HyClash ($20 000 de budget public) ou Hytown recrutent — mais le pic de joueurs s'est effondré de ~52 % entre janvier et février. **Pour MYTHLANE SASU, la fenêtre d'entrée est ouverte pendant 12–18 mois avant que la consolidation ne fige les rentes de marque.** Le pari gagnant n'est pas le plugin cosmétique à $5 : c'est l'infrastructure MMORPG premium (quêtes, proxy/réseau, anti-triche, bibliothèques développeur) là où la baseline gratuite n'existe pas encore.

---

## 1. Résumé exécutif

1. **Marché du plugin payant Hytale = ~3,5 mois d'existence commerciale**, centralisé à 70 % sur BuiltByBit (295 plugins, 515+ ressources totales, 235 créateurs recensés). Polymart n'a pas encore de catégorie Hytale dédiée. CurseForge reste le canal gratuit officiel (partenariat Hypixel Studios/Overwolf, 20 M+ de téléchargements cumulés au Q1 2026). **Confiance : Haute.**
2. **Le pricing plugin est anchré bas** — $3–15 à l'unité, $8–16 en bundle, $10–30 pour un *server setup* complet. Seul l'anti-triche a basculé vers l'abonnement (HyGuard propose mensuel/trimestriel/à vie + $4,99/slot serveur). **Confiance : Haute.**
3. **Les volumes vérifiés sont faibles** : 37 achats pour Hytale Shop (Primax), 115 pour Premium Survival Setup (Nekio), 208 pour Premium Lobby Setup. **Aucun produit payant Hytale n'a dépassé 250 ventes vérifiées.** Le revenu brut d'un plugin payant à succès plafonne aujourd'hui à ~$2 000–$5 000 de lifetime. **Confiance : Haute.**
4. **Kotlin/JVM est officiellement supporté en first-class** — le template officiel HytaleModding/plugin-template cite explicitement « Java or Kotlin », une bibliothèque DSL dédiée existe (Hytale.kt), et KuramaStone se positionne publiquement comme « Full-Stack Java/Kotlin Hytale developer ». La stack de Killian est alignée sans friction. **Confiance : Haute.**
5. **Le SDK n'est pas encore stable pour du commercial serein** : le Directeur Technique Slikey reconnaît publiquement les crashs avec perte de données, la documentation incomplète, trois frameworks UI concurrents, et des *breaking changes* possibles à chaque patch. Cadence : mises à jour toutes les 2–6 semaines, pré-releases hebdomadaires, changelog API officialisé depuis Update 5 (2 avril 2026). **Confiance : Haute.**
6. **Population de serveurs fragmentée** — 400 à 1 200 serveurs selon les annuaires (HytaleCharts 432, HyServers 1 221, HytaleTop100 250+), mais concurrences simultanées souvent en simples chiffres par serveur. MAU estimées à ~700K en février 2026, DAU ~156K, pic concurrent ~52K, **chute de 52 % par rapport au pic de janvier.** Le récit « 2,8 M de joueurs au lancement » est infondé (bug d'auth, débunké). **Confiance : Moyenne** (données algorithmiques ActivePlayer.io, aucune divulgation officielle).
7. **La demande solvable existe mais elle est concentrée sur 10–30 serveurs ambitieux** : Hytown (équipe « ex-SpaceX/Runescape »), HyClash (ThirtyVirus, $20K budget), Runeteria (Float Studios), Histatu, Hylterium, Hyterion. Ces acteurs embauchent en interne ou via BuiltByBit, pas via Reddit ni les forums officiels.
8. **Catégories sous-servies à exploiter en priorité** — Quêtes (baseline gratuite quasi inexistante), Réseau/proxy (pas d'équivalent BungeeCord/Velocity identifié publiquement), Anti-triche (seulement 2 anti-triches gratuits recensés sur BBB), Frameworks de mini-jeux avec matchmaking, et **bibliothèques développeur premium** (Spellbook a 181K downloads en gratuit, prouvant l'appétit pour les fondations).
9. **Le benchmark Minecraft suggère un plafond réaliste à 2–3 ans** de $3–10 M/an de marché brut plugin payant Hytale, si l'adoption se maintient. À titre de repère : ItemsAdder (leader MC) a généré ~$200–500K de lifetime multi-canaux, LPX AntiPacketExploit ~$81K sur BBB seul, Craftaro ex-Songoda ~55 employés au pic. **Confiance : Faible** (extrapolation).
10. **Recommandation stratégique pour MYTHLANE** — Stratégie hybride en trois temps : (a) *loss-leader* gratuit reconnu (une bibliothèque de quêtes ou un module myth_lib détaché open-source) pour capturer la réputation, (b) suite premium productisée sur BuiltByBit à $15–25/plugin, ciblée MMORPG, (c) prestation bespoke long-terme à €60–100/h réservée aux 5–10 serveurs flagship. Éviter absolument la course au $5 sur Fiverr.

---

## 2. Dimensionnement du marché

### Tableau global

| Indicateur | Valeur (avril 2026) | Source | Confiance |
|---|---|---|---|
| Mods Hytale sur CurseForge | ~3 500 (27 janv.) → ~5 000 estimé avril | Communiqué CurseForge/Overwolf, HytaleCharts | Haute (janv.) / Moyenne (avril) |
| Téléchargements cumulés CurseForge | 20 M+ au Q1 2026 | HytaleCharts, Switchblade Gaming | Haute |
| Plugins payants sur BuiltByBit | ~278–295 (plus 515+ ressources Hytale totales) | builtbybit.com/resources/hytale/plugins/ | Haute |
| Créateurs Hytale inscrits sur BuiltByBit | 235 | builtbybit.com/resources/hytale/ | Haute |
| Plugins payants sur Polymart | Quasi-nul (pas de catégorie Hytale dédiée, cross-listing occasionnel) | polymart.org | Haute |
| Serveurs Hytale listés (annuaires) | 432 (HytaleCharts), 1 221 (HyServers.gg), 500+ (HytaleServerList.me), 250+ (HytaleTop100) | Listes publiques | Haute |
| MAU estimées Hytale (févr.) | ~700K–744K | ActivePlayer.io | Faible (algorithmique) |
| DAU moyen (févr.) | ~156K–170K | ActivePlayer.io | Faible |
| Pic concurrent (févr.) | ~52K | HytaleCharts | Faible |
| Chute pic concurrent janv.→févr. | −52,6 % | HytaleCharts | Faible |
| Discord Hytale officiel | 559 693–567 000 membres | discord.com/invite/hytale | Haute |
| Discord HytaleModding (communautaire) | 9 848 membres | discord.com/invite/hytalemodding | Haute |
| Concours New Worlds (CurseForge/Hypixel) | $100 000 dotation, clôture 28 avril 2026 | hytale.com/news | Haute |
| Développeurs Hytale publiquement « for hire » identifiés | ~25–30 (Fiverr + BBB + sites perso) | Agrégation manuelle | Moyenne |

### Estimation TAM (marché adressable total)

Aucune donnée officielle de revenu n'est publiée. En triangulant les volumes BuiltByBit (top plugins à 37–208 achats, prix médian $10), le nombre total de plugins payants (~295) et en doublant pour les ventes directes Discord, **le brut marché plugin payant Hytale est estimé à $150 000–$400 000 annualisés au T2 2026. Confiance : Faible.** Le marché prestation bespoke (contrats ponctuels et mensuels) représente probablement un multiple de 3–5×, soit $500K–$2M annualisés. **Confiance : Faible.**

À horizon 24–36 mois, si Hytale stabilise sa base joueurs autour de 300–500K MAU et reproduit ~15–25 % de l'intensité de monétisation Minecraft (ItemsAdder-type plugins, écosystème Songoda/Craftaro), le TAM plugin + prestation pourrait atteindre **$3–10 M/an**. **Confiance : Faible — scénario extrapolé.**

---

## 3. Matrice concurrentielle

### Développeurs et agences Hytale identifiés publiquement

| Nom | Modèle | Prix visibles | Spécialisation | Forces | Faiblesses |
|---|---|---|---|---|---|
| **Owen (joxii / themuscular)** | Commissions à la pièce | $50–150 simple, $200–400+ systèmes (classes, matchmaking) | Systèmes RPG, économie, GUI, matchmaking | Portfolio public visible (ZHorde, Hytown Mount System, PyreTale), site perso, livraisons 1–3 semaines | Dépend du sourcing Discord, pas de production visible |
| **KuramaStone** | Long-terme + freelance | Non publié (DM) | Full-stack Java/Kotlin, infra réseau, bots Discord | 13+ ans d'expérience, clients prestigieux (BlazeGaming, Cobblemon, Stray.gg), GitHub fourni | Aucune grille publique, pas de productisation |
| **7D / Ben** | Commissions privées | Non publié | Mécaniques uniques, cœurs serveur | 8 ans Java, deux diplômes | Très discret, traction publique faible |
| **FancyInnovations** | OSS core + extensions premium (studio) | Non publié | Bibliothèques core (FancyCore), docs | Approche studio, docs structurées, GitHub actif | Productisation récente, notoriété encore en construction |
| **Britakee / Britakee Studios** | Outils gratuits (lead-gen) + commissions | Non publié | Templates, GitBook, tooling | Template plugin officiellement référencé, autorité écosystème | Revenus dépendants de la conversion Discord |
| **Primax Studios** | Listing marketplace BBB | $7,99 plugin, $9,88 bundle | Économie, shops | Ventes vérifiées (37 achats Hytale Shop), 3 176 vues | Volume modeste, niche encombrée |
| **Nekio** | Server setups productisés | $7,49–$22,49 | Lobby, Survival, Skyblock setups | **208 achats Premium Lobby, 133 Skyblock, 115 Survival** — meilleur vendeur vérifié | Cible admin amateur, ticket moyen faible |
| **HyGuard team** | Abonnement multi-tier + par slot | Mensuel/trim./semestriel/annuel/à vie + $4,99/slot/mois | Anti-triche premium | Seul acteur avec modèle SaaS revenu récurrent, site hyguard.ac dédié | Monopole fragile si Hypixel natif anti-triche s'améliore |
| **Ssomar (Special70)** | Marketplace Polymart, port MC→Hytale | Prix Polymart variables | Scripting items/blocks/entités (ExecutableItems, SCore) | Marque établie sur MC, portage rapide | Pas 100 % Hytale-natif |
| **Violet (VioletsWorkshop)** | Freelance → salariée Hypixel Studios (mars 2026) | N/A (recrutée) | Mobilier, décoration | Signal fort : Hypixel recrute en interne dans la communauté | Exit du marché freelance — précédent inquiétant pour la rétention des top devs |
| **Make_it_first / Pro_nick / Vic_kraft (Fiverr)** | Gigs Fiverr | $45–$95 (dev) ; $30 (assets) ; $15 (install) | Entry-level | Volume, accessibilité | Tarifs plancher, qualité variable |
| **Halos Development / KacperM Services** | Agences commissions | Non publié | Plugins cross-jeux | Multi-paiement (Stripe, crypto), pluriannuel | Pas Hytale-natifs, approche opportuniste |
| **etamerz** | Courtier multi-disciplines | « Maximum % » aux devs | Brokerage Discord | Intermédiaire entre clients et devs | Modèle de rente, peu scalable |

### Baseline gratuite dominante (concurrence indirecte)

Les 10 plugins/mods gratuits les plus téléchargés définissent les attentes du marché : **BetterMap (502K), EyeSpy (407K), Wan's Wonder Weapons (342K), RPG Leveling (277K), MMO Skill Tree (251K), Advanced Item Info (232K), Overstacked (209K), Simply Trash (192K), Vein Mining (184K), Spellbook (181K).** Auteurs prolifiques à surveiller : **DarkhaxDev** (~870K cumulés, co-auteur du template officiel), **Buuz135** (~577K), **Jaredlll08** (~308K). Toute offre payante doit impérativement surpasser cette baseline sur la profondeur fonctionnelle, pas sur la largeur.

Côté administration serveur gratuite, **EliteEssentials** (14K, LuckPerms-style) et **Essentials Core** (26K) occupent l'équivalent du territoire EssentialsX. À noter : l'Update 5 (2 avril 2026) a refondu nativement le système de permissions, rendant certaines couches d'admin moins défendables.

---

## 4. Analyse de la demande

### Archétypes d'acheteurs avec fourchettes budgétaires

| Archétype | Effectif typique | Budget dev customisé | Canal privilégié | Source / hypothèse |
|---|---|---|---|---|
| **Propriétaire solo / hobbyiste** | 1 propriétaire, 0–1 dev occasionnel | $5–$40 par plugin simple, souvent « gratuit contre vouch » | Fiverr, Discord, Upwork | Analogie MC (BBB threads) — Moyenne |
| **Petit réseau (2–5 staff)** | 1 dev mi-temps | $15–$25/h freelance, €50/projet court, retainer mensuel non quantifié | BuiltByBit, HytaleHub forum | Hytale thread BBB 736777 — Moyenne |
| **Serveur RPG/MMO mid-tier** | 5–15 staff, 1–2 devs + contractuels | ~20 h/semaine dev engagé, « high budget long-term roadmap » non chiffré | BuiltByBit, Discord privés | Thread BBB 737528 — Moyenne |
| **Réseau adossé à un créateur de contenu** | 15–30 staff, équipe dev+artistes | $20 000+ dédié pré-lancement | Recrutement ciblé + BBB | HyClash / ThirtyVirus, annonce publique — Haute |
| **Grand réseau ambition Hypixel** | 20+ ingénieurs temps plein | Implicite multi-$100K/an (revendications « ex-SpaceX/Runescape ») | Recrutement direct, aucun appel d'offres public | Hytown.org « About Us » — Faible |
| **Modèle revenu-share / volontariat** | 1–5 personnes, 0 cash | Equity / rev-share uniquement | Threads de recrutement ouverts | Thread BBB 735631 — Haute |

### Catégories de plugin les plus demandées

Le classement ci-dessous croise la fréquence des tags BuiltByBit (l'offre répond à la demande), les descriptifs des serveurs phares, et les fils de recrutement explicites. **Les systèmes de gameplay RPG dominent largement** (120 plugins taggés), suivis par l'UI (39), les cores/essentials (33), la génération de monde et les mondes eux-mêmes (30 chacun), le fun (30), l'économie (27), la modération (27), l'optimisation (27), le chat (24), la protection (24), les mobs personnalisés (24), les récompenses (23) et la monétisation Tebex (20). **Les catégories anormalement peu fournies — et donc les plus exploitables en premium — sont l'anti-triche (seulement 2 plugins), les patches (2), la magie (1), les bibliothèques (6), et les intégrations Discord (6).** Les quêtes et les proxies réseau sont quasi inexistants en payant comme en gratuit.

### Serveurs phares et signaux de recrutement

Aucun serveur Hytale n'a atteint l'échelle Hypixel/Mineplex en avril 2026. Les concurrences observées sur les annuaires plafonnent à ~29 joueurs simultanés pour le leader Runeteria. **Hytown** (play.hytown.org) se présente comme « #1 Hytale Server » avec une équipe « ex-SpaceX/Runescape » construisant un MMO pour l'été 2026. **HyClash** (hyclash.com) est mené par le créateur ThirtyVirus avec un **budget public de $20 000**, une infrastructure Kubernetes, et recrute ouvertement via BBB (lead dev « auvq »). **Runeteria** est bâti par Float Studios (vétérans Minecraft Marketplace). **Histatu Network** revendique 250+ mods, 500+ armes personnalisées, et des boss de raid co-op maison. **Hypixel Studios lui-même** a recruté Violet depuis la communauté (mars 2026) — signal que les top talents gratuits sortent du marché freelance vers des postes salariés officiels.

Les fils « Looking For Developer » sont quasi-exclusivement hébergés sur **BuiltByBit** (threads Hytale Development 20h/semaine, Hytale MMORPG Runetale, HyClash developers). **Reddit r/Hytale n'est pas un canal de brokerage** — les recherches ne remontent aucune mégathread de recrutement. Les forums hytale.com officiels ne servent pas non plus cette fonction.

---

## 5. Recommandations de positionnement stratégique

### Logique de positionnement pour MYTHLANE SASU

Trois faits structurels conditionnent la stratégie. **Premièrement**, Killian dispose déjà d'un portfolio de 10 plugins Kotlin internes sur architecture hub-and-spoke (myth_lib + myth_core) — c'est un actif technique rare dans un marché où les devs seniors publics se comptent sur les doigts d'une main. **Deuxièmement**, la fenêtre d'entrée est ouverte mais étroite : 12–18 mois avant que l'écosystème consolide ses rentes de marque (auteur-référence par catégorie). **Troisièmement**, la stack Kotlin/TypeScript full-stack + le projet MMORPG Mythlane + le SaaS VotePipe fournissent une crédibilité produit que les freelances Fiverr à $45 ne peuvent pas répliquer.

Les leçons Minecraft sont sans ambiguïté : **la productisation bat la prestation bespoke sur le scaling** (ItemsAdder, CMI, Lands, MythicMobs dominent tous par des plugins productisés avec écosystème Discord), **le freemium OSS-core seed la réputation** (EssentialsX, Auxilor eco), **les dependency libraries créent des moats durables** (ProtocolLib, Vault, Spellbook sur Hytale avec ses 181K downloads). Le « plugin + cours + serveur » triple-stack (MineAcademy model) est le meilleur risque-ajusté, ce qui valide précisément le pari Mythlane-serveur-phare.

### Trois options go-to-market classées par faisabilité

**Option A — Stack hybride « vitrine Mythlane + suite MMORPG premium » (faisabilité HAUTE, recommandée).** Sortir myth_lib et myth_core en open-source gratuit sur CurseForge et GitHub sous marque MYTHLANE, en capitalisant sur leur différenciation architecturale (hub-and-spoke, API unique sur Hytale) pour capturer le rôle d'infrastructure — le pattern Spellbook/eco. En parallèle, productiser 3–5 plugins Hytale ciblés MMORPG (quêtes avancées, système d'économie multi-serveur, framework de donjons, anti-triche MMO, proxy léger) sur BuiltByBit à $15–25/pièce, avec un bundle complet à $79–$99. Le serveur Mythlane MMORPG devient la vitrine vivante qui valide chaque plugin en production. Canal principal BuiltByBit, canal secondaire CurseForge (version gratuite allégée pour l'entonnoir). Participer au concours New Worlds avant le 28 avril si la deadline est tenable. Revenu cible 12 mois : $30–60K brut premium + $40–80K prestation long-terme sélective, soit $70–140K. **Confiance : Moyenne.**

**Option B — Agence senior bespoke « Mythlane Dev Studio » (faisabilité MOYENNE).** Positionner MYTHLANE comme l'agence senior Java/Kotlin de référence pour les 10–30 serveurs flagship Hytale (Hytown, HyClash, Histatu, Hylterium, Hyterion, Runeteria, et les entrants 2026). Tarif public €75–€100/h ou forfait €3 000–€8 000 pour systèmes MMO complexes (ce qui place la prestation 2–3× au-dessus du marché actuel Fiverr/Upwork et s'aligne sur le senior Minecraft freelance). Garantie SLA incluant suivi des breaking changes API Hytale à chaque update. Distribution par Discord privé, LinkedIn, et thread « For Hire » sur BuiltByBit. Ce modèle ne scale pas linéairement (plafond ~€150K/an en solo), mais il est très défensif contre la chute potentielle de la base joueurs Hytale : le revenu est contractuel, pas volumétrique. **Confiance : Haute sur l'exécution, Moyenne sur la demande solvable à ce tarif.**

**Option C — Plateforme SaaS hybride VotePipe × Hytale (faisabilité FAIBLE court-terme, fort potentiel 18–24 mois).** Leverager le SaaS VotePipe existant pour construire un add-on « Hytale Server Growth Suite » : intégration vote-reward multi-listes (HytaleCharts, HyServers, HytaleTop100, HytaleServerList, HytaleTop100), dashboard analytics server-owner, module monétisation Tebex-like. Abonnement mensuel $19–49/serveur. Seul vrai jeu SaaS récurrent de l'écosystème après HyGuard, et adjacent à l'expertise existante de Killian (TypeScript full-stack). Risque principal : base installée serveurs trop faible en avril 2026 pour soutenir une acquisition SaaS (l'option dépend d'une reprise de la courbe joueurs Hytale en 2026–2027). À garder en option de 12–24 mois, pas en *day-one*. **Confiance : Moyenne sur la faisabilité technique, Faible sur la taille de marché court-terme.**

### Pricing tier défendable dès aujourd'hui

Les repères ci-dessous sont construits en mixant les ventes vérifiées Hytale (Primax, Nekio, HyGuard) et la grille Minecraft senior 2023–2025 :

Pour les plugins premium productisés, viser **$15–$25/plugin** (20–60 % au-dessus du ticket moyen actuel, justifié par la qualité architecturale et la marque MMORPG), bundle MMORPG à **$79–$99**, addons DLC à **$5–$10**. Pour la prestation bespoke, facturer **€60–100/h** (senior Kotlin/JVM + contexte MMORPG), minimum projet **€500**, forfait petit système **€1 500–3 000**, forfait système MMO complet (économie cross-server, quêtes, proxy) **€5 000–15 000**. Pour les retainers long-terme (20h/semaine type HyClash), viser **€3 500–6 000/mois**. Éviter absolument les tarifs Fiverr ($45–95) qui détruiraient le positionnement.

### Canaux de distribution hiérarchisés par levier

Un seul classement opérationnel : **BuiltByBit est incontournable** (traction payante, 235 créateurs Hytale, purchases publiques, tags Hytale mûrs, 9,9 % de commission). **CurseForge est obligatoire** comme entonnoir gratuit et signal de crédibilité officielle. **Discord HytaleModding (9 848 membres) est le war-room technique** où se construit la réputation de senior. **GitHub public avec docs GitBook** est le signal de crédibilité pour les acheteurs B2B (serveurs flagship). **Un site MYTHLANE.dev** avec portfolio, démos vidéo et case studies Mythlane devient l'actif durable. Les canaux à déprioritiser : Polymart (pas de catégorie Hytale), Reddit r/Hytale (aucun brokerage), HyForge/HytaleForge/Hytale Mod Shop (inventaires trop minces pour valoir l'effort catalog). Fiverr uniquement en *loss-leader* éventuel pour capturer des premiers acheteurs à convertir vers le site direct.

### Signaux de crédibilité qui convertissent

Dans un marché de 3,5 mois, **la preuve visuelle et le portfolio live dominent tout le reste**. Les acheteurs flagship (Hytown, HyClash, serveurs MMO ambitieux) achètent d'abord un dev qu'ils ont vu livrer un produit complexe sur un vrai serveur. Les quatre signaux à industrialiser dans l'ordre : **(1) le serveur Mythlane lui-même comme showcase live**, (2) un GitHub public avec 3–5 repos Hytale documentés (myth_lib open-source en tête), (3) 2–3 vidéos YouTube démo 3–5 minutes montrant un système Mythlane en fonctionnement, (4) une présence Discord HytaleModding avec contributions techniques visibles (answers à des questions API, PRs sur plugin-template). À l'inverse, le réseau LinkedIn et le référencement SEO long-terme apportent peu en phase d'amorçage de marché.

---

## 6. Registre des risques et mesures d'atténuation

| Risque | Probabilité | Impact | Horizon | Mesure d'atténuation |
|---|---|---|---|---|
| **Instabilité du SDK Hytale** (crashs, *breaking changes* API, Pack compatibility) | Haute | Élevé (coûts de maintenance multiplicatifs) | 6–12 mois | Architecture myth_core comme couche d'isolation API unique (pattern déjà en place chez Killian), suivi automatisé du changelog officiel + doctale.dev, buffer de 20 % du temps facturé en maintenance incluse, refuser les forfaits fixes sur projets \>€3K |
| **Déclin de la base joueurs Hytale** (−52,6 % pic janv.→févr. 2026) | Moyenne-Haute | Critique (réduction TAM 50–80 %) | 6–18 mois | Diversification produits via VotePipe (indépendant Hytale), Option B bespoke à revenu contractuel, ne pas financer de R&D \>3 mois sans contrat pré-vendu, provisionner 6 mois de runway perso indépendant du revenu Hytale |
| **Concurrence gratuite massive** (5 000+ mods CurseForge, $100K concours en cours) | Haute | Moyen (pression sur prix et différenciation) | Permanent | Positionnement exclusif sur catégories vides (quêtes, proxy, framework minigames, bibliothèque MMO), refus du territoire admin/QoL/UI déjà saturé par DarkhaxDev & co, monétisation par la profondeur MMO pas par la largeur |
| **Hypixel Studios absorbe les top devs** (précédent Violet, mars 2026) | Moyenne | Moyen (shrinkage du marché senior) | 12–24 mois | Soit candidater ouvertement chez Hypixel Studios comme backup, soit verrouiller la marque MYTHLANE comme entité B2B impossible à absorber individuellement |
| **Piratage / cracking** (norme MC : 70 %+ sur certains marchés) | Moyenne | Moyen (lifetime revenue réduit 30–50 %) | Permanent | Distribution BuiltByBit (anti-piratage natif) + licensing serveur custom pour les bundles premium, focus sur le service (support, config custom) que le piratage ne réplique pas |
| **Commoditisation du tarif plugin** (Fiverr à $45, Upwork à $10–15/h) | Haute | Moyen (pression sur les ventes entry-level) | Permanent | Ne jamais concurrencer sur l'entry-level, se positionner exclusivement senior €60–100/h, vitrine Mythlane comme barrière à l'entrée qualitative |
| **Retard d'adoption serveurs vs. Minecraft** (1 221 serveurs vs. centaines de milliers MC) | Haute | Élevé (volumes ventes × 10 moins que MC) | 12–24 mois | Pivoter productisation vers les 30–50 serveurs flagship (ARPU élevé) plutôt que la masse, tarifs bundle adaptés aux MMORPG/RPG networks |
| **Concours New Worlds ($100K) sature l'attention avril-mai 2026** | Certaine | Faible-Moyen (bruit signal, baisse des ventes post-concours) | 1–2 mois | Soit participer avec un concept différenciant (quêtes MMO), soit timer le lancement commercial après la fin du concours (28 avril 2026) |
| **Lock-in plateforme BuiltByBit** (9,9 % commission, dépendance totale) | Moyenne | Moyen | Permanent | Dualiser BBB + vente directe MYTHLANE.dev dès le début, construire mailing-list et Discord propres |
| **Surcoût Kotlin-stdlib shading** (jar size, conflits) | Faible | Faible | Permanent | Relocalisation systématique via Shadow + test de chargement avec HyFixes en dev |

---

## 7. Sources citées en prose

Les sources utilisées dans ce rapport sont nommées en ligne au fil du texte (CurseForge/Overwolf communiqué janvier 2026, HytaleCharts pour les classements downloads, BuiltByBit pour les volumes marchands et le tag-count des catégories, ActivePlayer.io pour les estimations MAU/DAU algorithmiques, blog officiel hytale.com pour la stratégie modding et les patch notes Update 1–5, support.hytale.com pour le manuel serveur, GitHub HytaleModding pour le template officiel, hytalekt.vercel.app pour la DSL Kotlin, joxii.xyz et builtbybit.com pour les profils développeurs, hyclash.com et hytown.org pour les serveurs phares, windowscentral.com pour le recrutement Violet, polymart.org et spigotmc.org pour le benchmark Minecraft, pitchbook.com pour le dossier Craftaro-Songoda, mineacademy.org pour la stratégie multi-revenus). Confiance : les volumes BuiltByBit, tarifs Nekio/Primax/HyGuard, statuts SDK et templates officiels sont en **Haute**. Les MAU/DAU Hytale, les estimations TAM, et les tarifs bespoke non publiés sont en **Moyenne/Faible** et marqués comme tels tout au long du rapport.

---

## Conclusion — Trois convictions à retenir

**La fenêtre d'entrée n'est pas un fantasme, elle est quantifiable et courte.** À 235 créateurs Hytale recensés et ~295 plugins payants en circulation après 3,5 mois, le marché est encore à 1–2 % de la densité Minecraft. Un senior Kotlin avec portfolio et serveur vitrine entre avant la vague, pas au milieu. Cette fenêtre se referme mécaniquement avec chaque mois d'afflux de devs Paper/Spigot qui migrent naturellement vers Java 25.

**Le vrai actif différenciant de MYTHLANE n'est pas la stack technique — c'est Mythlane lui-même.** Les 25–30 devs Hytale publics identifiés vendent tous du code sans produit fini en production. Un MMORPG Mythlane opérationnel, même modeste, produit une preuve de livraison que ni Fiverr ni Upwork ne peuvent répliquer. La stratégie gagnante capitalise cette asymétrie : le serveur vitrine valide chaque plugin, et chaque plugin premium amortit le développement du serveur. C'est exactement le pattern MineAcademy × MassiveCraft qui a défini les top revenus du marché Minecraft.

**Le pari asymétrique est sur les catégories vides.** Quêtes, proxy réseau, frameworks minigames avec matchmaking, bibliothèques MMO — aucune de ces catégories n'a de champion gratuit dominant sur CurseForge ni de concurrent premium crédible sur BuiltByBit. Le même effort placé sur un énième plugin d'économie (27 concurrents) produira un cinquième des revenus d'un plugin de quêtes productisé pour les 30–50 serveurs RPG flagship. Dans un marché dont le TAM court-terme est contraint, la discipline de niche vaut plus que la largeur de catalogue.