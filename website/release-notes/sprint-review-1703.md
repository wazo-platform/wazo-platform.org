---
title: Sprint Review 17.03
date: 2017-02-20
authors: wazoplatform
category: Wazo IPBX
tags: [wazo, development]
slug: sprint-review-1703
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.03!

## New features in this sprint

**Music on hold API**: There are new REST API for managing music on hold classes and audio files related to music on hold. Music on hold control what callers hear when they arrive in a queue or user group, while agents or users are ringing. One music on hold class may contain multiple sound files that will be played one after the other.

## Technical features

**Consul**: Consul has been updated from 0.7.2 to [0.7.3](https://github.com/hashicorp/consul/blob/v0.7.3/CHANGELOG.md). Consul is used for service discovery across multiple Wazo installation.

**libpri**: LibPRI has been updated from 1.5.0 to [1.6.0](https://downloads.asterisk.org/pub/telephony/libpri/releases/ChangeLog-1.6.0). LibPRI is used for some hardware telephony cards (E1, T1, J1).

## Ongoing features

**Switchboard API**: We are changing the internals of the Switchboard feature so that we can control more precisely how calls are answered, transferred, etc. We are also adding a REST API over the switchboard feature, to allow different interfaces for the switchboard, be it web or desktop client.

**API policies permissions**: The current model of permissions for authentication tokens is a bit too rigid to give users only the permissions they need. We are making the system more flexible in order to have more fine-grained control over what user is allowed to do, such as entering/leaving only certain groups, answering calls from certain switchboards, etc.

**New web interface**: The first lines of code of a new web interface have been written. This web interface will only use the REST API we've been developing in the past few years, with no brittle complicated internal logic like the current web interface has: all the logic is handled by the REST APIs. This web interface will not replace the current web interface before it has all the same features, so it will take time to become the default interface. However, both web interfaces will coexist during the maturation of the new one. We'll keep you posted when the new web interface becomes usable.

---

See you at the next sprint review!

<!-- truncate -->

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.03/upgrade/upgrade.html#upgrade-notes)
- [xivo-confd REST API Changelog](https://wazo.readthedocs.io/en/wazo-17.03/api_sdk/rest_api/confd/changelog.html)
