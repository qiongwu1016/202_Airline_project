# Stage 1
FROM node:14-slim

WORKDIR /frontend
COPY package.json .

RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080
CMD npm start