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

// Si la page demandée n'est pas dans la liste autorisée, on force l'accueil.
if (!in_array($pageDemandee, $listePagesAutorisees, true)) {
    $pageDemandee = 'accueil';
}

// --- Construction du chemin vers le fichier de vue ---
// Ex. : pageDemandee = "membre/dashboard" → chemin = .../app/Views/membre/dashboard.php
// __DIR__ = dossier public/ ; dirname(__DIR__) = racine du projet.
$cheminFichierVue = dirname(__DIR__) . '/app/Views/' . $pageDemandee . '.php';

// Si le fichier de vue n'existe pas (fichier supprimé ou erreur), on affiche l'accueil par défaut.
if (!is_file($cheminFichierVue)) {
    $pageDemandee = 'accueil';
    $cheminFichierVue = dirname(__DIR__) . '/app/Views/accueil.php';
}
// Inclusion de la vue : son contenu HTML est envoyé au navigateur.
require $cheminFichierVue;