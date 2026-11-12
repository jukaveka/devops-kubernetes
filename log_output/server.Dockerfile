FROM node:20.19.0-alpine
WORKDIR /usr/src/app
COPY package* .
RUN npm ci
COPY . .
EXPOSE 3003
CMD ["./startup.sh"]