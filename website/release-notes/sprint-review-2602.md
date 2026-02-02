---
title: Wazo Platform 26.02 Released
date: 2026-01-28T18:30:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2602
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.02 release.

## Bug Fixes

- **Recording announcements**: fixed possible deadlock when recording start and stop announcements were too long
- **WebRTC video**: a bug affecting webrtc video support was introduced in wazo 26.01/asterisk 22.6.0; upgrade and backporting of asterisk 22.8.1 resolves that issue

## Technical

- **Asterisk**: Asterisk was upgraded to 22.8.1.  See the [release notes](https://www.asterisk.org/asterisk-news/asterisk-22-8-1-now-available/)
- **Dialplan**: the asterisk dialplan was moved from the `xivo-config` project to the [`wazo-asterisk-config`](https://github.com/wazo-platform/wazo-asterisk-config) project

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D26.02).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-02)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-02)
- [Wazo Platform 26.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D26.02)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-02-released).
