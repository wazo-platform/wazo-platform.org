---
title: Wazo Platform 24.10 Released
date: 2024-07-22T08:00:00
author: The Wazo Authors
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2410
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.10 release.

## New Features in This Release

- **Push Notification**: Mobile devices will now receive a notification
  whenever they miss a call.
- **wazo-calld**: Enhance `GET /calls` to support multi-tenancy
- **wazo-dird & wazo-amid**: Introduce a new API for toggling debug mode
  without requiring service restart.

## Ongoing Features

- **Authentication**: We are hard at work to improve and finalize the support
  for SAML2 protocol, allowing administrators to configure the identity
  provider.
- **Provisioning Server**: wazo-provd is being modified to use PostgreSQL as
  its data storage backend instead of using JSON files on the file system

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.10).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-10)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-10)
- [Wazo Platform 24.10 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.10)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-10-released).
