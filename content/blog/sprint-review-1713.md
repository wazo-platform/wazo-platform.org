---
title: Sprint Review 17.13
date: 2017-09-18
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1713
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.13!

## Security update

**Asterisk**: [Asterisk 14.6.1](https://downloads.asterisk.org/pub/telephony/asterisk/releases/ChangeLog-14.6.1) has been included in Wazo 17.13. It contains many security fixes including one for the [RTPbleed bug](https://rtpbleed.com).

## New features in this sprint

**Admin UI**: The user plugin now allows the administrator to change the user's group membership from the user form.

**Webhooks**: Add the ability to trigger webhooks only for events regarding a given user.

## Ongoing features

**Plugin management**: We want developers to be able to write and share Wazo plugins easily. For this, we need a central place where users can browse plugins and developers can upload them. That's what we call the Plugin Market. Right now, the market already serves the list of available plugins, but it is very static. Work will now be done to add a front end to our plugin market, allowing users to browse, add and modify plugins.

**Webhooks**: Webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Webhooks are working correctly, but they still need some polishing: performance tweaking, handling HTTP authentication, listing the history of webhooks triggered, allowing users to setup their own webhooks in order to connect with Zapier, for example. We're also thinking of triggering scripts instead of HTTP requests, making Wazo all the more flexible when interconnecting with other tools.

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.13/upgrade/upgrade.html#upgrade-notes)
