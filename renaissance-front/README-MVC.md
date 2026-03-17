# ASBL La Renaissance – Architecture MVC

## Point d'entrée

**Le serveur web doit avoir comme racine document (DocumentRoot) le dossier `public/`.**

- URL d'accueil : `http://votre-domaine/` ou `http://votre-domaine/index.php`  
  → Affiche la page **accueil** (activités).
- Toutes les pages passent par le front controller :  
  `http://votre-domaine/index.php?page=login`,  
  `http://votre-domaine/index.php?page=membre/dashboard`,  
  `http://votre-domaine/index.php?page=gestion/classes`, etc.

## Arborescence

```
public/                 ← Racine web (DocumentRoot)
  index.php             ← Front controller (routage ?page=)
  css/
  js/
  images/

app/
  Controllers/          ← Contrôleurs (vide pour l’instant)
  Views/                ← Vues (templates PHP)
    accueil.php
    login.php
    inscription.php
    membre/             (dashboard, profil, inscriptions, …)
    gestion/            (membres, inscriptions, classes, …)
  Models/               ← Modèles (vide pour l’instant)
```

## Pages autorisées (?page=)

- `accueil`, `login`, `inscription`
- `membre/dashboard`, `membre/profil`, `membre/mes-enfants`, `membre/inscriptions`, `membre/cotisations`, `membre/documents`, `membre/calendrier`
- `gestion/membres`, `gestion/inscriptions`, `gestion/activites`, `gestion/classes`, `gestion/paiements`, `gestion/enseignement`