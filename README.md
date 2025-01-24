# SwenShares Frontend 🖥️

## Description
SwenShares Frontend est l'interface utilisateur de la plateforme SwenShares, offrant une expérience utilisateur intuitive et réactive pour la gestion des relations avec les actionnaires. Il interagit avec le backend via une API RESTful pour fournir une solution complète de SHRM.

## Fonctionnalités principales
- Interface utilisateur pour la gestion des actionnaires
- Visualisation et gestion des transactions d'actions
- Portail actionnaire personnalisé
- Tableaux de bord et rapports interactifs
- Diffusion d'offres d'achat et de vente d'actions

## Technologies utilisées
- Nodejs 
- Angular
- TypeScript
- RxJS
- Angular Material (pour les composants UI)
- Chart.js (pour les graphiques et visualisations)

## Installation 💻

### Prérequis
- Node.js (version 14 ou supérieure)
- npm (généralement installé avec Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Étapes d'installation

1. Clonez le dépôt :
   ```bash
   git clone https://gitlab.com/digital-performance/swensharesfront.git
   cd SwenSharesFront

   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

## Exécution du projet

1. Lancez le serveur de développement :
   ```bash
   ng serve
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:4200`

## Structure du projet
```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── guards/
│   ├── assets/
│   └── environments/
├── angular.json
└── package.json
```

## Développement

### Génération de nouveaux composants
```bash
ng generate component nom-du-composant
```

### Génération de nouveaux services
```bash
ng generate service nom-du-service
```

### Exécution des tests unitaires
```bash
ng test
```

### Exécution des tests end-to-end
```bash
ng e2e
```

## Déploiement
Pour construire le projet pour la production :
```bash
ng build --prod
```

Les fichiers de build seront stockés dans le répertoire `dist/`.

## Contributeurs
### Asse Badiane
 - Développeur principal.
### Omar Diop
 - Développeur principal.
### AL Amine MBENGUE
 - Développeur principal.
### Alioune Badara Nguirane
 - Développeur principal.
### Moussa Tamba
 - Développeur principal.

### Mamour Dioum
 - Chef et responsable du Projet.

## Contribution
Nous accueillons avec plaisir les contributions ! Pour contribuer :
1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFeature`)
3. Committez vos changements (`git commit -m 'Ajout d'une nouvelle feature'`)
4. Poussez vers la branche (`git push origin feature/NouvelleFeature`)
5. Ouvrez une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Prêt à offrir une expérience utilisateur exceptionnelle pour la gestion des relations actionnaires avec SwenShares Frontend ! 🎨✨