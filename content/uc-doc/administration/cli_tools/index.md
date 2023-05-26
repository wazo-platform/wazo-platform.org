---
title: CLI Tools
---

Wazo comes with a collection of console (CLI) tools to help administer the server.

## System-wide tools

### wazo-debug

`wazo-debug` is used to collect data about the system, either live or not. It then packages the
collected data into a single tarball ready for analysis. Be careful before sharing this tarball, it
contains sensitive data!

See `wazo-debug --help` for a list of available operations.

### wazo-dist {#wazo-dist}

wazo-dist is the wazo repository sources manager. It is used to switch between distributions
(production, development, release candidate, archived version). Example use cases :

- switch to production repository : `wazo-dist -m pelican-bullseye`
- switch to development repository : `wazo-dist -m wazo-dev-bullseye`
- switch to release candidate repository : `wazo-dist -m wazo-rc-bullseye`
- switch to an archived version's repository: `wazo-dist -a wazo-18.02`

### wazo-dist-upgrade

`wazo-dist-upgrade` is used to upgrade Wazo when a major Debian upgrade is required, e.g. upgrading
from Wazo Platform 23.05 (Debian Buster) to Wazo Platform 23.06 (Debian Bullseye).
`wazo-dist-upgrade` can only be used when a Debian upgrade is required. Standard upgrades are done
with `wazo-upgrade`.

### wazo-reset {#wazo-reset}

wazo-reset is a tool to reset some of the state of a Wazo installation to a pre-wizard state. It
does not try to reset everything and will _not_ give the same result as a fresh new Wazo
installation. For example, all customizations that you have made that are not stored in the database
(e.g. installing Debian packages, adding custom configuration files, etc.), will not be reset. This
tool should be used with extra care.

After using it, you need to pass the wizard once again.

### wazo-service

`wazo-service` is used to control and print the status of the Wazo services.

### wazo-upgrade

`wazo-upgrade` is used to upgrade Wazo to a later version. To upgrade to a later major Debian
version, you have to use `wazo-dist-upgrade`.

## Service-specific tools

### wazo-agentd-cli

`wazo-agentd-cli` is a command-line interface to interact with the REST API of `wazo-agentd`. It
provides mainly agent-related features.

`wazo-agentd-cli` has an interactive REPL mode. You can access it with the command
`wazo-agentd-cli`. It should prompt you for a password that is empty by default. Once in the
interactive mode, enter `help` for a list of available operations.

### wazo-auth-cli

`wazo-auth-cli` is a command-line interface to interact with the REST API of `wazo-auth`. It
provides mainly authentication-related features.

See `wazo-auth-cli --help` for a list of available operations.

### wazo-plugind-cli

`wazo-plugind-cli` is a command-line interface to interact with the REST API of `wazo-plugind`. It
provides mainly plugin-related features.

See `wazo-plugind-cli --help` for a list of available operations.

### wazo-provd-cli

`wazo-provd-cli` is a command-line interface to interact with the REST API of `wazo-provd`. It
provides mainly provisioning-related features.

`wazo-provd-cli` has an interactive REPL mode. You can access it with the command `wazo-provd-cli`.
It should prompt you for a password that is empty by default. Once in the interactive mode, enter
`help` for a list of available operations.
