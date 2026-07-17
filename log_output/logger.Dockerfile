FROM node:20.19.0-alpine
WORKDIR /usr/src/app
COPY . .
CMD ["npm", "run", "logger"]