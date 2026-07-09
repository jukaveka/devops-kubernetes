FROM node:22.14.0-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . .
CMD ["node", "index.js"]
