---
title: 'Upgrade from Wazo \> 19.12'
---

-   [Upgrade to Wazo \> 19.12](#upgrade-to-wazo-19.12)
-   [My Wazo is stuck in a specific
    version](#my-wazo-is-stuck-in-a-specific-version)

Those procedures are valid if your Wazo installation is newer than 19.12

Upgrade to Wazo \> 19.12
========================

Example to upgrade to Wazo 19.13:

    wazo-dist -a wazo-19.13
    apt-get update
    apt-get install wazo-upgrade/wazo-19.13
    wazo-upgrade
    wazo-dist -m pelican-buster

My Wazo is stuck in a specific version
======================================

Procedures for upgrading to specific versions may freeze the version of
your Wazo. Run the following commands to get the latest updates:

    wazo-dist pelican-buster
    wazo-upgrade
