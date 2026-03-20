## ASBL La Renaissance – Gestion des inscriptions

Application web de gestion des inscriptions et du suivi pédagogique pour **l’ASBL La Renaissance** (soutien scolaire et cours de langues).  
Projet académique réalisé dans le cadre de la formation à la **HELHa Montignies-sur-Sambre – Groupe A4**.

---

### 1. Objectifs du projet

- Permettre aux **parents** de :
  - créer un compte membre,
  - encoder leurs enfants,
  - inscrire les enfants à des activités,
  - suivre les cotisations et télécharger des documents.
- Offrir aux **gestionnaires / enseignants** une interface de :
  - consultation et gestion des membres,
  - gestion des activités, classes et inscriptions,
  - suivi des paiements et présence en classe.
- Respecter une **architecture MVC en PHP vanilla**, sans framework, pour mettre en pratique :
  - la séparation des responsabilités (routage, vues, future logique métier),
  - la modélisation (MCD / UML) et la structuration propre d’un projet web.

---

### 2. Stack technique (imposée)

**Aucun framework n’est autorisé**. Le projet repose uniquement sur les technologies suivantes :

- **Backend**
  - PHP 8.x (vanilla, architecture MVC)
  - Organisation en `Controllers/`, `Models/`, `Views/` (Controllers/Models encore vides dans cette version front-only)

- **Frontend**
  - HTML5
  - CSS3 (design custom dans `public/css/style.css`)
  - JavaScript vanilla (comportements dans `public/js/script.js`)
  - Icônes : Bootstrap Icons via CDN (pas de framework CSS Bootstrap, uniquement les icônes)

- **Base de données**
  - MySQL  
  - Modélisation via **Looping** (MCD) + **Visual Paradigm** (diagrammes UML : use case, séquence, classes, etc.)

- **Outillage projet**
  - **Git** : versionning du code
  - **Trello** : gestion de projet (backlog, tâches, suivi)

---

### 3. Architecture & arborescence

Le projet suit une architecture **MVC front controller** classique :

```text
public/                 ← Racine web (DocumentRoot)
  index.php             ← Front controller (routage ?page=)
  css/                  ← Feuilles de style (style global, layout membre, responsive)
  js/                   ← Scripts JS (login, inscription, sidebar, modales, calendrier…)
  images/               ← Assets (logo, icônes locales…)

app/
  Controllers/          ← Contrôleurs (prévu pour la logique métier / accès Model)
  Models/               ← Modèles (prévu pour l’accès MySQL)
  Views/                ← Vues (templates PHP côté front)
    accueil.php         ← Vitrine activités
    login.php           ← Connexion espace membre
    inscription.php     ← Inscription parent + enfants
    membre/             ← Vues espace membre (dashboard, profil, enfants, inscriptions…)
    gestion/            ← Vues back-office (membres, inscriptions, activités, classes, paiements, enseignement)
```

#### 3.1. Point d’entrée / routage

- **DocumentRoot imposé** : `public/`
  - URL d’accueil :  
    - `http://votre-domaine/`  
    - ou `http://votre-domaine/index.php`
  - Affiche la page **accueil**.

- **Front controller** : `public/index.php`
  - Lit le paramètre `?page=...`
  - Vérifie qu’il fait partie d’une **liste blanche** de pages autorisées
  - Construit le chemin vers la vue correspondante dans `app/Views/`
  - Inclut la vue (`require`), ou retombe sur `accueil.php` si la page est inconnue

Pages actuellement autorisées (côté front) :

- `accueil`, `login`, `inscription`
- `membre/dashboard`, `membre/profil`, `membre/mes-enfants`, `membre/inscriptions`, `membre/cotisations`, `membre/documents`, `membre/calendrier`
- `gestion/membres`, `gestion/inscriptions`, `gestion/activites`, `gestion/classes`, `gestion/paiements`, `gestion/enseignement`

> **Remarque** : cette version du dépôt se concentre sur le **front** (vues + comportements JS).  
> Les dossiers `Controllers/` et `Models/` sont prévus pour la suite (connexion MySQL, logique métier).

---

### 4. Vues principales

- `app/Views/accueil.php`
  - Page vitrine des activités (cartes cliquables).
  - Clic sur une activité → modale « Connexion requise ».
  - En-tête visiteur (logo, Connexion, S’inscrire).

- `app/Views/login.php`
  - Formulaire de connexion (email + mot de passe).
  - Validation côté client dans `script.js` (maquette : pas encore reliée à MySQL).

- `app/Views/inscription.php`
  - Formulaire multi-blocs :
    - parent 1, parent 2,
    - adresse,
    - préférences de communication,
    - liste dynamique d’enfants (bouton « Ajouter un enfant »),
    - acceptation du ROI.
  - Validation côté client dans `script.js`.

- `app/Views/membre/*`
  - `dashboard.php` : vue synthèse (annonces, prochaines activités, accès rapide).
  - `profil.php` : profil parent, informations de contact.
  - `mes-enfants.php` : liste des enfants et activités associées.
  - `inscriptions.php`, `cotisations.php`, `documents.php`, `calendrier.php` : vues dédiées.

