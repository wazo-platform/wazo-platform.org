# From https://github.com/docker-library/docs/blob/master/eclipse-temurin/README.md#using-a-different-base-image
FROM node:20.15.0-bullseye-slim AS build-node
ENV LANG=en_US.UTF-8

RUN apt-get update && apt-get install -y git graphviz wget fonts-dejavu fontconfig make

WORKDIR /app

COPY ./website/package.json /app/package.json
COPY ./website/yarn.lock /app/yarn.lock

RUN corepack enable && yarn install
