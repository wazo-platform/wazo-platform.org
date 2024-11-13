---
title: Wazo Platform 22.10 Released
date: 2022-07-18T20:19:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2210
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.10 release.

## Community Contributions

Shout-out to user [BnLG](https://github.com/BnLG) for his contributions that help make Wazo even better:

- **Provisioning**: [Fix Gigaset N510 firmware upgrade](https://github.com/wazo-platform/wazo-provd-plugins/pull/142)
- **Provisioning**: [Improve Gigaset N720 plugin](https://github.com/wazo-platform/wazo-provd-plugins/pull/141)
- **Provisioning**: [Add Snom UXMC D7C firmware](https://github.com/wazo-platform/wazo-provd-plugins/pull/136)

## New Features in This Release

- **Authentication groups API**: groups can be filtered by a policy and now have a unique name

## Bug Fixes

- **Call logs**: A missed call was not logged when the associated endpoint was not available

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 19.5.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-19-5-0-now-available/)

## Ongoing Features

- **Scalability**: Consume events from the bus instead of the Asterisk websocket. This will improve the performance of Wazo and allow greater scalability.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.10).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-10)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-10)
- [Wazo Platform 22.10 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.10)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-10-released).
