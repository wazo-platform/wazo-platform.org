---
title: Sprint Review 17.11
date: 2017-08-07
author: The Wazo Authors
category: Wazo IPBX
tags: [wazo, development]
slug: sprint-review-1711
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.11!

## New features in this sprint

**REST API**: We have added a new REST API to add outgoing webhooks. The REST API is not yet available in the web interface, but it will come in time. Outgoing webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc.

**Plugins**: Wazo plugins can now depend on each other. This allows us to create metaplugins, that will install multiple plugins at once. It also allows different plugins to rely on the same basic plugin, without having to handle the installation of the basic plugin manually.

## Technical features

**Asterisk**: Asterisk was updated from 14.5.0 to [14.6.0](https://downloads.asterisk.org/pub/telephony/asterisk/releases/ChangeLog-14.6.0)

**Chat**: We have integrated a new software in Wazo, namely MongooseIM. We will progressively insert MongooseIM in the heart of the Wazo chat, so that we can benefit from its features: chat history, chat rooms, mobile push notifications, and maybe XMPP connectivity...

## Ongoing features

**Plugin management**: There is still a lot to be done to the plugin management service. e.g. upgrade, HA, ...

**Webhooks**: We are adding a new way of interconnecting Wazo with other software: webhooks. Outgoing webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Incoming webhooks also allow Wazo to be notified of events happening on other applications, e.g. a new customer was added in your CRM, a new employee was added in your directory, etc. Unfortunately, there is no magic and the application in question must be able to send or receive webhooks so that Wazo can talk with it. See also this [blog post (sorry, it's in French)](https://wazo-platform.org/blog/wazo-webhook) about Wazo and webhooks.

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.11/upgrade/upgrade.html#upgrade-notes)
