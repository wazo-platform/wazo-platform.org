---
title: Wazo Platform 24.08 Released
date: 2024-06-10T11:18:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2408
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.08 release.

## New Features in This Release

- **Authentication**: A new feature has been added for users to be able to login using the SAML2 protocol

## Bug Fixes

- **Calls**: Calls will be hung up after 10 hours, in order to avoid 'ghost call' accumulation scenarios

## Technical

- **Parking Lots**: Improve parking lots API to facilitate usage (ex: add events, add informations, etc.)

## Ongoing Features

- **Provisioning Server**: wazo-provd is being modified to use PostgreSQL as its data storage backend instead of using JSON files on the file system
- **Authentication**: We will continue to improve and complete the login with SAML2 protocol allowing administrators to configure the identity provider.
- **Call API**: Allow to link a call with a call log

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.08).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-08)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-08)
- [Wazo Platform 24.08 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.08)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-08-released).
