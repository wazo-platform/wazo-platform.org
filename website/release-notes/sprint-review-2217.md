---
title: Wazo Platform 22.17 Released
date: 2022-12-19T21:33:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2217
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.17 release.

## Technical Features

- **Python 3**: Migrated wazo-agid and wazo-confgend services to Python 3. They were the last services written in Python 2
- **Asterisk**: Asterisk has been upgraded to 19.7.1. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-19-7-1-now-available-security-release/)

## Ongoing Features

- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.17).

Note that the next release will be on mid-January. Happy Holidays!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-17)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-17)
- [Wazo Platform 22.17 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.17)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-17-released).
