---
title: Wazo Platform 23.04 Released
date: 2023-03-20T19:00:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2304
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.04 release.

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 20.1.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-20-1-0-now-available/)
- **Scalability**: `Wazo-websocketd` now serves connection using multiple processes, which improves delivery speed when a high number of clients are connected
- **New user API**: A new high level API endpoint is now available to update a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.

## Ongoing Features

- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.04).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-04)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-04)
- [Wazo Platform 23.04 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.04)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-04-released).
