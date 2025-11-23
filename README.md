# Pokédex - Redlemon8

Une application web complète de Pokédex permettant de consulter les Pokémon, leurs types et de créer/gérer des équipes personnalisées.

## 📋 Table des matières

- [Description](#description)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API Endpoints](#api-endpoints)
- [Base de données](#base-de-données)
- [Fonctionnalités](#fonctionnalités)
- [Auteur](#auteur)

## 📖 Description

Cette application Pokédex est un projet full-stack permettant de :

- Consulter une base de données de 151 Pokémon de première génération
- Visualiser les statistiques détaillées de chaque Pokémon
- Parcourir les différents types de Pokémon
- Créer et gérer des équipes personnalisées (jusqu'à 6 Pokémon par équipe)
- Ajouter ou retirer des Pokémon dans les équipes

L'application suit une architecture séparée entre le frontend (HTML/CSS/JavaScript) et le backend (API REST avec Express.js).

## 🛠 Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **Sequelize** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **HTML5** - Structure
- **CSS3** avec **Bulma** - Framework CSS
- **JavaScript (ES6+)** - Logique applicative
- **Vite** - Build tool et serveur de développement
- **Font Awesome** - Icônes

## 📁 Structure du projet

```
S14-Pokedex-Redlemon8/
├── back/                    # Backend
│   ├── app.js              # Point d'entrée du serveur
│   ├── package.json        # Dépendances backend
│   ├── src/
│   │   ├── controllers/    # Contrôleurs (logique métier)
│   │   ├── models/         # Modèles Sequelize
│   │   ├── middleware/     # Middleware (gestion d'erreurs)
│   │   ├── migrations/     # Scripts de migration DB
│   │   └── router.js       # Définition des routes
│   └── data/
│       └── sqlVersion/     # Scripts SQL de référence
│
├── front/                   # Frontend
│   ├── index.html          # Page principale
│   ├── package.json        # Dépendances frontend
│   └── public/
│       ├── css/            # Styles CSS
│       ├── js/             # Scripts JavaScript
│       └── images/         # Images des Pokémon (151 .webp)
│
├── docs/                    # Documentation
│   ├── endpoints.md        # Documentation des endpoints API
│   ├── installation.md     # Guide d'installation
│   ├── roadmap.md          # Feuille de route
│   └── ...
│
└── README.md               # Ce fichier
```

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (généralement inclus avec Node.js)
- **PostgreSQL** (version 12 ou supérieure)
- **Git** (pour cloner le projet)

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <URL_DU_REPO>
cd S14-Pokedex-Redlemon8
```

### 2. Installer les dépendances backend

```bash
cd back
npm install
```

### 3. Installer les dépendances frontend

```bash
cd ../front
npm install
```

### 4. Configuration de la base de données PostgreSQL

Connectez-vous à PostgreSQL et créez la base de données :

```bash
# Se connecter à PostgreSQL (sous Linux/Mac)
sudo -i -u postgres psql

# Ou directement avec psql
psql -U postgres
```

Dans le shell PostgreSQL, exécutez :

```sql
-- Créer un utilisateur
CREATE USER admin_pokedex WITH LOGIN PASSWORD 'pokedex';

-- Créer la base de données
CREATE DATABASE pokedex WITH OWNER admin_pokedex;

-- Quitter psql
\q
```

## ⚙️ Configuration

### Configuration du backend

1. Créez un fichier `.env` dans le dossier `back/` :

```bash
cd back
cp .env.example .env  # Si un fichier exemple existe
# Sinon, créez le fichier .env manuellement
```

2. Configurez les variables d'environnement dans `.env` :

```env
# Base de données
PG_URL=postgresql://admin_pokedex:pokedex@localhost:5432/pokedex

# Serveur
PORT=3000
BASE_URL=http://localhost
```

**Note** : Ajustez ces valeurs selon votre configuration PostgreSQL locale.

### Initialisation de la base de données

Une fois la configuration terminée, initialisez les tables et les données :

```bash
cd back
npm run db:reset
```

Cette commande va :
- Créer les tables dans la base de données
- Insérer les données initiales (151 Pokémon, types, etc.)

## 🎯 Utilisation

### Démarrage du backend

Dans un terminal :

```bash
cd back
npm run dev
```

Le serveur backend sera accessible sur `http://localhost:3000` (ou le port configuré dans votre `.env`).

### Démarrage du frontend

Dans un autre terminal :

```bash
cd front
npm run dev
```

L'application frontend sera accessible sur `http://localhost:5173` (port par défaut de Vite).

**Ou** utilisez un serveur de développement comme Live Server si vous préférez.

## 📡 API Endpoints

### Pokémons

| Méthode | Endpoint              | Description                    |
|---------|-----------------------|--------------------------------|
| GET     | `/pokemons`           | Liste tous les Pokémon         |
| GET     | `/pokemons/:id`       | Détails d'un Pokémon spécifique|

### Types

| Méthode | Endpoint              | Description                    |
|---------|-----------------------|--------------------------------|
| GET     | `/types`              | Liste tous les types           |
| GET     | `/types/:id`          | Liste les Pokémon d'un type    |

### Équipes

| Méthode | Endpoint                         | Description                    |
|---------|----------------------------------|--------------------------------|
| GET     | `/teams`                         | Liste toutes les équipes       |
| GET     | `/teams/:id`                     | Détails d'une équipe           |
| POST    | `/teams`                         | Crée une nouvelle équipe       |
| PATCH   | `/teams/:id`                     | Modifie une équipe             |
| DELETE  | `/teams/:id`                     | Supprime une équipe            |
| POST    | `/teams/:id/pokemons`            | Ajoute un Pokémon à une équipe |
| DELETE  | `/teams/:id/pokemons`            | Retire un Pokémon d'une équipe |

### Règles de gestion

- **Limite d'équipe** : Maximum 6 Pokémon par équipe
- **Unicité** : Un même Pokémon ne peut pas être ajouté deux fois dans la même équipe

## 🗄️ Base de données

### Schéma de la base de données

Le projet utilise une base de données PostgreSQL avec les tables suivantes :

- **pokemon** : Stocke les informations des Pokémon (nom, statistiques)
- **type** : Liste des types de Pokémon avec leurs couleurs
- **team** : Équipes créées par les utilisateurs
- **pokemon_type** : Table de liaison entre Pokémon et Types (many-to-many)
- **team_pokemon** : Table de liaison entre Équipes et Pokémon (many-to-many)

### Relations

- Un Pokémon peut avoir plusieurs Types
- Un Type peut être associé à plusieurs Pokémon
- Une Équipe peut contenir plusieurs Pokémon (max 6)
- Un Pokémon peut appartenir à plusieurs Équipes

## ✨ Fonctionnalités

### Version actuelle

- ✅ Consultation de la liste complète des 151 Pokémon
- ✅ Affichage des détails d'un Pokémon (statistiques, types)
- ✅ Visualisation des types de Pokémon
- ✅ Filtrage des Pokémon par type
- ✅ Création d'équipes personnalisées
- ✅ Modification et suppression d'équipes
- ✅ Ajout/retrait de Pokémon dans les équipes
- ✅ Interface responsive avec Bulma CSS
- ✅ Modales pour les détails et la gestion

### Fonctionnalités prévues (voir `docs/roadmap.md`)

- 🔄 Système de votes pour les Pokémon
- 🔄 Recherche de Pokémon par nom
- 🔄 Comparaison de deux Pokémon
- 🔄 Authentification utilisateur
- 🔄 Leaderboard des Pokémon les plus populaires
- 🔄 Infinite scroll pour la liste des Pokémon

## 🧪 Scripts disponibles

### Backend

```bash
npm run dev        # Lance le serveur en mode développement (watch)
npm run db:create  # Crée les tables de la base de données
npm run db:seed    # Insère les données initiales
npm run db:reset   # Réinitialise complètement la base de données
```

### Frontend

```bash
npm run dev        # Lance le serveur de développement Vite
```

## 📚 Documentation supplémentaire

Pour plus de détails, consultez :

- [Documentation des endpoints](docs/endpoints.md)
- [Guide d'installation détaillé](docs/installation.md)
- [Feuille de route](docs/roadmap.md)

## 🤝 Contribution

Ce projet est un projet d'apprentissage. Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est destiné à un usage éducatif.

## 👤 Auteur

**Redlemon8**

---

Bon développement ! 🍀

