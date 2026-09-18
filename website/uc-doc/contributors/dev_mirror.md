---
title: Development Mirror
---

The development mirror is the Debian repository where packages built from the `master` branches of
the Wazo Platform repositories are published. It lets you run and test the code that will become the
next release, before that release exists.

:::warning

The development mirror is for test and development environments only. Never point a production
system at it: builds are published continuously, they are not a coordinated release, and there is no
supported way back to the production mirror.

:::

## Distributions {#distributions}

All Wazo distributions are served from `https://mirror.wazo.community/debian/`, one APT suite per
channel. The suite name ends with the Debian release it is built for, so it must match the Debian
version running on your machine (`bookworm` for Debian 12).

| Suite               | Channel             | Contents                                              |
| ------------------- | ------------------- | ----------------------------------------------------- |
| `wazo-dev-bookworm` | Development         | Every build from `master`, published as merges happen |
| `wazo-rc-bookworm`  | Release candidate   | Builds under validation for the upcoming release      |
| `pelican-bookworm`  | Production (stable) | The current released version                          |

Older Debian releases have their own suites (`wazo-dev-bullseye`, `pelican-bullseye`, and so on),
and past releases are frozen under `https://mirror.wazo.community/archive/` as `wazo-<version>`
suites.

Only the `amd64` architecture is published.

The version currently on each channel is exposed as a plain text file:

```shell
curl https://mirror.wazo.community/version/unstable   # development, e.g. 26.09
curl https://mirror.wazo.community/version/stable     # production, e.g. 26.08
```

## Switching an existing installation {#switching-an-existing-installation}

Use [wazo-dist](/uc-doc/administration/cli_tools#wazo-dist) to switch the sources, then upgrade:

```shell
wazo-dist -m wazo-dev-bookworm
wazo-upgrade
```

## Installing directly on the development version {#installing-directly-on-the-development-version}

A fresh install from `wazo-ansible` uses the development mirror by default — that is what you get
when you clone the repository and run the playbook without checking out a release tag. The
[installation guide](/uc-doc/installation) describes the extra steps needed to install the stable
version instead, so if you want a development platform, simply skip them.
