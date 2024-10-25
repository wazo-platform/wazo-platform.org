---
title: Upgrade from Wazo > 19.12
---

Those procedures are valid if your Wazo installation is newer than 19.12

Example to upgrade to Wazo 19.13:

```shell
wazo-dist -a wazo-19.13
apt-get update
apt-get install wazo-upgrade/wazo-19.13
wazo-upgrade
wazo-dist -m pelican-buster
```

## My Wazo is stuck in a specific version

Procedures for upgrading to specific versions may freeze the version of your Wazo. Run the following
commands to get the latest updates:

```shell
wazo-dist -m pelican-buster
wazo-upgrade
```
