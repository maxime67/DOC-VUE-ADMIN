FROM node:20 AS build

WORKDIR /app

# Copie package.json et install
COPY package*.json ./
RUN npm install

# Copie tout le code
COPY . .

# Build l'application
RUN npm run build

# Stage production
FROM httpd:2.4

# Copie les fichiers buildés
COPY --from=build /app/dist /usr/local/apache2/htdocs/

EXPOSE 80