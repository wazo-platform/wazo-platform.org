---
title: Wazo Platform 23.13 Released
date: 2023-09-20T16:57:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2313
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.13 release.

## New Features in This Release
- **wazo-ui**: Phonebook contacts can now be managed in wazo-ui

## Bug Fixes
- **Switchboard**: CDR call duration was fixed when a call has been on hold before being answered
- **wazo-calld**: Removed Python errors during auto-provisioning calls in wazo-calld logs
- **Directories**: Removing a phonebook will also delete all associated lookup configuration

## Technical
- **Phone Provisioning**: The provisioning server's HTTP interfaces is now accessible through the Nginx server

## Ongoing Features
- **Multi Tenancy**: We are making tenant removal cleaner by removing associated ressources


For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.13).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-13)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-13)
- [Wazo Platform 23.13 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.13)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-13-released).
