---
title: Sprint Review 17.02
date: 2017-01-30
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1702
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.02!

We're back to our usual 3-weeks release cycle :)

## New features in this sprint

**API schedules**: Schedules may now be managed via REST API. Schedules allow calls to be redirected to other destinations depending on the time and day that they arrive. For example during holidays, calls could be redirected to a voicemail instead of ringing a phone nobody would answer.

**WebRTC lines**: The web interface now allows associating "WebRTC lines" to users. WebRTC is a recent feature of browsers that makes it possible to have a web softphone: you don't _need_ a specific application to handle your calls, instead you can answer, talk and hangup directly on a web page. You can try out WebRTC with Wazo on [https://phone.wazo.community](https://phone.wazo.community). The "WebRTC line" actually creates a SIP line with a bunch of predefined parameters that are required to be able to use this SIP line in a WebRTC application, so it will appear as a SIP line afterwards.

## Ongoing features

**Switchboard API**: We are changing the internals of the Switchboard feature so that we can control more precisely how calls are answered, transferred, etc. We are also adding a REST API over the switchboard feature, to allow different interfaces for the switchboard, be it web or desktop client.

**API policies permissions**: The current model of permissions for authentication tokens is a bit too rigid to give users only the permissions they need. We are making the system more flexible in order to have more fine-grained control over what user is allowed to do, such as entering/leaving only certain groups, answering calls from certain switchboards, etc.

**New web interface**: The first lines of code of a new web interface have been written. This web interface will only use the REST API we've been developing in the past few years, with no brittle complicated internal logic like the current web interface has: all the logic is handled by the REST APIs. This web interface will not replace the current web interface before it has all the same features, so it will take time to become the default. However, both web interfaces will coexist during the maturation of the new one.

---

See you at the next sprint review!

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.02/upgrade/upgrade.html#upgrade-notes)
- [xivo-confd REST API Changelog](https://wazo.readthedocs.io/en/wazo-17.02/api_sdk/rest_api/confd/changelog.html)
