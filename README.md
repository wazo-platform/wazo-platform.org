# Wazo Platform website

This repo contains the source and building scripts for generating http://www.wazo-platform.org/.

## Content change

The content is authored using [the markdown language](https://en.wikipedia.org/wiki/Markdown) in [the content
directory](content). The build process is done using [Gatsby](https://www.gatsbyjs.org/).

## Installation

Build the builder container:

```sh
make builder
cp config.sample.js config.js  # the config.js file must exist
```

In `config.js`, you can configure the Algolia credentials used for the search engine. If left empty, the search engine will be disabled.

## Develop

```sh
[CORPORATE=1] make develop
```

Then open http://localhost:8000 in your favorite browser.

## Building

```sh
[CORPORATE=1] make build
```

The documentation is built in the `public/` folder, you can then run a simple HTTP server:

```sh
cd public/
python3 -m http.server
```

Then open http://localhost:8000 in your favorite browser.


## Testing

```sh
make test
```
foobar
