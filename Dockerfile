FROM node:lts-alpine3.16

ENV PORT=3000

WORKDIR /app

copy package.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD ["node", "app.js"]