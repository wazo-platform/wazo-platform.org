---
title: Wazo Platform 21.02 Released
date: 2021-02-15
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2102
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.02 release.

## New features in this release

- **Call Recording**: Call recordings are now attached to the call's CDR. There's an [API](https://wazo-platform.org/documentation/api/cdr.html#tag/cdr) to fetch the media from a given CDR.

## Contributions

- **Cisco 88XX**: Thanks to Fabrice GUEHO for adding support for Cisco 88XX
- **Yealing T4X upgrade**: Thanks to Fabrice GUEHO for upgrading the Yealink T4X to v85

## Bug fixes

- **Yealink**: A loop in Yealink phone DnD has been fixed

## Technical features

- **Asterisk**: Asterisk has been upgraded to 18.2.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-18-2-0-now-available/)
- **Calls**: Call API not strip white spaces from the dialed extensions
- **Debug**: Debug mode can now be enabled in wazo-webhookd without restarting the service

## Ongoing features

- **Call recording**: we are working to improve the Wazo Platform API to easily get call recordings.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#21-02)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-02)
- [Wazo Platform 21.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.02)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-02-released).
