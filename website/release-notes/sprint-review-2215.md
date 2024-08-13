---
title: Wazo Platform 22.15 Released
date: 2022-11-03T19:43:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2215
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.15 release.

## New Features in This Release

- **Provisioning**: Added support for Fanvil X Series phonebook
- **Call API & Events**: Added new field `call_direction` to call API and events, which allows to
  know if a call is inbound, outbound or internal

## Bug Fixes

- **Provisioning**: Fixed Cisco SPA plugin firmware package download issue

## Ongoing Features

- **New user API**: We are working on a new high level API endpoint to create a user and all of its
  related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye. This requires migrating the
  remaining code written in Python 2 to Python 3.

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.15).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-15)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-15)
- [Wazo Platform 22.15 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.15)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-15-released).
