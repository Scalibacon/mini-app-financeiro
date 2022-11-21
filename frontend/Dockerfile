FROM node:16 as base

WORKDIR /usr/src/app

COPY frontend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev"]
