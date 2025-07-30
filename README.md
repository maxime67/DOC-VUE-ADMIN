# Documentation Vue Admin

Une application web de gestion de documentation construite avec Vue 3, Vite et Tailwind CSS.

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API](#api)
- [Tests de performance](#tests-de-performance)
- [Déploiement](#déploiement)
- [Contribution](#contribution)

## 🔍 Aperçu

Ce projet est une plateforme de gestion centralisée pour organiser et distribuer de la documentation. L'application permet aux utilisateurs authentifiés de créer, modifier et supprimer des documents et catégories, tout en offrant une interface publique de consultation.

## ✨ Fonctionnalités

### Interface publique
- 📖 Consultation de la documentation par catégories
- 🔍 Recherche de documents par nom
- 📱 Interface responsive et moderne
- 🎨 Design avec animations et effets visuels

### Interface d'administration (authentifiée)
- 📝 Création et modification de documents
- 📂 Gestion des catégories
- 🗑️ Suppression avec confirmation
- 🔐 Authentification
- 📊 Gestion des états de publication (draft, published, archived)

### Fonctionnalités techniques
- ⚡ Application Vue 3 avec Composition API
- 🎯 Gestion d'état avec Pinia
- 🛣️ Routage avec Vue Router
- 🎨 Styling avec Tailwind CSS
- 📡 Requêtes HTTP avec Axios

## 🛠️ Technologies utilisées

### Frontend
- **Vue 3** (^3.5.12) - Framework JavaScript progressif
- **Vite** (^5.4.10) - Build tool moderne et rapide
- **Vue Router** (^4.4.5) - Routage côté client
- **Pinia** (^3.0.1) - Gestion d'état
- **Axios** (^1.7.7) - Client HTTP
- **Tailwind CSS** (^3.4.14) - Framework CSS utilitaire

### Outils de développement
- **PostCSS** & **Autoprefixer** - Traitement CSS
- **K6** - Tests de performance
- **ESLint** - Linting (via @vitejs/plugin-vue)

## 🏗️ Architecture

L'application suit une architecture modulaire avec séparation claire des responsabilités :

```
src/
├── components/          # Composants réutilisables
│   ├── Category/       # Gestion des catégories
│   ├── Documentation/  # Gestion des documents
│   ├── utils/          # Services et utilitaires
│   └── Login.vue       # Authentification
├── views/              # Vues et layouts
├── stores/             # Gestion d'état (Pinia)
├── router/             # Configuration des routes
└── assets/             # Ressources statiques
```

## 🚀 Installation

### Prérequis
- Node.js
- npm ou yarn
- API backend configurée (voir section Configuration)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <url-du-repository>
cd documentationVueAdmin
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer le fichier .env avec vos paramètres
```

4. **Lancer l'application en développement**
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_APIURL=http://localhost:3000
```

### Configuration de l'API

L'application nécessite une API backend avec les endpoints suivants :

#### Documentation
- `GET /api/documentation/` - Récupérer toutes les documentations
- `GET /api/documentation/:id` - Récupérer une documentation par ID
- `GET /api/documentation/category/:id` - Récupérer par catégorie
- `GET /api/documentation/search/:name` - Recherche par nom
- `POST /api/documentation/` - Créer une documentation
- `PUT /api/documentation/:id` - Modifier une documentation
- `DELETE /api/documentation/:id` - Supprimer une documentation

#### Catégories
- `GET /api/categories/` - Récupérer toutes les catégories
- `GET /api/categories/:id` - Récupérer une catégorie par ID
- `POST /api/categories/` - Créer une catégorie
- `PUT /api/categories/:id` - Modifier une catégorie
- `DELETE /api/categories/:id` - Supprimer une catégorie

#### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/auth/verify` - Vérification du token

## 📖 Utilisation

### Interface publique

1. **Navigation** : Utilisez la sidebar pour filtrer par catégories
2. **Recherche** : Tapez le nom d'un document dans la barre de recherche
3. **Consultation** : Cliquez sur un document pour accéder au lien externe

### Interface d'administration

1. **Connexion** : Accédez à `/login` et authentifiez-vous
2. **Création de documents** : Cliquez sur l'icône "+" dans la navbar
3. **Gestion des catégories** : Utilisez les icônes dans la sidebar
4. **Modification** : Cliquez sur "Update" sur un document/catégorie
5. **Suppression** : Cliquez sur "Remove" et confirmez

### États des documents

- **📝 Draft** : Document en cours de rédaction
- **📢 Published** : Document publié et visible
- **📦 Archived** : Document archivé

## 📁 Structure du projet

```
documentationVueAdmin/
├── public/
│   ├── logo/              # Logos des catégories
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css       # Styles Tailwind CSS
│   ├── components/
│   │   ├── Category/
│   │   │   ├── Category.vue           # Formulaire catégorie
│   │   │   └── ManageCategory.vue     # Gestion catégories
│   │   ├── Documentation/
│   │   │   └── DocumentationComponent.vue # Formulaire document
│   │   ├── utils/
│   │   │   ├── CategoryService.vue    # API catégories
│   │   │   ├── DocumentationService.vue # API documents
│   │   │   ├── api.js                 # Configuration Axios
│   │   │   └── auth.js                # Utilitaires auth
│   │   ├── Login.vue                  # Composant connexion
│   │   └── MainComponent.vue          # Composant principal
│   ├── views/
│   │   ├── NavbarView.vue             # Barre de navigation
│   │   ├── Sidebar.vue                # Barre latérale
│   │   ├── ModalComponent.vue         # Modal de confirmation
│   │   ├── FooterViews.vue            # Pied de page
│   │   └── CguView.vue                # CGU
│   ├── stores/
│   │   └── auth.js                    # Store d'authentification
│   ├── router/
│   │   └── index.js                   # Configuration routes
│   ├── test/
│   │   └── load.js                    # Tests de performance K6
│   ├── App.vue                        # Composant racine
│   └── main.js                        # Point d'entrée
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── index.html
├── sequence.md                        # Diagramme de séquence
└── README.md
```

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Preview de production

```bash
npm run preview
```

### Variables d'environnement de production

Assurez-vous de configurer `VITE_APIURL` pour pointer vers votre API.

## 📋 Scripts disponibles

```bash
npm run dev      # Développement avec hot-reload
npm run build    # Build de production
npm run preview  # Preview du build de production
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

Pour plus d'informations ou signaler des bugs, ouvrez une issue sur le repository du projet.