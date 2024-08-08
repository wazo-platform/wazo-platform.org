---
title: Wazo Platform 24.11 Released
date: 2024-08-07T13:54:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2411
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.11 release.

## New Features in This Release

- **API**: The API to manage calls are now tenant-aware
- **Authentication**: Users can now login using the SAML2 protocol, allowing login with centralized credentials like Microsoft Entra or Google authentication.

## Technical

- **Asterisk**: Asterisk has been upgraded to 21.4.1 See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-21-4-1-now-available/)
- **Logs**: Wazo services do not duplicate their logs to `daemon.log` and `syslog` anymore, which used more disk space than necessary. Wazo logs are still available in per-service log files and `systemd` logs.

## Ongoing Features

- **wazo-provd**: The storage of wazo-provd is being rewritten to use Postgresql instead of json files on the filesystem

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.11).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-11)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-11)
- [Wazo Platform 24.11 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.11)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-11-released).
