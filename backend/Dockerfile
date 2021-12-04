FROM node:14-slim

WORKDIR /backend

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "server.js" ]