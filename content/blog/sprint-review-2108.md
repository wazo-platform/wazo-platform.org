---
title: Wazo Platform 21.08 Released
date: 2021-06-21T13:00:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2108
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.08 release.

## New Features in This Release

* **Presence**: Until Wazo Platform 21.08, the API for user presence changed its `line_state` to `talking` right after the user placed a call. In Wazo Platform 21.08, the user's `line_state` will have two different states: `progressing` when the called party is ringing, then `talking` if the called party answers the call.
* **Phones**: The Grandstream GXP1628, GS-HT801-HT802, GRP2614, GXV3350 are now supported by the latest Grandstream phone plugin in Wazo Platform.
* **Events**: All call-related events emitted by Wazo Platform now include a `timestamp` metadata.
* **Switchboard**: Wazo Platform 21.08 allows changing the music-on-hold for switchboard waiting and hold queues.

## Ongoing Features

* **Music on hold**: We are working on adding specific music on hold for Incoming calls on specific DID.
* **Recordings**: We are working on polishing the call recordings API.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/use-cases)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#21-08)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-08)
* [Wazo Platform 21.08 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.08)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-08-released).
