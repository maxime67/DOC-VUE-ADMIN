FROM node:18 AS build

WORKDIR /app

# Copie les fichiers de configuration
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le code source
COPY . .

# Build l'application
RUN npm run build

# Stage de production
FROM httpd:2.4

# Copie les fichiers buildés
COPY --from=build /app/dist /usr/local/apache2/htdocs/

EXPOSE 80