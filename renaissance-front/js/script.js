/* ASBL La Renaissance - Script principal */

(function () {
  'use strict';

  // Redirection "Mon Profil" vers #login
  function initLoginLinks() {
    var ids = ['btn-mon-profil', 'btn-mon-profil-hero', 'btn-mon-profil-login-section'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getAttribute('href') === 'login.html') {
        el.setAttribute('href', '#login');
      }
    });
  }

  // Formulaire de connexion (validation + redirection maquette)
  function initLoginForm() {
    var form = document.getElementById('form-login');
    if (!form) return;
    var emailGroup = document.getElementById('login-email-group');
    var passwordGroup = document.getElementById('login-password-group');
    var emailError = document.getElementById('login-email-error');
    var passwordError = document.getElementById('login-password-error');
    var emailInput = document.getElementById('login-email');
    var passwordInput = document.getElementById('login-password');

    function clearErrors() {
      if (emailGroup) emailGroup.classList.remove('has-error');
      if (passwordGroup) passwordGroup.classList.remove('has-error');
      if (emailError) emailError.textContent = '';
      if (passwordError) passwordError.textContent = '';
    }
    function showError(group, errorEl, message) {
      if (group) group.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    }

    function isValidEmail(str) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(str);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var email = emailInput ? emailInput.value.trim() : '';
      var password = passwordInput ? passwordInput.value : '';
      var valid = true;
      if (!email) {
        showError(emailGroup, emailError, 'L\'email est requis.');
        valid = false;
      } else if (!isValidEmail(email)) {
        showError(emailGroup, emailError, 'Veuillez entrer une adresse mail valide.');
        valid = false;
      }
      if (!password) {
        showError(passwordGroup, passwordError, 'Le mot de passe est requis.');
        valid = false;
      } else if (password.length < 7) {
        showError(passwordGroup, passwordError, 'Le mot de passe doit contenir au moins 7 caractères.');
        valid = false;
      }
      if (valid) {
        window.location.href = 'membre/dashboard.html';
      }
    });
  }

  // Sidebar membre : toggle collapsed
  function initSidebarToggle() {
    var layout = document.querySelector('.layout-membre');
    var btn = document.querySelector('.sidebar-toggle-hamburger');
    if (!layout || !btn) return;
    btn.addEventListener('click', function () {
      layout.classList.toggle('layout-membre--sidebar-collapsed');
    });
  }

  // Notifications : panneau + marquer lu
  function initNotifications() {
    var btn = document.querySelector('.header-notif-btn');
    var panel = document.getElementById('header-notif-panel');
    var userBtn = document.querySelector('.header-user-btn');
    var userPanel = document.getElementById('header-user-panel');
    var key = 'larenaissance-notif-read';
    if (btn && panel) {
      var read = localStorage.getItem(key) === 'true';
      if (!read) btn.setAttribute('data-has-notif', 'true');
      btn.addEventListener('click', function () {
        panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', panel.classList.contains('is-open'));
        if (panel.classList.contains('is-open')) {
          localStorage.setItem(key, 'true');
          btn.setAttribute('data-has-notif', 'false');
          // Fermer le panneau utilisateur si ouvert
          if (userPanel && userPanel.classList.contains('is-open')) {
            userPanel.classList.remove('is-open');
            if (userBtn) userBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });
      document.addEventListener('click', function (e) {
        if (!btn.contains(e.target) && !panel.contains(e.target)) {
          panel.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Profil utilisateur : panneau
  function initUserPanel() {
    var btn = document.querySelector('.header-user-btn');
    var panel = document.getElementById('header-user-panel');
    var notifBtn = document.querySelector('.header-notif-btn');
    var notifPanel = document.getElementById('header-notif-panel');
    if (btn && panel) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', panel.classList.contains('is-open'));
        // Fermer le panneau de notifications si ouvert
        if (panel.classList.contains('is-open') && notifPanel && notifPanel.classList.contains('is-open')) {
          notifPanel.classList.remove('is-open');
          if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
        }
      });
      document.addEventListener('click', function (e) {
        if (!btn.contains(e.target) && !panel.contains(e.target)) {
          panel.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Archiver commentaire (modale)
  function initArchiveComment() {
    var modal = document.getElementById('modal-archiver');
    var btnCancel = modal ? modal.querySelector('.modal-btn-cancel') : null;
    var btnConfirm = modal ? modal.querySelector('.modal-btn-confirm') : null;
    var backdrop = modal ? modal.querySelector('.modal-backdrop') : null;
    var cardToArchive = null;

    function openModal(card) {
      cardToArchive = card;
      if (modal) {
        modal.removeAttribute('hidden');
      }
    }
    function closeModal() {
      cardToArchive = null;
      if (modal) {
        modal.setAttribute('hidden', '');
      }
    }

    document.querySelectorAll('.link-archiver').forEach(function (ctrl) {
      ctrl.addEventListener('click', function (e) {
        e.preventDefault();
        var card = this.closest('.annonce-card');
        if (card && modal) {
          openModal(card);
        } else if (card && !modal) {
          if (confirm('Archiver ce commentaire ?')) card.remove();
        }
      });
    });

    if (btnCancel) {
      btnCancel.addEventListener('click', closeModal);
    }
    if (btnConfirm) {
      btnConfirm.addEventListener('click', function () {
        if (cardToArchive) {
          cardToArchive.remove();
        }
        closeModal();
      });
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeModal);
    }
  }

  // Calendrier : affichage du mois/année réels, grille générée en JS
  function initCalendrier() {
    var section = document.getElementById('calendrier-section');
    var titleEl = document.getElementById('calendrier-month-year');
    var gridEl = document.getElementById('calendrier-grid');
    var btnPrev = section ? section.querySelector('.calendrier-nav--prev') : null;
    var btnNext = section ? section.querySelector('.calendrier-nav--next') : null;
    if (!section || !titleEl || !gridEl) return;

    var MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    var viewDate = new Date();
    viewDate.setDate(1);

    function getDaysWithEvents(year, month) {
      var events = { 1: [18, 20, 22], 2: [18, 20, 22], 3: [18, 20, 22], 4: [18, 20, 22], 5: [18, 20, 22], 6: [18, 20, 22], 7: [18, 20, 22], 8: [18, 20, 22], 9: [18, 20, 22], 10: [18, 20, 22], 11: [18, 20, 22], 12: [18, 20, 22] };
      var m = month + 1;
      return events[m] || [];
    }

    function render() {
      var year = viewDate.getFullYear();
      var month = viewDate.getMonth();
      var first = new Date(year, month, 1);
      var last = new Date(year, month + 1, 0);
      var lastDay = last.getDate();
      var startWeekday = first.getDay();
      startWeekday = startWeekday === 0 ? 6 : startWeekday - 1;
      titleEl.textContent = MONTHS[month] + ' ' + year;
      gridEl.setAttribute('aria-label', 'Calendrier ' + MONTHS[month] + ' ' + year);

      var eventDays = getDaysWithEvents(year, month);
      var html = '';
      WEEKDAYS.forEach(function (d) { html += '<div class="calendrier-weekday">' + d + '</div>'; });
      var i;
      for (i = 0; i < startWeekday; i++) {
        html += '<div class="calendrier-day calendrier-day--empty"></div>';
      }
      for (i = 1; i <= lastDay; i++) {
        var isWeekend = (new Date(year, month, i).getDay() === 0 || new Date(year, month, i).getDay() === 6);
        var hasEvent = eventDays.indexOf(i) !== -1;
        var classes = 'calendrier-day';
        if (isWeekend) classes += ' calendrier-day--weekend';
        if (hasEvent) classes += ' calendrier-day--event';
        var dot = hasEvent ? '<span class="calendrier-day-dot" title="Cours / activité"></span>' : '';
        html += '<div class="' + classes + '"><span class="calendrier-day-num">' + i + '</span>' + dot + '</div>';
      }
      var total = startWeekday + lastDay;
      var rest = total % 7;
      if (rest) { for (i = 0; i < 7 - rest; i++) { html += '<div class="calendrier-day calendrier-day--empty"></div>'; } }
      gridEl.innerHTML = html;
    }

    viewDate.setDate(1);
    render();
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        viewDate.setMonth(viewDate.getMonth() - 1);
        viewDate.setDate(1);
        render();
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        viewDate.setMonth(viewDate.getMonth() + 1);
        viewDate.setDate(1);
        render();
      });
    }
  }

  // Page Gestion > Membres : modale commentaire
  function initMembresCommentaire() {
    var modal = document.getElementById('modal-commentaire-membre');
    if (!modal) return;

    var titleEl = document.getElementById('modal-commentaire-title');
    var textarea = modal.querySelector('.modal-commentaire-textarea');
    var btnSave = modal.querySelector('.modal-commentaire-save');
    var btnCancel = modal.querySelector('.modal-commentaire-cancel');
    var backdrop = modal.querySelector('.modal-backdrop');

    function openModal(nom) {
      if (titleEl && nom) {
        titleEl.textContent = 'Commentaire pour ' + nom;
      }
      if (textarea) {
        textarea.value = '';
      }
      modal.removeAttribute('hidden');
    }
    function closeModal() {
      modal.setAttribute('hidden', '');
    }

    document.querySelectorAll('.membre-action-commentaire').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nom = this.getAttribute('data-membre-nom') || '';
        openModal(nom);
      });
    });

    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (btnSave) btnSave.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }

  // Page Gestion > Membres : modale enfants
  function initMembresEnfants() {
    var modal = document.getElementById('modal-enfants-membre');
    if (!modal) return;

    var titleEl = document.getElementById('modal-enfants-title');
    var listEl = modal.querySelector('.modal-enfants-list');
    var btnClose = modal.querySelector('.modal-enfants-close');
    var backdrop = modal.querySelector('.modal-backdrop');

    function openModal(nom, enfantsStr) {
      if (titleEl && nom) {
        titleEl.textContent = 'Enfants de ' + nom;
      }
      if (listEl) {
        listEl.innerHTML = '';
        if (enfantsStr && enfantsStr.trim() !== '-' && enfantsStr.trim() !== '') {
          enfantsStr.split('|').forEach(function (item) {
            var li = document.createElement('li');
            li.textContent = item.trim();
            listEl.appendChild(li);
          });
        } else {
          var liEmpty = document.createElement('li');
          liEmpty.textContent = 'Aucun enfant renseigné.';
          listEl.appendChild(liEmpty);
        }
      }
      modal.removeAttribute('hidden');
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
    }

    document.querySelectorAll('.membre-action-enfants').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nom = this.getAttribute('data-membre-nom') || '';
        var enfants = this.getAttribute('data-membre-enfants') || '';
        openModal(nom, enfants);
      });
    });

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }

  function initInscriptionAddChild() {
    var btn = document.getElementById('btn-ajouter-enfant');
    var list = document.getElementById('enfants-list');
    if (!btn || !list) return;
    btn.addEventListener('click', function () {
      var blocks = list.querySelectorAll('.enfant-block');
      var nextIndex = blocks.length;
      var first = list.querySelector('.enfant-block');
      if (!first) return;
      var clone = first.cloneNode(true);
      clone.setAttribute('data-enfant-index', nextIndex);
      clone.querySelector('.enfant-title').textContent = 'Enfant ' + (nextIndex + 1);
      clone.querySelectorAll('input, select').forEach(function (input) {
        var id = input.id;
        var name = input.name;
        if (id) input.id = id.replace(/\d+/, nextIndex);
        if (name) input.name = name.replace(/\d+/, nextIndex);
        input.value = '';
      });
      clone.querySelectorAll('label[for]').forEach(function (label) {
        var forVal = label.getAttribute('for');
        if (forVal) label.setAttribute('for', forVal.replace(/\d+/, nextIndex));
      });
      list.appendChild(clone);
    });
  }

  function initInscriptionForm() {
    var form = document.getElementById('form-inscription');
    if (!form) return;

    function isValidEmail(str) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
    }
    function clearAllErrors() {
      form.querySelectorAll('.form-group.has-error, .form-group-checkbox.has-error').forEach(function (el) {
        el.classList.remove('has-error');
      });
      form.querySelectorAll('.error-message').forEach(function (el) { el.textContent = ''; });
    }
    function showError(groupId, errorId, message) {
      var group = document.getElementById(groupId);
      var errEl = document.getElementById(errorId);
      if (group) group.classList.add('has-error');
      if (errEl) errEl.textContent = message;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors();
      var valid = true;

      var parentNom = document.getElementById('parent-nom');
      var parentPrenom = document.getElementById('parent-prenom');
      var parentDob = document.getElementById('parent-dob');
      var parentEmail = document.getElementById('parent-email');
      var parentEmailConfirm = document.getElementById('parent-email-confirm');
      var parentPassword = document.getElementById('parent-password');
      var parentPasswordConfirm = document.getElementById('parent-password-confirm');
      var parentPhone = document.getElementById('parent-phone');
      var adresseRue = document.getElementById('adresse-rue');
      var adresseNumero = document.getElementById('adresse-numero');
      var adresseCp = document.getElementById('adresse-cp');
      var adresseLocalite = document.getElementById('adresse-localite');
      var prefCom = document.getElementById('pref-com');
      var acceptRoi = document.getElementById('accept-roi');

      if (!parentNom || !parentNom.value.trim()) {
        showError('parent-nom-group', 'parent-nom-error', 'Le nom est requis.');
        valid = false;
      }
      if (!parentPrenom || !parentPrenom.value.trim()) {
        showError('parent-prenom-group', 'parent-prenom-error', 'Le prénom est requis.');
        valid = false;
      }
      if (!parentDob || !parentDob.value) {
        showError('parent-dob-group', 'parent-dob-error', 'La date de naissance est requise.');
        valid = false;
      }
      if (!parentEmail || !parentEmail.value.trim()) {
        showError('parent-email-group', 'parent-email-error', 'L\'email est requis.');
        valid = false;
      } else if (!isValidEmail(parentEmail.value.trim())) {
        showError('parent-email-group', 'parent-email-error', 'Veuillez entrer une adresse mail valide.');
        valid = false;
      }
      if (parentEmailConfirm && parentEmail && parentEmailConfirm.value.trim() !== parentEmail.value.trim()) {
        showError('parent-email-confirm-group', 'parent-email-confirm-error', 'Les adresses email ne correspondent pas.');
        valid = false;
      }
      if (!parentPassword || !parentPassword.value) {
        showError('parent-password-group', 'parent-password-error', 'Le mot de passe est requis.');
        valid = false;
      } else if (parentPassword.value.length < 7) {
        showError('parent-password-group', 'parent-password-error', 'Le mot de passe doit contenir au moins 7 caractères.');
        valid = false;
      }
      if (parentPasswordConfirm && parentPassword && parentPasswordConfirm.value !== parentPassword.value) {
        showError('parent-password-confirm-group', 'parent-password-confirm-error', 'Les mots de passe ne correspondent pas.');
        valid = false;
      }
      if (!parentPhone || !parentPhone.value.trim()) {
        showError('parent-phone-group', 'parent-phone-error', 'Le numéro de téléphone est requis.');
        valid = false;
      }
      if (!adresseRue || !adresseRue.value.trim()) {
        showError('adresse-rue-group', 'adresse-rue-error', 'La rue est requise.');
        valid = false;
      }
      if (!adresseNumero || !adresseNumero.value.trim()) {
        showError('adresse-numero-group', 'adresse-numero-error', 'Le numéro est requis.');
        valid = false;
      }
      if (!adresseCp || !adresseCp.value.trim()) {
        showError('adresse-cp-group', 'adresse-cp-error', 'Le code postal est requis.');
        valid = false;
      }
      if (!adresseLocalite || !adresseLocalite.value.trim()) {
        showError('adresse-localite-group', 'adresse-localite-error', 'La localité est requise.');
        valid = false;
      }
      if (!prefCom || !prefCom.value) {
        showError('pref-com-group', 'pref-com-error', 'Veuillez choisir une préférence de communication.');
        valid = false;
      }
      if (!acceptRoi || !acceptRoi.checked) {
        var roiGroup = document.getElementById('roi-group');
        var roiError = document.getElementById('roi-error');
        if (roiGroup) roiGroup.classList.add('has-error');
        if (roiError) roiError.textContent = 'Vous devez accepter le règlement d\'ordre intérieur.';
        valid = false;
      }

      if (valid) {
        window.location.href = 'membre/dashboard.html';
      }
    });
  }

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

  function initDeconnexionConfirm() {
    var modal = document.getElementById('modal-deconnexion');
    if (!modal) return;
    var link = document.querySelector('.link-deconnexion');
    var btnCancel = modal.querySelector('.modal-btn-cancel');
    var btnConfirm = modal.querySelector('.modal-btn-confirm');
    var backdrop = modal.querySelector('.modal-backdrop');
    var logoutUrl = '../login.html';

    if (link) {
      logoutUrl = link.getAttribute('href') || logoutUrl;
      link.addEventListener('click', function (e) {
        e.preventDefault();
        modal.removeAttribute('hidden');
      });
    }
    function closeModal() {
      modal.setAttribute('hidden', '');
    }
    if (btnCancel) btnCancel.addEventListener('click', closeModal);
    if (btnConfirm) {
      btnConfirm.addEventListener('click', function () {
        window.location.href = logoutUrl;
      });
    }
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }

  // Inscriptions : modales de confirmation (Accepter / Refuser)
  function initInscriptionsConfirm() {
    var modalAccepter = document.getElementById('modal-accepter-inscription');
    var modalRefuser = document.getElementById('modal-refuser-inscription');
    
    if (!modalAccepter || !modalRefuser) return;

    var btnAccepter = modalAccepter.querySelector('.modal-btn-confirm');
    var btnRefuser = modalRefuser.querySelector('.modal-btn-confirm');
    var btnCancelAccepter = modalAccepter.querySelector('.modal-btn-cancel');
    var btnCancelRefuser = modalRefuser.querySelector('.modal-btn-cancel');
    var backdropAccepter = modalAccepter.querySelector('.modal-backdrop');
    var backdropRefuser = modalRefuser.querySelector('.modal-backdrop');
    var eleveAccepter = document.getElementById('modal-accepter-eleve');
    var eleveRefuser = document.getElementById('modal-refuser-eleve');

    var inscriptionId = null;

    function openModalAccepter(eleve, id) {
      inscriptionId = id;
      if (eleveAccepter) eleveAccepter.textContent = eleve;
      modalAccepter.removeAttribute('hidden');
    }

    function openModalRefuser(eleve, id) {
      inscriptionId = id;
      if (eleveRefuser) eleveRefuser.textContent = eleve;
      modalRefuser.removeAttribute('hidden');
    }

    function closeModalAccepter() {
      modalAccepter.setAttribute('hidden', '');
      inscriptionId = null;
    }

    function closeModalRefuser() {
      modalRefuser.setAttribute('hidden', '');
      inscriptionId = null;
    }

    // Boutons Accepter
    document.querySelectorAll('.inscription-action-accepter').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var eleve = this.getAttribute('data-inscription-eleve') || 'cette inscription';
        var id = this.getAttribute('data-inscription-id') || null;
        openModalAccepter(eleve, id);
      });
    });

    // Boutons Refuser
    document.querySelectorAll('.inscription-action-refuser').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        var eleve = this.getAttribute('data-inscription-eleve') || 'cette inscription';
        var id = this.getAttribute('data-inscription-id') || null;
        openModalRefuser(eleve, id);
      });
    });

    // Fermeture modale Accepter
    if (btnCancelAccepter) btnCancelAccepter.addEventListener('click', closeModalAccepter);
    if (backdropAccepter) backdropAccepter.addEventListener('click', closeModalAccepter);
    if (btnAccepter) {
      btnAccepter.addEventListener('click', function() {
        // Ici tu peux ajouter la logique pour accepter l'inscription
        console.log('Accepter inscription ID:', inscriptionId);
        closeModalAccepter();
        // Exemple : mettre à jour le statut de la carte, etc.
      });
    }

    // Fermeture modale Refuser
    if (btnCancelRefuser) btnCancelRefuser.addEventListener('click', closeModalRefuser);
    if (backdropRefuser) backdropRefuser.addEventListener('click', closeModalRefuser);
    if (btnRefuser) {
      btnRefuser.addEventListener('click', function() {
        // Ici tu peux ajouter la logique pour refuser l'inscription
        console.log('Refuser inscription ID:', inscriptionId);
        closeModalRefuser();
        // Exemple : mettre à jour le statut de la carte, etc.
      });
    }
  }

  function initArchiverPaiements() {
    var btnArchiver = document.getElementById('btn-archiver-paiements');
    var modalArchiver = document.getElementById('modal-archiver-paiements');
    var backdropArchiver = modalArchiver ? modalArchiver.querySelector('.modal-backdrop') : null;
    var btnCancelArchiver = modalArchiver ? modalArchiver.querySelector('.modal-btn-cancel') : null;
    var btnConfirmArchiver = modalArchiver ? modalArchiver.querySelector('.modal-btn-confirm') : null;

    function openModalArchiver() {
      if (modalArchiver) {
        modalArchiver.removeAttribute('hidden');
        modalArchiver.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModalArchiver() {
      if (modalArchiver) {
        modalArchiver.setAttribute('hidden', '');
        modalArchiver.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
      }
    }

    if (btnArchiver) {
      btnArchiver.addEventListener('click', function() {
        openModalArchiver();
      });
    }

    if (btnCancelArchiver) btnCancelArchiver.addEventListener('click', closeModalArchiver);
    if (backdropArchiver) backdropArchiver.addEventListener('click', closeModalArchiver);
    if (btnConfirmArchiver) {
      btnConfirmArchiver.addEventListener('click', function() {
        // Ici tu peux ajouter la logique pour archiver les paiements sélectionnés
        console.log('Archiver les paiements sélectionnés');
        closeModalArchiver();
        // Exemple : récupérer les checkboxes cochées et archiver les paiements correspondants
      });
    }
  }

  function initClassesActions() {
    // Modal voir membres
    var modalMembres = document.getElementById('modal-classe-membres');
    var backdropMembres = modalMembres ? modalMembres.querySelector('.modal-backdrop') : null;
    var btnCancelMembres = modalMembres ? modalMembres.querySelector('.modal-btn-cancel') : null;
    var membresList = modalMembres ? document.getElementById('modal-classe-membres-list') : null;
    var modalMembresTitle = modalMembres ? document.getElementById('modal-classe-membres-title') : null;

    function openModalMembres(classeNom, membres) {
      if (modalMembres && membresList && modalMembresTitle) {
        modalMembresTitle.textContent = 'Membres de ' + classeNom;
        membresList.innerHTML = '';
        if (membres && membres.length > 0) {
          membres.forEach(function(membre) {
            var li = document.createElement('li');
            li.textContent = membre;
            membresList.appendChild(li);
          });
        } else {
          var li = document.createElement('li');
          li.textContent = 'Aucun membre dans cette classe.';
          membresList.appendChild(li);
        }
        modalMembres.removeAttribute('hidden');
        modalMembres.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModalMembres() {
      if (modalMembres) {
        modalMembres.setAttribute('hidden', '');
        modalMembres.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
      }
    }

    // Modal supprimer classe
    var modalSupprimer = document.getElementById('modal-supprimer-classe');
    var backdropSupprimer = modalSupprimer ? modalSupprimer.querySelector('.modal-backdrop') : null;
    var btnCancelSupprimer = modalSupprimer ? modalSupprimer.querySelector('.modal-btn-cancel') : null;
    var btnConfirmSupprimer = modalSupprimer ? modalSupprimer.querySelector('.modal-btn-confirm') : null;
    var modalSupprimerNom = modalSupprimer ? document.getElementById('modal-supprimer-classe-nom') : null;
    var classeIdASupprimer = null;

    function openModalSupprimer(classeNom, classeId) {
      if (modalSupprimer && modalSupprimerNom) {
        modalSupprimerNom.textContent = classeNom;
        classeIdASupprimer = classeId;
        modalSupprimer.removeAttribute('hidden');
        modalSupprimer.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModalSupprimer() {
      if (modalSupprimer) {
        modalSupprimer.setAttribute('hidden', '');
        modalSupprimer.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
        classeIdASupprimer = null;
      }
    }

    // Boutons voir membres
    var btnsMembres = document.querySelectorAll('.classe-action-membres');
    btnsMembres.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var card = btn.closest('.classe-gestion-card');
        var classeNom = card ? card.querySelector('.classe-gestion-card__title').textContent : 'la classe';
        // Exemple de membres (à remplacer par les vraies données)
        var membres = ['Lucas Dupont', 'Emma Martin', 'Sophie Leroy'];
        openModalMembres(classeNom, membres);
      });
    });

    // Boutons supprimer
    var btnsSupprimer = document.querySelectorAll('.classe-action-delete');
    btnsSupprimer.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var card = btn.closest('.classe-gestion-card');
        var classeNom = card ? card.querySelector('.classe-gestion-card__title').textContent : 'cette classe';
        var classeId = card ? card.getAttribute('data-classe-id') || '1' : '1';
        openModalSupprimer(classeNom, classeId);
      });
    });

    if (btnCancelMembres) btnCancelMembres.addEventListener('click', closeModalMembres);
    if (backdropMembres) backdropMembres.addEventListener('click', closeModalMembres);
    if (btnCancelSupprimer) btnCancelSupprimer.addEventListener('click', closeModalSupprimer);
    if (backdropSupprimer) backdropSupprimer.addEventListener('click', closeModalSupprimer);
    if (btnConfirmSupprimer) {
      btnConfirmSupprimer.addEventListener('click', function() {
        // Ici tu peux ajouter la logique pour supprimer la classe
        console.log('Supprimer classe ID:', classeIdASupprimer);
        closeModalSupprimer();
        // Exemple : supprimer la carte de la classe de l'interface
      });
    }
  }

  function initCreerClasse() {
    var btnCreer = document.querySelector('.classes-btn-create');
    var modalCreer = document.getElementById('modal-creer-classe');
    var backdropCreer = modalCreer ? modalCreer.querySelector('.modal-backdrop') : null;
    var btnCancelCreer = modalCreer ? modalCreer.querySelector('.modal-btn-cancel') : null;
    var btnConfirmCreer = modalCreer ? modalCreer.querySelector('.modal-btn-confirm') : null;
    var formCreer = modalCreer ? document.getElementById('form-creer-classe') : null;

    function openModalCreer() {
      if (modalCreer) {
        modalCreer.removeAttribute('hidden');
        modalCreer.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeModalCreer() {
      if (modalCreer) {
        modalCreer.setAttribute('hidden', '');
        modalCreer.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
        if (formCreer) {
          formCreer.reset();
        }
      }
    }

    if (btnCreer) {
      btnCreer.addEventListener('click', function() {
        openModalCreer();
      });
    }

    if (btnCancelCreer) btnCancelCreer.addEventListener('click', closeModalCreer);
    if (backdropCreer) backdropCreer.addEventListener('click', closeModalCreer);
    if (btnConfirmCreer && formCreer) {
      btnConfirmCreer.addEventListener('click', function(e) {
        e.preventDefault();
        if (formCreer.checkValidity()) {
          // Ici tu peux ajouter la logique pour créer la classe
          var formData = new FormData(formCreer);
          console.log('Créer classe:', Object.fromEntries(formData));
          closeModalCreer();
          // Exemple : ajouter la nouvelle classe à la grille
        } else {
          formCreer.reportValidity();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
