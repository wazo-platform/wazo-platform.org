---
title: Wazo Platform 22.09 Released
date: 2022-06-21T21:08:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2209
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.09 release.

## Community Contributions

Shout-out to user BnLG for his contributions which help to make Wazo platform even better:

- **Security**: Various tweaks to [reinforce security in NGINX](https://github.com/wazo-platform/wazo-nginx/pull/11), making wazo more secure
- **Phones**: [Yealink](https://github.com/wazo-platform/wazo-provd-plugins/pull/138) and [Gigaset N510](https://github.com/wazo-platform/wazo-provd-plugins/pull/137) enhancements

## Features

- **Authentication**: Improve the LDAP authentication source by identifying tenants by domain names

## Bug Fixes

- **Provisioning**: Changing the provisioning port via the API did not change the provisioning server configuration.
- **Webhooks**: The webhooks are now tenant-aware: a webhook will only be triggered by events happening in the webhook's tenant.

## Ongoing Features

- **Scalability**: Consume events from the bus instead of the Asterisk websocket. This will improve the performance of Wazo and allow greater scalability.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.09).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-09)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-09)
- [Wazo Platform 22.09 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.09)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-09-released).
