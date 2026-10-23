# Maquettes de page d'accueil, refonte cevennes-mont-lozere.fr sur Symfony

Trois maquettes HTML autonomes, créées le 23 octobre 2026, pour proposer à la Communauté de communes des Cévennes au Mont Lozère la refonte de son site Joomla (ancien, piraté à plusieurs reprises, contrôle ARCOM sur l'accessibilité) sur Symfony.

(c) Sylvain Caron 2026. Proposition non contractuelle. Reproduction et réutilisation interdites sans accord écrit. Textes : site actuel de la communauté de communes. Photos : Émilie Reydon.

## Ouvrir

- `index.html` : page de choix avec les trois aperçus.
- `maquette-1-panorama.html` : institutionnelle et moderne, photo des crêtes entière en tête, barre d'accès rapides, France services, carte interactive.
- `maquette-2-bancels.html` : éditoriale, esprit journal de pays, papier crème, sommaire des services 01 à 10, Le Vent des Bancels en vitrine.
- `maquette-3-guichet.html` : pratique et accessible, « que souhaitez-vous faire ? », tâches, services par commune, tableau des horaires France services, boutons A+ et Contraste.

Paramètres d'adresse : `?nobar=1` masque la barre jaune (captures), `?static=1` affiche tout sans animation, `?contraste=1` ouvre en contraste renforcé.

## Contenu, relevé sur le site en ligne le 23/10/2026 (lecture seule)

- Conservé de l'accueil actuel : titre, 2 actualités (transport solidaire, Clefs pour l'habitat), territoire (19 communes, 5 260 habitants, 619 km², liste et carte), kiosque (Bulletin n°1, Vent des Bancels 130 et 131), galerie, partenaires (PETR, Lozère Nouvelle Vie, Département, Office de tourisme), pied de page.
- Remonté depuis les menus : France services (4 structures, 8 lieux, horaires), se déplacer (ligne 251, 2 €), famille (5 micro-crèches, Méli Mélo), santé (2 maisons de santé), déchets (Syndicat mixte Sud Lozère), logement, médiathèques (14), urbanisme, associations (subventions avant le 31 janvier), conseil communautaire (19/01, 05/03, 22/10/2026), actes, enquêtes publiques, offres d'emploi.
- Données par commune (carte) : `assets/commun.js`, objet LIEUX. Tracés de la carte repris du SVG du site actuel : `assets/traces.js`.

## Fichiers

- `assets/img/` : logo (fond rendu transparent), panorama, galerie (originaux igallery), kiosque, partenaires, visuels d'actualité.
- `assets/barre.css` : barre jaune inter-maquettes (règle Sylvain du 14/10).
- `apercus/` : captures pour l'index.

## Contrôles faits

- Captures 375 et 1440 px des trois maquettes et de l'index, mode contraste vérifié.
- Contrastes de texte calculés : tous au moins 4,5:1 pour le texte courant.
- Aucune photo recadrée (largeur 100 %, hauteur auto, ou hauteur fixe et largeur auto).
- Aucun tiret long.
