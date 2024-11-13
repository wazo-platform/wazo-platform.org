---
title: Sprint Review 17.09
date: 2017-06-21
authors: wazoplatform
category: Wazo IPBX
tags: [wazo, development]
slug: sprint-review-1709
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.09!

## New features in this sprint

**Plugins**: We added a command-line utility (`wazo-plugind-cli`) to ease the installation of plugins from shell scripts. This should be useful for automatically installing new Wazo machines, with plugins pre-installed.

**SCCP**: A few versions earlier, we added the possibility to attach multiple lines to a user, so that when this user is called, all of his phones ring at the same time. But until now, this was restricted to SIP phones (including WebRTC lines), but not Cisco SCCP phones. In Wazo 17.09, users may have as many SIP, WebRTC or SCCP lines as they wish, and they will all ring at the same time when someone calls.

**Admin UI**: The Extensions plugin has been updated to include a view listing all the phone numbers configured on the Wazo, and what they are linked to.

**Admin UI**: The new web admin UI is now able to delete multiple entries at a time, making the mass-delete feature available in all lists.

**Provisioning plugins**: Until now, there were two main repositories for provisioning plugins: `stable` and `addons`. `stable` contained the previously "officially supported" plugins and `addons` contained the "community-contributed" plugins. We have merged those two repositories: all provisioning plugins are now available in `stable`, the default provisioning repository.

## Technical features

**Asterisk**: Asterisk was updated from 14.4.0 to 14.5.0

## Ongoing features

**Plugin management**: There is still a lot to be done to the plugin management service. e.g. dependency, upgrade, wazo version constraint, HA, ...

**Webhooks**: We are adding a new way of interconnecting Wazo with other software: webhooks. Outgoing webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Incoming webhooks also allow Wazo to be notified of events happening on other applications, e.g. a new customer was added in your CRM, a new employee was added in your directory, etc. Unfortunately, there is no magic and the application in question must be able to send or receive webhooks so that Wazo can talk with it. See also this [blog post (sorry, it's in French)](https://wazo-platform.org/blog/wazo-webhook) about Wazo and webhooks.

---

The instructions for [installing Wazo](/uc-doc/installation) or [upgrading Wazo](/uc-doc/upgrade) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.09/upgrade/upgrade.html#upgrade-notes)
