FROM node:16.19.0

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
