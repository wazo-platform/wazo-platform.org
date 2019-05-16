<h1 align="center">
  Wazo project documentation for developers
</h1>

# Installation

```sh
cp config{.sample,}.js

# edit it to set a github personnal access token with read access on `public_repo`.
# You can create one at https://github.com/settings/tokens
```

Then build the container:

```sh
make install
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

The documentation is built in the `public` folder, you can then run in it :

```sh
python -m SimpleHTTPServer
```

Then open `localhost:8000` your favorite browser.
