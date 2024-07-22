---
title: Wazo Platform 22.08 Released
date: 2022-06-06T13:00:00
author: The Wazo Authors
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2208
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.08 release.

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 18.12.1. See the Asterisk release announcement for [18.12.0](https://www.asterisk.org/asterisk-news/asterisk-18-12-1-now-available/) and [18.12.1](https://www.asterisk.org/asterisk-news/asterisk-18-12-1-now-available/)

## Ongoing Features

- **Authentication**: Improve the LDAP authentication source by identifying tenants by domain name
- **Bullseye**: Modernizing some old services to facilitate transition to Python 3 and Debian Bullseye
- **Scalability**: Consume events from the bus instead of the Asterisk websocket. This will improve the performance of Wazo and allow greater scalability.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.08).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-08)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-08)
- [Wazo Platform 22.08 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.08)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-08-released).
