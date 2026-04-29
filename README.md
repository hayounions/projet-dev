# Réaction Rapide - Jeu de Réflexes

[![Réaction Rapide](https://github.com/hayounions/projet-dev-jeu/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/hayounions/projet-dev-jeu/actions/workflows/pages/pages-build-deployment)

## 📖 Description
**Réaction Rapide** est un jeu web interactif testant les réflexes. L'écran change de couleur après délai aléatoire. Cliquez dès le **flash signal** pour mesurer temps réaction (ms). Pièges bluff + sons + design néon!

## 🛠️ Technologies
- **HTML5/CSS3** : Responsive, animations (@keyframes, gradient, clamp)
- **Vanilla JavaScript** : DOM, `performance.now()`, Web Audio API
- **GitHub Pages** pour hébergement

## 🚀 Fonctionnalités Principales
- Mesure temps précis + meilleur score
- Pièges interactifs (boutons troll shake anim)
- Sons motivants (beep ready/signal/success)
- Bouton démarrer position random
- Tutoriel modal explicatif
- Responsive mobile/PC (touch/click)

## 🌐 Démo Live (GitHub Pages)
**[Jouer maintenant!](https://hayounions.github.io/projet-dev/)**

## 🆕 Nouveautés Explorées
- **Web Audio API** : Génération sons synthétiques sans fichiers
- **performance.now()** : Timing haute précision
- CSS `clamp()` + `radial-gradient` pour responsive/design
- Event delegation pour dynamic buttons
- `AudioContext` autoplay policy (user gesture)

## ⚠️ Difficultés Rencontrées
- **Clicks non détectés** sur signal text (innerHTML block)
- **AudioContext suspended** (HTTPS/gesture required)
- **Event bubbling** fakes vs real clicks
- **Position absolute** bouton responsive
- **PowerShell vs cmd** git commands

## ✅ Solutions Apportées
- **Click fix** : `pointer-events: none` text + `stopPropagation()` + no innerHTML signal
- **Audio** : `initAudio()` on gesture, research MDN
- **Events** : `closest('.fake-btn')` delegation, tests console F12
- **Design** : CSS custom properties, browser devtools
- **GitHub Pages** : `gh pages branch -d gh-pages; gh pages --src .` 
- Docs: MDN Web Docs, StackOverflow, trial-error

## 📤 Dépôt & Contacts
- **Repo GitHub** : https://github.com/hayounions/projet-dev-jeu
- **Partagé avec** : rania.maalej@fst.utm.tn (collaborator)

**Rendu Moodle** :
- GitHub : https://github.com/hayounions
