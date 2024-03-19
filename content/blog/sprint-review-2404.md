---
title: Wazo Platform 24.04 Released
date: 2024-03-13T15:40:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2404
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.04 release.

## New Features This Release
- **Translations**: Added french translations to wazo-ui, it now supports english and french

## Bug Fixes
- **Websocket**: Fixed a bug where a user could miss some events when its authentication token expired

## Technical
- **Documentation**: The phonebook configuration documentation has been improved to allow an administrator to create a phonebook and add it to the directory service to make it available to its users
- **Scalability**: A load issue during dialplan reloads has been fixed reducing the load on RabbitMQ

## Ongoing Features
- **Provisioning Server**: wazo-provd is being modified to use Postgresql as it datastorage instead using json files on the file system
- **Parking Lot**: new API to control call parking features

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.04).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-04)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-04)
- [Wazo Platform 24.04 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.04)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-04-released).
