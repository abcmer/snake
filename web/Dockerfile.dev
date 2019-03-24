FROM node:11-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app/package.json

RUN yarn install

COPY . /app

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]



