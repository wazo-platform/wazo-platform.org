# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Dependencies

- `node>=20.15.0`
- `yarn@4.3.1`
- `make`

Alternatively, using docker

- `docker`
- `docker-compose`(if docker version does not bundle `compose` subcommand)
- `make`

## Installation

Assuming [yarn is installed](https://yarnpkg.com/getting-started/install):

```
$ yarn
```

See also [docker-based development](#using-docker) as an alternative to installing the dependencies
directly.

## Local Development

```
$ yarn start
```

This command prepares the local development environment(e.g. symlinking the root `static` directory
in the current directory), starts a local docusaurus development server on port 3000 and opens up a
browser window. Most changes are reflected live without having to restart the server.

### Using docker

docker and docker compose may be used to provide an encapsulated development environment without the
need to directly install any project-specific dependencies.

The root [`Makefile`](../Makefile) wrap the relevant `docker` / `docker compose` invocations:

```
# from repository root
$ make beta/develop
```

This should suffice to build a docker image, deploy a docker container with the local directory
mounted as a volume, ensure the project dependencies are installed in the container and then start
the docusaurus development server inside that container, with port `3000` properly exposed to the
host. Then the live development website should be accessible through `http://localhost:3000`.

Note that this may not work on some platforms using Docker Desktop, such as macOS, because of volume
permission management issues(ref. https://github.com/docker/for-mac/issues/6257).

## Build

```
$ yarn build
```

This command prepares the local environment(e.g. symlinking the root `static` directory to the
current directory), generates static content into the `build` directory and can be served using any
static contents hosting service.

## Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and
push to the `gh-pages` branch.
