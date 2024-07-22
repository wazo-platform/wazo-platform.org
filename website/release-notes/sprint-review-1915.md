---
title: Wazo Platform 19.15 Released
date: 2019-11-04
author: The Wazo Authors
category: Wazo Platform
tags: [wazo-platform, development]
slug: sprint-review-1915
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 19.15 release.

## New features in this sprint

- Trunks: It is now possible to create two trunks with same username

## Bug fixes

- Presence status: There were some scenarios where the presence status was incorrect, e.g. hanging up a hold call. They are now fixed.
- Call interception: Up until Wazo Platform 19.15, call interception was enabled for every user through the extension `*8`, e.g. `*81001` for intercepting user 1001. This setting is now disabled by default. The preferred way to setup call interception is to use Interception groups, which define which user can intercept which other user.
- Call reliance: We fixed a problem with WebRTC calls: sometimes, the call was hungup before even ringing the destination.

## Technical features

- Asterisk: Asterisk was updated from 16.5.1 to 16.6.1, fixing 1 security issue.

## Ongoing features

- Switchboard: We are working to improve the switchboard call flow response time, because the switchboard user needs the most reactivity from its application. These improvements may also have a positive outcome on non-switchboard calls reactivity as well.
- BLF: The Busy Lamp Field (BLF) of Do Not Disturb mode, call forwards and call filtering are being reimplemented to restore the behavior of Wazo 18.03.
- Call logs: We are handling more scenarios in the Wazo Platform CDR. We are focused on the call forwarding scenarios, in order to present the correct numbers to users.
- SBC: We are adding new blocks in Wazo Platform to handle more calls and improve security. Kamailio is the core of those new features and will serve as a Session Border Controller (SBC) and SIP router to multiple Asterisk instances.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

---

Resources:

- [Install Wazo Platform](/uc-doc/installation/install-system)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/introduction). Be sure to read the [breaking changes](https://wazo.readthedocs.io/en/wazo-19.15/upgrade/upgrade_notes.html).

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes)
- [Wazo Platform 19.15 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.15)
