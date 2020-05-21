# Use multistage builds to take node and npm binaries from another base image
FROM node:12.2.0-alpine AS build-node

FROM think/plantuml:1.2018.5
COPY --from=build-node /usr/local/bin/node /usr/local/bin/node
COPY --from=build-node /usr/local/lib/node_modules /usr/local/lib/node_modules

# Install Git
RUN apk update && apk upgrade && \
    apk add --no-cache git

# Move plantuml to a folder in the PATH
RUN mv /plantuml.jar "$JAVA_HOME/lib"

RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN npm i -g yarn

RUN mkdir /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN rm -rf node_modules/

# Install node dependencies
RUN yarn install

ENTRYPOINT []
