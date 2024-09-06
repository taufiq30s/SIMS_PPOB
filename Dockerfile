FROM node:20.8-alpine3.18

WORKDIR /app/src
COPY . .
RUN npm install --verbose && npm run build
WORKDIR /app
COPY package.json ./
RUN npm install --production --verbose && rm -r /app/src
ENV NODE_ENV=production

CMD [ "node", "build/index.js" ]
