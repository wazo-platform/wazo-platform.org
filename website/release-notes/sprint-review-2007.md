---
title: Wazo Platform 20.07 Released
date: 2020-05-19
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2007
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.07 release.

## New features in this release

- **Phones**: Yealink phones now synchronize the DND status of phones with the DND status of Wazo.
  Before Wazo 20.07, the phone had its own independent DND status, leading to calls being rejected
  without having set the DND option in Wazo.
- **Incoming call**: An incall accepts a new parameter to configure a greeting sound played before
  forwarding the call to the destination.

## Ongoing features

- **Performance**: We will continue removing the use of encryption of internal communication between
  some Wazo components
- **Directories**: We are adding a GraphQL API in wazo-dird to reduce the number of requests and
  improve performance.
- **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP
  options and be multi-tenant

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/uc-doc/installation)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-07)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-07)
- [Wazo Platform 20.07 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.07)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-07-released).
