# Étape 1 : Créez l'image de build
FROM node:14 AS build

# Répertoire de travail
WORKDIR /app

# Copiez les fichiers de package.json et de package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez les fichiers de l'application
COPY . .

# Compilez l'application Angular en mode production
RUN npm run build --prod

# Étape 2 : Créez l'image finale
FROM nginx:alpine

# Copiez les fichiers de build de l'étape précédente
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exposez le port 80 pour le serveur web NGINX
EXPOSE 80

# Commande pour démarrer le serveur NGINX
CMD ["nginx", "-g", "daemon off;"]