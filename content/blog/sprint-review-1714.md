---
title: Sprint Review 17.14
date: 2017-10-09
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1714
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.14!

We are looking for beta testers for the Wazo Zapier plugin.

## Security update

**Asterisk**: [Asterisk 14.6.2](https://downloads.asterisk.org/pub/telephony/asterisk/releases/ChangeLog-14.6.2) has been included in Wazo 17.14.

## New features in this sprint

**Wazo Client**: The Wazo Client 17.14.1 has been released and can be used to replace the previous CTI client.

**Webhooks**: Webhooks can be triggered on a per user basis for chat, agent login/logouts and device status changes.

## Ongoing features

**Plugin management**: We want developers to be able to write and share Wazo plugins easily. For this, we need a central place where users can browse plugins and developers can upload them. That's what we call the Plugin Market. Right now, the market already serves the list of available plugins, but it is very static. Work will now be done to add a front end to our plugin market, allowing users to browse, add and modify plugins.

**Webhooks**: Webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Webhooks are working correctly, but they still need some polishing: performance tweaking, handling HTTP authentication, listing the history of webhooks triggered, allowing users to setup their own webhooks in order to connect with Zapier, for example. We're also thinking of triggering scripts instead of HTTP requests, making Wazo all the more flexible when interconnecting with other tools.

**Performance**: We are making changes to the way xivo-ctid-ng handle messages from Asterisk to be able to handle more simultaneous calls.

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.14/upgrade/upgrade.html#upgrade-notes)
