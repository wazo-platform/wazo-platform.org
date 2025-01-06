FROM satantime/puppeteer-node:22

RUN mkdir /app

COPY ./package.json /app
COPY ./yarn.lock /app

WORKDIR /app

# Install node dependencies
RUN yarn install --frozen-lockfile
