---
title: Wazo Platform 24.07 Released
date: 2024-05-21T08:00:00
author: The Wazo Authors
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2407
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.07 release.

## Bug Fixes

- **Ring Group**: it is no longer needed to restart Asterisk when changing ring
  strategy to linear for a ring group. The new implementation described in
  [this blog post](/blog/linear-ring-group-preview) is now used by default.

## Technical

- **Push Notification**: Wazo now supports the new Firebase API v1 to send push
  notifications to Android devices

## Ongoing Features

- **Provisioning Server**: wazo-provd is being modified to use PostgreSQL as
  its data storage backend instead using json files on the file system
- **Authentication**: A new feature is being added for users to be able to
  login using the SAML2 protocol

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.07).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-07)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-07)
- [Wazo Platform 24.07 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.07)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-07-released).
