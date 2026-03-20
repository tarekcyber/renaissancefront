<?php
/**
 * Vue : Page d'accueil (Nos activités)
 *
 * Rôle : affiche la vitrine des activités de l'ASBL (formulaires d'inscription,
 * soutien scolaire, cours de langues). Chaque carte d'activité est cliquable :
 * un clic ouvre la modale « Connexion requise » (script inline en bas de page).
 * Les liens « Mon Profil » sont redirigés vers #login par script.js.
 */
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Encodage et affichage responsive -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ASBL La Renaissance - Accueil</title>
  <meta name="description" content="Découvrez toutes les activités de l'ASBL La Renaissance : soutien scolaire, cours de langues et ateliers pour vos enfants.">
  <!-- Favicon, feuille de style du site, icônes Bootstrap, police Dancing Script pour le logo -->
  <link rel="icon" href="images/favicon.ico">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&display=swap" rel="stylesheet">
</head>
<body>
  <!-- En-tête visiteur : logo (lien externe vers le site de l'école) + boutons Connexion, Mon Profil, S'inscrire -->
  <header class="nav-visiteur">
    <a href="https://ecolelarenaissance.wixsite.com/ecolelarenaissance" target="_blank" rel="noopener noreferrer" aria-label="La Renaissance">
      <img src="images/logo-color.png" alt="La Renaissance" class="logo">
    </a>
    <div class="cta">
      <a href="index.php?page=login" class="btn btn-soft">Connexion</a>
      <a href="index.php?page=login" class="btn btn-secondary" id="btn-mon-profil">Mon Profil</a>
      <a href="index.php?page=inscription" class="btn btn-primary">S'inscrire</a>
    </div>
  </header>

  <main>
    <!-- Bandeau hero : titre principal et sous-titre (style compact pour enchaîner avec la grille d'activités) -->
    <section class="hero hero--compact" id="accueil">
      <div class="container">
        <h1>Nos activités</h1>
        <p class="subtitle">Soutien scolaire, cours de langues et ateliers pour vos enfants.</p>
      </div>
    </section>

    <!-- Grille des cartes activités (clic → modal Connexion requise) -->
    <section class="section-activites-vitrine section-activites-vitrine--remontee">
      <div class="container">
        <div class="formulaires-grid formulaires-grid--trois">
          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Réinscription — Activité</h2>
              <span class="formulaire-card__badge">Ouvert jusqu'au 30/06/2025</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Réinscrivez vos enfants aux activités de l'ASBL pour la prochaine période.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Dimanches · 9h–13h ou 13h–17h</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Préinscription — Langue X</h2>
              <span class="formulaire-card__badge">Ouvert jusqu'au 10/05/2025</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Préinscription aux cours de langues. Places limitées.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Dimanches · 9h–13h ou 13h–17h</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Liste de réserve</h2>
              <span class="formulaire-card__badge">Ouvert</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Inscrivez-vous sur la liste d'attente pour être contacté dès qu'une place se libère.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Dimanches · 9h–13h ou 13h–17h</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Devoirs & Soutien Scolaire</h2>
              <span class="formulaire-card__badge">Ouvert jusqu'au 30/06/2025</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Aide aux devoirs et soutien pour primaire et secondaire.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Lun / Mar / Jeu / Ven · 17h15 à 19h15</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Cours de Français - Débutant</h2>
              <span class="formulaire-card__badge">Cours de langue</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Cours de français pour débutants. Apprentissage des bases de la langue.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Lundi, Mercredi · 14h00 – 16h00</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Soutien Scolaire - Mathématiques</h2>
              <span class="formulaire-card__badge">Soutien scolaire</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Aide aux devoirs et soutien en mathématiques pour primaire et secondaire.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">Mardi, Jeudi · 15h30 – 17h30</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Cours d'Anglais - Intermédiaire</h2>
              <span class="formulaire-card__badge">Cours de langue</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Perfectionnement en anglais pour élèves ayant déjà les bases.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">À définir selon la session</p>
          </div>

          <div class="card formulaire-card formulaire-card--clickable" role="button" tabindex="0">
            <div class="formulaire-card__header">
              <h2 class="formulaire-card__title">Soutien Scolaire - Français</h2>
              <span class="formulaire-card__badge">Soutien scolaire</span>
            </div>
            <p class="formulaire-card__label">Commentaire</p>
            <p class="formulaire-card__info">Soutien en français : lecture, écriture et compréhension.</p>
            <p class="formulaire-card__label">Horaire</p>
            <p class="formulaire-card__horaire">À définir selon la session</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pied de page : coordonnées + réseaux -->
    <footer class="footer" id="contact">
      <div class="container footer-grid">
        <div class="footer-brand">
          <img src="images/logo-color.png" alt="" class="footer-logo-img">
          <p class="footer-org">ASBL La Renaissance</p>
          <p class="footer-desc">Soutien scolaire et cours de langues</p>
        </div>
        <div class="footer-col">
          <h4>CONTACT</h4>
          <p>Email: contact@larenaissance.eu</p>
          <p>Téléphone: +32 486 85 95 44</p>
          <p>Adresse: Rue Jean-Baptiste Ledoux 23A, Jumet, 6040</p>
        </div>
        <div class="footer-col">
          <h4>RÉSEAUX</h4>
          <p><a href="https://www.facebook.com/asbllarenaissance/about?locale=fr_FR">Facebook</a></p>
        </div>
      </div>
      <div class="footer-copy">
        <p>© 2026 Asbl La Renaissance. Tous droits réservés.</p>
      </div>
    </footer>
  </main>

  <!-- Modal "Connexion requise" (ouverte au clic sur une carte activité) -->
  <div id="modal-activite-connect" class="modal" role="dialog" aria-labelledby="modal-activite-connect-title" aria-modal="true" hidden>
    <div class="modal-backdrop"></div>
    <div class="modal-content modal-content--archiver modal-content--activite-connect">
      <button type="button" class="modal-close-x" aria-label="Fermer" title="Fermer">
        <i class="bi bi-x" aria-hidden="true"></i>
      </button>
      <h2 id="modal-activite-connect-title" class="modal-title">Connexion requise</h2>
      <p class="modal-text">Vous devez être connecté pour accéder à cette activité.</p>
      <div class="modal-actions modal-actions--smooth">
        <a href="index.php?page=login" class="btn btn-primary btn-smooth">Se connecter</a>
        <a href="index.php?page=inscription" class="btn btn-secondary btn-smooth">S'inscrire</a>
      </div>
    </div>
  </div>

  <script src="js/script.js"></script>
  <!-- *ANIMATION-modal-activite* : ouverture/fermeture du modal au clic sur une carte, sur le fond (backdrop) ou touche Échap -->
  <script>
    (function() {
      var modale = document.getElementById('modal-activite-connect');
      if (!modale) return;
      var cartes = document.querySelectorAll('.formulaire-card--clickable');
      var fondModale = modale.querySelector('.modal-backdrop');

      function ouvrirModale() {
        modale.removeAttribute('hidden');
        modale.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
      }
      function fermerModale() {
        modale.setAttribute('hidden', '');
        modale.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
      }

      cartes.forEach(function(carte) {
        carte.addEventListener('click', function() { ouvrirModale(); });
        carte.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            ouvrirModale();
          }
        });
      });
      var boutonFermer = modale.querySelector('.modal-close-x');
      if (fondModale) fondModale.addEventListener('click', fermerModale);
      if (boutonFermer) boutonFermer.addEventListener('click', fermerModale);
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modale.hasAttribute('hidden')) fermerModale();
      });
    })();
  </script>
</body>
</html>
