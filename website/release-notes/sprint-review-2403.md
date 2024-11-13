---
title: Wazo Platform 24.03 Released
date: 2024-02-21T16:38:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2403
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.03 release.

## New Features in This Release

- **Parking Lot**: Undeprecate and refactor `parking` and `park_position` function keys to work with the parking lots resource
- **wazo-agentd**: Refactor wazo-agentd service to use stevedore plugins to easily integrate third-party development

## Technical

- **SIP template PUT queries**: improved response time for PUT queries on sip endpoint templates
- **wazo-confd**: validation of `delete_messages` option in `/voicemails` configuration to prevent configuration errors
- **wazo-stats**: improved resilience of queue stats computation in presence of incomplete queue events

## Ongoing Features

- **wazo-provd**: Migrate the database from JSON to PostgreSQL
- **Parking Lot**: new API to control call parking features

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.03).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-03)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-03)
- [Wazo Platform 24.03 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.03)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-03-released).