- `app/Views/gestion/*`
  - `membres.php` : gestion des membres (filtres, tableau, actions).
  - `inscriptions.php` : gestion des demandes (accepter / refuser via modales).
  - `activites.php` : gestion des activités.
  - `classes.php` : gestion des classes (voir membres, supprimer, créer).
  - `paiements.php` : gestion des paiements (archivage via modale).
  - `enseignement.php` : interface enseignement (présences, etc.).

---

### 5. JavaScript (comportements côté client)

Fichier : `public/js/script.js`

Principales responsabilités :

- Gestion des liens « Mon Profil » (redirigés vers `#login` sur la page de connexion).
- Validation des formulaires :
  - connexion (email + mot de passe),
  - inscription (tous les champs requis, cohérence email / mot de passe / ROI).
- Layout membre :
  - **Sidebar repliable** (`layout-membre--sidebar-collapsed`),
  - panneaux **notifications** et **profil utilisateur** (ouverture/fermeture, clic extérieur).
- Modales :
  - archiver un commentaire,
  - confirmer la déconnexion,
  - accepter / refuser une inscription,
  - archiver des paiements,
  - voir membres d’une classe, supprimer une classe, créer une classe.
- Calendrier :
  - génération dynamique de la grille (mois / année),
  - marquage des week-ends et des jours avec événements (données factices).

Les blocs de code liés à des animations (transitions, hover, modales) sont balisés avec un tag `*ANIMATION-...*` dans les commentaires, afin de pouvoir les activer/désactiver facilement si nécessaire.

---

### 6. CSS (design et responsive)

Fichier principal : `public/css/style.css`

- Variables CSS (palette, espacements, ombres, rayons) définies dans `:root` (noms camelCase en français, ex. `--bleuFonce`, `--grisTexte`).
- Sections structurées et commentées :
  - reset & base,
  - barre de navigation visiteur,
  - boutons (primaires, secondaires, danger, success),
  - hero, grille d’activités, section « comment ça marche »,
  - footer,
  - layout membre (sidebar, header, cartes, tableaux),
  - formulaires (login, inscription),
  - modales,
  - calendrier,
  - responsive.
- Les sections liées à des animations sont repérées par des commentaires `*ANIMATION-...*` pour les cibler facilement.

---

### 7. Installation & exécution locale

1. **Cloner le dépôt**

```bash
git clone <url-du-repo>
cd renaissance-front
```

2. **Configurer le serveur web**

- Configurer votre serveur (Apache, Nginx, serveur PHP intégré…) avec :
  - **DocumentRoot** pointant vers le dossier `public/` (recommandé en production), **ou**
  - sous **XAMPP** avec le projet dans `htdocs/renaissance-front/` : un fichier **`.htaccess`** à la racine du projet réécrit les URLs vers `public/` (CSS, JS, `index.php`, etc.). Il faut **`AllowOverride All`** (ou au moins `FileInfo`) sur ce dossier dans `httpd.conf`, et le module **`mod_rewrite`** activé (`LoadModule rewrite_module …`).
- Vérifier que PHP 8.x est installé et accessible.

3. **Accéder au site**

- Si le **DocumentRoot** est `public/` : `http://localhost/` ou `http://localhost/index.php`.
- Si le projet est dans un sous-dossier (ex. `htdocs/renaissance-front/`) **avec** `.htaccess` actif : `http://localhost/renaissance-front/`.
- **Sans** réécriture Apache : ouvrir explicitement `http://localhost/renaissance-front/public/` (sinon la racine du dossier projet ne contient pas d’`index.php` → erreur **404 Not Found**).
- Naviguer via les liens (login, inscription, espace membre, gestion…). Les pages membre passent par `index.php?page=membre/…` (pas de fichiers `inscriptions.php`, `cotisations.php`, etc. à la racine web).

> **Note** : la connexion à la base MySQL et la logique métier côté `Controllers/Models` sont à compléter dans les étapes suivantes du projet.

---

### 8. Conventions & bonnes pratiques

- **PHP**
  - Fichiers de vues dans `app/Views/` uniquement.
  - Front controller unique (`public/index.php`) pour centraliser le routage.
  - Variables et fonctions en camelCase français (`$listePagesAutorisees`, `$pageDemandee`, etc.).

- **CSS**
  - Variables CSS en camelCase français (`--bleuFonce`, `--containerMax`…).
  - Sections commentées en français pour faciliter la maintenance.

- **JavaScript**
  - Fonctions d’init préfixées par `init...` (ex. `initLoginForm`, `initSidebarToggle`).
  - Variables en camelCase français (`boutonNotif`, `panneauUser`, `dateVue`…).

- **Git**
  - Commits fréquents et atomiques.
  - Messages de commit clairs (en français ou en anglais cohérent).

---

### 9. Évolutions prévues

- Implémentation des **Controllers** et **Models** :
  - connexion MySQL,
  - authentification réelle,
  - persistance des membres, enfants, activités, inscriptions, paiements, présences.
- Mise en place de tests (au moins manuels / scénarios).
- Documentation technique complémentaire :
  - MCD Looping,
  - diagrammes UML (Visual Paradigm),
  - guide d’installation MySQL + script de création de la base.

