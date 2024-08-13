---
title: Wazo Platform 22.14 Released
date: 2022-10-11T23:24:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2214
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.14 release.

## New Features in This Release

- **Provisioning**: Added support for phones Fanvil X4U(-V2), X5U(-V2), X6U(-V2), X7(-V2), X7C(-V2), X210(-V2), and X210i(-V2)
- **Documentation**: API events are now properly documented with AsyncAPI. The documentation is available on https://wazo-platform.org/documentation. Here is [an example](https://wazo-platform.org/documentation/events/authentication) for authentication events.

## Bug Fixes

- **Provisioning**: Auto-provisioning audio messages are now played when using a language other than English.

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 19.6.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-19-6-0-now-available/)

## Ongoing Features

- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye. This requires migrating the remaining code written in Python 2 to Python 3.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.14).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-14)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-14)
- [Wazo Platform 22.14 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.14)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-14-released).
