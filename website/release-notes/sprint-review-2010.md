---
title: Wazo Platform 20.10 Released
date: 2020-07-20
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2010
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.10 release.

## Technical features

- **Asterisk**: Asterisk was upgraded to 17.5.1.
- **Multi-tenancy**: We have improved the consistency of the database for multiple tenants. User credentials will now get deleted from the database after the tenant gets deleted.

## Ongoing features

- **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant.

For more details about the aforementioned topics, please see the changelog linked below.

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-10)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-10)
- [Wazo Platform 20.10 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.10)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-10-released).
