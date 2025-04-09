---
title: Wazo Platform 25.05 Released
date: 2025-04-02T19:27:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2505
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.05 release.

## Bug Fixes

- **Call Forwards**: enabling the call forward played the wrong sound
- **Performance**: having too many users (1000+) configured with push notifications could delay
  event delivery in certain cases

## New Features in This Release

- **Reverse Lookup**: multiple number formats are now used during reverse directory lookups. This
  allows an incoming call to match a contact even if the saved number is in a different format than
  the caller ID number presented by the operator

## Ongoing Features

- **Blocklist**: enable wazo end-users to manage a personal blocklist of phone numbers from external
  incoming calls that should not be allowed to call them, empowering users to combat phone spam and
  harassment

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.05).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-05)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-05)
- [Wazo Platform 25.05 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.05)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-05-released).
