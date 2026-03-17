<?php
/**
 * Template de page membre/gestion — ASBL La Renaissance
 *
 * Exemple de squelette de page utilisant le même layout que les pages
 * de l'espace membre / gestion :
 * - Sidebar à gauche (navigation membre + liens Gestion)
 * - Header membre en haut (logo, notifications, profil utilisateur)
 * - Zone de contenu principale au centre (à personnaliser)
 *
 * Ce fichier est volontairement placé à la racine du projet (en dehors de app/ et public/).
 * Si tu veux en faire une vraie vue, copie ce fichier dans app/Views/… et adapte :
 * - Les chemins CSS/JS/images (ici, ce sont les chemins utilisés depuis public/)
 * - La valeur de ?page= dans les href si nécessaire
 */
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Titre page - ASBL La Renaissance</title>

  <!-- Styles et icônes (mêmes liens que les autres pages de public/) -->
  <link rel="icon" href="images/favicon.ico">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
  <div class="layout-membre layout-membre--sidebar-collapsed">
    <!-- Sidebar : navigation membre + liens Gestion (structure identique aux pages gestion) -->
    <aside class="sidebar-membre">
      <button type="button" class="sidebar-toggle-hamburger" aria-label="Ouvrir ou fermer le menu">
        <span class="hamburger-icon" aria-hidden="true">☰</span>
      </button>
      <nav aria-label="Menu membre">
        <ul>
          <li>
            <a href="index.php?page=membre/dashboard" class="active">
              <span class="sidebar-icon bi bi-house-door" aria-hidden="true"></span>
              <span class="sidebar-nav-label">Accueil</span>
            </a>
          </li>

          <!-- Sous-menu Gestion (Membres, Inscriptions, Activités, …) -->
          <li class="sidebar-submenu-parent">
            <a href="#" class="sidebar-submenu-toggle" onclick="event.preventDefault(); this.parentElement.classList.toggle('is-open');">
              <span class="sidebar-icon bi bi-dpad-fill" aria-hidden="true"></span>
              <span class="sidebar-nav-label">Gestion</span>
              <span class="sidebar-submenu-arrow bi bi-chevron-down" aria-hidden="true"></span>
            </a>
            <ul class="sidebar-submenu">
              <li><a href="index.php?page=gestion/membres"><span class="sidebar-nav-label">Membres</span></a></li>
              <li><a href="index.php?page=gestion/inscriptions"><span class="sidebar-nav-label">Inscriptions</span></a></li>
              <li><a href="index.php?page=gestion/activites"><span class="sidebar-nav-label">Activités</span></a></li>
              <li><a href="index.php?page=gestion/classes"><span class="sidebar-nav-label">Classes</span></a></li>
              <li><a href="index.php?page=gestion/paiements"><span class="sidebar-nav-label">Paiements</span></a></li>
              <li><a href="index.php?page=gestion/enseignement"><span class="sidebar-nav-label">Enseignement</span></a></li>
            </ul>
          </li>

          <!-- Liens membre (exemple, à adapter) -->
          <li><a href="index.php?page=membre/mes-enfants"><span class="sidebar-nav-label">Mes enfants</span></a></li>
          <li><a href="index.php?page=membre/documents"><span class="sidebar-nav-label">Documents</span></a></li>
          <li><a href="index.php?page=membre/calendrier"><span class="sidebar-nav-label">Calendrier</span></a></li>
          <li><a href="index.php?page=login" class="link-deconnexion"><span class="sidebar-nav-label">Déconnexion</span></a></li>
        </ul>
      </nav>
    </aside>

    <!-- Main : header membre + zone de contenu vide à remplir -->
    <div class="main-membre">
      <!-- Header membre : logo, notifications, profil utilisateur -->
      <header class="header-membre">
        <a href="https://ecolelarenaissance.wixsite.com/ecolelarenaissance"
           target="_blank"
           rel="noopener noreferrer"
           class="header-logo">
          <img src="images/logo-color.png" alt="La Renaissance" class="header-logo-img">
        </a>
        <div class="header-membre-right">
          <div class="header-notif-wrap">
            <button type="button" class="header-notif-btn" aria-label="Notifications" aria-expanded="false">
              <img src="images/cloche-notif.png" alt="" class="header-notif-icon header-notif-icon--with-notif" aria-hidden="true">
              <img src="images/cloche.png" alt="" class="header-notif-icon header-notif-icon--plain" aria-hidden="true">
            </button>
            <div class="header-notif-panel" id="header-notif-panel">
              <!-- Exemple de contenu ; laisser vide ou adapter -->
              <p class="header-notif-title">Annonces récentes</p>
              <ul class="header-notif-list">
                <li class="header-notif-item">
                  <span class="header-notif-tag">JJ/MM</span>
                  <span class="header-notif-text">Exemple d’annonce.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-user-wrap">
            <button type="button" class="header-user-btn" aria-label="Profil" aria-expanded="false">
              <img src="images/default-pfp.png" alt="Nom utilisateur" class="user-avatar">
            </button>
            <div class="header-user-panel" id="header-user-panel">
              <!-- Contenu panneau utilisateur à adapter (nom, rôle, liens rapides) -->
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu principal : à personnaliser -->
      <main class="content-membre">
        <h1 class="page-title-membre">Titre de la page de gestion</h1>
        <!-- Exemple de zone de contenu vide -->
        <section class="card">
          <h2>Bloc principal</h2>
          <p>Utilise cette carte comme point de départ pour ta page (tableau, formulaire, etc.).</p>
        </section>
      </main>
    </div>
  </div>

  <!-- JS principal (comme les autres pages de public/) -->
  <script src="js/script.js"></script>
</body>
</html>

