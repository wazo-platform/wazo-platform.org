---
title: Development Mirror
---

The development mirror is the Debian repository where packages built from the `master` branches of
the Wazo Platform repositories are published. It lets you run and test the code that will become the
next release, before that release exists.

:::warning

The development mirror is for test and development environments only. Never point a production
system at it: builds are published continuously, they are not a coordinated release, and there is no
supported way back to the production mirror (see
[Going back to production](#going-back-to-production)).

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
curl https://mirror.wazo.community/version/oldstable  # previous production, e.g. 26.07
```

## Switching an existing installation {#switching-an-existing-installation}

Use [wazo-dist](/uc-doc/administration/cli_tools#wazo-dist) to switch the sources, then upgrade:

```shell
wazo-dist -m wazo-dev-bookworm
apt update
wazo-upgrade
```

`wazo-dist` rewrites `/etc/apt/sources.list.d/wazo-dist.list` with a single `deb` line for the
requested suite. `-m` selects the main repository (`/debian/`), `-a` selects the archive
(`/archive/`). To check which mirror a machine is on:

```shell
cat /etc/apt/sources.list.d/wazo-dist.list
```

## Installing directly on the development version {#installing-directly-on-the-development-version}

A fresh install from `wazo-ansible` uses the development mirror by default — that is what you get
when you clone the repository and run the playbook without checking out a release tag. The
[installation guide](/uc-doc/installation) describes the extra steps needed to install the stable
version instead, so if you want a development platform, simply skip them.

## Reading development version numbers {#reading-development-version-numbers}

Packages on the development mirror carry a build-specific version instead of a plain release number:

```
26.09~20260813.160347.4086b2e4.deb12
```

- `26.09` — the release this build is heading towards
- `20260813.160347` — the UTC date and time of the build
- `4086b2e4` — the short Git commit the build was made from, so you can trace a package back to the
  code it contains
- `deb12` — the Debian release it was built for

The `~` matters: in Debian version ordering, `26.09~<anything>` sorts _before_ the final `26.09`.
Once 26.09 is released, a machine on the development mirror upgrades onto it cleanly rather than
being stuck at a higher version.

Because each package is built and published when its own repository is merged, the packages
available at a given moment do not all come from the same point in time. A dev platform is a
snapshot of many branches, not a release.

## Going back to production {#going-back-to-production}

Switching from the development mirror back to `pelican-bookworm` is **not** a supported operation.
The installed packages are more recent than the ones on the production mirror, so APT will not
replace them, and the database migrations already applied by `wazo-upgrade` are not reversible.

Reinstall from scratch, or restore a snapshot taken before the switch. Taking a virtual machine
snapshot before moving a platform to the development mirror is strongly recommended.

## Troubleshooting {#troubleshooting}

**`404 Not Found` on `apt update`** — the suite name probably does not match the Debian release
installed on the machine. Check `cat /etc/os-release` and use the matching suite.

**Invalid signature / `EXPKEYSIG`** — the mirror signing key is missing or expired on the machine.
See the [upgrade troubleshooting section](/uc-doc/upgrade#troubleshooting).
