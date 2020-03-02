---
title: Wazo Package File Structure
---

-   [Package naming](#package-naming)
    -   [Sources](#sources)
    -   [Python](#python)
    -   [Debian](#debian)
    -   [Docker](#docker)
-   [File naming](#file-naming)

Package naming
==============

Let\'s assume we want to organise the files for wazo-confd.

-   Git repo name: `wazo-confd`
-   Binary file name: `wazo-confd`
-   Python package name: `wazo_confd`

<!-- -->

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

Sources
-------

`etc/`

:   Contains default configuration files.

`docs/`

:   Contains technical documentation for this package: API doc,
    architecture doc, diagrams, \... Should be in RST format using
    Sphinx.

`bin/`

:   Contains the binaries. Not applicable for pure libraries.

`integration_tests/`

:   Contains the tests bigger than unit-tests. Tests should be runnable
    simply, e.g. `nosetests integration_tests`.

`README.md`

:   Read me in markdown (Github flavor).

`LICENSE`

:   License (GPLv3)

`.travis.yml`

:   Travis CI configuration file

Python
------

Standard files:

-   setup.py
-   setup.cfg
-   requirements.txt
-   test-requirements.txt
-   wazo\_confd/ (the main sources)

Debian
------

`debian/`

:   Contains the Debian packaging files (`control`, `rules`, \...)

Docker
------

`Dockerfile`

:   Used to build a docker image for a working production version

`contribs/docker/prod/`

:   Contains the files necessary for running wazo-confd inside a
    production Docker image

`contribs/docker/other/`

:   Contains the Dockerfile and other files to run wazo-confd inside
    Docker with specific configuration

File naming
===========

-   PID file: `/run/wazo-confd/wazo-confd.pid`
-   WSGI socket file: `/run/wazo-confd/wazo-confd.sock`
-   Config file: `/etc/wazo-confd/config.yml`
-   Log file: `/var/log/wazo-confd.log`
-   Static data files: `/usr/share/wazo-confd`
-   Storage data files: `/var/lib/wazo-confd`
