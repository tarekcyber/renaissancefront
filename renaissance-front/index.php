<?php
/**
 * Contrôleur frontal (point d'entrée unique du site)
 *
 * Rôle : toutes les requêtes passent par ce fichier. On lit le paramètre d'URL ?page=
 * pour décider quelle vue inclure depuis app/Views/. Seules les pages listées dans
 * la liste blanche sont autorisées (sécurité : empêche l'inclusion de fichiers arbitraires).
 *
 * Configuration serveur : le dossier public/ doit être la racine document (DocumentRoot).
 * Ex. : https://domaine.be/ → accueil ; https://domaine.be/index.php?page=login → connexion.
 */

// #region agent log
$__dbgRunId = 'run-post-fix-1';
$__dbgLogPath = __DIR__ . '/debug-575bc2.log';
$__dbgWrite = static function (string $hypothesisId, string $location, string $message, array $data = []) use ($__dbgRunId, $__dbgLogPath): void {
    $payload = [
        'sessionId' => '575bc2',
        'runId' => $__dbgRunId,
        'hypothesisId' => $hypothesisId,
        'location' => $location,
        'message' => $message,
        'data' => $data,
        'timestamp' => (int) round(microtime(true) * 1000),
    ];
    @file_put_contents($__dbgLogPath, json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);
};
$__dbgWrite('H1', 'index.php:bootstrap', 'Front controller entry', [
    'dir' => __DIR__,
    'uri' => $_SERVER['REQUEST_URI'] ?? null,
    'queryPage' => $_GET['page'] ?? null,
]);
// #endregion

// --- Liste blanche des pages autorisées ---
// Seules ces valeurs pour ?page= sont acceptées. Toute autre valeur redirige vers l'accueil.
$listePagesAutorisees = [
    'accueil',
    'login',
    'inscription',
    'membre/dashboard',
    'membre/profil',
    'membre/mes-enfants',
    'membre/inscriptions',
    'membre/cotisations',
    'membre/documents',
    'membre/calendrier',
    'gestion/membres',
    'gestion/inscriptions',
    'gestion/activites',
    'gestion/classes',
    'gestion/paiements',
    'gestion/enseignement',
];

// --- Récupération de la page demandée ---
// On lit le paramètre ?page= dans l'URL. S'il est absent ou vide, on affiche l'accueil.
$pageDemandee = isset($_GET['page']) ? trim($_GET['page']) : 'accueil';

// Nettoyage de sécurité : on supprime ".." et "\" pour empêcher de sortir du dossier Views.
$pageDemandee = str_replace(['..', '\\'], '', $pageDemandee);
// #region agent log
$__dbgWrite('H4', 'index.php:sanitize', 'Page demandee after sanitize', [
    'pageDemandee' => $pageDemandee,
]);
// #endregion

// Si la page demandée n'est pas dans la liste autorisée, on force l'accueil.
if (!in_array($pageDemandee, $listePagesAutorisees, true)) {
    $pageDemandee = 'accueil';
}
// #region agent log
$__dbgWrite('H4', 'index.php:whitelist', 'Whitelist resolution', [
    'pageDemandee' => $pageDemandee,
    'inWhitelist' => in_array($pageDemandee, $listePagesAutorisees, true),
]);
// #endregion

// --- Construction du chemin vers le fichier de vue ---
// Ex. : pageDemandee = "membre/dashboard" → chemin = .../Views/membre/dashboard.php
// __DIR__ = racine actuelle du projet (index.php est à la racine).
$cheminFichierVue = __DIR__ . '/Views/' . $pageDemandee . '.php';
// #region agent log
$__dbgWrite('H2', 'index.php:view-path', 'Computed view path', [
    'cheminFichierVue' => $cheminFichierVue,
    'existsBeforeFallback' => is_file($cheminFichierVue),
]);
// #endregion

// Si le fichier de vue n'existe pas (fichier supprimé ou erreur), on affiche l'accueil par défaut.
if (!is_file($cheminFichierVue)) {
    $pageDemandee = 'accueil';
    $cheminFichierVue = __DIR__ . '/Views/accueil.php';
}
// #region agent log
$__dbgWrite('H3', 'index.php:fallback', 'Final resolved view path', [
    'pageDemandeeFinale' => $pageDemandee,
    'cheminFichierVueFinal' => $cheminFichierVue,
    'existsFinal' => is_file($cheminFichierVue),
]);
// #endregion
// Inclusion de la vue : son contenu HTML est envoyé au navigateur.
require $cheminFichierVue;