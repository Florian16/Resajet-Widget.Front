# Utilisation d'une image de Node.js pour construire l'application
FROM node:16-alpine AS builder

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Utilisation d'une image Nginx pour servir l'application
FROM nginx:1.17-alpine

# Copier les fichiers de construction dans l'image Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

COPY fichiers /var/www/html/fichiers

COPY nginx.conf /etc/nginx/

# Installer curl pour le healthcheck
RUN apk --no-cache add curl

EXPOSE 9080

# Ajouter une directive HEALTHCHECK
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl --fail http://localhost:9080/ || exit 1

# Commande par défaut pour exécuter nginx
CMD ["nginx", "-g", "daemon off;"]