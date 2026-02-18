/* ASBL La Renaissance - Script principal */

(function () {
  'use strict';

  // Redirection "Mon Profil" vers #login
  function initLoginLinks() {
    var ids = ['btn-mon-profil', 'btn-mon-profil-hero', 'btn-mon-profil-login-section'];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getAttribute('href') === 'index.html#login') {
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
    initArchiveComment();
    initCalendrier();
    initDeconnexionConfirm();
  }

  function initDeconnexionConfirm() {
    var modal = document.getElementById('modal-deconnexion');
    if (!modal) return;
    var link = document.querySelector('.link-deconnexion');
    var btnCancel = modal.querySelector('.modal-btn-cancel');
    var btnConfirm = modal.querySelector('.modal-btn-confirm');
    var backdrop = modal.querySelector('.modal-backdrop');
    var logoutUrl = '../index.html';

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
