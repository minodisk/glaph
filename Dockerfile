FROM circleci/node:10.13-browsers

USER root
RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
