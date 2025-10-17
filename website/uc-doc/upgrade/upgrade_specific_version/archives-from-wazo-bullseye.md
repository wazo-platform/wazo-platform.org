---
title: Upgrade from Wazo > 23.05
---

Those procedures are valid if your Wazo installation is newer than 23.05

Example to upgrade to Wazo 23.07:

```shell
wazo-dist -a wazo-23.07
apt-get update
apt-get install wazo-upgrade/wazo-23.07
wazo-upgrade
wazo-dist -m pelican-bullseye
```

## My Wazo is stuck on a specific version

The procedure for upgrading to specific version may freeze the version of your Wazo. Run the
following commands to get the latest version:

```shell
wazo-dist -m pelican-bullseye
wazo-upgrade
```
