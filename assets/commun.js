/* Maquettes Communauté de communes des Cévennes au Mont Lozère. (c) Sylvain Caron 2026. Proposition non contractuelle. */
(function () {
  var params = new URLSearchParams(location.search);
  if (params.has('nobar')) document.documentElement.classList.add('barre-cachee');
  if (params.has('contraste')) document.documentElement.classList.add('contraste');

  /* Ce qui se trouve dans chaque commune, relevé sur le site actuel (octobre 2026). */
  var LIEUX = {
    'Bassurels': [],
    'Gabriac': [],
    'Le Collet de Dèze': [
      ['France services', 'La Poste, place de la Forge. Mardi au vendredi 9h-12h et 14h-16h30, samedi 9h-12h. 04 66 49 78 87'],
      ['Maison de santé', 'MSP du Collet (Collet-de-Dèze, Vialas, Pont de Montvert)'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau saisonnier'],
      ['Siège de la communauté', 'Route de Sauveplane. 04 66 65 07 79']
    ],
    'Le Pompidou': [['Médiathèque', 'Réseau intercommunal']],
    'Moissac Vallée Française': [['Médiathèque', 'Réseau intercommunal']],
    'Molezon': [],
    'Pont de Montvert - Sud Mont Lozère': [
      ['France services', '530 route de Finiels. 04 34 09 06 14'],
      ['Micro-crèche', 'Tournicoton, du lundi au vendredi 8h30-18h30. 06 14 52 40 27'],
      ['Maison de santé', 'MSP du Collet (Collet-de-Dèze, Vialas, Pont de Montvert)'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau ouvert toute l’année']
    ],
    'Saint André de Lancize': [],
    'Saint Etienne Vallée Française': [
      ['France services', 'Mairie, avenue de l’Enclos. Mardi 13h30-17h15, jeudi 8h30-12h30, vendredi 8h45-12h15. 07 85 97 22 62'],
      ['Micro-crèche', 'Les Loustics. 06 99 39 09 03'],
      ['Accueil de loisirs', 'Méli Mélo, les mercredis et une partie des vacances'],
      ['Maison de santé', 'Maison de santé des Cévennes lozériennes'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau ouvert toute l’année']
    ],
    'Saint Germain de Calberte': [
      ['France services', 'Mairie. Lundi 9h-12h30, mardi 9h-12h. 07 85 97 22 62'],
      ['Maison de santé', 'Maison de santé des Cévennes lozériennes'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau saisonnier']
    ],
    'Saint Hilaire de Lavit': [['Médiathèque', 'Réseau intercommunal']],
    'Saint Julien des Points': [],
    'Saint Martin de Boubaux': [
      ['France services', 'Agence postale, centre du village. Vendredi 9h-12h et 13h30-16h30. 04 66 45 98 71'],
      ['Médiathèque', 'Réseau intercommunal']
    ],
    'Saint Martin de Lansuscle': [['Médiathèque', 'Réseau intercommunal']],
    'Saint Michel de Dèze': [['Médiathèque', 'Réseau intercommunal']],
    'Saint Privat de Vallongue': [['Médiathèque', 'Réseau intercommunal']],
    'Sainte Croix Vallée Française': [
      ['France services', 'Mairie. Mercredi 9h30-12h30 et 13h30-15h30, jeudi 13h30-17h. 07 85 97 22 62'],
      ['Micro-crèche', 'Les Pitchouns. 06 99 39 09 03'],
      ['Maison de santé', 'Maison de santé des Cévennes lozériennes'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau saisonnier']
    ],
    'Ventalon en Cévennes': [
      ['France services', 'Agence postale, mairie du Géripont. Mardi 9h-12h et 13h-16h. 04 66 45 56 15'],
      ['Micro-crèche', 'Ventoudoux. 06 14 52 40 27'],
      ['Médiathèque', 'Réseau intercommunal']
    ],
    'Vialas': [
      ['France services', 'Médiathèque, 134 rue Basse. Jeudi 10h30-12h30 et 13h30-16h. 04 66 41 04 15'],
      ['Micro-crèche', 'Les Péquélets, 8h-18h. 06 83 54 61 36'],
      ['Maison de santé', 'MSP du Collet (Collet-de-Dèze, Vialas, Pont de Montvert)'],
      ['Médiathèque', 'Réseau intercommunal'],
      ['Office de tourisme', 'Bureau saisonnier']
    ]
  };
  window.CCCML_LIEUX = LIEUX;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function fiche(nom) {
    var l = LIEUX[nom] || [];
    var h = '<b class="fiche-nom">' + esc(nom.replace(' - ', ', ').replace('Saint Etienne', 'Saint Étienne')) + '</b>';
    if (!l.length) { h += '<span class="fiche-vide">Services de proximité dans les communes voisines. Mairie, actualités et vie locale sur la page de la commune.</span>'; }
    else { h += '<ul class="fiche-liste">' + l.map(function (x) { return '<li><i>' + esc(x[0]) + '</i>' + esc(x[1]) + '</li>'; }).join('') + '</ul>'; }
    return h;
  }
  window.CCCML_FICHE = fiche;

  /* Carte : tout élément [data-carte] reçoit le dessin des 19 communes. */
  var T = window.CCCML_TRACES || {};
  document.querySelectorAll('[data-carte]').forEach(function (box) {
    var zone = box.closest('[data-territoire]') || document;
    var sortie = zone.querySelector('[data-fiche]');
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 615 635');
    svg.setAttribute('class', 'carte-svg');
    svg.setAttribute('role', 'group');
    svg.setAttribute('aria-label', 'Carte des 19 communes');
    Object.keys(T).forEach(function (nom) {
      var p = document.createElementNS(ns, 'path');
      p.setAttribute('d', T[nom]);
      p.setAttribute('class', 'commune' + ((LIEUX[nom] || []).length ? ' a-services' : ''));
      p.setAttribute('tabindex', '0');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-label', nom);
      p.dataset.nom = nom;
      var t = document.createElementNS(ns, 'title'); t.textContent = nom; p.appendChild(t);
      svg.appendChild(p);
    });
    box.appendChild(svg);
    function choisir(nom) {
      svg.querySelectorAll('.commune').forEach(function (x) { x.classList.toggle('active', x.dataset.nom === nom); });
      zone.querySelectorAll('[data-commune]').forEach(function (x) { x.classList.toggle('active', x.dataset.commune === nom); });
      if (sortie) sortie.innerHTML = fiche(nom);
      var sel = zone.querySelector('select[data-choix]'); if (sel && sel.value !== nom) sel.value = nom;
    }
    svg.addEventListener('mouseover', function (e) { if (e.target.dataset && e.target.dataset.nom) choisir(e.target.dataset.nom); });
    svg.addEventListener('focusin', function (e) { if (e.target.dataset && e.target.dataset.nom) choisir(e.target.dataset.nom); });
    svg.addEventListener('click', function (e) { if (e.target.dataset && e.target.dataset.nom) choisir(e.target.dataset.nom); });
    zone.querySelectorAll('[data-commune]').forEach(function (li) {
      li.addEventListener('mouseenter', function () { choisir(li.dataset.commune); });
      li.addEventListener('focusin', function () { choisir(li.dataset.commune); });
    });
    var sel = zone.querySelector('select[data-choix]');
    if (sel) sel.addEventListener('change', function () { if (sel.value) choisir(sel.value); });
    var depart = box.getAttribute('data-carte');
    if (depart) choisir(depart);
  });

  /* Apparition au défilement */
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !params.has('static') && !reduit) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    if (params.has('static')) document.querySelectorAll('img[loading]').forEach(function (i) { i.loading = 'eager'; });
    document.querySelectorAll('.reveal').forEach(function (el) { el.style.transition = 'none'; el.classList.add('in'); });
  }

  /* Menu mobile */
  var burger = document.querySelector('.burger'); var nav = document.querySelector('.nav');
  if (burger && nav) burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o ? 'true' : 'false'); });

  /* Taille du texte et contraste (maquette Guichet) */
  var html = document.documentElement;
  document.querySelectorAll('[data-taille]').forEach(function (b) {
    b.addEventListener('click', function () { var v = b.getAttribute('data-taille'); html.classList.remove('t-plus', 't-plusplus'); if (v !== 'normal') html.classList.add(v); });
  });
  document.querySelectorAll('[data-contraste]').forEach(function (b) {
    b.setAttribute('aria-pressed', html.classList.contains('contraste') ? 'true' : 'false');
    b.addEventListener('click', function () { var on = html.classList.toggle('contraste'); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  });

  /* Recherche de démonstration : filtre les raccourcis */
  document.querySelectorAll('[data-recherche]').forEach(function (form) {
    var input = form.querySelector('input');
    var cible = document.querySelector(form.getAttribute('data-recherche'));
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    if (!input || !cible) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      cible.querySelectorAll('[data-mots]').forEach(function (el) {
        var m = (el.getAttribute('data-mots') + ' ' + el.textContent).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        el.classList.toggle('masque', q.length > 1 && m.indexOf(q) === -1);
      });
    });
  });
})();
