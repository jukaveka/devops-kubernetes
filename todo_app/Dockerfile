FROM node:22.14.0-alpine
WORKDIR /usr/src/app
COPY package* .
RUN npm install
COPY . .
CMD ["node", "index.mjs"]
