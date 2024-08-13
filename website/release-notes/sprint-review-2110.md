---
title: Wazo Platform 21.10 Released
date: 2021-08-02T12:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2110
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.10 release.

## New Features in This Release

- **CDR**: Improve CDR to add information about the `source_internal name`
- **Call permission**: It's now possible to use the same name on different tenants

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 18.5.1, featuring security fixes. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-13-38-3-16-19-1-17-9-4-18-5-1-and-16-8-cert10-now-available-security/)
- **Google**: The implementation of the directory plugin for Google has been updated to use the
  People API instead of the deprecated Contact API that will increasingly return voluntary errors.
  See the upgrade note for more details about the changes that have to be done.
- **Event**: New websocket events have been added when a call recording archive gets created

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#21-10)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-10)
- [Wazo Platform 21.10 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.10)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-10-released).
