---
title: Wazo Platform 24.02 Released
date: 2024-02-05T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2402
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.02 release.

## New Features in This Release

- **calld API**: Added optional 'timeout' parameter in body of `PUT /calls/{call_id}/user/{user_uuid}` endpoint to control dial timeout behaviour
  of call to user.

## Technical

- **Parking**: In order to use API parking lots with function keys, deprecated default parking lot (700) function keys have been removed.
- **Provisioning**: Python module has been renamed from `provd` to `wazo_provd`. Any custom provisioning plugin should be updated.
- **Bus**: Python library has been renamed from `xivo_bus` to `wazo_bus`. Any custom plugin using this library should be updated.

## Ongoing Features

- **wazo-provd**: Migrate the database from JSON to PostgreSQL

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.02).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-02)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-02)
- [Wazo Platform 24.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.02)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-02-released).
