FROM node

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

ENV port 3000
ENV host "0.0.0.0"
ENV dbHost "postgres_container"
ENV dbName "postgres"
ENV dbUser "postgres"
ENV dbPassword "docker"
ENV dbPort 5432

EXPOSE ${port}

CMD ["node", "./node/server.js"]