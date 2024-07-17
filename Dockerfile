# From https://github.com/docker-library/docs/blob/master/eclipse-temurin/README.md#using-a-different-base-image
FROM node:18.5.0-bullseye-slim AS build-node
ENV LANG=en_US.UTF-8
ENV JAVA_HOME=/opt/java/openjdk
COPY --from=eclipse-temurin:11 $JAVA_HOME $JAVA_HOME
ENV PATH="${JAVA_HOME}/bin:${PATH}"

RUN apt-get update && apt-get install -y git graphviz wget fonts-dejavu fontconfig make

ENV PLANTUML_VERSION=1.2022.6
RUN wget "https://github.com/plantuml/plantuml/releases/download/v$PLANTUML_VERSION/plantuml-$PLANTUML_VERSION.jar" -O $JAVA_HOME/lib/plantuml.jar

# Test plantuml can be loaded
RUN java -Djava.awt.headless=true -jar $JAVA_HOME/lib/plantuml.jar -version

RUN mkdir /app
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

WORKDIR /app
RUN yarn install
