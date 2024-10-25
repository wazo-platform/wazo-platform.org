---
title: Wazo Guidelines
---

## Inter-process communication

Our current goal is to use only two means of communication between Wazo processes:

- a REST API over HTTP for synchronous commands
- a software bus (RabbitMQ) for asynchronous events

Each component should have its own REST API and its own events and can communicate with every other
component from across a network only via those means.

## Service API

The API is split between different resources available in Wazo, such as users, groups, schedules...
For each resource, there are different modules :

- service: the public module, providing possible actions. It contains only business logic and no
  technical logic. There must be no file name, no SQL queries and no URLs in this module.
- dao: the private Data Access Object. It knows where to get data and how to update it, such as SQL
  queries, file names, URLs, but has no business logic.
- model: the public class used to represent the resource. It must be self-contained and have almost
  no methods, except for computed fields based on other fields in the same object.
- notifier: private, it knows to whom and in which format events must be sent.
- validator: private, it checks input parameters from the service module.

## Definition of a Wazo Daemon

The goal is to make Wazo as elastic as possible, i.e. the Wazo services need to be able to run on
separate machines and still talk to each other.

To be in accordance with our goal, a Wazo daemon must (if applicable):

- Offer a REST API (with encryption, authentication and accepting cross-site requests)
- Be able to read and send events on a software bus
- Be able to run inside a container, such as Docker, and be separated from the Wazo server
- Offer a configuration file in YAML format.
- Manage its own database
- Have a configurable level of logging
- Have its own log file
- Be extendable through the use of plugins
- Not run with system privileges
- Be installable from source
- Service discovery with consul

## Database

### Adding a Migration Script

The database migration is handled by [alembic](https://alembic.readthedocs.org).

#### Example

The migration scripts can be found in the
[xivo-manage-db](https://github.com/wazo-platform/xivo-manage-db) repository.

On the Wazo Platform, they are located in the `/usr/share/xivo-manage-db` directory.

To add a new migration script from your developer machine, go into the root directory of the
xivo-manage-db repository. There should be an `alembic.ini` file in this directory. You can then use
the following command to create a new migration script:

```
alembic revision -m "<description>"
```

This will create a file in the `alembic/versions` directory, which you'll have to edit.

When the migration scripts are executed, they use a connection to the database with the role/user
`asterisk`. This means that new objects that are created in the migration scripts will be owned by
the `asterisk` role and it is thus not necessary (nor recommended) to explicitly grant access to
objects to the asterisk role (i.e. no `GRANT ALL` command after a `CREATE TABLE` command).

## Wazo Package File Structure

### Package naming

Let's assume we want to organise the files for wazo-confd.

- Git repo name: `wazo-confd`
- Executable file name: `wazo-confd`
- Python package name: `wazo_confd`

```
    wazo-confd
    |-- bin
    |   `-- wazo-confd
    |-- contribs
    |   `-- docker
    |       |-- ...
    |       `-- prod
    |           `-- ...
    |-- debian
    |   `-- ...
    |-- Dockerfile
    |-- docs
    |   `-- ...
    |-- etc
    |   `-- ...
    |-- integration-tests
    |   `-- ...
    |-- LICENSE
    |-- README.md
    |-- requirements.txt
    |-- setup.cfg
    |-- setup.py
    |-- test-requirements.txt
    |-- .travis.yml
    `-- wazo_confd
        `-- ...
```

#### Sources

- `etc/`: Contains default configuration files.
- `integration_tests/`: Contains the tests bigger than unit-tests. Tests should be runnable simply,
  e.g. `pytest integration_tests`.
- `README.md`: Read me in markdown (Github flavor).
- `LICENSE`: License (GPLv3)

#### Python

Standard files:

- `setup.py`
- `setup.cfg`
- `requirements.txt`
- `test-requirements.txt`
- `wazo_confd/` (the main sources)

#### Debian

- `debian/`: Contains the Debian packaging files (`control`, `rules`, ...)

#### Docker

- `Dockerfile`: Used to build a docker image for a working production version
- `contribs/docker/prod/`: Contains the files necessary for running wazo-confd inside a production
  Docker image
- `contribs/docker/other/`: Contains the Dockerfile and other files to run wazo-confd inside Docker
  with specific configuration

### File naming

- Config file: `/etc/wazo-confd/config.yml`
- Log file: `/var/log/wazo-confd.log`
- Static data files: `/usr/share/wazo-confd`
- Storage data files: `/var/lib/wazo-confd`

Some Wazo daemons may not meet all these expectations; it is a work in progress.
