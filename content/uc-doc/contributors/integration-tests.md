# integration tests
This document describes the conventional setup for per-component integration tests in wazo projects.

## Requirements
The integration tests rely directly on docker(or an equivalent drop-in) and docker-compose, 
and assume that functional `docker-compose`[^1] and `docker`[^2] commands are available in the environment.

Required python dependencies are made available in the [test-requirements.txt](./test-requirements.txt) file, 
which can(and should) be installed into a specific virtual environment.

## Structure
(As a general guide on conventional project structure, see also [Wazo daemon file structure](https://github.com/wazo-platform/wazo-notebook/blob/master/file-structure.md) 

All files related to integration tests should be present under an `integration_tests` directory directly below a project root directory.
`integration_tests/assets` should contain docker-compose yaml files as well as configuration and static assets required for tests at runtime(usually mounted as volumes configured in the compose files).
`integration_tests/docker` should contain custom dockerfiles and other files required to build images for the test setup(referenced in compose files). 
`integration_tests/suite` should contain the actual python tests definitions, including any custom helpers and utilities.
`integration_tests/test-requirements.txt` (or a differently named pip requirements file) should contain all python requirements required for the test environment, such as the test runner, and other tools and libraries used by the tests.
`integration_tests/Makefile` should exist and define an interface to interact with the test setup using the `make` utility.

## Running tests

A tox interface should be available, enabling integration tests to be executed from the project root directory through
```shell
tox -e integration
```
tox takes care of creating the virtual environment containing the dependencies for the tests.

The `integration_tests/Makefile` should define a target `test-setup` to prepare the test environment(e.g. build docker images),
and a `test` target to run the tests. Those targets can be used directly, and should be used by the tox `integration` environment.
To run the tests without tox from the `integration_tests` directory:
```shell
# make test dependencies available in a virtual environment
python3 -m venv .venv && pip install -r test-requirements.txt
source .venv/bin/activate
make test-setup
make test
```

### pytest

The tests suites usually use `pytest`[^3] as a test runner and framework, which should be made available through the test python requirements file.

For example, to run a single test file and all tests contained:
```
pytest suite/test_confgen.py
```
To run all tests:
```
pytest suite/
```
and to run only tests matching a specific marker and a specified name pattern:
```
pytest -m 'critical' -k 'pjsip_conf' suite/
```

## Docker
The tests rely on a containerized deployment of the codebase under test.
The container image for the codebase can be built using the a dockerfile available in the `integration_tests/docker` directory. 

Current conventions prescribe the pattern `Dockerfile-$component` for the name of the dockerfiles, where `$component` might be a short name descriptive of the purpose of the image(e.g. `Dockerfile-confgend` for a image for the confgend codebase).

`make` targets should be defined in the `integration_tests/Makefile` to encapsulate the recipe for building each image required for the tests.
Those targets should be referenced as pre-requirements in the `test-setup` target.


To build the images directly, a docker invocation similar to the following can be run 
from the `integration_tests` directory:
```shell
docker build -f docker/$dockerfile -t wazoplatform/$projectname:local ..
```
(the tag given with `-t` must match the image name expected by the corresponding service descriptions in the docker-compose files).

To test that the image is functional:
```shell
docker run --rm -it -v $(readlink ..):/usr/local/src/$projectname wazoplatform/$projectname:local
```
(note this will mount the project root directory as a volume to provide in-development source code for testing).
This should start a container from the built image, which should run the component entrypoint(usually a daemon implemented by the codebase).

Once the image is made available locally, the docker-compose configurations should be able to use it and pull any other required images from the relevant registries.


## docker-compose
The wazo test framework used by the test code takes care of controlling `docker-compose` to bring up the services required by the tests.
The `docker-compose` command can be used directly to debug and manually interact with the test setup.

The docker-compose *stack*(all services and resources managed by docker-compose) is defined through multiple compose files.
A base `docker-compose.yml` file is combined with override files which can offer different configuration profiles for the test environment.
At a minimum, a `docker-compose.base.override.yml` would define the settings for a default "baseline" test environment.

To deploy the docker-compose stack for the base environment,
```shell
docker-compose -f assets/docker-compose.yml -f assets/docker-compose.base.override.yml up
```
Then to stop the services and cleanup active resources managed by docker-compose:
```shell
docker-compose -f assets/docker-compose.yml -f assets/docker-compose.base.override.yml down
```
To run a specific service and its dependencies:
```shell
docker-compose -f assets/docker-compose.yml -f assets/docker-compose.base.override.yml run $service
```
To execute a command inside the container environment of a specific service already deployed:
```shell
docker-compose -f assets/docker-compose.yml -f assets/docker-compose.base.override.yml exec $service $command
```

### denv
[denv](https://github.com/wazo-platform/denv) is a utility to simplify the usage patterns of docker-compose for integration tests.


[^1]: https://docs.docker.com/compose/
[^2]: https://docs.docker.com/
[^3]: https://docs.pytest.org/en/7.2.x/
