/**
 * ASBL La Renaissance — Script principal (camelCase français)
 * Comportements : liens login, formulaires connexion/inscription, sidebar, panneaux notif/profil,
 * modales (archiver, déconnexion, inscriptions, paiements, classes), calendrier.
 * Tag *ANIMATION* = sections avec transitions CSS.
 */
(function () {
  'use strict';

  // ========== Helpers modales (allège le code répétitif) ==========
  /** Ouvre une modale : retire hidden, aria-modal true, bloque le scroll body */
  function ouvrirModale(modale, avecOverflow) {
    if (!modale) return;
    modale.removeAttribute('hidden');
    modale.setAttribute('aria-modal', 'true');
    if (avecOverflow) document.body.style.overflow = 'hidden';
  }
  /** Ferme une modale : hidden, aria-modal false, rétablit le scroll */
  function fermerModale(modale, reinit) {
    if (!modale) return;
    modale.setAttribute('hidden', '');
    modale.setAttribute('aria-modal', 'false');
    document.body.style.overflow = '';
    if (typeof reinit === 'function') reinit();
  }
  /** Attache fermeture sur annuler + backdrop */
  function attacherFermeture(modale, boutonAnnuler, fondModale, reinit) {
    if (boutonAnnuler) boutonAnnuler.addEventListener('click', function () { fermerModale(modale, reinit); });
    if (fondModale) fondModale.addEventListener('click', function () { fermerModale(modale, reinit); });
  }

  // ========== Connexion ==========
  /** Redirige les boutons « Mon Profil » vers #login */
  function initLoginLinks() {
    ['btn-mon-profil', 'btn-mon-profil-hero', 'btn-mon-profil-login-section'].forEach(function (id) {
      var el = document.getElementById(id);
      var href = el && el.getAttribute('href');
      if (el && (href === 'index.php?page=login' || href === 'login.php')) el.setAttribute('href', '#login');
    });
  }

  /** Validation formulaire connexion (email + mot de passe 7 car. min) → redirection dashboard */
  function initLoginForm() {
    var form = document.getElementById('form-login');
    if (!form) return;
    var groupeEmail = document.getElementById('login-email-group');
    var groupeMdp = document.getElementById('login-password-group');
    var errEmail = document.getElementById('login-email-error');
    var errMdp = document.getElementById('login-password-error');
    var champEmail = document.getElementById('login-email');
    var champMdp = document.getElementById('login-password');

    function effacerErreurs() {
      [groupeEmail, groupeMdp].forEach(function (g) { if (g) g.classList.remove('has-error'); });
      [errEmail, errMdp].forEach(function (e) { if (e) e.textContent = ''; });
    }
    function erreur(groupe, elErr, msg) {
      if (groupe) groupe.classList.add('has-error');
      if (elErr) elErr.textContent = msg;
    }
    function emailValide(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      effacerErreurs();
      var email = (champEmail && champEmail.value.trim()) || '';
      var mdp = (champMdp && champMdp.value) || '';
      var ok = true;
      if (!email) { erreur(groupeEmail, errEmail, 'L\'email est requis.'); ok = false; }
      else if (!emailValide(email)) { erreur(groupeEmail, errEmail, 'Veuillez entrer une adresse mail valide.'); ok = false; }
      if (!mdp) { erreur(groupeMdp, errMdp, 'Le mot de passe est requis.'); ok = false; }
      else if (mdp.length < 7) { erreur(groupeMdp, errMdp, 'Le mot de passe doit contenir au moins 7 caractères.'); ok = false; }
      if (ok) window.location.href = 'index.php?page=membre/dashboard';
    });
  }

  // ========== *ANIMATION* Sidebar ==========
  /** Clic hamburger → toggle classe layout-membre--sidebar-collapsed */
  function initSidebarToggle() {
    var layout = document.querySelector('.layout-membre');
    var btn = document.querySelector('.sidebar-toggle-hamburger');
    if (layout && btn) btn.addEventListener('click', function () { layout.classList.toggle('layout-membre--sidebar-collapsed'); });
  }

  // ========== *ANIMATION* Panneaux notif / user ==========
  /** Cloche : bascule panneau notif, ferme panneau user, clic extérieur ferme, localStorage pour « lu » */
  function initNotifications() {
    var btnNotif = document.querySelector('.header-notif-btn');
    var panneauNotif = document.getElementById('header-notif-panel');
    var btnUser = document.querySelector('.header-user-btn');
    var panneauUser = document.getElementById('header-user-panel');
    var cle = 'larenaissance-notif-read';
    if (!btnNotif || !panneauNotif) return;
    if (localStorage.getItem(cle) !== 'true') btnNotif.setAttribute('data-has-notif', 'true');
    btnNotif.addEventListener('click', function () {
      panneauNotif.classList.toggle('is-open');
      btnNotif.setAttribute('aria-expanded', panneauNotif.classList.contains('is-open'));
      if (panneauNotif.classList.contains('is-open')) {
        localStorage.setItem(cle, 'true');
        btnNotif.setAttribute('data-has-notif', 'false');
        if (panneauUser && panneauUser.classList.contains('is-open')) {
          panneauUser.classList.remove('is-open');
          if (btnUser) btnUser.setAttribute('aria-expanded', 'false');
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (!btnNotif.contains(e.target) && !panneauNotif.contains(e.target)) {
        panneauNotif.classList.remove('is-open');
        btnNotif.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /** Avatar/user : bascule panneau profil, ferme panneau notif si ouvert, clic extérieur ferme */
  function initUserPanel() {
    var btn = document.querySelector('.header-user-btn');
    var panneau = document.getElementById('header-user-panel');
    var panneauNotif = document.getElementById('header-notif-panel');
    var btnNotif = document.querySelector('.header-notif-btn');
    if (!btn || !panneau) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      panneau.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', panneau.classList.contains('is-open'));
      if (panneau.classList.contains('is-open') && panneauNotif && panneauNotif.classList.contains('is-open')) {
        panneauNotif.classList.remove('is-open');
        if (btnNotif) btnNotif.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !panneau.contains(e.target)) {
        panneau.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========== *ANIMATION* Modale archiver commentaire ==========
  /** Clic « Archiver » sur une annonce → modale confirmation ; confirmer = supprime la carte */
  function initArchiveComment() {
    var modale = document.getElementById('modal-archiver');
    if (!modale) return;
    var carteAArchiver = null;
    var btnAnnuler = modale.querySelector('.modal-btn-cancel');
    var btnConfirmer = modale.querySelector('.modal-btn-confirm');
    var fond = modale.querySelector('.modal-backdrop');

    document.querySelectorAll('.link-archiver').forEach(function (lien) {
      lien.addEventListener('click', function (e) {
        e.preventDefault();
        var carte = this.closest('.annonce-card');
        if (carte && modale) { carteAArchiver = carte; modale.removeAttribute('hidden'); }
        else if (carte && confirm('Archiver ce commentaire ?')) carte.remove();
      });
    });
    if (btnAnnuler) btnAnnuler.addEventListener('click', function () { carteAArchiver = null; modale.setAttribute('hidden', ''); });
    if (btnConfirmer) btnConfirmer.addEventListener('click', function () { if (carteAArchiver) carteAArchiver.remove(); carteAArchiver = null; modale.setAttribute('hidden', ''); });
    if (fond) fond.addEventListener('click', function () { carteAArchiver = null; modale.setAttribute('hidden', ''); });
  }

  // ========== Calendrier ==========
  /** Grille du mois courant, week-ends et jours avec événement (factice), boutons prev/next */
  function initCalendrier() {
    var section = document.getElementById('calendrier-section');
    var titre = document.getElementById('calendrier-month-year');
    var grille = document.getElementById('calendrier-grid');
    var btnPrev = section && section.querySelector('.calendrier-nav--prev');
    var btnNext = section && section.querySelector('.calendrier-nav--next');
    if (!section || !titre || !grille) return;

    var MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    var dateVue = new Date();
    dateVue.setDate(1);
    /** Jours avec événement factice (même liste pour tous les mois) */
    var joursAvecEvent = [18, 20, 22];

    function afficher() {
      var an = dateVue.getFullYear();
      var mois = dateVue.getMonth();
      var premier = new Date(an, mois, 1);
      var dernier = new Date(an, mois + 1, 0);
      var nJour = dernier.getDate();
      var debutSem = premier.getDay();
      debutSem = debutSem === 0 ? 6 : debutSem - 1;

      titre.textContent = MOIS[mois] + ' ' + an;
      grille.setAttribute('aria-label', 'Calendrier ' + MOIS[mois] + ' ' + an);

      var html = '';
      JOURS.forEach(function (j) { html += '<div class="calendrier-weekday">' + j + '</div>'; });
      for (var i = 0; i < debutSem; i++) html += '<div class="calendrier-day calendrier-day--empty"></div>';
      for (i = 1; i <= nJour; i++) {
        var d = new Date(an, mois, i).getDay();
        var weekEnd = d === 0 || d === 6;
        var hasEvent = joursAvecEvent.indexOf(i) !== -1;
        var cls = 'calendrier-day' + (weekEnd ? ' calendrier-day--weekend' : '') + (hasEvent ? ' calendrier-day--event' : '');
        var dot = hasEvent ? '<span class="calendrier-day-dot" title="Cours / activité"></span>' : '';
        html += '<div class="' + cls + '"><span class="calendrier-day-num">' + i + '</span>' + dot + '</div>';
      }
      var reste = (debutSem + nJour) % 7;
      if (reste) for (i = 0; i < 7 - reste; i++) html += '<div class="calendrier-day calendrier-day--empty"></div>';
      grille.innerHTML = html;
    }

    afficher();
    if (btnPrev) btnPrev.addEventListener('click', function () { dateVue.setMonth(dateVue.getMonth() - 1); dateVue.setDate(1); afficher(); });
    if (btnNext) btnNext.addEventListener('click', function () { dateVue.setMonth(dateVue.getMonth() + 1); dateVue.setDate(1); afficher(); });
  }

  // ========== *ANIMATION* Modales Gestion > Membres (commentaire + enfants) ==========
  /** Modale commentaire membre : ouvre avec nom, annuler/enregistrer/backdrop ferment */
  function initMembresCommentaire() {
    var modale = document.getElementById('modal-commentaire-membre');
    if (!modale) return;
    var titre = document.getElementById('modal-commentaire-title');
    var zoneTexte = modale.querySelector('.modal-commentaire-textarea');
    var btnSave = modale.querySelector('.modal-commentaire-save');
    var btnCancel = modale.querySelector('.modal-commentaire-cancel');
    var fond = modale.querySelector('.modal-backdrop');

    function ouvrir(nom) {
      if (titre && nom) titre.textContent = 'Commentaire pour ' + nom;
      if (zoneTexte) zoneTexte.value = '';
      modale.removeAttribute('hidden');
    }
    document.querySelectorAll('.membre-action-commentaire').forEach(function (b) {
      b.addEventListener('click', function () { ouvrir(this.getAttribute('data-membre-nom') || ''); });
    });
    [btnCancel, btnSave, fond].forEach(function (el) {
      if (el) el.addEventListener('click', function () { modale.setAttribute('hidden', ''); });
    });
  }

  /** Modale liste enfants d'un membre : data-membre-enfants (séparés par |) */
  function initMembresEnfants() {
    var modale = document.getElementById('modal-enfants-membre');
    if (!modale) return;
    var titre = document.getElementById('modal-enfants-title');
    var liste = modale.querySelector('.modal-enfants-list');
    var fond = modale.querySelector('.modal-backdrop');
    var btnClose = modale.querySelector('.modal-enfants-close');

    function ouvrir(nom, chaine) {
      if (titre && nom) titre.textContent = 'Enfants de ' + nom;
      if (liste) {
        liste.innerHTML = '';
        if (chaine && chaine.trim() !== '-' && chaine.trim() !== '') {
          chaine.split('|').forEach(function (item) { var li = document.createElement('li'); li.textContent = item.trim(); liste.appendChild(li); });
        } else {
          var li = document.createElement('li');
          li.textContent = 'Aucun enfant renseigné.';
          liste.appendChild(li);
        }
      }
      modale.removeAttribute('hidden');
    }
    document.querySelectorAll('.membre-action-enfants').forEach(function (b) {
      b.addEventListener('click', function () { ouvrir(this.getAttribute('data-membre-nom') || '', this.getAttribute('data-membre-enfants') || ''); });
    });
    [btnClose, fond].forEach(function (el) { if (el) el.addEventListener('click', function () { modale.setAttribute('hidden', ''); }); });
  }

  // ========== Inscription ==========
  /** Bouton « Ajouter un enfant » : clone le premier .enfant-block, réindexe id/name/for, vide les champs */
  function initInscriptionAddChild() {
    var btn = document.getElementById('btn-ajouter-enfant');
    var liste = document.getElementById('enfants-list');
    if (!btn || !liste) return;
    btn.addEventListener('click', function () {
      var blocs = liste.querySelectorAll('.enfant-block');
      var n = blocs.length;
      var premier = liste.querySelector('.enfant-block');
      if (!premier) return;
      var copie = premier.cloneNode(true);
      copie.setAttribute('data-enfant-index', n);
      copie.querySelector('.enfant-title').textContent = 'Enfant ' + (n + 1);
      copie.querySelectorAll('input, select').forEach(function (c) {
        if (c.id) c.id = c.id.replace(/\d+/, n);
        if (c.name) c.name = c.name.replace(/\d+/, n);
        c.value = '';
      });
      copie.querySelectorAll('label[for]').forEach(function (l) {
        var f = l.getAttribute('for');
        if (f) l.setAttribute('for', f.replace(/\d+/, n));
      });
      liste.appendChild(copie);
    });
  }

  /** Validation formulaire inscription : champs requis, email valide, mots de passe identiques, ROI coché → redirection dashboard */
  function initInscriptionForm() {
    var form = document.getElementById('form-inscription');
    if (!form) return;

    function emailValide(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }
    function effacer() {
      form.querySelectorAll('.form-group.has-error, .form-group-checkbox.has-error').forEach(function (el) { el.classList.remove('has-error'); });
      form.querySelectorAll('.error-message').forEach(function (el) { el.textContent = ''; });
    }
    function err(grp, errEl, msg) {
      var g = document.getElementById(grp);
      var e = document.getElementById(errEl);
      if (g) g.classList.add('has-error');
      if (e) e.textContent = msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      effacer();
      var ok = true;
      var p = function (id) { return document.getElementById(id); };

      if (!p('parent-nom') || !p('parent-nom').value.trim()) { err('parent-nom-group', 'parent-nom-error', 'Le nom est requis.'); ok = false; }
      if (!p('parent-prenom') || !p('parent-prenom').value.trim()) { err('parent-prenom-group', 'parent-prenom-error', 'Le prénom est requis.'); ok = false; }
      if (!p('parent-dob') || !p('parent-dob').value) { err('parent-dob-group', 'parent-dob-error', 'La date de naissance est requise.'); ok = false; }
      if (!p('parent-email') || !p('parent-email').value.trim()) { err('parent-email-group', 'parent-email-error', 'L\'email est requis.'); ok = false; }
      else if (!emailValide(p('parent-email').value.trim())) { err('parent-email-group', 'parent-email-error', 'Veuillez entrer une adresse mail valide.'); ok = false; }
      if (p('parent-email-confirm') && p('parent-email') && p('parent-email-confirm').value.trim() !== p('parent-email').value.trim()) { err('parent-email-confirm-group', 'parent-email-confirm-error', 'Les adresses email ne correspondent pas.'); ok = false; }
      if (!p('parent-password') || !p('parent-password').value) { err('parent-password-group', 'parent-password-error', 'Le mot de passe est requis.'); ok = false; }
      else if (p('parent-password').value.length < 7) { err('parent-password-group', 'parent-password-error', 'Le mot de passe doit contenir au moins 7 caractères.'); ok = false; }
      if (p('parent-password-confirm') && p('parent-password') && p('parent-password-confirm').value !== p('parent-password').value) { err('parent-password-confirm-group', 'parent-password-confirm-error', 'Les mots de passe ne correspondent pas.'); ok = false; }
      if (!p('parent-phone') || !p('parent-phone').value.trim()) { err('parent-phone-group', 'parent-phone-error', 'Le numéro de téléphone est requis.'); ok = false; }
      if (!p('adresse-rue') || !p('adresse-rue').value.trim()) { err('adresse-rue-group', 'adresse-rue-error', 'La rue est requise.'); ok = false; }
      if (!p('adresse-numero') || !p('adresse-numero').value.trim()) { err('adresse-numero-group', 'adresse-numero-error', 'Le numéro est requis.'); ok = false; }
      if (!p('adresse-cp') || !p('adresse-cp').value.trim()) { err('adresse-cp-group', 'adresse-cp-error', 'Le code postal est requis.'); ok = false; }
      if (!p('adresse-localite') || !p('adresse-localite').value.trim()) { err('adresse-localite-group', 'adresse-localite-error', 'La localité est requise.'); ok = false; }
      if (!p('pref-com') || !p('pref-com').value) { err('pref-com-group', 'pref-com-error', 'Veuillez choisir une préférence de communication.'); ok = false; }
      if (!p('accept-roi') || !p('accept-roi').checked) { err('roi-group', 'roi-error', 'Vous devez accepter le règlement d\'ordre intérieur.'); ok = false; }

      if (ok) window.location.href = 'index.php?page=membre/dashboard';
    });
  }

  // ========== *ANIMATION* Modale déconnexion ==========
  /** Lien déconnexion → modale confirmation ; confirmer = redirection vers href du lien */
  function initDeconnexionConfirm() {
    var modale = document.getElementById('modal-deconnexion');
    if (!modale) return;
    var lien = document.querySelector('.link-deconnexion');
    var url = (lien && lien.getAttribute('href')) || 'index.php?page=login';
    if (lien) lien.addEventListener('click', function (e) { e.preventDefault(); modale.removeAttribute('hidden'); });
    var btnAnnuler = modale.querySelector('.modal-btn-cancel');
    var btnConfirmer = modale.querySelector('.modal-btn-confirm');
    var fond = modale.querySelector('.modal-backdrop');
    if (btnAnnuler) btnAnnuler.addEventListener('click', function () { modale.setAttribute('hidden', ''); });
    if (btnConfirmer) btnConfirmer.addEventListener('click', function () { window.location.href = url; });
    if (fond) fond.addEventListener('click', function () { modale.setAttribute('hidden', ''); });
  }

  // ========== *ANIMATION* Modales Gestion > Inscriptions (accepter / refuser) ==========
  /** Deux modales : Accepter / Refuser inscription ; confirmer ferme (logique serveur à brancher) */
  function initInscriptionsConfirm() {
    var modaleAcc = document.getElementById('modal-accepter-inscription');
    var modaleRef = document.getElementById('modal-refuser-inscription');
    if (!modaleAcc || !modaleRef) return;

    var idInscr = null;
    function ouvrirAcc(eleve, id) { idInscr = id; var el = document.getElementById('modal-accepter-eleve'); if (el) el.textContent = eleve; modaleAcc.removeAttribute('hidden'); }
    function ouvrirRef(eleve, id) { idInscr = id; var el = document.getElementById('modal-refuser-eleve'); if (el) el.textContent = eleve; modaleRef.removeAttribute('hidden'); }
    function fermerAcc() { modaleAcc.setAttribute('hidden', ''); idInscr = null; }
    function fermerRef() { modaleRef.setAttribute('hidden', ''); idInscr = null; }

    document.querySelectorAll('.inscription-action-accepter').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); ouvrirAcc(this.getAttribute('data-inscription-eleve') || 'cette inscription', this.getAttribute('data-inscription-id')); });
    });
    document.querySelectorAll('.inscription-action-refuser').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); ouvrirRef(this.getAttribute('data-inscription-eleve') || 'cette inscription', this.getAttribute('data-inscription-id')); });
    });

    if (modaleAcc.querySelector('.modal-btn-cancel')) modaleAcc.querySelector('.modal-btn-cancel').addEventListener('click', fermerAcc);
    if (modaleAcc.querySelector('.modal-backdrop')) modaleAcc.querySelector('.modal-backdrop').addEventListener('click', fermerAcc);
    if (modaleAcc.querySelector('.modal-btn-confirm')) modaleAcc.querySelector('.modal-btn-confirm').addEventListener('click', fermerAcc);

    if (modaleRef.querySelector('.modal-btn-cancel')) modaleRef.querySelector('.modal-btn-cancel').addEventListener('click', fermerRef);
    if (modaleRef.querySelector('.modal-backdrop')) modaleRef.querySelector('.modal-backdrop').addEventListener('click', fermerRef);
    if (modaleRef.querySelector('.modal-btn-confirm')) modaleRef.querySelector('.modal-btn-confirm').addEventListener('click', fermerRef);
  }

  // ========== *ANIMATION* Modale Gestion > Paiements (archiver) ==========
  /** Bouton Archiver → modale ; annuler/backdrop/confirmer ferment (archivage à brancher côté serveur) */
  function initArchiverPaiements() {
    var btn = document.getElementById('btn-archiver-paiements');
    var modale = document.getElementById('modal-archiver-paiements');
    if (!modale) return;
    function ouvrir() { modale.removeAttribute('hidden'); modale.setAttribute('aria-modal', 'true'); document.body.style.overflow = 'hidden'; }
    function fermer() { modale.setAttribute('hidden', ''); modale.setAttribute('aria-modal', 'false'); document.body.style.overflow = ''; }
    if (btn) btn.addEventListener('click', ouvrir);
    attacherFermeture(modale, modale.querySelector('.modal-btn-cancel'), modale.querySelector('.modal-backdrop'));
    var btnConf = modale.querySelector('.modal-btn-confirm');
    if (btnConf) btnConf.addEventListener('click', fermer);
  }

  // ========== *ANIMATION* Modales Gestion > Classes (voir membres, supprimer, créer) ==========
  /** Modale « Voir membres » : liste factice ; Modale « Supprimer » : nom + id ; Modale « Créer » : formulaire */
  function initClassesActions() {
    var modaleMembres = document.getElementById('modal-classe-membres');
    var modaleSuppr = document.getElementById('modal-supprimer-classe');
    var listeMembres = modaleMembres && document.getElementById('modal-classe-membres-list');
    var titreMembres = modaleMembres && document.getElementById('modal-classe-membres-title');
    var libelleSuppr = modaleSuppr && document.getElementById('modal-supprimer-classe-nom');
    var idASuppr = null;

    function ouvrirMembres(nomClasse, membres) {
      if (!modaleMembres || !listeMembres || !titreMembres) return;
      titreMembres.textContent = 'Membres de ' + nomClasse;
      listeMembres.innerHTML = '';
      (membres && membres.length ? membres : ['Aucun membre dans cette classe.']).forEach(function (m) {
        var li = document.createElement('li');
        li.textContent = m;
        listeMembres.appendChild(li);
      });
      ouvrirModale(modaleMembres, true);
    }
    function fermerMembres() { fermerModale(modaleMembres); }

    function ouvrirSuppr(nom, id) {
      if (!modaleSuppr || !libelleSuppr) return;
      libelleSuppr.textContent = nom;
      idASuppr = id;
      ouvrirModale(modaleSuppr, true);
    }
    function fermerSuppr() { idASuppr = null; fermerModale(modaleSuppr); }

    document.querySelectorAll('.classe-action-membres').forEach(function (b) {
      b.addEventListener('click', function () {
        var carte = b.closest('.classe-gestion-card');
        var nom = carte ? carte.querySelector('.classe-gestion-card__title').textContent : 'la classe';
        ouvrirMembres(nom, ['Lucas Dupont', 'Emma Martin', 'Sophie Leroy']);
      });
    });
    document.querySelectorAll('.classe-action-delete').forEach(function (b) {
      b.addEventListener('click', function () {
        var carte = b.closest('.classe-gestion-card');
        ouvrirSuppr(carte ? carte.querySelector('.classe-gestion-card__title').textContent : 'cette classe', carte ? carte.getAttribute('data-classe-id') : '1');
      });
    });

    attacherFermeture(modaleMembres, modaleMembres && modaleMembres.querySelector('.modal-btn-cancel'), modaleMembres && modaleMembres.querySelector('.modal-backdrop'), fermerMembres);
    attacherFermeture(modaleSuppr, modaleSuppr && modaleSuppr.querySelector('.modal-btn-cancel'), modaleSuppr && modaleSuppr.querySelector('.modal-backdrop'), fermerSuppr);
    var btnConfSuppr = modaleSuppr && modaleSuppr.querySelector('.modal-btn-confirm');
    if (btnConfSuppr) btnConfSuppr.addEventListener('click', fermerSuppr);
  }

  /** Modale « Créer une classe » : formulaire ; confirmer après validation HTML5 → ferme + reset */
  function initCreerClasse() {
    var btnCreer = document.querySelector('.classes-btn-create');
    var modale = document.getElementById('modal-creer-classe');
    var form = modale && document.getElementById('form-creer-classe');
    if (!modale) return;

    function ouvrir() { ouvrirModale(modale, true); }
    function fermer() { if (form) form.reset(); fermerModale(modale); }

    if (btnCreer) btnCreer.addEventListener('click', ouvrir);
    attacherFermeture(modale, modale.querySelector('.modal-btn-cancel'), modale.querySelector('.modal-backdrop'), fermer);
    var btnConf = modale.querySelector('.modal-btn-confirm');
    if (btnConf && form) btnConf.addEventListener('click', function (e) {
      e.preventDefault();
      if (form.checkValidity()) fermer();
      else form.reportValidity();
    });
  }

  // ========== Point d'entrée ==========
  /** Lance toutes les init au chargement du DOM */
  function init() {
    initLoginLinks();
    initLoginForm();
    initInscriptionAddChild();
    initInscriptionForm();
    initSidebarToggle();
    initNotifications();
    initUserPanel();
    initArchiveComment();
    initCalendrier();
    initDeconnexionConfirm();
    initMembresCommentaire();
    initMembresEnfants();
    initInscriptionsConfirm();
    initArchiverPaiements();
    initClassesActions();
    initCreerClasse();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
