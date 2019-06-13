FROM alekzonder/puppeteer

COPY ./package.json /app
#COPY ./yarn.lock /app

WORKDIR /app

# Install node dependencies
RUN yarn install
