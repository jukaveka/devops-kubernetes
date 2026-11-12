FROM node:22.14.0-alpine
WORKDIR /usr/src/app
COPY package* .
RUN npm ci
COPY . .
CMD ["npm", "start"]
