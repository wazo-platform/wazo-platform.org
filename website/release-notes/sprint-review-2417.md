---
title: Wazo Platform 24.17 Released
date: 2024-12-11T21:30:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2417
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.17 release.

## New Features in This Release

- **Wazo UI**: Phone Numbers management tab added to wazo-ui. See documentation on
  [phone numbers API](/uc-doc/administration/phone_numbers) and
  [dynamic caller id feature](/uc-doc/administration/callerid/#dynamic-caller-id).

## Bug Fixes

- **phonebook contact import**: behavior of phonebook contact CSV import API changed to handle and
  report errors appropriately (see wazo-dird
  [changelog](https://github.com/wazo-platform/wazo-dird/blob/wazo-24.17/CHANGELOG.md) and API
  reference)
- **simultaneous calls**: outbound calls correctly counted towards the simultaneous calls limit
- **ring group (linear)**: DND status change during ring group call now effective

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.17).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-17)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-17)
- [Wazo Platform 24.17 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.17)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-17-released).
