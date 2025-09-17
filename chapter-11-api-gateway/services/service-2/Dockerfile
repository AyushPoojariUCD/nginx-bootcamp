FROM node:18-alpine

WORKDIR /usr/src/app

COPY service-2.js .

RUN npm init -y && npm install express

CMD ["node", "service-2.js"]
