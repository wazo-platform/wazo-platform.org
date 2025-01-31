---
title: Wazo Platform 25.02 Released
date: 2025-02-03T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2502
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.02 release.

## New Features in This Release

- **Queues**: Queues now have an option to enable on demand call recording
- **Ring groups**: Ring groups now have an option to enable on demand call recording

## Bug Fixes

- **Call Logs**: SIP chat message will no longer generate errors during call logs processing

## Technical

- **Recording**: Recordings start and stop API now check if on demand recording is enabled
- **Emails**: wazo-auth now has an email notification extension point to allow custom emailing
  technologies to be used
- **Asterisk**: Asterisk was upgraded to version 22.1.1

## Ongoing Features

- **Recording**: We are adding a pause and resume recording API
- **Debian Bookworm**: Preparation work for the upgrade to Debian Bookworm is in progress

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.02).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-02)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-02)
- [Wazo Platform 25.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.02)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-02-released).
