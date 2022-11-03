---
title: Wazo Platform 22.06 Released
date: 2022-04-20T15:22:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2206
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.06 release.

## New Features in This Release
- **Meetings**: Added ability for the meeting owner to kick a participant

## Bug Fixes
- **Mobile**: Fixed blank notifications on Android phones after receiving a call

## Technical Features
- **Asterisk**: Asterisk has been upgraded to 18.11.1. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-18-11-1-now-available/)

## Ongoing Features
- **Meetings**: Improve external conferences that allow guests to join a meeting
- **Bullseye**: Refactoring some old services to facilitate transition to debian Bullseye
- **wazo-calld**: Consume stasis events from the bus instead of the Asterisk websocket. This allows better wazo-calld scalability

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.06).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-06)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-06)
- [Wazo Platform 22.06 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.06)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-06-released).
