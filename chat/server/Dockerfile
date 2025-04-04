FROM node:18-alpine

WORKDIR /usr/src/app

# Copia i file del server
COPY server/package*.json ./
RUN npm install

# Copia tutto il contenuto del server
COPY server/ .

# Crea directory client e copia i file
RUN mkdir -p /usr/src/app/client
COPY client/ /usr/src/app/client/

EXPOSE 3000
CMD ["node", "app.js"]