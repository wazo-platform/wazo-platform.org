---
title: Wazo Platform 20.17 Released
date: 2020-12-21
author: The Wazo Authors
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2017
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.17 release.

## New features in this release

- **Phones**: Two new phone provisioning plugins have been added to support
  Cisco 68XX & SPA191/192
- **Contact Center Stats API**: Agent statistics may now be retrieved according
  to a physical timezone, to take into account Daylight-Saving-Time changes.

## Bug fixes

- **Call Recording**: Using call recording with `*3` now save files in
  tenant-aware directories.
- **Import**: User import now uses global SIP templates instead of creating one template by a user.
- **SCCP**: Agent can now use SCCP phone to login/logout.

For more details about the aforementioned topics, please see the roadmap linked
below.

We wish everybody happy holidays!

See you next year for the release of Wazo Platform 21.01!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#20-17)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-17)
- [Wazo Platform 20.17
  Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.17)

## Discussion

Comments or questions in [this forum
post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-17-released).
