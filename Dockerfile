# Utilisation d'une image de Node.js pour construire l'application
FROM node:16-alpine AS builder

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY index.html  /usr/share/nginx/html/test

COPY nginx.conf /etc/nginx/

EXPOSE 9080

# Commande par défaut pour exécuter nginx
CMD ["nginx", "-g", "daemon off;"]