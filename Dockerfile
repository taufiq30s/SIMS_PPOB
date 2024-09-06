FROM node:20.8-alpine3.18 as base

WORKDIR /app
COPY package.json ./
WORKDIR /app/src
COPY . .
RUN npm install --verbose && npm run build
WORKDIR /app
RUN npm install --production --verbose && rm -r /app/src

CMD [ "node", "build/index.js" ]
