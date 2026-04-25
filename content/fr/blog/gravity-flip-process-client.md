---
title: "GravityFlip : du brief client au plugin Hytale en production"
description: "Retour d'expérience sur le développement de GravityFlip — comment une demande floue (\"je veux inverser la gravité\") devient un plugin Hytale architecturé, configurable, et utilisable par des builders sans toucher au code."
date: "2026-04-25"
tags: ["hytale", "case-study", "gravity-flip", "consulting"]
draft: false
---

> **TL;DR** — Un client m'a contacté pour "inverser la gravité dans une partie de la map". Cinq questions plus tard, on était sur un plugin de **régions paramétrables** avec wand in-game, persistence JSON, et trois modes de visualisation. Le résultat tourne aujourd'hui en production : [GravityFlip sur Modtale](https://modtale.net/mod/gravity-flip).

## Le brief initial

Le message Discord d'origine tient en deux phrases :

> *"Salut, j'aimerais un plugin qui inverse la gravité sur une zone de mon serveur. C'est pour un event ce week-end, je peux payer."*

C'est exactement la forme de brief la plus dangereuse. Lue rapidement, elle donne l'illusion d'être claire (*"inverser la gravité"* + *"zone"* = ça suffit pour coder, non ?). Lue posément, elle ne dit **rien** de précis :

- *"une zone"* — combien ? une seule, configurée par YAML ? plusieurs, gérées en jeu ? globale au serveur ?
- *"inverser la gravité"* — pour qui ? les joueurs uniquement ? les items qui tombent ? les mobs ? les projectiles ?
- *"pour un event ce week-end"* — usage one-shot ou outil réutilisable par les builders du serveur après ?
- *"je peux payer"* — quel scope, quel budget ? Plugin essentiel à 149€ ou système complet à 349€ ?

J'ai pris l'habitude de **ne jamais coder avant d'avoir épuisé les ambiguïtés**. Ça paraît contre-intuitif quand le client est pressé, mais 30 minutes de questions économisent 10 heures de réécriture.

## Les cinq questions qui ont tout changé

### 1. "Combien de zones, et qui les définit ?"

Réponse : *"Au début je pensais une seule, mais en fait j'aimerais que mes builders puissent en créer plusieurs sans me demander à chaque fois."*

Décision immédiate : **système multi-régions** avec persistence. On exclut le YAML hardcodé (trop friction) et on s'oriente vers un **wand in-game** + commandes `/gravityflip define <name>`. Pattern classique de la communauté Bukkit/Spigot, repris pour Hytale.

### 2. "Pour qui la gravité s'inverse ? Joueurs uniquement, ou tout ?"

Réponse : *"Les joueurs ouais, mais aussi les items dropés ce serait stylé. Les mobs je sais pas."*

Décision : **trois booleans configurables par région** — `AffectPlayers`, `AffectItems`, `AffectNpcs`. Default = tout activé, mais le builder peut désactiver les mobs sur une zone "salle de saut" si les mobs flottants gâchent le gameplay. Le coût marginal de ces 3 toggles dans le codec JSON était nul, l'optionalité a été offerte.

### 3. "Que se passe-t-il quand un joueur entre dans la zone à pleine vitesse en chute libre ?"

Réponse (après une pause) : *"Heu... j'avais pas pensé. Il devrait pas se prendre les dégâts de chute non ?"*

Décision : **`GracePeriodMs` configurable (default 2500ms)**. Pendant la transition, on lisse l'inversion de gravité au lieu d'un flip instantané qui produit une accélération brutale et des dégâts de chute aberrants. En bonus : un toggle `FallDamage` (default false) pour les zones où on veut quand même que tomber ait un coût gameplay.

C'est le genre de détail qu'**un brief écrit ne fait jamais émerger**. Une vraie discussion, oui.

### 4. "Tu veux voir les zones quand tu es dedans ?"

Réponse : *"Oui en build c'est obligé sinon je sais plus où elles sont. Mais en live joueur faut rien voir."*

Décision : **trois modes de visualisation**.
- `Outline` — wireframe couleur configurable (`VisualColor`, default `#00FFFF`), pour le mode build
- `Particles` — bordures émettrices de particules (`Torch_Fire` par défaut), plus discret mais visible
- `None` — invisible, mode production

Toggle par région via la commande `/gravityflip toggle`. Build mode et live mode sur la même map sans rebuild du plugin.

### 5. "C'est un one-shot ou tu réutilises ?"

Réponse : *"One-shot pour l'event, mais si c'est bien fait je le garde."*

Décision déterminante : on traite ce projet comme **un plugin de production**, pas comme un script. Concrètement :
- Persistance JSON dans `Server/mods/Mythlane_GravityFlip/regions.json` (pas mémoire seule)
- Tick loop 10x/sec avec snapshots concurrents (lecture lock-free)
- Tests unitaires sur la logique pure (codec, géométrie AABB)
- Demo region auto-seed au premier démarrage pour onboarding instantané
- Documentation README EN pro, distribuable

**Surcoût vs version "quick & dirty"** : environ 30 % de temps en plus. **Bénéfice** : le client est passé de "j'ai besoin pour samedi" à "je l'utilise toujours, mes builders l'adorent". Le plugin est désormais publiable, monétisable, et donc devenu un actif partagé.

## L'architecture qui en est sortie

```
Player / NPC / Item
       │
       ▼   (chaque tick, 10 Hz)
 RegionTickLoop  ◄─── snapshots de regions.json
       │
       ▼
 GravityApplier + FallDamageGuard
       │
       ▼
 effet par région
```

Le wand suit son propre cycle :

```
Player click  →  WandSelectionStore
                       │
                       ▼
              /gravityflip define <name>
                       │
                       ▼
                 Region registry  →  regions.json (auto-save)
```

Stack technique : **Java 25**, Hytale Plugin API officielle (`com.hypixel.hytale.plugin`), Gradle Shadow pour relocalisation Gson (évite les conflits stdlib), JUnit 5 pour les tests. Code source ~2 500 lignes, dont 30 % de tests.

### Le bout de code qui m'a coûté le plus de réflexion

Le **GracePeriodMs**. Pas du code, mais l'idée derrière : au lieu d'un flip binaire, on interpole la composante verticale de la vélocité sur une fenêtre glissante. Naïvement on écrit :

```java
// version naïve — produit des dégâts de chute aberrants
if (region.contains(entity)) {
    entity.velocity.y = -entity.velocity.y;  // flip instantané
}
```

Avec grace period, on lisse la transition :

```java
// version production — entrée progressive
final long timeInRegion = now - entry.enteredAt();
final double gracePct = Math.min(1.0, timeInRegion / region.gracePeriodMs());
final double targetVy = -region.verticalForce(); // antigrav
entity.velocity.y = lerp(entity.velocity.y, targetVy, gracePct);
```

Trois lignes de plus, mais c'est ce qui fait la différence entre un plugin "marrant 30 secondes" et un plugin que les joueurs utilisent sans rage-quit.

## Ce que ce projet m'a appris (ou rappelé)

**Premièrement** : la valeur du dev senior n'est pas dans la rapidité de code. C'est dans la **série de questions** qui transforme un brief flou en spec actionnable. Si je n'avais pas posé la question 3 (chute libre), le client aurait livré l'event avec des dégâts de chute aberrants, et le plugin aurait été abandonné après le week-end.

**Deuxièmement** : un plugin Hytale qui se vend, ce n'est pas un script. C'est une **codebase Java production-grade** avec persistence, tests, doc, et un onboarding sub-5 minutes. Le client a payé 349€ (tier "Système Sur-Mesure"), pas 50€ Fiverr — et le surcoût est justifié par la qualité que le client va exploiter pendant des mois.

**Troisièmement** : chaque plugin que je code finit publié. GravityFlip est dispo gratuitement sur [Modtale](https://modtale.net/mod/gravity-flip) et bientôt sur CurseForge. Ça ne dilue pas la valeur de la commande client — ça **augmente** ma crédibilité auprès des futurs prospects qui cherchent un dev capable de livrer du code propre, et pas juste de coller des snippets StackOverflow.

## Tu as un projet Hytale en tête ?

Le pattern est toujours le même : on parle 30 minutes, je pose les 5-10 questions qui tuent les ambiguïtés, je te donne un devis ferme, et je livre. Les tarifs sont publics sur [/hytale](/hytale) — entre 149€ pour un plugin essentiel, 349€ pour un système complet, et 790€+ pour une infrastructure MMO custom.

Pas de Fiverr, pas de race-to-the-bottom. Juste un dev senior qui livre du code que tu utilises encore six mois plus tard.

[Demander un devis](/contact) · [Voir GravityFlip en action](https://modtale.net/mod/gravity-flip) · [Voir mes autres plugins](/projects)
