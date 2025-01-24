# Dockerfile pour le frontend Angular
FROM node:20-alpine

WORKDIR /usr/src/app

# Copier les fichiers de configuration npm
COPY package*.json ./

# Installer les dépendances
RUN npm install
RUN npm install -g @angular/cli  

# Copier le reste des fichiers
COPY . .

# Exposer le port de l'application Angular
EXPOSE 4200


# Démarrer l'application avec Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]


