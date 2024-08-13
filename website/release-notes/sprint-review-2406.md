---
title: Wazo Platform 24.06 Released
date: 2024-04-25T13:17:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2406
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.06 release.

## New Features

- **CallerID**: The anonymous feature is now RFC compliant and should work out of the box for most configurations (see [documentation](https://wazo-platform.org/uc-doc/administration/callerid#anonymous-callerid))
- **CallerID**: In order to facilitate custom caller ID integration, it can be now configured through SIP header (see [documentation](https://wazo-platform.org/uc-doc/administration/callerid#dynamic-caller-id))

## Bug Fixes

- **wazo-ui**: Fix tenant edition

## Technical

- **wazo-chatd**: The initialization process has been improved to be more robust

## Ongoing Features

- **Provisioning Server**: wazo-provd is being modified to use Postgresql as its data storage backend instead using json files on the file system
- **Authentication**: A new feature is being added for users to be able to login using the SAML protocol
- **linear ring group**: reimplementation of ring groups for the linear ring strategy, to fix outstanding issue with Asterisk Queue-based implementation requiring a complete reboot.
  An upcoming blog post will provide more details.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.06).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-06)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-06)
- [Wazo Platform 24.06 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.06)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-06-released).
