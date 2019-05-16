FROM think/plantuml:1.2018.5

RUN apk add --update nodejs nodejs-npm yarn

RUN mkdir /app
COPY . /app

WORKDIR /app

# Install node dependencies
RUN yarn

ENTRYPOINT []
