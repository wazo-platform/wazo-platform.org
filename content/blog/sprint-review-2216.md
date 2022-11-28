---
title: Wazo Platform 22.16 Released
date: 2022-11-23T21:55:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2216
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.16 release.

## New Features in This Release
- **Provisioning**: Migrated service and all its plugins to python3. The plugins are published to a new folder to avoid conflicts with the old python2 ones.

## Technical Features
- **Chats**: Changes in the way chats are stored, only a single room will ever be created and used by participant pairs.  This change improves developper experience and allows removal of logic in custom applications.  

## Ongoing Features
- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye. This requires migrating the remaining code written in Python 2 to Python 3.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.16).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-16)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-16)
- [Wazo Platform 22.16 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.16)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-16-released).
