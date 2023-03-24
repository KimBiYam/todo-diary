FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src /app/src

RUN npm install
RUN npm run build

CMD ["npm", "run" , "start:prod"]