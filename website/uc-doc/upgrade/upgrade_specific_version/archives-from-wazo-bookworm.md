---
title: Upgrade from Wazo > 25.14
---

Those procedures are valid if your Wazo installation is newer than 25.14

Example to upgrade to Wazo 25.16:

```shell
wazo-dist -a wazo-25.16
apt-get update
apt-get install wazo-upgrade/wazo-25.16
wazo-upgrade
wazo-dist -m pelican-bookworm
```

## My Wazo is stuck on a specific version

The procedure for upgrading to specific version may freeze the version of your Wazo. Run the
following commands to get the latest version:

```shell
wazo-dist -m pelican-bookworm
wazo-upgrade
```
