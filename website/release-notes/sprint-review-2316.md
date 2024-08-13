---
title: Wazo Platform 23.16 Released
date: 2023-11-27T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2316
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.16 release.

## New Features in This Release

- **Remote Provisioning**: To enhance security on remote provisioning, we are
  introducing an authentication system using a "provisioning key". More
  information can be found in [the
  documentation](https://wazo-platform.org/uc-doc/administration/provisioning/http-auth-strategy)
- **Provisioning**: Added support for Yealink CP925

## Technical

- **NGINX**: The provisioning system is now behind NGINX. It facilitates
  configuration for HTTPS and Provisioning Key.

## Ongoing Features

- **Scalability**: Under the hood changes to make Wazo more performant on large
  installations.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.16).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-16)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-16)
- [Wazo Platform 23.16 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.16)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-16-released).
