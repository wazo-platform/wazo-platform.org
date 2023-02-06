---
title: Wazo Platform 23.02 Released
date: 2023-02-06T21:50:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2302
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.02 release.

## Technical Features
- **Asterisk**: Asterisk has been upgraded to 19.8.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-19-8-0-now-available/)
- **DAHDI**: DAHDI support has been removed. DAHDI was removed by default since 21.01.

## Ongoing Features
- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.02).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-02)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-02)
- [Wazo Platform 23.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.02)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-02-released).
