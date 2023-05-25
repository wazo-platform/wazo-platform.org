FROM satantime/puppeteer-node:16

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app

WORKDIR /app

# Install node dependencies
RUN yarn install --frozen-lockfile
