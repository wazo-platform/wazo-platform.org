FROM node:20.15.0-bullseye-slim AS build-node
ENV LANG=en_US.UTF-8

WORKDIR /app

COPY ./website/package.json /app/package.json
COPY ./website/yarn.lock /app/yarn.lock

RUN corepack enable && yarn install
