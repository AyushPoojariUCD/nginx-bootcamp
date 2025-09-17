FROM node:18-alpine

WORKDIR /usr/src/app

COPY server.js .

RUN npm init -y && npm install express

CMD ["node", "server.js"]
