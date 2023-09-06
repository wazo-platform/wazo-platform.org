---
title: Wazo Platform 23.12 Released
date: 2023-09-06T09:00:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2312
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.12 release.

## New Features in This Release
- **Personal Contacts**: Add missing pagination options to the API documentation

## Bug Fixes
- **Authentication**: Fix an issue with the authentication server when authentication was encoded in utf-8
- **Call Management**: Fix an issue where a call could not be hung up using the API after being picked up using *8<exten>

## Technical Features
- **Dialplan**: Context names are now auto-generated
- **Phonebook**: The phonebook API has been updated to reflect multi-tenancy is implemented in other Wazo API

## Ongoing Features
- **Tenant Deletion**: We are currently working to make tenant deletion cleaner and avoid leaking resources
- **Performance**: We are working on making the Wazo stack usable with thousands of users using the API and consuming websocket events


For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.12).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-12)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-12)
- [Wazo Platform 23.12 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.12)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-12-released).
