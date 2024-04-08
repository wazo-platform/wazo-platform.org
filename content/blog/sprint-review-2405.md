---
title: Wazo Platform 24.05 Released
date: 2024-04-08T08:00:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2405
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.05 release.

## Bug Fixes

- **Context ranges**: The context range API now returns the extension ranges based on the DID length parameter of the context
- **Tenants**: The wazo-auth `/tenants` API now filters using the `uuids` query parameter properly
- **Chat**: Room chat participants can no longer read messages of rooms they are not part of
- **Chat**: Room chat participants can now create rooms which include all participants of an existing room

## Technical

- **Parking**: A new API has been added to control parked calls
- **Asterisk**: We are now using Asterisk 21

## Ongoing Features

- **wazo-provd**: The storage of wazo-provd is being rewritten to use Postgresql instead of json files on the filesystem

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.05).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-05)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-05)
- [Wazo Platform 24.05 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.05)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-05-released).
