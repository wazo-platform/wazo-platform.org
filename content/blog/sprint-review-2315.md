---
title: Wazo Platform 23.15 Released
date: 2023-11-06T10:30:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2315
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.15 release.

## New Features in This Release
- **Directories**: Directory lookups can now match Wazo users in the internal directory when searching using a full name. Ex: "Alice Smith" would match the corresponding user.

## Technical
- **User API**: Listing users is now faster when using pagination on a large user base.
- **Directories**: Reverse lookup will now happen whenever the caller ID name looks like a phone number, instead of only happening when the name and number are the same.
- **Asterisk**: Asterisk has been upgraded to 20.5.0. [See the Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-20-5-0-now-available/).

## Ongoing Features
- **Scalability**: Under the hood changes to make Wazo more performant on large installations.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.15).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-15)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-15)
- [Wazo Platform 23.15 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.15)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-15-released).
