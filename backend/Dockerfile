FROM node:16 as base

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npx prisma migrate dev --name init

CMD [ "npm", "run", "dev"]
