FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3000
# ENV DBPORT 5432

EXPOSE ${PORT}
# EXPOSE ${DBPORT}

CMD ["node", "./node/server.js"]