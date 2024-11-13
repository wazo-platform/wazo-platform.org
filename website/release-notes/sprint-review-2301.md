---
title: Wazo Platform 23.01 Released
date: 2023-01-16T00:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2301
status: published
---

Hello Wazo Platform community!

Happy New Year :)
Here is a short review of the Wazo Platform 23.01 release.

## Community

- **Chat**:  We can now create a chat room with up to 100 participants (a.k.a
  group chat). Thanks to Mehdi Emrani and Milad Razban for the contribution

## Technical Features

- **Python 3**: Migrated mostly all remaining libraries/scripts to Python 3 and
  remove Python 2 compatibility
- **Event**: Mostly all services now publish directly on wazo-headers exchange

## Ongoing Features

- **New user API**: We are working on a new high level API endpoint to create a
  user and all of its related resources (user, line, extension, voicemail,
  incoming call) in a single HTTP request.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Bullseye.

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.01).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-01)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-01)
- [Wazo Platform 23.01 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.01)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-01-released).
