---
title: Wazo Platform 24.09 Released
date: 2024-07-02T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2409
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.09 release.

## New Features in This Release

- **API**: New limit on maximum number of sessions (tokens) a user can have. By default, the limit is set to 100 per user but can be changed in wazo-auth configuration files.
- **Call Logs**: Added `conversation_id` to CDR which can also be used as a search filter. This is the link between the realtime call API and call logs API.

## Ongoing Features

- **Provisioning Server**: wazo-provd is being modified to use PostgreSQL as its data storage backend instead of using JSON files on the file system
- **Authentication**: We are hard at work to improve and finalize the support for SAML2 protocol, allowing administrators to configure the identity provider.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.09).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-09)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-09)
- [Wazo Platform 24.09 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.09)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-09-released).
