<h1 align="center">
  Wazo project documentation for developers
</h1>

This tool is aimed at generating http://developers.wazo.io from the files in [wazo-doc-ng](https://github.com/wazo-pbx/wazo-doc-ng).

# Installation

```sh
cp config{.sample,}.js

# edit it to set a github personnal access token with read access on `public_repo`.
# You can create one at https://github.com/settings/tokens
# Algolia credentials arn't mandatory to develop locally.
```

Then build the container:

```sh
make builder
```

## Develop

```sh
make develop
```

Then open `localhost:8000` your favorite browser.

## Building

```sh
make build
```

## Testing

```sh
yarn test
```

The documentation is built in the `public` folder, you can then run in it :

```sh
python -m SimpleHTTPServer
```

Then open `localhost:8000` your favorite browser.
