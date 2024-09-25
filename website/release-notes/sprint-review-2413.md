---
title: Wazo Platform 24.13 Released
date: 2024-09-23T07:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2413
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.13 release.

## New Features in This Release

- **Voicemail**: The APIs to manage voicemails are now tenant-aware
- **Call Logs**: Added a new property `requested_user_uuid` to CDRs which
  provides the UUID of the user originally being called.

## Bug Fixes

- **SAML**: Fix logout after server or service restart.

## Ongoing Features

- **wazo-provd**: The storage of wazo-provd is being rewritten to use
  Postgresql instead of json files on the filesystem

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.13).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-13)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-13)
- [Wazo Platform 24.13 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.13)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-13-released).
