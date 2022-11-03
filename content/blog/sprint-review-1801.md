---
title: Sprint Review 18.01
date: 2018-01-22
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1801
status: published
---

## New features in this sprint

**REST API**: REST APIs have been added for:
  * SCCP general configuration
  * IAX trunks configuration
  * ConfBridge configuration
  * Special extensions configuration, e.g. setting DND extension to `*55` instead of `*25`, etc.
  * Sound files
  * Trunk registrations


## Technical features

**System**: the underlying Debian GNU/Linux system is upgraded to Debian 9 Stretch. The upgrade procesure is a bit different than usual and will take longer than previous upgrades. See the [specific release notes](http://wazo.readthedocs.io/en/latest/upgrade/18.01/stretch.html) for more details.

**Asterisk**: Asterisk is upgraded to the latest version [15.2.0](https://downloads.asterisk.org/pub/telephony/asterisk/releases/ChangeLog-15.2.0).


## Contributions

**Yealink**: The provisioning plugin for Yealink now includes the v82 firmware. Thanks to DamienB505 for the patches!


## Ongoing features

**User and Tenant Management**: We are currently reworking the user and entities (a.k.a tenant) configuration. This should make installations with multiple entities feel more natural in future versions.

**REST API**: We are working towards replacing the old orange admin web interface with the more modern and easier to maintain blue web interface (wazo-admin-ui on `/admin`). Since wazo-admin-ui is only using REST API under the hood, we need REST API to cover all cases of administration of Wazo. Hence we are completing the set of REST APIs offered by Wazo. You can find the complete API documentation on [https://wazo-platform.org/documentation](https://wazo-platform.org/documentation).

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) are available in the documentation.
The instructions for [upgrading Wazo](/uc-doc/upgrade/introduction) as also available in the documentation. Be sure to read the [breaking changes](http://wazo.readthedocs.io/en/wazo-18.01/upgrade/upgrade_notes.html).

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes)
