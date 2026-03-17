<?php
/**
 * Vue : Gestion — Enseignement
 * Contenu / ressources liées à l’enseignement.
 * Layout : sidebar + header membre + contenu.
 */
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enseignement - ASBL La Renaissance</title>
  <link rel="icon" href="images/favicon.ico">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
  <div class="layout-membre layout-membre--sidebar-collapsed">
    <aside class="sidebar-membre">
      <button type="button" class="sidebar-toggle-hamburger" aria-label="Ouvrir ou fermer le menu"><span class="hamburger-icon" aria-hidden="true">☰</span></button>
      <nav aria-label="Menu membre">
        <ul>
          <li><a href="index.php?page=membre/dashboard"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-house-door" viewBox="0 0 16 16" aria-hidden="true"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/></svg> <span class="sidebar-nav-label">Accueil</span></a></li>
          <li><a href="index.php?page=membre/profil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-person-circle" viewBox="0 0 16 16" aria-hidden="true"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/></svg> <span class="sidebar-nav-label">Mon profil</span></a></li>
          <li class="sidebar-submenu-parent">
            <a href="#" class="sidebar-submenu-toggle" onclick="event.preventDefault(); this.parentElement.classList.toggle('is-open');">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-dpad-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v3a.5.5 0 0 1-.5.5h-3A1.5 1.5 0 0 0 0 6.5v3A1.5 1.5 0 0 0 1.5 11h3a.5.5 0 0 1 .5.5v3A1.5 1.5 0 0 0 6.5 16h3a1.5 1.5 0 0 0 1.5-1.5v-3a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 0 16 9.5v-3A1.5 1.5 0 0 0 14.5 5h-3a.5.5 0 0 1-.5-.5v-3A1.5 1.5 0 0 0 9.5 0zm1.288 2.34a.25.25 0 0 1 .424 0l.799 1.278A.25.25 0 0 1 8.799 4H7.201a.25.25 0 0 1-.212-.382zm0 11.32-.799-1.277A.25.25 0 0 1 7.201 12H8.8a.25.25 0 0 1 .212.383l-.799 1.278a.25.25 0 0 1-.424 0Zm-4.17-4.65-1.279-.798a.25.25 0 0 1 0-.424l1.279-.799A.25.25 0 0 1 4 7.201V8.8a.25.25 0 0 1-.382.212Zm10.043-.798-1.278.799A.25.25 0 0 1 12 8.799V7.2a.25.25 0 0 1 .383-.212l1.278.799a.25.25 0 0 1 0 .424Z"/></svg> <span class="sidebar-nav-label">Gestion</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="sidebar-submenu-arrow bi bi-chevron-down" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/></svg>
            </a>
            <ul class="sidebar-submenu">
              <li><a href="index.php?page=gestion/membres"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-people-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.666A6.5 6.5 0 0 0 8 9c4 0 5 3 5 4 0 .667-.333 1-1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg> <span class="sidebar-nav-label">Membres</span></a></li>
              <li><a href="index.php?page=gestion/inscriptions"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-clipboard-check" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg> <span class="sidebar-nav-label">Inscriptions</span></a></li>
              <li><a href="index.php?page=gestion/activites"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-activity" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33l4 12a.5.5 0 0 1-.94.28L8 10.54l-3.53 3.07A.5.5 0 0 1 3.5 14a.5.5 0 0 1-.47-.33l-4-12a.5.5 0 0 1 .94-.28L5 9.46l3.53-3.07A.5.5 0 0 1 8.5 6.5z"/></svg> <span class="sidebar-nav-label">Activités</span></a></li>
              <li><a href="index.php?page=gestion/classes"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-mortarboard-fill" viewBox="0 0 16 16" aria-hidden="true"><path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z"/><path d="M4.176 9.032a.5.5 0 0 1 .292.643l-.5 1.5a.5.5 0 0 1-.936-.35l.5-1.5a.5.5 0 0 1 .644-.293m3 0a.5.5 0 0 1 .292.643l-.5 1.5a.5.5 0 0 1-.936-.35l.5-1.5a.5.5 0 0 1 .644-.293"/></svg> <span class="sidebar-nav-label">Classes</span></a></li>
              <li><a href="index.php?page=gestion/paiements"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-credit-card-2-front" viewBox="0 0 16 16" aria-hidden="true"><path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/></svg> <span class="sidebar-nav-label">Paiements</span></a></li>
            </ul>
          </li>
          <li><a href="index.php?page=gestion/enseignement" class="active"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-book" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 2.828c.885-.37 2.154-.769 3.3-.893 1.253-.135 2.623.063 3.7.893 1.078-.83 2.447-.893 3.7-.893 1.146.124 2.415.523 3.3.893v9.923c-.885-.37-2.154-.769-3.3-.893-1.253-.135-2.623.063-3.7.893-1.078-.83-2.447-.893-3.7-.893-1.146.124-2.415.523-3.3.893zm8 1.151V4.647c0-.638-.216-1.295-.5-1.848L8 2.5v-.651c.638.18 1.23.468 1.73.849zm-4 0V2.5c-.216-.195-.48-.4-.5-.849L4 2.647c0 .638.216 1.295.5 1.848zm0 2.992-.5-.502V6.171c.638.18 1.23.468 1.73.849L5 6.998zm6 .498v1.351c.216-.195.48-.4.5-.849l.5.502V7.647c-.638.18-1.23.468-1.73.849zm-7-1.351v1.351l-.5.502c.216-.195.48-.4.5-.849zm6 0v1.351l.5.502c-.216-.195-.48-.4-.5-.849zM5 14.5V6.998l.5-.502V14.5c-.638-.18-1.23-.468-1.73-.849zm6 0V6.998l.5-.502V14.5c.638-.18 1.23-.468 1.73-.849z"/></svg> <span class="sidebar-nav-label">Enseignement</span></a></li>
          <li><a href="index.php?page=membre/mes-enfants"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-people" viewBox="0 0 16 16" aria-hidden="true"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/></svg> <span class="sidebar-nav-label">Mes enfants</span></a></li>
          <li><a href="index.php?page=membre/inscriptions"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-clipboard-check" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg> <span class="sidebar-nav-label">Inscriptions</span></a></li>
          <li><a href="index.php?page=membre/cotisations"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-piggy-bank" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.138-1.496A6.6 6.6 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.6 7.6 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962"/><path fill-rule="evenodd" d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069q0-.218-.02-.431c.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a1 1 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.74.74 0 0 0-.375.562c-.024.243.082.48.32.654a2 2 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595M2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.6 6.6 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.65 4.65 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393m12.621-.857a.6.6 0 0 1-.098.21l-.044-.025c-.146-.09-.157-.175-.152-.223a.24.24 0 0 1 .117-.173c.049-.027.08-.021.113.012a.2.2 0 0 1 .064.199"/></svg> <span class="sidebar-nav-label">Cotisations</span></a></li>
          <li><a href="index.php?page=membre/documents"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-folder2-open" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7z"/></svg> <span class="sidebar-nav-label">Documents</span></a></li>
          <li><a href="index.php?page=membre/calendrier"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-calendar-event" viewBox="0 0 16 16" aria-hidden="true"><path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg> <span class="sidebar-nav-label">Calendrier</span></a></li>
          <li><a href="index.php?page=login" class="link-deconnexion"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="sidebar-icon bi bi-box-arrow-right" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/></svg> <span class="sidebar-nav-label">Déconnexion</span></a></li>
        </ul>
      </nav>
    </aside>
    <div class="main-membre">
      <header class="header-membre">
        <a href="https://ecolelarenaissance.wixsite.com/ecolelarenaissance" target="_blank" rel="noopener noreferrer" class="header-logo"><img src="images/logo-color.png" alt="La Renaissance" class="header-logo-img"></a>
        <div class="header-membre-right">
          <div class="header-notif-wrap">
            <button type="button" class="header-notif-btn" aria-label="Notifications" aria-expanded="false">
              <img src="images/cloche-notif.png" alt="" class="header-notif-icon header-notif-icon--with-notif" aria-hidden="true">
              <img src="images/cloche.png" alt="" class="header-notif-icon header-notif-icon--plain" aria-hidden="true">
            </button>
            <div class="header-notif-panel" id="header-notif-panel">
              <p class="header-notif-title">Annonces récentes</p>
              <ul class="header-notif-list">
                <li class="header-notif-item">
                  <span class="header-notif-tag">12/03</span>
                  <span class="header-notif-text">Nouvelle session de soutien scolaire disponible dès la semaine prochaine.</span>
                </li>
                <li class="header-notif-item">
                  <span class="header-notif-tag">10/03</span>
                  <span class="header-notif-text">Ouverture des inscriptions aux ateliers de langues pour le mois prochain.</span>
                </li>
                <li class="header-notif-item">
                  <span class="header-notif-tag">05/03</span>
                  <span class="header-notif-text">Rappel : merci de vérifier vos cotisations avant la fin du mois.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-user-wrap">
            <button type="button" class="header-user-btn" aria-label="Profil" aria-expanded="false">
              <img src="images/default-pfp.png" alt="Marie Martin" class="user-avatar">
            </button>
            <div class="header-user-panel" id="header-user-panel">
              <div class="header-user-panel-content">
                <img src="images/default-pfp.png" alt="Marie Martin" class="header-user-panel-avatar">
                <p class="header-user-panel-name">Marie Martin</p>
                <div class="header-user-panel-role-wrapper">
                  <span class="header-user-panel-role">PARENT</span>
                </div>
                <a href="index.php?page=membre/profil" class="btn btn-primary btn-sm header-user-panel-btn">Afficher votre profil</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div class="content-membre">
        <h1 class="page-title-membre">Mes classes</h1>

        <div class="formulaires-grid formulaires-grid--trois" id="enseignement-classes-grid">
          <div class="card formulaire-card formulaire-card--clickable enseignement-classe-card" role="button" tabindex="0" data-classe="Français - Débutant">
            <h2 class="formulaire-card__title">Français - Débutant</h2>
            <p class="formulaire-card__info" style="margin: 0;">Lundi, Mercredi · 14h00 – 16h00</p>
          </div>
          <div class="card formulaire-card formulaire-card--clickable enseignement-classe-card" role="button" tabindex="0" data-classe="Mathématiques - 1re">
            <h2 class="formulaire-card__title">Mathématiques - 1re</h2>
            <p class="formulaire-card__info" style="margin: 0;">Mardi, Jeudi · 15h30 – 17h30</p>
          </div>
          <div class="card formulaire-card formulaire-card--clickable enseignement-classe-card" role="button" tabindex="0" data-classe="Anglais - Intermédiaire">
            <h2 class="formulaire-card__title">Anglais - Intermédiaire</h2>
            <p class="formulaire-card__info" style="margin: 0;">Vendredi · 16h00 – 18h00</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="modal-presence" class="modal" role="dialog" aria-labelledby="modal-presence-title" aria-modal="true" hidden>
    <div class="modal-backdrop"></div>
    <div class="modal-content modal-content--presence">
      <h2 id="modal-presence-title" class="modal-title">Présence du <span id="presence-date"></span></h2>
      <ul class="presence-list" id="presence-list" aria-label="Liste des élèves">
        <li class="presence-row">
          <span class="presence-nom">Emma Dubois</span>
          <button type="button" class="btn btn-sm btn-presence" aria-pressed="false">Présent</button>
        </li>
        <li class="presence-row">
          <span class="presence-nom">Lucas Martin</span>
          <button type="button" class="btn btn-sm btn-presence" aria-pressed="false">Présent</button>
        </li>
        <li class="presence-row">
          <span class="presence-nom">Chloé Bernard</span>
          <button type="button" class="btn btn-sm btn-presence" aria-pressed="false">Présent</button>
        </li>
        <li class="presence-row">
          <span class="presence-nom">Thomas Petit</span>
          <button type="button" class="btn btn-sm btn-presence" aria-pressed="false">Présent</button>
        </li>
        <li class="presence-row">
          <span class="presence-nom">Léa Moreau</span>
          <button type="button" class="btn btn-sm btn-presence" aria-pressed="false">Présent</button>
        </li>
      </ul>
      <div class="modal-actions" style="margin-top: 20px;">
        <button type="button" class="btn btn-secondary modal-btn-close-presence">Fermer</button>
        <button type="button" class="btn btn-primary" id="btn-valider-presence">Valider</button>
      </div>
    </div>
  </div>

  <div id="modal-deconnexion" class="modal" role="dialog" aria-labelledby="modal-deconnexion-title" aria-modal="true" hidden>
    <div class="modal-backdrop"></div>
    <div class="modal-content modal-content--archiver">
      <h2 id="modal-deconnexion-title" class="modal-title">Déconnexion</h2>
      <p class="modal-text">Voulez-vous vraiment vous déconnecter ?</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary modal-btn-cancel">Annuler</button>
        <button type="button" class="btn btn-primary modal-btn-confirm">Confirmer</button>
      </div>
    </div>
  </div>
  <script src="js/script.js"></script>
  <script>
    (function() {
      var modal = document.getElementById('modal-presence');
      var titleDate = document.getElementById('presence-date');
      var cards = document.querySelectorAll('.enseignement-classe-card');
      var backdrop = modal && modal.querySelector('.modal-backdrop');
      var btnClose = modal && modal.querySelector('.modal-btn-close-presence');
      var btnValider = document.getElementById('btn-valider-presence');
      var presenceBtns = modal && modal.querySelectorAll('.btn-presence');

      function formatDate(d) {
        var j = d.getDate();
        var m = d.getMonth() + 1;
        var y = d.getFullYear();
        return (j < 10 ? '0' + j : j) + '/' + (m < 10 ? '0' + m : m) + '/' + y;
      }

      function openPresence() {
        if (!modal || !titleDate) return;
        titleDate.textContent = formatDate(new Date());
        modal.removeAttribute('hidden');
        modal.setAttribute('aria-modal', 'true');
        document.body.style.overflow = 'hidden';
        if (presenceBtns) {
          presenceBtns.forEach(function(btn) {
            btn.setAttribute('aria-pressed', 'false');
            btn.textContent = 'Présent';
            btn.classList.remove('btn-presence--active');
          });
        }
      }

      function closePresence() {
        if (!modal) return;
        modal.setAttribute('hidden', '');
        modal.setAttribute('aria-modal', 'false');
        document.body.style.overflow = '';
      }

      if (cards && cards.length) {
        cards.forEach(function(card) {
          card.addEventListener('click', openPresence);
          card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPresence(); }
          });
        });
      }
      if (backdrop) backdrop.addEventListener('click', closePresence);
      if (btnClose) btnClose.addEventListener('click', closePresence);
      if (btnValider) btnValider.addEventListener('click', function() { closePresence(); });
      if (presenceBtns && presenceBtns.length) {
        presenceBtns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            var pressed = this.getAttribute('aria-pressed') === 'true';
            this.setAttribute('aria-pressed', !pressed);
            this.classList.toggle('btn-presence--active', !pressed);
            this.textContent = !pressed ? '✓ Présent' : 'Présent';
          });
        });
      }
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) closePresence();
      });
    })();
  </script>
</body>
</html>

