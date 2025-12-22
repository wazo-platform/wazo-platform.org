---
title: Wazo Platform 25.17 Released
date: 2025-12-18T05:02:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2517
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.17 release.

## New Features in This Release

- **data-only push notifications**: push notifications `missedCall`, `voicemailReceived` and `messageReceived`, are updated for application-level "data-only" handling, in order to allow mobile applications to implement custom & extended handling and rendering; 
  on Android/FCM, those notifications are "data-only" and need custom application logic to handle and display to users; 
  on iOS/APNS, those notifications are "hybrid" and are still handled/displayed by iOS natively, but may now trigger application logic.
- **Agent**: User agents may now login/logoff per queue individually using new agent API endpoints.

## Bug Fixes

- **Recording**: The beep sound played when starting/stopping a call recording will be heard by both parties of the call.
- **`*guest` provisioning extension**: users can now again use `*guest` extension feature to reset a hardware phone to autoprovisioning state
- **`*31`/`*30` agent login extension feature**: agent login through extension feature (*30 or *31) now selects the calling endpoint as the agent interface which will receive queue calls

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.17).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-17)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-17)
- [Wazo Platform 25.17 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.17)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-17-released).
