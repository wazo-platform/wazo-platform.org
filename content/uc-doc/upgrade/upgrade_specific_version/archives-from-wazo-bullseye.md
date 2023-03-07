---
title: Upgrade from Wazo > 23.05
---

Those procedures are valid if your Wazo installation is newer than 23.05

Example to upgrade to Wazo 23.06:

```shell
wazo-dist -a wazo-23.06
apt-get update
apt-get install wazo-upgrade/wazo-23.06
wazo-upgrade
wazo-dist -m pelican-bullseye
```

## My Wazo is stuck in a specific version

Procedures for upgrading to specific versions may freeze the version of your Wazo. Run the following
commands to get the latest updates:

```shell
wazo-dist -m pelican-bullseye
wazo-upgrade
```
