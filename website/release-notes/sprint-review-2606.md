---
title: Wazo Platform 26.06 Released
date: 2026-05-19T15:04:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2606
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.06 release.

## New Features in This Release
- **Mobile PSTN Fallback**: mobile app call path in wazo-calld now supports a fallback to PSTN when mobile app does not register in time
 
## Bug Fixes
- **switchboards**: fixed a phantom call scenario when a blind transfer is done to an IVR option that calls a switchboard
- **diversion**: fixed a missing SIP Diversion header when a group reaches a fallback or is forwarded
- **devices**: fixed an issue where deleting a user reset a device to autoprov even though other users were assigned to another line of the same device
- **webhooks**: fixed a security issue
 
## Technical
- **bus**: switched consumer queues to exclusive to align with RabbitMQ's deprecation of transient non-exclusive queues and ensure forward compatibility

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-06)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-06)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-06-released).
