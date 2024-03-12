# Utilisation d'une image de Node.js pour construire l'application
FROM node:14-alpine AS builder

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json dans le répertoire de travail
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie des fichiers de l'application dans le répertoire de travail
COPY . .

# Exécution de la construction de l'application avec webpack
RUN npm run build

# Utilisation d'une image légère pour le déploiement
FROM nginx:stable-alpine

# Copie des fichiers de build de l'application depuis le premier étage
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposition du port 8080 pour accéder à l'application via HTTP
EXPOSE 8080

# Commande par défaut pour exécuter nginx
CMD ["nginx", "-g", "daemon off;"]