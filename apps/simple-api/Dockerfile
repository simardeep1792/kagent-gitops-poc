FROM node:26-alpine

ARG APP_VERSION=v1
ENV APP_VERSION=$APP_VERSION
ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./
COPY src ./src

USER node
EXPOSE 8080
CMD ["node", "src/server.js"]
