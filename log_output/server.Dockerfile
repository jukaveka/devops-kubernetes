FROM node:20.19.0-alpine
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
CMD ["npm", "start"]